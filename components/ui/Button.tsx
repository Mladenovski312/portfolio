import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  external?: boolean;
  icon?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-hover shadow-[0_8px_24px_-8px_rgba(94,234,212,0.6)]",
  secondary:
    "bg-surface text-text border border-border hover:border-accent-border hover:bg-surface-2",
  ghost:
    "text-text-muted hover:text-text",
};

export function Button({
  href,
  variant = "primary",
  children,
  external,
  icon,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200 cursor-pointer whitespace-nowrap";

  const isExternal = external ?? href.startsWith("http");
  const classes = cn(base, variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {children}
        {icon && <ArrowUpRight size={16} strokeWidth={2} />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon && <ArrowUpRight size={16} strokeWidth={2} />}
    </Link>
  );
}
