import { createClient } from '@/lib/supabase-server'

export default async function AdminInventoryPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('stock_quantity')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Inventory</h1>
        <p className="text-sm text-stone-500 mt-1">Monitor stock levels across all products</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Product</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Stock</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {products?.map(p => {
              const pct = Math.min(100, Math.round((p.stock_quantity / Math.max(p.stock_quantity, 50)) * 100))
              const isLow = p.stock_quantity <= p.low_stock_threshold && p.stock_quantity > 0
              const isOut = p.stock_quantity === 0
              return (
                <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-stone-900 truncate max-w-[200px]">{p.name}</p>
                    <p className="text-xs text-stone-400">{p.sku}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-stone-500">{(p.category as { name: string } | null)?.name ?? '—'}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isOut ? 'bg-red-50 text-red-600' :
                      isLow ? 'bg-amber-50 text-amber-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {p.stock_quantity} units
                    </span>
                  </td>
                  <td className="px-5 py-4 w-40">
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden w-32">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOut ? 'bg-red-400' : isLow ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}