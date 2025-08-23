"use client"

import { useMemo, useState, useEffect } from 'react'
import { PromoHeroBanner } from '@/Frontend/src/components/promotions/PromoHeroBanner'
import { FlashSalesSection } from '@/Frontend/src/components/promotions/FlashSalesSection'
import { PromoBanner } from '@/Frontend/src/components/promotions/PromoBanner'
import { PromoFilters } from '@/Frontend/src/components/promotions/PromoFilters'
import { PromoProductGrid } from '@/Frontend/src/components/promotions/PromoProductGrid'
import { LastChanceSection } from '@/Frontend/src/components/promotions/LastChanceSection'
import { mockPromoProducts } from '@/lib/mock-data'
import { PromoProduct } from '@/types/promo'

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDiscount, setSelectedDiscount] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('discount')
  const [products, setProducts] = useState<PromoProduct[]>(mockPromoProducts)

  useEffect(() => {
    let cancelled = false
    fetch('/api/promotions')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.products)) {
          setProducts(data.products as PromoProduct[])
        }
      })
      .catch(() => {
        // keep mock data as fallback
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }
    if (selectedDiscount !== 'all') {
      const discountRange = parseInt(selectedDiscount)
      filtered = filtered.filter((p) => (discountRange === 50 ? p.discountPercentage >= 50 : p.discountPercentage >= discountRange && p.discountPercentage < discountRange + 10))
    }
    switch (sortBy) {
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage)
        break
      case 'price-low':
        filtered.sort((a, b) => a.priceCents - b.priceCents)
        break
      case 'price-high':
        filtered.sort((a, b) => b.priceCents - a.priceCents)
        break
      case 'savings':
        filtered.sort((a, b) => b.savings - a.savings)
        break
    }
    return filtered
  }, [products, selectedCategory, selectedDiscount, sortBy])

  const categories = ['all', 'visage', 'corps', 'cheveux', 'parfums', 'maquillage']
  const discountRanges = ['all', '20', '30', '40', '50']

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <PromoHeroBanner />
      <FlashSalesSection />
      <PromoBanner
        title="Offres Limitées"
        subtitle="Ne manquez pas nos dernières promotions exclusives"
        backgroundImage="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3"
      />
      <main className="container mx-auto px-4 py-12">
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
        <PromoProductGrid products={filteredProducts} />
        <LastChanceSection />
      </main>
    </div>
  )
}
