import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];

export const directionOf = (locale: AppLocale) =>
  locale === "ar" ? "rtl" : "ltr";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
