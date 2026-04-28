import { Package, Globe, Shield, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: <Package size={18} />,
    title: 'Authentic & Handcrafted',
    desc: 'Every product made by skilled Omani artisans using traditional techniques passed down for generations.',
  },
  {
    icon: <Globe size={18} />,
    title: 'Worldwide Shipping',
    desc: 'We ship to over 50 countries. Your piece of Omani heritage delivered safely to your door.',
  },
  {
    icon: <Shield size={18} />,
    title: 'Secure Payments',
    desc: 'All transactions encrypted and processed securely through Stripe.',
  },
  {
    icon: <RefreshCw size={18} />,
    title: 'Easy Returns',
    desc: 'Not satisfied? Contact us within 14 days of receiving your order.',
  },
]

export function HomeTrust() {
  return (
    <section className="py-20 bg-[#1C1917]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] text-[#C9A84C] font-semibold uppercase tracking-widest mb-2">Why choose us</p>
          <h2 className="text-3xl font-bold text-white">Shop with Confidence</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl bg-[#292524] border border-stone-800">
              <div className="w-10 h-10 rounded-xl bg-[#8B6914]/20 flex items-center justify-center text-[#C9A84C]">
                {icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}