import type { UserRole, VoucherStatus } from "./types";

export function canManageVouchers(role: UserRole | null | undefined): boolean {
  return role === "admin";
}

export function canValidateVouchers(role: UserRole | null | undefined): boolean {
  return role === "admin" || role === "staff";
}

export function canConfirmPublicVoucherUse(
  role: UserRole | null | undefined,
  status: VoucherStatus | null | undefined,
): boolean {
  return canValidateVouchers(role) && status === "active";
}

export function canExportVouchers(role: UserRole | null | undefined): boolean {
  return role === "admin";
}

export function canCancelVouchers(role: UserRole | null | undefined): boolean {
  return role === "admin";
}

export function defaultAdminPath(role: UserRole): "/admin/vouchers" | "/admin/validar" {
  return role === "admin" ? "/admin/vouchers" : "/admin/validar";
}
