'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Product, Category } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Search, ChevronDown } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts]   = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected]   = useState<string | null>(null)
  const [search, setSearch]       = useState('')
  const [loading, setLoading]     = useState(true)
  const [sort, setSort]           = useState('newest')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*, category:categories(*)').eq('is_active', true).order('created_at', { ascending: false }),
      ])
      setCategories(cats ?? [])
      setProducts(prods ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = products
    .filter(p => {
      const matchCat    = selected ? p.category?.slug === selected : true
      const matchSearch = search   ? p.name.toLowerCase().includes(search.toLowerCase()) : true
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return 0
    })

  return (
    <div className="ohg-shop-page">

      {/* Header */}
      <div className="ohg-shop-header">
        <div className="ohg-wrap ohg-shop-header-inner">
          <div className="ohg-shop-header-text">
            <span className="ohg-label" style={{ marginBottom: 16 }}>Our Collection</span>
            <h1 className="ohg-h1">The Shop</h1>
            <p className="ohg-shop-header-sub">Authentic handcrafted goods from Oman</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="ohg-shop-filters-bar">
        <div className="ohg-wrap ohg-shop-filters-inner">
          {/* Search */}
          <div className="ohg-shop-search">
            <Search size={14} className="ohg-shop-search-icon" />
            <input
              className="ohg-input ohg-shop-search-input"
              type="text"
              placeholder="Search the collection..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div className="ohg-shop-sort">
            <select
              className="ohg-input ohg-shop-sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </select>
            <ChevronDown size={14} className="ohg-shop-sort-icon" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="ohg-wrap">
        <div className="ohg-shop-cats">
          <button
            onClick={() => setSelected(null)}
            className={`ohg-shop-cat ${selected === null ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.slug)}
              className={`ohg-shop-cat ${selected === c.slug ? 'active' : ''}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="ohg-shop-count">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            {selected && ` in ${categories.find(c => c.slug === selected)?.name ?? ''}`}
          </p>
        )}

        <ProductGrid products={filtered} loading={loading} />
      </div>

      <style>{`
        .ohg-shop-page { min-height: 100vh; background: var(--ivory); }

        .ohg-shop-header {
          background: var(--ivory-2);
          border-bottom: 1px solid var(--border);
          padding: 80px 0 64px;
        }
        .ohg-shop-header-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .ohg-shop-header-text { display: flex; flex-direction: column; }
        .ohg-shop-header-sub {
          font-size: 15px;
          color: var(--stone);
          margin-top: 12px;
          letter-spacing: 0.02em;
        }

        .ohg-shop-filters-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 72px;
          z-index: 40;
        }
        .ohg-shop-filters-inner {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ohg-shop-search {
          position: relative;
          flex: 1;
          max-width: 360px;
        }
        .ohg-shop-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--stone-light);
          pointer-events: none;
        }
        .ohg-shop-search-input {
          padding-left: 40px !important;
          height: 40px;
          background: var(--ivory);
          border-color: transparent;
        }
        .ohg-shop-search-input:focus { background: white; border-color: var(--gold); }

        .ohg-shop-sort { position: relative; }
        .ohg-shop-sort-select {
          width: auto;
          padding-right: 36px !important;
          padding-top: 8px !important;
          padding-bottom: 8px !important;
          height: 40px;
          appearance: none;
          cursor: pointer;
          background: var(--ivory);
          border-color: transparent;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }
        .ohg-shop-sort-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--stone-light);
          pointer-events: none;
        }

        .ohg-shop-cats {
          display: flex;
          gap: 0;
          flex-wrap: wrap;
          padding: 40px 0 32px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 48px;
        }
        .ohg-shop-cat {
          padding: 8px 20px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--stone);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.25s;
        }
        .ohg-shop-cat:hover { color: var(--charcoal); }
        .ohg-shop-cat.active {
          color: var(--charcoal);
          border-bottom-color: var(--gold);
        }

        .ohg-shop-count {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--stone-light);
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  )
}