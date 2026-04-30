export type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "callout"; title: string; body: string }
  | { kind: "architecture"; items: { layer: string; tech: string[] }[] }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    };

export type CaseStudyCover = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  context: string;
  timeline: string;
  role: string;
  cover?: CaseStudyCover;
  blocks: Block[];
};

export const caseStudies: Record<string, CaseStudy> = {
  jumbo: {
    context:
      "InterStar Jumbo is a retail toy chain. Before this build, the business lived across spreadsheets, a manual cash register, and no online presence. They needed a single system.",
    timeline: "12 weeks, solo",
    role: "Design, architecture, full implementation, deployment",
    cover: {
      src: "/media/jumbo/cover.png",
      alt: "Inventory dashboard for InterStar Jumbo with product cards, stock counts, and live revenue totals in MKD.",
      width: 1885,
      height: 807,
    },
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
      {
        kind: "image",
        src: "/media/jumbo/ai-scan.png",
        alt: "New-item form with a photo upload area for AI product recognition, plus name, category, description, cost, price, and quantity fields.",
        width: 1877,
        height: 800,
        caption: "Adding a new article: photo-based recognition with manual fallback.",
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
        kind: "image",
        src: "/media/jumbo/analytics.png",
        alt: "Analytics screen with order count, processing/delivered/cancelled status cards, daily orders + revenue chart, and an order-status donut.",
        width: 1873,
        height: 861,
        caption: "Operational analytics: orders, revenue, status mix, all from a single source of truth.",
      },
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "Shipped end to end as a team of one. The POS clears a transaction under 300ms on the shop floor, inventory and admin analytics run from a single source of truth, and the catalog is managed in-house without an agency retainer.",
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
    timeline: "330 hours, ongoing maintenance",
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
      { kind: "h2", text: "Architecture" },
      {
        kind: "architecture",
        items: [
          { layer: "Site layer", tech: ["Webflow", "CMS", "Responsive breakpoints"] },
          { layer: "Interaction", tech: ["JavaScript", "GSAP", "Input-driven UI"] },
          { layer: "Data", tech: ["BTC price feed", "Network hashrate feed", "Calculator state"] },
          { layer: "Ops", tech: ["Client-owned CMS", "Maintenance retainer"] },
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
      { kind: "h2", text: "Architecture" },
      {
        kind: "architecture",
        items: [
          { layer: "CMS", tech: ["Webflow CMS", "Lines-of-Business model", "Reusable templates"] },
          { layer: "Frontend", tech: ["Client-First classes", "Custom JS", "Responsive QA"] },
          { layer: "Motion", tech: ["Hand-written interactions", "Scroll reveals", "Reduced-motion fallback"] },
          { layer: "Handoff", tech: ["Editor-safe content", "Team-owned updates"] },
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
      { kind: "h2", text: "Result" },
      {
        kind: "p",
        text: "The content team edits the site without calling back. The animations held up through multiple design reviews with the C-suite and shipped as-designed.",
      },
    ],
  },
};
