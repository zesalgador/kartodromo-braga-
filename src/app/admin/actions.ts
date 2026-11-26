"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient, getAuthProfile } from "@/lib/supabase/server";
import { extractVoucherCode, generateVoucherCode, isValidVoucherCode, normalizeVoucherCode } from "@/lib/vouchers/codes";
import { canCancelVouchers, canManageVouchers, canValidateVouchers } from "@/lib/vouchers/permissions";
import { buildVoucherPdf, pdfFilename } from "@/lib/vouchers/pdf";
import {
  DURATIONS,
  ERROR_MESSAGES,
  KART_TYPES,
  type DurationMinutes,
  type KartType,
  type VoucherLookup,
} from "@/lib/vouchers/types";

type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

function parseKartType(value: FormDataEntryValue | null): KartType | null {
  if (typeof value !== "string") return null;
  return (KART_TYPES as readonly string[]).includes(value) ? (value as KartType) : null;
}

function parseDuration(value: FormDataEntryValue | null): DurationMinutes | null {
  const n = Number(value);
  return (DURATIONS as readonly number[]).includes(n) ? (n as DurationMinutes) : null;
}

export async function createVoucherAction(formData: FormData): Promise<ActionResult<{ id: string; code: string }>> {
  const profile = await getAuthProfile();
  if (!canManageVouchers(profile?.role)) {
    return { ok: false, error: ERROR_MESSAGES.forbidden };
  }

  const kartType = parseKartType(formData.get("kart_type"));
  const duration = parseDuration(formData.get("duration_minutes"));
  const price = Number(formData.get("price_eur"));
  const recipient = String(formData.get("recipient_name") ?? "").trim() || null;
  const purchaser = String(formData.get("purchaser_name") ?? "").trim() || null;
  const validUntil = String(formData.get("valid_until") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!kartType || !duration || !Number.isFinite(price) || price < 0) {
    return { ok: false, error: "Dados do voucher inválidos." };
  }

  const supabase = await createServerSupabaseClient();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateVoucherCode();
    const { data, error } = await supabase
      .from("vouchers")
      .insert({
        code,
        kart_type: kartType,
        duration_minutes: duration,
        price_eur: price,
        recipient_name: recipient,
        purchaser_name: purchaser,
        valid_until: validUntil,
        notes,
        created_by: profile!.id,
      })
      .select("id, code")
      .single();

    if (!error && data) {
      await supabase.from("voucher_events").insert({
        voucher_id: data.id,
        event_type: "created",
        actor_id: profile!.id,
        metadata: { code: data.code },
      });
      revalidatePath("/admin/vouchers");
      return { ok: true, data: { id: data.id, code: data.code } };
    }

    if (error?.code !== "23505") {
      return { ok: false, error: "Não foi possível criar o voucher." };
    }
  }

  return { ok: false, error: "Não foi possível gerar um código único. Tente novamente." };
}

export async function cancelVoucherAction(voucherId: string): Promise<ActionResult> {
  const profile = await getAuthProfile();
  if (!canCancelVouchers(profile?.role)) {
    return { ok: false, error: ERROR_MESSAGES.forbidden };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("vouchers")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      cancelled_by: profile!.id,
    })
    .eq("id", voucherId)
    .eq("status", "active")
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { ok: false, error: "Só é possível cancelar vouchers ativos." };
  }

  await supabase.from("voucher_events").insert({
    voucher_id: voucherId,
    event_type: "cancelled",
    actor_id: profile!.id,
    metadata: {},
  });

  revalidatePath("/admin/vouchers");
  return { ok: true };
}

export async function lookupVoucherAction(rawCode: string): Promise<ActionResult<VoucherLookup>> {
  const profile = await getAuthProfile();
  if (!canValidateVouchers(profile?.role)) {
    return { ok: false, error: ERROR_MESSAGES.forbidden };
  }

  const code = extractVoucherCode(rawCode) ?? normalizeVoucherCode(rawCode);
  if (!isValidVoucherCode(code)) {
    return { ok: false, error: "Código inválido. Utilize o formato KIB-XXXXXXXX." };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("lookup_voucher", { p_code: code });

  if (error || !data) {
    return { ok: false, error: "Não foi possível consultar o voucher. Verifique a ligação." };
  }

  const payload = data as { ok: boolean; error?: string; voucher?: VoucherLookup };
  if (!payload.ok || !payload.voucher) {
    return { ok: false, error: ERROR_MESSAGES[payload.error ?? ""] ?? "Voucher não encontrado." };
  }

  return { ok: true, data: payload.voucher };
}

export async function consumeVoucherAction(rawCode: string): Promise<ActionResult<VoucherLookup>> {
  const profile = await getAuthProfile();
  if (!canValidateVouchers(profile?.role)) {
    return { ok: false, error: ERROR_MESSAGES.forbidden };
  }

  const code = extractVoucherCode(rawCode) ?? normalizeVoucherCode(rawCode);
  if (!isValidVoucherCode(code)) {
    return { ok: false, error: "Código inválido. Utilize o formato KIB-XXXXXXXX." };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("consume_voucher", { p_code: code });

  if (error || !data) {
    return { ok: false, error: "Não foi possível validar o voucher. Verifique a ligação." };
  }

  const payload = data as { ok: boolean; error?: string; voucher?: VoucherLookup };
  if (!payload.ok) {
    const extra =
      payload.error === "already_used" && payload.voucher?.used_at
        ? ` Utilizado em ${new Date(payload.voucher.used_at).toLocaleString("pt-PT")}${
            payload.voucher.used_by_name ? ` por ${payload.voucher.used_by_name}` : ""
          }.`
        : "";
    return {
      ok: false,
      error: `${ERROR_MESSAGES[payload.error ?? ""] ?? "Não foi possível utilizar o voucher."}${extra}`,
    };
  }

  revalidatePath("/admin/vouchers");
  revalidatePath("/admin/validar");
  revalidatePath(`/v/${code}`);
  return { ok: true, data: payload.voucher };
}

export async function downloadVoucherPdfAction(voucherId: string): Promise<ActionResult<{ filename: string; base64: string }>> {
  const profile = await getAuthProfile();
  if (!canManageVouchers(profile?.role)) {
    return { ok: false, error: ERROR_MESSAGES.forbidden };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("vouchers")
    .select("code, kart_type, duration_minutes, price_eur, recipient_name, purchaser_name, valid_until")
    .eq("id", voucherId)
    .single();

  if (error || !data) {
    return { ok: false, error: ERROR_MESSAGES.not_found };
  }

  const pdf = await buildVoucherPdf({
    ...data,
    kart_type: data.kart_type as KartType,
    price_eur: Number(data.price_eur),
  });

  return {
    ok: true,
    data: {
      filename: pdfFilename(data.code),
      base64: pdf.toString("base64"),
    },
  };
}
