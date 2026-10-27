"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { AE, BH, KW, OM, QA, SA } from "country-flag-icons/react/3x2";

/** Gulf countries first (audience). SVG flags render the same on every OS
 * (Windows shows flag emoji as letters). */
export const COUNTRIES = [
  { id: "sa", code: "+966", Flag: SA },
  { id: "ae", code: "+971", Flag: AE },
  { id: "kw", code: "+965", Flag: KW },
  { id: "qa", code: "+974", Flag: QA },
  { id: "bh", code: "+973", Flag: BH },
  { id: "om", code: "+968", Flag: OM },
] as const;
export const OTHER = "other";

type Props = {
  /** A country code like "+966", or OTHER. */
  value: string;
  onChange: (value: string) => void;
  label: string;
  otherLabel: string;
  names: Record<string, string>;
};

const flagClass =
  "h-3.5 w-5 shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]";

/** Country-code picker: flag + code in the field, flag + name + code in the list. */
export default function CountryCodeSelect({
  value,
  onChange,
  label,
  otherLabel,
  names,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = COUNTRIES.find((c) => c.code === value);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const option =
    "flex w-full items-center gap-3 px-3 py-2.5 text-start text-sm text-navy hover:bg-snow focus-visible:bg-snow focus-visible:outline-none";

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 border-b border-navy/20 py-2.5 text-base text-navy focus:border-navy focus:outline-none"
      >
        {current ? (
          <current.Flag aria-hidden="true" className={flagClass} />
        ) : (
          <Globe aria-hidden="true" className="size-4 text-navy/60" />
        )}
        <span className="tabular-nums">{current ? current.code : "+"}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-navy/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute start-0 top-full z-20 mt-1 w-60 overflow-hidden rounded-xl border border-navy/10 bg-white py-1 shadow-lg shadow-navy/10"
        >
          {COUNTRIES.map((c) => {
            const selected = c.code === value;
            return (
              <li key={c.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => pick(c.code)}
                  className={option}
                >
                  <c.Flag aria-hidden="true" className={flagClass} />
                  <span className="flex-1">{names[c.id]}</span>
                  <span className="text-navy/55 tabular-nums">{c.code}</span>
                  {selected && (
                    <Check aria-hidden="true" className="size-4 text-navy" />
                  )}
                </button>
              </li>
            );
          })}
          <li role="separator" className="my-1 border-t border-navy/10" />
          <li role="option" aria-selected={value === OTHER}>
            <button
              type="button"
              onClick={() => pick(OTHER)}
              className={option}
            >
              <Globe aria-hidden="true" className="size-4 text-navy/60" />
              <span className="flex-1">{otherLabel}</span>
              {value === OTHER && (
                <Check aria-hidden="true" className="size-4 text-navy" />
              )}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
