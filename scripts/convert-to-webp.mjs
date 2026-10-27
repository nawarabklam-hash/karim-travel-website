// Converts every JPG/PNG under public/images to WebP, rewrites the paths in the
// source code, and deletes images that nothing references.
//
//   npm run images:webp                 convert + update paths + delete unused
//   npm run images:webp -- --dry-run    show what would happen, change nothing
//   npm run images:webp -- --keep       keep the original files
//   npm run images:webp -- --quality=85 WebP quality (default 80)
//
// Not touched: public/og/** and app/icon.png, app/apple-icon.png, app/favicon.ico
// (share images and icons must stay PNG/ICO; they come from generate-images.mjs).
import { createRequire } from "node:module";
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const sharp = require("sharp");

const IMAGES_DIR = join(root, "public/images");
const URL_PREFIX = "/images/";
const SOURCE_DIRS = ["app", "components", "content", "lib", "hooks", "messages"];
const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css"]);
const CONVERTIBLE = new Set([".jpg", ".jpeg", ".png"]);

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const keep = args.includes("--keep");
const qualityArg = args.find((a) => a.startsWith("--quality="));
const quality = qualityArg ? Number(qualityArg.split("=")[1]) : 80;
if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
  console.error("--quality must be a number between 1 and 100");
  process.exit(1);
}

function walk(dir, filter) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

const toUrl = (file) => URL_PREFIX + relative(IMAGES_DIR, file).split(sep).join("/");
const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

const sourceFiles = SOURCE_DIRS.flatMap((d) =>
  walk(join(root, d), (f) => SOURCE_EXT.has(extname(f).toLowerCase())),
);
const sources = new Map(sourceFiles.map((f) => [f, readFileSync(f, "utf8")]));

// A file counts as used when its URL appears as a string literal, not in a comment.
// Comments are stripped so a mention like "// Spare photo: /images/x.jpg" doesn't count.
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}
const code = [...sources.values()].map(stripComments).join("\n");

const allImages = walk(IMAGES_DIR, (f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f));

// A path counts as used if it appears in code under its current name or as its
// .webp name (code may already point at the .webp before the file is converted).
const withWebp = (url) => url.replace(/\.(jpe?g|png)$/i, ".webp");
const isUsed = (file) => {
  const url = toUrl(file);
  return code.includes(url) || code.includes(withWebp(url));
};

const unused = allImages.filter((f) => !isUsed(f));
const used = allImages.filter((f) => isUsed(f));
const toConvert = used.filter((f) => CONVERTIBLE.has(extname(f).toLowerCase()));

console.log(`${dryRun ? "[dry run] " : ""}${allImages.length} images found: ${used.length} used, ${unused.length} unused\n`);

// 1) Delete unused images
for (const file of unused) {
  console.log(`delete (unused)  ${toUrl(file)}`);
  if (!dryRun) rmSync(file);
}

// 2) Convert used images
let before = 0;
let after = 0;
const renames = new Map(); // old url -> new url
for (const file of toConvert) {
  const target = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const input = statSync(file).size;
  if (dryRun) {
    console.log(`convert          ${toUrl(file)} -> .webp`);
    before += input;
    continue;
  }
  await sharp(file).rotate().webp({ quality }).toFile(target);
  const output = statSync(target).size;
  before += input;
  after += output;
  renames.set(toUrl(file), toUrl(target));
  console.log(`convert          ${toUrl(file)}  ${kb(input)} -> ${kb(output)}`);
  if (!keep) rmSync(file);
}

// 3) Rewrite paths in the source code
let rewritten = 0;
if (!dryRun) {
  for (const [file, text] of sources) {
    let next = text;
    for (const [from, to] of renames) next = next.split(from).join(to);
    if (next !== text) {
      writeFileSync(file, next);
      rewritten++;
    }
  }
}

// 4) Verify every referenced image exists on disk
const missing = [];
if (!dryRun) {
  const referenced = new Set();
  for (const file of sourceFiles) {
    const text = stripComments(readFileSync(file, "utf8"));
    for (const m of text.matchAll(/["'`](\/images\/[^"'`\s]+?\.(?:jpe?g|png|webp|avif|gif|svg))["'`]/gi)) {
      referenced.add(m[1]);
    }
  }
  for (const url of referenced) {
    if (!existsSync(join(root, "public", url))) missing.push(url);
  }
}

console.log("\n--- Summary ---");
console.log(`deleted unused : ${unused.length}`);
console.log(`converted      : ${toConvert.length}${dryRun ? " (planned)" : ""}`);
if (!dryRun && toConvert.length) {
  console.log(`size           : ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
  console.log(`files updated  : ${rewritten}`);
}
if (missing.length) {
  console.error(`\nMISSING files referenced in code:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}
