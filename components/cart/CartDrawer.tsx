'use client'

import { useCart } from '@/context/CartContext'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      {state.isOpen && (
        <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-sm z-40" onClick={closeCart} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-[#F7F4EF] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${state.isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E0D5] bg-[#EFEBE3]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={17} className="text-[#8B6914]" />
            <span className="font-bold text-[#1C1917] text-sm">Your Cart</span>
            {totalItems > 0 && (
              <span className="bg-[#8B6914] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 rounded-lg hover:bg-[#E7E0D5] transition-colors text-[#78716C]">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#EFEBE3] flex items-center justify-center">
                <ShoppingBag size={24} className="text-[#C9A84C]/60" />
              </div>
              <div>
                <p className="font-semibold text-[#1C1917] text-sm">Your cart is empty</p>
                <p className="text-xs text-[#78716C] mt-1">Add some beautiful Omani pieces</p>
              </div>
              <button onClick={closeCart} className="text-xs font-semibold text-[#8B6914] hover:underline">
                Continue Shopping →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {state.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 p-3.5 rounded-2xl bg-white border border-[#E7E0D5]">
                  <div className="w-16 h-16 rounded-xl bg-[#EFEBE3] overflow-hidden shrink-0 relative">
                    {product.images?.[0] ? (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={16} className="text-[#C9A84C]/40" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-[#8B6914] uppercase tracking-wider">
                      {product.category?.name}
                    </p>
                    <p className="text-sm font-semibold text-[#1C1917] truncate mt-0.5">{product.name}</p>
                    <p className="text-xs text-[#78716C] mt-0.5">{formatPrice(product.price)} each</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <button onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-[#EFEBE3] hover:bg-[#E7E0D5] flex items-center justify-center transition-colors">
                        <Minus size={11} className="text-[#1C1917]" />
                      </button>
                      <span className="text-xs font-bold text-[#1C1917] w-4 text-center">{quantity}</span>
                      <button onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-[#EFEBE3] hover:bg-[#E7E0D5] flex items-center justify-center transition-colors">
                        <Plus size={11} className="text-[#1C1917]" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0">
                    <span className="text-sm font-bold text-[#1C1917]">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button onClick={() => removeItem(product.id)}
                      className="p-1.5 rounded-lg text-[#78716C] hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-[#E7E0D5] bg-[#EFEBE3] px-6 py-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#78716C] font-medium">Subtotal</span>
              <span className="font-bold text-[#1C1917] text-lg">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[11px] text-[#78716C]">Shipping and taxes calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1C1917] text-white text-sm font-bold hover:bg-[#292524] transition-all shadow-md">
              Proceed to Checkout
            </Link>
            <button onClick={closeCart}
              className="text-xs text-center text-[#78716C] hover:text-[#1C1917] transition-colors font-medium">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}