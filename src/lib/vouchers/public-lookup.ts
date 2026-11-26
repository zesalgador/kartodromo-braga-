import type { KartType, VoucherStatus } from "./types";

export const PUBLIC_VOUCHER_FIELDS = ["code", "status", "kart_type", "duration_minutes"] as const;

export type PublicVoucherView = {
  code: string;
  status: VoucherStatus;
  kart_type: KartType;
  duration_minutes: number;
};

const ALLOWED_STATUS = new Set(["active", "used", "cancelled", "expired"]);
const ALLOWED_KART = new Set(["270cc", "390cc", "bilugar", "crianca"]);

export function sanitizePublicVoucher(input: unknown): PublicVoucherView | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const code = typeof raw.code === "string" ? raw.code : null;
  const status = typeof raw.status === "string" ? raw.status : null;
  const kartType = typeof raw.kart_type === "string" ? raw.kart_type : null;
  const duration = Number(raw.duration_minutes);

  if (!code || !status || !kartType) return null;
  if (!ALLOWED_STATUS.has(status) || !ALLOWED_KART.has(kartType)) return null;
  if (![10, 20, 30].includes(duration)) return null;

  return {
    code,
    status: status as VoucherStatus,
    kart_type: kartType as KartType,
    duration_minutes: duration,
  };
}

export function publicLookupDoesNotConsume(status: VoucherStatus): VoucherStatus {
  return status;
}

export const PUBLIC_LOOKUP_RPC = "public_lookup_voucher";
export const STAFF_LOOKUP_RPC = "lookup_voucher";
export const STAFF_CONSUME_RPC = "consume_voucher";
