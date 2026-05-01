'use client'

import { Product } from '@/lib/types'
import { Carousel } from '@/components/ui/Carousel'
import { useCart } from '@/context/CartContext'
import { useSnackbar } from '@/components/ui/Snackbar'
import { formatPrice, isLowStock, isOutOfStock, getDiscountPercentage } from '@/lib/utils'
import { ShoppingBag, Package, Globe, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { show }    = useSnackbar()
  const outOfStock  = isOutOfStock(product.stock_quantity)
  const lowStock    = isLowStock(product.stock_quantity, product.low_stock_threshold)
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price

  function handleAdd() {
    if (outOfStock) return
    addItem(product)
    show(`${product.name} added to cart`)
  }

  return (
    <div className="ohg-pd-page">

      {/* Breadcrumb */}
      <div className="ohg-wrap">
        <div className="ohg-pd-breadcrumb">
          <Link href="/shop" className="ohg-pd-back">
            <ArrowLeft size={14} />
            <span>Back to Shop</span>
          </Link>
          <span className="ohg-pd-breadcrumb-sep">/</span>
          <span className="ohg-pd-breadcrumb-cat">{product.category?.name}</span>
          <span className="ohg-pd-breadcrumb-sep">/</span>
          <span className="ohg-pd-breadcrumb-current">{product.name}</span>
        </div>
      </div>

      <div className="ohg-wrap ohg-pd-grid">

        {/* Left — images */}
        <div className="ohg-pd-left">
          {product.images?.length > 0 ? (
            <Carousel images={product.images} alt={product.name} />
          ) : (
            <div className="ohg-pd-no-img">
              <span className="ohg-pd-no-img-emoji">
                {product.category?.slug === 'aromatics' ? '🕯' :
                 product.category?.slug === 'basketry' ? '🧺' :
                 product.category?.slug === 'silverware' ? '⚱️' :
                 product.category?.slug === 'rugs' ? '🏺' : '🛍'}
              </span>
              <span className="ohg-pd-no-img-label">Image coming soon</span>
            </div>
          )}
        </div>

        {/* Right — info */}
        <div className="ohg-pd-right">

          <div className="ohg-pd-meta">
            <span className="ohg-label">{product.category?.name}</span>
            <span className="ohg-pd-origin">Origin: {product.origin}</span>
          </div>

          <h1 className="ohg-pd-title">{product.name}</h1>

          <div className="ohg-pd-divider" />

          {/* Price */}
          <div className="ohg-pd-price-row">
            <span className="ohg-pd-price">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="ohg-pd-was">{formatPrice(product.compare_at_price!)}</span>
                <span className="ohg-badge ohg-badge-sale">
                  -{getDiscountPercentage(product.price, product.compare_at_price!)}% off
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="ohg-pd-stock">
            {outOfStock
              ? <span className="ohg-pd-stock-out">● Out of stock</span>
              : lowStock
              ? <span className="ohg-pd-stock-low">● Low stock — only {product.stock_quantity} left</span>
              : <span className="ohg-pd-stock-in">● In stock</span>
            }
          </div>

          {/* Description */}
          {product.description && (
            <p className="ohg-pd-desc">{product.description}</p>
          )}

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="ohg-btn ohg-btn-dark ohg-btn-lg ohg-pd-cta"
          >
            <ShoppingBag size={16} />
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Trust pills */}
          <div className="ohg-pd-trust">
            {[
              { icon: <Package size={14} />, text: 'Authentic Omani' },
              { icon: <Globe size={14} />,   text: 'Ships worldwide' },
              { icon: <Shield size={14} />,  text: 'Secure checkout' },
            ].map(({ icon, text }) => (
              <div key={text} className="ohg-pd-trust-pill">
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="ohg-pd-details">
            {product.sku           && <div className="ohg-pd-detail"><span>SKU</span><span>{product.sku}</span></div>}
            {product.origin        && <div className="ohg-pd-detail"><span>Origin</span><span>{product.origin}</span></div>}
            {product.weight_grams  && <div className="ohg-pd-detail"><span>Weight</span><span>{product.weight_grams}g</span></div>}
          </div>
        </div>
      </div>

      <style>{`
        .ohg-pd-page {
          background: var(--ivory);
          min-height: 100vh;
          padding-bottom: 96px;
        }
        .ohg-pd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 24px 0;
          font-size: 12px;
          color: var(--stone-light);
          flex-wrap: wrap;
        }
        .ohg-pd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--stone);
          font-weight: 500;
          transition: color 0.25s;
        }
        .ohg-pd-back:hover { color: var(--charcoal); }
        .ohg-pd-breadcrumb-sep { opacity: 0.4; }
        .ohg-pd-breadcrumb-cat { color: var(--stone); }
        .ohg-pd-breadcrumb-current {
          color: var(--charcoal);
          font-weight: 500;
        }

        .ohg-pd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          padding-top: 16px;
        }
        @media (min-width: 768px) {
          .ohg-pd-grid {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
        }
        @media (min-width: 1024px) {
          .ohg-pd-grid { grid-template-columns: 55% 45%; }
        }

        .ohg-pd-left {}
        .ohg-pd-no-img {
          aspect-ratio: 1;
          background: var(--ivory-2);
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .ohg-pd-no-img-emoji { font-size: 80px; opacity: 0.4; }
        .ohg-pd-no-img-label {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--stone-light);
        }

        .ohg-pd-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 8px;
        }
        .ohg-pd-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ohg-pd-origin {
          font-size: 11px;
          color: var(--stone-light);
          letter-spacing: 0.06em;
        }
        .ohg-pd-title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3vw, 2.75rem);
          font-weight: 500;
          color: var(--charcoal);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-top: -4px;
        }
        .ohg-pd-divider {
          width: 48px;
          height: 1px;
          background: var(--gold);
          margin: 0;
        }
        .ohg-pd-price-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }
        .ohg-pd-price {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .ohg-pd-was {
          font-size: 1.1rem;
          color: var(--stone-light);
          text-decoration: line-through;
        }
        .ohg-pd-stock { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; }
        .ohg-pd-stock-in  { color: #2D7A47; }
        .ohg-pd-stock-low { color: #B7791F; }
        .ohg-pd-stock-out { color: var(--stone-light); }
        .ohg-pd-desc {
          font-size: 15px;
          color: var(--stone);
          line-height: 1.8;
        }
        .ohg-pd-cta {
          width: 100%;
          justify-content: center;
          margin-top: 4px;
        }
        .ohg-pd-trust {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ohg-pd-trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          background: var(--ivory-2);
          border: 1px solid var(--border);
          border-radius: 2px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--stone);
        }
        .ohg-pd-details {
          border-top: 1px solid var(--border);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ohg-pd-detail {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .ohg-pd-detail span:first-child {
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--stone-light);
        }
        .ohg-pd-detail span:last-child { color: var(--charcoal); }
      `}</style>
    </div>
  )
}