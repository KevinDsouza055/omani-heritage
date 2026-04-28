'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#8B6914] flex items-center justify-center">
            <span className="text-white text-xs font-bold">OHG</span>
          </div>
          <span className="font-semibold text-stone-900 text-sm hidden sm:block tracking-tight">
            Omani Heritage Gallery
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all duration-150"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link href="/search" className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all">
            <Search size={18} />
          </Link>

          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#8B6914] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          <Link
            href="/auth/login"
            className="hidden sm:flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-all ml-1"
          >
            Sign in
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-all"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200/60 bg-[#FAFAF8] px-4 py-3 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-100 rounded-lg transition-all"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={() => setMenuOpen(false)}
            className="mt-1 px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-stone-900 text-white"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  )
}