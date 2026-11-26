"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ButtonElement } from "@/components/ui/Button";
import { consumeVoucherAction, lookupVoucherAction } from "@/app/admin/actions";
import { ERROR_MESSAGES, KART_LABELS, STATUS_LABELS, type KartType, type VoucherLookup, type VoucherStatus } from "@/lib/vouchers/types";
import { extractVoucherCode, isValidVoucherCode, normalizeVoucherCode } from "@/lib/vouchers/codes";

export function ValidarClient() {
  const [code, setCode] = useState("");
  const [voucher, setVoucher] = useState<VoucherLookup | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [pending, startTransition] = useTransition();
  const scannerRef = useRef<HTMLDivElement>(null);
  const scannerInstance = useRef<{ stop: () => Promise<void> } | null>(null);

  useEffect(() => {
    return () => {
      void scannerInstance.current?.stop().catch(() => undefined);
    };
  }, []);

  async function startScanner() {
    setError(null);
    setSuccess(null);
    setScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 80));
    const { Html5Qrcode } = await import("html5-qrcode");
    if (!scannerRef.current) return;
    const scanner = new Html5Qrcode(scannerRef.current.id);
    scannerInstance.current = scanner;
    await scanner.start(
      { facingMode: "environment" },
      { fps: 8, qrbox: { width: 250, height: 250 } },
      (decoded) => {
        const normalized = extractVoucherCode(decoded) ?? normalizeVoucherCode(decoded);
        void scanner.stop();
        setScanning(false);
        setCode(normalized);
        lookup(normalized);
      },
      () => undefined,
    );
  }

  function lookup(nextCode = code) {
    setError(null);
    setSuccess(null);
    const normalized = extractVoucherCode(nextCode) ?? normalizeVoucherCode(nextCode);
    if (!isValidVoucherCode(normalized)) {
      setVoucher(null);
      setError("Código inválido. Utilize o formato KIB-XXXXXXXX.");
      return;
    }
    startTransition(async () => {
      const result = await lookupVoucherAction(normalized);
      if (!result.ok) {
        setVoucher(null);
        setError(result.error);
        return;
      }
      setVoucher(result.data ?? null);
    });
  }

  function confirmUse() {
    if (!voucher?.code) return;
    if (!confirm("Confirmar a utilização deste voucher? Esta ação é irreversível.")) {
      return;
    }
    startTransition(async () => {
      const result = await consumeVoucherAction(voucher.code);
      if (!result.ok) {
        setError(result.error);
        lookup(voucher.code);
        return;
      }
      setSuccess("Voucher utilizado com sucesso.");
      setVoucher(result.data ?? null);
    });
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <section className="rounded-2xl border border-white/10 bg-kib-card p-5">
        <h2 className="text-lg font-bold">Validar voucher</h2>
        <p className="mt-2 text-sm text-kib-muted">
          Leia o QR Code ou introduza o código. A leitura não consome o voucher — é necessária confirmação.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="KIB-XXXXXXXX"
            className="w-full rounded-xl border border-white/10 bg-kib-black px-4 py-4 text-center font-mono text-lg tracking-widest text-white"
          />
          <div className="grid grid-cols-2 gap-3">
            <ButtonElement type="button" onClick={() => lookup()} disabled={pending}>
              Consultar
            </ButtonElement>
            <ButtonElement
              type="button"
              variant="secondary"
              onClick={() => {
                if (scanning) {
                  void scannerInstance.current?.stop();
                  setScanning(false);
                  return;
                }
                void startScanner().catch(() => {
                  setScanning(false);
                  setError("Não foi possível aceder à câmara. Introduza o código manualmente.");
                });
              }}
            >
              {scanning ? "Parar câmara" : "Ler QR Code"}
            </ButtonElement>
          </div>
        </div>
        <div id="kib-qr-reader" ref={scannerRef} className={`mt-4 overflow-hidden rounded-xl ${scanning ? "block" : "hidden"}`} />
      </section>

      {error ? (
        <p className="rounded-2xl border border-kib-red/40 bg-kib-red/10 px-5 py-4 text-sm font-semibold">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm font-semibold text-emerald-300">
          {success}
        </p>
      ) : null}

      {voucher ? (
        <section className="rounded-2xl border border-white/10 bg-kib-card p-5">
          <p className="font-mono text-2xl font-black tracking-wide">{voucher.code}</p>
          <dl className="mt-4 grid gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-kib-muted">Estado</dt>
              <dd className="font-semibold">
                {STATUS_LABELS[(voucher.status as VoucherStatus)] ?? voucher.status}
              </dd>
            </div>
            {voucher.kart_type ? (
              <div className="flex justify-between gap-4">
                <dt className="text-kib-muted">Kart</dt>
                <dd>{KART_LABELS[voucher.kart_type as KartType]}</dd>
              </div>
            ) : null}
            {voucher.duration_minutes ? (
              <div className="flex justify-between gap-4">
                <dt className="text-kib-muted">Duração</dt>
                <dd>{voucher.duration_minutes} minutos</dd>
              </div>
            ) : null}
            {voucher.recipient_name ? (
              <div className="flex justify-between gap-4">
                <dt className="text-kib-muted">Para</dt>
                <dd>{voucher.recipient_name}</dd>
              </div>
            ) : null}
            {voucher.used_at ? (
              <div className="flex justify-between gap-4">
                <dt className="text-kib-muted">Utilizado</dt>
                <dd>
                  {new Date(voucher.used_at).toLocaleString("pt-PT")}
                  {voucher.used_by_name ? ` · ${voucher.used_by_name}` : ""}
                </dd>
              </div>
            ) : null}
          </dl>
          {voucher.status === "active" ? (
            <ButtonElement type="button" className="mt-6 w-full" onClick={confirmUse} disabled={pending}>
              Confirmar utilização
            </ButtonElement>
          ) : (
            <p className="mt-6 text-sm text-kib-red">
              {ERROR_MESSAGES[voucher.status === "used" ? "already_used" : voucher.status] ??
                "Este voucher não pode ser utilizado."}
            </p>
          )}
        </section>
      ) : null}
    </div>
  );
}
