import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { ArrowUpRight, Boxes, Bot, Database } from "lucide-react";

const pillars = [
  {
    icon: Boxes,
    title: "Full-stack products",
    body:
      "End-to-end apps with authentication, data, admin, and real-time features. Next.js, React, Supabase, Postgres, edge deploys.",
    proofSlug: "jumbo",
    proofLabel: "Jumbo ERP",
  },
  {
    icon: Bot,
    title: "AI engineering & automation",
    body:
      "AI agents, LLM-integrated workflows, scraping and extraction pipelines, MCP tooling, n8n and Make. Claude Code, Vertex AI, OpenAI.",
    proofSlug: "competitive-intel",
    proofLabel: "Competitive Intel Agent",
  },
  {
    icon: Database,
    title: "Data engineering & analytics",
    body:
      "Cloud data pipelines, scheduled ingestion, SQL modeling, KPI dashboards in Power BI or custom. Python, AWS, Google Sheets APIs.",
    proofSlug: "johnson-matthey",
    proofLabel: "Johnson Matthey Pipeline",
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
          {pillars.map(({ icon: Icon, title, body, proofSlug, proofLabel }) => (
            <Link
              key={title}
              href={`/work/${proofSlug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 transition-colors duration-200 hover:border-accent-border"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-text">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                  {body}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-border-subtle pt-4 text-sm">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                  Proof · {proofLabel}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-text-subtle transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
