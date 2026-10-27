"use client";

import { div as MDiv } from "motion/react-m";
import { viewport } from "@/lib/motion/presets";

/** Only watches the viewport; the children do the animating. */
const watcher = { hidden: {}, show: {} };

/**
 * Plays a whole block as ONE timeline when it scrolls into view (once).
 * Children — <StaggerItem>, <WordReveal trigger="parent">, <Float> — start at
 * their own delays counted from that moment, so the order is guaranteed.
 */
export default function Sequence({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <MDiv
      className={className}
      variants={watcher}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </MDiv>
  );
}
