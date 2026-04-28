import { Package, Globe, Shield, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: <Package size={20} />,
    title: 'Authentic & Handcrafted',
    desc: 'Every product is made by skilled Omani artisans using traditional techniques passed down for generations.',
  },
  {
    icon: <Globe size={20} />,
    title: 'Worldwide Shipping',
    desc: 'We ship to over 50 countries. Your piece of Omani heritage delivered safely to your door.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Secure Payments',
    desc: 'All transactions are encrypted and processed securely through Stripe. We never store card details.',
  },
  {
    icon: <RefreshCw size={20} />,
    title: 'Easy Returns',
    desc: 'Not satisfied? Contact us within 14 days of receiving your order and we will make it right.',
  },
]

export function HomeTrust() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-1">Why choose us</p>
        <h2 className="text-2xl font-bold text-stone-900">Shop with Confidence</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-3 p-6 rounded-2xl border border-stone-100 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#8B6914]/10 flex items-center justify-center text-[#8B6914]">
              {icon}
            </div>
            <p className="font-semibold text-stone-900 text-sm">{title}</p>
            <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}