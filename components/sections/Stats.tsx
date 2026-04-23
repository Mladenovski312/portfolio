"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

type ParsedStat = {
  value: string;
  label: string;
  prefix: string;
  suffix: string;
  numeric: number;
  decimals: number;
  animated: boolean;
};

function parseStat(raw: { value: string; label: string }): ParsedStat {
  const match = raw.value.match(/^([^\d.-]*)([\d,\.]+)(.*)$/);
  if (!match) {
    return {
      value: raw.value,
      label: raw.label,
      prefix: "",
      suffix: "",
      numeric: 0,
      decimals: 0,
      animated: false,
    };
  }
  const [, prefix, digits, suffix] = match;
  const numeric = Number(digits.replace(/,/g, ""));
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return {
    value: raw.value,
    label: raw.label,
    prefix,
    suffix,
    numeric,
    decimals,
    animated: true,
  };
}

export function Stats() {
  const stats = site.stats.map(parseStat);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Track record"
      className="border-b border-border-subtle/60 py-16 md:py-20"
    >
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 border-l border-border-subtle/70 pl-5"
            >
              <div className="font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
                {!stat.animated || reducedMotion || !inView ? (
                  <span>{stat.value}</span>
                ) : (
                  <CountUp
                    end={stat.numeric}
                    duration={1.8}
                    separator=","
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
