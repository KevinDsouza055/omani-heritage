import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, loading }: { products: Product[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="ohg-pgrid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="ohg-skeleton" style={{ aspectRatio: '3/4', borderRadius: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="ohg-skeleton" style={{ height: 9, width: '35%', borderRadius: 2 }} />
              <div className="ohg-skeleton" style={{ height: 16, width: '80%', borderRadius: 2 }} />
              <div className="ohg-skeleton" style={{ height: 18, width: '28%', borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <style>{`
          .ohg-pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:48px 24px;}
          @media(min-width:640px){.ohg-pgrid{grid-template-columns:repeat(3,1fr);}}
          @media(min-width:1024px){.ohg-pgrid{grid-template-columns:repeat(4,1fr);}}
        `}</style>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div style={{ textAlign: 'center', padding: '96px 0' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', marginBottom: 24, opacity: 0.3 }}>◎</p>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: 8 }}>No products found</p>
        <p style={{ fontSize: 13, color: 'var(--stone-light)', letterSpacing: '0.06em' }}>Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <>
      <div className="ohg-pgrid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <style>{`
        .ohg-pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:48px 24px;}
        @media(min-width:640px){.ohg-pgrid{grid-template-columns:repeat(3,1fr);}}
        @media(min-width:1024px){.ohg-pgrid{grid-template-columns:repeat(4,1fr);}}
      `}</style>
    </>
  )
}