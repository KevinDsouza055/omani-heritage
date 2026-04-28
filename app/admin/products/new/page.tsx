import { ProductForm } from '@/components/admin/ProductForm'
import { createClient } from '@/lib/supabase-server'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Add Product</h1>
        <p className="text-sm text-stone-500 mt-1">Create a new product listing</p>
      </div>
      <ProductForm categories={categories ?? []} />
    </div>
  )
}