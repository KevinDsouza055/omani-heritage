import { createClient } from '@/lib/supabase-server'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeCategories } from '@/components/home/HomeCategories'
import { HomeFeatured } from '@/components/home/HomeFeatured'
import { HomeTrust } from '@/components/home/HomeTrust'

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: categories }, { data: featured }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HomeHero />
      <HomeCategories categories={categories ?? []} />
      <HomeFeatured products={featured ?? []} />
      <HomeTrust />
    </div>
  )
}