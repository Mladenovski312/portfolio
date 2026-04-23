import { cn } from "@/lib/cn";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        className,
      )}
      role="list"
      aria-label="Technology marquee"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"
      />
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap py-6 font-display text-2xl font-medium text-text-muted md:gap-16 md:text-3xl">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} role="listitem" className="flex items-center gap-10 md:gap-16">
            {item}
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent/60"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
