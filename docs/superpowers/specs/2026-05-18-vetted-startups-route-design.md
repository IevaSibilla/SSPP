# Design: `/vetted-startups` route

**Date:** 2026-05-18
**Status:** Approved pending spec review

## Goal

Add a new route that promotes two offers from Ieva Sibilla Strupule:

1. **For VCs & Investors** — exclusive access to vetted startup deal flow and co-investment
   opportunities for funding rounds. Converts via a 30-minute call booking.
2. **For Startups** — a premium €1,500 vetting service (pitch deck review + business, business
   plan, and idea vetting). If Ieva approves the startup, it joins her vetted startup list.

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/vetted-startups` | `VettedStartupsPage` | Promotional landing page with both offers |
| `/vetted-startups/apply` | `VettedStartupsApplyPage` | Dedicated startup application + Stripe checkout |

Both are default exports, take no props, and self-read `window.location` for query params
(same convention as the existing `OrderPage`). Routing is the `App.tsx` `if`-chain on
`window.location.pathname`.

## Page 1 — `/vetted-startups` (landing)

`components/VettedStartupsPage.tsx`. Reuses the site's dark-luxury aesthetic, brand colors,
Playfair/Inter fonts, and Framer Motion patterns. Sections:

1. **Hero** — introduces the "Vetted Startups" concept: Ieva personally vets startups so
   investors get curated deal flow and startups earn a credibility stamp.
2. **For Investors & VCs** — exclusive vetted deals + co-investment for rounds.
   CTA: **"Book a 30-min call"** → external link to the existing Calendly:
   `https://calendly.com/hola-aekora/expert-investor-pitch-coaching`. No payment.
3. **For Startups** — the €1,500 vetting service: what's included (deck review, business +
   plan + idea vetting), the approval outcome (joining the vetted list).
   CTA: **"Apply for vetting"** → navigates to `/vetted-startups/apply`.
4. **Social proof + FAQ + closing CTA** — consistent with existing pages.

## Page 2 — `/vetted-startups/apply` (checkout)

`components/VettedStartupsApplyPage.tsx`. Modeled on `OrderPage.tsx` (read it as reference).

**Form fields:** first name, last name, email, company/website (single text field), pitch
deck file upload.

**Submit flow** (mirrors `OrderPage`):
1. Generate `orderId = crypto.randomUUID()`.
2. Upload the deck to the Supabase `pitch-decks` storage bucket at `${orderId}/${file.name}`.
3. Insert an `orders` row: `{ id, first_name, last_name, email, file_path, file_name,
   order_type: 'startup-vetting', company }`.
4. Invoke the `create-checkout-session` edge function with
   `{ order_id, email, tier: 'startup-vetting' }`.
5. Redirect to the returned Stripe checkout URL.
6. On return, `?success=true` shows a confirmation state.

## Backend changes

### Parameterize the `create-checkout-session` edge function

`supabase/functions/create-checkout-session/index.ts` currently hardcodes "Pitch Deck Review"
at €299. Change it to accept an optional `tier` field and map it **server-side** to a fixed
price. The client never sends a price.

```ts
const TIERS = {
  'deck-review':     { name: 'Pitch Deck Review', description: 'Full review delivered in 24h',
                       amount: 29900, returnPath: '/order' },
  'startup-vetting': { name: 'Startup Vetting',
                       description: 'Full pitch, business & plan vetting + vetted-list review',
                       amount: 150000, returnPath: '/vetted-startups/apply' },
};
const tier = TIERS[body.tier] ?? TIERS['deck-review']; // default = backward compatible
```

- `unit_amount`, `product_data[name]`, `product_data[description]` come from `tier`.
- `success_url` / `cancel_url` use `${siteUrl}${tier.returnPath}` (so vetting returns to
  `/vetted-startups/apply?success=true`, deck review still returns to `/order`).
- The Resend notification email subject varies by tier
  ("New pitch deck submission" vs "New startup vetting application").
- The order-row update also stores nothing new beyond existing fields.

### Database migration

New file `supabase/migrations/<timestamp>_add_order_type_and_company.sql`:

```sql
alter table orders add column if not exists order_type text default 'deck-review';
alter table orders add column if not exists company text;
```

Both columns are nullable/defaulted — the existing `/order` flow keeps working unchanged.

### Update `OrderPage.tsx`

Pass `tier: 'deck-review'` explicitly in the `create-checkout-session` invoke body. This is
the only change to the existing order flow; the default makes it backward compatible even
before deploy.

## Wiring

- **`App.tsx`** — add two route branches (`/vetted-startups`, `/vetted-startups/apply`) and
  two `ROUTE_META` entries (unique title, ~150-char description, self-canonical), consistent
  with the existing per-route SEO setup.
- **`Navbar.tsx`** — add a "Vetted Startups" link to the nav (`href="/vetted-startups"`).
- **`public/sitemap.xml`** — add `/vetted-startups` (priority 0.9) and
  `/vetted-startups/apply` (priority 0.6).

## Security

The Stripe price is never accepted from the browser. The edge function maps the `tier`
keyword to a hardcoded server-side amount. An attacker tampering with the request can only
pick an existing tier, never set an arbitrary price.

## Deployment caveat

The frontend (both pages, routing, nav, SEO) is fully buildable and verifiable locally.
The **edge-function change and the migration must be deployed by the site owner** via the
Supabase CLI:

```
supabase db push                              # apply the migration
supabase functions deploy create-checkout-session
```

Until deployed, the startup checkout button will not complete a real payment. Agents write
this code but cannot deploy to the Supabase project.

## Out of scope

- No automated vetting logic — "approval" is a manual decision by Ieva.
- No vetted-startup list/directory page (a separate future project).
- No investor account system — investors simply book a call.
- No changes to the existing `stripe-webhook` function.

## Verification

- `npx tsc --noEmit` clean (excluding pre-existing Deno edge-function type noise).
- `npm run build` succeeds.
- Headless-Chrome render check: `/vetted-startups` and `/vetted-startups/apply` both mount
  with content, no console errors.
- Both CTAs resolve (Calendly link opens; "Apply" navigates to the apply page).
- Stripe checkout end-to-end is verified by the owner after Supabase deploy.
