import { createHash } from "crypto";
import { headers } from "next/headers";
import { createAnonSupabaseClient, createServerSupabaseClient, getAuthProfile } from "@/lib/supabase/server";
import { extractVoucherCode } from "./codes";
import { canValidateVouchers } from "./permissions";
import { sanitizePublicVoucher, type PublicVoucherView } from "./public-lookup";

export type PublicLookupResult =
  | { ok: true; voucher: PublicVoucherView }
  | { ok: false; error: "not_found" | "rate_limited" | "unavailable" };

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export async function clientIpHash(): Promise<string | null> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    headerStore.get("cf-connecting-ip") ||
    "local";
  if (!ip) return null;
  return hashIp(ip);
}

export async function fetchPublicVoucher(rawCode: string): Promise<PublicLookupResult> {
  const code = extractVoucherCode(rawCode);
  if (!code) {
    return { ok: false, error: "not_found" };
  }

  const token = process.env.VOUCHER_LOOKUP_SECRET;
  if (!token || token.length < 32 || process.env.NEXT_PUBLIC_VOUCHER_LOOKUP_SECRET) {
    return { ok: false, error: "unavailable" };
  }

  const ipHash = await clientIpHash();
  if (!ipHash) {
    return { ok: false, error: "rate_limited" };
  }

  try {
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase.rpc("public_lookup_voucher", {
      p_code: code,
      p_ip_hash: ipHash,
      p_token: token,
    });

    if (error || !data) {
      return { ok: false, error: "unavailable" };
    }

    const payload = data as { ok?: boolean; error?: string; voucher?: unknown };
    if (payload.error === "rate_limited") {
      return { ok: false, error: "rate_limited" };
    }
    if (!payload.ok) {
      return { ok: false, error: "not_found" };
    }

    const voucher = sanitizePublicVoucher(payload.voucher);
    if (!voucher) {
      return { ok: false, error: "not_found" };
    }

    return { ok: true, voucher };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}

export async function loadPublicVoucherPage(rawCode: string): Promise<{
  result: PublicLookupResult;
  canConfirmUse: boolean;
  isStaffSession: boolean;
}> {
  const profile = await getAuthProfile();
  const isStaffSession = canValidateVouchers(profile?.role);

  if (!isStaffSession) {
    return {
      result: await fetchPublicVoucher(rawCode),
      canConfirmUse: false,
      isStaffSession: false,
    };
  }

  const code = extractVoucherCode(rawCode);
  if (!code) {
    return { result: { ok: false, error: "not_found" }, canConfirmUse: false, isStaffSession };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.rpc("lookup_voucher", { p_code: code });
    if (error || !data) {
      return { result: { ok: false, error: "unavailable" }, canConfirmUse: false, isStaffSession };
    }

    const payload = data as { ok?: boolean; voucher?: unknown };
    const voucher = payload.ok ? sanitizePublicVoucher(payload.voucher) : null;
    if (!voucher) {
      return { result: { ok: false, error: "not_found" }, canConfirmUse: false, isStaffSession };
    }

    return {
      result: { ok: true, voucher },
      canConfirmUse: voucher.status === "active",
      isStaffSession,
    };
  } catch {
    return { result: { ok: false, error: "unavailable" }, canConfirmUse: false, isStaffSession };
  }
}
