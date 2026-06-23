export const siteConfig = {
  email: "secretaria@kib.pt",
  phone: "+351 966 520 440",
  phoneHref: "tel:+351966520440",
  emailHref: "mailto:secretaria@kib.pt",
  instagram: "@kartodromo_braga",
  instagramUrl: "https://www.instagram.com/kartodromo_braga",
  address: "Rua do Kartódromo, Palmeira, 4711-911 Braga",
  coordinates: { lat: 41.588931, lng: -8.443092 },
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Kart%C3%B3dromo+Internacional+de+Braga,+Rua+do+Kart%C3%B3dromo,+Palmeira,+4711-911+Braga,+Portugal&hl=pt&z=16&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Kart%C3%B3dromo+Internacional+de+Braga,+Rua+do+Kart%C3%B3dromo,+Palmeira,+4711-911+Braga,+Portugal&travelmode=driving",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=41.588931,-8.443092",
  quoteEmail: "secretaria@kib.pt",
  quoteCcEmail: "josee.salgador@gmail.com",
};

export const galleryImageSources = [
  { src: "/images/hero-familia-karting.jpg", featured: true as const },
  { src: "/images/galeria-corrida-karts.jpg" },
  { src: "/images/galeria-bastidores.jpg" },
  { src: "/images/pista-karting.jpg" },
  { src: "/images/hero-pista-aerea.png" },
  { src: "/images/kart-crg-crianca.jpg" },
  { src: "/images/instalacoes-entrada.jpg" },
  { src: "/images/complexo-aereo.jpg" },
  { src: "/images/autodromo-vasco-sameiro.jpg" },
  { src: "/images/kart-crg-390.png" },
  { src: "/images/kart-crg-270.png" },
  { src: "/images/kart-crg-bilugar.png" },
];

export const kartsStatic = {
  detailed: {
    crg270: {
      image: "/images/kart-crg-270.png",
    },
    crg390: {
      image: "/images/kart-crg-390.png",
    },
  },
  simple: {
    crianca: {
      image: "/images/kart-crg-crianca-mini.png",
      containImage: true,
    },
    bilugar: {
      image: "/images/kart-crg-bilugar.png",
      containImage: true,
    },
  },
};

export const groupPricingStatic = [
  { price: "45€/kart" },
  { price: "53€/kart" },
  { price: "70€/kart" },
  { price: "123€/kart" },
  { price: "177€/kart" },
];

export type ScheduleTab = "eventos" | "aluguer" | "verao";
