import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { work } from "@/lib/work";
import { caseStudies } from "@/lib/case-studies";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export function generateStaticParams() {
  return work
    .filter((w) => w.hasCaseStudy)
    .map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} · Filip Mladenovski`,
    description: item.outcome,
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/work/[slug]">,
) {
  const { slug } = await props.params;
  const item = work.find((w) => w.slug === slug);
  if (!item || !item.hasCaseStudy) notFound();

  const study = caseStudies[item.slug];
  if (!study) notFound();

  const otherWork = work
    .filter((w) => w.hasCaseStudy && w.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <Nav />

      <main className="pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border-subtle/60 pt-16 md:pt-24">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
          />
          <Container className="relative">
            <Link
              href="/#work"
              className="group mb-10 inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2 text-[13px] font-medium text-text-muted transition-[border-color,background-color,color] duration-200 hover:border-accent-border hover:bg-surface hover:text-text"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to work
            </Link>

            <div className="space-y-6 pb-16">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
                <span>{item.category}</span>
                <span className="text-border">·</span>
                <span>{item.year}</span>
                <span className="text-border">·</span>
                <span>{item.client}</span>
              </div>

              <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-text md:text-5xl lg:text-6xl">
                {item.name}
              </h1>

              <p className="max-w-2xl text-pretty text-xl leading-relaxed text-text-muted">
                {item.outcome}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>

              {(item.url || item.repoUrl) && (
                <div className="flex flex-wrap gap-3 pt-4">
                  {item.url && (
                    <Button href={item.url} variant="secondary" icon external>
                      Visit live site
                    </Button>
                  )}
                  {item.repoUrl && (
                    <Button href={item.repoUrl} variant="secondary" icon external>
                      View source
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Quick facts */}
            <dl className="grid gap-6 border-t border-border-subtle py-8 md:grid-cols-3">
              <Fact label="Context">{study.context}</Fact>
              <Fact label="Timeline">{study.timeline}</Fact>
              <Fact label="Role">{study.role}</Fact>
            </dl>

            {item.metrics && (
              <dl className="grid gap-4 border-t border-border-subtle py-8 md:grid-cols-3">
                {item.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
                      {metric.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-semibold tracking-tight text-text">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Container>
        </section>

        {/* Cover */}
        {study.cover && (
          <section className="border-b border-border-subtle/60 bg-surface-2/40 py-12 md:py-16">
            <Container>
              <figure className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_-30px_rgba(94,234,212,0.18)]">
                <Image
                  src={study.cover.src}
                  alt={study.cover.alt}
                  width={study.cover.width}
                  height={study.cover.height}
                  priority
                  sizes="(min-width: 1152px) 1100px, (min-width: 768px) 90vw, 100vw"
                  className="h-auto w-full"
                />
              </figure>
            </Container>
          </section>
        )}

        {/* Body */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10">
              {study.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>
          </Container>
        </section>

        {/* Other work */}
        <section className="border-t border-border-subtle/60 py-20">
          <Container>
            <SectionLabel number="→">More case studies</SectionLabel>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {otherWork.map((w) => (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent-border"
                >
                  <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
                    {w.category}
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-text">
                    {w.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{w.outcome}</p>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-text-muted group-hover:text-accent">
                      Read case study
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20">
          <Container>
            <div className="rounded-2xl border border-border bg-surface p-7 text-center sm:p-10 md:p-16">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-text md:text-5xl text-balance">
                Have a build like this in mind?
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact" variant="primary">
                  Book a call
                </Button>
                <Button href="/#work" variant="secondary">
                  See more work
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

function BlockRenderer({ block }: { block: import("@/lib/case-studies").Block }) {
  if (block.kind === "h2") {
    return (
      <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "p") {
    return (
      <p className="text-[17px] leading-relaxed text-text-muted">{block.text}</p>
    );
  }
  if (block.kind === "bullets") {
    return (
      <ul className="space-y-3">
        {block.items.map((it, i) => (
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
    );
  }
  if (block.kind === "callout") {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Decision
        </div>
        <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-text">
          {block.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-text-muted">
          {block.body}
        </p>
      </div>
    );
  }
  if (block.kind === "architecture") {
    return (
      <div className="grid gap-3 rounded-xl border border-border bg-surface p-6 md:grid-cols-2">
        {block.items.map((row) => (
          <div key={row.layer}>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
              {row.layer}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {row.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (block.kind === "image") {
    return (
      <figure className="space-y-3">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full"
          />
        </div>
        {block.caption && (
          <figcaption className="text-center font-mono text-[12px] uppercase tracking-[0.14em] text-text-subtle">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return null;
}
