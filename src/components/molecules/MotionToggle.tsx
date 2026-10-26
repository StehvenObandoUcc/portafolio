"use client";

import { useSyncExternalStore } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { isMotionOff, setMotionOff, subscribeMotion } from "@/lib/motionPreference";

interface MotionToggleProps {
  /** Label while motion plays, e.g. "Pausar animaciones". */
  pauseLabel: string;
  /** Label while motion is off, e.g. "Activar animaciones". */
  playLabel: string;
  className?: string;
}

/** Stops and restarts every animation on the page, including the running bands. */
export function MotionToggle({ pauseLabel, playLabel, className }: MotionToggleProps) {
  const off = useSyncExternalStore(subscribeMotion, isMotionOff, () => false);
  return (
    <IconButton
      icon={off ? "play" : "pause"}
      label={off ? playLabel : pauseLabel}
      onClick={() => setMotionOff(!off)}
      className={className}
    />
  );
}
