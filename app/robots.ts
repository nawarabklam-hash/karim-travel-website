import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site";

/** Production: crawl everything except /api/. Previews/staging: crawl nothing. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
