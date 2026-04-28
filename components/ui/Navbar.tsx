'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#F7F4EF]/95 backdrop-blur-md shadow-sm border-b border-[#E7E0D5]'
        : 'bg-[#F7F4EF] border-b border-[#E7E0D5]'
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-[#8B6914] flex items-center justify-center shadow-sm">
            <span className="text-white text-[11px] font-bold tracking-wide">OHG</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-[#1C1917] text-sm tracking-tight">Omani Heritage</span>
            <span className="text-[#8B6914] text-sm font-semibold"> Gallery</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 text-sm text-[#78716C] hover:text-[#1C1917] hover:bg-[#EFEBE3] rounded-lg transition-all duration-150 font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link href="/search"
            className="p-2.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#EFEBE3] transition-all">
            <Search size={17} />
          </Link>

          <button onClick={toggleCart}
            className="relative p-2.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#EFEBE3] transition-all"
            aria-label="Open cart">
            <ShoppingBag size={17} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#8B6914] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          <AuthButton />

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-lg text-[#78716C] hover:bg-[#EFEBE3] transition-all ml-1">
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E7E0D5] bg-[#F7F4EF] px-4 py-3 flex flex-col gap-1 shadow-lg">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm text-[#1C1917] hover:bg-[#EFEBE3] rounded-xl transition-all font-medium">
              {l.label}
            </Link>
          ))}
          <div className="pt-2 mt-1 border-t border-[#E7E0D5]">
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm font-semibold text-center rounded-xl bg-[#1C1917] text-white">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function AuthButton() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? '' })
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ? { email: session.user.email ?? '' } : null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!mounted) return null

  if (user) {
    return (
      <Link href="/account"
        className="hidden sm:flex items-center text-xs font-semibold px-4 py-2 rounded-lg bg-[#EFEBE3] text-[#1C1917] hover:bg-[#E7E0D5] transition-all ml-1">
        Account
      </Link>
    )
  }

  return (
    <Link href="/auth/login"
      className="hidden sm:flex items-center text-xs font-semibold px-4 py-2 rounded-lg bg-[#1C1917] text-white hover:bg-[#292524] transition-all ml-1">
      Sign in
    </Link>
  )
}