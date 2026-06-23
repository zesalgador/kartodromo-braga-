"use client";

import { Shield, AlertTriangle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/SectionTitle";
import { useTranslations } from "@/i18n/LanguageProvider";

export function SecurityRules() {
  const t = useTranslations();

  return (
    <section id="regras-seguranca" className="relative bg-kib-black pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.security.title} subtitle={t.security.subtitle} />

        <Card hover={false} className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-start gap-4 rounded-xl border border-kib-red/20 bg-kib-red/5 p-5">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-kib-red" />
            <p className="text-sm leading-relaxed text-kib-muted">
              {t.security.intro}
            </p>
          </div>

          <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <p className="text-sm font-medium leading-relaxed text-kib-muted">
              {t.security.warning}
            </p>
          </div>

          <ol className="space-y-4">
            {t.security.rules.map((rule, index) => (
              <li
                key={rule}
                className="flex gap-4 rounded-lg border border-white/5 bg-kib-black/50 px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kib-red text-xs font-black text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-white">
                  {rule}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-kib-muted">
            {t.security.footer}
          </p>
        </Card>
      </div>
    </section>
  );
}
