"use client";

import { MotionConfig } from "motion/react";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.4 }}
    >
      {children}
    </MotionConfig>
  );
}
