# CLAUDE.md

## Project overview

Bilingual (Arabic / English) marketing website for an Arab-run travel company specialized in trips to Russia (office in Ajman, UAE, operating since 2018). Saint Petersburg is a destination, not the office.

The site's single goal: **turn visitors into leads who contact the company directly on WhatsApp.** No Telegram and no Instagram anywhere on the site (client decision). There is no online booking, no payments, no user accounts, and no admin dashboard. Anything like that is out of scope (see "Out of scope").

- Client deliverable by: Deep Code (Damascus)
- Timeline: 20 working days total; this repo covers UI build, programming, testing and launch
- Visual identity (logo) is provided by the client — do not redesign it

## Tech stack

- **Next.js** (App Router) + **TypeScript** — standard server-side Next.js running as a Node.js server. **Do not** use `output: 'export'`.
- The project was created with `create-next-app` recommended defaults. If an `AGENTS.md` exists, keep it and read it alongside this file — it holds guidance for the installed Next.js version.
- **Tailwind CSS** (v4: theme tokens defined with `@theme` in `app/globals.css`)
- **next-intl** for i18n
- **Resend** for sending contact form emails (requires domain verification at launch)

## First setup tasks (do these before any page work)

1. In `next.config.ts`, **turn off Cache Components** (remove `cacheComponents: true` or set it to `false`). Not needed for this site and it complicates next-intl.
2. Install and configure **next-intl** following the routing rules in "Languages & direction" below. Next.js 16 names the middleware file `proxy.ts` — check the installed version and follow next-intl's current docs.
3. Load **DIN Next LT Arabic** (local file, Arabic + Latin) with `next/font/local` in `app/fonts.ts`.
4. Add the color tokens from "Design system" to Tailwind's `@theme`.
5. Build the shared layout: Header (logo + nav + language switcher), Footer, floating WhatsApp button, bilingual 404 page.
6. Run `npm run build` and `npm run lint` and fix all errors before moving on.

Then build pages one at a time, starting with Home, and **stop for review after each page**.

## Languages & direction

