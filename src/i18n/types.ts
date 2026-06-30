export type Locale = "pt" | "en" | "es" | "fr";

export const LOCALES: {
  code: Locale;
  label: string;
  htmlLang: string;
}[] = [
  { code: "pt", label: "PT", htmlLang: "pt-PT" },
  { code: "en", label: "EN", htmlLang: "en" },
  { code: "es", label: "ES", htmlLang: "es" },
  { code: "fr", label: "FR", htmlLang: "fr" },
];

export const DEFAULT_LOCALE: Locale = "pt";
export const LOCALE_STORAGE_KEY = "kib-locale";

export type ScheduleTab = "eventos" | "aluguer" | "verao";

export interface Translations {
  site: {
    name: string;
    tagline: string;
  };
  nav: {
    home: string;
    karts: string;
    circuit: string;
    gallery: string;
    contacts: string;
    rules: string;
  };
  header: {
    bookContact: string;
    openMenu: string;
    closeMenu: string;
    backMenu: string;
    logoAria: string;
    selectLanguage: string;
  };
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    description: string;
    quote: string;
    hours: string;
    contacts: string;
    pricing: string;
    imageAlt: string;
  };
  photoPreview: {
    title: string;
    subtitle: string;
    viewGallery: string;
  };
  quickAccess: {
    explore: string;
    quotes: { title: string; description: string };
    pricing: { title: string; description: string };
    gallery: { title: string; description: string };
    karts: { title: string; description: string };
  };
  circuit: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    eventsTitle: string;
    events: string[];
    requestQuote: string;
    imageAlt: string;
  };
  quote: {
    title: string;
    subtitle: string;
    selectSpace: string;
    spaces: {
      kartodromo: { label: string; description: string };
      autodromo: { label: string; description: string };
      espacoGeral: { label: string; description: string };
    };
    durations: string[];
    selectedSpace: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    duration: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    newRequest: string;
    subjectPrefix: string;
  };
  hours: {
    title: string;
    subtitle: string;
    period: string;
    notes: string;
    exceptionsTitle: string;
    exceptionsNote: string;
    tabs: Record<ScheduleTab, { label: string; shortLabel: string }>;
    content: Record<
      ScheduleTab,
      { title: string; schedule: string[]; notes?: string[]; period?: string }
    >;
    closedDays: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    instagram: string;
    location: string;
    ctaTitle: string;
    ctaText: string;
    sendEmail: string;
    callNow: string;
    directions: string;
    mapTitle: string;
  };
  footer: {
    quickLinks: string;
    contacts: string;
    rights: string;
    call: string;
    openQuickContact: string;
    closeQuickContact: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    items: { title: string; caption: string; alt: string }[];
  };
  karts: {
    title: string;
    subtitle: string;
    fleetLabel: string;
    specsTitle: string;
    idealForTitle: string;
    alsoAvailable: string;
    viewPricing: string;
    detailed: {
      crg270: { title: string; tagline: string; imageAlt: string; specs: string[]; idealFor: string[] };
      crg390: { title: string; tagline: string; imageAlt: string; specs: string[]; idealFor: string[] };
    };
    simple: {
      crianca: { title: string; description: string; imageAlt: string };
      bilugar: { title: string; description: string; imageAlt: string };
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    individualTitle: string;
    individualSubtitle: string;
    groupTitle: string;
    groupSubtitle: string;
    groupBanner: string;
    formatLabel: string;
    minMax: string;
    individual: {
      adult: string;
      child: string;
      bilugar: string;
    };
    durations: {
      min10: string;
      min20: string;
      min30: string;
    };
    notes: string[];
    groupFormats: string[];
    ownKartTitle: string;
    ownKartSubtitle: string;
    ownKartPrices: { duration: string; price: string }[];
  };
  security: {
    title: string;
    subtitle: string;
    intro: string;
    warning: string;
    rules: string[];
    footer: string;
  };
}
