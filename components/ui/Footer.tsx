import Link from 'next/link'

export function Footer() {
  return (
    <footer className="ohg-footer">
      <div className="ohg-wrap">

        {/* Top strip */}
        <div className="ohg-footer-top">
          <div className="ohg-footer-brand">
            <div className="ohg-footer-logomark">OHG</div>
            <div>
              <p className="ohg-footer-brandname">Omani Heritage Gallery</p>
              <p className="ohg-footer-brandtag">Muscat, Sultanate of Oman</p>
            </div>
          </div>
          <p className="ohg-footer-mission">
            Preserving centuries of Omani craft tradition — one handmade piece at a time.
          </p>
        </div>

        <div className="ohg-footer-divider" />

        {/* Main grid */}
        <div className="ohg-footer-grid">
          <div className="ohg-footer-col">
            <p className="ohg-footer-col-title">Shop</p>
            {[
              { l: 'All Products', h: '/shop' },
              { l: 'Basketry',     h: '/shop?category=basketry' },
              { l: 'Aromatics',    h: '/shop?category=aromatics' },
              { l: 'Silverware',   h: '/shop?category=silverware' },
              { l: 'Rugs',         h: '/shop?category=rugs' },
            ].map(x => <Link key={x.h} href={x.h} className="ohg-footer-link">{x.l}</Link>)}
          </div>
          <div className="ohg-footer-col">
            <p className="ohg-footer-col-title">Help</p>
            {[
              { l: 'FAQ',                h: '/faq' },
              { l: 'Shipping & Returns', h: '/shipping' },
              { l: 'Contact Us',         h: '/contact' },
              { l: 'Track Order',        h: '/account/orders' },
            ].map(x => <Link key={x.h} href={x.h} className="ohg-footer-link">{x.l}</Link>)}
          </div>
          <div className="ohg-footer-col">
            <p className="ohg-footer-col-title">Legal</p>
            {[
              { l: 'Privacy Policy',    h: '/privacy' },
              { l: 'Terms & Conditions',h: '/terms' },
              { l: 'Cookie Policy',     h: '/privacy#cookies' },
            ].map(x => <Link key={x.h} href={x.h} className="ohg-footer-link">{x.l}</Link>)}
          </div>
          <div className="ohg-footer-col">
            <p className="ohg-footer-col-title">Follow</p>
            <a href="#" className="ohg-footer-link">Instagram</a>
            <a href="#" className="ohg-footer-link">Facebook</a>
            <a href="#" className="ohg-footer-link">Pinterest</a>
          </div>
        </div>

        <div className="ohg-footer-divider" />

        {/* Bottom */}
        <div className="ohg-footer-bottom">
          <p>© {new Date().getFullYear()} Omani Heritage Gallery. All rights reserved.</p>
          <p>🇴🇲 Made with care in Muscat</p>
        </div>
      </div>

      <style>{`
        .ohg-footer {
          background: var(--charcoal-2);
          color: var(--stone);
        }
        .ohg-footer .ohg-wrap { padding-top: 0; padding-bottom: 0; }

        .ohg-footer-top {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 64px 0 48px;
        }
        @media (min-width: 768px) {
          .ohg-footer-top {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .ohg-footer-brand { display: flex; align-items: center; gap: 14px; }
        .ohg-footer-logomark {
          width: 40px; height: 40px;
          background: var(--gold);
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .ohg-footer-brandname {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: white;
        }
        .ohg-footer-brandtag {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 2px;
        }
        .ohg-footer-mission {
          font-size: 13px;
          color: var(--stone);
          line-height: 1.6;
          max-width: 320px;
          font-style: italic;
        }

        .ohg-footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        .ohg-footer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          padding: 48px 0;
        }
        @media (min-width: 768px) {
          .ohg-footer-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .ohg-footer-col { display: flex; flex-direction: column; gap: 12px; }
        .ohg-footer-col-title {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--stone-light);
          margin-bottom: 4px;
        }
        .ohg-footer-link {
          font-size: 13px;
          color: var(--stone);
          transition: color 0.25s;
          display: block;
        }
        .ohg-footer-link:hover { color: var(--gold-light); }

        .ohg-footer-bottom {
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.06em;
        }
        @media (min-width: 640px) {
          .ohg-footer-bottom { flex-direction: row; }
        }
      `}</style>
    </footer>
  )
}