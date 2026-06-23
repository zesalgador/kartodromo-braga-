import type { Metadata } from "next";
import { KartsFleet } from "@/components/KartsFleet";

export const metadata: Metadata = {
  title: "Os Nossos Karts | Kartódromo Internacional de Braga",
  description:
    "Conhece a frota CRG 270cc, CRG 390cc, karts de criança e bi-lugar do Kartódromo Internacional de Braga.",
};

export default function KartsPage() {
  return (
    <main>
      <KartsFleet />
    </main>
  );
}
