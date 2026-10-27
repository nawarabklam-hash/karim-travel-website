"use client";

import { div as MDiv, li as MLi } from "motion/react-m";
import { useLocale } from "next-intl";
import { directionOf, type AppLocale } from "@/i18n/routing";
import { getVariant, type VariantName } from "@/lib/motion/presets";

type Props = {
  variant?: VariantName;
  /** Extra seconds before this child starts (e.g. a caption inside a card). */
  delay?: number;
  /** Overrides the variant's length in seconds (tweens only). */
  duration?: number;
  /** Render as a list item or a plain `div`. */
  as?: "div" | "li";
  className?: string;
  children: React.ReactNode;
};

/**
 * One child of <Stagger> or <Sequence>; it animates when its parent reaches it.
 * Can also be nested inside another <StaggerItem> (it then follows that item).
 */
export default function StaggerItem({
  variant = "fadeUp",
  delay = 0,
  duration,
  as = "div",
  className,
  children,
}: Props) {
  const dir = directionOf(useLocale() as AppLocale);
  const Tag = { div: MDiv, li: MLi }[as];
  return (
    <Tag
      data-motion=""
      className={className}
      variants={getVariant(variant, dir, delay, duration)}
    >
      {children}
    </Tag>
  );
}
