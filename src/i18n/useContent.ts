"use client";

import { useMemo } from "react";
import { galleryImageSources, kartsStatic, groupPricingStatic } from "@/data/content";
import { useTranslations } from "./LanguageProvider";
import type { ScheduleTab } from "./types";

export function useContent() {
  const t = useTranslations();

  return useMemo(() => {
    const navLinks = [
      { label: t.nav.home, href: "/" },
      { label: t.nav.karts, href: "/karts" },
      { label: t.nav.circuit, href: "/circuito" },
      { label: t.nav.gallery, href: "/galeria" },
      { label: t.nav.contacts, href: "/#contactos" },
      { label: t.nav.rules, href: "/regras-seguranca" },
    ];

    const galleryImages = galleryImageSources.map((item, index) => ({
      ...item,
      ...t.gallery.items[index],
    }));

    const kartsDetailed = [
      {
        id: "crg-270" as const,
        ...kartsStatic.detailed.crg270,
        ...t.karts.detailed.crg270,
      },
      {
        id: "crg-390" as const,
        ...kartsStatic.detailed.crg390,
        ...t.karts.detailed.crg390,
      },
    ];

    const kartsSimple = [
      {
        id: "crianca" as const,
        ...kartsStatic.simple.crianca,
        ...t.karts.simple.crianca,
      },
      {
        id: "bilugar" as const,
        ...kartsStatic.simple.bilugar,
        ...t.karts.simple.bilugar,
      },
    ];

    const individualPricing = [
      {
        title: t.pricing.individual.adult,
        icon: "helmet" as const,
        prices: [
          { duration: t.pricing.durations.min10, price: "20€" },
          { duration: t.pricing.durations.min20, price: "40€" },
          { duration: t.pricing.durations.min30, price: "60€" },
        ],
      },
      {
        title: t.pricing.individual.child,
        icon: "child" as const,
        prices: [
          { duration: t.pricing.durations.min10, price: "20€" },
          { duration: t.pricing.durations.min20, price: "40€" },
          { duration: t.pricing.durations.min30, price: "60€" },
        ],
      },
      {
        title: t.pricing.individual.bilugar,
        icon: "users" as const,
        prices: [
          { duration: t.pricing.durations.min10, price: "20€" },
          { duration: t.pricing.durations.min20, price: "40€" },
          { duration: t.pricing.durations.min30, price: "60€" },
        ],
      },
    ];

    const groupPricing = groupPricingStatic.map((item, index) => ({
      format: t.pricing.groupFormats[index],
      price: item.price,
    }));

    const scheduleTabs = (["eventos", "aluguer", "verao"] as ScheduleTab[]).map(
      (id) => ({
        id,
        label: t.hours.tabs[id].label,
        shortLabel: t.hours.tabs[id].shortLabel,
      }),
    );

    const scheduleContent = t.hours.content;

    return {
      navLinks,
      galleryImages,
      kartsDetailed,
      kartsSimple,
      individualPricing,
      individualNotes: t.pricing.notes,
      groupPricing,
      scheduleTabs,
      scheduleContent,
      scheduleClosedDays: t.hours.closedDays,
    };
  }, [t]);
}
