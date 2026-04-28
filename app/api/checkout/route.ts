import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { items, currency = 'usd' } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: { product: { name: string; images: string[]; price: number }; quantity: number }) => ({
        price_data: {
          currency,
          product_data: {
            name: item.product.name,
            images: item.product.images?.slice(0, 1) ?? [],
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'AE', 'IN', 'OM', 'SA', 'QA', 'KW', 'BH', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL', 'SG', 'MY'],
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}