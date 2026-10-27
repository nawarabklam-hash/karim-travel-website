"use client";

import { Suspense, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import {
  button as MButton,
  div as MDiv,
  li as MLi,
  span as MSpan,
  ul as MUl,
} from "motion/react-m";
import {
  blurRiseItem,
  easeOut,
  faqSequence,
  getVariant,
  staggerContainer,
} from "@/lib/motion/presets";

type Tab = { id: string; label: string };
type Item = { category: string; question: string; answer: string };
type Props = { tabs: Tab[]; items: Item[] };

/**
 * Tabs + accordion. `initial` is the tab to start on. The entrance follows the
 * parent <Sequence> on the About page (faqSequence): tabs one by one, then the
 * questions. After a tab switch only the new questions animate, on their own.
 */
function FaqView({ tabs, items, initial }: Props & { initial: string }) {
  const [active, setActive] = useState(initial);
  const [open, setOpen] = useState<number | null>(0);
  const [switched, setSwitched] = useState(false);
  const baseId = useId();
  const visible = items.filter((item) => item.category === active);

  const selectTab = (id: string) => {
    setActive(id);
    setOpen(0);
    setSwitched(true);
    // Keep the tab in the URL (?faq=visa) without a navigation or scroll jump.
    const url = new URL(window.location.href);
    if (id === tabs[0].id) url.searchParams.delete("faq");
    else url.searchParams.set("faq", id);
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <div
        role="tablist"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <MButton
              key={tab.id}
              data-motion=""
              variants={getVariant(
                "nudgeUp",
                "ltr",
                faqSequence.tabs + i * faqSequence.tabGap,
              )}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => selectTab(tab.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:outline-none ${selected ? "border-navy bg-navy text-white" : "border-navy/15 bg-white text-navy/65 hover:border-navy/40"}`}
            >
              {tab.label}
            </MButton>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        {/* First list: part of the page's timeline. Switching tab: the old list
            fades out and the new one comes in from blur to sharp on its own
            (not data-motion, so it still animates on a page seen this session). */}
        <AnimatePresence mode="wait">
          <MUl
            key={active}
            data-motion={switched ? undefined : ""}
            className="mt-5 space-y-3"
            {...(switched
              ? {
                  variants: staggerContainer(faqSequence.switchGap),
                  initial: "hidden",
                  animate: "show",
                }
              : {
                  variants: staggerContainer(
                    faqSequence.questionGap,
                    faqSequence.questions,
                  ),
                })}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {visible.map((item, i) => {
              const isOpen = open === i;
              const buttonId = `${baseId}-q-${active}-${i}`;
              const panelId = `${baseId}-a-${active}-${i}`;
              return (
                <MLi
                  key={item.question}
                  data-motion={switched ? undefined : ""}
                  variants={blurRiseItem}
                  className={`rounded-2xl border bg-white px-5 py-4 transition-colors duration-300 ${isOpen ? "border-navy/40" : "border-navy/10"}`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? panelId : undefined}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 text-start text-base font-semibold text-navy focus-visible:outline-none sm:text-lg"
                    >
                      {item.question}
                      <MSpan
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-navy text-white" : "bg-snow text-navy/50"}`}
                      >
                        <ChevronDown className="size-4" />
                      </MSpan>
                    </button>
                  </h3>
                  {/* Opening: the answer grows from 0 to its height while fading in */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <MDiv
                        key="answer"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-base leading-relaxed text-navy/65">
                          {item.answer}
                        </p>
                      </MDiv>
                    )}
                  </AnimatePresence>
                </MLi>
              );
            })}
          </MUl>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Reads the starting tab from `?faq=` once. Later URL changes come from our own
 * tab clicks, so they must not remount the view (that would replay or lose the
 * animation state).
 */
function FaqFromUrl(props: Props) {
  const params = useSearchParams();
  const [initial] = useState(() => {
    const fromUrl = params.get("faq");
    return props.tabs.some((t) => t.id === fromUrl)
      ? (fromUrl as string)
      : props.tabs[0].id;
  });
  return <FaqView {...props} initial={initial} />;
}

/**
 * FAQ with category tabs (kept in `?faq=`) and a one-open-at-a-time accordion.
 * The static HTML shows the default tab; the URL tab is applied on the client.
 */
export default function Faq(props: Props) {
  return (
    <Suspense fallback={<FaqView {...props} initial={props.tabs[0].id} />}>
      <FaqFromUrl {...props} />
    </Suspense>
  );
}
