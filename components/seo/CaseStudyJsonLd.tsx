import { site } from "@/lib/site";
import type { WorkItem } from "@/lib/work";

export function CaseStudyJsonLd({ item }: { item: WorkItem }) {
  const imageUrl = item.cover?.src
    ? `${site.url}${item.cover.src}`
    : `${site.url}/opengraph-image`;

  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${item.name}: ${item.outcome}`,
    description: item.summary,
    url: `${site.url}/work/${item.slug}`,
    inLanguage: "en",
    datePublished: `${item.year}-01-01`,
    dateModified: new Date().toISOString().slice(0, 10),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    image: imageUrl,
    keywords: item.stack.join(", "),
    about: item.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/work/${item.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
