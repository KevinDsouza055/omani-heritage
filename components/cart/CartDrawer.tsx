'use client'

import { useCart } from '@/context/CartContext'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${state.isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-stone-700" />
            <span className="font-semibold text-stone-900 text-sm">Your Cart</span>
            {totalItems > 0 && (
              <span className="bg-[#8B6914] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors text-stone-500">
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
                <ShoppingBag size={24} className="text-stone-400" />
              </div>
              <div>
                <p className="font-medium text-stone-700 text-sm">Your cart is empty</p>
                <p className="text-xs text-stone-400 mt-1">Add some beautiful Omani pieces</p>
              </div>
              <Button variant="secondary" size="sm" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {state.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl bg-stone-100 overflow-hidden shrink-0 relative">
                    {product.images?.[0] ? (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={16} className="text-stone-300" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{formatPrice(product.price)}</p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-semibold text-stone-800 w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <span className="text-sm font-semibold text-stone-900">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-stone-100 px-5 py-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-600">Subtotal</span>
              <span className="font-bold text-stone-900">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-stone-400">Shipping calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>
            <button onClick={closeCart} className="text-xs text-center text-stone-400 hover:text-stone-600 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}