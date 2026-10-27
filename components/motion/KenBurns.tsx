"use client";

import { div as MDiv } from "motion/react-m";
import { kenBurns } from "@/lib/motion/presets";

/**
 * Wraps a hero image (give it `absolute inset-0 -z-20` and put a `fill` Image
 * inside). The image is fully visible from the first frame (no LCP delay); it
 * only settles from a slight zoom. The hero box must have `overflow-hidden`.
 */
export default function KenBurns({
  className,
  children,
  active = true,
}: {
  className?: string;
  children: React.ReactNode;
  /** Slider slides: the zoom runs while the slide is showing. */
  active?: boolean;
}) {
  return (
    <MDiv
      data-motion=""
      className={className}
      initial={kenBurns.initial}
      animate={active ? kenBurns.animate : kenBurns.initial}
      // Inactive (hidden) slides snap back to the start, ready for next time.
      transition={active ? kenBurns.transition : { duration: 0 }}
    >
      {children}
    </MDiv>
  );
}
