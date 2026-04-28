import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Package, User } from 'lucide-react'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">My Account</h1>
        <p className="text-sm text-stone-500 mt-1">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8B6914]/10 flex items-center justify-center">
              <User size={18} className="text-[#8B6914]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">
                {user.user_metadata?.full_name ?? 'Customer'}
              </p>
              <p className="text-xs text-stone-400">{user.email}</p>
            </div>
          </div>
          <div className="border-t border-stone-100 pt-3">
            <p className="text-xs text-stone-400">
              Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-semibold text-stone-900 text-sm mb-4 flex items-center gap-2">
            <Package size={15} />
            My Orders
          </h2>

          {!orders || orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-stone-400">No orders yet</p>
              <a href="/shop" className="text-xs text-[#8B6914] hover:underline mt-1 block">
                Start shopping →
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 bg-stone-50">
                  <div>
                    <p className="text-xs font-mono text-stone-600">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-900">${order.total_amount}</p>
                    <span className="text-[10px] font-medium text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
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