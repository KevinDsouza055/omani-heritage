import Link from 'next/link'
import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'

export function HomeFeatured({ products }: { products: Product[] }) {
  if (!products.length) return null
  return (
    <section style={{ background: 'var(--ivory-2)', padding: '96px 0' }}>
      <div className="ohg-wrap">
        <div className="ohg-section-head">
          <div>
            <span className="ohg-label" style={{ marginBottom: 12 }}>Handpicked</span>
            <h2 className="ohg-h2">Latest Arrivals</h2>
          </div>
          <Link href="/shop" className="ohg-view-all">View full collection</Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}