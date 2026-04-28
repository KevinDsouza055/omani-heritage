import { Accordion } from '@/components/ui/Accordion'

export default function TermsPage() {
  const items = [
    {
      question: 'Acceptance of terms',
      answer: 'By accessing and using the Omani Heritage Gallery website, you agree to be bound by these terms and conditions. If you do not agree, please do not use our website.',
    },
    {
      question: 'Products and pricing',
      answer: 'All products are handcrafted and may have slight variations from photos — this is a natural characteristic of handmade goods. Prices are displayed in USD and may be subject to change. We reserve the right to cancel orders in the case of pricing errors.',
    },
    {
      question: 'Orders and payment',
      answer: 'Orders are confirmed once payment is received. We accept all major credit and debit cards processed securely through Stripe. By placing an order you confirm that you are authorised to use the payment method provided.',
    },
    {
      question: 'Shipping',
      answer: 'We ship internationally from Oman. Delivery times vary by destination — typically 7 to 21 business days. Customers are responsible for any customs duties or import taxes applicable in their country.',
    },
    {
      question: 'Returns and refunds',
      answer: 'We accept returns within 14 days of delivery for items in their original condition. To initiate a return, contact us at support@omaniheritage.com. Shipping costs for returns are the responsibility of the customer unless the item is defective.',
    },
    {
      question: 'Intellectual property',
      answer: 'All content on this website including images, text, and logos is the property of Omani Heritage Gallery and may not be reproduced without written permission.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl font-bold text-stone-900">Terms & Conditions</h1>
        <p className="text-sm text-stone-500 mt-3">Last updated: January 2026</p>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-8">
        Please read these terms carefully before using our website or placing an order.
        These terms govern your use of the Omani Heritage Gallery website and services.
      </p>

      <Accordion items={items} />
    </div>
  )
}