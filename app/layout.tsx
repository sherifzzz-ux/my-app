import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { LayoutShell } from '@/components/LayoutShell'
import { Inter, Playfair_Display } from 'next/font/google'
import { SessionProviderWrapper } from '@/components/providers/session-provider'
import QueryProvider from '@/providers/QueryProvider'

export const dynamic = 'force-dynamic'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
  preload: false, // Désactiver le preload pour éviter les erreurs
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  fallback: ['serif', 'Times New Roman'],
  preload: false, // Désactiver le preload pour éviter les erreurs
})

export const metadata: Metadata = {
  title: 'Mami-Shop - Parapharmacie & Cosmétiques au Sénégal',
  description:
    'Découvrez notre sélection de produits de beauté, cosmétiques et parapharmacie. Livraison rapide à Dakar (<24h) et dans toutes les régions du Sénégal. Paiement sécurisé par Wave, Orange Money et carte bancaire.',
  keywords: 'parapharmacie, cosmétiques, beauté, Sénégal, Dakar, Wave, Orange Money, livraison rapide',
  authors: [{ name: 'Mami-Shop' }],
  creator: 'Mami-Shop',
  publisher: 'Mami-Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mami-Shop - Parapharmacie & Cosmétiques au Sénégal',
    description: 'Découvrez notre sélection de produits de beauté. Livraison rapide à Dakar (<24h). Paiement Wave, Orange Money.',
    url: '/',
    siteName: 'Mami-Shop',
    locale: 'fr_SN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mami-Shop - Parapharmacie & Cosmétiques',
    description: 'Livraison rapide au Sénégal. Paiement Wave, Orange Money.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mami-Shop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body id="top" className="antialiased pb-16">
        <QueryProvider>
          <SessionProviderWrapper>
            <LayoutShell>
              {children}
              <Toaster />
            </LayoutShell>
          </SessionProviderWrapper>
        </QueryProvider>
      </body>
    </html>
  )
}
