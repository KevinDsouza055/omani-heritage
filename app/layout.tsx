import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { SnackbarProvider } from '@/components/ui/Snackbar'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CookieBanner } from '@/components/ui/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Omani Heritage Gallery', template: '%s | Omani Heritage Gallery' },
  description: 'Authentic handcrafted products from Oman — basketry, aromatics, silverware, rugs and more. Shipped worldwide.',
  keywords: ['Omani crafts', 'handmade Oman', 'Omani heritage', 'traditional Omani products'],
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F7F4EF]">
        <CartProvider>
          <SnackbarProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </SnackbarProvider>
        </CartProvider>
      </body>
    </html>
  )
}