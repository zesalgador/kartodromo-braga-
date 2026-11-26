import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Galeria | Kartódromo Internacional de Braga",
  description:
    "Fotos da pista, frota de karts CRG e experiências no Kartódromo Internacional de Braga.",
};

export default function GaleriaPage() {
  return (
    <main>
      <Gallery />
    </main>
  );
}
