import HeroSection from "@/components/flawless/hero-section";
import CategoryGrid from "@/components/flawless/category-grid";
import FeaturedProducts from "@/components/flawless/featured-products";
import BrandLogos from "@/components/flawless/brand-logos";
import ProductShowcase from "@/components/flawless/product-showcase";
import RecommendationsSection from "@/components/flawless/recommendations-section";
import NouveautesSection from "@/components/flawless/nouveautes-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandLogos />
      <ProductShowcase />
      <RecommendationsSection />
      <NouveautesSection />
    </div>
  );
}
