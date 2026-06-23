"use client";

import { useState } from "react";
import { Phone, Mail, X } from "lucide-react";
import { siteConfig } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";

export function Footer() {
  const { navLinks } = useContent();
  const t = useTranslations();

  return (
    <footer className="border-t border-white/10 bg-kib-dark">
      <div className="checkered-stripe h-1 w-full opacity-40" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo variant="large" className="h-12 sm:h-14" />
            <p className="mt-4 text-sm text-kib-muted">{t.site.tagline}</p>
            <p className="mt-2 text-xs text-kib-muted">{siteConfig.address}</p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-kib-red">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {navLinks
                .filter((link) => link.href !== "/")
                .map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-kib-muted transition-colors hover:text-kib-red"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-kib-red">
              {t.footer.contacts}
            </h4>
            <ul className="space-y-2 text-sm text-kib-muted">
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="transition-colors hover:text-kib-red"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-kib-red"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-kib-red"
                >
                  {siteConfig.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="racing-line mx-auto mt-10 max-w-xs" />
        <p className="mt-6 text-center text-xs text-kib-muted">
          © {new Date().getFullYear()} {t.site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen && (
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-kib-card p-2 shadow-2xl shadow-black/50">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-kib-red hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {t.footer.call}
          </a>
          <a
            href={siteConfig.emailHref}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-kib-red hover:text-white"
          >
            <Mail className="h-4 w-4" />
            {t.contact.email}
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pulse-glow flex h-14 w-14 items-center justify-center rounded-full bg-kib-red text-white shadow-lg transition-transform hover:scale-110"
        aria-label={
          isOpen ? t.footer.closeQuickContact : t.footer.openQuickContact
        }
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Phone className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
