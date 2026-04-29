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
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(247,244,239,0.95)' : '#F7F4EF',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: '1px solid #E7E0D5',
      boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="page-container" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            backgroundColor: '#8B6914',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(139,105,20,0.3)'
          }}>
            <span style={{ color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>OHG</span>
          </div>
          <div style={{ display: 'none' }} className="sm-logo">
            <span style={{ fontWeight: 600, color: '#1C1917', fontSize: 14, letterSpacing: '-0.02em' }}>Omani Heritage</span>
            <span style={{ fontWeight: 600, color: '#8B6914', fontSize: 14 }}> Gallery</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '8px 14px',
              fontSize: 14,
              fontWeight: 500,
              color: '#78716C',
              borderRadius: 8,
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = '#EFEBE3'; (e.target as HTMLElement).style.color = '#1C1917' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#78716C' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link href="/search" style={{
            padding: 8, borderRadius: 8, color: '#78716C', display: 'flex',
            transition: 'all 0.15s',
          }}>
            <Search size={17} />
          </Link>

          <button onClick={toggleCart} aria-label="Open cart" style={{
            position: 'relative', padding: 8, borderRadius: 8,
            color: '#78716C', background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', transition: 'all 0.15s',
          }}>
            <ShoppingBag size={17} />
            {mounted && totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2,
                minWidth: 18, height: 18,
                backgroundColor: '#8B6914', color: 'white',
                fontSize: 10, fontWeight: 700, borderRadius: 99,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px',
              }}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          <AuthButton />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: 8, borderRadius: 8, background: 'none', border: 'none',
              cursor: 'pointer', color: '#78716C', display: 'none',
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          borderTop: '1px solid #E7E0D5',
          backgroundColor: '#F7F4EF',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px', fontSize: 14, fontWeight: 500,
                color: '#1C1917', borderRadius: 12, transition: 'all 0.15s',
              }}>
              {l.label}
            </Link>
          ))}
          <Link href="/auth/login"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 8, padding: '12px 16px', fontSize: 14, fontWeight: 600,
              textAlign: 'center', borderRadius: 12,
              backgroundColor: '#1C1917', color: 'white',
            }}>
            Sign in
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .sm-logo { display: block !important; } }
        @media (min-width: 768px) { .desktop-nav { display: flex !important; } .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
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
      <Link href="/account" style={{
        display: 'none',
        fontSize: 12, fontWeight: 600,
        padding: '7px 14px', borderRadius: 8,
        backgroundColor: '#EFEBE3', color: '#1C1917',
        marginLeft: 4, transition: 'all 0.15s',
      }} className="auth-btn">
        Account
      </Link>
    )
  }

  return (
    <Link href="/auth/login" style={{
      display: 'none',
      fontSize: 12, fontWeight: 600,
      padding: '7px 14px', borderRadius: 8,
      backgroundColor: '#1C1917', color: 'white',
      marginLeft: 4, transition: 'all 0.15s',
    }} className="auth-btn">
      Sign in
    </Link>
  )
}