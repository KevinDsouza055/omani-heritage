'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Product, Category } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { CategoryChips } from '@/components/ui/CategoryChips'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products')
          .select('*, category:categories(*)')
          .eq('is_active', true)
          .order('created_at', { ascending: false }),
      ])
      setCategories(cats ?? [])
      setProducts(prods ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = products
    .filter(p => {
      const matchCat = selected ? p.category?.slug === selected : true
      const matchSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return 0
    })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F4EF' }}>
  <div style={{ backgroundColor: '#EFEBE3', borderBottom: '1px solid #E7E0D5' }}>
    <div className="page-container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <p className="text-[11px] text-[#8B6914] font-semibold uppercase tracking-widest mb-2">Our Collection</p>
          <h1 className="text-3xl font-bold text-[#1C1917]">Shop</h1>
          <p className="text-sm text-[#78716C] mt-1">Authentic handcrafted products from Oman</p>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        {/* Search + sort row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E7E0D5] bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all text-[#1C1917] placeholder:text-[#78716C]"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-[#78716C]" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm rounded-xl border border-[#E7E0D5] bg-white px-3 py-2.5 focus:outline-none focus:border-[#8B6914] text-[#1C1917] cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-8">
          <CategoryChips categories={categories} selected={selected} onSelect={setSelected} />
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-xs text-[#78716C] mb-6 font-medium">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {selected && ` in ${categories.find(c => c.slug === selected)?.name}`}
          </p>
        )}

        <ProductGrid products={filtered} loading={loading} />
      </div>
    </div>
  )
}