- Locales: `ar` (default) and `en`.
- **Every URL carries the locale prefix** (`localePrefix: 'always'`): `/ar/about`, `/en/about`. Visiting `/` redirects to `/ar`.
- **No browser-language detection** (`localeDetection: false`): first-time visitors always land on Arabic. Users switch manually.
- Arabic is RTL, English is LTR. Set `lang` and `dir` on `<html>` per locale.
- Language switcher in the header keeps the user on the equivalent page (and keeps query params such as the events filter).
- Use Tailwind **logical properties** (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`) — never `ml/mr/pl/pr/left/right` for layout. Directional icons (arrows, chevrons) must flip in RTL.
- All user-facing UI text lives in `messages/ar.json` and `messages/en.json`. No hard-coded strings in components.

## Design system

White is the base of the identity; blue and red (from the Russian flag, softened) are accents.

| Token | Hex | Use |
|---|---|---|
| `white` | `#FFFFFF` | Main background (~70% of the UI) |
| `snow` | `#F5F7FA` | Alternate section backgrounds |
| `navy` | `#0B2A5B` | Headings, body text, logo, footer background |
| `red` | `#C8202F` | Primary buttons, service icons, highlights — use sparingly (~10%) |
| `whatsapp` | `#25D366` | Floating WhatsApp button only |

- If the client's logo uses different shades of blue/red, **the logo's exact colors win** — update the tokens.
- Font: **DIN Next LT Arabic** for the whole site (`font-sans`, `font-display`), loaded with `next/font/local` from `app/fonts/din/`. Keep font files out of `public/`.
- **All fonts are self-hosted** with `next/font/local` (`app/fonts/din`, `app/fonts/plex`, `app/fonts/web`): Aref Ruqaa (titles, `font-calligraphy`), IBM Plex Sans Arabic, Tajawal, Readex Pro. Never use `next/font/google` — when offline it silently falls back to plain fonts.
- Photography (Moscow, Saint Petersburg, Sochi, Murmansk) carries the color and mood; keep UI chrome clean and white.
- Mobile-first. Must look excellent on mobile, tablet and desktop.

## Animations

- **One system:** Motion (`motion` package) with `LazyMotion` + named `m` elements only. Every variant/timing lives in `lib/motion/presets.ts`; components in `components/motion/`: `Reveal` (any variant, once, `trigger="view"|"mount"`), `Stagger`/`StaggerItem`, `KenBurns` + `WordReveal` (every hero), `Parallax`, `Float`, `CountUp`, `GrowLine`. No CSS `@keyframes`, no `animate-*`, no IntersectionObserver hooks.
- Import each component from its own file (not the `index.ts` barrel) and elements by name (`import { div as MDiv } from "motion/react-m"`), never `import * as m`.
- `MotionProvider` wraps the five animated pages (home, about, events, info, contact) and the trip detail pages (photo gallery `components/trips/TripGallery.tsx`: photos slide in from the edge they sit closest to, logical directions; section titles word by word and the hotel/service cards one after another via `GridReveal`; the sticky booking card stays static), never the layout. Features load when the browser is idle.
- **Directions are logical** (`slideStart/End`, `clipStart/End`): start = right in Arabic, left in English.
- `WordReveal` splits by WORDS only (Arabic letters must stay joined). Clip reveals are watched from an unclipped wrapper (a fully clipped element never counts as visible).
- Every animated element carries `data-motion`; CSS in `app/globals.css` (and a `<noscript>` in the layout) shows them at once for `prefers-reduced-motion` / no JS. Never put `data-motion` on elements that must stay hidden (e.g. hero slider slides).
- **Once per page per session:** entrance animations play on a page's first visit in the browser session only (`lib/motion/seen.ts`, sessionStorage per path). A seen page sets `data-motion-seen` on `<html>` before first paint, so it shows at once and skips Motion work. A reload (F5 / reload button) counts as a fresh visit and animates again. Don't add animations that rely on replaying on every visit.
- Hover effects and the header hide-on-scroll stay CSS; entrance animations come only from this kit.

## Pages

1. **Home** (`/[locale]`) — intro, the 5 services (car rental, hotel bookings, tour programs, visa issuance, study services), featured events, main destinations (Moscow, Saint Petersburg, Sochi, Murmansk)
2. **About** (`/[locale]/about`) — company story since 2018, office in Ajman (UAE), official licensing info (trust)
3. **Events** (`/[locale]/events`) — card per event (image, type, title, duration, distance from city center). Cards are display-only by client decision (no link, no hover, no per-card button); booking goes through the floating WhatsApp button. Descriptions stay in `content/events.ts` for later.
   - **Filter by event type is stored in the URL** as a search param (`/ar/events?type=winter`) so shared links open with the same filter. No client-only filter state.
   - **No event detail pages** for now (matches the offer). Give every event a stable `slug` so detail pages can be added later without restructuring data.
4. **Important info** (`/[locale]/info`) — climate, currency, payment methods, power outlets, city info. Organized and clear, no repeated content
5. **Contact** (`/[locale]/contact`) — WhatsApp, email, office address (Ajman, UAE), contact form
   - **Clean white, no hero photo** (no `KenBurns` here; the only photo is the Gulf skyline covering the office card, `public/images/contact/gulf-skyline.webp`, Dubai by Leon Macapagal, Unsplash License): centered header, two channel cards (WhatsApp navy, email white), then office card + form (form first on mobile). Colors via tokens `line` (card borders) and `field` (form underlines); red only on the eyebrow and the submit button, WhatsApp green only on the WhatsApp card icon. No phone-call card by client decision.
   - **No map** (no Google Maps embed or link) — the office card shows the address with a copy button. No Instagram anywhere.

Global: floating WhatsApp button on every page; direct booking/contact buttons on services and events. A **bilingual 404 page** in the site's design.

## Trips (offer packages)

There are 4 trips (from the client's 4 posters). Each trip has a card and a detail page. Never use the posters as images on the site — rebuild their content as designed UI.

### Trip card (list page)
- Cover photo matching the trip (e.g. Moscow trip → photo of Moscow city)
- Trip title, as written on the poster
- "See more" button → detail page
- The cards are listed in the "Tour programs" section on Home, right before "Our services" (`components/sections/home/Trips.tsx`, card in `components/trips/TripCard.tsx`).

### Trip detail page (`/[locale]/trips/[slug]`)
- Gallery of 3–4 photos related to the trip (e.g. cabins trip → cabin photos)
- Accommodation: hotel name, stars, board (e.g. breakfast included), city
- Included services (icon + text list)
- Extra services (icon + text list)
- WhatsApp booking button with a pre-filled message naming the trip
- `generateStaticParams` for all trips; per-trip metadata (title, description, OG image)

### Data
- All trips live in `content/trips.ts` as typed data with `ar` / `en` fields:
  slug, title, city, coverImage, gallery[], hotels[], included[], extras[]
- Adding a new trip = adding one entry. No component changes.
- All trips use the same card and the same detail page template.

This replaces "No event detail pages" in Out of scope — trip detail pages ARE in scope.

## Contact form

- Implemented as a **Server Action** that validates input on the server and sends the message to the company's email via **Resend**.
- Fields: name, phone/WhatsApp, email (optional), message.
- **Spam protection with a honeypot field** (hidden input; reject if filled). No CAPTCHA.
- Show clear success / error states in both languages.
- Secrets in environment variables only (`.env.local`, never committed). Provide `.env.example` with:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`

## Analytics

- **Google Analytics 4** via `@next/third-parties/google`, loaded only when `NEXT_PUBLIC_GA_ID` is set (add it to `.env.example`).
- Track clicks on every WhatsApp button as GA events (`whatsapp_click` with a `location`) via `components/ui/WhatsAppLink.tsx` — these are the site's conversions.

## Suggested structure

```
app/
  [locale]/
    layout.tsx
    page.tsx            # Home
    about/page.tsx
    events/page.tsx
    info/page.tsx
    contact/page.tsx
    not-found.tsx
  actions/
    contact.ts          # Server Action
components/
  layout/               # Header, Footer, LanguageSwitcher, WhatsAppFloat
  ui/                   # Button, Card, Section, etc.
  sections/             # Page-specific sections
content/
  events.ts             # Event data (bilingual fields, slug, type)
  services.ts
  destinations.ts
  contact.ts            # Phone numbers, links — single source of truth
i18n/
  routing.ts
  request.ts
messages/
  ar.json
  en.json
public/
  images/
  logo/
proxy.ts
```

## Conventions

- Structured content (events, services, destinations, contact details) lives in `content/` as typed TypeScript data with `ar` / `en` fields. **There is no CMS or dashboard**: adding or editing an event means editing `content/events.ts` and redeploying. Adding an event must never require touching a component.
- WhatsApp links are built with one helper (`wa.me/<number>?text=<encoded message>`) — never hand-written in components. Render WhatsApp links with `components/ui/WhatsAppLink.tsx` (it tracks the click).
- Use `next/image` for all images; compress before adding to `public/`. Photos in `public/images/` are WebP: drop the new JPG/PNG in, reference it in code, then run `npm run images:webp` (converts, rewrites paths, deletes unused images).
- All icons come from **lucide-react** — no hand-drawn inline SVGs. Exception: brand logos lucide doesn't ship (WhatsApp) live as small components in `components/ui/` (e.g. `WhatsAppIcon.tsx`).
- Server components by default; add `'use client'` only where needed (language switcher, form UI, mobile menu).

## SEO

- Unique title + meta description per page, in both languages (`generateMetadata`)
- `hreflang` alternates between `/ar` and `/en`
- `sitemap.ts` and `robots.ts`
- Open Graph image and tags
- Site will be connected to Google Search Console at launch (see README → Launch checklist)
- All per-page metadata goes through `pageMetadata()` in `lib/seo.ts`; titles/descriptions live under `meta` in `messages/*.json`
- Share images and icons are generated by `scripts/generate-images.mjs` (runs on prebuild) with sharp, because next/og spaces Arabic words badly
- Indexing only on the production domain (`PRODUCTION_SITE_URL`); previews and the dev server are noindex, so Lighthouse SEO shows ~69 there. Check the real score with `npm run preview:prod`

## Content rules

- Arabic text is rewritten cleanly: fix spelling, remove duplicated content.
- English is a proper written version, not a literal translation.
- Until real content arrives, use clearly marked placeholders (e.g. `[TODO: event description]`) — never invent licensing details, phone numbers, addresses or prices.
- **IBM Plex Sans Arabic ligature:** Plex draws a word-final "تي"/"تى" as one glyph that reads like "ق" ("التي" → "الق", "حتى" → "حق"). In Arabic text shown in Plex (about, info, contact pages) write a zero-width joiner before the last letter: `"الت\u200dي"`, `"حت\u200dى"`, `"مت\u200dى"`. Turning off the font feature (`rlig`) is not an option — it also breaks "لا".

## Out of scope

Do not build unless explicitly requested (these are a separate paid phase):
- Admin / CMS dashboard
- Online booking or payment system
- User accounts
- Event detail pages (trip detail pages are in scope, see "Trips")

## Client details

- Company: **Karim** (renamed from RUSSIA4U; same in both languages). The name lives in ONE key, `site.name` in `messages/*.json` — never hard-code it. Domain: `russia-4u.com` for now (new domain pending).
- WhatsApp: +7 993 961-11-00 · Email: info@russia-4u.com (the client will send a new one) — stored in `content/contact.ts`. No phone number in the footer.
- Office (the only one): Amberjem Tower, 26th floor, office CWS-1V-226859, Sheikh Khalifa Street, Ajman, UAE.

## Open decisions

- Logo files — pending from client (the name is currently shown as text)
- Confirm the WhatsApp number is the same line as the phone (+7 993 961-11-00)
- Office and contact details live in `content/contact.ts`. No Telegram, no Instagram. Email will change with the new domain.
- Trip photos: optional extras only — a real Radisson cruise photo and the actual cabins if the client has them. No circus photo by decision (the service list covers it with an icon). Never label a photo as one of the named hotels unless it really is that hotel; cabin photos in `public/images/cabins/` are representative.
- **Font license (blocker for launch):** the DIN Next LT Arabic file in `app/fonts/din/` has a desktop-only Linotype license. Buy a web license from Monotype before going live, and get the Medium/Bold weights at the same time (only Regular is installed; bold is browser-synthesized).
