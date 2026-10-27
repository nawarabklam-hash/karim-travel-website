"use client";

import { useRef } from "react";
import { span as MSpan } from "motion/react-m";
import { useLocale } from "next-intl";
import { countUpDuration, easeOut, viewport } from "@/lib/motion/presets";
import { motionIsSeenNow } from "@/lib/motion/seen";

type Props = {
  value: number;
  /** Start of the count (e.g. a year counts from value - 18). Default 0. */
  from?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Thousands separators (off for years). Default true. */
  grouping?: boolean;
  className?: string;
  /** Classes for the prefix (e.g. a red "+"). */
  prefixClassName?: string;
};

/**
 * Animated number. The final value is rendered in the HTML (good for SEO and
 * for visitors without JS); on scroll-in it counts up from `from` once.
 * Numbers stay left-to-right and use Western digits in Arabic too.
 */
export default function CountUp({
  value,
  from = 0,
  prefix,
  suffix,
  decimals = 0,
  grouping = true,
  className,
  prefixClassName,
}: Props) {
  const locale = useLocale();
  const numberRef = useRef<HTMLSpanElement>(null);
  // Count once only — never again when the number re-enters the viewport.
  const started = useRef(false);

  const format = (n: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-u-nu-latn" : locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouping,
    }).format(n);

  const start = async () => {
    if (started.current) return;
    started.current = true;
    const el = numberRef.current;
    // Visitors who prefer less motion, or who already saw this page this session,
    // keep the final value (no import, no count).
    if (
      !el ||
      motionIsSeenNow() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    // Loaded only when the number scrolls into view, so it costs nothing up front.
    const { animate } = await import("motion");
    animate(from, value, {
      duration: countUpDuration,
      ease: easeOut,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
  };

  return (
    <MSpan
      dir="ltr"
      className={`tabular-nums ${className ?? ""}`}
      viewport={viewport}
      onViewportEnter={start}
    >
      {prefix && <span className={prefixClassName}>{prefix}</span>}
      <span
        ref={numberRef}
        // Slack from the reserved width goes after the number, not between it and the prefix.
        className="inline-block text-start"
        style={{ minWidth: `${format(value).length}ch` }}
      >
        {format(value)}
      </span>
      {suffix}
    </MSpan>
  );
}
