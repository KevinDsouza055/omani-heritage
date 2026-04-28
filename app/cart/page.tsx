'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { formatPrice, isOutOfStock } from '@/lib/utils'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { state, removeItem, updateQty, totalPrice, totalItems } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-5 text-center">
        <div className="w-20 h-20 rounded-3xl bg-stone-100 flex items-center justify-center">
          <ShoppingBag size={32} className="text-stone-300" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-stone-900">Your cart is empty</h1>
          <p className="text-sm text-stone-500 mt-1">Add some beautiful Omani pieces to get started</p>
        </div>
        <Link href="/shop">
          <Button size="lg">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">
        Your Cart <span className="text-stone-400 font-normal text-lg">({totalItems} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {state.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-2xl border border-stone-100 bg-white">
              {/* Image */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={20} className="text-stone-300" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-400 uppercase tracking-wide">{product.category?.name}</p>
                <p className="font-medium text-stone-900 text-sm mt-0.5 truncate">{product.name}</p>
                <p className="text-xs text-stone-500 mt-0.5">{formatPrice(product.price)} each</p>

                {/* Qty */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQty(product.id, quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQty(product.id, quantity + 1)}
                    disabled={quantity >= product.stock_quantity}
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors disabled:opacity-40"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Price + remove */}
              <div className="flex flex-col items-end justify-between shrink-0">
                <span className="font-bold text-stone-900 text-sm">{formatPrice(product.price * quantity)}</span>
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-stone-100 bg-white p-6 flex flex-col gap-4">
            <h2 className="font-bold text-stone-900">Order Summary</h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-stone-400">Calculated at checkout</span>
              </div>
              <div className="border-t border-stone-100 pt-2 mt-1 flex justify-between font-bold text-stone-900">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full" size="lg">
                Checkout <ArrowRight size={16} />
              </Button>
            </Link>

            <Link href="/shop" className="text-xs text-center text-stone-400 hover:text-stone-600 transition-colors">
              Continue Shopping
            </Link>

            {/* Trust */}
            <div className="border-t border-stone-100 pt-3 flex flex-col gap-1.5">
              {['🔒 Secure checkout via Stripe', '🌍 International shipping available', '↩️ 14-day return policy'].map(t => (
                <p key={t} className="text-xs text-stone-400">{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}