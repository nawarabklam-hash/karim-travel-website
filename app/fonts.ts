import localFont from "next/font/local";

// Every font is self-hosted from app/fonts/ (no download from Google at dev,
// build or run time — an offline dev server used to fall back to plain fonts).
// Keep font files here, never in public/. Licences (OFL) sit next to the files.
// The open-license fonts are served from small subsetted WOFF2 files (app/fonts/woff2/,
// built from the TTFs by `npm run fonts:woff2`); DIN stays a TTF until the web license.

// DIN Next LT Arabic (Arabic + Latin), used for the whole site.
// TODO before launch: the current file carries a desktop-only Linotype license.
// Buy a web license from Monotype and add the Medium/Bold weights; until then
// bold text is synthesized by the browser.
export const dinNext = localFont({
  src: [{ path: "./fonts/din/DINNextLTArabic-Regular.ttf", weight: "400" }],
  variable: "--font-din-next",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Ruqaa calligraphy (OFL) — hero and section titles (`font-calligraphy`). */
export const titleCalligraphy = localFont({
  src: [{ path: "./fonts/woff2/title-bold.woff2", weight: "700" }],
  variable: "--font-ruqaa",
  display: "swap",
  fallback: ["serif"],
});

/** IBM Plex Sans Arabic (OFL) — body text on the info page (`font-plex`). */
export const textArabic = localFont({
  src: [
    { path: "./fonts/woff2/text-regular.woff2", weight: "400" },
    { path: "./fonts/woff2/text-medium.woff2", weight: "500" },
    { path: "./fonts/woff2/text-semibold.woff2", weight: "600" },
  ],
  variable: "--font-text-face",
  // Secondary face: not preloaded, so it doesn't compete with the page's main image and text.
  preload: false,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Tajawal (OFL) — explanation points in the info page tiles (`font-tajawal`). */
export const noteArabic = localFont({
  src: [
    { path: "./fonts/woff2/note-regular.woff2", weight: "400" },
    { path: "./fonts/woff2/note-medium.woff2", weight: "500" },
  ],
  variable: "--font-note-face",
  preload: false,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Readex Pro (OFL, variable, weights 400–700 kept) — modern face for the About page stats (`font-readex`). */
export const statsFont = localFont({
  src: [{ path: "./fonts/woff2/stats-variable.woff2", weight: "400 700" }],
  variable: "--font-stats-face",
  preload: false,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const fontVariables = `${dinNext.variable} ${titleCalligraphy.variable} ${textArabic.variable} ${noteArabic.variable} ${statsFont.variable}`;
