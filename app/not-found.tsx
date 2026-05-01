import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="ohg-404">
      <div className="ohg-404-inner">
        <span className="ohg-404-num">404</span>
        <div className="ohg-404-divider" />
        <h1 className="ohg-404-title">Page not found</h1>
        <p className="ohg-404-body">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="ohg-btn ohg-btn-dark ohg-btn-md">Return Home</Link>
      </div>
      <style>{`
        .ohg-404 { min-height: 80vh; display: flex; align-items: center; justify-content: center; background: var(--ivory); }
        .ohg-404-inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .ohg-404-num { font-family: var(--font-serif); font-size: 6rem; font-weight: 300; color: var(--border-2); line-height: 1; }
        .ohg-404-divider { width: 48px; height: 1px; background: var(--gold); }
        .ohg-404-title { font-family: var(--font-serif); font-size: 1.75rem; font-weight: 500; color: var(--charcoal); }
        .ohg-404-body { font-size: 14px; color: var(--stone); max-width: 320px; line-height: 1.7; }
      `}</style>
    </div>
  )
}