import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { ProductDetail } from './ProductDetail'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  return <ProductDetail product={product} />
}