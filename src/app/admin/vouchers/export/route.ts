import { NextResponse } from "next/server";
import { createServerSupabaseClient, getAuthProfile } from "@/lib/supabase/server";
import { canExportVouchers } from "@/lib/vouchers/permissions";
import { KART_LABELS, STATUS_LABELS, type KartType, type VoucherStatus } from "@/lib/vouchers/types";

function csvCell(value: string | number | null | undefined) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const profile = await getAuthProfile();
  if (!canExportVouchers(profile?.role)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("vouchers")
    .select(
      "code, kart_type, duration_minutes, price_eur, recipient_name, purchaser_name, valid_until, status, created_at, used_at, used_by_profile:profiles!vouchers_used_by_fkey(full_name)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "export_failed" }, { status: 500 });
  }

  const header = [
    "codigo",
    "kart",
    "duracao_min",
    "preco_eur",
    "para",
    "de",
    "validade",
    "estado",
    "criado_em",
    "utilizado_em",
    "utilizado_por",
  ];

  const lines = [
    header.join(";"),
    ...(data ?? []).map((row) => {
      const usedProfile = row.used_by_profile as { full_name?: string } | { full_name?: string }[] | null;
      const usedBy = Array.isArray(usedProfile) ? usedProfile[0]?.full_name : usedProfile?.full_name;
      return [
        csvCell(row.code),
        csvCell(KART_LABELS[row.kart_type as KartType] ?? row.kart_type),
        csvCell(row.duration_minutes),
        csvCell(row.price_eur),
        csvCell(row.recipient_name),
        csvCell(row.purchaser_name),
        csvCell(row.valid_until),
        csvCell(STATUS_LABELS[row.status as VoucherStatus] ?? row.status),
        csvCell(row.created_at),
        csvCell(row.used_at),
        csvCell(usedBy ?? ""),
      ].join(";");
    }),
  ];

  return new NextResponse(`\uFEFF${lines.join("\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="vouchers-kib.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
