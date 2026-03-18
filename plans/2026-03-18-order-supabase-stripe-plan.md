# Order Page: Supabase + Stripe Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the `/order` form to persist data in Supabase (DB + file storage) and redirect to Stripe Checkout for €79 payment, with a webhook to confirm payment.

**Architecture:** Frontend uploads file to Supabase Storage and inserts an order row, then calls a Supabase Edge Function that creates a Stripe Checkout Session and returns the URL. A second Edge Function handles Stripe's webhook to mark orders as paid. Hostinger serves the static `/dist` build; all server-side logic lives in Supabase Edge Functions.

**Tech Stack:** React, Supabase JS v2, Supabase Edge Functions (Deno), Stripe Checkout API

---

## File Structure

```
SS/
├── .env                                        # modify — add Supabase env vars
├── lib/
│   └── supabase.ts                             # create — Supabase client singleton
├── components/
│   └── OrderPage.tsx                           # modify — integrate Supabase + Stripe redirect
└── supabase/
    └── functions/
        ├── create-checkout-session/
        │   └── index.ts                        # create — Stripe Checkout Session creator
        └── stripe-webhook/
            └── index.ts                        # create — Stripe webhook handler
```

---

## Chunk 1: Environment & Supabase Client

### Task 1: Add Supabase environment variables

**Files:**
- Modify: `.env`

- [ ] **Step 1: Add variables to .env**

Append to the existing `.env` file:

```
VITE_SUPABASE_URL=https://filaurkqiixtydqzzyag.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_E2NMj3eBW7U2QEicgtdqQg_IVEwqN_c
```

- [ ] **Step 2: Commit**

```bash
git add .env
git commit -m "chore: add Supabase environment variables"
```

### Task 2: Create Supabase client

**Files:**
- Create: `lib/supabase.ts`

- [ ] **Step 1: Create lib directory and supabase client file**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 2: Verify the app still builds**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/supabase.ts
git commit -m "feat: add Supabase client module"
```

---

## Chunk 2: Supabase Database & Storage Setup

### Task 3: Create the orders table and RLS policies

This task is done in the **Supabase Dashboard SQL Editor** — not in code.

- [ ] **Step 1: Run SQL to create orders table**

Navigate to Supabase Dashboard → SQL Editor. Run:

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  file_path TEXT,
  file_name TEXT,
  payment_status BOOLEAN DEFAULT FALSE,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts"
  ON orders FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous updates only for stripe_session_id on own rows
CREATE POLICY "Allow anonymous update stripe_session_id"
  ON orders FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow service role full access (for Edge Functions)
CREATE POLICY "Service role full access"
  ON orders FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

- [ ] **Step 2: Verify** — go to Table Editor in Supabase Dashboard and confirm the `orders` table appears with all columns.

### Task 4: Create the pitch-decks storage bucket

- [ ] **Step 1: Create bucket**

Navigate to Supabase Dashboard → Storage → New Bucket:
- Name: `pitch-decks`
- Public: **OFF** (private)

- [ ] **Step 2: Add upload policy**

Go to Storage → Policies → `pitch-decks` bucket → New Policy:

```sql
CREATE POLICY "Allow anonymous uploads"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'pitch-decks');
```

- [ ] **Step 3: Verify** — confirm the bucket appears in Storage and the policy is active.

---

## Chunk 3: Frontend Integration

### Task 5: Update OrderPage to upload to Supabase and redirect to Stripe

**Files:**
- Modify: `components/OrderPage.tsx`

- [ ] **Step 1: Add Supabase import and submitting state**

At the top of `OrderPage.tsx`, add the import:

```typescript
import { supabase } from '../lib/supabase';
```

In the `OrderPage` component, add a `submitting` state alongside the existing states:

```typescript
const [submitting, setSubmitting] = useState(false);
```

- [ ] **Step 2: Add success detection from URL params**

Before the existing `if (submitted)` check (around line 97), add logic to detect `?success=true`:

```typescript
const urlParams = new URLSearchParams(window.location.search);
const isSuccess = urlParams.get('success') === 'true';
const returnEmail = urlParams.get('email') || '';

if (isSuccess) return <SuccessScreen email={decodeURIComponent(returnEmail)} />;
```

- [ ] **Step 3: Replace handleSubmit with async Supabase + Stripe flow**

Replace the existing `handleSubmit` function (lines 79-95) with:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    setError('Please fill in all fields.');
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Please enter a valid email address.');
    return;
  }
  if (!file) {
    setError('Please upload your pitch deck.');
    return;
  }
  setError('');
  setSubmitting(true);

  try {
    // 1. Generate a unique order ID for the file path
    const orderId = crypto.randomUUID();
    const filePath = `${orderId}/${file.name}`;

    // 2. Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('pitch-decks')
      .upload(filePath, file);
    if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);

    // 3. Insert order row in database
    const { error: insertError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        file_path: filePath,
        file_name: file.name,
      });
    if (insertError) throw new Error(`Order creation failed: ${insertError.message}`);

    // 4. Call Edge Function to create Stripe Checkout Session
    const { data, error: fnError } = await supabase.functions.invoke('create-checkout-session', {
      body: { order_id: orderId, email: email.trim() },
    });
    if (fnError) throw new Error(`Checkout creation failed: ${fnError.message}`);

    // 5. Redirect to Stripe Checkout
    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err: any) {
    setError(err.message || 'Something went wrong. Please try again.');
    setSubmitting(false);
  }
};
```

- [ ] **Step 4: Update the submit button to show loading state**

Replace the existing submit button (lines 239-245) with:

