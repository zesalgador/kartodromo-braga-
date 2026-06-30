"use client";

import {
  Clock,
  Users,
  Shield,
  Star,
  Timer,
  User,
  Baby,
  UserPlus,
  Mail,
  Phone,
  Flag,
} from "lucide-react";
import { Card } from "@/components/ui/SectionTitle";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/content";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";

const pricingIcons = {
  helmet: User,
  child: Baby,
  users: UserPlus,
};

export function Pricing() {
  const { individualPricing, individualNotes, groupPricing } = useContent();
  const t = useTranslations();

  return (
    <section id="precario" className="relative bg-kib-black pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0 speed-lines opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.pricing.title} subtitle={t.pricing.subtitle} />

        <div className="mb-20">
          <div className="mb-10 flex items-start gap-4">
            <div className="hidden h-16 w-1 rounded-full bg-kib-red sm:block" />
            <div>
              <h3 className="text-2xl font-black uppercase text-white sm:text-3xl">
                {t.pricing.individualTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-kib-muted">
                {t.pricing.individualSubtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {individualPricing.map((item) => {
              const Icon = pricingIcons[item.icon];
              return (
                <Card key={item.title} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-kib-red to-transparent" />
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kib-red/10">
                      <Icon className="h-5 w-5 text-kib-red" />
                    </div>
                    <h4 className="text-sm font-bold leading-tight text-white">
                      {item.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {item.prices.map((price) => (
                      <li
                        key={price.duration}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-kib-black/50 px-4 py-3"
                      >
                        <span className="flex items-center gap-2 text-sm text-kib-muted">
                          <Timer className="h-4 w-4 text-kib-red" />
                          {price.duration}
                        </span>
                        <span className="text-lg font-black text-kib-red">
                          {price.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {individualNotes.map((note) => (
              <span
                key={note}
                className="inline-flex items-center gap-2 rounded-full border border-kib-red/20 bg-kib-red/5 px-4 py-2 text-xs font-medium text-kib-muted"
              >
                <Star className="h-3 w-3 text-kib-red" />
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="mb-10 flex items-start gap-4">
            <div className="hidden h-16 w-1 rounded-full bg-kib-red sm:block" />
            <div>
              <h3 className="text-2xl font-black uppercase text-white sm:text-3xl">
                {t.pricing.ownKartTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-kib-muted">
                {t.pricing.ownKartSubtitle}
              </p>
            </div>
          </div>

          <Card className="relative mx-auto max-w-xl overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-kib-red to-transparent" />
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kib-red/10">
                <Flag className="h-5 w-5 text-kib-red" />
              </div>
              <h4 className="text-sm font-bold leading-tight text-white">
                {t.pricing.ownKartTitle}
              </h4>
            </div>
            <ul className="space-y-3">
              {t.pricing.ownKartPrices.map((item) => (
                <li
                  key={item.duration}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-kib-black/50 px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm text-kib-muted">
                    <Timer className="h-4 w-4 text-kib-red" />
                    {item.duration}
                  </span>
                  <span className="text-lg font-black text-kib-red">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <div className="mb-10 flex items-start gap-4">
            <div className="hidden h-16 w-1 rounded-full bg-kib-red sm:block" />
            <div>
              <h3 className="text-2xl font-black uppercase text-white sm:text-3xl">
                {t.pricing.groupTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-kib-muted">
                {t.pricing.groupSubtitle}
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-xl border border-kib-red/30 bg-kib-red/10 px-5 py-4">
            <Users className="h-5 w-5 shrink-0 text-kib-red" />
            <p className="text-sm font-semibold text-white">
              {t.pricing.groupBanner}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupPricing.map((item, index) => (
              <Card
                key={item.format}
                className={
                  index === groupPricing.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-kib-muted">
                      <Clock className="h-3 w-3 text-kib-red" />
                      {t.pricing.formatLabel}
                    </p>
                    <p className="text-base font-bold text-white">{item.format}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-kib-red">{item.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-xl border-2 border-kib-red bg-kib-red/10 px-6 py-4 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-bold text-kib-red sm:text-base">
              <Shield className="h-5 w-5" />
              {t.pricing.minMax}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button
              href={siteConfig.emailHref}
              variant="primary"
              className="w-full sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              {t.contact.sendEmail}
            </Button>
            <Button
              href={siteConfig.phoneHref}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              {t.contact.callNow}: {siteConfig.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
