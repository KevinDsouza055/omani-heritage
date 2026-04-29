'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#F7F4EF' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, #F7F4EF 100%)',
      }} />

      <div className="page-container hero-content">
        <div className="hero-badge">
          <span className="hero-pulse" />
          <span>Handcrafted in Oman</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="hero-h1 color-dark">Authentic Omani</h1>
          <h1 className="hero-h1 color-brand">Heritage Crafts</h1>
        </div>

        <p className="hero-sub">
          Discover centuries-old traditions through basketry, aromatics, silverware, and more — shipped worldwide from Muscat.
        </p>

        <div className="hero-ctas">
          <Link href="/shop" className="btn-primary">
            Shop Now <ArrowRight size={15} />
          </Link>
          <Link href="/about" className="btn-secondary">
            Our Story
          </Link>
        </div>

        <div className="hero-stats">
          {[
            { value: '300+', label: 'Products' },
            { value: '8', label: 'Categories' },
            { value: '50+', label: 'Countries' },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-content {
          position: relative;
          padding-top: 7rem;
          padding-bottom: 7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.75rem;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 99px;
          border: 1px solid rgba(201,168,76,0.4);
          background-color: rgba(201,168,76,0.08);
          font-size: 11px;
          font-weight: 600;
          color: #8B6914;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .hero-pulse {
          width: 6px; height: 6px;
          border-radius: 99px;
          background-color: #8B6914;
          display: inline-block;
          animation: pulse 2s infinite;
        }
        .hero-h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .color-dark { color: #1C1917; }
        .color-brand { color: #8B6914; }
        .hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #78716C;
          max-width: 480px;
          line-height: 1.7;
          margin: 0;
        }
        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          background-color: #1C1917;
          color: white;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background-color: #8B6914;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139,105,20,0.35);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          background-color: white;
          color: #1C1917;
          border: 1px solid #E7E0D5;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background-color: #EFEBE3;
          transform: translateY(-2px);
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-top: 16px;
          padding-top: 32px;
          border-top: 1px solid #E7E0D5;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .hero-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #1C1917;
          letter-spacing: -0.03em;
        }
        .hero-stat-label {
          font-size: 12px;
          color: #78716C;
          font-weight: 500;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}