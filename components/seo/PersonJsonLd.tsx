import { site } from "@/lib/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "AI Engineer & Full-Stack Builder",
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.addressLocality,
      addressCountry: site.addressCountry,
    },
    sameAs: [
      site.links.github,
      site.links.linkedin,
      site.links.upwork,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Business inquiries",
      email: site.email,
      availableLanguage: ["en", "mk"],
      areaServed: "Worldwide",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "AI agents",
      "Claude Code",
      "Google Gemini",
      "AWS",
      "Python",
      "Data pipelines",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
