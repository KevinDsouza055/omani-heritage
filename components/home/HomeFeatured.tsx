import Link from 'next/link'
import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'

export function HomeFeatured({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <section className="bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-1">Handpicked</p>
            <h2 className="text-2xl font-bold text-stone-900">Latest Products</h2>
          </div>
          <Link href="/shop" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            View all →
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}