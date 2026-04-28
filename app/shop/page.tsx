'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Product, Category } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { CategoryChips } from '@/components/ui/CategoryChips'
import { Search } from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

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

  const filtered = products.filter(p => {
    const matchCat = selected ? p.category?.slug === selected : true
    const matchSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase())
      : true
    return matchCat && matchSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Shop</h1>
        <p className="text-sm text-stone-500">Authentic handcrafted products from Oman</p>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] transition-colors"
        />
      </div>

      {/* Category chips */}
      <div className="mb-8">
        <CategoryChips categories={categories} selected={selected} onSelect={setSelected} />
      </div>

      {/* Count */}
      {!loading && (
        <p className="text-xs text-stone-400 mb-5">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          {selected && ` in ${categories.find(c => c.slug === selected)?.name}`}
        </p>
      )}

      <ProductGrid products={filtered} loading={loading} />
    </div>
  )
}