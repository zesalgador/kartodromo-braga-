export const KART_TYPES = ["270cc", "390cc", "bilugar", "crianca"] as const;
export const DURATIONS = [10, 20, 30] as const;
export const VOUCHER_STATUSES = ["active", "used", "cancelled", "expired"] as const;
export const USER_ROLES = ["admin", "staff"] as const;

export type KartType = (typeof KART_TYPES)[number];
export type DurationMinutes = (typeof DURATIONS)[number];
export type VoucherStatus = (typeof VOUCHER_STATUSES)[number];
export type UserRole = (typeof USER_ROLES)[number];

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
};

export type Voucher = {
  id: string;
  code: string;
  kart_type: KartType;
  duration_minutes: DurationMinutes;
  price_eur: number;
  recipient_name: string | null;
  purchaser_name: string | null;
  valid_until: string | null;
  status: VoucherStatus;
  notes: string | null;
  created_by: string;
  created_at: string;
  used_at: string | null;
  used_by: string | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
};

export type VoucherLookup = {
  id?: string;
  code: string;
  kart_type?: KartType;
  duration_minutes?: number;
  price_eur?: number;
  recipient_name?: string | null;
  purchaser_name?: string | null;
  valid_until?: string | null;
  status: VoucherStatus | string;
  created_at?: string;
  used_at?: string | null;
  used_by_name?: string | null;
  notes?: string | null;
};

export const KART_LABELS: Record<KartType, string> = {
  "270cc": "Kart 270cc",
  "390cc": "Kart 390cc",
  bilugar: "Kart Bi-lugar (2 pessoas)",
  crianca: "Kart Criança",
};

export const STATUS_LABELS: Record<VoucherStatus, string> = {
  active: "Ativo",
  used: "Utilizado",
  cancelled: "Cancelado",
  expired: "Expirado",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  staff: "Funcionário",
};

export const DEFAULT_PRICES: Record<KartType, Record<DurationMinutes, number>> = {
  "270cc": { 10: 20, 20: 35, 30: 55 },
  "390cc": { 10: 25, 20: 45, 30: 70 },
  bilugar: { 10: 20, 20: 35, 30: 55 },
  crianca: { 10: 15, 20: 25, 30: 40 },
};

export const ERROR_MESSAGES: Record<string, string> = {
  forbidden: "Não tem permissão para esta operação.",
  not_found: "Voucher não encontrado.",
  already_used: "Este voucher já foi utilizado.",
  cancelled: "Este voucher foi cancelado.",
  expired: "Este voucher está fora da validade.",
  invalid_status: "Este voucher não pode ser utilizado.",
  not_authenticated: "Sessão inválida. Inicie sessão novamente.",
  unauthenticated: "Sessão inválida. Inicie sessão novamente.",
  rate_limited: "Demasiadas consultas. Tente novamente dentro de alguns minutos.",
};
