import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { WorkItem } from "@/lib/work";
import { Chip } from "@/components/ui/Chip";

type Size = "lg" | "md" | "sm";

export function ProjectCard({
  item,
  size = "lg",
}: {
  item: WorkItem;
  size?: Size;
}) {
  const href = item.hasCaseStudy
    ? `/work/${item.slug}`
    : item.url ?? item.repoUrl ?? null;
  const isExternal = !!href && href.startsWith("http");
  const isInteractive = !!href;

  const body =
    size === "lg" ? (
      <LargeBody item={item} />
    ) : size === "md" ? (
      <MediumBody item={item} />
    ) : (
      <SmallBody item={item} />
    );

  const classes =
    "group relative block overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color] duration-300" +
    (isInteractive
      ? " hover:border-accent-border focus-visible:border-accent-border"
      : "");

  if (!isInteractive) {
    return <div className={classes}>{body}</div>;
  }

  if (isExternal) {
    return (
      <a
        href={href!}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href!} className={classes}>
      {body}
    </Link>
  );
}

function LargeBody({ item }: { item: WorkItem }) {
  return (
    <div className="grid md:grid-cols-[1.1fr_1fr]">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border-subtle bg-surface-2 md:aspect-auto md:border-b-0 md:border-r">
        <ProjectVisual item={item} />
        <HoverHighlight />
        <ShineSweep />
      </div>
      <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
        <div className="space-y-4">
          <TopMeta item={item} />
          <h3 className="font-display text-2xl font-semibold tracking-tight text-text md:text-3xl">
            {item.name}
          </h3>
          <p className="text-pretty text-[15px] leading-relaxed text-text-muted">
            {item.outcome}
          </p>
        </div>
        <div className="space-y-4">
          {item.metrics && (
            <dl className="grid grid-cols-1 gap-3 border-t border-border-subtle pt-4 sm:grid-cols-3">
              {item.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-subtle">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-sm text-text">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <StackChips stack={item.stack} max={6} />
          <CardFooter label="Read case study" />
        </div>
      </div>
    </div>
  );
}

function MediumBody({ item }: { item: WorkItem }) {
  return (
    <div className="flex flex-col">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border-subtle bg-surface-2">
        <ProjectVisual item={item} />
        <HoverHighlight />
        <ShineSweep />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div className="space-y-3">
          <TopMeta item={item} />
          <h3 className="font-display text-xl font-semibold tracking-tight text-text md:text-2xl">
            {item.name}
          </h3>
          <p className="text-[14px] leading-relaxed text-text-muted">
            {item.outcome}
          </p>
        </div>
        <div className="space-y-4">
          <StackChips stack={item.stack} max={4} />
          <CardFooter
            label={
              item.hasCaseStudy
                ? "Read case study"
                : item.url
                  ? "View live"
                  : item.repoUrl
                    ? "View on GitHub"
                    : ""
            }
          />
        </div>
      </div>
    </div>
  );
}

function SmallBody({ item }: { item: WorkItem }) {
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
        <span>{item.year}</span>
        <StatusDot status={item.status} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold tracking-tight text-text">
          {item.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
          {item.outcome}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {item.stack.slice(0, 3).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </div>
  );
}

function TopMeta({ item }: { item: WorkItem }) {
  return (
    <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
      <span>{item.category}</span>
      <div className="flex items-center gap-3">
        <StatusDot status={item.status} />
        <span>{item.year}</span>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: WorkItem["status"] }) {
  if (status === "in-progress") {
    return (
      <span className="flex items-center gap-1.5 text-accent">
        <Clock size={10} />
        In progress
      </span>
    );
  }
  if (status === "live") {
    return (
      <span className="flex items-center gap-1.5 text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Live
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-text-subtle">
      <span className="h-1.5 w-1.5 rounded-full bg-text-subtle" />
      Delivered
    </span>
  );
}

function StackChips({ stack, max }: { stack: string[]; max: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.slice(0, max).map((s) => (
        <Chip key={s}>{s}</Chip>
      ))}
      {stack.length > max && <Chip>+{stack.length - max}</Chip>}
    </div>
  );
}

function CardFooter({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-muted transition-colors group-hover:text-accent">
        {label}
      </span>
      <ArrowUpRight
        size={16}
        className="text-text-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </div>
  );
}

function HoverHighlight() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-soft/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  );
}

function ShineSweep() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
    >
      <div
        className="absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[350%]"
      />
    </div>
  );
}

