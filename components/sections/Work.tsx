import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/interactions/ProjectCard";
import {
  work,
  heroItems,
  inProgress,
  frontendCards,
  dataExtras,
  alsoShipped,
} from "@/lib/work";

export function Work() {
  const heroes = heroItems(work);
  const progress = inProgress(work);
  const dataMore = dataExtras(work);
  const frontend = frontendCards(work);
  const [frontendLarge, ...frontendRest] = [
    frontend.find((f) => f.slug === "pickaxe")!,
    frontend.find((f) => f.slug === "allphins")!,
    ...frontend.filter(
      (f) => !["pickaxe", "allphins"].includes(f.slug),
    ),
  ];

  return (
    <section
      id="work"
      className="scroll-mt-20 border-b border-border-subtle/60 py-28 md:py-36"
    >
      <Container>
        <div className="mb-12 space-y-6">
          <SectionLabel number="01">Selected Work</SectionLabel>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
              Production systems, not side projects.
            </h2>
            <p className="max-w-sm text-text-muted">
              Full-stack products, AI agents, data pipelines, and polished client sites. 50+ projects shipped across Upwork and direct engagements.
            </p>
          </div>
        </div>

        {/* Hero case studies */}
        <div className="space-y-6">
          {heroes.map((item) => (
            <ProjectCard key={item.slug} item={item} size="lg" />
          ))}
        </div>

        {/* In progress teaser */}
        {progress.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
              In progress
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {progress.map((item) => (
                <ProjectCard key={item.slug} item={item} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Data & analytics */}
        {dataMore.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
              Data & analytics
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {dataMore.map((item) => (
                <ProjectCard key={item.slug} item={item} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Frontend category */}
        <div className="mt-20 space-y-8">
          <div className="flex items-end justify-between gap-4 border-t border-border-subtle pt-10">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
                Frontend & client web
              </div>
              <h3 className="mt-2 max-w-xl font-display text-2xl font-semibold tracking-tight text-text md:text-3xl">
                The Webflow and custom-frontend track that paid for the rest.
              </h3>
            </div>
            <p className="hidden max-w-xs text-sm text-text-muted md:block">
              Over a dozen client sites, five-star reviews, repeat business.
            </p>
          </div>

          {/* Top two frontend case studies */}
          <div className="grid gap-6 md:grid-cols-2">
            {[frontendLarge, ...frontendRest.filter((f) => f.slug === "allphins")].map(
              (item) => (
                <ProjectCard key={item.slug} item={item} size="md" />
              ),
            )}
          </div>

          {/* Compact frontend cards */}
          <div className="grid gap-3 md:grid-cols-3">
            {frontendRest
              .filter((f) => f.slug !== "allphins")
              .map((item) => (
                <ProjectCard key={item.slug} item={item} size="sm" />
              ))}
          </div>
        </div>

        {/* Also shipped */}
        <div className="mt-14 rounded-2xl border border-border-subtle/80 bg-surface/60 p-6">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
            Also shipped
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {alsoShipped.map((name) => (
              <li key={name} className="text-sm text-text-muted">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
