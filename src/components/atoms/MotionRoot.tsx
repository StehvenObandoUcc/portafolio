"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";
import { isMotionOff, subscribeMotion } from "@/lib/motionPreference";

const loadFeatures = () => import("motion/react").then((mod) => mod.domMax);

/**
 * Motion runtime for the page: animation features load after hydration
 * (LazyMotion), and the visitor's motion switch turns them off.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  const off = useSyncExternalStore(subscribeMotion, isMotionOff, () => false);
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion={off ? "always" : "never"}>{children}</MotionConfig>
    </LazyMotion>
  );
}
