'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, ArrowRight, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const { state, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

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
      if (data.url) { window.location.href = data.url }
      else { setError('Something went wrong. Please try again.') }
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  if (state.items.length === 0) {
    return (
      <div className="ohg-checkout-empty">
        <ShoppingBag size={40} style={{ opacity: 0.3 }} />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Your cart is empty</p>
        <Link href="/shop" className="ohg-btn ohg-btn-dark ohg-btn-md">Browse Collection</Link>
        <style>{`.ohg-checkout-empty{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:var(--ivory);}`}</style>
      </div>
    )
  }

  return (
    <div className="ohg-co-page">
      <div className="ohg-wrap">
        <div className="ohg-co-header">
          <span className="ohg-label">Secure Checkout</span>
          <h1 className="ohg-h2" style={{ marginTop: 8 }}>Review Your Order</h1>
        </div>

        <div className="ohg-co-grid">

          {/* Items */}
          <div className="ohg-co-items">
            <p className="ohg-co-section-title">Order Summary</p>
            <div className="ohg-co-item-list">
              {state.items.map(({ product, quantity }) => (
                <div key={product.id} className="ohg-co-item">
                  <div className="ohg-co-item-img">
                    {product.images?.[0]
                      ? <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                      : <span style={{ fontSize: 28 }}>🛍</span>
                    }
                    <span className="ohg-co-item-qty">{quantity}</span>
                  </div>
                  <div className="ohg-co-item-info">
                    <p className="ohg-co-item-cat">{product.category?.name}</p>
                    <p className="ohg-co-item-name">{product.name}</p>
                  </div>
                  <span className="ohg-co-item-total">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="ohg-co-summary">
            <p className="ohg-co-section-title">Payment</p>

            <div className="ohg-co-summary-rows">
              <div className="ohg-co-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="ohg-co-summary-row">
                <span>Shipping</span>
                <span style={{ color: 'var(--stone-light)' }}>Calculated next</span>
              </div>
              <div className="ohg-co-summary-row ohg-co-summary-total">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 12, color: '#C0392B', background: '#FEF0EE', padding: '10px 14px', borderRadius: 2 }}>
                {error}
              </p>
            )}

            <button onClick={handleCheckout} disabled={loading} className="ohg-btn ohg-btn-dark ohg-btn-lg ohg-co-btn">
              {loading ? 'Redirecting...' : (
                <><Lock size={14} /> Pay with Stripe <ArrowRight size={14} /></>
              )}
            </button>

            <div className="ohg-co-trust">
              {['🔒 256-bit SSL', '💳 All major cards', '🌍 Multi-currency'].map(t => (
                <span key={t} className="ohg-co-trust-item">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ohg-co-page { background: var(--ivory); min-height: 100vh; padding-bottom: 96px; }
        .ohg-co-header { padding: 64px 0 48px; border-bottom: 1px solid var(--border); margin-bottom: 48px; }
        .ohg-co-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 768px) {
          .ohg-co-grid { grid-template-columns: 1fr 420px; }
        }
        .ohg-co-section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--stone-light);
          margin-bottom: 24px;
        }
        .ohg-co-item-list { display: flex; flex-direction: column; gap: 20px; }
        .ohg-co-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .ohg-co-item:last-child { border-bottom: none; }
        .ohg-co-item-img {
          width: 64px; height: 64px;
          background: var(--ivory-2);
          border-radius: 2px;
          flex-shrink: 0;
          position: relative;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .ohg-co-item-qty {
          position: absolute;
          top: -6px; right: -6px;
          width: 20px; height: 20px;
          background: var(--charcoal);
          color: white;
          font-size: 10px;
          font-weight: 700;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .ohg-co-item-info { flex: 1; min-width: 0; }
        .ohg-co-item-cat { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-dark); }
        .ohg-co-item-name { font-family: var(--font-serif); font-size: 1rem; color: var(--charcoal); margin-top: 4px; }
        .ohg-co-item-total { font-family: var(--font-serif); font-size: 1.05rem; font-weight: 500; color: var(--charcoal); flex-shrink: 0; }

        .ohg-co-summary {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: fit-content;
          position: sticky;
          top: 96px;
        }
        .ohg-co-summary-rows { display: flex; flex-direction: column; gap: 12px; }
        .ohg-co-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--stone);
        }
        .ohg-co-summary-total {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--charcoal);
          padding-top: 12px;
          border-top: 1px solid var(--border);
          margin-top: 4px;
        }
        .ohg-co-btn {
          width: 100%;
          justify-content: center;
          gap: 10px;
        }
        .ohg-co-trust {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ohg-co-trust-item {
          font-size: 11px;
          color: var(--stone-light);
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  )
}