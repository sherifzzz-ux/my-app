import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { PromoHeroBanner } from '@/components/promotions/PromoHeroBanner';
import { FlashSalesSection } from '@/components/promotions/FlashSalesSection';
import { PromoFilters } from '@/components/promotions/PromoFilters';
import { PromoProductGrid } from '@/components/promotions/PromoProductGrid';
import { PromoBanner } from '@/components/promotions/PromoBanner';
import { LastChanceSection } from '@/components/promotions/LastChanceSection';
import { mockPromoProducts } from '@/lib/mock-data';
import { PromoProduct } from '@/types/promo';

export default function Promotions() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('discount');

  const filteredProducts = useMemo(() => {
    let filtered = [...mockPromoProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by discount percentage
    if (selectedDiscount !== 'all') {
      const discountRange = parseInt(selectedDiscount);
      filtered = filtered.filter(product => {
        if (discountRange === 50) {
          return product.discountPercentage >= 50;
        } else {
          return product.discountPercentage >= discountRange && 
                 product.discountPercentage < discountRange + 10;
        }
      });
    }

    // Sort products
    switch (sortBy) {
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case 'savings':
        filtered.sort((a, b) => b.savings - a.savings);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, selectedDiscount, sortBy]);

  const categories = ['all', 'visage', 'corps', 'cheveux', 'parfums', 'maquillage'];
  const discountRanges = ['all', '20', '30', '40', '50'];

  return (
    <>
      <Helmet>
        <title>Promotions - Flawless Beauty | Cosmétiques en Promotion au Sénégal</title>
        <meta 
          name="description" 
          content="Découvrez nos offres promotionnelles exclusives sur les cosmétiques. Réductions jusqu'à -70% sur vos marques préférées. Livraison gratuite au Sénégal."
        />
        <meta name="keywords" content="promotion cosmétiques, réduction beauté, offre spéciale Sénégal, cosmétiques pas cher" />
        <link rel="canonical" href="/promotions" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
        {/* Hero Banner */}
        <PromoHeroBanner />

        {/* Flash Sales Section */}
        <FlashSalesSection />

        {/* Promotional Banner */}
        <PromoBanner 
          title="Offres Limitées"
          subtitle="Ne manquez pas nos dernières promotions exclusives"
          backgroundImage="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3"
        />

        <main className="container mx-auto px-4 py-12">
          {/* Filters */}
          <PromoFilters
            categories={categories}
            discountRanges={discountRanges}
            selectedCategory={selectedCategory}
            selectedDiscount={selectedDiscount}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onDiscountChange={setSelectedDiscount}
            onSortChange={setSortBy}
          />

          {/* Products Grid */}
          <PromoProductGrid products={filteredProducts} />

          {/* Last Chance Section */}
          <LastChanceSection />
        </main>
      </div>
    </>
  );
}