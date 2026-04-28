import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { SnackbarProvider } from '@/components/ui/Snackbar'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
      <body>
        <CartProvider>
          <SnackbarProvider>
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </SnackbarProvider>
        </CartProvider>
      </body>
    </html>
  )
}