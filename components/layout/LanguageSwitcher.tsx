"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, type AppLocale } from "@/i18n/routing";

const className =
  "rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white";

function useTarget() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("languageSwitcher");
  return {
    pathname: usePathname(),
    target: (locale === "ar" ? "en" : "ar") as AppLocale,
    label: t("label"),
    ariaLabel: t("ariaLabel"),
  };
}

/** Keeps the current page and its query params (e.g. ?type=winter). */
function SwitcherWithQuery() {
  const { pathname, target, label, ariaLabel } = useTarget();
  const query = Object.fromEntries(useSearchParams());

  return (
    <Link
      href={{ pathname, query }}
      locale={target}
      hrefLang={target}
      aria-label={ariaLabel}
      className={className}
    >
      {label}
    </Link>
  );
}

function SwitcherWithoutQuery() {
  const { pathname, target, label, ariaLabel } = useTarget();

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      aria-label={ariaLabel}
      className={className}
    >
      {label}
    </Link>
  );
}

export default function LanguageSwitcher() {
  return (
    <Suspense fallback={<SwitcherWithoutQuery />}>
      <SwitcherWithQuery />
    </Suspense>
  );
}
