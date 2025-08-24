import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { LayoutShell } from '@/components/LayoutShell'
import { Inter, Playfair_Display } from 'next/font/google'
import { SessionProviderWrapper } from '@/components/providers/session-provider'

export const dynamic = 'force-dynamic'

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
  title: 'FlawlessBeauty - Parapharmacie en ligne & Cosmétiques',
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
      <body id="top" className="antialiased pb-16">
        <SessionProviderWrapper>
          <LayoutShell>
            {children}
            <Toaster />
          </LayoutShell>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
