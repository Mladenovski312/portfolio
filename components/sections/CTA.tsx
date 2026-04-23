import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section id="contact" className="scroll-mt-20 py-32 md:py-40">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
          />

          <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
                Ready when you are
              </p>
              <h2 className="max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-text md:text-6xl">
                Have a build in mind? Let&rsquo;s talk.
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-text-muted">
                A thirty-minute call. Bring a rough spec or a vague idea. You leave with a concrete plan and a number.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button href={`mailto:${site.email}`} variant="primary" icon external>
                Email directly
              </Button>
              <Button href={site.links.upwork} variant="secondary" icon external>
                Or hire via Upwork
              </Button>
              <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                Avg response 8–12 hours · EU hours
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
