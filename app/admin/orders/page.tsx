import { createClient } from '@/lib/supabase-server'

const statusColors: Record<string, string> = {
  pending: 'bg-stone-100 text-stone-600',
  processing: 'bg-amber-50 text-amber-700',
  shipped: 'bg-blue-50 text-blue-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-600',
  refunded: 'bg-purple-50 text-purple-600',
}

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, customer:customers(email, full_name)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Orders</h1>
        <p className="text-sm text-stone-500 mt-1">{orders?.length ?? 0} total orders</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {!orders || orders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-stone-400 text-sm">No orders yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Order</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide hidden md:table-cell">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Total</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders.map((order: {
                id: string
                total_amount: number
                status: string
                created_at: string
                customer: { email: string; full_name: string | null } | null
              }) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-xs font-mono text-stone-600">#{order.id.slice(0, 8)}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm text-stone-700">{order.customer?.full_name ?? '—'}</p>
                    <p className="text-xs text-stone-400">{order.customer?.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-stone-900">${order.total_amount}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] ?? 'bg-stone-100 text-stone-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-stone-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}