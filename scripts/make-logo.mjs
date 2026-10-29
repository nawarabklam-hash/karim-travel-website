// Builds the logo files the site uses from the client's original (public/logo/karim-original.png).
// The artwork is NOT redrawn or recolored — only the background is made transparent and the
// wordmark (white "Karim" letters + swoosh) is cut out of the full emblem.
//
//   node scripts/make-logo.mjs
//
// Output (public/logo/): karim-emblem.png|webp  (full logo, max 1000px wide)
//                        karim-wordmark.png|webp (letters + swoosh only, ~400px wide)
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "logo",
);
const original = join(dir, "karim-original.png");

const { data, info } = await sharp(original)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// 1) Background: flood fill from the image edges over transparent or near-black pixels.
//    Black outlines inside the artwork are never reached, so they stay. (The client's file
//    already has a transparent background, so on it this only cleans stray edge pixels.)
const isBackground = (i) => {
  const a = data[i * 4 + 3];
  const dark = data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2] < 60;
  return a < 8 || (dark && a > 8);
};
const seen = new Uint8Array(W * H);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const p = y * W + x;
  if (seen[p] || !isBackground(p)) return;
  seen[p] = 1;
  stack.push(p);
};
for (let x = 0; x < W; x++) {
  push(x, 0);
  push(x, H - 1);
}
for (let y = 0; y < H; y++) {
  push(0, y);
  push(W - 1, y);
}
while (stack.length) {
  const p = stack.pop();
  const x = p % W;
  const y = (p - x) / W;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}
const rgba = Buffer.from(data);
for (let p = 0; p < W * H; p++) {
  if (seen[p]) rgba[p * 4 + 3] = 0;
  // A faintly see-through pixel inside the art (alpha 254) becomes solid.
  else if (rgba[p * 4 + 3] >= 250) rgba[p * 4 + 3] = 255;
}
const clean = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });

// Trim the empty margin around the art.
const trimmed = await clean.png().toBuffer();
const emblemBox = await sharp(trimmed)
  .trim({ threshold: 1 })
  .toBuffer({ resolveWithObject: true });
const emblemBuf = emblemBox.data;

// The PNG is the master (used by scripts/generate-images.mjs); the WebP is what the pages load.
const save = async (buf, name, pngWidth, webpWidth, webpQuality) => {
  const png = sharp(buf).resize({ width: pngWidth, withoutEnlargement: true });
  await png
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(join(dir, `${name}.png`));
  await sharp(buf)
    .resize({ width: webpWidth, withoutEnlargement: true })
    .webp({
      quality: webpQuality,
      alphaQuality: 80,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(join(dir, `${name}.webp`));
};
// Emblem: 1000px PNG, 800px WebP (under 80 KB; it is never shown larger than ~200 CSS px).
await save(emblemBuf, "karim-emblem", 1000, 800, 66);

// 2) Wordmark: the bottom part of the logo. The cathedral, trees and clouds sit on the same
//    blue plate as the letters, so the cut follows the top edge of the plate (coordinates are
//    in the original 1243x1265 picture), plus a circle that keeps the dot of the "i".
const keep = [
  [60, 800],
  [197, 800],
  [197, 853],
  [322, 853],
  [322, 828],
  [418, 828],
  [418, 884],
  [470, 880],
  [500, 872],
  [550, 858],
  [640, 851],
  [720, 853],
  [720, 884],
  [822, 884],
  [822, 900],
  [1000, 900],
  [1000, 913],
  [1243, 913],
  [1243, 1265],
  [60, 1265],
];
const dot = { cx: 873, cy: 872, r: 46 };
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="black"/>
  <polygon fill="white" points="${keep.map((p) => p.join(",")).join(" ")}"/>
  <circle fill="white" cx="${dot.cx}" cy="${dot.cy}" r="${dot.r}"/>
</svg>`;
const mask = await sharp(Buffer.from(maskSvg)).greyscale().raw().toBuffer();
const cut = Buffer.from(rgba);
for (let p = 0; p < W * H; p++) if (mask[p] < 128) cut[p * 4 + 3] = 0;
const wordmark = await sharp(cut, { raw: { width: W, height: H, channels: 4 } })
  .png()
  .toBuffer();
const wmTrim = await sharp(wordmark).trim({ threshold: 1 }).toBuffer();
await save(wmTrim, "karim-wordmark", 400, 400, 80);

for (const f of [
  "karim-emblem.png",
  "karim-emblem.webp",
  "karim-wordmark.png",
  "karim-wordmark.webp",
]) {
  const m = await sharp(join(dir, f)).metadata();
  console.log(f.padEnd(22), `${m.width}x${m.height}`);
}
