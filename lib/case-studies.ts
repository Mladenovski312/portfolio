export type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "callout"; title: string; body: string }
  | { kind: "architecture"; items: { layer: string; tech: string[] }[] }
  | { kind: "snippet"; code: string; language?: string; filename?: string };

export type CaseStudy = {
  context: string;
  timeline: string;
  role: string;
  blocks: Block[];
};

export const caseStudies: Record<string, CaseStudy> = {
  jumbo: {
    context:
      "InterStar Jumbo is a retail toy chain. Before this build, the business lived across spreadsheets, a manual cash register, and no online presence. They needed a single system.",
    timeline: "12 weeks, solo",
    role: "Design, architecture, full implementation, deployment",
    blocks: [
      { kind: "h2", text: "What I built" },
      {
        kind: "bullets",
        items: [
          "A customer-facing storefront (Next.js 16, App Router) with product catalog, search, cart, checkout.",
          "A cashier-facing POS surface with barcode input, stock validation, and receipts.",
          "An admin dashboard covering orders, stock, customers, and analytics powered by Recharts.",
          "An AI product scanner that identifies items from an uploaded photo using Google Gemini.",
          "A unified Supabase backend with Postgres, Auth, and Storage.",
        ],
      },
      { kind: "h2", text: "Architecture" },
      {
        kind: "architecture",
        items: [
          { layer: "Frontend", tech: ["Next.js 16", "React 19", "Tailwind v4", "Recharts"] },
          { layer: "Backend", tech: ["Supabase", "PostgreSQL", "Row-Level Security", "Rate limiting"] },
          { layer: "AI", tech: ["Gemini 2.5 Flash", "Vision input", "Structured output"] },
          { layer: "Ops", tech: ["Vercel deploy", "Sentry error tracking", "Edge caching"] },
        ],
      },
      { kind: "h2", text: "Interesting decisions" },
      {
        kind: "callout",
        title: "Atomic stock transactions",
        body:
          "Under concurrent purchases, naive stock decrement creates double-sells. All POS and storefront writes go through a Postgres function that locks, checks, decrements, and records in one transaction. No overselling, no drift.",
      },
      {
        kind: "snippet",
        language: "SQL",
        filename: "supabase/functions/decrement_stock.sql",
        code: `create or replace function decrement_stock(
  p_product_id uuid,
  p_quantity int,
  p_order_id uuid
) returns void
language plpgsql
security definer
as $$
declare
  v_available int;
begin
  select quantity into v_available
  from product_stock
  where product_id = p_product_id
  for update;

  if v_available is null then
    raise exception 'product_not_found';
  end if;

  if v_available < p_quantity then
    raise exception 'insufficient_stock' using errcode = 'P0001';
  end if;

  update product_stock
  set quantity = quantity - p_quantity
  where product_id = p_product_id;

  insert into stock_movements (product_id, order_id, delta, reason)
  values (p_product_id, p_order_id, -p_quantity, 'sale');
end;
$$;`,
      },
      {
        kind: "callout",
        title: "Cyrillic ↔ Latin search transliteration",
        body:
          "Macedonian customers search in Cyrillic. Product names are stored Latin-primary. Search normalizes both ways at query time so either script finds the right product, without duplicating the catalog.",
      },
      {
        kind: "callout",
        title: "AI scan as progressive enhancement",
        body:
          "Scan is a convenience, not a dependency. The cashier can always fall back to barcode or manual search. Gemini calls are rate-limited per user and the scan UX degrades gracefully if the model returns low confidence.",
      },
      {
        kind: "snippet",
        language: "TypeScript",
        filename: "lib/ai/scan-product.ts",
        code: `import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function scanProduct(imageBase64: string) {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{
      role: "user",
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
        { text: "Identify this retail product. Return brand, name, size." },
      ],
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brand: { type: Type.STRING },
          name: { type: Type.STRING },
          size: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
        },
        required: ["name", "confidence"],
      },
    },
  });

  const parsed = JSON.parse(res.text ?? "{}");
  if (parsed.confidence < 0.6) return { match: null, raw: parsed };
  return { match: parsed, raw: parsed };
}`,
      },
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "Production at interstarjumbo.com. The admin runs the business from it daily, the POS clears a transaction under 300ms on the shop floor, and the catalog is managed entirely in-house without an agency retainer.",
      },
    ],
  },

  "johnson-matthey": {
    context:
      "A lab operations team was exporting CSVs and emailing spreadsheets. Analysts reinvented the same queries every week. The business wanted a single, always-current picture.",
    timeline: "Delivered as a team data project, 2025",
    role: "Infrastructure, ingestion pipeline, analysis, deployment",
    blocks: [
      { kind: "h2", text: "What I built" },
      {
        kind: "bullets",
        items: [
          "A Python ingestion pipeline that pulls lab data from Google Sheets daily.",
          "An AWS EC2 deployment running on Amazon Linux, SSH-secured, Git-managed.",
          "Exploratory analysis across 310k+ samples answering 20 standing business questions.",
          "A cron-scheduled refresh so downstream dashboards never lag more than 24 hours.",
          "Team-accessible docs covering the setup, credentials model, and recovery.",
        ],
      },
      { kind: "h2", text: "Architecture" },
      {
        kind: "architecture",
        items: [
          { layer: "Ingestion", tech: ["Python", "gspread", "Google Sheets API", "Drive API"] },
          { layer: "Compute", tech: ["AWS EC2 (t3)", "Amazon Linux", "venv", "cron"] },
          { layer: "Analysis", tech: ["pandas", "numpy", "matplotlib", "seaborn"] },
          { layer: "Ops", tech: ["SSH", "Git", "systemd unit", "log rotation"] },
        ],
      },
      { kind: "h2", text: "Interesting decisions" },
      {
        kind: "callout",
        title: "EC2 over serverless",
        body:
          "The refresh runs long-form pandas code over hundreds of thousands of rows. Cold-start latency on a typical serverless function would dominate. A small always-on EC2 instance is cheaper, predictable, and owns its state.",
      },
      {
        kind: "callout",
        title: "Cron over an orchestrator",
        body:
          "Airflow or Prefect would be overkill for one daily job. Cron plus structured logging keeps the stack small enough for a single engineer to own. If this ever grows to dozens of jobs, the swap is clean.",
      },
      {
        kind: "snippet",
        language: "Python",
        filename: "ingest/pull_samples.py",
        code: `import os
import gspread
import pandas as pd
from google.oauth2.service_account import Credentials
from tenacity import retry, stop_after_attempt, wait_exponential

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

@retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=2, max=60))
def fetch_sheet(sheet_id: str, tab: str) -> list[dict]:
    creds = Credentials.from_service_account_file(
        "/opt/jm/credentials.json", scopes=SCOPES
    )
    client = gspread.authorize(creds)
    ws = client.open_by_key(sheet_id).worksheet(tab)
    return ws.get_all_records()

if __name__ == "__main__":
    rows = fetch_sheet(os.environ["SHEET_ID"], "Samples")
    df = pd.DataFrame(rows)
    df.to_parquet("/var/data/samples.parquet", index=False)
    print(f"ingested {len(df):,} rows")`,
      },
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "Data that used to take a full day to compile is ready by 6am every morning. The analyst team reclaimed several hours per week and the leadership reports pull from a single, trusted source.",
      },
    ],
  },

  "competitive-intel": {
    context:
      "Competitive research is the kind of work that is always urgent, always expensive, and always already out of date by the time it lands. I wanted a repeatable system a team could run in under 15 minutes.",
    timeline: "Delivered 2025, internal tool",
    role: "Agent design, prompt engineering, Notion integration, docs",
    blocks: [
      { kind: "h2", text: "What I built" },
      {
        kind: "bullets",
        items: [
          "A Python agent that accepts a list of competitor names and a research brief.",
          "Structured multi-step prompting against Google Vertex AI with grounded web search.",
          "Notion integration that writes 50+ structured fields per competitor directly into a team database.",
          "Async execution so 20 competitors complete in parallel.",
          "Retry and backoff logic so partial network failures do not lose a run.",
          "A README, requirements.txt, and config template for anyone else to run it.",
        ],
      },
      { kind: "h2", text: "Architecture" },
      {
        kind: "architecture",
        items: [
          { layer: "Model layer", tech: ["Vertex AI", "google-genai", "Gemini 2.5 Flash"] },
          { layer: "Orchestration", tech: ["Python asyncio", "tenacity retries"] },
          { layer: "Storage", tech: ["Notion API", "Structured properties schema"] },
          { layer: "Dev", tech: ["Jupyter", "python-dotenv", "pytest sanity checks"] },
        ],
      },
      { kind: "h2", text: "Interesting decisions" },
      {
        kind: "callout",
        title: "Structured output over free-form",
        body:
          "The agent forces structured JSON output per competitor. That is what lets the Notion sync stay honest and queryable. Free-form text would have been easier to prompt and useless to consume.",
      },
      {
        kind: "snippet",
        language: "Python",
        filename: "agents/research.py",
        code: `import asyncio, json
from google import genai
from google.genai import types
from tenacity import retry, stop_after_attempt, wait_exponential

client = genai.Client(vertexai=True, project=PROJECT, location="us-central1")

@retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, max=30))
async def research_competitor(name: str, brief: str) -> dict:
    res = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"Competitor: {name}\\nBrief: {brief}",
        config=types.GenerateContentConfig(
            tools=[types.Tool(google_search=types.GoogleSearch())],
            response_mime_type="application/json",
            response_schema=COMPETITOR_SCHEMA,
        ),
    )
    return json.loads(res.text)

async def run(names: list[str], brief: str) -> list[dict]:
    results = await asyncio.gather(
        *(research_competitor(n, brief) for n in names),
        return_exceptions=True,
    )
    return [r for r in results if not isinstance(r, Exception)]`,
      },
      {
        kind: "callout",
        title: "Notion as the UI",
        body:
          "Teams already live in Notion. Building a custom UI would have slowed adoption. Writing straight into their existing database meant the tool paid off on day one.",
      },
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "What was a multi-day research exercise is now a 5–15 minute run. Output is more consistent than the human version and can be reproduced whenever the landscape shifts.",
      },
    ],
  },

  pickaxe: {
    context:
      "PickAxe is a crypto mining operation. Their site had to convert visitors with live data, not just copy. Static numbers would have undermined the pitch.",
    timeline: "$8k, 330 hours, ongoing maintenance",
    role: "Development, animations, data integration, maintenance",
    blocks: [
      { kind: "h2", text: "What I built" },
      {
        kind: "bullets",
          items: [
          "A custom JavaScript mining profit calculator with live network hashrate and BTC price inputs.",
          "GSAP-driven hover interactions and section reveals tuned for the dark brand.",
          "A Webflow CMS structure the team can update without calling a developer.",
          "Responsive parity from 375px to 2560px.",
          "Ongoing maintenance engagements across new sections and partnership pages.",
        ],
      },
      { kind: "h2", text: "Interesting decisions" },
      {
        kind: "callout",
        title: "Vanilla JS for the calculator",
        body:
          "A framework here would have meant a bigger bundle and slower first paint on a content-heavy marketing page. Vanilla JS is small, fast, and easy to hand off.",
      },
      {
        kind: "snippet",
        language: "JavaScript",
        filename: "js/mining-calculator.js",
        code: `const SECONDS_PER_DAY = 86_400;
const BLOCK_TIME = 600;
const BLOCK_REWARD = 3.125;

async function loadNetwork() {
  const [hashRes, priceRes] = await Promise.all([
    fetch("/api/network/hashrate"),
    fetch("/api/price/btc"),
  ]);
  return {
    networkHashrate: (await hashRes.json()).value,
    btcUsd: (await priceRes.json()).usd,
  };
}

function dailyProfit({ rigHashrate, powerKw, electricityRate }, net) {
  const blocksPerDay = SECONDS_PER_DAY / BLOCK_TIME;
  const share = rigHashrate / (net.networkHashrate * 1e6);
  const btc = share * blocksPerDay * BLOCK_REWARD;
  const revenue = btc * net.btcUsd;
  const cost = powerKw * 24 * electricityRate;
  return { btc, revenue, cost, net: revenue - cost };
}

loadNetwork().then((net) => {
  document.querySelector("[data-calc]").addEventListener("input", (e) => {
    const form = new FormData(e.currentTarget.closest("form"));
    const out = dailyProfit({
      rigHashrate: +form.get("hashrate"),
      powerKw: +form.get("power"),
      electricityRate: +form.get("rate"),
    }, net);
    render(out);
  });
});`,
      },
      {
        kind: "callout",
        title: "Webflow for the content layer",
        body:
          "The team needed to own edits. Webflow CMS earns its keep here: non-technical updates ship without a deploy and without me.",
      },
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "Largest single Upwork engagement to date, long-running, and still maintained. The calculator remains a primary conversion surface for the business.",
      },
    ],
  },

  allphins: {
    context:
      "Allphins sells reinsurance analytics to C-level buyers. The site has to carry real product complexity without losing the polish that audience expects.",
    timeline: "Delivered 2024, 5-star Upwork feedback",
    role: "Development, CMS architecture, custom animations",
    blocks: [
      { kind: "h2", text: "What I built" },
      {
        kind: "bullets",
        items: [
          "A multi-page Webflow marketing site built around the client's Lines-of-Business content model.",
          "Custom scroll and hover interactions tuned in tight iteration with the client.",
          "A CMS mapped to business objects the team already used, not abstract \"collections.\"",
          "Testimonial rotations that carry weight without distracting from the product copy.",
        ],
      },
      { kind: "h2", text: "Interesting decisions" },
      {
        kind: "callout",
        title: "Client-First naming",
        body:
          "A site at this scale lives or dies by class-naming discipline. Sticking to Client-First meant any frontend engineer joining later could navigate the codebase on their first afternoon.",
      },
      {
        kind: "callout",
        title: "Hand-written animations",
        body:
          "Plugin-driven motion feels the same across every site that uses it. Hand-written interactions let the brand feel distinct without crossing into gimmick territory.",
      },
      {
        kind: "snippet",
        language: "JavaScript",
        filename: "js/reveal.js",
        code: `import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll("[data-reveal]").forEach((el) => {
  const delay = Number(el.dataset.revealDelay ?? 0);
  gsap.from(el, {
    y: 24,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
  });
});

if (prefersReduced.matches) {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.set("[data-reveal]", { clearProps: "all" });
}`,
      },
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "The content team edits the site without calling back. The animations held up through multiple design reviews with the C-suite and shipped as-designed.",
      },
    ],
  },
};
