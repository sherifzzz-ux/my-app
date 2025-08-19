import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandLogos } from "@/components/brand-logos"
import { ProductShowcase } from "@/components/product-showcase"
import { RecommendationsSection } from "@/components/recommendations-section"
import { NouveautesSection } from "@/components/nouveautes-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandLogos />
      <ProductShowcase />
      <RecommendationsSection />
      <NouveautesSection />
      <Footer />
    </div>
  )
}
