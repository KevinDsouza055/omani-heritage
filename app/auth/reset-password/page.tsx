'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { useSnackbar } from '@/components/ui/Snackbar'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { show } = useSnackbar()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    })
    if (error) {
      show(error.message, 'error')
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAF8]">
        <div className="w-full max-w-sm flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Check your email</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            We sent a password reset link to <span className="font-medium text-stone-700">{email}</span>.
          </p>
          <Link href="/auth/login">
            <Button variant="secondary">Back to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAF8]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#8B6914] flex items-center justify-center">
            <span className="text-white text-sm font-bold">OHG</span>
          </div>
          <h1 className="text-xl font-bold text-stone-900">Reset password</h1>
          <p className="text-sm text-stone-500">We'll send you a reset link</p>
        </div>

        <form onSubmit={handleReset} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-700">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
            />
          </div>

          <Button type="submit" size="lg" className="w-full mt-1" loading={loading}>
            Send Reset Link
          </Button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-5">
          Remember your password?{' '}
          <Link href="/auth/login" className="text-[#8B6914] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}