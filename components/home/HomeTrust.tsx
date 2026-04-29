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
    <section style={{ backgroundColor: '#1C1917', padding: '5rem 0' }}>
      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Why choose us
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
            Shop with Confidence
          </h2>
        </div>

        <div className="trust-grid">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="trust-card">
              <div className="trust-icon">{icon}</div>
              <div>
                <p style={{ fontWeight: 600, color: 'white', fontSize: 14, marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 13, color: '#78716C', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
        }
        @media (min-width: 640px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .trust-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .trust-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          background-color: #292524;
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s;
        }
        .trust-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-2px);
        }
        .trust-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: rgba(139,105,20,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A84C;
        }
      `}</style>
    </section>
  )
}