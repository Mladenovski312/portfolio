import { cn } from "@/lib/cn";

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-tight uppercase",
        tone === "neutral" && "border-border bg-surface text-text-muted",
        tone === "accent" && "border-accent-border bg-accent-soft text-accent-hover",
        className,
      )}
    >
      {children}
    </span>
  );
}
