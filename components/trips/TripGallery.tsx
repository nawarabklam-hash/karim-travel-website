"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { li as MLi, ul as MUl } from "motion/react-m";
import { directionOf, type AppLocale } from "@/i18n/routing";
import {
  galleryStagger,
  galleryViewport,
  gallerySlide,
  getVariant,
  staggerContainer,
  type Direction,
} from "@/lib/motion/presets";

type Photo = { src: string; alt: string; position?: string };

const MD = "(min-width: 768px)";
const LIST_ID = "trip-gallery";

type Side = "start" | "end";

/**
 * Which edge a photo comes from, by where it sits in the layout.
 * md and up (4 columns): the big photo is on the start side, the small ones on the end side.
 * Below md (2 columns): the big photo spans both columns; the small ones alternate
 * start / end by column.
 */
function sideOf(i: number, wide: boolean): Side {
  if (i === 0) return "start";
  if (wide) return "end";
  return i % 2 === 1 ? "start" : "end";
}

/** "start" is the right edge in Arabic and the left edge in English. */
function offsetFor(side: Side, dir: Direction) {
  return (side === "start") === (dir === "ltr") ? -gallerySlide : gallerySlide;
}

/**
 * Where a photo starts, worked out on its first render in the browser (the server
 * HTML assumes the 2-column layout). A photo already on screen at first load only
 * slides and stays visible, so nothing waits for the animation (LCP); the big one
 * is treated that way on the server too.
 */
function startOf(index: number, dir: Direction) {
  if (typeof window === "undefined") {
    return { x: offsetFor(sideOf(index, false), dir), fade: index !== 0 };
  }
  const wide = window.matchMedia(MD).matches;
  const el = document.getElementById(LIST_ID)?.children[index];
  const above = !!el && el.getBoundingClientRect().top < window.innerHeight;
  return { x: offsetFor(sideOf(index, wide), dir), fade: !above };
}

function GalleryPhoto({
  photo,
  index,
  threeUp,
}: {
  photo: Photo;
  index: number;
  threeUp: boolean;
}) {
  const dir = directionOf(useLocale() as AppLocale);
  const [start] = useState(() => startOf(index, dir));
  const first = index === 0;
  // Start state as above; the end state and timing (0.8s, easeOut) come from the slide preset.
  const variants = {
    hidden: { x: start.x, opacity: start.fade ? 0 : 1 },
    show: getVariant("slideStart", dir).show,
  };

  return (
    <MLi
      data-motion=""
      // The server HTML and the first browser render can differ in the start position.
      suppressHydrationWarning
      variants={variants}
      className={`relative overflow-hidden rounded-2xl ${
        first
          ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
          : `aspect-[4/3] ${threeUp ? "md:col-span-2 md:aspect-[2/1]" : ""}`
      }`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={
          first
            ? "(min-width: 768px) 50vw, 100vw"
            : "(min-width: 768px) 25vw, 50vw"
        }
        style={{ objectPosition: photo.position }}
        className="object-cover"
      />
    </MLi>
  );
}

/**
 * The trip photo bento. When it scrolls into view, the photos slide in one after
 * another (big one first), each from the edge it sits closest to.
 */
export default function TripGallery({ photos }: { photos: Photo[] }) {
  const threeUp = photos.length === 3;
  return (
    <MUl
      id={LIST_ID}
      className="grid grid-cols-2 gap-3 overflow-x-clip md:grid-cols-4 md:grid-rows-2"
      variants={staggerContainer(galleryStagger)}
      initial="hidden"
      whileInView="show"
      viewport={galleryViewport}
    >
      {photos.map((photo, i) => (
        <GalleryPhoto
          key={photo.src}
          photo={photo}
          index={i}
          threeUp={threeUp}
        />
      ))}
    </MUl>
  );
}
