import {
  Code2,
  Database,
  BrainCircuit,
  Cloud,
  Workflow,
  TestTube2,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StackGroup = {
  icon: LucideIcon;
  label: string;
  items: string[];
};

const groups: StackGroup[] = [
  {
    icon: Code2,
    label: "Web",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4"],
  },
  {
    icon: Database,
    label: "Data",
    items: ["Supabase", "PostgreSQL", "pandas", "Recharts"],
  },
  {
    icon: BrainCircuit,
    label: "AI",
    items: ["Vertex AI", "Gemini", "Claude Code", "Codex", "MCP"],
  },
  {
    icon: Cloud,
    label: "Cloud",
    items: ["AWS EC2", "Vercel", "Sentry"],
  },
  {
    icon: Workflow,
    label: "Automation",
    items: ["n8n", "Make", "Python", "cron"],
  },
  {
    icon: TestTube2,
    label: "Quality",
    items: ["Playwright", "Vitest"],
  },
  {
    icon: Terminal,
    label: "Tooling",
    items: ["Git", "GitHub Actions", "Docker"],
  },
];

export function ProofStrip() {
  const track = [...groups, ...groups];
  return (
    <section
      aria-label="Tools and platforms"
      className="border-b border-border-subtle/60"
    >
      <div
        className="group relative w-full overflow-hidden"
        role="list"
        aria-label="Technology marquee"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent"
        />
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap py-9 md:gap-16 md:py-12">
          {track.map((group, i) => (
            <StackChunk key={`${group.label}-${i}`} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackChunk({ group }: { group: StackGroup }) {
  const Icon = group.icon;
  return (
    <div
      role="listitem"
      className="flex items-center gap-5 md:gap-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-accent">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
          {group.label}
        </span>
      </div>
      <div className="flex items-center gap-6 font-display text-xl font-medium text-text-muted md:gap-8 md:text-2xl">
        {group.items.map((item, j) => (
          <span key={item} className="flex items-center gap-6 md:gap-8">
            <span>{item}</span>
            {j < group.items.length - 1 && (
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full bg-accent/50"
              />
            )}
          </span>
        ))}
      </div>
      <span
        aria-hidden
        className="inline-block h-6 w-px bg-border"
      />
    </div>
  );
}
