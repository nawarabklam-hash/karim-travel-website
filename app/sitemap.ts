import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { navItems } from "@/components/layout/navItems";
import { pageUrl } from "@/lib/seo";
import { trips } from "@/content/trips";

/** Every page × every locale, each with its hreflang alternates (+ x-default). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...navItems.map(({ href }) => (href === "/" ? "" : href)),
    ...trips.map(({ slug }) => `/trips/${slug}`),
  ];
  // Build time: the site is static, so this is when its content last changed.
  const lastModified = new Date();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, pageUrl(l, path)]),
          ),
          "x-default": pageUrl(routing.defaultLocale, path),
        },
      },
    })),
  );
}
