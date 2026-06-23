interface LogoProps {
  className?: string;
  priority?: boolean;
  variant?: "default" | "large";
}

export function Logo({
  className = "",
  priority = false,
  variant = "default",
}: LogoProps) {
  const heightClass =
    variant === "large" ? "h-11 sm:h-14" : "h-9 sm:h-10";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/kib-logo.png"
      alt="Kartódromo Internacional de Braga"
      width={variant === "large" ? 227 : 180}
      height={variant === "large" ? 55 : 44}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`${heightClass} w-auto max-w-[220px] object-contain object-left ${className}`}
    />
  );
}
