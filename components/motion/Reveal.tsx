"use client";

import { div as MDiv, p as MP } from "motion/react-m";
import { useLocale } from "next-intl";
import { directionOf, type AppLocale } from "@/i18n/routing";
import { getVariant, viewport, type VariantName } from "@/lib/motion/presets";

type Props = {
  variant?: VariantName;
  /** Seconds before the animation starts. */
  delay?: number;
  /** "view": plays when scrolled into view (once). "mount": plays right away (hero). */
  trigger?: "view" | "mount";
  as?: "div" | "p";
  className?: string;
  children: React.ReactNode;
};

/** The unclipped outer box only watches the viewport; it animates nothing itself. */
const watcher = { hidden: {}, show: {} };

/** Animates one block in, once. Works for any variant in lib/motion/presets.ts. */
export default function Reveal({
  variant = "fadeUp",
  delay = 0,
  trigger = "view",
  as = "div",
  className,
  children,
}: Props) {
  const dir = directionOf(useLocale() as AppLocale);
  const when =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport };

  // A fully clipped element counts as "not visible" to the browser and would never
  // start. So clip reveals are watched from an outer box that is not clipped.
  if (variant.startsWith("clip")) {
    return (
      <MDiv className={className} variants={watcher} initial="hidden" {...when}>
        <MDiv
          data-motion=""
          className="h-full"
          variants={getVariant(variant, dir, delay)}
        >
          {children}
        </MDiv>
      </MDiv>
    );
  }

  const Tag = as === "p" ? MP : MDiv;
  return (
    <Tag
      data-motion=""
      className={className}
      variants={getVariant(variant, dir, delay)}
      initial="hidden"
      {...when}
    >
      {children}
    </Tag>
  );
}
