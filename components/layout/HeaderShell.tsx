"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/routing";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { siteContainer, siteGutter } from "./container";

/**
 * Fixed header that slides away on scroll down and back on scroll up.
 * Home: frosted glass over the hero while at the top, solid navy once scrolled.
 * Other pages: solid navy, with a spacer so content starts below the bar
 * (photo banners pull themselves up under it with a matching negative margin).
 * While the mobile menu is open the page can't scroll, so the bar never hides then.
 */
export default function HeaderShell({ children }: { children: ReactNode }) {
  const isHome = usePathname() === "/";
  const { hidden, atTop } = useScrollDirection();
  const glass = isHome && atTop;

  return (
    <>
      <header
        className={`${siteGutter} fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isHome ? "pt-4 sm:pt-6" : "pt-3 sm:pt-4"
        } ${hidden ? "-translate-y-[120%]" : "translate-y-0"}`}
      >
        <div className={siteContainer}>
          <div
            className={`relative flex h-16 items-center justify-between gap-4 rounded-full border ps-5 pe-2 transition-colors duration-300 motion-reduce:transition-none sm:h-[4.5rem] sm:ps-7 sm:pe-5 md:grid md:grid-cols-[1fr_auto_1fr] ${
              glass
                ? "border-white/20 bg-navy/30 shadow-lg shadow-black/10 backdrop-blur-xl"
                : "border-navy bg-navy shadow-lg shadow-navy/20"
            }`}
          >
            {children}
          </div>
        </div>
      </header>

      {/* Same height as the bar (pt + h): 4.75rem / 5.5rem from sm */}
      {!isHome && (
        <div aria-hidden="true" className="h-[4.75rem] sm:h-[5.5rem]" />
      )}
    </>
  );
}
