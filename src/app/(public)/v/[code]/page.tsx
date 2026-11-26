import type { Metadata } from "next";
import { VoucherPublicCard } from "@/components/vouchers/VoucherPublicCard";
import { extractVoucherCode } from "@/lib/vouchers/codes";
import { loadPublicVoucherPage } from "@/lib/vouchers/public-lookup-server";

type PageProps = {
  params: Promise<{ code: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const extracted = extractVoucherCode(decodeURIComponent(code));
  return {
    title: extracted ? `Voucher ${extracted} | KIB` : "Consulta de voucher | KIB",
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function PublicVoucherPage({ params }: PageProps) {
  const { code } = await params;
  const { result, canConfirmUse, isStaffSession } = await loadPublicVoucherPage(
    decodeURIComponent(code),
  );

  return (
    <main className="racing-grid min-h-[70vh]">
      <section className="mx-auto max-w-lg px-4 py-16 sm:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-kib-red">KIB · VOUCHER</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          {result.ok && result.voucher.status === "used" ? "Voucher utilizado" : "Consulta de voucher"}
        </h1>
        <p className="mt-2 text-sm text-kib-muted">
          {isStaffSession
            ? "Confirme a utilização apenas depois de verificar o estado do voucher."
            : "Esta página mostra o estado do voucher. A utilização só é confirmada por um colaborador."}
        </p>

        {result.ok ? (
          <VoucherPublicCard
            voucher={result.voucher}
            canConfirmUse={canConfirmUse}
            isStaffSession={isStaffSession}
          />
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-kib-card p-6">
            <p className="text-lg font-semibold">
              {result.error === "rate_limited"
                ? "Demasiadas consultas. Tente novamente dentro de alguns minutos."
                : result.error === "unavailable"
                  ? "A consulta não está disponível de momento."
                  : "Voucher não encontrado."}
            </p>
            <p className="mt-2 text-sm text-kib-muted">
              Confirme o código no voucher ou peça apoio na secretaria do Kartódromo.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
