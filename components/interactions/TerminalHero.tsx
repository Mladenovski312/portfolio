import { cn } from "@/lib/cn";

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "user"; text: string }
  | { kind: "comment"; text: string }
  | { kind: "step"; text: string; status?: "ok" | "running" | "pending" }
  | { kind: "heading"; text: string }
  | { kind: "blank" };

const lines: Line[] = [
  { kind: "prompt", text: "~/portfolio $ claude" },
  { kind: "blank" },
  { kind: "heading", text: "Build the hero with a live terminal anchor." },
  { kind: "blank" },
  { kind: "comment", text: "Plan" },
  { kind: "step", text: "Lock design tokens in globals.css", status: "ok" },
  { kind: "step", text: "Compose asymmetric hero grid", status: "ok" },
  { kind: "step", text: "Render static terminal (no gimmick typing)", status: "ok" },
  { kind: "step", text: "Wire prefers-reduced-motion", status: "ok" },
  { kind: "blank" },
  { kind: "comment", text: "Changed files" },
  { kind: "step", text: "app/globals.css", status: "ok" },
  { kind: "step", text: "components/sections/Hero.tsx", status: "ok" },
  { kind: "step", text: "components/interactions/TerminalHero.tsx", status: "ok" },
  { kind: "blank" },
  { kind: "comment", text: "Preview ready at localhost:3000" },
  { kind: "blank" },
  { kind: "prompt", text: "~/portfolio $ " },
];

export function TerminalHero({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-surface text-left font-mono text-[13px] leading-relaxed text-text-muted shadow-[0_24px_60px_-20px_rgba(94,234,212,0.15)]",
        className,
      )}
      aria-label="Claude Code terminal showing the build of this page"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
          claude-code · portfolio
        </span>
        <span className="text-[11px] text-text-subtle">$</span>
      </div>

      {/* Body */}
      <div className="space-y-1 px-5 py-5">
        {lines.map((line, i) => (
          <Line key={i} line={line} isLast={i === lines.length - 1} />
        ))}
      </div>

      {/* Subtle inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 bottom-0 h-32 bg-gradient-to-t from-accent-soft to-transparent opacity-60"
      />
    </div>
  );
}

function Line({ line, isLast }: { line: Line; isLast: boolean }) {
  if (line.kind === "blank") return <div className="h-1" aria-hidden />;

  if (line.kind === "prompt") {
    return (
      <div className="flex items-center gap-2 text-text">
        <span>{line.text}</span>
        {isLast && (
          <span className="cursor-blink inline-block h-4 w-2 bg-accent" aria-hidden />
        )}
      </div>
    );
  }

  if (line.kind === "heading") {
    return (
      <div className="flex items-start gap-2 text-text">
        <span className="text-accent">▸</span>
        <span>{line.text}</span>
      </div>
    );
  }

  if (line.kind === "comment") {
    return (
      <div className="text-text-subtle">
        <span className="mr-1 text-text-subtle">●</span>
        {line.text}
      </div>
    );
  }

  if (line.kind === "step") {
    const mark =
      line.status === "ok"
        ? "✓"
        : line.status === "running"
          ? "…"
          : "·";
    const tone =
      line.status === "ok" ? "text-success" : "text-text-subtle";
    return (
      <div className="flex items-start gap-2">
        <span className={tone}>{mark}</span>
        <span>{line.text}</span>
      </div>
    );
  }

  return null;
}
