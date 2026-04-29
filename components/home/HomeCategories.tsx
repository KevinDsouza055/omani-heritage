import Link from 'next/link'
import { Category } from '@/lib/types'

const categoryEmojis: Record<string, string> = {
  aromatics: '🕯',
  basketry: '🧺',
  silverware: '⚱️',
  rugs: '🏺',
  pottery: '🫙',
  'wooden-items': '🪵',
  leather: '👜',
  clothing: '🧣',
}

export function HomeCategories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null

  return (
    <section style={{ backgroundColor: '#EFEBE3', padding: '5rem 0' }}>
      <div className="page-container">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Browse</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link href="/shop" className="view-all-link">View all →</Link>
        </div>

        <div className="category-grid">
          {categories.map(cat => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="category-card">
              <div className="category-icon">
                {categoryEmojis[cat.slug] ?? '🛍'}
              </div>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
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
        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 480px) {
          .category-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 768px) {
          .category-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px 16px;
          border-radius: 16px;
          background-color: #F7F4EF;
          border: 1px solid #E7E0D5;
          text-decoration: none;
          transition: all 0.2s;
        }
        .category-card:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 4px 16px rgba(139,105,20,0.1);
          transform: translateY(-2px);
        }
        .category-card:hover .category-name { color: #8B6914; }
        .category-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #EFEBE3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: transform 0.2s;
        }
        .category-card:hover .category-icon { transform: scale(1.1); }
        .category-name {
          font-size: 13px;
          font-weight: 600;
          color: #1C1917;
          text-align: center;
          transition: color 0.2s;
        }
      `}</style>
    </section>
  )
}