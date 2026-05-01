import Link from 'next/link'
import { Category } from '@/lib/types'

const MAP: Record<string, { emoji: string; desc: string }> = {
  aromatics:     { emoji: '🕯',  desc: 'Soaps, candles & fragrances' },
  basketry:      { emoji: '🧺',  desc: 'Handwoven palm crafts' },
  silverware:    { emoji: '⚱️',  desc: 'Traditional jewellery' },
  rugs:          { emoji: '🏺',  desc: 'Handcrafted textiles' },
  pottery:       { emoji: '🫙',  desc: 'Clay & ceramic pieces' },
  'wooden-items':{ emoji: '🪵',  desc: 'Hand-carved woodwork' },
  leather:       { emoji: '👜',  desc: 'Traditional leather goods' },
  clothing:      { emoji: '🧣',  desc: 'Garments & accessories' },
}

export function HomeCategories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null

  return (
    <section className="ohg-cats">
      <div className="ohg-wrap">
        <div className="ohg-section-head">
          <div>
            <span className="ohg-label" style={{ marginBottom: 12 }}>Our Collection</span>
            <h2 className="ohg-h2">Shop by Craft</h2>
          </div>
          <Link href="/shop" className="ohg-view-all">View all crafts</Link>
        </div>

        <div className="ohg-cats-grid">
          {categories.map(cat => {
            const meta = MAP[cat.slug] ?? { emoji: '🛍', desc: 'Artisan crafts' }
            return (
              <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="ohg-cat">
                <div className="ohg-cat-inner">
                  <div className="ohg-cat-icon">{meta.emoji}</div>
                  <div className="ohg-cat-overlay">
                    <span className="ohg-cat-name">{cat.name}</span>
                    <span className="ohg-cat-desc">{meta.desc}</span>
                    <span className="ohg-cat-cta">Browse →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .ohg-cats {
          background: var(--ivory);
          padding: 96px 0;
        }
        .ohg-cats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        @media (min-width: 640px)  { .ohg-cats-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .ohg-cats-grid { grid-template-columns: repeat(4, 1fr); } }

        .ohg-cat {
          display: block;
          text-decoration: none;
          aspect-ratio: 1;
          overflow: hidden;
          background: var(--ivory-2);
          position: relative;
        }
        .ohg-cat-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.5s var(--ease-luxury);
        }
        .ohg-cat-icon {
          font-size: 52px;
          transition: all 0.5s var(--ease-luxury);
          opacity: 0.7;
        }
        .ohg-cat-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26,24,20,0.88);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.45s var(--ease-luxury);
        }
        .ohg-cat:hover .ohg-cat-overlay { opacity: 1; }
        .ohg-cat:hover .ohg-cat-icon { transform: scale(0.7); opacity: 0.3; }
        .ohg-cat-name {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--white);
          letter-spacing: 0.02em;
        }
        .ohg-cat-desc {
          font-size: 11px;
          color: var(--gold-light);
          letter-spacing: 0.08em;
        }
        .ohg-cat-cta {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 8px;
        }
      `}</style>
    </section>
  )
}