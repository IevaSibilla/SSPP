import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
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

  // Server-side tier pricing. The client may only pick a tier keyword,
  // never an arbitrary price.
  const TIERS: Record<string, { name: string; description: string; amount: number; returnPath: string; emailSubject: string }> = {
    'deck-review': {
      name: 'Pitch Deck Review',
      description: 'Full review delivered in 24h',
      amount: 29900,
      returnPath: '/order',
      emailSubject: 'New pitch deck submission',
    },
    'startup-vetting': {
      name: 'Startup Vetting',
      description: 'Full pitch, business & plan vetting + vetted-list review',
      amount: 150000,
      returnPath: '/vetted-startups/apply',
      emailSubject: 'New startup vetting application',
    },
  };

  try {
    const { order_id, email, tier } = await req.json();

    if (!order_id || !email) {
      return new Response(
        JSON.stringify({ error: 'order_id and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const selected = TIERS[tier] ?? TIERS['deck-review'];

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')!;
    const siteUrl = Deno.env.get('SITE_URL') || 'http://localhost:5173';

    // Create Stripe Checkout Session using REST API
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('customer_email', email);
    params.append('line_items[0][price_data][currency]', 'eur');
    params.append('line_items[0][price_data][product_data][name]', selected.name);
    params.append('line_items[0][price_data][product_data][description]', selected.description);
    params.append('line_items[0][price_data][unit_amount]', String(selected.amount));
    params.append('line_items[0][quantity]', '1');
    params.append('metadata[order_id]', order_id);
    params.append('allow_promotion_codes', 'true');
    params.append('success_url', `${siteUrl}${selected.returnPath}?success=true&email=${encodeURIComponent(email)}`);
    params.append('cancel_url', `${siteUrl}${selected.returnPath}`);

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('Stripe error:', JSON.stringify(session));
      return new Response(
        JSON.stringify({ error: session.error?.message || 'Stripe request failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update the order row with the Stripe session ID and mark document as submitted
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: order, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id, document_submitted: true })
      .eq('id', order_id)
      .select('first_name, last_name, file_name')
      .single();

    if (updateError) {
      console.error('DB update error:', JSON.stringify(updateError));
    }

    // Send email notification to Ieva
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (resendKey) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@notifications.aekora.com',
          to: 'IevaStrupule@gmail.com',
          subject: selected.emailSubject,
          html: `
            <p>A new pitch deck has been submitted and is ready for review in Supabase.</p>
            <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
              <tr><td style="color:#888">First name</td><td><strong>${order?.first_name ?? ''}</strong></td></tr>
              <tr><td style="color:#888">Last name</td><td><strong>${order?.last_name ?? ''}</strong></td></tr>
              <tr><td style="color:#888">Email</td><td><strong>${email}</strong></td></tr>
              <tr><td style="color:#888">Order ID</td><td><strong>${order_id}</strong></td></tr>
            </table>
          `,
        }),
      });
      if (!emailRes.ok) {
        const emailErr = await emailRes.text();
        console.error('Resend error:', emailErr);
      }
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Function error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
