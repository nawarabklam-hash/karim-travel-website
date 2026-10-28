"use client";

import { Children, useRef, useState } from "react";
import { div as MDiv } from "motion/react-m";
import { queueGap, queuedRise, viewport } from "@/lib/motion/presets";

/** One card: waits for its slot in the grid's queue once it is scrolled into view. */
function QueuedCard({
  claim,
  children,
}: {
  claim: () => number;
  children: React.ReactNode;
}) {
  const [wait, setWait] = useState<number | null>(null);
  return (
    <MDiv
      data-motion=""
      className="h-full"
      variants={queuedRise}
      custom={wait ?? 0}
      initial="hidden"
      animate={wait === null ? "hidden" : "show"}
      viewport={viewport}
      onViewportEnter={() => setWait((w) => w ?? claim())}
    >
      {children}
    </MDiv>
  );
}

/**
 * A grid whose cards each appear on their own when they scroll into view (once).
 * Cards that enter the view at the same moment come one after another, in DOM
 * order (right to left in Arabic), so it works the same with 1, 2 or 4 columns.
 */
export default function GridReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  // When the next card may start (ms, performance.now clock).
  const nextFree = useRef(0);
  const claim = () => {
    const now = performance.now();
    const start = Math.max(now, nextFree.current);
    nextFree.current = start + queueGap * 1000;
    return (start - now) / 1000;
  };

  return (
    <ul className={className}>
      {Children.toArray(children).map((child, i) => (
        <li key={i}>
          <QueuedCard claim={claim}>{child}</QueuedCard>
        </li>
      ))}
    </ul>
  );
}
