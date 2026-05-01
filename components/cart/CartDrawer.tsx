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
        <div className="ohg-cart-backdrop" onClick={closeCart} />
      )}

      <div className={`ohg-cart-drawer ${state.isOpen ? 'open' : ''}`}>

        {/* Header */}
        <div className="ohg-cart-header">
          <div className="ohg-cart-header-left">
            <ShoppingBag size={16} />
            <span>Your Cart</span>
            {totalItems > 0 && <span className="ohg-cart-count">{totalItems}</span>}
          </div>
          <button onClick={closeCart} className="ohg-cart-close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="ohg-cart-body">
          {state.items.length === 0 ? (
            <div className="ohg-cart-empty">
              <div className="ohg-cart-empty-icon">
                <ShoppingBag size={28} />
              </div>
              <p className="ohg-cart-empty-title">Your cart is empty</p>
              <p className="ohg-cart-empty-sub">Add some beautiful Omani pieces</p>
              <button onClick={closeCart} className="ohg-btn ohg-btn-outline-gold ohg-btn-sm" style={{ marginTop: 8 }}>
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="ohg-cart-items">
              {state.items.map(({ product, quantity }) => (
                <div key={product.id} className="ohg-cart-item">
                  <div className="ohg-cart-item-img">
                    {product.images?.[0]
                      ? <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                      : <span style={{ fontSize: 28 }}>🛍</span>
                    }
                  </div>
                  <div className="ohg-cart-item-info">
                    <p className="ohg-cart-item-cat">{product.category?.name}</p>
                    <p className="ohg-cart-item-name">{product.name}</p>
                    <p className="ohg-cart-item-price">{formatPrice(product.price)} each</p>
                    <div className="ohg-cart-item-qty">
                      <button onClick={() => updateQty(product.id, quantity - 1)} className="ohg-cart-qty-btn">
                        <Minus size={10} />
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQty(product.id, quantity + 1)} className="ohg-cart-qty-btn">
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="ohg-cart-item-right">
                    <span className="ohg-cart-item-total">{formatPrice(product.price * quantity)}</span>
                    <button onClick={() => removeItem(product.id)} className="ohg-cart-remove">
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
          <div className="ohg-cart-footer">
            <div className="ohg-cart-subtotal">
              <span>Subtotal</span>
              <span className="ohg-cart-subtotal-amt">{formatPrice(totalPrice)}</span>
            </div>
            <p className="ohg-cart-note">Shipping & taxes calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart} className="ohg-btn ohg-btn-dark ohg-btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="ohg-cart-continue">
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        .ohg-cart-backdrop {
          position: fixed; inset: 0;
          background: rgba(26,24,20,0.5);
          backdrop-filter: blur(4px);
          z-index: 200;
        }
        .ohg-cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 100%; max-width: 420px;
          background: var(--ivory);
          z-index: 201;
          display: flex; flex-direction: column;
          box-shadow: -4px 0 48px rgba(26,24,20,0.15);
          transform: translateX(100%);
          transition: transform 0.45s var(--ease-luxury);
        }
        .ohg-cart-drawer.open { transform: translateX(0); }

        .ohg-cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--border);
          background: var(--white);
        }
        .ohg-cart-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--charcoal);
        }
        .ohg-cart-count {
          width: 20px; height: 20px;
          background: var(--gold);
          color: white;
          font-size: 10px;
          font-weight: 700;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .ohg-cart-close {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 2px;
          background: none; border: none;
          color: var(--stone);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .ohg-cart-close:hover { background: var(--ivory-2); color: var(--charcoal); }

        .ohg-cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px 28px;
        }
        .ohg-cart-empty {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
          padding: 40px 0;
        }
        .ohg-cart-empty-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--ivory-2);
          display: flex; align-items: center; justify-content: center;
          color: var(--stone-light);
          margin-bottom: 8px;
        }
        .ohg-cart-empty-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--charcoal);
        }
        .ohg-cart-empty-sub { font-size: 13px; color: var(--stone-light); }

        .ohg-cart-items { display: flex; flex-direction: column; gap: 20px; }
        .ohg-cart-item {
          display: flex;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .ohg-cart-item:last-child { border-bottom: none; }
        .ohg-cart-item-img {
          width: 72px; height: 88px;
          border-radius: 2px;
          background: var(--ivory-2);
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .ohg-cart-item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
        .ohg-cart-item-cat {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }
        .ohg-cart-item-name {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 500;
          color: var(--charcoal);
          line-height: 1.3;
        }
        .ohg-cart-item-price { font-size: 12px; color: var(--stone); margin-top: 2px; }
        .ohg-cart-item-qty {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }
        .ohg-cart-item-qty span {
          font-size: 13px;
          font-weight: 600;
          color: var(--charcoal);
          min-width: 16px;
          text-align: center;
        }
        .ohg-cart-qty-btn {
          width: 24px; height: 24px;
          border: 1px solid var(--border);
          background: none;
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--stone);
          transition: all 0.2s;
        }
        .ohg-cart-qty-btn:hover { border-color: var(--charcoal); color: var(--charcoal); }

        .ohg-cart-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .ohg-cart-item-total {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .ohg-cart-remove {
          background: none; border: none;
          color: var(--stone-light);
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }
        .ohg-cart-remove:hover { color: #C0392B; }

        .ohg-cart-footer {
          padding: 24px 28px;
          border-top: 1px solid var(--border);
          background: var(--white);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ohg-cart-subtotal {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ohg-cart-subtotal span:first-child {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--stone);
        }
        .ohg-cart-subtotal-amt {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .ohg-cart-note {
          font-size: 11px;
          color: var(--stone-light);
          margin-top: -8px;
        }
        .ohg-cart-continue {
          background: none; border: none;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--stone-light);
          cursor: pointer;
          text-align: center;
          transition: color 0.25s;
          padding: 4px;
        }
        .ohg-cart-continue:hover { color: var(--charcoal); }
      `}</style>
    </>
  )
}