# ViliParka — Вилни къщи „Парка“, Сапарева баня

Marketing site for **Вилни къщи „Парка“** (Guest Houses Parka): four self-contained holiday
houses sharing one garden with a warm mineral pool, in the centre of Sapareva Banya, Bulgaria.

Live at [parka-villas.com](https://parka-villas.com/). Replaces the old Nicepage export at
[vilnikashtiparka.com](https://vilnikashtiparka.com/), from which the photography and the
factual details (houses, capacities, rates, contacts) were taken.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind v4 is installed for its preflight reset only — all styling is hand-written BEM in
  `app/globals.css`
- `next/image` for every photograph
- No CMS, no forms: bookings happen by phone and Viber, which is how the owners actually work

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # all routes prerender to static HTML
npm run typecheck
```

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero, about, the four houses, mineral pool, amenities, surroundings, FAQ, contact |
| `/vili/kashta-1…4/` | One page per house: rates, capacity, features, gallery |
| `/zabelezhitelnosti/` | Geyser, Seven Rila Lakes, Rila Monastery, Panichishte, with travel times |
| `/galeriya/` | Filterable gallery with a lightbox |

## Bilingual content (BG / EN)

Bulgarian is the default; English is a full translation, not a machine pass.

- Every string lives in `app/lib/i18n/bg.ts` and `app/lib/i18n/en.ts`, both typed against
  `app/lib/i18n/types.ts` — adding a key to one language makes the other fail to compile.
- `app/lib/i18n/language-provider.tsx` holds the active locale. It renders Bulgarian on the
  server, then applies the visitor's stored choice (or their browser language) after hydration,
  so there is no markup mismatch.
- The switch itself is `app/components/language-switch.tsx`, in the header and the mobile menu.
  The choice persists in `localStorage`.

Because the locale is client-side, page `metadata` is Bulgarian only. If English needs to rank
in search, the next step is moving to `/[locale]/` route segments — the copy is already fully
externalised for it.

## Photography

Source photos came off the old site (phone-camera JPEGs, up to 1.2 MB each).
`scripts/prepare-images.mjs` was the one-time import: it rotates, caps the long edge and
re-encodes to WebP, writing into `public/{property,houses,around,identity,icons}/`. The
committed WebP files are the assets the site uses; the script stays as a record of where each
one came from and how it was produced.

Alt text is not stored with the files — it is per-language, so it lives in the dictionaries under
`photoAlt`, keyed by the ids in `app/lib/photos.ts`. That module also carries each image's real
pixel dimensions so `next/image` can reserve space and avoid layout shift.

## Motion

- `app/reveal-on-scroll.tsx` tags a list of selectors and reveals them with an
  `IntersectionObserver`, staggering siblings by 65 ms.
- The hero has a slow Ken Burns drift plus rising steam wisps (`app/components/steam.tsx`), a nod
  to the thermal pool in the photograph.
- The header is a liquid-glass pill with a travelling sheen that re-pins itself on scroll.
- Everything above is disabled under `prefers-reduced-motion`.

## Design tokens

Defined at the top of `app/globals.css`:

Spruce Night `#0A2116` · Pine `#163B27` · Leaf Green `#5CBA68` · Mineral Gold `#DDA94F` ·
Copper `#B1762C` · Linen `#F8F4EA`

Type is Playfair Display for headings and Manrope for body, both with Cyrillic subsets.

## Verifying design changes

`npm run shots` drives a headless Chromium over a running server and writes desktop, English and
mobile screenshots to `.screenshots/` (gitignored). Point it elsewhere with
`BASE=http://localhost:3000 npm run shots`.

## SEO

Canonical domain: `https://parka-villas.com/` (configured in `app/lib/site.ts` as `SITE_URL` /
`HOME_URL`). All page URLs use trailing slashes — enforced in `next.config.mjs` and via
`withTrailingSlash()` / `absoluteUrl()` helpers.

Implemented: `sitemap.xml`, `robots.txt`, JSON-LD (LodgingBusiness, FAQ, breadcrumbs, etc.),
Open Graph / Twitter cards, web app manifest, favicons, and per-page metadata. English copy is
client-side only — metadata is Bulgarian; `/[locale]/` routes would be needed for English SEO.
