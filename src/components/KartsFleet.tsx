"use client";

import Image from "next/image";
import { Check, Wrench, Target } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";

const kartImageFrame =
  "relative aspect-[4/3] w-full overflow-hidden bg-kib-black";

function KartImage({
  src,
  alt,
  contain = false,
}: {
  src: string;
  alt: string;
  contain?: boolean;
}) {
  return (
    <div className={kartImageFrame}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={
          contain
            ? "object-contain object-center p-4"
            : "object-cover object-center"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-kib-black/50 via-transparent to-transparent" />
    </div>
  );
}

export function KartsFleet() {
  const { kartsDetailed, kartsSimple } = useContent();
  const t = useTranslations();

  return (
    <section className="relative bg-kib-black pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.karts.title} subtitle={t.karts.subtitle} />

        <div className="space-y-10">
          {kartsDetailed.map((kart, index) => (
            <Card key={kart.id} hover={false} className="overflow-hidden p-0">
              <div
                className={`grid lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="lg:[direction:ltr]">
                  <KartImage src={kart.image} alt={kart.imageAlt} contain />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:[direction:ltr]">
                  <p className="text-xs font-bold uppercase tracking-widest text-kib-red">
                    {t.karts.fleetLabel}
                  </p>
                  <h3 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
                    {kart.title}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-kib-muted">
                    {kart.tagline}
                  </p>

                  <div className="my-8 h-px bg-gradient-to-r from-kib-red/50 via-white/10 to-transparent" />

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-kib-red" />
                        <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                          {t.karts.specsTitle}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {kart.specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2 text-sm text-kib-muted"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-kib-red" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-kib-black/40 p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Target className="h-4 w-4 text-kib-red" />
                        <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                          {t.karts.idealForTitle}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {kart.idealFor.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-kib-muted"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kib-red" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-xl font-black uppercase text-white sm:text-2xl">
            {t.karts.alsoAvailable}
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {kartsSimple.map((kart) => (
              <Card key={kart.id} className="overflow-hidden p-0">
                <KartImage
                  src={kart.image}
                  alt={kart.imageAlt}
                  contain={kart.containImage}
                />
                <div className="p-6">
                  <h4 className="text-xl font-black uppercase text-white">
                    {kart.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-kib-muted">
                    {kart.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button href="/precario" variant="primary">
            {t.karts.viewPricing}
          </Button>
        </div>
      </div>
    </section>
  );
}
