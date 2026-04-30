import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata = {
  title: "Inside the Jumbo Gemini scanner · Filip Mladenovski",
  description:
    "Production deep-dive on the AI vision scanner inside the InterStar Jumbo POS. Prompt design, confidence gating, fallback paths, and how it stays out of the checkout critical path.",
};

const stack = [
  "Next.js 16",
  "React 19",
  "Gemini 2.5 Flash",
  "Vision input",
  "Structured output",
  "Supabase",
  "Edge runtime",
];

export default function JumboScannerLabPage() {
  return (
    <>
      <Nav />

      <main className="pb-20">
        <section className="relative overflow-hidden border-b border-border-subtle/60 pt-16 md:pt-24">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
          />
          <Container className="relative">
            <Link
              href="/lab"
              className="group mb-10 inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2 text-[13px] font-medium text-text-muted transition-[border-color,background-color,color] duration-200 hover:border-accent-border hover:bg-surface hover:text-text"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to lab
            </Link>

            <div className="space-y-6 pb-16">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
                <span>Lab</span>
                <span className="text-border">·</span>
                <span>AI Vision</span>
                <span className="text-border">·</span>
                <span className="text-success">Live</span>
              </div>

              <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-text md:text-5xl lg:text-6xl">
                Inside the Jumbo Gemini scanner.
              </h1>

              <p className="max-w-2xl text-pretty text-xl leading-relaxed text-text-muted">
                A production AI vision component inside a retail POS. Cashier snaps a product, the system identifies it, and the cart line lands in under a second. The interesting part is what happens when the model is wrong.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <figure className="overflow-hidden rounded-2xl border border-border bg-surface-2">
              <div className="border-b border-border-subtle px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                Scanner response, redacted
              </div>
              <pre className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-relaxed text-text-muted">
{`{
  "candidates": [
    { "sku": "PLY-3421", "name": "Wooden Train Set, 24 pc", "confidence": 0.94 },
    { "sku": "PLY-3418", "name": "Wooden Train Set, 12 pc", "confidence": 0.41 }
  ],
  "notes": "High confidence on lead candidate. Box layout matches reference image."
}`}
              </pre>
            </figure>

            <dl className="mt-10 grid gap-6 border-t border-border-subtle py-8 md:grid-cols-3">
              <Fact label="Why">
                Plenty of toy SKUs ship without scannable barcodes. Manual lookup at the register slows checkout.
              </Fact>
              <Fact label="Model">
                Gemini 2.5 Flash, vision input, JSON-structured output.
              </Fact>
              <Fact label="Posture">
                Async, time-bounded, never on the checkout critical path.
              </Fact>
            </dl>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                The problem
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                Toy retail has a long tail of items without scannable barcodes. Loose plush, partial bundles, gift sets the supplier ships unlabeled. The cashier&apos;s only options are typing a name from memory or scrolling a category. Both slow the queue.
              </p>
              <p className="text-[17px] leading-relaxed text-text-muted">
                The scanner gives the register a third input. Point the tablet camera at the product, tap once, the suggested match drops into the cart. When it works, it shaves five to ten seconds per ambiguous item. When it does not, nothing breaks.
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                How a single scan works
              </h2>
              <ol className="space-y-3">
                {[
                  "Cashier taps the scan button on the POS surface, available next to the barcode and manual-search inputs.",
                  "Browser opens the rear camera through getUserMedia. Frame, capture, single still image.",
                  "Image is downscaled and JPEG-compressed in the browser before it ever leaves the tablet, keeping the request small.",
                  "POST hits the Next.js route on the edge runtime. Per-user rate limit checked first. Anything above the cap returns 429 immediately, no model call.",
                  "Server calls Gemini 2.5 Flash with the image and a JSON-shaped prompt. Catalog snippet for the active store is included so the model has a closed set to match against.",
                  "Response is parsed and the top candidate above the confidence threshold lands in the cashier&apos;s suggestion panel.",
                ].map((it, i) => (
                  <li
                    key={i}
                    className="relative pl-7 text-[16px] leading-relaxed text-text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 font-mono text-[12px] text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {it}
                  </li>
                ))}
              </ol>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                The prompt
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                The prompt is short, specific, and closed. The model is not asked to be creative. It is asked to match an image against a known catalog and report its confidence.
              </p>
              <pre className="overflow-x-auto rounded-xl border border-border bg-surface px-5 py-5 font-mono text-[13px] leading-relaxed text-text-muted">
{`Identify the product in this image. Match against this catalog:

{catalog_snippet}

Return JSON in this exact shape:
{
  "candidates": [
    { "sku": "string", "name": "string", "confidence": 0.0-1.0 }
  ],
  "notes": "string, optional"
}

Return up to 3 candidates ordered by confidence.
If no candidate scores above 0.7, return an empty array.
Do not invent SKUs that are not in the catalog.`}
              </pre>
              <p className="text-[17px] leading-relaxed text-text-muted">
                Two design calls worth naming. Closed set instead of open-ended description, so the model cannot hallucinate a SKU. Explicit confidence threshold inside the prompt, so the model itself decides when to refuse.
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                Confidence threshold and fallback
              </h2>
              <ul className="space-y-3">
                {[
                  "Above 0.85: top candidate auto-fills the next cart line, cashier confirms with one tap. The common case.",
                  "Between 0.7 and 0.85: top three render as a chooser. Cashier picks or rejects. Two extra taps but no manual lookup.",
                  "Below 0.7: empty result. POS surfaces the standard barcode and manual-search inputs. Same workflow they used before the scanner existed.",
                  "Server timeout at 3 seconds. If Gemini is slow or unhealthy, the request is dropped client-side and the cashier moves on. Sentry catches the failure with user identifiers stripped.",
                ].map((it, i) => (
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

              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Decision
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-text">
                  AI as progressive enhancement, never a dependency.
                </h3>
                <p className="text-[15px] leading-relaxed text-text-muted">
                  The cashier had a working POS before the scanner shipped. They still do, on every code path. The scanner is one input among three, behind a budget cap, behind a timeout, behind a confidence gate. The day Gemini has an outage, the register keeps clearing transactions.
                </p>
              </div>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                Where it sits in checkout
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                The POS target is sub-300ms transaction clearance on the shop floor. Gemini round-trips do not fit inside that budget. So the scanner runs in parallel, not in series. The cashier can keep building the cart with barcodes while the scan is pending. When the suggestion lands, it animates into the side panel and the cashier accepts or ignores it.
              </p>
              <p className="text-[17px] leading-relaxed text-text-muted">
                That decoupling is the whole posture. Latency from the model never becomes latency for the customer.
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                What I would change next
              </h2>
              <ul className="space-y-3">
                {[
                  "Catalog embedding pre-filter on the server. Right now the catalog snippet is roughly the active store. With embeddings, the prompt could ship only the nearest 50 candidates, cutting tokens and latency together.",
                  "On-device fallback model for offline or degraded-network days. Smaller, less accurate, but always available.",
                  "Multi-frame capture for items that look similar from one angle. Capture three frames over half a second, send the best one or vote across them.",
                  "Per-category confidence tuning. Plush is harder than boxed sets. The threshold should know that.",
                ].map((it, i) => (
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

              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                Why this pattern travels
              </h2>
              <p className="text-[17px] leading-relaxed text-text-muted">
                The shape generalizes. Closed set, structured output, confidence gate, time-bounded call, graceful fallback. Swap product identification for invoice line extraction, document classification, image moderation, or support triage. The prompt and the catalog change. The posture does not.
              </p>
              <p className="text-[17px] leading-relaxed text-text-muted">
                That is most of what production AI work is. Not getting the model to perform on a demo. Getting the surrounding system to keep shipping when the model does not.
              </p>
            </div>
          </Container>
        </section>

        <section className="border-t border-border-subtle/60 py-20">
          <Container>
            <SectionLabel number="→">More from the lab</SectionLabel>
            <div className="mt-10 rounded-2xl border border-border bg-surface p-7 text-center sm:p-10 md:p-16">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-text md:text-5xl text-balance">
                Need an AI feature wired into a real product?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted">
                Vision, classification, extraction, agent workflows. I scope and ship them with the same posture: time-bounded, fallback-ready, never on the critical path.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact" variant="primary">
                  Book a call
                </Button>
                <Button href="/lab" variant="secondary">
                  Back to lab
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
