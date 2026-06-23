import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  href: string;
  children: ReactNode;
  className?: string;
}

interface ButtonElementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-kib-red text-white hover:bg-kib-red-dark hover:scale-105 hover:shadow-lg hover:shadow-kib-red/25",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-kib-red/50",
  outline:
    "border-2 border-kib-red text-kib-red hover:bg-kib-red hover:text-white hover:scale-105",
  ghost: "text-kib-red hover:bg-kib-red/10",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kib-red focus-visible:ring-offset-2 focus-visible:ring-offset-kib-black";

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function ButtonElement({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonElementProps) {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
