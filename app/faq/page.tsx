import { Accordion } from '@/components/ui/Accordion'

export default function FaqPage() {
  const items = [
    {
      question: 'Are your products genuinely handmade in Oman?',
      answer: 'Yes, absolutely. Every product in our gallery is handcrafted by skilled Omani artisans using traditional techniques. We work directly with craftspeople across Oman to bring you authentic heritage pieces.',
    },
    {
      question: 'Can I request a custom or personalised item?',
      answer: 'Yes! We love custom orders. Contact us through the contact page describing what you have in mind and we will do our best to accommodate your request. Lead times for custom items are typically 4 to 8 weeks.',
    },
    {
      question: 'Are the products exactly as shown in photos?',
      answer: 'Since all products are handmade, there may be slight natural variations in colour, pattern, or size between items. This is what makes each piece unique and is not considered a defect.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we offer complimentary gift wrapping on all orders. Just leave a note at checkout with your gift message and we will take care of the rest.',
    },
    {
      question: 'How do I care for my Omani craft items?',
      answer: 'Care instructions vary by product. Baskets and woven items should be kept dry and away from direct sunlight. Silverware should be polished with a soft cloth. Aromatics should be stored in a cool dry place. Specific care instructions are included with each product.',
    },
    {
      question: 'I have a problem with my order. What do I do?',
      answer: 'We are sorry to hear that! Please contact us at support@omaniheritage.com or use the contact form on our website. We aim to respond within 24 hours and will do everything we can to make it right.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
      <div className="mb-10">
        <p className="text-xs text-[#8B6914] font-medium uppercase tracking-widest mb-2">Help</p>
        <h1 className="text-3xl font-bold text-stone-900">Frequently Asked Questions</h1>
        <p className="text-sm text-stone-500 mt-3">Can't find the answer? Contact us directly.</p>
      </div>
      <Accordion items={items} />
    </div>
  )
}