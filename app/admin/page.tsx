import { createClient } from '@/lib/supabase-server'
import { Package, ShoppingBag, TrendingUp, AlertTriangle } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: totalProducts },
    { count: totalOrders },
    { data: lowStock },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('name, stock_quantity, low_stock_threshold')
      .eq('is_active', true)
      .filter('stock_quantity', 'lte', 'low_stock_threshold')
      .order('stock_quantity')
      .limit(5),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Total Products', value: totalProducts ?? 0, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Orders', value: totalOrders ?? 0, icon: ShoppingBag, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Low Stock Items', value: lowStock?.length ?? 0, icon: AlertTriangle, color: 'bg-amber-50 text-amber-600' },
    { label: 'Revenue', value: 'View →', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Welcome back, here's what's happening</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-stone-100 p-5 flex flex-col gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">{value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low stock */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-semibold text-stone-900 text-sm mb-4 flex items-center gap-2">
            <AlertTriangle size={15} className="text-amber-500" />
            Low Stock Alert
          </h2>
          {!lowStock || lowStock.length === 0 ? (
            <p className="text-sm text-stone-400">All products are well stocked</p>
          ) : (
            <div className="flex flex-col gap-2">
              {lowStock.map((p: { name: string; stock_quantity: number }) => (
                <div key={p.name} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0">
                  <p className="text-sm text-stone-700 truncate flex-1">{p.name}</p>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full ml-3 shrink-0">
                    {p.stock_quantity} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-semibold text-stone-900 text-sm mb-4">Recent Orders</h2>
          {!recentOrders || recentOrders.length === 0 ? (
            <p className="text-sm text-stone-400">No orders yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentOrders.map((order: { id: string; status: string; total_amount: number; created_at: string }) => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-xs font-mono text-stone-500">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-stone-900">${order.total_amount}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'shipped' ? 'bg-blue-50 text-blue-600' :
                      order.status === 'processing' ? 'bg-amber-50 text-amber-600' :
                      'bg-stone-100 text-stone-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}