// Builds and serves the site locally as if it were the production domain, so
// Lighthouse shows the real SEO score. (The dev server and previews are
// deliberately noindex, which Lighthouse reports as "Page is blocked from indexing".)
//
// Usage: npm run preview:prod            → http://localhost:3000
//        npm run preview:prod -- 3124    → another port
import { spawnSync, spawn } from "node:child_process";

const port = process.argv[2] || "3000";
const url = `http://localhost:${port}`;
const env = { ...process.env, NEXT_PUBLIC_SITE_URL: url, PRODUCTION_SITE_URL: url };
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

// `npm run build` so the prebuild step (icons + share images) runs too.
const build = spawnSync(npm, ["run", "build"], { env, stdio: "inherit", shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);

console.log(`\nProduction preview: ${url}/ar  (Ctrl+C to stop)\n`);
spawn(npx, ["next", "start", "-p", port], { env, stdio: "inherit", shell: true });
