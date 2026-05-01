'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeHero() {
  return (
    <section className="ohg-hero">
      <div className="ohg-hero-bg" />

      <div className="ohg-wrap ohg-hero-grid">

        {/* LEFT */}
        <div className="ohg-hero-left">
          <div className="ohg-hero-pretitle">
            <span className="ohg-hero-dot" />
            <span>Muscat, Sultanate of Oman</span>
          </div>

          <h1 className="ohg-hero-h1">
            <span className="ohg-hero-h1-a">The Art of</span>
            <em className="ohg-hero-h1-b">Omani</em>
            <span className="ohg-hero-h1-c">Heritage</span>
          </h1>

          <div className="ohg-hero-divider" />

          <p className="ohg-hero-body">
            Centuries of craft tradition preserved in every weave, every fragrance, every silver thread. Handmade by Omani artisans — delivered to your world.
          </p>

          <div className="ohg-hero-ctas">
            <Link href="/shop" className="ohg-btn ohg-btn-dark ohg-btn-lg">
              Explore Collection <ArrowRight size={15} />
            </Link>
            <Link href="/about" className="ohg-btn ohg-btn-outline ohg-btn-lg">
              Our Story
            </Link>
          </div>

          <div className="ohg-hero-stats">
            {[
              { n: '300+', l: 'Curated Products' },
              { n: '8',    l: 'Craft Categories' },
              { n: '50+',  l: 'Countries Served' },
            ].map(({ n, l }) => (
              <div key={l} className="ohg-hero-stat">
                <span className="ohg-hero-stat-n">{n}</span>
                <span className="ohg-hero-stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="ohg-hero-right">
          <div className="ohg-hero-img-frame">
            <div className="ohg-hero-img-inner">
              <span className="ohg-hero-main-emoji">🧺</span>
              <div className="ohg-hero-img-label">
                <span className="ohg-label">Featured</span>
                <span className="ohg-hero-img-name">Palm Heart Basket</span>
                <span className="ohg-hero-img-price">$8.00</span>
              </div>
            </div>
          </div>

          <div className="ohg-hero-card-sm">
            <div className="ohg-hero-card-sm-img">🕯</div>
            <div className="ohg-hero-card-sm-info">
              <span className="ohg-label" style={{ fontSize: 9 }}>Aromatics</span>
              <span className="ohg-hero-card-sm-name">Rose & Oudh Soap</span>
            </div>
          </div>

          <div className="ohg-hero-tag">
            <span>✦</span>
            <span>Ships Worldwide</span>
          </div>

          <div className="ohg-hero-ornament">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="58" stroke="rgba(200,169,106,0.2)" strokeWidth="1"/>
              <circle cx="60" cy="60" r="44" stroke="rgba(200,169,106,0.15)" strokeWidth="1"/>
              <path d="M60 2 L60 118 M2 60 L118 60" stroke="rgba(200,169,106,0.1)" strokeWidth="1"/>
              <path d="M60 16 L103 39 L103 83 L60 106 L17 83 L17 39 Z" stroke="rgba(200,169,106,0.12)" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .ohg-hero {
          position: relative;
          background: var(--ivory);
          overflow: hidden;
          min-height: 92vh;
          display: flex;
          align-items: center;
        }
        .ohg-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 75% 50%, rgba(200,169,106,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(200,169,106,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .ohg-hero-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
          padding-top: 80px;
          padding-bottom: 80px;
          width: 100%;
        }
        @media (min-width: 900px) {
          .ohg-hero-grid { grid-template-columns: 1fr 1fr; gap: 80px; }
        }

        /* LEFT */
        .ohg-hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          animation: ohg-fade-up 0.8s var(--ease-luxury) both;
        }
        .ohg-hero-pretitle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 28px;
        }
        .ohg-hero-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--gold);
          animation: ohg-pulse-dot 2s ease infinite;
        }
        .ohg-hero-h1 {
          display: flex;
          flex-direction: column;
          font-family: var(--font-serif);
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 0.95;
          margin-bottom: 0;
        }
        .ohg-hero-h1-a {
          font-size: clamp(2.2rem, 4.5vw, 4.5rem);
          color: var(--charcoal);
        }
        .ohg-hero-h1-b {
          font-size: clamp(3.5rem, 7.5vw, 7.5rem);
          font-style: italic;
          color: var(--gold-dark);
          line-height: 0.9;
        }
        .ohg-hero-h1-c {
          font-size: clamp(2.2rem, 4.5vw, 4.5rem);
          color: var(--charcoal);
        }
        .ohg-hero-divider {
          width: 48px;
          height: 1px;
          background: var(--gold);
          margin: 32px 0;
        }
        .ohg-hero-body {
          font-size: 16px;
          color: var(--stone);
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 40px;
        }
        .ohg-hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .ohg-hero-stats {
          display: flex;
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .ohg-hero-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 24px 32px 0 0;
          margin-right: 32px;
          border-right: 1px solid var(--border);
        }
        .ohg-hero-stat:last-child { border-right: none; }
        .ohg-hero-stat-n {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          font-weight: 500;
          color: var(--charcoal);
          line-height: 1;
        }
        .ohg-hero-stat-l {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--stone-light);
        }

        /* RIGHT */
        .ohg-hero-right {
          position: relative;
          height: 560px;
          display: none;
          animation: ohg-fade-in 1s var(--ease-luxury) 0.3s both;
        }
        @media (min-width: 900px) { .ohg-hero-right { display: block; } }

        .ohg-hero-img-frame {
          position: absolute;
          top: 20px; left: 20px;
          width: 260px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(26,24,20,0.1);
          transition: transform 0.5s var(--ease-luxury);
        }
        .ohg-hero-img-frame:hover { transform: translateY(-8px); }
        .ohg-hero-img-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .ohg-hero-main-emoji {
          font-size: 72px;
          display: block;
          padding: 40px 0 32px;
          background: var(--ivory-2);
          width: 100%;
          text-align: center;
        }
        .ohg-hero-img-label {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }
        .ohg-hero-img-name {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 500;
          color: var(--charcoal);
        }
        .ohg-hero-img-price {
          font-family: var(--font-serif);
          font-size: 20px;
          color: var(--charcoal);
        }

        .ohg-hero-card-sm {
          position: absolute;
          bottom: 60px; right: 0;
          width: 200px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(26,24,20,0.1);
          transition: transform 0.5s var(--ease-luxury);
        }
        .ohg-hero-card-sm:hover { transform: translateY(-6px); }
        .ohg-hero-card-sm-img {
          background: var(--ivory-2);
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        .ohg-hero-card-sm-info {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ohg-hero-card-sm-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--charcoal);
        }

        .ohg-hero-tag {
          position: absolute;
          top: 180px; right: 10px;
          background: var(--charcoal);
          color: var(--gold-light);
          padding: 10px 18px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(26,24,20,0.2);
          border-radius: 2px;
        }

        .ohg-hero-ornament {
          position: absolute;
          top: -20px; right: -20px;
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}