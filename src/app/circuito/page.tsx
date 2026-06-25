import type { Metadata } from "next";
import { CircuitSection } from "@/components/CircuitSection";

export const metadata: Metadata = {
  title: "Circuito Automóveis | Kartódromo Internacional de Braga",
  description:
    "Circuito Vasco Sameiro em Braga — track days, treinos, drift days, eventos empresariais e experiências em pista.",
};

export default function CircuitoPage() {
  return (
    <main>
      <CircuitSection />
    </main>
  );
}
