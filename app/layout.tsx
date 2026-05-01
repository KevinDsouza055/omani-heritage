import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
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

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <CartProvider>
          <SnackbarProvider>
            <Navbar />
            <CartDrawer />
            <main>
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