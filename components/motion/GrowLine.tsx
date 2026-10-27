"use client";

import { span as MSpan } from "motion/react-m";
import { growX } from "@/lib/motion/presets";

/**
 * Short red underline that grows from the center (scaleX, transform only).
 * Put it inside a <StaggerItem>: it plays when its parent is revealed.
 */
export default function GrowLine({ className }: { className?: string }) {
  return (
    <MSpan
      aria-hidden="true"
      data-motion=""
      className={className}
      variants={growX}
    />
  );
}
