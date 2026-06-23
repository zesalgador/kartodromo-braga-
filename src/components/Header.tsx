"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { navLinks } = useContent();
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const contactHref = pathname === "/" ? "#contactos" : "/#contactos";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-kib-black/95 backdrop-blur-md"
          : "bg-kib-black/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative z-10 shrink-0 bg-transparent transition-transform duration-300 hover:scale-[1.02]"
          aria-label={t.header.logoAria}
        >
          <Logo priority variant="large" className="h-11 w-auto sm:h-14" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 xl:gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-semibold tracking-wide text-white/90 transition-colors hover:text-kib-red xl:text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button href={contactHref} variant="primary" className="!px-5 !py-2.5">
            {t.header.bookContact}
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            aria-label={isOpen ? t.header.closeMenu : t.header.openMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-[68px] z-40 bg-kib-black/98 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-white/5 px-4 py-4 text-lg font-semibold text-white transition-all hover:border-kib-red/30 hover:bg-kib-card hover:text-kib-red"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href={contactHref}
            variant="primary"
            className="mt-4 w-full"
            onClick={() => setIsOpen(false)}
          >
            {t.header.bookContact}
          </Button>
        </nav>
      </div>
    </header>
  );
}
