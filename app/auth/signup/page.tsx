'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useSnackbar } from '@/components/ui/Snackbar'
import Link from 'next/link'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const { show } = useSnackbar()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { show('Password must be at least 8 characters', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) { show(error.message, 'error') }
    else { setDone(true) }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="ohg-auth-page">
        <div className="ohg-auth-card" style={{ textAlign: 'center', gap: 16 }}>
          <CheckCircle size={48} style={{ color: '#2D7A47', margin: '0 auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500 }}>Check your email</h2>
          <p style={{ fontSize: 14, color: 'var(--stone)' }}>
            We sent a confirmation link to <strong>{email}</strong>
          </p>
          <Link href="/auth/login" className="ohg-btn ohg-btn-outline ohg-btn-md" style={{ marginTop: 8 }}>
            Back to Login
          </Link>
        </div>
        <style>{`
          .ohg-auth-page{min-height:100vh;background:var(--ivory-2);display:flex;align-items:center;justify-content:center;padding:40px 24px;}
          .ohg-auth-card{width:100%;max-width:420px;background:var(--white);border:1px solid var(--border);border-radius:4px;padding:48px 40px;display:flex;flex-direction:column;}
        `}</style>
      </div>
    )
  }

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 8 ? 2 : password.length < 12 ? 3 : 4
  const strengthColor = ['transparent', '#E74C3C', '#F39C12', '#2ECC71', '#27AE60'][pwStrength]

  return (
    <div className="ohg-auth-page">
      <div className="ohg-auth-card">
        <div className="ohg-auth-logo">
          <div className="ohg-auth-logomark">OHG</div>
        </div>
        <h1 className="ohg-auth-title">Create account</h1>
        <p className="ohg-auth-sub">Join Omani Heritage Gallery</p>

        <form onSubmit={handleSignup} className="ohg-auth-form">
          <div className="ohg-auth-field">
            <label className="ohg-auth-label">Full name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="Your name" className="ohg-input" />
          </div>
          <div className="ohg-auth-field">
            <label className="ohg-auth-label">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" className="ohg-input" />
          </div>
          <div className="ohg-auth-field">
            <label className="ohg-auth-label">Password</label>
            <div className="ohg-auth-pw-wrap">
              <input type={showPw ? 'text' : 'password'} required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters" className="ohg-input" style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPw(v => !v)} className="ohg-auth-pw-toggle">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{
                  flex: 1, height: 2, borderRadius: 2,
                  background: i <= pwStrength ? strengthColor : 'var(--border)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
          </div>
          <button type="submit" disabled={loading} className="ohg-btn ohg-btn-dark ohg-btn-lg ohg-auth-submit">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="ohg-auth-switch">
          Already have an account?{' '}
          <Link href="/auth/login" className="ohg-auth-switch-link">Sign in</Link>
        </p>
        <p style={{ fontSize: 11, color: 'var(--stone-light)', textAlign: 'center', marginTop: -8 }}>
          By signing up you agree to our{' '}
          <Link href="/terms" style={{ color: 'var(--gold-dark)' }}>Terms</Link> and{' '}
          <Link href="/privacy" style={{ color: 'var(--gold-dark)' }}>Privacy Policy</Link>
        </p>
      </div>

      <style>{`
        .ohg-auth-page{min-height:100vh;background:var(--ivory-2);display:flex;align-items:center;justify-content:center;padding:40px 24px;}
        .ohg-auth-card{width:100%;max-width:420px;background:var(--white);border:1px solid var(--border);border-radius:4px;padding:48px 40px;display:flex;flex-direction:column;gap:20px;}
        .ohg-auth-logo{display:flex;justify-content:center;margin-bottom:4px;}
        .ohg-auth-logomark{width:44px;height:44px;background:var(--charcoal);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--gold-light);letter-spacing:.05em;}
        .ohg-auth-title{font-family:var(--font-serif);font-size:1.75rem;font-weight:500;color:var(--charcoal);text-align:center;margin-top:-4px;}
        .ohg-auth-sub{font-size:13px;color:var(--stone);text-align:center;margin-top:-12px;}
        .ohg-auth-form{display:flex;flex-direction:column;gap:16px;}
        .ohg-auth-field{display:flex;flex-direction:column;gap:7px;}
        .ohg-auth-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--stone);}
        .ohg-auth-pw-wrap{position:relative;}
        .ohg-auth-pw-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--stone-light);cursor:pointer;display:flex;}
        .ohg-auth-submit{width:100%;justify-content:center;margin-top:4px;}
        .ohg-auth-switch{text-align:center;font-size:13px;color:var(--stone);}
        .ohg-auth-switch-link{color:var(--gold-dark);font-weight:600;}
      `}</style>
    </div>
  )
}