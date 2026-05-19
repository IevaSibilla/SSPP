# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing/brand site for Ieva Sibilla Strupule ("Pitch Authority"), a pitch coach. React 19 + TypeScript + Vite SPA. See `AGENTS.md` for code-style conventions and `.cursor/skills/deploy-changes/SKILL.md` for the deploy procedure — this file covers architecture and the parts those documents get wrong.

## Commands

```bash
npm install
npm run dev      # Vite dev server on port 3004 (NOT 5173 — AGENTS.md is stale here)
npm run build    # vite build → dist/
npm run preview  # serve the production build
npm start        # Express server (server.js) serving dist/ — used in some hosting setups
```

There is no test suite and no lint step. Verify changes by running `npm run dev` and checking pages visually.

## Routing — important

`App.tsx` is the entire router: it reads `window.location.pathname` and an `if`-chain returns the page for each path (`/order`, `/scorecard`, `/about`, `/work`, `/speaking`, `/terms-and-conditions`, `/privacy-policy`, else home). The home page is a scroll-through of section components.

`utils/router.tsx` (a custom context-based `Router`/`Routes`/`Route`) exists but is **not imported anywhere** — do not edit it expecting routing changes. To add a page: create the component, then add an `if (currentPath === '/x')` branch in `App.tsx`. Each branch wraps the page in `<Navbar>`/`<Footer>` itself.

Because routing is path-based with no server rewrites in the SPA build, `vercel.json` and `.htaccess` exist to rewrite all paths to `index.html`.

## Styling

Tailwind is loaded at runtime from a CDN (`cdn.tailwindcss.com`) via a `<script>` in `index.html` — there is **no Tailwind build step, no `tailwind.config.js`, no PostCSS**. The theme (brand colors, fonts, the `blob` animation) is configured inline in `index.html` inside the `tailwind.config = {...}` script. To add a brand color or keyframe, edit `index.html`.

Brand palette: `brand-dark #0f0f0f`, `brand-charcoal`, `brand-accent #FF385C`, `brand-beige #FDFBF7`, `brand-surface`, `brand-gray`, `brand-lightgray`. Fonts: `font-serif` (Playfair Display), `font-sans` (Inter).

## Order / payments flow

`/order` (`components/OrderPage.tsx`) sells a paid "Pitch Deck Review". It uses Supabase + Stripe:

- `lib/supabase.ts` — browser Supabase client, configured from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` env vars (set via `.env`, which is gitignored).
- `supabase/functions/create-checkout-session/` — Deno edge function; takes `{ order_id, email }`, creates a Stripe Checkout session (€299, EUR) via the Stripe REST API, redirects back to `/order?success=true`.
- `supabase/functions/stripe-webhook/` — Deno edge function; verifies the Stripe signature and handles `checkout.session.completed`.
- `supabase/migrations/` — DB schema migrations.
- Edge-function secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SITE_URL`) live in Supabase, not in this repo.

## Deployment — the `dist/` folder is committed

This is the single most important workflow fact: **`dist/` is checked into git** and Hostinger auto-deploys from `main`. Source edits alone never reach the live site. After any `.tsx`/`index.html`/asset change you must `npm run build`, then commit both source and the rebuilt `dist/` together, then push to `main`. (AGENTS.md's "upload dist to Hostinger manually" is outdated — follow `.cursor/skills/deploy-changes/SKILL.md`.) Vite hashes the bundle filename each build, so git will show an old `dist/assets/index-*.js` deleted and a new one added — that is expected.

## Assets

Static assets go in `public/` and are referenced with absolute paths (`/file.png`). Vite copies `public/` into `dist/` on build. The repo root also contains some loose images (`ievaJumpSuit.png`, `assets/`) that are not the served path — `public/` is.
