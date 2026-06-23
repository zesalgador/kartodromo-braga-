"use client";

import { MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

export function GoogleMap() {
  const t = useTranslations();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 bg-kib-card px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kib-red/10">
            <MapPin className="h-5 w-5 text-kib-red" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{t.site.name}</p>
            <p className="text-xs text-kib-muted">{siteConfig.address}</p>
          </div>
        </div>
        <Button
          href={siteConfig.mapsDirectionsUrl}
          variant="outline"
          className="!px-4 !py-2 text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t.contact.directions}</span>
        </Button>
      </div>

      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <iframe
          title={t.contact.mapTitle}
          src={siteConfig.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
