import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kartódromo Internacional de Braga | Karting em Braga",
  description:
    "Vive a adrenalina do karting no Kartódromo Internacional de Braga. Aluguer individual, grupos, eventos privados, famílias e empresas.",
  keywords: [
    "karting Braga",
    "kartódromo Braga",
    "karts Braga",
    "eventos Braga",
    "aluguer de karts",
    "Kartódromo Internacional de Braga",
  ],
  openGraph: {
    title: "Kartódromo Internacional de Braga | Karting em Braga",
    description:
      "Vive a adrenalina do karting no Kartódromo Internacional de Braga. Aluguer individual, grupos, eventos privados, famílias e empresas.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>  );
}
