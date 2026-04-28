'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type AccordionItem = { question: string; answer: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors gap-4"
          >
            <span className="text-sm font-medium text-stone-800">{item.question}</span>
            <ChevronDown
              size={16}
              className={cn('text-stone-400 shrink-0 transition-transform duration-200', open === i && 'rotate-180')}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-stone-500 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}