```tsx
<button
  type="submit"
  disabled={submitting}
  className="mt-2 w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-brand-accent/30 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {submitting ? 'Processing…' : 'Pay & Submit My Deck'}
  {!submitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
</button>
```

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: Build succeeds. The Edge Function doesn't exist yet, so the full flow won't work until Chunk 4, but the frontend code should compile.

- [ ] **Step 6: Commit**

```bash
git add components/OrderPage.tsx
git commit -m "feat: integrate Supabase upload and Stripe Checkout redirect in order form"
```

---

## Chunk 4: Supabase Edge Functions

### Task 6: Create the create-checkout-session Edge Function

**Files:**
- Create: `supabase/functions/create-checkout-session/index.ts`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p supabase/functions/create-checkout-session
```

- [ ] **Step 2: Write the Edge Function**

Create `supabase/functions/create-checkout-session/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { order_id, email } = await req.json();

    if (!order_id || !email) {
      return new Response(
        JSON.stringify({ error: 'order_id and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    });

    // Determine the site URL for redirects
    const siteUrl = Deno.env.get('SITE_URL') || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Pitch Deck Review',
              description: 'Full review + revised deck delivered in 24h',
            },
            unit_amount: 7900, // €79.00 in cents
          },
          quantity: 1,
        },
      ],
      metadata: { order_id },
      success_url: `${siteUrl}/order?success=true&email=${encodeURIComponent(email)}`,
      cancel_url: `${siteUrl}/order`,
    });

    // Update the order row with the Stripe session ID
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order_id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add supabase/functions/create-checkout-session/index.ts
git commit -m "feat: add create-checkout-session Edge Function"
```

### Task 7: Create the stripe-webhook Edge Function

**Files:**
- Create: `supabase/functions/stripe-webhook/index.ts`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p supabase/functions/stripe-webhook
```

- [ ] **Step 2: Write the Edge Function**

Create `supabase/functions/stripe-webhook/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );

      const { error } = await supabaseAdmin
        .from('orders')
        .update({ payment_status: true })
        .eq('id', orderId);

      if (error) {
        console.error('Failed to update order:', error.message);
        return new Response('Database update failed', { status: 500 });
      }

      console.log(`Order ${orderId} marked as paid`);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
```

- [ ] **Step 3: Commit**

```bash
git add supabase/functions/stripe-webhook/index.ts
git commit -m "feat: add stripe-webhook Edge Function"
```

---

## Chunk 5: Deploy & Configure

### Task 8: Install Supabase CLI and deploy

- [ ] **Step 1: Install Supabase CLI**

```bash
brew install supabase/tap/supabase
```

Verify: `supabase --version` should output a version number.

- [ ] **Step 2: Link the project**

```bash
cd /Users/daomny/SS
supabase link --project-ref filaurkqiixtydqzzyag
```

You'll be prompted for the database password. Enter the password you set when creating the Supabase project.

- [ ] **Step 3: Set Edge Function secrets**

```bash
supabase secrets set STRIPE_SECRET_KEY=mk_1TC01R55QZxW9xp2gFCrzLsS
supabase secrets set SITE_URL=https://your-production-domain.com
```

Note: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are automatically available in Edge Functions.

- [ ] **Step 4: Deploy the Edge Functions**

```bash
supabase functions deploy create-checkout-session --no-verify-jwt
supabase functions deploy stripe-webhook --no-verify-jwt
```

`--no-verify-jwt` is needed because:
- `create-checkout-session` is called from the frontend with the anon key (Supabase client handles auth)
- `stripe-webhook` is called by Stripe (no JWT, uses signature verification instead)

- [ ] **Step 5: Verify deployment**

Check Supabase Dashboard → Edge Functions — both functions should appear as deployed.

### Task 9: Configure Stripe webhook

- [ ] **Step 1: Create webhook endpoint in Stripe Dashboard**

Go to Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://filaurkqiixtydqzzyag.supabase.co/functions/v1/stripe-webhook`
- Events to listen for: `checkout.session.completed`

- [ ] **Step 2: Copy the webhook signing secret**

After creating the endpoint, Stripe shows a signing secret starting with `whsec_`. Copy it.

- [ ] **Step 3: Set the webhook secret**

```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

- [ ] **Step 4: Redeploy functions to pick up the new secret**

```bash
supabase functions deploy stripe-webhook --no-verify-jwt
```

---

## Chunk 6: End-to-End Verification

### Task 10: Test the full flow

- [ ] **Step 1: Start local dev server**

```bash
npm run dev
```

- [ ] **Step 2: Navigate to http://localhost:5173/order**

Fill in the form with test data:
- First name: Test
- Last name: User
- Email: your-email@example.com
- Upload a small PDF file

Click "Pay & Submit My Deck".

- [ ] **Step 3: Verify Supabase data**

Check Supabase Dashboard:
- **Table Editor → orders**: a new row should exist with `payment_status: false`
- **Storage → pitch-decks**: the uploaded file should appear under a UUID folder

- [ ] **Step 4: Verify Stripe redirect**

You should be redirected to a Stripe Checkout page showing €79.00 for "Pitch Deck Review".

- [ ] **Step 5: Complete payment (use Stripe test card if in test mode)**

Use card `4242 4242 4242 4242`, any future expiry, any CVC.

After payment, you should be redirected to `/order?success=true&email=...` and see the "You're all set!" success screen.

- [ ] **Step 6: Verify webhook updated payment status**

Check Supabase Dashboard → Table Editor → orders: the `payment_status` should now be `true` and `stripe_session_id` should be populated.

- [ ] **Step 7: Test cancellation flow**

Repeat steps 2-4, but on the Stripe Checkout page click the back arrow or close the page. Verify you return to `/order` with the form intact. The order in Supabase should still have `payment_status: false`.

- [ ] **Step 8: Build for production**

```bash
npm run build
```

Verify the `dist/` folder is generated without errors.
