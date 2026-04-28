import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F4EF]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C18 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F4EF]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 md:py-36 flex flex-col items-center text-center gap-7">

        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B6914] animate-pulse" />
          <span className="text-xs font-semibold text-[#8B6914] tracking-widest uppercase">Handcrafted in Oman</span>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#1C1917] leading-[1.05] tracking-tight">
            Authentic Omani
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
            style={{ color: '#8B6914' }}>
            Heritage Crafts
          </h1>
        </div>

        {/* Sub */}
        <p className="text-base sm:text-lg text-[#78716C] max-w-lg leading-relaxed">
          Discover centuries-old traditions through basketry, aromatics, silverware, and more — shipped worldwide from Muscat.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#292524] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">
            Shop Now <ArrowRight size={15} />
          </Link>
          <Link href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-[#E7E0D5] text-[#1C1917] text-sm font-semibold hover:bg-[#EFEBE3] transition-all shadow-sm duration-200">
            Our Story
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10 mt-4 pt-8 border-t border-[#E7E0D5] w-full max-w-sm justify-center">
          {[
            { value: '300+', label: 'Products' },
            { value: '8', label: 'Categories' },
            { value: '50+', label: 'Countries' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-[#1C1917]">{value}</span>
              <span className="text-xs text-[#78716C] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}