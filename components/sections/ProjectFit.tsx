import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const goodFit = [
  "You have a manual workflow that costs hours every week.",
  "You need a production web app, admin panel, POS, dashboard, or internal tool.",
  "Your data lives across spreadsheets, APIs, Notion, Supabase, or Postgres.",
  "You want one engineer to own scope, build, deployment, and handoff.",
];

const notFit = [
  "You only need a quick landing page with no product logic.",
  "You want an AI chatbot without a clear workflow or business outcome.",
  "You need a large committee, daily status calls, or agency-style account layers.",
  "You are not ready to share the current process, tools, or constraints.",
];

const startingPoints = [
  {
    title: "Workflow audit",
    scope: "1 to 2 days",
    body: "Map the current process, identify automation candidates, and leave with a build plan.",
  },
  {
    title: "Prototype sprint",
    scope: "1 to 2 weeks",
    body: "Validate the riskiest part first: AI output, API integration, data model, or internal UI.",
  },
  {
    title: "Production build",
    scope: "4 to 12 weeks",
    body: "Ship the full app or workflow with auth, data, monitoring, deployment, and handoff.",
  },
];

export function ProjectFit() {
  return (
    <section className="border-b border-border-subtle/60 py-28 md:py-36">
      <Container>
        <div className="mb-14 space-y-6">
          <SectionLabel number="07">Fit & scope</SectionLabel>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
              The right projects are specific enough to ship.
            </h2>
            <p className="max-w-sm text-text-muted">
              A good first call should answer fit, scope, risk, timeline, and the next concrete step.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1.15fr]">
          <FitList title="Good fit" items={goodFit} tone="good" />
          <FitList title="Not a fit" items={notFit} tone="muted" />

          <div className="rounded-2xl border border-accent-border bg-surface p-6">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Typical starting points
            </div>
            <div className="space-y-4">
              {startingPoints.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-border-subtle pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-text">
                      {item.title}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
                      {item.scope}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button href="/contact" variant="primary" className="w-full justify-center">
                Find the right scope
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FitList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-text">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-text-muted">
            <span
              aria-hidden
              className={
                "mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full " +
                (tone === "good" ? "bg-accent" : "bg-text-subtle")
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
