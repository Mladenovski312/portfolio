import { site } from "@/lib/site";

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.title,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