function ProjectVisual({ item }: { item: WorkItem }) {
  if (item.status === "in-progress") {
    return (
      <div className="bg-grid absolute inset-0">
        <GlyphStealth />
      </div>
    );
  }
  if (item.cover) {
    return (
      <Image
        src={item.cover.src}
        alt={item.cover.alt}
        width={item.cover.width}
        height={item.cover.height}
        sizes="(min-width: 1152px) 600px, (min-width: 768px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
      />
    );
  }
  return <ProjectGlyph slug={item.slug} />;
}

function ProjectGlyph({ slug }: { slug: string }) {
  const glyphs: Record<string, React.ReactNode> = {
    jumbo: <GlyphGrid color="#5EEAD4" />,
    "johnson-matthey": <GlyphBars color="#34D399" />,
    "competitive-intel": <GlyphNodes color="#5EEAD4" />,
    pickaxe: <GlyphWave color="#FBBF24" />,
    allphins: <GlyphCircles color="#5EEAD4" />,
    "cfmoto-store": <GlyphStealth />,
    "powerbi-trip-activity": <GlyphBars color="#5EEAD4" />,
    "outlearn-engagement": <GlyphWave color="#5EEAD4" />,
    "sql-dw-claims": <GlyphNodes color="#34D399" />,
    "tableau-adventureworks": <GlyphCircles color="#34D399" />,
    quanto: <GlyphDiag color="#5EEAD4" />,
    knowly: <GlyphDiag color="#34D399" />,
    moveplnr: <GlyphDiag color="#FBBF24" />,
  };
  return (
    <div className="bg-grid absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
      {glyphs[slug] ?? null}
    </div>
  );
}

function GlyphGrid({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-90">
      <g fill="none" stroke={color} strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={i}
            x={20 + (i % 3) * 55}
            y={20 + Math.floor(i / 3) * 55}
            width="50"
            height="50"
            rx="6"
            opacity={0.15 + (i % 3) * 0.2}
          />
        ))}
      </g>
      <circle cx="157" cy="157" r="18" fill={color} opacity="0.8" />
    </svg>
  );
}

function GlyphBars({ color }: { color: string }) {
  const heights = [30, 60, 45, 90, 70, 110, 80, 140];
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 20}
          y={180 - h}
          width="10"
          height={h}
          rx="2"
          fill={color}
          opacity={0.35 + i * 0.08}
        />
      ))}
    </svg>
  );
}

function GlyphNodes({ color }: { color: string }) {
  const nodes = [
    [50, 60], [100, 40], [150, 70],
    [60, 120], [110, 110], [160, 130],
    [90, 170], [140, 160],
  ];
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <g stroke={color} strokeWidth="0.5" opacity="0.4">
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => {
            const d = Math.hypot(n[0] - m[0], n[1] - m[1]);
            if (d > 80) return null;
            return (
              <line key={`${i}-${j}`} x1={n[0]} y1={n[1]} x2={m[0]} y2={m[1]} />
            );
          }),
        )}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={color} opacity={0.8} />
      ))}
    </svg>
  );
}

function GlyphWave({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d={`M 0 ${80 + i * 15} Q 50 ${60 + i * 15} 100 ${80 + i * 15} T 200 ${80 + i * 15}`}
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity={0.5 - i * 0.08}
        />
      ))}
    </svg>
  );
}

function GlyphCircles({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      {[70, 50, 30, 10].map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.2 + i * 0.2}
        />
      ))}
    </svg>
  );
}

function GlyphDiag({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1={-20 + i * 30}
          y1="220"
          x2={100 + i * 30}
          y2="0"
          stroke={color}
          strokeWidth="1"
          opacity={0.1 + (i % 3) * 0.15}
        />
      ))}
    </svg>
  );
}

function GlyphStealth() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern
          id="stealth-pattern"
          x="0"
          y="0"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.8" fill="#5EEAD4" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#stealth-pattern)" />
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="2"
        fill="#5EEAD4"
      >
        IN BUILD
      </text>
    </svg>
  );
}
