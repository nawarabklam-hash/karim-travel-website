// Builds the small WOFF2 files the site actually serves (app/fonts/woff2/) from the
// original TTFs next to them. Only the open-license (OFL) fonts are converted:
// DIN Next LT Arabic stays as it is until the web license is bought (see app/fonts.ts).
//
//   npm run fonts:woff2
//
// What is kept: Basic Latin + Latin-1, punctuation and currency signs, the Arabic letters,
// diacritics and digits (+ the few Persian/Urdu letters Arabic text sometimes has), and the
// joiners (U+200C-200F). The font's own shaping rules are kept, so Arabic joins and
// ligatures render exactly the same. If new text ever needs another character, add its
// range below and run the script again (a missing character falls back to a system font).
// OFL note: these are modified versions, so they get neutral file names and CSS family
// names (see app/fonts.ts) instead of the originals (IBM Plex reserves the name "Plex",
// Aref Ruqaa "EURM10", Readex Pro "RevReading Lexend"). The font files still carry their
// original internal name table — rewrite it (e.g. with fontTools) before ever offering
// them for download; for web use through CSS only the family name above matters.
import subsetFont from "subset-font";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "app",
  "fonts",
);
const outDir = join(root, "woff2");
mkdirSync(outDir, { recursive: true });

const ranges = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x2010, 0x2027],
  [0x2030, 0x205e],
  [0x20a0, 0x20bf],
  [0x2190, 0x2193],
  [0x2212, 0x2212],
  [0x2022, 0x2022],
  [0x200c, 0x200f],
  [0x060c, 0x060c],
  [0x061b, 0x061b],
  [0x061f, 0x061f],
  [0x0621, 0x063a],
  [0x0640, 0x0652],
  [0x0660, 0x066d],
  [0x067e, 0x067e],
  [0x0686, 0x0686],
  [0x0698, 0x0698],
  [0x06a9, 0x06a9],
  [0x06af, 0x06af],
  [0x06cc, 0x06cc],
  [0x06c0, 0x06c0],
  [0x06f0, 0x06f9],
  [0x00b0, 0x00b0],
];
let text = "";
for (const [a, b] of ranges)
  for (let c = a; c <= b; c++) text += String.fromCodePoint(c);

const fonts = [
  { src: "plex/IBMPlexSansArabic-Regular.ttf", out: "text-regular.woff2" },
  { src: "web/IBMPlexSansArabic-Medium.ttf", out: "text-medium.woff2" },
  { src: "plex/IBMPlexSansArabic-SemiBold.ttf", out: "text-semibold.woff2" },
  { src: "web/ArefRuqaa-Bold.ttf", out: "title-bold.woff2" },
  { src: "web/Tajawal-Regular.ttf", out: "note-regular.woff2" },
  { src: "web/Tajawal-Medium.ttf", out: "note-medium.woff2" },
  // Variable font: the site uses weights 400-700 only.
  {
    src: "web/ReadexPro-Variable.ttf",
    out: "stats-variable.woff2",
    axes: { wght: { min: 400, max: 700 } },
  },
];

let before = 0;
let after = 0;
for (const f of fonts) {
  const buf = readFileSync(join(root, f.src));
  const out = await subsetFont(buf, text, {
    targetFormat: "woff2",
    ...(f.axes ? { variationAxes: f.axes } : {}),
  });
  writeFileSync(join(outDir, f.out), out);
  before += buf.length;
  after += out.length;
  console.log(
    f.out.padEnd(28),
    `${Math.round(buf.length / 1024)} KB -> ${Math.round(out.length / 1024)} KB`,
  );
}
console.log(
  `total ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`,
);
