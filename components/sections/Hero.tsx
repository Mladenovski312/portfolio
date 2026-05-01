import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TerminalHero } from "@/components/interactions/TerminalHero";
import { FadeIn } from "@/components/motion/FadeIn";

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
        <div className="grid items-start gap-10 pb-24 md:grid-cols-[1.1fr_1fr] md:gap-10 md:pb-32 lg:gap-14">
          <div className="space-y-6">
            <FadeIn className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>Available · Q2 2026</span>
              <span className="text-border">·</span>
              <span>Kumanovo · Remote</span>
            </FadeIn>

            <FadeIn
              as="h1"
              delay={0.12}
              className="text-balance font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.025em] text-text sm:text-[44px] md:text-[52px] lg:text-[60px]"
            >
              Ship AI-powered web apps and automation in{" "}
              <span className="text-accent">weeks</span>, not months.
            </FadeIn>

            <FadeIn
              as="p"
              delay={0.38}
              className="max-w-xl text-pretty text-[17px] leading-relaxed text-text-muted md:text-lg"
            >
              Full-stack products, AI agents, and data pipelines, shipped solo.
              I architect and oversee the system; AI handles the execution.
              Senior-engineer output in roughly half the time and cost of an agency.
            </FadeIn>

            <FadeIn delay={0.54} className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="/contact" variant="primary" icon>
                Book a call
              </Button>
              <a
                href="#work"
                className="text-sm text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
              >
                or see the work
              </a>
            </FadeIn>
          </div>

          {/* Right: terminal anchor */}
          <div className="relative md:pt-6">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-3xl bg-accent-soft/40 blur-3xl"
            />
            <TerminalHero className="relative" />
          </div>
        </div>
      </Container>
    </section>
  );
}
