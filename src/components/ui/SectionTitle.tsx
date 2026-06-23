import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  title,
  subtitle,
  id,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      id={id}
      className={`mb-12 scroll-mt-24 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <div
        className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-1 w-8 rounded-full bg-kib-red" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-kib-red">
          Kartódromo Braga
        </span>
        <span className="h-1 w-8 rounded-full bg-kib-red" />
      </div>
      <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-kib-muted sm:text-lg">
          {subtitle}
        </p>
      )}
      <div className="racing-line mx-auto mt-6 max-w-xs" />
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-kib-card p-6 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-kib-red/40 hover:shadow-xl hover:shadow-kib-red/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
