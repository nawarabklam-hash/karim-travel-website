# Travel site (Karim)

Bilingual (Arabic / English) marketing site for a travel company specialized in trips to Russia. Next.js (App Router) + TypeScript + Tailwind CSS + next-intl. See `CLAUDE.md` for the full project rules.

## Development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000 → redirects to /ar
```

- `npm run build` — production build. It first runs `npm run images` (prebuild).
- `npm run images:webp` — converts every JPG/PNG in `public/images/` to WebP, updates the paths in the code, and deletes images nothing references. Run it after adding photos. Options: `-- --dry-run` (preview), `-- --keep` (keep originals), `-- --quality=85`.
- `npm run images` — regenerates the site icons (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`) and the share images (`public/og/<locale>/<page>.png`). Run it after changing the brand name (`site.name` in `messages/*.json`), a page title (`meta.*`), or the logo.
- `npm run preview:prod` — builds and serves the site on http://localhost:3000 as if it were the production domain. Use it for Lighthouse: the dev server is deliberately `noindex`, so its SEO score is lower ("Page is blocked from indexing").
- `npm run lint`

### Logo

Put the client's logo at `public/logo/logo.svg` (or `logo.png`) and run `npm run images`. Until then the icons use a temporary navy square with the first letter of `site.name`.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of this deployment (canonical, sitemap, share images) |
| `PRODUCTION_SITE_URL` | The real domain. Only when it equals `NEXT_PUBLIC_SITE_URL` is the site indexable |
| `GOOGLE_SITE_VERIFICATION` | Search Console meta-tag token (optional if verified by DNS) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form emails |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (optional) |

## Launch checklist

1. **Google Search Console** — add the site. Preferred: a **Domain property** verified with a **DNS TXT record** at the domain registrar (covers www and non-www). Alternative: a URL-prefix property verified with the meta tag — set `GOOGLE_SITE_VERIFICATION` and redeploy.
2. **Sitemap** — in Search Console, submit `https://<domain>/sitemap.xml`.
3. **Resend** — add the domain in Resend and add its DNS records (SPF/DKIM) at the registrar. Without this the contact form can't send from the domain. Set `CONTACT_FROM_EMAIL` to an address on that domain.
4. **Domain & hosting** — point the domain to the hosting (A/CNAME records). Make sure HTTPS works, `http → https` redirects with 301, and non-www → www (or the reverse) redirects with 301. Set `NEXT_PUBLIC_SITE_URL` and `PRODUCTION_SITE_URL` to the final URL.
5. **Share previews** — paste a few page URLs into WhatsApp and Telegram, and check them on opengraph.xyz or metatags.io. Validate the structured data with Google's Rich Results Test.
