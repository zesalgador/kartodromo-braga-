import type { Metadata } from "next";
import { SecurityRules } from "@/components/SecurityRules";

export const metadata: Metadata = {
  title: "Regras de Segurança | Kartódromo Internacional de Braga",
  description:
    "Regras de segurança em pista no Kartódromo Internacional de Braga.",
};

export default function RegrasPage() {
  return (
    <main>
      <SecurityRules />
    </main>
  );
}
