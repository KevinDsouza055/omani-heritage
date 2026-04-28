import { cn } from '@/lib/utils'

type BadgeProps = {
  variant: 'new' | 'sale' | 'low' | 'out'
  className?: string
}

const config = {
  new:  { label: 'New',       style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  sale: { label: 'Sale',      style: 'bg-red-50 text-red-600 border-red-200' },
  low:  { label: 'Low stock', style: 'bg-amber-50 text-amber-700 border-amber-200' },
  out:  { label: 'Sold out',  style: 'bg-stone-100 text-stone-500 border-stone-200' },
}

export function Badge({ variant, className }: BadgeProps) {
  const { label, style } = config[variant]
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border', style, className)}>
      {label}
    </span>
  )
}