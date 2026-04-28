'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, BarChart2, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/inventory', label: 'Inventory', icon: BarChart2 },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-stone-100 flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#8B6914] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">OHG</span>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900">Admin Panel</p>
            <p className="text-[10px] text-stone-400">Heritage Gallery</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all',
              pathname === href
                ? 'bg-[#8B6914]/10 text-[#8B6914] font-medium'
                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-stone-100">
        <Link href="/" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-stone-500 hover:bg-stone-50 transition-all">
          ← Back to Store
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all mt-1"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}