import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { CategoryGrid } from "@/components/CategoryGrid"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import { BrandLogos } from "@/components/BrandLogos"
import { ProductGridWithCart } from "@/components/ProductGridWithCart"
import { ProductShowcase } from "@/components/ProductShowcase"
import { RecommendationsSection } from "@/components/RecommendationsSection"
import { NouveautesSection } from "@/components/NouveautesSection"
import { NewsletterSection } from "@/components/NewsletterSection"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandLogos />
      <ProductGridWithCart />
      <ProductShowcase />
      <RecommendationsSection />
      <NouveautesSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
