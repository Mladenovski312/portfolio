export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "Are you writing the code yourself, or is AI doing it?",
    answer:
      "Both, deliberately. I architect the system, set the constraints, and review every change. Claude Code and Codex handle most of the typing under that direction. That separation is where the speed comes from. I still write the load-bearing parts by hand: data models, security boundaries, anything where nuance matters more than throughput.",
  },
  {
    question: "How long have you been working with LLMs?",
    answer:
      "Since 2022, four years. Started with GPT-3.5 wrappers, moved through Claude 2 and 3, then into agentic work, MCP, multi-tool orchestration, and self-hosted runtimes. The NEXUS rig in the Lab is one of those, a personal agent fleet I own end to end.",
  },
  {
    question: "Why is this faster and cheaper than an agency?",
    answer:
      "One head from discovery to deploy means no handoff overhead. AI-assisted execution under senior-engineer oversight compresses the implementation half. Together that lands at roughly half the timeline and cost of an agency on the same scope. The trade-off is bandwidth: I take a small number of engagements at once, not a full pipeline.",
  },
  {
    question: "Do I need a custom AI agent, or is simpler automation enough?",
    answer:
      "Probably simpler than you think. Fixed-step workflows fit a script or n8n flow. Tasks that need judgment, research, or messy unstructured data justify an agent. Common candidates either way: lead enrichment, document extraction, reporting, support triage, spreadsheet cleanup. The first call filters what shape the build should take.",
  },
  {
    question: "How long does a build usually take?",
    answer:
      "A narrow prototype lands in days. A production workflow in a few weeks. A full-stack product with auth, admin, payments, AI features, and deployment is usually 6 to 10 weeks with AI-assisted delivery, against 12 to 16 in a traditional team. Estimates harden after the first scoping call.",
  },
  {
    question: "How do you keep AI agents safe with private business data?",
    answer:
      "I treat an agent like a junior operator with limited permissions. It gets only the tools and data it needs, scoped credentials, audit logs on important actions, human approval where risk is high, and fallback paths when model confidence is low.",
  },
  {
    question: "Can you fix a messy spreadsheet or manual reporting process?",
    answer:
      "Yes. Manual reporting often becomes a scheduled Python pipeline, a database-backed dashboard, or an internal admin surface. The right shape depends on data volume, who owns the process, and how often the report has to refresh.",
  },
  {
    question: "Why hire a solo AI engineer instead of an agency?",
    answer:
      "Speed and accountability. Discovery, architecture, implementation, and QA stay in one head. Fewer meetings, tighter scope, direct ownership of the shipped system. With AI-assisted execution under senior oversight, the output is comparable to a small team at a fraction of the cost.",
  },
];
