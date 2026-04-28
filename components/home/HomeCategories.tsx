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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-1">Browse</p>
          <h2 className="text-2xl font-bold text-stone-900">Shop by Category</h2>
        </div>
        <Link href="/shop" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-stone-100 bg-white hover:border-[#8B6914]/30 hover:bg-[#8B6914]/5 transition-all duration-200"
          >
            <span className="text-3xl">
              {categoryEmojis[cat.slug] ?? '🛍'}
            </span>
            <span className="text-sm font-medium text-stone-700 group-hover:text-[#8B6914] transition-colors text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}