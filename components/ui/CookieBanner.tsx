'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('ohg-cookies-accepted')
    if (!accepted) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('ohg-cookies-accepted', 'true')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('ohg-cookies-accepted', 'false')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[90] bg-[#1C1917] text-white rounded-2xl p-5 shadow-2xl border border-stone-800">
      <p className="text-sm font-semibold mb-1">We use cookies 🍪</p>
      <p className="text-xs text-stone-400 leading-relaxed mb-4">
        We use essential cookies to keep your cart working and analytics to improve your experience.{' '}
        <Link href="/privacy#cookies" className="text-[#C9A84C] hover:underline">
          Learn more
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 py-2 rounded-xl bg-[#8B6914] text-white text-xs font-bold hover:bg-[#7a5c12] transition-colors"
        >
          Accept all
        </button>
        <button
          onClick={decline}
          className="flex-1 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-medium hover:bg-stone-700 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  )
}