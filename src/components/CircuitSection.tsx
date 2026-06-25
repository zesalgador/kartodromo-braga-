"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

export function CircuitSection() {
  const t = useTranslations();

  const handleQuoteClick = () => {
    sessionStorage.setItem("kib-quote-space", "autodromo");
    window.dispatchEvent(new CustomEvent("kib-quote-preset"));
  };

  return (
    <section id="circuito-automoveis" className="relative bg-kib-black pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0 racing-grid opacity-15" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.circuit.title} subtitle={t.circuit.subtitle} />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="space-y-5 text-base leading-relaxed text-kib-muted sm:text-lg">
              <p>{t.circuit.paragraph1}</p>
              <p>{t.circuit.paragraph2}</p>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-kib-red">
                {t.circuit.eventsTitle}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {t.circuit.events.map((event) => (
                  <li
                    key={event}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-kib-card/60 px-4 py-3 text-sm font-medium text-white sm:text-base"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-kib-red" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href="/#orcamentos"
              variant="primary"
              className="w-full sm:w-auto"
              onClick={handleQuoteClick}
            >
              <FileText className="h-4 w-4" />
              {t.circuit.requestQuote}
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <div className="relative aspect-[876/404] w-full">
                <Image
                  src="/images/circuito-vasco-sameiro-aereo.png"
                  alt={t.circuit.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kib-black/50 via-transparent to-transparent" />
                <p className="absolute right-0 bottom-0 left-0 p-5 text-sm font-semibold text-white sm:text-base">
                  Circuito Vasco Sameiro · Braga
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
