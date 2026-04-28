import { ProductForm } from '@/components/admin/ProductForm'
import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').order('name'),
  ])

  if (!product) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Edit Product</h1>
        <p className="text-sm text-stone-500 mt-1">{product.name}</p>
      </div>
      <ProductForm categories={categories ?? []} product={product} />
    </div>
  )
}