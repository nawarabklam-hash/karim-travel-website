"use client";

import { span as MSpan } from "motion/react-m";
import {
  easeOut,
  viewport,
  wordHeroHidden,
  wordHidden,
  wordShow,
  wordStagger,
} from "@/lib/motion/presets";

type Props = {
  as?: "h1" | "h2";
  id?: string;
  /** The title (one line of text). */
  text?: string;
  /** Or several lines (each on its own line). */
  lines?: string[];
  className?: string;
  /** Seconds before the first word. */
  delay?: number;
  /**
   * "mount": plays right away (hero). "view": plays once when scrolled into view.
   * "parent": follows a parent <Sequence> (delay counts from its start).
   */
  trigger?: "view" | "mount" | "parent";
};

/** Outer box that only watches the viewport (the word masks are clipped, so they can't be watched). */
const watcher = { hidden: {}, show: {} };

/**
 * Title that appears word by word. Splits by WORDS only — never letters —
 * so Arabic letters stay joined. The full text is in the server HTML (SEO).
 */
export default function WordReveal({
  as: Tag = "h1",
  id,
  text,
  lines,
  className,
  delay = 0,
  trigger = "mount",
}: Props) {
  const rows = lines ?? [text ?? ""];
  const onView = trigger === "view";
  // "view" and "parent" both use variants; only "view" needs its own watcher.
  const useVariants = trigger !== "mount";
  let index = 0;

  const content = rows.map((row, r) => (
    <span key={r} className={lines ? "block" : undefined}>
      {row.split(" ").map((word, w) => {
        const i = index++;
        const wordDelay = delay + i * wordStagger;
        const motionProps = useVariants
          ? {
              variants: {
                hidden: wordHidden,
                show: {
                  ...wordShow,
                  transition: {
                    duration: 0.7,
                    ease: easeOut,
                    delay: wordDelay,
                  },
                },
              },
            }
          : {
              initial: wordHeroHidden,
              animate: wordShow,
              transition: { duration: 0.7, ease: easeOut, delay: wordDelay },
            };
        return (
          <span key={`${r}-${w}`}>
            {/* The mask: keeps room for tall Arabic marks and descenders */}
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
              <MSpan data-motion="" className="inline-block" {...motionProps}>
                {word}
              </MSpan>
            </span>{" "}
          </span>
        );
      })}
    </span>
  ));

  return (
    <Tag id={id} className={className}>
      {onView ? (
        <MSpan
          variants={watcher}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {content}
        </MSpan>
      ) : (
        content
      )}
    </Tag>
  );
}
