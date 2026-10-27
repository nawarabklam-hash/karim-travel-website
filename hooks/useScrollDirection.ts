"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Below this scrollY the header is always shown. */
  topOffset?: number;
  /** Only hide once the page has scrolled past this point. */
  hideAfter?: number;
  /** Ignore movements smaller than this, so the header doesn't flicker. */
  threshold?: number;
};

/**
 * Hide-on-scroll-down / show-on-scroll-up. Reads scrollY inside
 * requestAnimationFrame from a passive listener, so it never blocks scrolling.
 */
export function useScrollDirection({
  topOffset = 10,
  hideAfter = 80,
  threshold = 5,
}: Options = {}) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setAtTop(y < topOffset);
      if (y < topOffset) {
        setHidden(false);
        lastY.current = y;
      } else if (Math.abs(delta) >= threshold) {
        // Down past the offset hides; any upward move shows.
        setHidden(delta > 0 && y > hideAfter);
        lastY.current = y;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    // Sync once on mount (e.g. a page reloaded halfway down), then on every scroll.
    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, [topOffset, hideAfter, threshold]);

  return { hidden, atTop };
}
