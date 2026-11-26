"use client";

import { useMemo, useState, useTransition } from "react";
import { ButtonElement } from "@/components/ui/Button";
import {
  cancelVoucherAction,
  createVoucherAction,
  downloadVoucherPdfAction,
} from "@/app/admin/actions";
import {
  DEFAULT_PRICES,
  DURATIONS,
  KART_LABELS,
  KART_TYPES,
  STATUS_LABELS,
  type DurationMinutes,
  type KartType,
  type Voucher,
  type VoucherStatus,
} from "@/lib/vouchers/types";

type Row = Voucher & {
  creator_name?: string | null;
  user_name?: string | null;
};

function downloadBase64Pdf(filename: string, base64: string) {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("pt-PT");
}

export function VouchersDashboard({ vouchers }: { vouchers: Row[] }) {
  const [kartType, setKartType] = useState<KartType>("270cc");
  const [duration, setDuration] = useState<DurationMinutes>(10);
  const [price, setPrice] = useState(String(DEFAULT_PRICES["270cc"][10]));
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<VoucherStatus | "all">("all");
  const [kartFilter, setKartFilter] = useState<KartType | "all">("all");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const active = vouchers.filter((v) => v.status === "active").length;
    const used = vouchers.filter((v) => v.status === "used").length;
    const cancelled = vouchers.filter((v) => v.status === "cancelled").length;
    const expired = vouchers.filter((v) => v.status === "expired").length;
    const revenue = vouchers
      .filter((v) => v.status !== "cancelled")
      .reduce((sum, v) => sum + Number(v.price_eur), 0);
    return { total: vouchers.length, active, used, cancelled, expired, revenue };
  }, [vouchers]);

  const filtered = vouchers.filter((voucher) => {
    if (statusFilter !== "all" && voucher.status !== statusFilter) return false;
    if (kartFilter !== "all" && voucher.kart_type !== kartFilter) return false;
    if (query) {
      const haystack = `${voucher.code} ${voucher.recipient_name ?? ""} ${voucher.purchaser_name ?? ""}`.toLowerCase();
      if (!haystack.includes(query.toLowerCase())) return false;
    }
    return true;
  });

  function syncPrice(nextKart: KartType, nextDuration: DurationMinutes) {
    setPrice(String(DEFAULT_PRICES[nextKart][nextDuration]));
  }

  function handleCreate(formData: FormData) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await createVoucherAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage(`Voucher ${result.data?.code} criado com sucesso.`);
      const pdf = await downloadVoucherPdfAction(result.data!.id);
      if (pdf.ok && pdf.data) {
        downloadBase64Pdf(pdf.data.filename, pdf.data.base64);
      }
    });
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Total", stats.total],
          ["Ativos", stats.active],
          ["Utilizados", stats.used],
          ["Cancelados / expirados", stats.cancelled + stats.expired],
          ["Valor emitido", `${stats.revenue.toFixed(2)} €`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-kib-card p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-kib-muted">{label}</p>
            <p className="mt-2 text-2xl font-black text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-kib-card p-6">
        <h2 className="text-lg font-bold">Emitir voucher</h2>
        <form action={handleCreate} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-xs font-bold uppercase tracking-wide text-kib-muted">
            Tipo de kart
            <select
              name="kart_type"
              value={kartType}
              onChange={(e) => {
                const next = e.target.value as KartType;
                setKartType(next);
                syncPrice(next, duration);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            >
              {KART_TYPES.map((type) => (
                <option key={type} value={type}>
                  {KART_LABELS[type]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-kib-muted">
            Duração
            <select
              name="duration_minutes"
              value={duration}
              onChange={(e) => {
                const next = Number(e.target.value) as DurationMinutes;
                setDuration(next);
                syncPrice(kartType, next);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            >
              {DURATIONS.map((item) => (
                <option key={item} value={item}>
                  {item} minutos
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-kib-muted">
            Preço (€)
            <input
              name="price_eur"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-kib-muted">
            Para
            <input
              name="recipient_name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-kib-muted">
            De
            <input
              name="purchaser_name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-kib-muted">
            Validade (opcional)
            <input
              name="valid_until"
              type="date"
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            />
          </label>
          <label className="sm:col-span-2 lg:col-span-3 text-xs font-bold uppercase tracking-wide text-kib-muted">
            Notas
            <input
              name="notes"
              className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
            />
          </label>
          <div className="sm:col-span-2 lg:col-span-3">
            <ButtonElement type="submit" disabled={pending}>
              {pending ? "A emitir..." : "Emitir voucher e descarregar PDF"}
            </ButtonElement>
          </div>
        </form>
        {message ? <p className="mt-4 text-sm text-emerald-400">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-kib-red">{error}</p> : null}
      </section>

      <section className="rounded-2xl border border-white/10 bg-kib-card p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-lg font-bold">Gestão de vouchers</h2>
          <a
            href="/admin/vouchers/export"
            className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold hover:border-kib-red/40"
          >
            Exportar CSV
          </a>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input
            placeholder="Pesquisar código ou nome"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VoucherStatus | "all")}
            className="rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
          >
            <option value="all">Todos os estados</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={kartFilter}
            onChange={(e) => setKartFilter(e.target.value as KartType | "all")}
            className="rounded-xl border border-white/10 bg-kib-black px-3 py-2.5 text-sm text-white"
          >
            <option value="all">Todos os karts</option>
            {KART_TYPES.map((type) => (
              <option key={type} value={type}>
                {KART_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-kib-muted">
              <tr>
                <th className="px-3 py-2">Código</th>
                <th className="px-3 py-2">Kart</th>
                <th className="px-3 py-2">Duração</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Utilização</th>
                <th className="px-3 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((voucher) => (
                <tr key={voucher.id} className="border-t border-white/10">
                  <td className="px-3 py-3 font-mono font-semibold">{voucher.code}</td>
                  <td className="px-3 py-3">{KART_LABELS[voucher.kart_type]}</td>
                  <td className="px-3 py-3">{voucher.duration_minutes} min</td>
                  <td className="px-3 py-3">{STATUS_LABELS[voucher.status]}</td>
                  <td className="px-3 py-3 text-kib-muted">
                    {voucher.status === "used"
                      ? `${formatDateTime(voucher.used_at)}${voucher.user_name ? ` · ${voucher.user_name}` : ""}`
                      : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold"
                        onClick={() => {
                          startTransition(async () => {
                            const pdf = await downloadVoucherPdfAction(voucher.id);
                            if (pdf.ok && pdf.data) downloadBase64Pdf(pdf.data.filename, pdf.data.base64);
                          });
                        }}
                      >
                        PDF
                      </button>
                      {voucher.status === "active" ? (
                        <button
                          type="button"
                          className="rounded-full border border-kib-red/40 px-3 py-1 text-xs font-semibold text-kib-red"
                          onClick={() => {
                            if (!confirm("Cancelar este voucher? Esta ação é definitiva.")) return;
                            startTransition(async () => {
                              await cancelVoucherAction(voucher.id);
                            });
                          }}
                        >
                          Cancelar
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-sm text-kib-muted">Não existem vouchers com estes filtros.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
