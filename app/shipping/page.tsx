import { Accordion } from '@/components/ui/Accordion'

export default function ShippingPage() {
  const items = [
    {
      question: 'Where do you ship to?',
      answer: 'We ship worldwide from Muscat, Oman. This includes the UK, USA, UAE, India, Europe, Australia, and most other countries. If you are unsure whether we ship to your country, contact us before ordering.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Gulf countries (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain): 3 to 7 business days. Europe and UK: 10 to 15 business days. USA, Canada, Australia: 14 to 21 business days. India and Asia: 7 to 14 business days. These are estimates and may vary.',
    },
    {
      question: 'How much does shipping cost?',
      answer: 'Shipping costs are calculated at checkout based on your location and the weight of your order. We regularly offer free shipping promotions — check our homepage for current offers.',
    },
    {
      question: 'Will I need to pay customs duties?',
      answer: 'International orders may be subject to customs duties or import taxes in the destination country. These charges are the responsibility of the customer and are not included in our prices or shipping fees.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped you will receive a confirmation email with a tracking number. You can also view your order status in your account under My Orders.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 14 days of delivery. Items must be in their original condition and packaging. Contact us at support@omaniheritage.com to initiate a return. Refunds are processed within 5 to 10 business days of receiving the returned item.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-2">Help</p>
        <h1 className="text-3xl font-bold text-stone-900">Shipping & Returns</h1>
        <p className="text-sm text-stone-500 mt-3">Everything you need to know about delivery and returns</p>
      </div>
      <Accordion items={items} />
    </div>
  )
}