// Generates the site icons and the per-page share (Open Graph) images.
// Runs automatically before `npm run build` (prebuild) and on `npm run images`.
//
// Why sharp and not next/og (ImageResponse): Satori measures Arabic words as
// unjoined letters, so share images got uneven gaps between words. sharp draws
// text with Pango/HarfBuzz, which shapes and spaces Arabic correctly.
//
// Icons and share images: the client's emblem (public/logo/karim-emblem.png, made by
// scripts/make-logo.mjs) on a navy square, with a safe margin around it. If the emblem is
// missing, a temporary navy square with the brand's first letter is used.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const sharp = require("sharp");
require("@next/env").loadEnvConfig(root);

const NAVY = "#0B2A5B";
const RED = "#C8202F";
const W = 1200;
const H = 630;
const FONT_BOLD = join(root, "app/fonts/plex/IBMPlexSansArabic-Bold.ttf");
const FONT_REGULAR = join(root, "app/fonts/plex/IBMPlexSansArabic-Regular.ttf");

const messages = {
  ar: JSON.parse(readFileSync(join(root, "messages/ar.json"), "utf8")),
  en: JSON.parse(readFileSync(join(root, "messages/en.json"), "utf8")),
};
const brand = messages.ar.site.name;
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.russia-4u.com"
).replace(/\/$/, "");
const host = siteUrl.replace(/^https?:\/\//, "");

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Renders text to a transparent PNG with Pango (correct Arabic shaping). */
function text(str, { size, color, bold = true, width, align = "left" }) {
  return sharp({
    text: {
      text: `<span foreground="${color}">${escape(str)}</span>`,
      font: `IBM Plex Sans Arabic ${bold ? "Bold" : ""} ${size}`,
      fontfile: bold ? FONT_BOLD : FONT_REGULAR,
      width,
      align,
      rgba: true,
      dpi: 72,
      wrap: "word",
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
}

/** Navy rounded square with the brand's first letter (temporary logo mark). */
async function letterMark(size, radius) {
  const letter = await text(brand[0].toUpperCase(), {
    size: Math.round(size * 0.62),
    color: "#FFFFFF",
  });
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/></svg>`,
  );
  return sharp(bg)
    .composite([
      {
        input: letter.data,
        left: Math.round((size - letter.info.width) / 2),
        top: Math.round((size - letter.info.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

/**
 * The brand mark: the emblem centered on a navy square. `margin` is the free space around
 * the emblem as a share of the square (0.14 = 14% on each side; app icons keep a wider one so
 * nothing is cut by rounded or masked icon shapes). No black anywhere — the emblem is
 * transparent and the square is navy.
 */
async function brandMark(size, radius, margin = 0.14) {
  const logo = join(root, "public/logo/karim-emblem.png");
  if (!existsSync(logo)) return letterMark(size, radius);
  const inner = Math.round(size * (1 - margin * 2));
  const emblem = await sharp(logo)
    .resize(inner, inner, { fit: "inside", kernel: "lanczos3" })
    .png()
    .toBuffer({ resolveWithObject: true });
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/></svg>`,
  );
  return sharp(bg)
    .composite([
      {
        input: emblem.data,
        left: Math.round((size - emblem.info.width) / 2),
        top: Math.round((size - emblem.info.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

/** ICO container holding one PNG (supported by every modern browser). */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset
  return Buffer.concat([header, png]);
}

async function icons() {
  writeFileSync(join(root, "app/icon.png"), await brandMark(512, 0, 0.16));
  writeFileSync(
    join(root, "app/apple-icon.png"),
    await brandMark(180, 0, 0.16),
  );
  writeFileSync(
    join(root, "app/favicon.ico"),
    pngToIco(await brandMark(32, 0, 0.04), 32),
  );
}

/** 1200×630: brand at the top, big page title, navy bar with the domain. */
async function shareImage(locale, title, file) {
  const rtl = locale === "ar";
  const pad = 80;
  const markSize = 112;
  const mark = await brandMark(markSize, 20, 0.08);
  const heading = await text(title, {
    size: 66,
    color: NAVY,
    width: W - pad * 2,
    align: rtl ? "right" : "left",
  });
  const domain = await text(host, { size: 28, color: "#FFFFFF", bold: false });

  // Start side = right in Arabic, left in English.
  const x = (w) => (rtl ? W - pad - w : pad);
  const barH = 96;
  const titleTop = Math.round((H - barH - 190 - heading.info.height) / 2 + 190);

  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="#FFFFFF"/>
      <rect x="${rtl ? W - pad - 56 : pad}" y="${titleTop - 28}" width="56" height="6" rx="3" fill="${RED}"/>
      <rect y="${H - barH}" width="${W}" height="${barH}" fill="${NAVY}"/>
    </svg>`,
  );
  const markX = x(markSize);

  await sharp(bg)
    .composite([
      { input: mark, left: markX, top: 44 },
      { input: heading.data, left: x(heading.info.width), top: titleTop },
      {
        input: domain.data,
        left: x(domain.info.width),
        top: H - barH + Math.round((barH - domain.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(file);
}

async function shareImages() {
  for (const locale of ["ar", "en"]) {
    const dir = join(root, "public/og", locale);
    mkdirSync(dir, { recursive: true });
    for (const page of ["home", "about", "events", "info", "contact"]) {
      await shareImage(
        locale,
        messages[locale].meta[page].title,
        join(dir, `${page}.png`),
      );
    }
  }
}

await icons();
await shareImages();
console.log(`images: icons + share images for "${brand}" (${host})`);
