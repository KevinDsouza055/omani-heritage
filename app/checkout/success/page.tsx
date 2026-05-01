'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function SuccessPage() {
  const { clearCart } = useCart()
  useEffect(() => { clearCart() }, [])

  return (
    <div className="ohg-success">
      <div className="ohg-success-card">
        <div className="ohg-success-icon">✦</div>
        <h1 className="ohg-success-title">Order Confirmed</h1>
        <div className="ohg-success-divider" />
        <p className="ohg-success-body">
          Thank you for your purchase. You will receive a confirmation email shortly with your order details and tracking information.
        </p>
        <div className="ohg-success-actions">
          <Link href="/shop" className="ohg-btn ohg-btn-dark ohg-btn-lg">Continue Shopping</Link>
          <Link href="/account/orders" className="ohg-btn ohg-btn-outline ohg-btn-lg">View My Orders</Link>
        </div>
      </div>

      <style>{`
        .ohg-success {
          min-height: 100vh;
          background: var(--ivory-2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .ohg-success-card {
          max-width: 480px;
          width: 100%;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 64px 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .ohg-success-icon {
          font-size: 2.5rem;
          color: var(--gold);
          line-height: 1;
        }
        .ohg-success-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .ohg-success-divider {
          width: 48px;
          height: 1px;
          background: var(--gold);
        }
        .ohg-success-body {
          font-size: 14px;
          color: var(--stone);
          line-height: 1.8;
        }
        .ohg-success-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }
      `}</style>
    </div>
  )
}