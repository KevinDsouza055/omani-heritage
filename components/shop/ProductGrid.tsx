import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

type Props = {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading }: Props) {
  if (loading) return <ProductGridSkeleton />

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <p className="text-stone-400 text-sm">No products found</p>
        <p className="text-stone-300 text-xs">Try a different category or search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}