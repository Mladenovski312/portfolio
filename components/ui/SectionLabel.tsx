export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
      <span className="text-accent">{number}</span>
      <span>{children}</span>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
      />
    </div>
  );
}
