import { FAQJsonLd } from "@/components/seo/FAQJsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs } from "@/lib/faq";

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-border-subtle/60 py-28 md:py-36"
    >
      <FAQJsonLd />
      <Container>
        <div className="mb-14 space-y-6">
          <SectionLabel number="08">FAQ</SectionLabel>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
              Questions clients ask before we build.
            </h2>
            <p className="max-w-sm text-text-muted">
              Short answers on AI agents, automation, full-stack apps, data pipelines, scope, cost, and delivery.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors open:border-accent-border open:bg-surface-2/60"
            >
              <summary className="cursor-pointer list-none font-display text-xl font-semibold tracking-tight text-text marker:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden
                    className="mt-1 font-mono text-lg leading-none text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface/60 p-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[15px] leading-relaxed text-text-muted">
            The fastest way to price a build is to bring one workflow, the current manual steps, and the tools it touches.
          </p>
          <Button href="/contact" variant="primary" className="justify-center">
            Scope a build
          </Button>
        </div>
      </Container>
    </section>
  );
}
