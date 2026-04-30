import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata = {
  title: "NEXUS, a self-hosted AI agent rig · Filip Mladenovski",
  description:
    "Repurposed laptop running a standalone AI runtime on Linux Mint, Docker, and OpenClaw. Remote-managed over SSH and Tailscale, accessible by phone through a locked-down Telegram front-end.",
};

const stack = [
  "Linux Mint",
  "Docker",
  "OpenClaw",
  "Tailscale",
  "SSH",
  "UFW",
  "Telegram Bot API",
  "Self-hosted",
];

export default function NexusLabPage() {
  return (
    <>
      <Nav />

      <main className="pb-20">
        <section className="relative overflow-hidden border-b border-border-subtle/60 pt-16 md:pt-24">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
          />
          <Container className="relative">
            <Link
              href="/lab"
              className="group mb-10 inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2 text-[13px] font-medium text-text-muted transition-[border-color,background-color,color] duration-200 hover:border-accent-border hover:bg-surface hover:text-text"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to lab
            </Link>

            <div className="space-y-6 pb-16">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
                <span>Lab</span>
                <span className="text-border">·</span>
                <span>Infrastructure</span>
                <span className="text-border">·</span>
                <span className="text-success">Live</span>
              </div>

              <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-text md:text-5xl lg:text-6xl">
                NEXUS, a self-hosted AI agent rig.
              </h1>

              <p className="max-w-2xl text-pretty text-xl leading-relaxed text-text-muted">
                An older laptop, wiped and turned into a standalone AI runtime. Linux, Docker, OpenClaw, and Tailscale. Reachable from my phone, isolated from the main workstation on purpose.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface-2">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/media/nexus-agent.png"
                  alt="NEXUS rig: self-hosted AI agent server with live status overlay"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-border-subtle px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                NEXUS rig, conceptual render
              </figcaption>
            </figure>

            <dl className="mt-10 grid gap-6 border-t border-border-subtle py-8 md:grid-cols-3">
              <Fact label="Why">
                Agent workloads don&apos;t belong on the workstation that holds client code.
              </Fact>
              <Fact label="Host">
                Repurposed Asus ROG laptop, wiped and rebuilt from scratch.
              </Fact>
              <Fact label="Access">
                Phone, laptop, or desktop, over Tailscale.
              </Fact>
            </dl>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                The idea
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                I wanted a real, personal AI rig. Not a rented notebook, not a cloud VM that disappears when a bill bounces. An always-on box I own, sitting on my LAN, that I can reach from my phone on the train.
              </p>
              <p className="text-[17px] leading-relaxed text-text-muted">
                The rules I set before turning a screw: the agent never sees client repos, nothing ever listens on a public port, and every remote path is authenticated. If any of those three broke, the project was not worth running.
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                The hardware
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                An older gaming laptop that had been collecting dust. Good CPU, decent RAM, a discrete GPU I may put to work later. Zero recurring cost, full control over the OS, and plenty of headroom for everything the agent actually needs to do.
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                The OS and runtime
              </h2>
              <ul className="space-y-3">
                {[
                  "Wiped the factory install. Fresh Linux Mint 22.3, Ubuntu Noble base. No desktop bloat, just the tools I need.",
                  "Docker and Docker Compose as the container layer, so every service is declarative and reproducible.",
                  "OpenClaw as the agent gateway, running an OAuth-bound OpenAI Codex session for the default model and a capped Anthropic fallback for API work.",
                  "Spending ceiling set on the fallback provider. Agent cannot burn a month of budget in an afternoon.",
                ].map((it, i) => (
                  <li
                    key={i}
                    className="relative pl-6 text-[16px] leading-relaxed text-text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {it}
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                Remote access without a public IP
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                Tailscale handles the WAN path. The box never exposes a port to the open internet. My devices join the same tailnet and talk to it over WireGuard, with SSH as the only control plane and a UFW firewall scoped to LAN plus Tailscale ranges.
              </p>
              <p className="text-[17px] leading-relaxed text-text-muted">
                Phone access goes through a Telegram bot locked to a single chat ID. Anyone who finds the bot by accident gets silence. On the desktop or laptop it&apos;s SSH plus the OpenClaw web UI over Tailscale, nothing more.
              </p>

              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Decision
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-text">
                  Isolate the agent from the workstation.
                </h3>
                <p className="text-[15px] leading-relaxed text-text-muted">
                  The main Windows workstation holds client repos, credentials, and paid tooling. The agent box sees none of it. Two machines, two trust boundaries, one cable between them. If the agent ever misbehaves, the blast radius stops at its own disk.
                </p>
              </div>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                What I actually use it for
              </h2>
              <ul className="space-y-3">
                {[
                  "Drafting research, long-context reading, and code sketches while away from the desk.",
                  "Long-running jobs I do not want hogging the workstation: batch rewrites, content processing, scheduled scrapes.",
                  "A sandbox for agent patterns before they go into client work. Every production agent I ship has been shaken out on this box first.",
                ].map((it, i) => (
                  <li
                    key={i}
                    className="relative pl-6 text-[16px] leading-relaxed text-text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {it}
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                What&apos;s next
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                A local model for offline fallback, a proper observability stack so I can see what the agent is doing without tailing logs, and scheduled jobs that run while I sleep. The rig is stable enough now that the next round of work is about making it more useful, not keeping it up.
              </p>
              <p className="text-[17px] leading-relaxed text-text-muted">
                If you run agents in production and want to compare notes on runtime, isolation, or cost controls, I&apos;m happy to trade them.
              </p>
            </div>
          </Container>
        </section>

        <section className="border-t border-border-subtle/60 py-20">
          <Container>
            <SectionLabel number="→">More from the lab</SectionLabel>
            <div className="mt-10 rounded-2xl border border-border bg-surface p-7 text-center sm:p-10 md:p-16">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-text md:text-5xl text-balance">
                Want this kind of setup for your team?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted">
                Self-hosted agents, isolated runtimes, and cost-aware AI infra are part of what I build for clients. Happy to scope one with you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact" variant="primary">
                  Book a call
                </Button>
                <Button href="/lab" variant="secondary">
                  Back to lab
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

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
        {label}
      </dt>
      <dd className="mt-2 text-[15px] leading-relaxed text-text">{children}</dd>
    </div>
  );
}
