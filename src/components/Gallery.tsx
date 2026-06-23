"use client";

import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";

export function Gallery() {
  const { galleryImages } = useContent();
  const t = useTranslations();

  return (
    <section id="galeria" className="relative bg-kib-black pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0 racing-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.gallery.title} subtitle={t.gallery.subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => {
            const isFeatured = "featured" in image && image.featured;

            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden bg-kib-black ${
                    isFeatured ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      isFeatured
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, 33vw"
                    }
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kib-black/90 via-kib-black/10 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-5">
                    <p className="text-sm font-bold text-white">{image.title}</p>
                    <p className="mt-1 text-xs text-kib-muted">{image.caption}</p>
                  </div>
                  <div className="absolute top-0 right-0 left-0 h-1 bg-kib-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
