"use client";

import { div as MDiv } from "motion/react-m";
import { float } from "@/lib/motion/presets";

/**
 * Gentle up-and-down float (badges). Starts with its parent's "show" (e.g. a
 * <Sequence>), `delay` seconds later, and loops forever. Not tagged
 * data-motion: on a page already seen this session it keeps floating.
 * Visitors who prefer less motion get no movement (MotionConfig).
 */
export default function Float({
  delay = 0,
  className,
  children,
}: {
  /** Seconds (after the parent starts) before the loop starts. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <MDiv
      className={className}
      variants={{
        hidden: { y: 0 },
        show: { ...float.animate, transition: { ...float.transition, delay } },
      }}
    >
      {children}
    </MDiv>
  );
}
