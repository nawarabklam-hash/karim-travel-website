"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "motion/react";
import { div as MDiv } from "motion/react-m";
import { motionIsSeenNow } from "@/lib/motion/seen";

type Props = {
  /** Vertical offset (px) when the element enters from the bottom... */
  from: number;
  /** ...and when it leaves at the top. Use opposite signs for opposite motion. */
  to: number;
  /** Layout classes (position/size) — this box does not move. */
  className?: string;
  /** Visual classes for the box that moves (rounded, overflow, border…). */
  innerClassName?: string;
  children: React.ReactNode;
};

/**
 * Moves its content a little against the scroll. Desktop only (≥ 768px) and
 * switched off for visitors who prefer less motion. Continuous, not "once".
 */
export default function Parallax({
  from,
  to,
  className,
  innerClassName,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Seen page: the photos stay still, like for visitors who prefer less motion.
    const update = () =>
      setEnabled(desktop.matches && !calm.matches && !motionIsSeenNow());
    update();
    desktop.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    enabled ? [from, to] : [0, 0],
  );

  return (
    <div ref={ref} className={className}>
      <MDiv className={innerClassName} style={{ y }}>
        {children}
      </MDiv>
    </div>
  );
}
