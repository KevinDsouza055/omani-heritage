import Link from 'next/link'
import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'

export function HomeFeatured({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <section className="py-20 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] text-[#8B6914] font-semibold uppercase tracking-widest mb-2">Handpicked</p>
            <h2 className="text-3xl font-bold text-[#1C1917]">Latest Products</h2>
          </div>
          <Link href="/shop"
            className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors font-medium">
            View all →
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}