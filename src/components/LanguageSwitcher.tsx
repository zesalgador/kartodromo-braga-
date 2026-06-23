"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES, type Locale } from "@/i18n/types";

function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === "pt") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-sm" aria-hidden>
        <rect width="24" height="16" fill="#006600" />
        <rect width="24" height="8" y="8" fill="#FF0000" />
        <circle cx="7" cy="8" r="3.2" fill="#FFCC00" stroke="#000" strokeWidth="0.3" />
        <circle cx="7" cy="8" r="2.2" fill="#FF0000" />
        <circle cx="7" cy="8" r="1.2" fill="#FFF" />
        <circle cx="7" cy="8" r="0.45" fill="#006600" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-sm" aria-hidden>
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFF" strokeWidth="2.5" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.2" />
        <path d="M12 0 V16 M0 8 H24" stroke="#FFF" strokeWidth="4" />
        <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.2" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-sm" aria-hidden>
        <rect width="24" height="16" fill="#AA151B" />
        <rect width="24" height="8" y="4" fill="#F1BF00" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-sm" aria-hidden>
      <rect width="8" height="16" fill="#002395" />
      <rect width="8" height="16" x="8" fill="#FFF" />
      <rect width="8" height="16" x="16" fill="#ED2939" />
    </svg>
  );
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LOCALES.find((item) => item.code === locale)!;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/15 bg-kib-card/80 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-kib-red/40 hover:bg-kib-card"
        aria-label={t.header.selectLanguage}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <FlagIcon locale={locale} />
        <span>{current.label}</span>
        <ChevronDown
          className={`h-4 w-4 text-kib-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-white/10 bg-kib-card py-1 shadow-xl shadow-black/40"
        >
          {LOCALES.map((item) => (
            <li key={item.code} role="option" aria-selected={locale === item.code}>
              <button
                type="button"
                onClick={() => {
                  setLocale(item.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/5 ${
                  locale === item.code
                    ? "bg-kib-red/10 font-semibold text-kib-red"
                    : "text-white"
                }`}
              >
                <FlagIcon locale={item.code} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
