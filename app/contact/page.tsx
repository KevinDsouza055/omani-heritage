'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useSnackbar } from '@/components/ui/Snackbar'
import { Mail, MessageSquare, Bug } from 'lucide-react'

export default function ContactPage() {
  const [type, setType] = useState<'general' | 'bug'>('general')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const { show } = useSnackbar()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      })
      if (res.ok) {
        show('Message sent! We will get back to you within 24 hours.', 'success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        show('Failed to send. Please email us directly.', 'error')
      }
    } catch {
      show('Failed to send. Please email us directly.', 'error')
    }
    setLoading(false)
  }

  const inputClass = "w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all"

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-2">Get in touch</p>
        <h1 className="text-3xl font-bold text-stone-900">Contact Us</h1>
        <p className="text-sm text-stone-500 mt-2">We respond within 24 hours</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="flex flex-col gap-4">
          {[
            { icon: <Mail size={16} />, label: 'Email', value: 'support@omaniheritage.com' },
            { icon: <MessageSquare size={16} />, label: 'Response time', value: 'Within 24 hours' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex flex-col gap-1.5 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <div className="flex items-center gap-2 text-stone-500">
                {icon}
                <span className="text-xs font-medium">{label}</span>
              </div>
              <p className="text-sm text-stone-700">{value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {/* Type toggle */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setType('general')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                type === 'general'
                  ? 'bg-[#8B6914] text-white border-[#8B6914]'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              <MessageSquare size={13} />
              General enquiry
            </button>
            <button
              onClick={() => setType('bug')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                type === 'bug'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              <Bug size={13} />
              Report a bug
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-stone-700">Name</label>
                <input required className={inputClass} value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-stone-700">Email</label>
                <input required type="email" className={inputClass} value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-stone-700">Subject</label>
              <input required className={inputClass} value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder={type === 'bug' ? 'Describe the bug briefly' : 'How can we help?'} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-stone-700">Message</label>
              <textarea required rows={5} className={inputClass} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder={type === 'bug' ? 'What happened? What did you expect? What browser/device are you using?' : 'Your message...'} />
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}