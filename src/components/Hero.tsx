"use client";

import Image from "next/image";
import { ChevronRight, Gauge, FileText, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

export function Hero() {
  const t = useTranslations();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-kib-black"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-rotax-corrida.jpg"
          alt={t.hero.imageAlt}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-kib-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-kib-black/88 via-kib-black/45 to-kib-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-kib-black/50 via-transparent to-kib-black/25" />
      </div>

      <div className="absolute inset-0 racing-grid opacity-15" />
      <div className="absolute inset-0 speed-lines opacity-15" />
      <div className="checkered-stripe absolute top-0 right-0 left-0 h-1 opacity-80" />

      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-kib-red/30 bg-kib-red/10 px-4 py-2 backdrop-blur-sm">
            <Gauge className="h-4 w-4 text-kib-red" />
            <span className="text-xs font-bold uppercase tracking-widest text-kib-red">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="animate-fade-in-up animate-delay-100 text-4xl font-black uppercase leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            {t.hero.titleBefore}{" "}
            <span className="text-kib-red">{t.hero.titleHighlight}</span>{" "}
            {t.hero.titleAfter}
          </h1>

          <p className="animate-fade-in-up animate-delay-200 mt-6 text-xl font-semibold text-white/90 sm:text-2xl">
            {t.hero.subtitle}
          </p>

          <p className="animate-fade-in-up animate-delay-300 mt-4 max-w-xl text-base leading-relaxed text-kib-muted sm:text-lg">
            {t.hero.description}
          </p>

          <div className="animate-fade-in-up animate-delay-400 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/#orcamentos" variant="primary">
              <FileText className="h-4 w-4" />
              {t.hero.quote}
            </Button>
            <Button href="/#horarios" variant="outline">
              <Clock className="h-4 w-4" />
              {t.hero.hours}
            </Button>
            <Button href="/#contactos" variant="outline">
              <Phone className="h-4 w-4" />
              {t.hero.contacts}
            </Button>
            <Button href="/precario" variant="secondary">
              {t.hero.pricing}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0">
        <div className="racing-line w-full max-w-none" />
        <div className="checkered-stripe h-2 w-full opacity-60" />
      </div>
    </section>
  );
}
