'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useSnackbar } from '@/components/ui/Snackbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPw, setShowPw]         = useState(false)
  const [loading, setLoading]       = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { show } = useSnackbar()
  const router   = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { show(error.message, 'error') }
    else { show('Welcome back!', 'success'); router.push('/'); router.refresh() }
    setLoading(false)
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="ohg-auth-page">
      <div className="ohg-auth-card">

        <div className="ohg-auth-logo">
          <div className="ohg-auth-logomark">OHG</div>
        </div>
        <h1 className="ohg-auth-title">Welcome back</h1>
        <p className="ohg-auth-sub">Sign in to your account</p>

        <button onClick={handleGoogle} disabled={googleLoading} className="ohg-auth-google">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <div className="ohg-auth-divider"><span>or</span></div>

        <form onSubmit={handleLogin} className="ohg-auth-form">
          <div className="ohg-auth-field">
            <label className="ohg-auth-label">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" className="ohg-input" />
          </div>
          <div className="ohg-auth-field">
            <div className="ohg-auth-label-row">
              <label className="ohg-auth-label">Password</label>
              <Link href="/auth/reset-password" className="ohg-auth-forgot">Forgot password?</Link>
            </div>
            <div className="ohg-auth-pw-wrap">
              <input type={showPw ? 'text' : 'password'} required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className="ohg-input" style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPw(v => !v)} className="ohg-auth-pw-toggle">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="ohg-btn ohg-btn-dark ohg-btn-lg ohg-auth-submit">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="ohg-auth-switch">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="ohg-auth-switch-link">Create one</Link>
        </p>
      </div>

      <style>{`
        .ohg-auth-page {
          min-height: 100vh;
          background: var(--ivory-2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .ohg-auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ohg-auth-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 4px;
        }
        .ohg-auth-logomark {
          width: 44px; height: 44px;
          background: var(--charcoal);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: var(--gold-light);
          letter-spacing: 0.05em;
        }
        .ohg-auth-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 500;
          color: var(--charcoal);
          text-align: center;
          margin-top: -4px;
        }
        .ohg-auth-sub {
          font-size: 13px;
          color: var(--stone);
          text-align: center;
          margin-top: -12px;
        }
        .ohg-auth-google {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          color: var(--charcoal);
          cursor: pointer;
          transition: all 0.25s;
        }
        .ohg-auth-google:hover { background: var(--ivory-2); border-color: var(--border-2); }
        .ohg-auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--stone-light);
          font-size: 11px;
        }
        .ohg-auth-divider::before,
        .ohg-auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .ohg-auth-form { display: flex; flex-direction: column; gap: 16px; }
        .ohg-auth-field { display: flex; flex-direction: column; gap: 7px; }
        .ohg-auth-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--stone);
        }
        .ohg-auth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ohg-auth-forgot {
          font-size: 11px;
          color: var(--gold-dark);
          transition: opacity 0.2s;
        }
        .ohg-auth-forgot:hover { opacity: 0.7; }
        .ohg-auth-pw-wrap { position: relative; }
        .ohg-auth-pw-toggle {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: var(--stone-light);
          cursor: pointer;
          display: flex;
        }
        .ohg-auth-submit {
          width: 100%;
          justify-content: center;
          margin-top: 4px;
        }
        .ohg-auth-switch {
          text-align: center;
          font-size: 13px;
          color: var(--stone);
        }
        .ohg-auth-switch-link {
          color: var(--gold-dark);
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .ohg-auth-switch-link:hover { opacity: 0.7; }
      `}</style>
    </div>
  )
}