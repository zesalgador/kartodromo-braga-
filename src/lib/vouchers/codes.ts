const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateVoucherCode(randomBytes: Uint8Array = crypto.getRandomValues(new Uint8Array(8))): string {
  if (randomBytes.length < 8) {
    throw new Error("São necessários 8 bytes aleatórios.");
  }
  let body = "";
  for (let i = 0; i < 8; i += 1) {
    body += ALPHABET[randomBytes[i] % ALPHABET.length];
  }
  return `KIB-${body}`;
}

export function normalizeVoucherCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidVoucherCode(code: string): boolean {
  return /^KIB-[A-Z0-9]{8}$/.test(normalizeVoucherCode(code));
}

const CODE_IN_TEXT = /KIB-[A-Z0-9]{8}/i;

export function extractVoucherCode(input: string): string | null {
  const direct = normalizeVoucherCode(input);
  if (isValidVoucherCode(direct)) return direct;
  const match = input.match(CODE_IN_TEXT);
  if (!match) return null;
  const extracted = normalizeVoucherCode(match[0]);
  return isValidVoucherCode(extracted) ? extracted : null;
}

export function parseVoucherLookupInput(input: string): string | null {
  const extracted = extractVoucherCode(input);
  if (extracted) return extracted;
  const prefixed = `KIB-${normalizeVoucherCode(input).replace(/^KIB-/, "")}`;
  return isValidVoucherCode(prefixed) ? prefixed : null;
}

export const VOUCHER_PUBLIC_ORIGIN = "https://kib.pt";

export function voucherPublicUrl(code: string): string {
  return `${VOUCHER_PUBLIC_ORIGIN}/v/${normalizeVoucherCode(code)}`;
}
