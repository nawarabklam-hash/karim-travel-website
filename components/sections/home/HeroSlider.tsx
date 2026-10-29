"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { div as MDiv, p as MP } from "motion/react-m";
import KenBurns from "@/components/motion/KenBurns";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";

export type Slide = {
  slug: string;
  image: string;
  position?: string;
  alt: string;
};

const INTERVAL_MS = 5000;

type Props = {
  slides: Slide[];
  className: string;
  /** Hero content, rendered on the server. */
  children: ReactNode;
};

/**
 * The hero box with cross-fading background photos (KenBurns settle) and a
 * caption naming the current place. Pauses while hovered or while the tab is
 * hidden, and does not auto-play with prefers-reduced-motion. Only the current
 * photo, the next one and photos already shown are mounted, so the first load
 * stays light. All motion comes from components/motion (Motion), no CSS keyframes.
 */
export default function HeroSlider({ slides, className, children }: Props) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  // Only the first photo is rendered at first; the second one is added a moment
  // later (below), so it doesn't download at the same time as the visible photo.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setTimeout(() => setSeen((s) => new Set(s).add(1)), 2000);
    return () => clearTimeout(id);
  }, [slides.length]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const count = slides.length;
  const paused = hovered || tabHidden;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(() => {
      const next = (index + 1) % count;
      setPrevious(index);
      setIndex(next);
      // Preload the photo after the one now showing.
      setSeen((s) => new Set(s).add(next).add((next + 1) % count));
    }, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, count, paused]);

  const current = slides[index];

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {slides.map((s, i) =>
          seen.has(i) ? (
            // Cross-fade (not tagged data-motion: hidden slides must stay hidden).
            <MDiv
              key={s.slug}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <KenBurns
                className="absolute inset-0"
                active={i === index || i === previous}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  style={{ objectPosition: s.position ?? "50% 30%" }}
                  className="object-cover"
                />
              </KenBurns>
            </MDiv>
          ) : null,
        )}
      </div>

      {children}

      {current && (
        <div
          className={`${siteGutter} pointer-events-none absolute inset-x-0 bottom-6`}
        >
          <div className={`${siteContainer} ${siteInset}`}>
            <MP
              key={current.slug}
              data-motion=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 text-xs text-white/75 sm:text-sm"
            >
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              {current.alt}
            </MP>
          </div>
        </div>
      )}
    </div>
  );
}
