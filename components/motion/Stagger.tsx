"use client";

import { div as MDiv, ol as MOl, ul as MUl } from "motion/react-m";
import { staggerContainer, viewport } from "@/lib/motion/presets";

type Props = {
  /** Seconds between children. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  /** Render as a list (`ul`/`ol`) or a plain `div`. */
  as?: "div" | "ul" | "ol";
  className?: string;
  children: React.ReactNode;
};

/** Parent that reveals its <StaggerItem> children one after another, once. */
export default function Stagger({
  stagger = 0.12,
  delay = 0,
  as = "div",
  className,
  children,
}: Props) {
  const Tag = { div: MDiv, ul: MUl, ol: MOl }[as];
  return (
    <Tag
      data-motion=""
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Tag>
  );
}
