export interface PromoProduct {
  id: string;
  name: string;
  category: string;
  brand?: string;
  imageUrl: string;
  priceCents: number;
  oldPriceCents: number;
  discountPercentage: number;
  savings: number;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleEndDate?: Date;
  tags?: string[];
}

export interface PromoFiltersState {
  category: string;
  discountRange: string;
  sortBy: string;
  priceRange?: [number, number];
  brands?: string[];
}

export interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface PromoBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}