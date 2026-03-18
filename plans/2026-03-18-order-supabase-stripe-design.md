# Order Page: Supabase + Stripe Integration

**Date:** 2026-03-18
**Status:** Approved

## Overview

Integrate the `/order` page form with Supabase (database + file storage) and Stripe Checkout for payment. The form collects first name, last name, email, and a pitch deck file. Data is persisted to Supabase immediately on submit, then the user is redirected to Stripe Checkout to pay €79. A Stripe webhook confirms payment and updates the order record.

## Architecture

```
User fills form → Upload file to Supabase Storage
                → Insert row in Supabase DB (payment_status: false)
                → Call Edge Function "create-checkout-session"
                → Redirect to Stripe Checkout (€79)
                → User pays
                → Stripe webhook → Edge Function "stripe-webhook"
                → Updates DB row (payment_status: true)
                → User redirected to /order?success=true
                → Frontend shows SuccessScreen
```

## 1. Supabase Database

**Table: `orders`**

| Column              | Type         | Default              | Notes                          |
|---------------------|--------------|----------------------|--------------------------------|
| `id`                | uuid         | `gen_random_uuid()`  | Primary key                    |
| `first_name`        | text         | —                    |                                |
| `last_name`         | text         | —                    |                                |
| `email`             | text         | —                    |                                |
| `file_path`         | text         | —                    | Path in Supabase Storage       |
| `file_name`         | text         | —                    | Original filename              |
| `payment_status`    | boolean      | `false`              |                                |
| `stripe_session_id` | text         | `null`               | Set by create-checkout-session |
| `created_at`        | timestamptz  | `now()`              |                                |

**RLS Policies:**
- Allow anonymous inserts (the form is public)
- Allow anonymous updates only on `stripe_session_id` column for rows matching by `id`
- Restrict reads to service role only (admin access from Edge Functions)

## 2. Supabase Storage

**Bucket: `pitch-decks`** (private, not public)

- Files stored as `{order_id}/{original_filename}`
- Accessible only via service role key (Edge Functions, dashboard)
- RLS policy: allow anonymous uploads to the bucket

## 3. Frontend Changes

### New file: `lib/supabase.ts`

- Initialize Supabase client with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Export the client for use in components

### Modified: `components/OrderPage.tsx`

**handleSubmit flow:**

1. Validate form fields (first name, last name, email, file) — existing logic
2. Upload file to Supabase Storage bucket `pitch-decks` at path `{generated_uuid}/{file.name}`
3. Insert row into `orders` table with `first_name`, `last_name`, `email`, `file_path`, `file_name`, `payment_status: false`
4. Call the `create-checkout-session` Edge Function via `supabase.functions.invoke()`, passing `order_id` and `email`
5. Receive the Stripe Checkout URL in the response
6. Redirect the browser to the Stripe Checkout URL via `window.location.href`

**On page load:**

- Check `URLSearchParams` for `success=true`
- If present, set `submitted = true` to show the existing `SuccessScreen` component
- Parse `email` from URL params (passed back from Stripe via `success_url`) to display in the success screen

**Button states:**

- Show loading/disabled state ("Processing...") during upload + checkout creation
- Show error message if any step fails

## 4. Edge Function: `create-checkout-session`

**Location:** `supabase/functions/create-checkout-session/index.ts`

**Input:** `{ order_id: string, email: string }`

**Logic:**

1. Validate input
2. Initialize Stripe with `STRIPE_SECRET_KEY` (from Edge Function secrets)
3. Create a Stripe Checkout Session:
   - `mode: 'payment'`
   - `line_items`: one item, €79.00, "Pitch Deck Review" label
   - `customer_email`: from input
   - `metadata`: `{ order_id }` — links Stripe session back to our DB
   - `success_url`: `https://{site}/order?success=true&email={email}`
   - `cancel_url`: `https://{site}/order`
4. Update the `orders` row: set `stripe_session_id` to the Checkout Session ID
5. Return `{ url: session.url }`

**CORS:** Allow requests from the frontend origin.

## 5. Edge Function: `stripe-webhook`

**Location:** `supabase/functions/stripe-webhook/index.ts`

**Trigger:** POST from Stripe (configured in Stripe Dashboard → Webhooks)

**Logic:**

1. Read the raw request body
2. Verify the webhook signature using `STRIPE_WEBHOOK_SECRET`
3. Parse the event; handle `checkout.session.completed`
4. Extract `order_id` from `session.metadata`
5. Update the `orders` row: set `payment_status = true`
6. Return 200 OK

**Security:** Reject requests with invalid signatures. No CORS needed (server-to-server).

## 6. Environment Variables

### Frontend (`.env`, prefixed with `VITE_`)

```
VITE_SUPABASE_URL=https://filaurkqiixtydqzzyag.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_E2NMj3eBW7U2QEicgtdqQg_IVEwqN_c
```

### Supabase Edge Function Secrets (set via `supabase secrets set`)

```
STRIPE_SECRET_KEY=mk_1TC01R55QZxW9xp2gFCrzLsS
STRIPE_WEBHOOK_SECRET=whsec_... (generated in Stripe Dashboard)
```

## 7. Manual Setup Steps

These cannot be automated from code and must be done by the developer:

1. **Supabase Dashboard → SQL Editor:** Run the CREATE TABLE statement for `orders`
2. **Supabase Dashboard → Storage:** Create `pitch-decks` bucket (private)
3. **Supabase Dashboard → Storage → Policies:** Add policy allowing anonymous uploads
4. **Supabase Dashboard → Auth → Settings:** Ensure anon key is enabled
5. **Install Supabase CLI:** `brew install supabase/tap/supabase`
6. **Link project:** `supabase link --project-ref filaurkqiixtydqzzyag`
7. **Set Edge Function secrets:** `supabase secrets set STRIPE_SECRET_KEY=... STRIPE_WEBHOOK_SECRET=...`
8. **Deploy Edge Functions:** `supabase functions deploy create-checkout-session` and `supabase functions deploy stripe-webhook`
9. **Stripe Dashboard → Webhooks:** Create endpoint pointing to `https://filaurkqiixtydqzzyag.supabase.co/functions/v1/stripe-webhook`, listen for `checkout.session.completed`
10. **Copy the webhook signing secret** from Stripe and set it via `supabase secrets set`

## 8. File Structure (new/modified)

```
SS/
├── .env                          # add VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── lib/
│   └── supabase.ts               # new — Supabase client
├── components/
│   └── OrderPage.tsx             # modified — Supabase upload + Stripe redirect
└── supabase/
    └── functions/
        ├── create-checkout-session/
        │   └── index.ts          # new — creates Stripe Checkout Session
        └── stripe-webhook/
            └── index.ts          # new — handles Stripe webhook
```

## 9. Security Considerations

- Stripe secret key is NEVER in frontend code — only in Edge Function secrets
- Supabase anon key is safe to expose (it's designed for client-side use, gated by RLS)
- Webhook signature verification prevents spoofed payment confirmations
- File uploads go to a private bucket (no public URLs)
- RLS restricts who can read order data
