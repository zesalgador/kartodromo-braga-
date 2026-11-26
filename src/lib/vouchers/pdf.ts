import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { voucherPublicUrl } from "./codes";
import { KART_LABELS, type KartType } from "./types";

type PdfVoucher = {
  code: string;
  kart_type: KartType;
  duration_minutes: number;
  price_eur: number;
  recipient_name?: string | null;
  purchaser_name?: string | null;
  valid_until?: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return "Sem data limite";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export async function buildVoucherQrPng(code: string): Promise<{ payload: string; png: Buffer }> {
  const payload = voucherPublicUrl(code);
  const png = await QRCode.toBuffer(payload, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 400,
    color: { dark: "#000000", light: "#ffffff" },
  });
  return { payload, png };
}

export async function buildVoucherPdf(voucher: PdfVoucher): Promise<Buffer> {
  const { png } = await buildVoucherQrPng(voucher.code);
  const qrDataUrl = `data:image/png;base64,${png.toString("base64")}`;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [210, 100],
  });

  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 100, "F");

  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, 210, 6, "F");
  doc.rect(0, 94, 210, 6, "F");

  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, 8, 100, "F");

  doc.setTextColor(220, 38, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("KIB", 16, 20);
  doc.setTextColor(250, 250, 250);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("KARTÓDROMO INTERNACIONAL DE BRAGA", 16, 26);

  doc.setFillColor(220, 38, 38);
  doc.roundedRect(16, 32, 28, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("VOUCHER", 20, 37.5);

  doc.setTextColor(250, 250, 250);
  doc.setFontSize(13);
  doc.text("ALUGUER DE KART", 16, 50);

  doc.setTextColor(220, 38, 38);
  doc.setFontSize(28);
  doc.text(`${voucher.duration_minutes} MINUTOS`, 16, 64);

  doc.setTextColor(163, 163, 163);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(KART_LABELS[voucher.kart_type], 16, 72);

  doc.setTextColor(250, 250, 250);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(voucher.code, 16, 84);

  const details = [
    voucher.recipient_name ? `Para: ${voucher.recipient_name}` : null,
    voucher.purchaser_name ? `De: ${voucher.purchaser_name}` : null,
    `Preço: ${Number(voucher.price_eur).toFixed(2)} €`,
    `Válido até: ${formatDate(voucher.valid_until)}`,
  ].filter(Boolean) as string[];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  details.forEach((line, index) => {
    doc.text(line, 90, 20 + index * 6);
  });

  doc.addImage(qrDataUrl, "PNG", 162, 18, 36, 36);
  doc.setFontSize(7);
  doc.setTextColor(163, 163, 163);
  doc.text("Leia o QR com a câmara", 162, 60, { maxWidth: 36 });
  doc.text("do telemóvel", 162, 64, { maxWidth: 36 });
  doc.text("www.kib.pt", 162, 84);

  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}

export function pdfFilename(code: string) {
  return `voucher-${code.toLowerCase()}.pdf`;
}
