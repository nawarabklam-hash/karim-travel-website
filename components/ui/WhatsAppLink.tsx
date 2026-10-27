"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { whatsappLink } from "@/lib/links";

type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel" | "onClick"
> & {
  /** Pre-filled message. */
  message?: string;
  /** Where on the site the click happened, sent with the GA event. */
  location: string;
  /** Extra GA parameters, e.g. { trip: "moscow-cabins" }. */
  params?: Record<string, string>;
};

/** WhatsApp link that records the click as a GA4 conversion event. */
export default function WhatsAppLink({
  message,
  location,
  params,
  children,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        // No-op when GA isn't loaded (no NEXT_PUBLIC_GA_ID).
        if (typeof window !== "undefined" && "gtag" in window) {
          sendGAEvent("event", "whatsapp_click", { location, ...params });
        }
      }}
    >
      {children}
    </a>
  );
}
