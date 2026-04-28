'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center min-h-screen">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
        <CheckCircle size={40} className="text-emerald-500" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-stone-900">Order Confirmed!</h1>
        <p className="text-stone-500 text-sm mt-2 leading-relaxed">
          Thank you for your purchase. You will receive a confirmation email shortly with your order details and tracking information.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Link href="/shop">
          <Button className="w-full" size="lg">Continue Shopping</Button>
        </Link>
        <Link href="/account/orders">
          <Button variant="secondary" className="w-full" size="lg">View My Orders</Button>
        </Link>
      </div>
    </div>
  )
}
