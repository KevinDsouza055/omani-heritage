import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function HomeHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#f5f0e8]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B6914]/10 border border-[#8B6914]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B6914]" />
          <span className="text-xs font-medium text-[#8B6914] tracking-wide">Handcrafted in Oman</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-tight tracking-tight">
          Authentic Omani
          <span className="block text-[#8B6914]">Heritage Crafts</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-stone-500 max-w-xl leading-relaxed">
          Discover centuries-old traditions through basketry, aromatics, silverware, and more — handcrafted by Omani artisans and shipped worldwide.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
          <Link href="/shop">
            <Button size="lg" className="gap-2">
              Shop Now <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg">
              Our Story
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-6 pt-6 border-t border-stone-200/60">
          {[
            { value: '300+', label: 'Unique products' },
            { value: '8', label: 'Craft categories' },
            { value: '🌍', label: 'Ships worldwide' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-bold text-stone-900">{value}</span>
              <span className="text-xs text-stone-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}