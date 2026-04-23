export type Category =
  | "Full-stack"
  | "AI & Automation"
  | "Data Engineering"
  | "Frontend";

export type Status = "live" | "in-progress" | "delivered";

export type WorkItem = {
  slug: string;
  name: string;
  client: string;
  year: string;
  outcome: string;
  summary: string;
  stack: string[];
  category: Category;
  status: Status;
  featured: boolean;
  hasCaseStudy: boolean;
  url?: string;
  repoUrl?: string;
  metrics?: { label: string; value: string }[];
};

export const work: WorkItem[] = [
  // ========== HERO CASE STUDIES ==========
  {
    slug: "jumbo",
    name: "Jumbo / InterStar",
    client: "InterStar Jumbo",
    year: "2025",
    outcome: "Full-stack e-commerce and ERP shipped as a team of one.",
    summary:
      "Next.js 16 + Supabase storefront with AI product scanning, a real-time POS, inventory, and admin analytics. Production at interstarjumbo.com.",
    stack: [
      "Next.js 16",
      "React 19",
      "Supabase",
      "PostgreSQL",
      "Gemini AI",
      "Tailwind v4",
      "Recharts",
      "Sentry",
    ],
    category: "Full-stack",
    status: "live",
    featured: true,
    hasCaseStudy: true,
    url: "https://interstarjumbo.com",
    metrics: [
      { label: "Surfaces", value: "Storefront · POS · Admin" },
      { label: "Security", value: "RLS + rate limiting" },
      { label: "AI", value: "Product scan & search" },
    ],
  },
  {
    slug: "johnson-matthey",
    name: "Lab Data Pipeline",
    client: "Johnson Matthey",
    year: "2025",
    outcome: "Manual lab operations replaced with a self-updating cloud pipeline.",
    summary:
      "Python ingestion on AWS EC2 with Google Sheets/Drive APIs and cron scheduling. Analysis across 310k+ samples answered 20 business questions.",
    stack: [
      "Python",
      "AWS EC2",
      "Google Sheets API",
      "gspread",
      "pandas",
      "cron",
      "Git",
    ],
    category: "Data Engineering",
    status: "delivered",
    featured: true,
    hasCaseStudy: true,
    metrics: [
      { label: "Samples", value: "310k+" },
      { label: "Schedule", value: "Daily cron ingest" },
      { label: "Deploy", value: "AWS EC2" },
    ],
  },
  {
    slug: "competitive-intel",
    name: "Competitive Intelligence Agent",
    client: "Internal / open",
    year: "2025",
    outcome: "An AI agent that runs weeks of market research in minutes.",
    summary:
      "Python + Vertex AI pipeline that researches 10–20 competitors and writes structured results straight into Notion. Async, retry-safe, production-shaped.",
    stack: [
      "Python",
      "Vertex AI",
      "google-genai",
      "Notion API",
      "asyncio",
      "tenacity",
    ],
    category: "AI & Automation",
    status: "delivered",
    featured: true,
    hasCaseStudy: true,
    metrics: [
      { label: "Research", value: "5–15 min / 20 competitors" },
      { label: "Output", value: "Auto-synced Notion DB" },
      { label: "Reliability", value: "Async + retry" },
    ],
  },

  // ========== IN PROGRESS ==========
  {
    slug: "cfmoto-store",
    name: "CF Moto Store Center",
    client: "Official CF Moto distributor",
    year: "2026",
    outcome:
      "Full-stack store platform for the official regional CF Moto distributor.",
    summary:
      "Next.js storefront, inventory, and dealer-facing flows for the official CF Moto distributor. Built with Claude Code, shipping in the current engagement window.",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude Code"],
    category: "Full-stack",
    status: "in-progress",
    featured: false,
    hasCaseStudy: false,
  },

  // ========== FRONTEND / CLIENT WEB ==========
  {
    slug: "pickaxe",
    name: "PickAxe",
    client: "PickAxe Mining",
    year: "2025",
    outcome: "Data-heavy client site with a custom interactive profit calculator.",
    summary:
      "Webflow build with custom JavaScript mining calculator, live hashrate and price feeds, and GSAP interactions. Largest Upwork engagement to date.",
    stack: ["Webflow", "JavaScript", "GSAP", "REST APIs"],
    category: "Frontend",
    status: "live",
    featured: true,
    hasCaseStudy: true,
    metrics: [
      { label: "Engagement", value: "$8k / 330 hours" },
      { label: "Focus", value: "Custom JS + data viz" },
    ],
  },
  {
    slug: "allphins",
    name: "Allphins",
    client: "Allphins",
    year: "2024",
    outcome: "B2B reinsurance analytics site with deep CMS and motion polish.",
    summary:
      "Multi-page Webflow CMS with lines-of-business content model, custom hover and scroll interactions, and content workflows the team maintains itself.",
    stack: ["Webflow", "CMS", "Custom JS", "Animations"],
    category: "Frontend",
    status: "live",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "quanto",
    name: "Quanto",
    client: "Quanto",
    year: "2025",
    outcome: "Home, landing, and changelog CMS with email integration.",
    summary:
      "Figma to Webflow build, CMS-driven changelog, mailbox-integrated forms, responsive across media queries.",
    stack: ["Webflow", "CMS", "Forms"],
    category: "Frontend",
    status: "live",
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "knowly",
    name: "Knowly",
    client: "Knowly",
    year: "2024",
    outcome: "CMS blog with multi-language localization and rich media.",
    summary:
      "Webflow CMS localization pipeline, rich text blog posts, date backfill, video embeds, image management.",
    stack: ["Webflow", "CMS", "Localization"],
    category: "Frontend",
    status: "live",
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "moveplnr",
    name: "MovePlnr",
    client: "MovePlnr",
    year: "2024",
    outcome: "SEO, responsiveness, and interaction pass on a marketing site.",
    summary:
      "Responsiveness across breakpoints, Google Search Console fixes, blog optimization, custom interaction touches.",
    stack: ["Webflow", "SEO", "Interactions"],
    category: "Frontend",
    status: "live",
    featured: false,
    hasCaseStudy: false,
  },
];

// Smaller shipped projects shown as a simple list
export const alsoShipped = [
  "Aktiva Aktuel",
  "Evan Outreacher",
  "YourExpertly",
  "Easy Money University",
  "Design Fantasy",
  "Austin Pallet Removal",
  "CA Private · Karl Gustafs",
  "RDPOOLS",
  "BIRDLEAD",
  "Pizza Spot",
];

// Helpers
export const CATEGORY_ORDER: Category[] = [
  "Full-stack",
  "AI & Automation",
  "Data Engineering",
  "Frontend",
];

export function byCategory(items: WorkItem[]) {
  const map = new Map<Category, WorkItem[]>();
  for (const c of CATEGORY_ORDER) map.set(c, []);
  for (const item of items) {
    map.get(item.category)!.push(item);
  }
  return map;
}

export function featuredItems(items: WorkItem[]) {
  return items.filter(
    (i) => i.featured && i.status !== "in-progress" && i.hasCaseStudy,
  );
}

export function heroItems(items: WorkItem[]) {
  // 3 headline case studies for top of Work section
  return items.filter(
    (i) =>
      ["jumbo", "johnson-matthey", "competitive-intel"].includes(i.slug),
  );
}

export function inProgress(items: WorkItem[]) {
  return items.filter((i) => i.status === "in-progress");
}

export function frontendCards(items: WorkItem[]) {
  return items.filter((i) => i.category === "Frontend");
}
