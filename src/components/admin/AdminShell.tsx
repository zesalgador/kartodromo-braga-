"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, QrCode, LogOut } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { ROLE_LABELS, type Profile } from "@/lib/vouchers/types";
import { canManageVouchers } from "@/lib/vouchers/permissions";

export function AdminShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = canManageVouchers(profile.role);

  async function handleLogout() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const links = [
    ...(isAdmin
      ? [{ href: "/admin/vouchers", label: "Vouchers", icon: Gift }]
      : []),
    { href: "/admin/validar", label: "Validar", icon: QrCode },
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-kib-red">
            Área reservada
          </p>
          <h1 className="text-xl font-black uppercase tracking-tight sm:text-2xl">
            Vouchers KIB
          </h1>
          <p className="mt-1 text-sm text-kib-muted">
            {profile.full_name} · {ROLE_LABELS[profile.role]}
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                  active
                    ? "bg-kib-red text-white"
                    : "border border-white/15 bg-white/5 text-white hover:border-kib-red/40"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-kib-muted hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </nav>
      </header>
      {children}
    </div>
  );
}
