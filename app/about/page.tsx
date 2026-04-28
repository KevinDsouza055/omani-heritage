export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-2">Our Story</p>
        <h1 className="text-3xl font-bold text-stone-900">About Omani Heritage Gallery</h1>
      </div>

      <div className="flex flex-col gap-6 text-sm text-stone-600 leading-relaxed">
        <p>
          Omani Heritage Gallery was born from a deep love of Omani culture and a desire to
          share it with the world. Based in Muscat, Oman, we curate and sell authentic handcrafted
          products made by skilled artisans across the Sultanate.
        </p>

        <p>
          Every piece in our collection tells a story — of ancient techniques passed down through
          generations, of materials sourced from the Omani landscape, and of the hands that crafted
          them with care and pride. From the intricate weave of a palm basket to the delicate
          silverwork of traditional jewellery, each item is a piece of living heritage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
          {[
            { value: '300+', label: 'Unique products' },
            { value: '8', label: 'Craft categories' },
            { value: '50+', label: 'Countries served' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-6 rounded-2xl bg-stone-50 border border-stone-100">
              <p className="text-3xl font-bold text-[#8B6914]">{value}</p>
              <p className="text-xs text-stone-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <p>
          We ship worldwide, bringing a piece of Oman to homes across the Gulf, Europe, Asia,
          and beyond. Whether you are looking for a meaningful gift, a decorative piece, or
          simply want to own something truly authentic, you have come to the right place.
        </p>

        <div className="p-6 rounded-2xl bg-[#8B6914]/5 border border-[#8B6914]/10">
          <p className="text-[#8B6914] font-medium mb-1">Our Promise</p>
          <p>
            Every product we sell is genuinely handmade in Oman. We work directly with artisans,
            ensuring fair compensation and the preservation of traditional crafts for future generations.
          </p>
        </div>
      </div>
    </div>
  )
}