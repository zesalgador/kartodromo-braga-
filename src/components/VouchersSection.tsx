"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Gift, ChevronDown } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ButtonElement } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

const voucherImages = [
  "/images/vouchers/voucher-10-minutos.png",
  "/images/vouchers/voucher-20-minutos.png",
  "/images/vouchers/voucher-pista-reservada.png",
];

export function VouchersSection() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#vouchers") {
        setIsOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="vouchers" className="relative bg-kib-black py-20 sm:py-28">
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.vouchers.title} subtitle={t.vouchers.subtitle} />

        <div className="text-center">
          <ButtonElement
            type="button"
            variant="primary"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            className="min-w-[220px]"
          >
            <Gift className="h-4 w-4" />
            {isOpen ? t.vouchers.hideButton : t.vouchers.showButton}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </ButtonElement>
        </div>

        <div
          className={`grid gap-6 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3 ${
            isOpen
              ? "pointer-events-auto mt-10 max-h-[5000px] opacity-100"
              : "pointer-events-none mt-0 max-h-0 overflow-hidden opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          {t.vouchers.items.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-kib-card shadow-xl shadow-black/30"
            >
              <div className="relative aspect-[16/10] w-full bg-transparent">
                <Image
                  src={voucherImages[index]}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain object-center p-3"
                />
              </div>
              <div className="border-t border-white/10 px-5 py-4">
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-kib-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
