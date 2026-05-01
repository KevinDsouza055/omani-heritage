'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatPrice, isLowStock, isOutOfStock, getDiscountPercentage } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useSnackbar } from '@/components/ui/Snackbar'

const EMOJI: Record<string, string> = {
  aromatics: '🕯', basketry: '🧺', silverware: '⚱️',
  rugs: '🏺', pottery: '🫙', 'wooden-items': '🪵',
  leather: '👜', clothing: '🧣',
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem }  = useCart()
  const { show }     = useSnackbar()

  const outOfStock = isOutOfStock(product.stock_quantity)
  const lowStock   = isLowStock(product.stock_quantity, product.low_stock_threshold)
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const emoji      = EMOJI[product.category?.slug ?? ''] ?? '🛍'

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return
    addItem(product)
    show(`${product.name} added to cart`)
  }

  return (
    <Link href={`/shop/${product.slug}`} className="ohg-pc">

      {/* Image area */}
      <div className="ohg-pc-img">
        {product.images?.[0]
          ? <Image src={product.images[0]} alt={product.name} fill className="ohg-pc-photo" />
          : (
            <div className="ohg-pc-placeholder">
              <span className="ohg-pc-emoji">{emoji}</span>
            </div>
          )
        }

        {/* Badges */}
        {(outOfStock || lowStock || hasDiscount) && (
          <div className="ohg-pc-badges">
            {outOfStock  && <span className="ohg-badge ohg-badge-out">Sold out</span>}
            {!outOfStock && lowStock && <span className="ohg-badge ohg-badge-low">Low stock</span>}
            {!outOfStock && hasDiscount && <span className="ohg-badge ohg-badge-sale">Sale</span>}
          </div>
        )}

        {/* Add to cart */}
        {!outOfStock && (
          <button onClick={handleAdd} className="ohg-pc-cta" aria-label="Add to cart">
            <ShoppingBag size={13} />
            <span>Add to Cart</span>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="ohg-pc-info">
        <p className="ohg-pc-cat">{product.category?.name ?? 'Uncategorised'}</p>
        <p className="ohg-pc-name">{product.name}</p>
        <div className="ohg-pc-prices">
          <span className="ohg-pc-price">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <>
              <span className="ohg-pc-was">{formatPrice(product.compare_at_price!)}</span>
              <span className="ohg-pc-save">-{getDiscountPercentage(product.price, product.compare_at_price!)}%</span>
            </>
          )}
        </div>
      </div>

      <style>{`
        .ohg-pc { display: flex; flex-direction: column; gap: 16px; text-decoration: none; }

        .ohg-pc-img {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 2px;
          overflow: hidden;
          background: var(--ivory-2);
        }

        .ohg-pc-photo {
          object-fit: cover;
          transition: transform 0.7s var(--ease-luxury);
        }
        .ohg-pc:hover .ohg-pc-photo { transform: scale(1.08); }

        .ohg-pc-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: var(--ivory-2);
        }
        .ohg-pc-emoji {
          font-size: 56px;
          opacity: 0.5;
          transition: opacity 0.4s, transform 0.4s var(--ease-luxury);
        }
        .ohg-pc:hover .ohg-pc-emoji { opacity: 0.65; transform: scale(1.1); }

        .ohg-pc-badges {
          position: absolute;
          top: 12px; left: 12px;
          display: flex; flex-direction: column; gap: 4px;
        }

        .ohg-pc-cta {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(26,24,20,0.92);
          color: white;
          border: none;
          padding: 14px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          cursor: pointer;
          transform: translateY(100%);
          transition: transform 0.4s var(--ease-luxury), background 0.25s;
        }
        .ohg-pc:hover .ohg-pc-cta { transform: translateY(0); }
        .ohg-pc-cta:hover { background: var(--gold-dark); }

        .ohg-pc-info {
          display: flex; flex-direction: column; gap: 6px;
          padding: 0;
        }
        .ohg-pc-cat {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }
        .ohg-pc-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--charcoal);
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.25s;
        }
        .ohg-pc:hover .ohg-pc-name { color: var(--gold-dark); }
        .ohg-pc-prices {
          display: flex; align-items: baseline; gap: 8px;
          margin-top: 2px;
        }
        .ohg-pc-price {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .ohg-pc-was {
          font-size: 12px;
          color: var(--stone-light);
          text-decoration: line-through;
        }
        .ohg-pc-save {
          font-size: 10px;
          font-weight: 700;
          color: #C0392B;
        }
      `}</style>
    </Link>
  )
}