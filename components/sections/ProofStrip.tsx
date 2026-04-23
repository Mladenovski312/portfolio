import { Marquee } from "@/components/ui/Marquee";

const items = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Python",
  "Google Vertex AI",
  "Gemini",
  "MCP",
  "AWS",
  "n8n",
  "Make",
  "Playwright",
  "Claude Code",
];

export function ProofStrip() {
  return (
    <section
      aria-label="Tools and platforms"
      className="border-b border-border-subtle/60"
    >
      <Marquee items={items} />
    </section>
  );
}
