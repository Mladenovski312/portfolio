import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Lab · Filip Mladenovski",
  description:
    "Experiments with AI-assisted development, Claude Code, MCP tools, and agent prototypes.",
};

export default function LabPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-border-subtle/60 pt-20 md:pt-28">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
          />
          <Container className="relative pb-20">
            <SectionLabel number="LAB">Experiments & notes</SectionLabel>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-text md:text-6xl">
              Where the tools get stress-tested before they hit client work.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-text-muted">
              Claude Code workflows, MCP server prototypes, agent experiments, and short technical write-ups. Everything here is shipped when it matters and abandoned when it does not.
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-4 md:grid-cols-2">
              <LabCard
                status="coming-soon"
                title="Claude Code playbook"
                body="The exact workflow I use to ship production code fast: plan files, voice-locked CLAUDE.md, subagent use, verification checklist."
                tags={["Claude Code", "Workflow"]}
              />
              <LabCard
                status="live"
                href="/lab/nexus"
                title="NEXUS, a self-hosted AI agent rig"
                body="Repurposed an older laptop as a standalone AI runtime. Linux Mint, Docker, OpenClaw, remote-managed over SSH and Tailscale, phone-accessible via a locked-down Telegram front-end. Kept off the main workstation on purpose."
                tags={["Linux", "Docker", "Tailscale", "Self-hosted"]}
              />
              <LabCard
                status="coming-soon"
                title="Agents that did not make it to production"
                body="Three agent builds that failed to earn their keep, and what the failure modes taught me about when to not use an agent."
                tags={["AI Agents", "Retro"]}
              />
              <LabCard
                status="coming-soon"
                title="The Gemini product scanner"
                body="How the Jumbo product scanner actually works, the prompt design, the fallback logic, and what I would change if I rebuilt it."
                tags={["Gemini", "Vision"]}
              />
            </div>

            <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center md:p-12">
              <p className="mx-auto max-w-xl font-display text-2xl font-medium tracking-tight text-text md:text-3xl text-balance">
                First write-up lands soon. Until then, the work speaks for itself.
              </p>
              <div className="mt-6 flex justify-center">
                <Button href="/#work" variant="secondary">
                  See the work
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function LabCard({
  title,
  body,
  tags,
  status,
  href,
}: {
  title: string;
  body: string;
  tags: string[];
  status: "live" | "coming-soon";
  href?: string;
}) {
  const baseClasses =
    "group relative block rounded-2xl border border-border bg-surface p-7 transition-colors";
  const interactiveClasses = href ? " hover:border-accent-border" : "";

  const body$ = (
    <>
      <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
        <span>Write-up</span>
        {status === "coming-soon" ? (
          <span className="text-accent">Coming soon</span>
        ) : (
          <span className="text-success">Live</span>
        )}
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-text">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{body}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      {href && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-text-muted transition-colors group-hover:text-accent">
            Read write-up
          </span>
          <ArrowUpRight
            size={16}
            className="text-text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses + interactiveClasses}>
        {body$}
      </Link>
    );
  }
  return <article className={baseClasses}>{body$}</article>;
}
