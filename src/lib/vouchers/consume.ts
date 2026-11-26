import type { VoucherStatus } from "./types";

export type ConsumeInput = {
  status: VoucherStatus;
  validUntil: string | null;
  now?: Date;
};

export type ConsumeResult =
  | { ok: true; nextStatus: "used" }
  | { ok: false; error: "already_used" | "cancelled" | "expired" | "invalid_status" };

function isExpired(validUntil: string | null, now: Date): boolean {
  if (!validUntil) return false;
  return validUntil < now.toISOString().slice(0, 10);
}

export function resolveConsume(input: ConsumeInput): ConsumeResult {
  const now = input.now ?? new Date();

  if (input.status === "used") {
    return { ok: false, error: "already_used" };
  }
  if (input.status === "cancelled") {
    return { ok: false, error: "cancelled" };
  }
  if (input.status === "expired" || isExpired(input.validUntil, now)) {
    return { ok: false, error: "expired" };
  }
  if (input.status !== "active") {
    return { ok: false, error: "invalid_status" };
  }
  return { ok: true, nextStatus: "used" };
}

export function lookupDoesNotConsume(status: VoucherStatus): VoucherStatus {
  return status;
}
