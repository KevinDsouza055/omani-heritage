import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#8B6914] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">OHG</span>
            </div>
            <span className="font-semibold text-stone-900 text-sm">Omani Heritage Gallery</span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            Authentic handcrafted products from Oman, shipped worldwide.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">Shop</p>
          <div className="flex flex-col gap-2">
            {['All Products', 'Basketry', 'Aromatics', 'Silverware', 'Rugs'].map(l => (
              <Link key={l} href={`/shop${l === 'All Products' ? '' : '?category=' + l.toLowerCase()}`}
                className="text-xs text-stone-500 hover:text-stone-900 transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">Help</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Shipping & Returns', href: '/shipping' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'Track Order', href: '/account/orders' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="text-xs text-stone-500 hover:text-stone-900 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">Legal</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Cookie Policy', href: '/privacy#cookies' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="text-xs text-stone-500 hover:text-stone-900 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 px-4 sm:px-6 py-4">
        <p className="text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Omani Heritage Gallery. All rights reserved. Muscat, Oman.
        </p>
      </div>
    </footer>
  )
}