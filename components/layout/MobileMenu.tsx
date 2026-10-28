"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { navItems } from "./navItems";

const noopSubscribe = () => () => {};

/**
 * Side drawer for small screens: slides in from the start edge (right in Arabic,
 * left in English) over a dimmed backdrop. Rendered into <body> because the header
 * bar uses backdrop-blur, which would otherwise trap `position: fixed` inside it.
 */
export default function MobileMenu() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t("nav.openMenu")}
        className="flex size-12 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {isClient &&
        createPortal(
          <div className="md:hidden">
            <div
              aria-hidden="true"
              onClick={close}
              className={`fixed inset-0 z-[55] bg-black/60 transition-opacity duration-300 motion-reduce:transition-none ${
                // The blur layer exists only while the menu is open (no GPU layer on every page).
                open
                  ? "opacity-100 backdrop-blur-sm"
                  : "pointer-events-none opacity-0"
              }`}
            />

            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.label")}
              inert={!open}
              className={`fixed inset-y-0 start-0 z-[60] flex w-[80%] max-w-[360px] flex-col bg-navy p-5 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                // The shadow only while open: closed, the panel waits just off the edge
                // and its shadow would show as a gray strip on every page.
                open
                  ? "translate-x-0 shadow-2xl"
                  : "ltr:-translate-x-full rtl:translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-bold text-white">
                  {t("site.name")}
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={t("nav.closeMenu")}
                  className="flex size-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
                >
                  <X className="size-6" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label={t("nav.label")} className="mt-8 flex-1">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block rounded-xl px-4 py-3.5 text-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
