'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const { state, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: state.items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-5 text-center">
        <ShoppingBag size={40} className="text-stone-300" />
        <p className="font-medium text-stone-700">Your cart is empty</p>
        <Link href="/shop"><Button>Browse Products</Button></Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order review */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-stone-800 text-sm">Order Review</h2>
          <div className="flex flex-col gap-3">
            {state.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 p-3 rounded-xl border border-stone-100 bg-white">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={16} className="text-stone-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                  <p className="text-xs text-stone-500">Qty: {quantity}</p>
                </div>
                <span className="text-sm font-semibold text-stone-900 shrink-0">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment summary */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-stone-800 text-sm">Payment Summary</h2>
          <div className="rounded-2xl border border-stone-100 bg-white p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-stone-400">Calculated by Stripe</span>
              </div>
              <div className="border-t border-stone-100 pt-2 mt-1 flex justify-between font-bold text-stone-900 text-base">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button size="lg" className="w-full" onClick={handleCheckout} loading={loading}>
              Pay with Stripe <ArrowRight size={16} />
            </Button>

            <div className="flex flex-col gap-1.5">
              {['🔒 256-bit SSL encryption', '💳 All major cards accepted', '🌍 Multi-currency support'].map(t => (
                <p key={t} className="text-xs text-stone-400">{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}