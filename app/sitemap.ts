import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/lab/nexus`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/lab/jumbo-scanner`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = work
    .filter((w) => w.hasCaseStudy)
    .map((w) => ({
      url: `${site.url}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...caseStudyRoutes];
}
