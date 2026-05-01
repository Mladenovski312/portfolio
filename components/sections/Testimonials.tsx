"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/testimonials";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const active = testimonials[index];
  const total = testimonials.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    const id = window.setTimeout(onChange, 0);
    mq.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, total]);

  const go = (next: number) => {
    setIndex(((next % total) + total) % total);
  };

  return (
    <section className="border-b border-border-subtle/60 py-28 md:py-36">
      <Container>
        <div className="mb-14 space-y-6">
          <SectionLabel number="05">In clients&apos; words</SectionLabel>
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
            The receipts.
          </h2>
        </div>

        <figure
          ref={figureRef}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!figureRef.current?.contains(e.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
            <div
              aria-hidden
              className="font-display text-[96px] font-semibold leading-none tracking-tight text-text-subtle/55 md:text-[160px]"
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="flex flex-col justify-between gap-10">
              <blockquote
                key={reducedMotion ? undefined : index}
                className={
                  "font-display text-[28px] font-medium leading-[1.2] tracking-tight text-text text-balance md:text-[44px] " +
                  (reducedMotion ? "" : "animate-[fade-in_300ms_ease-out]")
                }
              >
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                <span className="text-text">{active.author}</span>
                <span aria-hidden>·</span>
                <span>{active.role}</span>
                <span aria-hidden>·</span>
                <span className="text-accent">{active.source}</span>
              </figcaption>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-border-subtle/70 pt-6">
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${total}`}
                  onClick={() => go(i)}
                  className={
                    "h-1.5 rounded-full transition-all duration-200 " +
                    (i === index
                      ? "w-8 bg-accent"
                      : "w-4 bg-border hover:bg-border-subtle")
                  }
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:border-accent-border hover:text-text"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(index + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:border-accent-border hover:text-text"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </figure>
      </Container>
    </section>
  );
}
