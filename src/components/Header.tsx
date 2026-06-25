"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu } from "lucide-react";
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

  const contactHref = pathname === "/" ? "#contactos" : "/#contactos";
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-150 lg:bg-kib-black/60 lg:backdrop-blur-md ${
        isOpen
          ? "bg-kib-black shadow-lg shadow-black/40"
          : scrolled
            ? "border-b border-white/10 bg-kib-black/95 backdrop-blur-md"
            : "bg-kib-black/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
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
          {!isOpen && <LanguageSwitcher />}
          {isOpen ? (
            <button
              type="button"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
              aria-label={t.header.backMenu}
            >
              <ArrowLeft className="h-5 w-5 shrink-0" />
              {t.header.backMenu}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
              aria-label={t.header.openMenu}
              aria-expanded={isOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-kib-black transition-all duration-200 ease-out lg:hidden ${
          isOpen
            ? "max-h-[min(70vh,520px)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block border-b border-white/5 py-3.5 text-lg font-semibold text-white transition-colors last:border-b-0 hover:text-kib-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 border-t border-white/10 px-4 pb-5 pt-3 sm:px-6">
          <Button
            href={contactHref}
            variant="primary"
            className="w-full"
            onClick={closeMenu}
          >
            {t.header.bookContact}
          </Button>
          <LanguageSwitcher className="flex justify-center" />
        </div>
      </div>
    </header>
  );
}
