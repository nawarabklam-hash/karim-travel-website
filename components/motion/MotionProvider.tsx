"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, MotionConfig } from "motion/react";
import { isSeen, markSeen, SEEN_ATTR } from "@/lib/motion/seen";

/** Time on a page before it counts as seen (a quick bounce doesn't count). */
const SEEN_AFTER_MS = 1500;

/**
 * Starts loading the animation features once the browser is idle (or after a
 * short wait), so they never compete with the page's own hydration.
 */
const idle = () =>
  new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => resolve(), { timeout: 500 });
    } else {
      setTimeout(resolve, 100);
    }
  });

const loadFeatures = () =>
  idle()
    .then(() => import("@/lib/motion/features"))
    .then((mod) => mod.default);

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
 * Wraps a page that uses components/motion (the five main pages; trip pages
 * don't animate). `strict` forbids the heavy `motion.*` components (use `m.*`),
 * and reducedMotion="user" turns movement off for visitors who ask for less motion.
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
