"use client";

import Image from "next/image";
import { ChevronRight, Images, Tag, Car, FileText } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";

export function PhotoPreview() {
  const { galleryImages } = useContent();
  const t = useTranslations();
  const previewImages = galleryImages.slice(0, 3);

  return (
    <section className="relative bg-kib-dark py-20 sm:py-28">
      <div className="absolute inset-0 racing-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t.photoPreview.title}
          subtitle={t.photoPreview.subtitle}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {previewImages.map((image, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                  isFeatured ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden bg-kib-black ${
                    isFeatured
                      ? "aspect-[16/9] md:aspect-auto md:min-h-[360px]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kib-black/90 via-kib-black/10 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-5">
                    <p className="font-bold text-white">{image.title}</p>
                    <p className="mt-1 text-sm text-kib-muted">{image.caption}</p>
                  </div>
                  <div className="absolute top-0 right-0 left-0 h-1 bg-kib-red opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href="/galeria" variant="outline">
            <Images className="h-4 w-4" />
            {t.photoPreview.viewGallery}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function QuickAccess() {
  const t = useTranslations();

  const links = [
    {
      href: "/#orcamentos",
      icon: FileText,
      title: t.quickAccess.quotes.title,
      description: t.quickAccess.quotes.description,
    },
    {
      href: "/precario",
      icon: Tag,
      title: t.quickAccess.pricing.title,
      description: t.quickAccess.pricing.description,
    },
    {
      href: "/galeria",
      icon: Images,
      title: t.quickAccess.gallery.title,
      description: t.quickAccess.gallery.description,
    },
    {
      href: "/karts",
      icon: Car,
      title: t.quickAccess.karts.title,
      description: t.quickAccess.karts.description,
    },
  ];

  return (
    <section className="relative bg-kib-black py-16 sm:py-20">
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-white/10 bg-kib-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-kib-red/40 hover:shadow-xl hover:shadow-kib-red/5"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-kib-red/10 transition-colors group-hover:bg-kib-red/20">
                  <Icon className="h-7 w-7 text-kib-red" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">
                  {link.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-kib-muted">
                  {link.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-kib-red">
                  {t.quickAccess.explore}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
