'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const [mounted, setMounted]     = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [user, setUser]           = useState<{ email: string } | null>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? '' })
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ? { email: session.user.email ?? '' } : null)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      subscription.unsubscribe()
    }
  }, [])

  const links = [
    { href: '/shop',    label: 'Shop' },
    { href: '/about',   label: 'About' },
    { href: '/faq',     label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className={`ohg-nav ${scrolled ? 'ohg-nav-scrolled' : ''}`}>
        <div className="ohg-wrap ohg-nav-inner">

          {/* Logo */}
          <Link href="/" className="ohg-nav-logo">
            <div className="ohg-nav-logomark">
              <span>OHG</span>
            </div>
            <div className="ohg-nav-logotext">
              <span className="ohg-nav-logomain">Omani Heritage</span>
              <span className="ohg-nav-logosub">Gallery</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="ohg-nav-links">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="ohg-nav-link">{l.label}</Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ohg-nav-actions">
            <Link href="/search" className="ohg-nav-icon" aria-label="Search">
              <Search size={18} />
            </Link>
            <button onClick={toggleCart} className="ohg-nav-icon ohg-nav-cart" aria-label="Cart">
              <ShoppingBag size={18} />
              {mounted && totalItems > 0 && (
                <span className="ohg-nav-cart-badge">{totalItems > 9 ? '9+' : totalItems}</span>
              )}
            </button>
            {mounted && (
              user
                ? <Link href="/account" className="ohg-nav-auth">Account</Link>
                : <Link href="/auth/login" className="ohg-nav-auth">Sign in</Link>
            )}
            <button
              className="ohg-nav-hamburger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="ohg-nav-mobile">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="ohg-nav-mobile-link"
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="ohg-nav-mobile-divider" />
            {user
              ? <Link href="/account" className="ohg-nav-mobile-link" onClick={() => setMenuOpen(false)}>Account</Link>
              : <Link href="/auth/login" className="ohg-nav-mobile-link" onClick={() => setMenuOpen(false)}>Sign in</Link>
            }
          </div>
        )}
      </header>

      <style>{`
        .ohg-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(250,248,244,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .ohg-nav-scrolled {
          border-color: var(--border);
          box-shadow: 0 2px 24px rgba(26,24,20,0.06);
        }
        .ohg-nav-inner {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .ohg-nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ohg-nav-logomark {
          width: 36px; height: 36px;
          border-radius: 4px;
          background: var(--charcoal);
          display: flex; align-items: center; justify-content: center;
        }
        .ohg-nav-logomark span {
          font-size: 10px;
          font-weight: 700;
          color: var(--gold-light);
          letter-spacing: 0.05em;
          font-family: var(--font-sans);
        }
        .ohg-nav-logotext {
          display: none;
          flex-direction: column;
          line-height: 1.1;
        }
        @media (min-width: 480px) { .ohg-nav-logotext { display: flex; } }
        .ohg-nav-logomain {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--charcoal);
          letter-spacing: 0.01em;
        }
        .ohg-nav-logosub {
          font-size: 10px;
          font-weight: 500;
          color: var(--gold-dark);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .ohg-nav-links {
          display: none;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }
        @media (min-width: 768px) { .ohg-nav-links { display: flex; } }
        .ohg-nav-link {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--stone);
          border-radius: 2px;
          transition: color 0.25s;
          position: relative;
        }
        .ohg-nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 16px; right: 16px;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s var(--ease-luxury);
        }
        .ohg-nav-link:hover { color: var(--charcoal); }
        .ohg-nav-link:hover::after { transform: scaleX(1); }
        .ohg-nav-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ohg-nav-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px;
          color: var(--stone);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.25s, background 0.25s;
          position: relative;
        }
        .ohg-nav-icon:hover {
          color: var(--charcoal);
          background: var(--ivory-2);
        }
        .ohg-nav-cart-badge {
          position: absolute;
          top: 4px; right: 4px;
          width: 16px; height: 16px;
          background: var(--gold);
          color: white;
          font-size: 9px;
          font-weight: 700;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .ohg-nav-auth {
          display: none;
          padding: 8px 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--charcoal);
          border: 1px solid var(--charcoal);
          border-radius: 2px;
          margin-left: 8px;
          transition: all 0.3s;
        }
        .ohg-nav-auth:hover {
          background: var(--charcoal);
          color: white;
        }
        @media (min-width: 640px) { .ohg-nav-auth { display: flex; } }
        .ohg-nav-hamburger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          border-radius: 4px;
          background: none;
          border: none;
          color: var(--charcoal);
          cursor: pointer;
          margin-left: 4px;
        }
        @media (min-width: 768px) { .ohg-nav-hamburger { display: none; } }
        .ohg-nav-mobile {
          border-top: 1px solid var(--border);
          background: var(--ivory);
          padding: 16px 0;
          display: flex;
          flex-direction: column;
        }
        .ohg-nav-mobile-link {
          padding: 14px 24px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--stone);
          transition: color 0.2s, background 0.2s;
        }
        .ohg-nav-mobile-link:hover {
          color: var(--charcoal);
          background: var(--ivory-2);
        }
        .ohg-nav-mobile-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 24px;
        }
      `}</style>
    </>
  )
}