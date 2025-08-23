import { Metadata } from 'next'
import HeroSection from '@/components/flawless/hero-section'
import CategoryGrid from '@/components/flawless/category-grid'
import FeaturedProducts from '@/components/flawless/featured-products'
import BrandLogos from '@/components/flawless/brand-logos'
import ProductShowcase from '@/components/flawless/product-showcase'
import RecommendationsSection from '@/components/flawless/recommendations-section'
import NouveautesSection from '@/components/flawless/nouveautes-section'

export const metadata: Metadata = {
  title: 'FlawlessBeauty - Parapharmacie & Cosmétiques Premium au Sénégal',
  description: 'Découvrez notre sélection de produits de beauté premium : soins du visage, corps, cheveux, parfumerie et Korean Beauty. Livraison 24h à Dakar.',
  keywords: 'cosmétiques, parapharmacie, beauté, soins visage, Korean beauty, Dakar, Sénégal',
  openGraph: {
    title: 'FlawlessBeauty - Parapharmacie & Cosmétiques Premium',
    description: 'Votre boutique beauté en ligne au Sénégal. Livraison gratuite dès 25,000 CFA.',
    type: 'website',
    locale: 'fr_SN',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandLogos />
      <ProductShowcase />
      <RecommendationsSection />
      <NouveautesSection />
    </div>
  )
}
