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
  cover?: { src: string; alt: string; width: number; height: number };
};

export const work: WorkItem[] = [
  // ========== HERO CASE STUDIES ==========
  {
    slug: "jumbo",
    name: "Jumbo / InterStar",
    client: "InterStar Jumbo",
    year: "2026",
    outcome: "Full e-commerce and ERP system. Storefront returning soon after a compliance update.",
    summary:
      "Next.js 16 + Supabase storefront with AI product scanning, a real-time POS, inventory, and admin analytics. Built end to end as a team of one. Public storefront temporarily scaled back; full system intact and being relaunched.",
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
    status: "in-progress",
    featured: true,
    hasCaseStudy: true,
    repoUrl: "https://github.com/Mladenovski312/smart-store-erp",
    metrics: [
      { label: "Surfaces", value: "Storefront · POS · Admin" },
      { label: "Security", value: "RLS + rate limiting" },
      { label: "AI", value: "Product scan & search" },
    ],
    cover: {
      src: "/media/jumbo/cover.png",
      alt: "Inventory dashboard for InterStar Jumbo with product cards and live revenue totals.",
      width: 1885,
      height: 807,
    },
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
    repoUrl: "https://github.com/Mladenovski312/johnson-matthey-pipeline",
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

  // ========== DATA & ANALYTICS ==========
  {
    slug: "powerbi-trip-activity",
    name: "Trip Activity Dashboard",
    client: "Trucking analytics",
    year: "2026",
    outcome: "PowerBI report over trucking trip and shipment data with driver, dispatcher, and state-level views.",
    summary:
      "Star-schema model with DAX measures for revenue, profit, and revenue-per-mile. Choropleth maps for pickup and delivery distribution by state, monthly and YoY trajectories, and a top-driver leaderboard.",
    stack: ["PowerBI", "DAX", "Star Schema", "Geo Maps"],
    category: "Data Engineering",
    status: "delivered",
    featured: false,
    hasCaseStudy: false,
    repoUrl: "https://github.com/Mladenovski312/powerbi-trip-activity",
  },
  {
    slug: "outlearn-engagement",
    name: "Outlearn Engagement Analytics",
    client: "Outlearn (Nu High School)",
    year: "2025",
    outcome: "PowerBI engagement dashboard for an EdTech platform, delivered in a 48-hour window. Letter of recommendation from the client.",
    summary:
      "Star-schema model with a dedicated Calendar dimension. DAX measures for trailing 7-day, 30-day, and YoY engagement. Surfaces course performance, professor and subject impact, and where the platform loses users.",
    stack: ["PowerBI", "DAX", "M Language", "Star Schema"],
    category: "Data Engineering",
    status: "delivered",
    featured: false,
    hasCaseStudy: false,
    repoUrl: "https://github.com/Mladenovski312/outlearn-analytics-dashboard",
  },
  {
    slug: "sql-dw-claims",
    name: "Claims Operations Warehouse",
    client: "Johnson Matthey",
    year: "2025",
    outcome: "SQL Server warehouse and stored-procedure toolkit for claims operations, with referential integrity and cascading deletes.",
    summary:
      "Normalized schema for the claims lifecycle plus four user-facing stored procedures: claim CRUD, detail CRUD, P/L tracking, and FK-safe cascading delete. Excel raw extracts loaded via T-SQL into a clean operational store.",
    stack: ["SQL Server", "T-SQL", "Stored Procedures", "ETL"],
    category: "Data Engineering",
    status: "delivered",
    featured: false,
    hasCaseStudy: false,
    repoUrl: "https://github.com/Mladenovski312/sql-dw-claims",
  },
  {
    slug: "tableau-adventureworks",
    name: "AdventureWorks Sales Story",
    client: "Tableau craft demo",
    year: "2025",
    outcome: "Tableau Public story over the AdventureWorks 2022 Sales schema, exercising LOD expressions, parameters, and cross-dashboard actions.",
    summary:
      "Seven-view story covering sales-team activity, monthly revenue trends, Top/Bottom-N products via parameter, currency flow, payment methods, customer-to-salesperson hierarchy, and LOD-driven monthly activations.",
    stack: ["Tableau", "LOD Expressions", "Parameters", "Calculated Fields"],
    category: "Data Engineering",
    status: "delivered",
    featured: false,
    hasCaseStudy: false,
    repoUrl: "https://github.com/Mladenovski312/tableau-adventureworks-story",
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
    url: "https://www.pickaxe.io",
    metrics: [
      { label: "Engagement", value: "330 hours, ongoing" },
      { label: "Focus", value: "Custom JS + data viz" },
      { label: "Model", value: "Client-owned CMS" },
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
    url: "https://www.allphins.com",
    metrics: [
      { label: "Audience", value: "Enterprise reinsurance" },
      { label: "CMS", value: "Multi-page content model" },
      { label: "Delivery", value: "5-star Upwork feedback" },
    ],
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
    url: "https://www.quantolatam.com",
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
    url: "https://knowly.com",
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
    url: "https://moveplnr.com",
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
  // Headline case studies for top of Work section
  return items.filter(
    (i) =>
      ["johnson-matthey", "competitive-intel"].includes(i.slug),
  );
}

export function inProgress(items: WorkItem[]) {
  return items.filter((i) => i.status === "in-progress");
}

export function frontendCards(items: WorkItem[]) {
  return items.filter((i) => i.category === "Frontend");
}

export function dataExtras(items: WorkItem[]) {
  const heroSlugs = new Set(heroItems(items).map((h) => h.slug));
  return items.filter(
    (i) => i.category === "Data Engineering" && !heroSlugs.has(i.slug),
  );
}
