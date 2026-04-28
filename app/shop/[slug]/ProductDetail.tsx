'use client'

import { Product } from '@/lib/types'
import { Carousel } from '@/components/ui/Carousel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/context/CartContext'
import { useSnackbar } from '@/components/ui/Snackbar'
import { formatPrice, isLowStock, isOutOfStock, getDiscountPercentage } from '@/lib/utils'
import { ShoppingBag, Package, Globe, Shield } from 'lucide-react'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { show } = useSnackbar()
  const outOfStock = isOutOfStock(product.stock_quantity)
  const lowStock = isLowStock(product.stock_quantity, product.low_stock_threshold)
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price

  function handleAdd() {
    if (outOfStock) return
    addItem(product)
    show(`${product.name} added to cart`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: images */}
        <Carousel images={product.images} alt={product.name} />

        {/* Right: info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">
              {product.category?.name}
            </p>
            <h1 className="text-2xl font-bold text-stone-900 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-bold text-stone-900">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <>
                  <span className="text-base text-stone-400 line-through">
                    {formatPrice(product.compare_at_price!)}
                  </span>
                  <Badge variant="sale" />
                  <span className="text-sm font-semibold text-red-600">
                    -{getDiscountPercentage(product.price, product.compare_at_price!)}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock status */}
          <div className="flex gap-2">
            {outOfStock && <Badge variant="out" />}
            {!outOfStock && lowStock && <Badge variant="low" />}
            {!outOfStock && !lowStock && (
              <span className="text-xs text-emerald-600 font-medium">In stock</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>
          )}

          {/* Add to cart */}
          <Button
            size="lg"
            onClick={handleAdd}
            disabled={outOfStock}
            className="w-full sm:w-auto"
          >
            <ShoppingBag size={16} />
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-stone-100">
            {[
              { icon: <Package size={14} />, text: 'Authentic Omani' },
              { icon: <Globe size={14} />, text: 'Ships worldwide' },
              { icon: <Shield size={14} />, text: 'Secure checkout' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-stone-50">
                <span className="text-stone-500">{icon}</span>
                <span className="text-[10px] text-stone-500 font-medium leading-tight">{text}</span>
              </div>
            ))}
          </div>

          {/* Product details */}
          <div className="text-xs text-stone-400 flex flex-col gap-1 pt-1">
            {product.sku && <span>SKU: {product.sku}</span>}
            {product.origin && <span>Origin: {product.origin}</span>}
            {product.weight_grams && <span>Weight: {product.weight_grams}g</span>}
          </div>
        </div>
      </div>
    </div>
  )
}