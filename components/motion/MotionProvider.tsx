"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, MotionConfig } from "motion/react";
import { isSeen, markSeen, SEEN_ATTR } from "@/lib/motion/seen";

/** Time on a page before it counts as seen (a quick bounce doesn't count). */
const SEEN_AFTER_MS = 1500;

/**
 * The animation features are a separate chunk (not in the page's first JavaScript),
 * but the download starts the moment this file runs, in parallel with hydration —
 * the hero text is invisible until its animation starts, so waiting for an idle
 * moment would delay the first visible text (LCP). (Measured: loading them on idle
 * instead of right away made no difference beyond run-to-run noise.)
 */
const featuresPromise =
  typeof window === "undefined"
    ? null
    : import("@/lib/motion/features").then((mod) => mod.default);

const loadFeatures = () => featuresPromise!;

/**
 * Decides per page whether its entrance animations run: only the first visit in
 * a session. Before the first paint the inline script in the layout has already
 * set the attribute for a seen page; this keeps it in step on client navigation.
 */
function useMotionOncePerSession() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isSeen(pathname)) root.setAttribute(SEEN_ATTR, "");
    else root.removeAttribute(SEEN_ATTR);

    const timer = setTimeout(() => markSeen(pathname), SEEN_AFTER_MS);
    const onHide = () => markSeen(pathname);
    window.addEventListener("pagehide", onHide);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pagehide", onHide);
      root.removeAttribute(SEEN_ATTR);
    };
  }, [pathname]);
}

/**
 * Wraps a page that uses components/motion (the five main pages and the trip
 * pages). `strict` forbids the heavy `motion.*` components (use `m.*`), and
 * reducedMotion="user" turns movement off for visitors who ask for less motion.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useMotionOncePerSession();

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
