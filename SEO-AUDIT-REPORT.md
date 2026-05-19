# SEO Audit Report — sibillastrupule.com

**Site:** Ieva Sibilla Strupule — "Pitch Authority" (personal brand / pitch-coaching service site)
**Audited:** 2026-05-18
**Stack:** React 19 SPA, Vite, client-side routing, deployed static to Hostinger
**Routes:** `/`, `/about`, `/work`, `/speaking`, `/scorecard`, `/order`, `/privacy-policy`, `/terms-and-conditions`

This audit is based on a code-level review of the repository (`index.html`, `App.tsx`, page components, `public/`). It was not possible to verify live-server behaviour (HTTP status codes, www/non-www redirects, Core Web Vitals field data) or Search Console data — items needing live verification are flagged.

---

## Executive Summary

**Overall health: Poor for organic search.** The site is well-designed and has strong E-E-A-T raw material (real credentials, legal pages, contact info), but it is effectively built as a single indexable page. Every route shares one title, one meta description, and one canonical tag pointing at the homepage — so Google has little reason to index `/about`, `/speaking`, `/work`, `/scorecard` or `/order` as distinct pages.

**Top 5 priority issues:**

1. **All routes serve identical `<title>`, meta description, and a canonical pointing to `/`** — non-homepage pages are at risk of being treated as duplicates and dropped from the index. *(Critical)*
2. **No `robots.txt` and no XML sitemap** — nothing tells search engines what exists or where the sitemap is. *(High)*
3. **Tailwind is loaded from the `cdn.tailwindcss.com` browser CDN** — the dev-only build, render-blocking, generates CSS at runtime. Hurts FCP/LCP. *(High)*
4. **Large unoptimized images** (up to 2.7 MB PNGs, no WebP/AVIF) — poor LCP and mobile Core Web Vitals. *(High)*
5. **Content renders client-side only** — initial HTML is an empty `<div id="root">`; no pre-rendered content per route. *(High)*

**Quick wins:** add `robots.txt` + `sitemap.xml`; compress/convert images; add per-route `<title>`/meta updates; add `<h1>` to `/speaking` and `/work`; add JSON-LD Person/Organization schema.

---

## Technical SEO Findings

### 1. Identical metadata + homepage canonical on every route
- **Issue:** `index.html` hard-codes a single `<title>`, single `<meta name="description">`, and `<link rel="canonical" href="https://sibillastrupule.com/">`. There is no per-route metadata logic — no `document.title` updates, no `react-helmet` (confirmed by grep). Every route (`/about`, `/speaking`, `/work`, `/scorecard`, `/order`, legal pages) ships the homepage's title, description, **and a canonical that explicitly points to the homepage**.
- **Impact:** **High → Critical.** A canonical tag pointing all sub-pages to `/` tells Google "this page is a duplicate of the homepage." Sub-pages will likely be de-indexed or never indexed. SERP snippets for any page that does rank will be identical and generic.
- **Evidence:** `index.html` lines 12–15; `App.tsx` routing has no metadata side-effects.
- **Fix:** Set per-route metadata. Minimum: on each route, update `document.title`, the meta description, and the `<link rel="canonical">` to the page's own URL (e.g. via a small `useEffect` per page or a `react-helmet`-style component). Best: pre-render each route (see #4) so metadata is in the static HTML.
- **Priority:** 1 (Critical).

### 2. No robots.txt
- **Issue:** No `robots.txt` in `public/` or the build output.
- **Impact:** **High.** No crawl directives and, more importantly, no `Sitemap:` reference. Not fatal (absence ≠ block) but a missed control point.
- **Evidence:** `public/` listing — file absent.
- **Fix:** Add `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://sibillastrupule.com/sitemap.xml
  ```
- **Priority:** 2 (High — quick win).

### 3. No XML sitemap
- **Issue:** No `sitemap.xml`.
- **Impact:** **High.** With JS-rendered routing and no sitemap, discovery of `/about`, `/speaking`, `/work`, etc. depends entirely on crawlers following in-page links.
- **Evidence:** `public/` listing — file absent.
- **Fix:** Add a static `public/sitemap.xml` listing all 8 canonical routes with `<lastmod>`. Submit it in Google Search Console and Bing Webmaster Tools. Regenerate when routes change.
- **Priority:** 2 (High — quick win).

