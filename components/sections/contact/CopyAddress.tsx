"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies the full office address; shows "Copied" for 2 seconds. */
export default function CopyAddress({
  address,
  label,
  copiedLabel,
  onDark = false,
}: {
  address: string;
  label: string;
  copiedLabel: string;
  /** White outline for use over a photo or a navy background. */
  onDark?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): leave the button as is.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
        onDark
          ? "border-white/70 text-white hover:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-navy"
          : "border-navy text-navy hover:bg-snow focus-visible:ring-navy"
      }`}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
