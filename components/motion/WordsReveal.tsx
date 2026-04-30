"use client";

import { motion } from "motion/react";
import { Children, isValidElement } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
};

const variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const WORD_TX = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

let idCounter = 0;
const nextId = () => `wr-${idCounter++}`;

const splitNode = (node: React.ReactNode): React.ReactNode => {
  if (node === null || node === undefined || typeof node === "boolean") return node;
  if (typeof node === "number") return node;
  if (typeof node === "string") {
    const parts = node.split(/(\s+)/);
    return parts.map((p) => {
      if (p.length === 0) return null;
      if (/^\s+$/.test(p)) return p;
      return (
        <motion.span
          key={nextId()}
          variants={variants}
          transition={WORD_TX}
          className="inline-block"
        >
          {p}
        </motion.span>
      );
    });
  }
  if (Array.isArray(node)) {
    return Children.map(node, splitNode);
  }
  if (isValidElement(node)) {
    return (
      <motion.span
        key={nextId()}
        variants={variants}
        transition={WORD_TX}
        className="inline-block"
      >
        {node}
      </motion.span>
    );
  }
  return node;
};

export function WordsReveal({
  children,
  className,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.06,
}: Props) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay, staggerChildren: stagger }}
      className={className}
    >
      {splitNode(children)}
    </MotionTag>
  );
}
