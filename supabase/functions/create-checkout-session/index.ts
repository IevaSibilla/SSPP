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

  try {
    const { order_id, email } = await req.json();

    if (!order_id || !email) {
      return new Response(
        JSON.stringify({ error: 'order_id and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')!;
    const siteUrl = Deno.env.get('SITE_URL') || 'http://localhost:5173';

    // Create Stripe Checkout Session using REST API
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('customer_email', email);
    params.append('line_items[0][price_data][currency]', 'eur');
    params.append('line_items[0][price_data][product_data][name]', 'Pitch Deck Review');
    params.append('line_items[0][price_data][product_data][description]', 'Full review + revised deck delivered in 24h');
    params.append('line_items[0][price_data][unit_amount]', '7900'); // €79.00 in cents
    params.append('line_items[0][quantity]', '1');
    params.append('metadata[order_id]', order_id);
    params.append('success_url', `${siteUrl}/order?success=true&email=${encodeURIComponent(email)}`);
    params.append('cancel_url', `${siteUrl}/order`);

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
    console.error('Function error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
