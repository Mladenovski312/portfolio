import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Clock, Globe } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CalEmbed } from "@/components/interactions/CalEmbed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · Filip Mladenovski",
  description:
    "Book a 30-minute call, send an email, or hire via Upwork. Based in Kumanovo, MK. Working EU hours, average response 8–12 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Filip Mladenovski",
    description:
      "Book a 30-minute call, send an email, or hire via Upwork. Based in Kumanovo, MK.",
    type: "website",
    url: `${site.url}/contact`,
  },
};

const links = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    description: "Best for project briefs and longer questions.",
  },
  {
    label: "Upwork",
    value: "Top Rated · 100% JSS",
    href: site.links.upwork,
    description: "Hire through the platform if your team requires it.",
  },
  {
    label: "LinkedIn",
    value: "in/mladenovskifilip",
    href: site.links.linkedin,
    description: "Background, recommendations, history.",
  },
  {
    label: "GitHub",
    value: "@Mladenovski312",
    href: site.links.github,
    description: "Open code, write-ups, experiments.",
  },
];

const briefItems = [
  "What workflow, app, or data process you want fixed.",
  "Which tools it touches, for example Supabase, Google Sheets, Notion, email, APIs, or an existing app.",
  "What happens manually today and how often it happens.",
  "Any hard constraints: timeline, budget range, compliance, access, or launch date.",
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border-subtle/60 pt-20 md:pt-28">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
          />
          <Container className="relative pb-20">
            <SectionLabel number="CONTACT">Let&rsquo;s build</SectionLabel>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-text md:text-6xl">
              Bring a rough spec or a vague idea. Leave with a concrete plan and a number.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-text-muted">
              Thirty-minute calls, no slide deck. If a build makes sense, we
              scope it. If it does not, you get an honest answer and a pointer to
              someone better suited.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={site.booking} variant="primary" icon external>
                Book a 30-min call
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" icon external>
                Email directly
              </Button>
            </div>
          </Container>
        </section>

        {/* Where / when */}
        <section className="border-b border-border-subtle/60 py-20">
          <Container>
            <SectionLabel number="01">Where & when</SectionLabel>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <InfoCard
                icon={<MapPin size={18} />}
                label="Based"
                value={site.location}
                hint="Remote-first, occasional EU travel."
              />
              <InfoCard
                icon={<Clock size={18} />}
                label="Hours"
                value={`${site.workingHours} · ${site.timezone}`}
                hint={`Average response ${site.responseWindow}.`}
              />
              <InfoCard
                icon={<Globe size={18} />}
                label="Working with"
                value="EU, UK, US, MENA"
                hint="English and Macedonian, written or live."
              />
            </div>
          </Container>
        </section>

        {/* Brief */}
        <section className="border-b border-border-subtle/60 py-20">
          <Container>
            <SectionLabel number="02">Fastest useful brief</SectionLabel>
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
              <div>
                <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
                  Send the rough version. I can work from that.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted">
                  You do not need a polished spec. Four plain notes are enough to decide whether this is an audit, prototype, or production build.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`mailto:${site.email}`} variant="primary" icon external>
                    Email the brief
                  </Button>
                  <Button href={site.booking} variant="secondary" icon external>
                    Book first
                  </Button>
                </div>
              </div>

              <ol className="grid gap-3">
                {briefItems.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-relaxed text-text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* Booking embed */}
        <section className="border-b border-border-subtle/60 py-20">
          <Container>
            <SectionLabel number="03">Book directly</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
              Pick a slot that works.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-muted">
              Thirty minutes, video, no prep needed. If the embed below does not
              load, the same booking link is{" "}
              <a
                href={site.booking}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent underline-offset-4 hover:underline"
              >
                here
              </a>
              .
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
              <CalEmbed calLink="filip-mladenovski/30min" />
              <noscript>
                <div className="p-6 text-text-muted">
                  Booking requires JavaScript.{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent underline"
                  >
                    Email instead
                  </a>
                  .
                </div>
              </noscript>
            </div>
          </Container>
        </section>

        {/* All channels */}
        <section className="py-24">
          <Container>
            <SectionLabel number="04">All channels</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
              Pick whichever you prefer.
            </h2>

            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                      {l.label}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <div className="mt-3 font-display text-xl font-semibold tracking-tight text-text">
                    {l.value}
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                    {l.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-surface p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                    <Mail size={14} />
                    <span>Direct line</span>
                  </div>
                  <p className="font-display text-2xl font-medium tracking-tight text-text">
                    {site.email}
                  </p>
                </div>
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  See the work first
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
        <span className="text-accent">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="font-display text-xl font-semibold tracking-tight text-text">
        {value}
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-text-muted">{hint}</p>
    </div>
  );
}
