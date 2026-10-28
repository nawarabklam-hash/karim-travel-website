import type { TargetAndTransition, Transition, Variants } from "motion/react";

/**
 * Every animation on the site is defined here — one source of truth.
 * Only opacity, transform, filter and clip-path are animated.
 */

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const durations = { fast: 0.3, base: 0.6, slow: 1.2 } as const;

export const baseTransition: Transition = {
  duration: durations.base,
  ease: easeOut,
};

/** Play once, when 30% of the element is visible; never replay on scroll back. */
export const viewport = { once: true, amount: 0.3 } as const;

export type Direction = "rtl" | "ltr";

const SLIDE = 40;

/**
 * hidden/show pair; `delay` is added to the show transition. A zero delay is
 * left out on purpose: an explicit `delay: 0` would cancel the parent's
 * staggerChildren, and every child would then animate at once.
 */
const make = (
  hidden: TargetAndTransition,
  show: TargetAndTransition,
  transition: Transition,
  delay: number,
): Variants => ({
  hidden,
  show: {
    ...show,
    transition: delay ? { ...transition, delay } : transition,
  },
});

export type VariantName =
  | "fadeUp"
  | "fadeIn"
  | "scaleIn"
  | "slideStart"
  | "slideEnd"
  | "popIn"
  | "popBadge"
  | "clipUp"
  | "clipStart"
  | "clipEnd"
  | "blurIn"
  | "blurRise"
  | "riseIn"
  | "nudgeUp";

/**
 * Directions are logical: "start" is the right side in Arabic (RTL) and the left
 * side in English (LTR), so slides and clip reveals flip with the language.
 */
function baseVariant(
  name: VariantName,
  dir: Direction,
  delay: number,
): Variants {
  const rtl = dir === "rtl";
  switch (name) {
    case "fadeIn":
      return make({ opacity: 0 }, { opacity: 1 }, baseTransition, delay);
    case "scaleIn":
      return make(
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1 },
        baseTransition,
        delay,
      );
    case "slideStart":
      return make(
        { opacity: 0, x: rtl ? SLIDE : -SLIDE },
        { opacity: 1, x: 0 },
        { duration: 0.8, ease: easeOut },
        delay,
      );
    case "slideEnd":
      return make(
        { opacity: 0, x: rtl ? -SLIDE : SLIDE },
        { opacity: 1, x: 0 },
        { duration: 0.8, ease: easeOut },
        delay,
      );
    // Cards that pop and grow with a spring.
    case "popIn":
      return make(
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1 },
        { type: "spring", stiffness: 260, damping: 20 },
        delay,
      );
    case "popBadge":
      return make(
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1 },
        { type: "spring", stiffness: 300, damping: 18 },
        delay,
      );
    // Opens from the bottom up, like a curtain.
    case "clipUp":
      return make(
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 0.9, ease: easeOut },
        delay,
      );
    // Revealed from the start / end side (clip edge grows from that side).
    case "clipStart":
    case "clipEnd": {
      const fromRight = (name === "clipStart") === rtl;
      return make(
        {
          clipPath: fromRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
        },
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 1, ease: easeOut },
        delay,
      );
    }
    // A short rise for a line of text.
    case "riseIn":
      return make(
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: easeOut },
        delay,
      );
    // A small step up (chips, tabs).
    case "nudgeUp":
      return make(
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0 },
        { duration: 0.4, ease: easeOut },
        delay,
      );
    case "blurIn":
      return make(
        { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)" },
        baseTransition,
        delay,
      );
    // From blurred to sharp while rising a little (FAQ questions).
    case "blurRise":
      return make(
        { opacity: 0, y: 12, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        baseTransition,
        delay,
      );
    default:
      return make(
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0 },
        baseTransition,
        delay,
      );
  }
}

/** A named variant for `dir`; `duration` (seconds) overrides a tween's length. */
export function getVariant(
  name: VariantName,
  dir: Direction,
  delay = 0,
  duration?: number,
): Variants {
  const v = baseVariant(name, dir, delay);
  if (duration === undefined) return v;
  const show = v.show as TargetAndTransition;
  return {
    ...v,
    show: { ...show, transition: { ...show.transition, duration } },
  };
}

/**
 * "Why choose us" (About) as one timeline in reading order — seconds after the
 * section enters the view. About 3s in total.
 */
export const whySequence = {
  eyebrow: 0,
  eyebrowDuration: 0.4,
  title: 0.2,
  subtitle: 0.8,
  features: 1.0,
  featureGap: 0.15,
  featureDuration: 0.5,
  image: 1.6,
  badges: [2.4, 2.6],
  /** A badge starts floating this long after it pops in... */
  floatAfter: 0.5,
  /** ...and the second one this much later than the first. */
  floatOffset: 1.2,
} as const;

/**
 * FAQ (About) as one timeline — seconds after the section enters the view.
 * Navy card → its contents → tabs one by one → questions one by one (~2.2s).
 */
export const faqSequence = {
  card: 0,
  cardDuration: 0.6,
  /** Eyebrow, title, text, button inside the card. */
  inner: 0.45,
  innerGap: 0.12,
  tabs: 0.95,
  tabGap: 0.06,
  questions: 1.3,
  questionGap: 0.1,
  /** After switching tab, only the new questions animate. */
  switchGap: 0.06,
} as const;

/**
 * A card in a grid that appears when it scrolls in (components/motion/GridReveal).
 * `custom` is the wait in seconds: cards that enter the view together are queued
 * `queueGap` apart, whatever the number of columns.
 */
export const queueGap = 0.18;
export const queuedRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (wait: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, delay: wait },
  }),
};

/** Trip gallery: photos slide in from their own edge, big photo first. */
export const galleryStagger = 0.12;
export const galleryViewport = { once: true, amount: 0.2 } as const;
/** How far (px) a gallery photo starts from its resting place (same as slideStart/slideEnd). */
export const gallerySlide = 40;

/** A question that rises from blurred to sharp (child of a staggerContainer). */
export const blurRiseItem: Variants = getVariant("blurRise", "ltr");

/** Parent that reveals its children one after another. */
export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Hero image: slowly settles from a slight zoom. Visible from the first frame. */
export const kenBurns = {
  initial: { scale: 1.08 },
  animate: { scale: 1 },
  transition: { duration: 6, ease: easeOut } as Transition,
};

/** One word of a hero title: rises out of a mask, from blurred to sharp. */
export const wordHidden = { opacity: 0, y: "100%", filter: "blur(6px)" };
export const wordShow = { opacity: 1, y: "0%", filter: "blur(0px)" };
export const wordStagger = 0.06;
/** Delay before the subtitle/buttons fade in after the title. */
export const heroFollowDelay = 0.4;

/** Small red underline under a stat: grows from the center (transform only). */
export const growX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { ...baseTransition, delay: 0.2 } },
};

/** Gentle floating loop for badges. */
export const float = {
  animate: { y: [0, -6, 0] },
  transition: {
    duration: 3.5,
    ease: "easeInOut",
    repeat: Infinity,
  } as Transition,
};

/** Count-up duration for numbers. */
export const countUpDuration = 1.6;
