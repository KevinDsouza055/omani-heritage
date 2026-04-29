import Link from 'next/link'
import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'

export function HomeFeatured({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <section style={{ backgroundColor: '#F7F4EF', padding: '5rem 0' }}>
      <div className="page-container">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Handpicked</p>
            <h2 className="section-title">Latest Products</h2>
          </div>
          <Link href="/shop" className="view-all-link">View all →</Link>
        </div>
        <ProductGrid products={products} />
      </div>

      <style>{`
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }
        .section-eyebrow {
          font-size: 11px;
          font-weight: 600;
          color: #8B6914;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .section-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #1C1917;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .view-all-link {
          font-size: 13px;
          font-weight: 500;
          color: #78716C;
          text-decoration: none;
          transition: color 0.15s;
        }
        .view-all-link:hover { color: #1C1917; }
      `}</style>
    </section>
  )
}