import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase-server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const supabase = await createClient()

      // Get customer email from session
      const customerEmail = session.customer_details?.email
      if (!customerEmail) return NextResponse.json({ received: true })

      // Find or create customer
      let { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', customerEmail)
        .single()

      if (!customer) {
        const { data: newCustomer } = await supabase
          .from('customers')
          .insert({
            email: customerEmail,
            full_name: session.customer_details?.name ?? null,
          })
          .select('id')
          .single()
        customer = newCustomer
      }

      // Create order
      if (customer) {
        await supabase.from('orders').insert({
          customer_id: customer.id,
          status: 'processing',
          total_amount: (session.amount_total ?? 0) / 100,
          currency: session.currency?.toUpperCase() ?? 'USD',
          stripe_payment_id: session.payment_intent as string,
          shipping_address: session.shipping_details ? {
            full_name: session.shipping_details.name,
            line1: session.shipping_details.address?.line1,
            line2: session.shipping_details.address?.line2,
            city: session.shipping_details.address?.city,
            state: session.shipping_details.address?.state,
            postal_code: session.shipping_details.address?.postal_code,
            country: session.shipping_details.address?.country,
          } : null,
        })
      }
    } catch (err) {
      console.error('Order creation error:', err)
    }
  }

  return NextResponse.json({ received: true })
}