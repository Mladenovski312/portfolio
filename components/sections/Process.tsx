import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    n: "01",
    title: "Scope in one call",
    body:
      "Thirty minutes. I listen, push back, and write down what we are actually building. You leave with a scope doc, a timeline, and a fixed or staged price.",
  },
  {
    n: "02",
    title: "Architecture before code",
    body:
      "Before a single line is written, data models, auth, and integrations are laid out. No surprises in week three.",
  },
  {
    n: "03",
    title: "Build with AI, review with eyes",
    body:
      "Claude Code drafts. I review, refactor, and own every line for security, performance, and reliability. This is where the speed comes from, not the cheapness.",
  },
  {
    n: "04",
    title: "Ship, document, hand off",
    body:
      "Deploy to Vercel or your stack, write a handoff README your team can live in, and stay available for the first weeks after launch.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-b border-border-subtle/60 py-28 md:py-36"
    >
      <Container>
        <div className="mb-14 space-y-6">
          <SectionLabel number="03">How I work</SectionLabel>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
              Four steps, zero theater.
            </h2>
            <p className="max-w-sm text-text-muted">
              Fewer meetings, clearer scope, faster delivery. The same build in weeks, not quarters.
            </p>
          </div>
        </div>

        <ol className="grid gap-0 border-t border-border-subtle md:grid-cols-2">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={
                "group relative border-b border-border-subtle p-8 transition-colors hover:bg-surface/60 md:p-10 " +
                (i % 2 === 0 ? "md:border-r" : "")
              }
            >
              <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                <span className="text-accent">{step.n}</span>
                <span className="h-px w-8 bg-border" />
              </div>
              <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight text-text">
                {step.title}
              </h3>
              <p className="max-w-md text-[15px] leading-relaxed text-text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
