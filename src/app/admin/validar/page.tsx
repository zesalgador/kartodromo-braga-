import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ValidarClient } from "@/components/admin/ValidarClient";
import { getAuthProfile } from "@/lib/supabase/server";
import { canValidateVouchers } from "@/lib/vouchers/permissions";

export const dynamic = "force-dynamic";

export default async function AdminValidarPage() {
  const profile = await getAuthProfile();
  if (!profile) redirect("/admin/login");
  if (!canValidateVouchers(profile.role)) redirect("/admin/login");

  return (
    <AdminShell profile={profile}>
      <ValidarClient />
    </AdminShell>
  );
}
