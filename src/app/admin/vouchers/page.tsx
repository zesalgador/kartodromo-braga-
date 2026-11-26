import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { VouchersDashboard } from "@/components/admin/VouchersDashboard";
import { createServerSupabaseClient, getAuthProfile } from "@/lib/supabase/server";
import { canManageVouchers } from "@/lib/vouchers/permissions";
import type { Voucher } from "@/lib/vouchers/types";

export const dynamic = "force-dynamic";

export default async function AdminVouchersPage() {
  const profile = await getAuthProfile();
  if (!profile) redirect("/admin/login");
  if (!canManageVouchers(profile.role)) redirect("/admin/validar");

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("vouchers")
    .select(
      "id, code, kart_type, duration_minutes, price_eur, recipient_name, purchaser_name, valid_until, status, notes, created_by, created_at, used_at, used_by, cancelled_at, cancelled_by, creator:profiles!vouchers_created_by_fkey(full_name), user:profiles!vouchers_used_by_fkey(full_name)",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  const vouchers = ((data ?? []) as Array<Voucher & { creator?: { full_name: string } | { full_name: string }[] | null; user?: { full_name: string } | { full_name: string }[] | null }>).map(
    (row) => ({
      ...row,
      creator_name: Array.isArray(row.creator) ? row.creator[0]?.full_name : row.creator?.full_name,
      user_name: Array.isArray(row.user) ? row.user[0]?.full_name : row.user?.full_name,
    }),
  );

  return (
    <AdminShell profile={profile}>
      <VouchersDashboard vouchers={vouchers} />
    </AdminShell>
  );
}
