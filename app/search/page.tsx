'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Search } from 'lucide-react'
import { Suspense } from 'react'

function SearchResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(q)

  async function doSearch(term: string) {
    if (!term.trim()) return
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('is_active', true)
      .ilike('name', `%${term}%`)
      .order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    if (q) doSearch(q)
  }, [q])

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="bg-[#EFEBE3] border-b border-[#E7E0D5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p className="text-[11px] text-[#8B6914] font-semibold uppercase tracking-widest mb-3">Search</p>
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch(query)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-[#E7E0D5] bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all text-[#1C1917]"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {q && !loading && (
          <p className="text-xs text-[#78716C] font-medium mb-6">
            {products.length} {products.length === 1 ? 'result' : 'results'} for "{q}"
          </p>
        )}
        {q ? (
          <ProductGrid products={products} loading={loading} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Search size={32} className="text-[#C9A84C]/40" />
            <p className="text-sm text-[#78716C]">Type something to search</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  )
}