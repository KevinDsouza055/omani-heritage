'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatPrice, isLowStock, isOutOfStock, getDiscountPercentage } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useSnackbar } from '@/components/ui/Snackbar'
import { Badge } from '@/components/ui/Badge'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { show } = useSnackbar()

  const outOfStock = isOutOfStock(product.stock_quantity)
  const lowStock = isLowStock(product.stock_quantity, product.low_stock_threshold)
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (outOfStock) return
    addItem(product)
    show(`${product.name} added to cart`)
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col gap-3">
      {/* Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#EFEBE3] border border-[#E7E0D5]">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={28} className="text-[#C9A84C]/40" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {outOfStock && <Badge variant="out" />}
          {!outOfStock && lowStock && <Badge variant="low" />}
          {hasDiscount && !outOfStock && <Badge variant="sale" />}
        </div>

        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-[#1C1917] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:bg-[#8B6914] disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
          aria-label="Add to cart"
        >
          <ShoppingBag size={14} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-0.5">
        <p className="text-[10px] font-semibold text-[#8B6914] uppercase tracking-widest">
          {product.category?.name ?? 'Uncategorised'}
        </p>
        <p className="text-sm font-semibold text-[#1C1917] leading-snug line-clamp-2 group-hover:text-[#8B6914] transition-colors duration-200">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-bold text-[#1C1917]">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <>
              <span className="text-xs text-[#78716C] line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
              <span className="text-[10px] font-bold text-red-500">
                -{getDiscountPercentage(product.price, product.compare_at_price!)}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}