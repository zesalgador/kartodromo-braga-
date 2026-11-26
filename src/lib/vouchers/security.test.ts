import { describe, expect, it } from "vitest";
import {
  extractVoucherCode,
  generateVoucherCode,
  isValidVoucherCode,
  normalizeVoucherCode,
  parseVoucherLookupInput,
  voucherPublicUrl,
} from "./codes";
import {
  PUBLIC_LOOKUP_RPC,
  PUBLIC_VOUCHER_FIELDS,
  STAFF_CONSUME_RPC,
  STAFF_LOOKUP_RPC,
  publicLookupDoesNotConsume,
  sanitizePublicVoucher,
} from "./public-lookup";
import { lookupDoesNotConsume, resolveConsume } from "./consume";
import {
  canCancelVouchers,
  canConfirmPublicVoucherUse,
  canExportVouchers,
  canManageVouchers,
  canValidateVouchers,
  defaultAdminPath,
} from "./permissions";
import { isSafeAuthRedirect } from "./redirects";

describe("códigos de voucher", () => {
  it("gera códigos únicos no formato KIB-XXXXXXXX", () => {
    const codes = new Set(Array.from({ length: 50 }, () => generateVoucherCode()));
    expect(codes.size).toBe(50);
    for (const code of codes) {
      expect(isValidVoucherCode(code)).toBe(true);
    }
  });

  it("normaliza espaços e minúsculas", () => {
    expect(normalizeVoucherCode(" kib-ab12cd34 ")).toBe("KIB-AB12CD34");
  });

  it("rejeita códigos fora do formato", () => {
    expect(isValidVoucherCode("ABC-123")).toBe(false);
    expect(isValidVoucherCode("KIB-123")).toBe(false);
  });

  it("extrai o código de um URL público do QR", () => {
    expect(extractVoucherCode("https://kib.pt/v/KIB-AB12CD34")).toBe("KIB-AB12CD34");
    expect(extractVoucherCode("KIB-AB12CD34")).toBe("KIB-AB12CD34");
  });

  it("aceita o código completo ou só o sufixo na consulta manual", () => {
    expect(parseVoucherLookupInput("kib-5k74y39d")).toBe("KIB-5K74Y39D");
    expect(parseVoucherLookupInput("5K74Y39D")).toBe("KIB-5K74Y39D");
    expect(parseVoucherLookupInput("ABC")).toBeNull();
  });

  it("o URL público do QR é sempre https://kib.pt/v/{código}", () => {
    expect(voucherPublicUrl("KIB-5K74Y39D")).toBe("https://kib.pt/v/KIB-5K74Y39D");
    expect(voucherPublicUrl("kib-5k74y39d")).toBe("https://kib.pt/v/KIB-5K74Y39D");
  });
});

describe("permissões", () => {
  it("só o administrador emite, cancela e exporta", () => {
    expect(canManageVouchers("admin")).toBe(true);
    expect(canManageVouchers("staff")).toBe(false);
    expect(canManageVouchers(null)).toBe(false);
    expect(canCancelVouchers("staff")).toBe(false);
    expect(canExportVouchers("staff")).toBe(false);
    expect(canExportVouchers("admin")).toBe(true);
  });

  it("administrador e funcionário podem validar", () => {
    expect(canValidateVouchers("admin")).toBe(true);
    expect(canValidateVouchers("staff")).toBe(true);
    expect(canValidateVouchers(undefined)).toBe(false);
  });

  it("não autenticado não acede à área privada", () => {
    expect(canValidateVouchers(null)).toBe(false);
    expect(canManageVouchers(null)).toBe(false);
  });

  it("a confirmação de utilização continua a exigir administrador ou funcionário", () => {
    expect(canValidateVouchers(null)).toBe(false);
    expect(canValidateVouchers("staff")).toBe(true);
    expect(canValidateVouchers("admin")).toBe(true);
    expect(canConfirmPublicVoucherUse(null, "active")).toBe(false);
    expect(canConfirmPublicVoucherUse("staff", "active")).toBe(true);
    expect(canConfirmPublicVoucherUse("staff", "used")).toBe(false);
    expect(canConfirmPublicVoucherUse("admin", "expired")).toBe(false);
  });

  it("após o login só regressa a caminhos internos seguros", () => {
    expect(isSafeAuthRedirect("/v/KIB-5K74Y39D")).toBe(true);
    expect(isSafeAuthRedirect("/admin/validar")).toBe(true);
    expect(isSafeAuthRedirect("https://evil.example/v/KIB-5K74Y39D")).toBe(false);
    expect(isSafeAuthRedirect("//evil.example")).toBe(false);
  });

  it("a validação autenticada não usa a RPC pública com limites de consulta", () => {
    expect(STAFF_LOOKUP_RPC).toBe("lookup_voucher");
    expect(STAFF_CONSUME_RPC).toBe("consume_voucher");
    expect(PUBLIC_LOOKUP_RPC).toBe("public_lookup_voucher");
    expect(STAFF_LOOKUP_RPC).not.toBe(PUBLIC_LOOKUP_RPC);
    expect(STAFF_CONSUME_RPC).not.toBe(PUBLIC_LOOKUP_RPC);
  });

  it("encaminha o funcionário para a validação", () => {
    expect(defaultAdminPath("staff")).toBe("/admin/validar");
    expect(defaultAdminPath("admin")).toBe("/admin/vouchers");
  });
});

describe("consumo atómico e lookup", () => {
  it("a leitura não altera o estado", () => {
    expect(lookupDoesNotConsume("active")).toBe("active");
    expect(lookupDoesNotConsume("used")).toBe("used");
  });

  it("só confirma consumo de vouchers ativos", () => {
    expect(resolveConsume({ status: "active", validUntil: null })).toEqual({
      ok: true,
      nextStatus: "used",
    });
  });

  it("bloqueia reutilização", () => {
    expect(resolveConsume({ status: "used", validUntil: null }).ok).toBe(false);
    expect(resolveConsume({ status: "used", validUntil: null })).toMatchObject({
      error: "already_used",
    });
  });

  it("a segunda tentativa simultânea falha depois do primeiro consumo", () => {
    const first = resolveConsume({ status: "active", validUntil: null });
    expect(first.ok).toBe(true);
    const second = resolveConsume({
      status: first.ok ? first.nextStatus : "active",
      validUntil: null,
    });
    expect(second).toEqual({ ok: false, error: "already_used" });
  });

  it("a consulta pública não consome o voucher", () => {
    expect(publicLookupDoesNotConsume("active")).toBe("active");
  });

  it("a vista pública omite dados pessoais e notas", () => {
    const sanitized = sanitizePublicVoucher({
      code: "KIB-AB12CD34",
      status: "active",
      kart_type: "390cc",
      duration_minutes: 20,
      recipient_name: "Maria",
      purchaser_name: "João",
      notes: "interno",
      price_eur: 45,
      used_by_name: "Oficina",
    });
    expect(sanitized).toEqual({
      code: "KIB-AB12CD34",
      status: "active",
      kart_type: "390cc",
      duration_minutes: 20,
    });
    expect(Object.keys(sanitized!)).toEqual([...PUBLIC_VOUCHER_FIELDS]);
  });

  it("rejeita cancelados e expirados", () => {
    expect(resolveConsume({ status: "cancelled", validUntil: null })).toMatchObject({
      error: "cancelled",
    });
    expect(
      resolveConsume({
        status: "active",
        validUntil: "2020-01-01",
        now: new Date("2026-11-25T12:00:00Z"),
      }),
    ).toMatchObject({ error: "expired" });
  });
});
