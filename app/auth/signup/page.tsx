'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { useSnackbar } from '@/components/ui/Snackbar'
import Link from 'next/link'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { show } = useSnackbar()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      show('Password must be at least 8 characters', 'error')
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
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
            We sent a confirmation link to <span className="font-medium text-stone-700">{email}</span>. Click it to activate your account.
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
          <h1 className="text-xl font-bold text-stone-900">Create account</h1>
          <p className="text-sm text-stone-500">Join Omani Heritage Gallery</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-700">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {/* Password strength indicator */}
            <div className="flex gap-1 mt-1">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                  password.length === 0 ? 'bg-stone-200' :
                  password.length < 6 && i <= 1 ? 'bg-red-400' :
                  password.length < 8 && i <= 2 ? 'bg-amber-400' :
                  password.length < 12 && i <= 3 ? 'bg-emerald-400' :
                  i <= 4 ? 'bg-emerald-500' : 'bg-stone-200'
                }`} />
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full mt-1" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-5">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#8B6914] font-medium hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-center text-[10px] text-stone-400 mt-4 leading-relaxed">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="underline">Terms</Link> and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}