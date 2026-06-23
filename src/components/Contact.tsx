"use client";

import {
  Mail,
  Phone,
  Instagram,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/SectionTitle";
import { GoogleMap } from "@/components/GoogleMap";
import { useTranslations } from "@/i18n/LanguageProvider";

export function Contact() {
  const t = useTranslations();

  const contactItems = [
    {
      icon: Mail,
      label: t.contact.email,
      value: siteConfig.email,
      href: siteConfig.emailHref,
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
    },
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: siteConfig.instagram,
      href: siteConfig.instagramUrl,
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: siteConfig.address,
      href: siteConfig.mapsUrl,
    },
  ];

  return (
    <section id="contactos" className="relative bg-kib-black py-20 sm:py-28">
      <div className="absolute inset-0 speed-lines opacity-40" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-kib-red/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const inner = (
                <Card className="h-full">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-kib-red/10">
                    <Icon className="h-5 w-5 text-kib-red" />
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-kib-muted">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </Card>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>

          <Card className="flex flex-col justify-center">
            <h3 className="mb-2 text-xl font-bold text-white">
              {t.contact.ctaTitle}
            </h3>
            <p className="mb-8 text-sm text-kib-muted">{t.contact.ctaText}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={siteConfig.emailHref} variant="primary">
                <Mail className="h-4 w-4" />
                {t.contact.sendEmail}
              </Button>
              <Button href={siteConfig.phoneHref} variant="outline">
                <Phone className="h-4 w-4" />
                {t.contact.callNow}
              </Button>
              <Button
                href={siteConfig.instagramUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" />
                Instagram
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Button>
            </div>
          </Card>
        </div>

        <GoogleMap />
      </div>
    </section>
  );
}
