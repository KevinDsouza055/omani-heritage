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
    <section className="py-20 bg-[#EFEBE3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] text-[#8B6914] font-semibold uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl font-bold text-[#1C1917]">Shop by Category</h2>
          </div>
          <Link href="/shop"
            className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors font-medium">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#F7F4EF] border border-[#E7E0D5] hover:border-[#C9A84C]/50 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[#EFEBE3] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                {categoryEmojis[cat.slug] ?? '🛍'}
              </div>
              <span className="text-sm font-semibold text-[#1C1917] group-hover:text-[#8B6914] transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}