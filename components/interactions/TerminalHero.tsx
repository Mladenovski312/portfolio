"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Tone = "muted" | "accent" | "default";

type DisplayLine =
  | { kind: "prompt"; cmd: string }
  | { kind: "output"; text: string; tone?: Tone };

type Step =
  | { kind: "type"; text: string }
  | { kind: "output"; lines: { text: string; tone?: Tone }[] }
  | { kind: "wait"; ms: number }
  | { kind: "clear" };

const PROMPT = "~/portfolio $";

const HEX = "0123456789abcdef";
function randomHash(len = 7): string {
  let out = "";
  for (let i = 0; i < len; i++) out += HEX[Math.floor(Math.random() * 16)];
  return out;
}
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildSequence(): Step[] {
  const fromHash = randomHash();
  const toHash = randomHash();
  const totalObjects = randomBetween(9, 24);
  const writtenObjects = randomBetween(4, totalObjects - 2);
  const kib = (randomBetween(14, 48) / 10).toFixed(1);
  const readyMs = randomBetween(412, 624);

  return [
    { kind: "wait", ms: 700 },
    { kind: "type", text: "git status" },
    { kind: "wait", ms: 280 },
    {
      kind: "output",
      lines: [
        { text: "On branch main", tone: "muted" },
        { text: "nothing to commit, working tree clean", tone: "muted" },
      ],
    },
    { kind: "wait", ms: 850 },
    { kind: "type", text: "npm run dev" },
    { kind: "wait", ms: 320 },
    {
      kind: "output",
      lines: [
        { text: "▲ Next.js 16.2.4 (Turbopack)", tone: "muted" },
        { text: "  Local:    http://localhost:3000", tone: "muted" },
        { text: `✓ Ready in ${readyMs}ms`, tone: "accent" },
      ],
    },
    { kind: "wait", ms: 1100 },
    { kind: "type", text: "git push origin main" },
    { kind: "wait", ms: 320 },
    {
      kind: "output",
      lines: [
        { text: `Enumerating objects: ${totalObjects}, done.`, tone: "muted" },
        {
          text: `Writing objects: 100% (${writtenObjects}/${writtenObjects}), ${kib} KiB`,
          tone: "muted",
        },
        { text: "To github.com:filip/portfolio.git", tone: "muted" },
        { text: `   ${fromHash}..${toHash}  main -> main`, tone: "accent" },
      ],
    },
    { kind: "wait", ms: 1600 },
    { kind: "clear" },
  ];
}

const CHAR_MS = 35;
const OUTPUT_LINE_MS = 90;
const INITIAL: DisplayLine[] = [{ kind: "prompt", cmd: "" }];

export function TerminalHero({ className }: { className?: string }) {
  const [display, setDisplay] = useState<DisplayLine[]>(INITIAL);
  const [animating, setAnimating] = useState(false);
  const stepRef = useRef(0);
  const subRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const sequenceRef = useRef<Step[]>(buildSequence());

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      timerRef.current = window.setTimeout(() => {
        setDisplay([
          { kind: "prompt", cmd: "git status" },
          { kind: "output", text: "On branch main", tone: "muted" },
          {
            kind: "output",
            text: "nothing to commit, working tree clean",
            tone: "muted",
          },
          { kind: "prompt", cmd: "" },
        ]);
      }, 0);
      return;
    }

    timerRef.current = window.setTimeout(() => setAnimating(true), 0);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!animating) return;

    const tick = () => {
      const seq = sequenceRef.current;
      const stepIdx = stepRef.current % seq.length;
      const step = seq[stepIdx];

      const advance = (delay: number) => {
        timerRef.current = window.setTimeout(() => {
          stepRef.current = stepRef.current + 1;
          subRef.current = 0;
          tick();
        }, delay);
      };

      if (step.kind === "wait") {
        advance(step.ms);
        return;
      }

      if (step.kind === "clear") {
        setDisplay(INITIAL);
        sequenceRef.current = buildSequence();
        stepRef.current = -1;
        advance(120);
        return;
      }

      if (step.kind === "type") {
        if (subRef.current === 0) {
          setDisplay((d) => {
            const last = d[d.length - 1];
            if (last && last.kind === "prompt" && last.cmd === "") return d;
            return [...d, { kind: "prompt", cmd: "" }];
          });
        }

        if (subRef.current >= step.text.length) {
          advance(0);
          return;
        }

        subRef.current += 1;
        const partial = step.text.slice(0, subRef.current);
        setDisplay((d) => {
          const next = [...d];
          const last = next[next.length - 1];
          if (last && last.kind === "prompt") {
            next[next.length - 1] = { kind: "prompt", cmd: partial };
          }
          return next;
        });

        timerRef.current = window.setTimeout(tick, CHAR_MS);
        return;
      }

      if (step.kind === "output") {
        if (subRef.current >= step.lines.length) {
          setDisplay((d) => {
            const last = d[d.length - 1];
            if (last && last.kind === "prompt" && last.cmd === "") return d;
            return [...d, { kind: "prompt", cmd: "" }];
          });
          advance(0);
          return;
        }

        const line = step.lines[subRef.current];
        subRef.current += 1;
        setDisplay((d) => [
          ...d,
          { kind: "output", text: line.text, tone: line.tone },
        ]);

        timerRef.current = window.setTimeout(tick, OUTPUT_LINE_MS);
        return;
      }
    };

    tick();
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [animating]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-surface text-left font-mono text-[13px] leading-relaxed text-text-muted shadow-[0_18px_44px_-22px_rgba(94,234,212,0.1)]",
        className,
      )}
      aria-label="Terminal session demo"
    >
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-[12px] text-text-subtle">
          zsh - ~/portfolio
        </span>
        <span className="text-[11px] text-text-subtle">$</span>
      </div>

      <div className="h-[340px] space-y-1 overflow-hidden px-5 py-5">
        {display.map((line, i) => {
          const isLast = i === display.length - 1;
          const showCursor = isLast && line.kind === "prompt";

          if (line.kind === "prompt") {
            return (
              <div key={i} className="flex items-center gap-2 text-text">
                <span className="text-text-subtle">{PROMPT}</span>
                <span>{line.cmd}</span>
                {showCursor && (
                  <span
                    className="cursor-blink inline-block h-4 w-2 bg-accent"
                    aria-hidden
                  />
                )}
              </div>
            );
          }

          const tone =
            line.tone === "accent"
              ? "text-success"
              : line.tone === "muted"
                ? "text-text-subtle"
                : "text-text-muted";

          return (
            <div key={i} className={tone}>
              {line.text}
            </div>
          );
        })}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-accent-soft to-transparent opacity-40"
      />
    </div>
  );
}
