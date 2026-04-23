import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TerminalHero } from "@/components/interactions/TerminalHero";
import { Chip } from "@/components/ui/Chip";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border-subtle/60 pt-14 md:pt-20"
    >
      {/* Background dot grid, fades out */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid items-start gap-12 pb-24 md:grid-cols-[1.05fr_1fr] md:gap-10 md:pb-32 lg:gap-16">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>Available · Q2 2026</span>
              <span className="text-border">/</span>
              <span>Kumanovo · Remote</span>
            </div>

            <h1 className="text-balance font-display text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] text-text sm:text-[56px] md:text-[64px] lg:text-[72px]">
              Ship AI-powered web apps and automation in{" "}
              <span className="text-accent">weeks</span>, not months.
            </h1>

            <p className="max-w-xl text-pretty text-[17px] leading-relaxed text-text-muted md:text-lg">
              I build full-stack products, AI agents, and data pipelines. Solo, using
              AI-assisted development to compress timelines without dropping the
              quality a team would deliver.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="#contact" variant="primary" icon>
                Book a call
              </Button>
              <Button href="#work" variant="secondary">
                See the work
              </Button>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <span className="text-text">Top Rated</span>
                <span className="text-border">·</span>
                <span>Upwork</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-text">100%</span>
                <span>Job Success Score</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-text">50+</span>
                <span>projects shipped</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-text">Live</span>
                <span>interstarjumbo.com</span>
              </li>
            </ul>
          </div>

          {/* Right: terminal anchor */}
          <div className="relative md:pt-6">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl bg-accent-soft/60 blur-3xl"
            />
            <TerminalHero className="relative" />
            <div className="mt-4 flex items-center gap-2">
              <Chip tone="accent">Built with Claude Code</Chip>
              <span className="font-mono text-[11px] text-text-subtle">
                this page, in real time
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
