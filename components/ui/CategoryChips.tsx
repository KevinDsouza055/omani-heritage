'use client'

import { cn } from '@/lib/utils'
import { Category } from '@/lib/types'

type Props = {
  categories: Category[]
  selected: string | null
  onSelect: (slug: string | null) => void
}

export function CategoryChips({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
          selected === null
            ? 'bg-[#8B6914] text-white border-[#8B6914] shadow-sm'
            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
        )}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          className={cn(
            'px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
            selected === cat.slug
              ? 'bg-[#8B6914] text-white border-[#8B6914] shadow-sm'
              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}