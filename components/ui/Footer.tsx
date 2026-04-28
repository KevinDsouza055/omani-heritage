import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#1C1917] text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">

        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B6914] flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">OHG</span>
            </div>
            <span className="font-semibold text-white text-sm">Omani Heritage Gallery</span>
          </div>
          <p className="text-xs leading-relaxed text-stone-500 max-w-[200px]">
            Authentic handcrafted products from Oman, shipped worldwide since 2024.
          </p>
          <div className="flex gap-3 mt-1">
            {['Instagram', 'Facebook'].map(s => (
              <span key={s} className="text-xs text-stone-600 hover:text-stone-400 cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold text-white uppercase tracking-widest">Shop</p>
          {[
            { label: 'All Products', href: '/shop' },
            { label: 'Basketry', href: '/shop?category=basketry' },
            { label: 'Aromatics', href: '/shop?category=aromatics' },
            { label: 'Silverware', href: '/shop?category=silverware' },
            { label: 'Rugs', href: '/shop?category=rugs' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors">{l.label}</Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold text-white uppercase tracking-widest">Help</p>
          {[
            { label: 'FAQ', href: '/faq' },
            { label: 'Shipping & Returns', href: '/shipping' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Track Order', href: '/account/orders' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors">{l.label}</Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold text-white uppercase tracking-widest">Legal</p>
          {[
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Cookie Policy', href: '/privacy#cookies' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors">{l.label}</Link>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-800 px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-stone-600">
            © {new Date().getFullYear()} Omani Heritage Gallery. All rights reserved.
          </p>
          <p className="text-[11px] text-stone-600">Muscat, Sultanate of Oman 🇴🇲</p>
        </div>
      </div>
    </footer>
  )
}