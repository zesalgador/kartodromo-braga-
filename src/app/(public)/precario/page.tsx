import type { Metadata } from "next";
import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Preçário | Kartódromo Internacional de Braga",
  description:
    "Consulta os preços de aluguer individual e de grupo no Kartódromo Internacional de Braga.",
};

export default function PrecarioPage() {
  return (
    <main>
      <Pricing />
    </main>
  );
}