### 4. Client-side-only rendering (no SSR / prerender)
- **Issue:** `index.tsx` mounts React into an empty `#root`; `index.html`'s `<body>` contains no content. All text, headings and links exist only after JavaScript executes.
- **Impact:** **High.** Google can render JS but does so on a delayed queue; rendering failures or slow JS mean no content indexed. AI answer engines and many crawlers/social scrapers don't execute JS at all — they see an empty page.
- **Evidence:** `index.tsx`; `index.html` body is `<div id="root">` + module script only.
- **Fix:** Pre-render/static-generate each route to real HTML at build time (e.g. `vite-react-ssg`, `react-snap`, or Vite SSR). This also makes per-route metadata (#1) trivial and ships content in the initial response.
- **Priority:** 2 (High).

### 5. Soft 404s — unknown URLs return the homepage with HTTP 200
- **Issue:** `App.tsx`'s `if`-chain falls through to the **Home page** for any unrecognized path. `.htaccess` and `vercel.json` rewrite every path to `index.html`, which returns 200.
- **Impact:** **Medium → High.** Any mistyped or stale URL renders a full homepage at a 200 status — unlimited duplicate-content URLs, and no genuine 404 for crawlers.
- **Evidence:** `App.tsx` final `return` (home) with no catch / 404 branch; `.htaccess`; `vercel.json` rewrite-all rule.
- **Fix:** Add an explicit 404 branch in `App.tsx` rendering a `NotFound` component with a `<meta name="robots" content="noindex">`. On Hostinger/Apache, configure a real 404 status where possible.
- **Priority:** 3 (Medium).

### 6. Tailwind loaded from the browser CDN
- **Issue:** `index.html` loads `https://cdn.tailwindcss.com/3.4.17`. This is the JIT *play* CDN, which Tailwind explicitly documents as **not for production**.
- **Impact:** **High (performance).** Render-blocking third-party script; the full CSS engine runs in the browser and generates styles at runtime → flash of unstyled content, slower First Contentful Paint and LCP, extra JS cost on every page load.
- **Evidence:** `index.html` `<script src="https://cdn.tailwindcss.com/3.4.17">`.
- **Fix:** Install Tailwind as a build dependency, move the theme config (currently inline in `index.html`) to `tailwind.config.js`, and emit one purged, minified static CSS file bundled by Vite.
- **Priority:** 2 (High).

### 7. Large, unoptimized images
- **Issue:** `public/` contains very heavy assets: `MediaBlog SibillaStrupule.png` 2.7 MB, `ievaJumpSuit.png` 1.5 MB, `Home SibillaStrupule.png` 1.4 MB, `About SibillaStrupule.png` 1.2 MB, `Ieva.png` 554 KB, plus several 200–300 KB JPEGs. Photographic content is stored as PNG; no WebP/AVIF.
- **Impact:** **High.** Directly degrades LCP and mobile Core Web Vitals, especially the hero image. Wastes crawl bandwidth.
- **Evidence:** `public/` directory listing (file sizes).
- **Fix:** Compress all images; convert photos to WebP/AVIF; generate responsive sizes and use `srcset`/`sizes`; set explicit `width`/`height` on `<img>` to prevent layout shift (CLS); keep `loading="lazy"` for below-the-fold images and ensure the LCP/hero image is **not** lazy-loaded.
- **Priority:** 2 (High).

### 8. Image filenames contain spaces
- **Issue:** Several assets have spaces in the filename: `Home SibillaStrupule.png`, `Contact SibillaStrupule.png`, `About SibillaStrupule.png`, `SEB Material mapper winning.jpeg`, `House award.jpeg`.
- **Impact:** **Low → Medium.** Spaces become `%20` in URLs — fragile, harder to share, and a weaker filename relevance signal.
- **Evidence:** `public/` directory listing.
- **Fix:** Rename to lowercase, hyphen-separated, descriptive filenames (e.g. `ieva-strupule-pitch-coach.webp`) and update references.
- **Priority:** 4 (Low).

### 9. No structured data (JSON-LD)
- **Issue:** No schema markup anywhere in `index.html` or components.
- **Impact:** **Medium → High.** A personal-brand / professional-service site is an ideal `Person` + `Organization`/`ProfessionalService` candidate, and the scorecard/order pages map cleanly to `Service` and `FAQPage`. Missing this forfeits rich-result eligibility and entity understanding.
- **Evidence:** Grep for `application/ld+json` / `schema.org` — none found.
- **Fix:** Add JSON-LD: `Person` for Ieva (name, jobTitle, sameAs social links, image), `Organization`/`ProfessionalService` for the business, `Service` for the pitch-deck review (`/order`), `FAQPage` where Q&A content exists, and `BreadcrumbList`. See the `schema-markup` skill.
- **Priority:** 3 (Medium).

### 10. Live-server checks not verifiable from code
- **Issue:** The following can't be confirmed from the repo and must be checked against the live site:
  - www vs non-www consolidation (one should 301 to the other).
  - Trailing-slash consistency.
  - HTTP → HTTPS redirect and valid SSL.
  - That clean URLs are served and the `.htaccess` rewrite into `/dist/` never leaks `/dist/` into public URLs.
  - Core Web Vitals field data (Search Console / CrUX).
- **Impact:** **Medium** (unknown until verified).
- **Fix:** Verify each in a browser / Search Console; add 301s for any host or protocol variant that resolves.
- **Priority:** 3 (Medium).

---

## On-Page SEO Findings

### 11. Duplicate title tags and meta descriptions across all pages
- **Issue:** Consequence of #1 — all 8 routes share `Ieva Sibilla Strupule | Pitch Authority` as the title and the same description.
- **Impact:** **Critical.** No page targets its own keyword; duplicate-snippet signals site-wide.
- **Fix:** Unique, intent-matched title + description per route, e.g.:
  - `/speaking` → "Keynote Speaker on Pitching & Investor Communication | Ieva Sibilla Strupule"
  - `/work` → "Pitch Coaching Case Studies & Results | Ieva Sibilla Strupule"
  - `/scorecard` → "Free Investor Pitch Scorecard — Score Your Deck in 2 Minutes"
  - `/order` → "Professional Pitch Deck Review — 24h Turnaround"
- **Priority:** 1 (Critical).

### 12. Missing `<h1>` on `/speaking` and `/work`
- **Issue:** `SpeakingPage.tsx` and `WorkPage.tsx` contain `<h2>` headings but **no `<h1>`** (confirmed: 0 `<h1>` matches in both files).
- **Impact:** **Medium.** No primary topical heading weakens on-page relevance and accessibility.
- **Evidence:** `grep -c "<h1" components/SpeakingPage.tsx components/WorkPage.tsx` → both `0`.
- **Fix:** Add one descriptive, keyword-aligned `<h1>` to each page (e.g. Speaking: "Speaking & Keynotes on Pitching to Investors"; Work: "Pitch Coaching Work & Case Studies").
- **Priority:** 3 (Medium).

### 13. Two `<h1>` elements in `ScorecardPage.tsx`
- **Issue:** `ScorecardPage.tsx` has `<h1>` at line 105 and line 369.
- **Impact:** **Low.** They appear in mutually exclusive render states (intro form vs. results view), so only one is in the DOM at a time — acceptable, but worth confirming they never render together.
- **Evidence:** `grep -n "<h1"` → lines 105, 369; conditional view state in component.
- **Fix:** Verify the two views are exclusive; if so, no change needed beyond a code comment.
- **Priority:** 5 (Low).

### 14. Meta description slightly long
- **Issue:** The homepage description is ~168 characters and will likely truncate around 155–160 in SERPs. It also opens with the name rather than a benefit/keyword.
- **Impact:** **Low.**
- **Fix:** Tighten to ~150–155 chars, lead with the value proposition / keyword.
- **Priority:** 4 (Low).

### 15. Internal linking — `/work` and `/scorecard` not in primary nav
- **Issue:** `Navbar.tsx` links to `/#services`, `/speaking`, `/about`, and `/order` (CTA). `/work` and `/scorecard` are not in the main nav, so they depend on in-body CTAs / the homepage popup for discovery. Legal pages presumably sit in the footer.
- **Impact:** **Medium.** Pages with few internal links get crawled and weighted less; risk of near-orphan pages.
- **Evidence:** `Navbar.tsx` link list (lines 12–14, 41).
- **Fix:** Ensure every indexable route has at least one crawlable `<a href>` link from a prominent page. Consider adding `/work` to the nav. Good news: the Navbar already uses real `<a href>` anchors (not JS-only buttons), so links are crawlable.
- **Priority:** 3 (Medium).

### 16. Social/OG image consistency
- **Issue:** `og:image` is 1200×1200 (square) while `twitter:card` is `summary_large_image` (expects ~1200×630). The same OG image and title are reused for every route.
- **Impact:** **Low.** Possible awkward cropping on X; non-homepage shares look generic.
- **Fix:** Provide a 1200×630 image for `summary_large_image`, and ideally per-page OG title/description/image alongside the per-route metadata work in #1.
- **Priority:** 4 (Low).

### 17. Images — alt text present; review quality
- **Issue:** All 11 `<img>` tags in components have an `alt` attribute (img count = alt count = 11). Quality/descriptiveness was not individually assessed.
- **Impact:** **Low (positive baseline).**
- **Fix:** Spot-check that alt text is descriptive and not keyword-stuffed; decorative images may use `alt=""`.
- **Priority:** 5 (Low).

---

## Content & E-E-A-T Findings

### 18. Strong E-E-A-T raw material — underused
- **Observation:** The site has real trust signals: named individual with credentials and a track record (`/about`), award/press logos (Forbes, Sifted), client testimonials, a Privacy Policy and Terms page, and contact details. This is a solid E-E-A-T foundation.
- **Gap:** None of it is reinforced with structured data (#9) or expressed in indexable HTML (#4), so search engines and AI answer engines can't easily attribute it.
- **Fix:** Surface credentials in pre-rendered HTML + `Person` schema with `sameAs` links to verified social/press profiles.
- **Priority:** 3 (Medium).

### 19. No ongoing content / topical depth
- **Issue:** The site is a fixed set of marketing pages. There is no blog, article, or educational content targeting informational queries ("how to pitch to investors", "pitch deck mistakes", "investor pitch checklist").
- **Impact:** **Medium (long-term growth ceiling).** A coach/speaker brand competes for high-intent informational searches; without content there's little surface area to rank or to be cited by AI answer engines.
- **Fix:** Plan a small content cluster around pitching/fundraising topics, internally linked to `/order` and `/scorecard`. See the `content-strategy` and `programmatic-seo` skills.
- **Priority:** 4 (Long-term).

---

## Prioritized Action Plan

### 1. Critical — fix before anything else (blocking indexation)
- **#1 / #11** Per-route `<title>`, meta description, and self-referencing `<link rel="canonical">`. Stop pointing every page's canonical at the homepage.

### 2. High-impact
- **#4** Pre-render/static-generate each route so content + metadata ship in the HTML.
- **#6** Replace the Tailwind browser CDN with a proper build-time Tailwind setup.
- **#7** Compress and convert images to WebP/AVIF; add `width`/`height`; protect the LCP image.
- **#9** Add JSON-LD (`Person`, `Organization`/`ProfessionalService`, `Service`, `FAQPage`).

### 3. Quick wins (low effort, immediate benefit)
- **#2** Add `public/robots.txt` with a sitemap reference.
- **#3** Add `public/sitemap.xml`; submit in Search Console + Bing.
- **#12** Add an `<h1>` to `/speaking` and `/work`.
- **#5** Add an explicit `noindex` 404 route in `App.tsx`.

### 4. Medium / housekeeping
- **#15** Make sure every route is internally linked; consider adding `/work` to the nav.
- **#10** Verify www/non-www, HTTPS, and trailing-slash redirects on the live server.
- **#8** Rename image files to hyphenated lowercase.
- **#16** Add a 1200×630 social image; per-page OG tags.

### 5. Long-term
- **#19** Build a pitching/fundraising content cluster.
- **#18** Reinforce E-E-A-T in HTML and schema.

---

## Verification Tools (recommended next steps)
- **Google Search Console** — submit sitemap, check Coverage/Indexing and Core Web Vitals (no access during this audit).
- **PageSpeed Insights** — measure LCP/INP/CLS for `/` and `/order` once images and Tailwind are fixed.
- **Rich Results Test** — validate JSON-LD after #9.
- **`site:sibillastrupule.com`** — confirm how many routes are actually indexed today.
