import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { ArrowUpRight, Boxes, Bot, Database } from "lucide-react";

type Pillar = {
  icon: typeof Boxes;
  title: string;
  body: string;
  proofSlug: string;
  proofLabel: string;
  stat: { value: string; label: string };
  tags: string[];
};

const hero: Pillar = {
  icon: Boxes,
  title: "Full-stack products",
  body:
    "End-to-end apps with authentication, data, admin, and real-time features. Next.js, React, Supabase, Postgres, edge deploys.",
  proofSlug: "jumbo",
  proofLabel: "Jumbo ERP",
  stat: { value: "3", label: "Surfaces shipped (store, POS, admin)" },
  tags: ["Next.js 16", "Supabase", "PostgreSQL + RLS", "Tailwind v4", "Sentry"],
};

const companions: Pillar[] = [
  {
    icon: Bot,
    title: "AI engineering & automation",
    body:
      "AI agents, LLM-integrated workflows, scraping and extraction pipelines, MCP tooling, n8n and Make.",
    proofSlug: "competitive-intel",
    proofLabel: "Competitive Intel Agent",
    stat: { value: "20", label: "Competitors researched in minutes" },
    tags: ["Vertex AI", "Claude Code", "Notion API"],
  },
  {
    icon: Database,
    title: "Data engineering & analytics",
    body:
      "Cloud data pipelines, scheduled ingestion, SQL modeling, KPI dashboards in Power BI or custom.",
    proofSlug: "johnson-matthey",
    proofLabel: "Johnson Matthey Pipeline",
    stat: { value: "310k+", label: "Samples ingested on a cron" },
    tags: ["Python", "AWS EC2", "gspread", "pandas"],
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 border-b border-border-subtle/60 py-28 md:py-36"
    >
      <Container>
        <div className="mb-14 space-y-6">
          <SectionLabel number="02">Capabilities</SectionLabel>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
              Three things, shipped deeply.
            </h2>
            <p className="max-w-sm text-text-muted">
              I pick range over breadth, but only where each area can stand on real, shipped proof.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <HeroTile pillar={hero} />
          {companions.map((p) => (
            <CompanionTile key={p.title} pillar={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function HeroTile({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <Link
      href={`/work/${pillar.proofSlug}`}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-accent-border/80 bg-surface p-7 transition-colors duration-200 hover:border-accent-border"
    >
      <BentoCorner />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
            Flagship
          </span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {pillar.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
          {pillar.body}
        </p>
      </div>

      <div className="relative mt-6 space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-accent">
            {pillar.stat.value}
          </span>
          <span className="text-[13px] text-text-muted">{pillar.stat.label}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {pillar.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border-subtle bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
            Proof · {pillar.proofLabel}
          </span>
          <ArrowUpRight
            size={18}
            className="text-text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </Link>
  );
}

function CompanionTile({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <Link
      href={`/work/${pillar.proofSlug}`}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-colors duration-200 hover:border-accent-border"
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-text">
          {pillar.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-relaxed text-text-muted">
          {pillar.body}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-accent">
            {pillar.stat.value}
          </span>
          <span className="text-[13px] text-text-muted">{pillar.stat.label}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
            Proof · {pillar.proofLabel}
          </span>
          <ArrowUpRight
            size={16}
            className="text-text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </Link>
  );
}

function BentoCorner() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-60 transition-opacity duration-300 group-hover:opacity-90"
    >
      <svg viewBox="0 0 256 256" className="h-full w-full">
        <defs>
          <radialGradient id="bento-hero" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#5EEAD4" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="128" cy="128" r="128" fill="url(#bento-hero)" />
        <g fill="none" stroke="#5EEAD4" strokeWidth="1" opacity="0.18">
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx="128" cy="128" r={20 + i * 16} />
          ))}
        </g>
      </svg>
    </div>
  );
}
