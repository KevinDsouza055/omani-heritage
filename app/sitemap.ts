import { createClient } from '@/lib/supabase'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)

  const productUrls = (products ?? []).map(p => ({
    url: `https://omaniheritage.com/shop/${p.slug}`,
    lastModified: new Date(p.updated_at),
  }))

  return [
    { url: 'https://omaniheritage.com', lastModified: new Date() },
    { url: 'https://omaniheritage.com/shop', lastModified: new Date() },
    { url: 'https://omaniheritage.com/about', lastModified: new Date() },
    { url: 'https://omaniheritage.com/contact', lastModified: new Date() },
    { url: 'https://omaniheritage.com/faq', lastModified: new Date() },
    { url: 'https://omaniheritage.com/shipping', lastModified: new Date() },
    { url: 'https://omaniheritage.com/privacy', lastModified: new Date() },
    { url: 'https://omaniheritage.com/terms', lastModified: new Date() },
    ...productUrls,
  ]
}