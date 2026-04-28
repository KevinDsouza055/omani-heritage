import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Products</h1>
          <p className="text-sm text-stone-500 mt-1">{products?.length ?? 0} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B6914] text-white text-sm font-medium hover:bg-[#7a5c12] transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Product</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Price</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide hidden sm:table-cell">Stock</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {products?.map(p => (
              <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-stone-900 truncate max-w-[200px]">{p.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{p.sku}</p>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-xs text-stone-500">{(p.category as { name: string } | null)?.name ?? '—'}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-stone-900">${p.price}</span>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.stock_quantity === 0 ? 'bg-red-50 text-red-600' :
                    p.stock_quantity <= p.low_stock_threshold ? 'bg-amber-50 text-amber-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {p.stock_quantity} units
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {p.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 transition-all"
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}