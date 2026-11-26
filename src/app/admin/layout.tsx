import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área reservada | KIB",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-kib-black text-white">
      <div className="checkered-stripe h-1 w-full opacity-80" />
      {children}
    </div>
  );
}
