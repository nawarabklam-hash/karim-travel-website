import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  compress: true,
  experimental: {
    // lucide-react ships one module per icon; this keeps only the icons actually used.
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // AVIF first (smallest), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Optimized images stay cached for 31 days (default is 60 seconds).
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async headers() {
    return [
      {
        // Photos in public/images are cached for a year: when a photo is replaced, give
        // the new file a new name (the old name stays in browsers and in the CDN).
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${YEAR}, immutable`,
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
