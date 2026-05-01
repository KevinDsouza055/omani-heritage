'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useSnackbar } from '@/components/ui/Snackbar'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)
  const { show } = useSnackbar()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    })
    if (error) { show(error.message, 'error') }
    else { setDone(true) }
    setLoading(false)
  }

  return (
    <div className="ohg-auth-page">
      <div className="ohg-auth-card">
        <div className="ohg-auth-logo">
          <div className="ohg-auth-logomark">OHG</div>
        </div>

        {done ? (
          <>
            <CheckCircle size={40} style={{ color: '#2D7A47', margin: '0 auto' }} />
            <h2 className="ohg-auth-title">Check your email</h2>
            <p style={{ fontSize: 13, color: 'var(--stone)', textAlign: 'center' }}>
              We sent a reset link to <strong>{email}</strong>
            </p>
            <Link href="/auth/login" className="ohg-btn ohg-btn-outline ohg-btn-md" style={{ textAlign: 'center' }}>
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <h1 className="ohg-auth-title">Reset password</h1>
            <p className="ohg-auth-sub">We&apos;ll send you a reset link</p>
            <form onSubmit={handleReset} className="ohg-auth-form">
              <div className="ohg-auth-field">
                <label className="ohg-auth-label">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" className="ohg-input" />
              </div>
              <button type="submit" disabled={loading} className="ohg-btn ohg-btn-dark ohg-btn-lg ohg-auth-submit">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p className="ohg-auth-switch">
              Remember it?{' '}
              <Link href="/auth/login" className="ohg-auth-switch-link">Sign in</Link>
            </p>
          </>
        )}
      </div>

      <style>{`
        .ohg-auth-page{min-height:100vh;background:var(--ivory-2);display:flex;align-items:center;justify-content:center;padding:40px 24px;}
        .ohg-auth-card{width:100%;max-width:420px;background:var(--white);border:1px solid var(--border);border-radius:4px;padding:48px 40px;display:flex;flex-direction:column;gap:20px;}
        .ohg-auth-logo{display:flex;justify-content:center;}
        .ohg-auth-logomark{width:44px;height:44px;background:var(--charcoal);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--gold-light);letter-spacing:.05em;}
        .ohg-auth-title{font-family:var(--font-serif);font-size:1.75rem;font-weight:500;color:var(--charcoal);text-align:center;}
        .ohg-auth-sub{font-size:13px;color:var(--stone);text-align:center;margin-top:-12px;}
        .ohg-auth-form{display:flex;flex-direction:column;gap:16px;}
        .ohg-auth-field{display:flex;flex-direction:column;gap:7px;}
        .ohg-auth-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--stone);}
        .ohg-auth-submit{width:100%;justify-content:center;}
        .ohg-auth-switch{text-align:center;font-size:13px;color:var(--stone);}
        .ohg-auth-switch-link{color:var(--gold-dark);font-weight:600;}
      `}</style>
    </div>
  )
}