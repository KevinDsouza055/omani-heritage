import { Shield, Globe, RefreshCw, Award } from 'lucide-react'

const features = [
  {
    icon: <Award size={22} />,
    title: 'Certified Authentic',
    desc: 'Every piece is verified handmade by Omani artisans. Certificates of authenticity available on request.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Global Delivery',
    desc: 'Carefully packaged and shipped to over 50 countries from Muscat with full tracking.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Secure & Trusted',
    desc: 'All payments are encrypted via Stripe. Your data is never shared or sold.',
  },
  {
    icon: <RefreshCw size={22} />,
    title: '14-Day Returns',
    desc: 'Not completely satisfied? Return within 14 days for a full refund, no questions asked.',
  },
]

export function HomeTrust() {
  return (
    <section className="ohg-trust">
      <div className="ohg-wrap">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="ohg-label" style={{ marginBottom: 16, color: 'var(--gold-light)' }}>Our Promise</span>
          <h2 className="ohg-h2" style={{ color: 'white' }}>Why Choose Us</h2>
          <div style={{ width: 48, height: 1, background: 'var(--gold)', margin: '24px auto 0' }} />
        </div>

        <div className="ohg-trust-grid">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="ohg-trust-card">
              <div className="ohg-trust-icon">{icon}</div>
              <h3 className="ohg-trust-title">{title}</h3>
              <p className="ohg-trust-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="ohg-trust-bottom">
          <div className="ohg-trust-bottom-line" />
          <span className="ohg-trust-bottom-text">Trusted by customers in 50+ countries since 2024</span>
          <div className="ohg-trust-bottom-line" />
        </div>
      </div>

      <style>{`
        .ohg-trust {
          background: var(--charcoal);
          padding: 96px 0 80px;
        }
        .ohg-trust-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 640px)  { .ohg-trust-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ohg-trust-grid { grid-template-columns: repeat(4, 1fr); } }

        .ohg-trust-card {
          padding: 40px 32px;
          background: var(--charcoal);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: background 0.35s;
        }
        .ohg-trust-card:hover { background: var(--charcoal-2); }
        .ohg-trust-icon {
          color: var(--gold);
          margin-bottom: 4px;
        }
        .ohg-trust-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 500;
          color: white;
          letter-spacing: 0;
        }
        .ohg-trust-desc {
          font-size: 13px;
          color: var(--stone);
          line-height: 1.7;
        }
        .ohg-trust-bottom {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 64px;
        }
        .ohg-trust-bottom-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .ohg-trust-bottom-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--stone);
          white-space: nowrap;
        }
      `}</style>
    </section>
  )
}