import { redirect } from "next/navigation";
import { getAuthProfile } from "@/lib/supabase/server";
import { defaultAdminPath } from "@/lib/vouchers/permissions";

export default async function AdminIndexPage() {
  const profile = await getAuthProfile();
  if (!profile) {
    redirect("/admin/login");
  }
  redirect(defaultAdminPath(profile.role));
}
