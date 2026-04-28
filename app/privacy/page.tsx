import { Accordion } from '@/components/ui/Accordion'

export default function PrivacyPage() {
  const items = [
    {
      question: 'What information do we collect?',
      answer: 'We collect information you provide directly such as your name, email address, shipping address, and payment information when you make a purchase. We also collect usage data such as pages visited and products viewed to improve your experience.',
    },
    {
      question: 'How do we use your information?',
      answer: 'We use your information to process orders, send order confirmations and shipping updates, respond to your inquiries, and improve our website. We do not sell your personal information to third parties.',
    },
    {
      question: 'How do we protect your data?',
      answer: 'All transactions are encrypted using SSL technology. Payment information is processed securely through Stripe and we never store your card details on our servers. Your account password is encrypted and never stored in plain text.',
    },
    {
      question: 'Do we use cookies?',
      answer: 'Yes, we use essential cookies to keep your cart working and to keep you logged in. We may also use analytics cookies to understand how visitors use our site. You can control cookies through your browser settings.',
    },
    {
      question: 'Your rights',
      answer: 'You have the right to access, correct, or delete your personal data at any time. To request this, contact us at privacy@omaniheritage.com and we will respond within 30 days.',
    },
    {
      question: 'Contact us',
      answer: 'If you have any questions about this privacy policy, please contact us at privacy@omaniheritage.com or through our contact page.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl font-bold text-stone-900">Privacy Policy</h1>
        <p className="text-sm text-stone-500 mt-3">Last updated: January 2026</p>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-8">
        Omani Heritage Gallery ("we", "us", "our") is committed to protecting your privacy.
        This policy explains how we collect, use, and safeguard your personal information
        when you visit our website or make a purchase.
      </p>

      <Accordion items={items} />
    </div>
  )
}