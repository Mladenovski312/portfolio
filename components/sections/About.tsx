import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border-subtle/60 py-28 md:py-36"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="space-y-6">
            <SectionLabel number="04">About</SectionLabel>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
              Engineer's mindset, builder's output.
            </h2>
          </div>

          <div className="space-y-6 text-[17px] leading-relaxed text-text-muted">
            <p>
              I come from an engineering background, MSc-level. Systems, measurements, reproducibility. That mindset runs through everything I ship, whether it is a reinsurance analytics CMS or a POS that has to clear a transaction in under 300ms.
            </p>
            <p>
              The last year I have gone deep on AI-assisted development, agent building, and cloud data pipelines. The work is moving faster than agencies and bigger teams can keep up with. Individual engineers who own the whole stack and use AI as a craft multiplier are, quietly, in a very good spot.
            </p>
            <p>
              Currently shipping a full store platform for the regional CF Moto distributor, and contributing as a developer on the Macedonian government E-Invoice integration, testing the API and reporting fixes back upstream on behalf of an accounting office.
            </p>
            <p>
              Outside client work, I run a self-hosted AI agent on a repurposed Linux laptop, reachable over Tailscale and Telegram. It stays off my main workstation on purpose, both for isolation and for the habit of treating agents like any other piece of infra.
            </p>
            <p>
              Based in Kumanovo, North Macedonia. Remote-native, async-friendly. I answer fast, over-communicate scope changes, and leave codebases cleaner than I found them.
            </p>
            <dl className="grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-2 md:grid-cols-3">
              <Fact label="Location">Kumanovo, NMK</Fact>
              <Fact label="Timezone">UTC+1</Fact>
              <Fact label="Focus">Full-stack · AI · Data</Fact>
              <Fact label="Languages">English, Macedonian</Fact>
              <Fact label="Rate">From $35/hr</Fact>
              <Fact label="Availability">Q2 2026</Fact>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-text">{children}</dd>
    </div>
  );
}
