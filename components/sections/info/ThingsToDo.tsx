import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export type ThingItem = { title: string; image: string };

/**
 * Photo with its calligraphy title underneath. Three per row on desktop,
 * two on mobile/tablet; an incomplete last row is centered (flex-wrap).
 * Each card animates when it scrolls into view: the photo is revealed from one
 * side and the title slides in from the other (sides alternate card by card,
 * and flip with the language).
 */
export default function ThingsToDo({ items }: { items: ThingItem[] }) {
  return (
    <ol className="flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-y-12">
      {items.map((item, i) => {
        const fromStart = i % 2 === 0;
        // Cards of the same row come in one after another.
        const rowDelay = (i % 3) * 0.15;
        return (
          <li
            key={item.title}
            className="group w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
          >
            <Reveal
              variant={fromStart ? "clipStart" : "clipEnd"}
              delay={rowDelay}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-snow">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
            </Reveal>
            <Reveal
              variant={fromStart ? "slideEnd" : "slideStart"}
              delay={rowDelay + 0.2}
            >
              <h3 className="mt-3 font-calligraphy text-xl leading-[1.5] font-bold text-navy sm:text-2xl lg:text-3xl">
                {item.title}
              </h3>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
