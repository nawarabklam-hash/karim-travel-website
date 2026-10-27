import arMessages from "@/messages/ar.json";

/** Public site URL without a trailing slash. Set NEXT_PUBLIC_SITE_URL at launch. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Brand name: one key (`site.name`, same in both languages). Never hard-code it. */
export const brandName = arMessages.site.name;

/**
 * Index the site only on the real production domain. Preview/staging builds
 * (any other NEXT_PUBLIC_SITE_URL, or no PRODUCTION_SITE_URL) get noindex.
 */
export const isProduction =
  !!process.env.PRODUCTION_SITE_URL &&
  siteUrl === process.env.PRODUCTION_SITE_URL.replace(/\/$/, "");

/** Host shown on share images, e.g. "www.russia-4u.com". */
export const siteHost = siteUrl.replace(/^https?:\/\//, "");
