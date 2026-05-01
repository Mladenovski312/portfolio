"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/testimonials";

const MIN_AUTOPLAY_MS = 3600;
const MAX_AUTOPLAY_MS = 7600;
const WORDS_PER_MINUTE = 260;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function readingDelay(quote: string) {
  const words = quote.trim().split(/\s+/).length;
  const readingMs = (words / WORDS_PER_MINUTE) * 60_000;
  return clamp(readingMs + 1800, MIN_AUTOPLAY_MS, MAX_AUTOPLAY_MS);
}

function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function circularOffset(itemIndex: number, activeIndex: number, total: number) {
  const raw = itemIndex - activeIndex;
  if (raw > total / 2) return raw - total;
  if (raw < -total / 2) return raw + total;
  return raw;
}

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const active = testimonials[index];

  const activeDelay = useMemo(() => readingDelay(active.quote), [active.quote]);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setIndex((i) => wrapIndex(i + 1, total));
    }, activeDelay);
    return () => window.clearTimeout(id);
  }, [activeDelay, paused, total]);

  const go = (direction: -1 | 1) => {
    setIndex((i) => wrapIndex(i + direction, total));
  };

  return (
    <section className="border-b border-border-subtle/60 py-20 md:py-24">
      <Container>
        <div className="mb-8 space-y-4 md:mb-10">
          <SectionLabel number="05">In clients&apos; words</SectionLabel>
          <h2 className="max-w-2xl font-display text-[32px] font-semibold tracking-tight text-text md:text-[42px]">
            The receipts.
          </h2>
        </div>
      </Container>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setPaused(false);
          }
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[calc(max(0px,(100vw-72rem)/2)+min(12vw,8.5rem))] bg-gradient-to-r from-bg via-bg/90 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[calc(max(0px,(100vw-72rem)/2)+min(12vw,8.5rem))] bg-gradient-to-l from-bg via-bg/90 to-transparent"
        />

        <div className="relative h-[390px] overflow-hidden md:h-[410px]">
          {testimonials.map((item, itemIndex) => {
            const offset = circularOffset(itemIndex, index, total);
            const activeCard = offset === 0;
            const visibleCard = Math.abs(offset) <= 2;
            const longQuote = item.quote.length > 220;
            const quoteSize = activeCard
              ? longQuote
                ? "text-[18px] leading-[1.42] md:text-[20px]"
                : "text-[20px] leading-[1.38] md:text-[23px]"
              : longQuote
                ? "text-[16px] leading-[1.45] md:text-[18px]"
                : "text-[17px] leading-[1.42] md:text-[19px]";

            return (
              <article
                key={`${item.author}-${item.role}`}
                className={
                  "absolute left-1/2 top-1/2 grid h-[350px] w-[min(82vw,430px)] grid-rows-[1fr_auto] rounded-xl border p-6 text-left shadow-card transition-[transform,opacity,border-color,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[365px] md:p-7 " +
                  (activeCard
                    ? "z-[2] border-accent-border bg-surface opacity-100"
                    : visibleCard
                      ? "z-[1] border-border-subtle bg-surface/45 opacity-45"
                      : "z-0 border-border-subtle bg-surface/20 opacity-0")
                }
                style={{
                  transform: `translate(calc(-50% + ${offset} * (min(82vw, 430px) + clamp(1rem, 2vw, 1.5rem))), -50%)`,
                }}
                aria-hidden={!activeCard}
              >
                <blockquote
                  className={
                    "max-w-full self-start text-pretty font-display font-medium tracking-tight transition-colors " +
                    quoteSize +
                    (activeCard ? " text-text" : " text-text-muted")
                  }
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center justify-between gap-5 border-t border-border-subtle/70 pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden
                      className={
                        "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] uppercase tracking-[0.12em] " +
                        (activeCard
                          ? "border-accent-border bg-accent-soft text-accent"
                          : "border-border-subtle bg-surface-2/50 text-text-subtle")
                      }
                    >
                      {initials(item.author)}
                    </div>
                    <div className="space-y-1.5">
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text">
                        {item.author}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-subtle">
                        {item.role}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {item.source}
                  </div>
                </figcaption>
              </article>
            );
          })}
        </div>

        <Container>
          <div className="mt-3 flex items-center justify-center gap-4 md:mt-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:border-accent-border hover:text-text"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:border-accent-border hover:text-text"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
