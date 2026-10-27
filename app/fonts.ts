import localFont from "next/font/local";

// Every font is self-hosted from app/fonts/ (no download from Google at dev,
// build or run time — an offline dev server used to fall back to plain fonts).
// Keep font files here, never in public/. Licences (OFL) sit next to the files.

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
export const arefRuqaa = localFont({
  src: [{ path: "./fonts/web/ArefRuqaa-Bold.ttf", weight: "700" }],
  variable: "--font-ruqaa",
  display: "swap",
  fallback: ["serif"],
});

/** IBM Plex Sans Arabic (OFL) — body text on the info page (`font-plex`). */
export const plexArabic = localFont({
  src: [
    { path: "./fonts/plex/IBMPlexSansArabic-Regular.ttf", weight: "400" },
    { path: "./fonts/web/IBMPlexSansArabic-Medium.ttf", weight: "500" },
    { path: "./fonts/plex/IBMPlexSansArabic-SemiBold.ttf", weight: "600" },
  ],
  variable: "--font-ibm-plex",
  // Secondary face: not preloaded, so it doesn't compete with the page's main image and text.
  preload: false,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Tajawal (OFL) — explanation points in the info page tiles (`font-tajawal`). */
export const tajawal = localFont({
  src: [
    { path: "./fonts/web/Tajawal-Regular.ttf", weight: "400" },
    { path: "./fonts/web/Tajawal-Medium.ttf", weight: "500" },
  ],
  variable: "--font-tajawal-face",
  preload: false,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Readex Pro (OFL, variable 160–700) — modern face for the About page stats (`font-readex`). */
export const readexPro = localFont({
  src: [{ path: "./fonts/web/ReadexPro-Variable.ttf", weight: "160 700" }],
  variable: "--font-readex-face",
  preload: false,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const fontVariables = `${dinNext.variable} ${arefRuqaa.variable} ${plexArabic.variable} ${tajawal.variable} ${readexPro.variable}`;
