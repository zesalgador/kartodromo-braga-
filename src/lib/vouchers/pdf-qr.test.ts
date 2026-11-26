import { describe, expect, it } from "vitest";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { voucherPublicUrl } from "./codes";
import { buildVoucherPdf, buildVoucherQrPng } from "./pdf";

function decodePngQr(png: Buffer): string | null {
  const image = PNG.sync.read(png);
  const result = jsQR(new Uint8ClampedArray(image.data), image.width, image.height);
  return result?.data ?? null;
}

describe("QR Code dos PDFs", () => {
  it("codifica o URL completo https://kib.pt/v/{código}", async () => {
    const code = "KIB-5K74Y39D";
    const { payload, png } = await buildVoucherQrPng(code);

    expect(payload).toBe("https://kib.pt/v/KIB-5K74Y39D");
    expect(voucherPublicUrl(code)).toBe(payload);
    expect(decodePngQr(png)).toBe("https://kib.pt/v/KIB-5K74Y39D");
  });

  it("ao regenerar o QR mantém o código original do voucher", async () => {
    const first = await buildVoucherQrPng("KIB-5K74Y39D");
    const second = await buildVoucherQrPng("KIB-5K74Y39D");

    expect(decodePngQr(first.png)).toBe("https://kib.pt/v/KIB-5K74Y39D");
    expect(decodePngQr(second.png)).toBe("https://kib.pt/v/KIB-5K74Y39D");
    expect(decodePngQr(second.png)).not.toBe("KIB-5K74Y39D");
  });

  it("o PDF gerado de novo usa o mesmo payload de URL", async () => {
    const pdf = await buildVoucherPdf({
      code: "KIB-5K74Y39D",
      kart_type: "390cc",
      duration_minutes: 20,
      price_eur: 45,
    });

    expect(pdf.length).toBeGreaterThan(1000);
    const { payload, png } = await buildVoucherQrPng("KIB-5K74Y39D");
    expect(payload).toBe("https://kib.pt/v/KIB-5K74Y39D");
    expect(decodePngQr(png)).toBe(payload);
  });
});
