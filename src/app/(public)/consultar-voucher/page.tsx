import type { Metadata } from "next";
import { ConsultarVoucherForm } from "@/components/vouchers/ConsultarVoucherForm";

export const metadata: Metadata = {
  title: "Consultar voucher | Kartódromo Internacional de Braga",
  description: "Consulte o estado de um voucher do Kartódromo Internacional de Braga.",
  robots: { index: false, follow: false },
};

export default function ConsultarVoucherPage() {
  return (
    <main className="racing-grid min-h-[70vh]">
      <section className="mx-auto max-w-lg px-4 py-16 sm:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-kib-red">KIB · VOUCHER</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Consultar voucher</h1>
        <p className="mt-2 text-sm text-kib-muted">
          Introduza o código do voucher para ver o estado, o tipo de kart e a duração. Sem dados pessoais.
        </p>
        <ConsultarVoucherForm />
      </section>
    </main>
  );
}
