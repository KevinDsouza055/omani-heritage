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
      {/* Image container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={28} className="text-stone-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {outOfStock && <Badge variant="out" />}
          {!outOfStock && lowStock && <Badge variant="low" />}
          {hasDiscount && !outOfStock && <Badge variant="sale" />}
        </div>

        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#8B6914] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          <ShoppingBag size={14} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-0.5">
        <p className="text-xs text-stone-400 uppercase tracking-wide">
          {product.category?.name ?? 'Uncategorised'}
        </p>
        <p className="text-sm font-medium text-stone-900 leading-snug line-clamp-2 group-hover:text-[#8B6914] transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-bold text-stone-900">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-xs text-red-600 font-medium">
              -{getDiscountPercentage(product.price, product.compare_at_price!)}%
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}