"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { consumeVoucherAction } from "@/app/admin/actions";
import { ButtonElement } from "@/components/ui/Button";
import { KART_LABELS, STATUS_LABELS, type VoucherStatus } from "@/lib/vouchers/types";
import type { PublicVoucherView } from "@/lib/vouchers/public-lookup";

const STATUS_STYLES: Record<VoucherStatus, string> = {
  active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  used: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  cancelled: "border-kib-red/40 bg-kib-red/10 text-red-300",
  expired: "border-neutral-500/40 bg-neutral-500/10 text-neutral-300",
};

type Props = {
  voucher: PublicVoucherView;
  canConfirmUse: boolean;
  isStaffSession: boolean;
};

export function VoucherPublicCard({ voucher, canConfirmUse, isStaffSession }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<VoucherStatus>(voucher.status);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setStatus(voucher.status);
  }, [voucher.status]);

  const used = status === "used";
  const showConfirm = canConfirmUse && status === "active";

  function confirmUse() {
    setError(null);
    if (!confirm("Confirmar a utilização deste voucher? Esta ação é irreversível.")) {
      return;
    }
    startTransition(async () => {
      const result = await consumeVoucherAction(voucher.code);
      if (!result.ok) {
        setError(result.error);
        if (result.error.toLowerCase().includes("já foi utilizado")) {
          setStatus("used");
        }
        router.refresh();
        return;
      }
      setStatus("used");
      router.refresh();
    });
  }

  return (
    <article className="mt-8 rounded-2xl border border-white/10 bg-kib-card p-6">
      <p
        className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${STATUS_STYLES[status]}`}
      >
        {used ? "Voucher utilizado" : STATUS_LABELS[status]}
      </p>
      {used ? (
        <h2 className="mt-4 text-2xl font-bold tracking-tight">Voucher utilizado</h2>
      ) : null}
      <p className="mt-6 font-mono text-lg tracking-wide text-kib-white">{voucher.code}</p>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
          <dt className="text-kib-muted">Tipo de kart</dt>
          <dd className="font-medium">{KART_LABELS[voucher.kart_type]}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
          <dt className="text-kib-muted">Duração</dt>
          <dd className="font-medium">{voucher.duration_minutes} minutos</dd>
        </div>
      </dl>

      {showConfirm ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <ButtonElement type="button" className="w-full" disabled={pending} onClick={confirmUse}>
            {pending ? "A confirmar..." : "Confirmar utilização"}
          </ButtonElement>
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-xl border border-kib-red/40 bg-kib-red/10 px-4 py-3 text-sm">{error}</p>
      ) : null}

      {!isStaffSession ? (
        <p className="mt-6 text-center text-xs text-white/35">
          <a href={`/admin/login?next=${encodeURIComponent(`/v/${voucher.code}`)}`} className="hover:text-white/70">
            Acesso de colaboradores
          </a>
        </p>
      ) : null}
    </article>
  );
}
