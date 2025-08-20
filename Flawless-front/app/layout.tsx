import type React from 'react'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import MobileFooterNav from '@/components/mobile-footer-nav'
import { CartProvider } from '@/contexts/cart-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import { ReviewsProvider } from '@/contexts/reviews-context'
import { AuthProvider } from '@/contexts/auth-context'
import { CartSidebar } from '@/components/cart-sidebar'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Flawless Beauty - Parapharmacie en ligne & Cosmétiques',
  description:
    'Découvrez notre sélection de produits de beauté, cosmétiques et parapharmacie. Livraison gratuite dès 39€.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="pb-16 font-sans">
        <AuthProvider>
          <ReviewsProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
                <CartSidebar />
                <MobileFooterNav />
              </CartProvider>
            </WishlistProvider>
          </ReviewsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
