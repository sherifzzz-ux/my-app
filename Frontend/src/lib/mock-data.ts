import { PromoProduct } from '@/types/promo';
import { calculateDiscountPercentage, calculateSavings } from './utils/price-utils';

// Helper function to create promo product with calculated values
function createPromoProduct(
  id: string,
  name: string,
  category: string,
  priceCents: number,
  oldPriceCents: number,
  options: Partial<PromoProduct> = {}
): PromoProduct {
  return {
    id,
    name,
    category,
    priceCents,
    oldPriceCents,
    discountPercentage: calculateDiscountPercentage(oldPriceCents, priceCents),
    savings: calculateSavings(oldPriceCents, priceCents),
    imageUrl: `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&w=400&h=400&fit=crop&auto=format`,
    ...options,
  };
}

export const mockPromoProducts: PromoProduct[] = [
  // Flash Sales (ending soon)
  createPromoProduct(
    '1',
    'Sérum Hydratant Vitamine C',
    'Visage',
    1500000, // 15,000 CFA
    5000000, // 50,000 CFA
    {
      brand: 'GlowLab',
      rating: 4.8,
      reviewCount: 124,
      stock: 5,
      isFlashSale: true,
      flashSaleEndDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Anti-âge', 'Hydratant', 'Vitamine C']
    }
  ),
  
  createPromoProduct(
    '2',
    'Crème de Nuit Réparatrice',
    'Visage',
    2000000, // 20,000 CFA
    4000000, // 40,000 CFA
    {
      brand: 'NightGlow',
      rating: 4.6,
      reviewCount: 89,
      stock: 12,
      isFlashSale: true,
      flashSaleEndDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Nuit', 'Réparatrice', 'Anti-rides']
    }
  ),

  // Regular promotions
  createPromoProduct(
    '3',
    'Huile d\'Argan Bio Pure',
    'Cheveux',
    1200000, // 12,000 CFA
    2000000, // 20,000 CFA
    {
      brand: 'Moroccan Gold',
      rating: 4.9,
      reviewCount: 203,
      stock: 25,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Bio', 'Naturel', 'Nourrissant']
    }
  ),

  createPromoProduct(
    '4',
    'Rouge à Lèvres Mat Longue Tenue',
    'Maquillage',
    800000, // 8,000 CFA
    1500000, // 15,000 CFA
    {
      brand: 'ColorPop',
      rating: 4.4,
      reviewCount: 67,
      stock: 18,
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Mat', 'Longue tenue', 'Rouge']
    }
  ),

  createPromoProduct(
    '5',
    'Parfum Floral Élégant 50ml',
    'Parfums',
    3000000, // 30,000 CFA
    6000000, // 60,000 CFA
    {
      brand: 'Essence',
      rating: 4.7,
      reviewCount: 156,
      stock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Floral', 'Élégant', '50ml']
    }
  ),

  createPromoProduct(
    '6',
    'Beurre de Karité Naturel',
    'Corps',
    600000, // 6,000 CFA
    1200000, // 12,000 CFA
    {
      brand: 'AfricanGold',
      rating: 4.8,
      reviewCount: 145,
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Naturel', 'Hydratant', 'Karité']
    }
  ),

  createPromoProduct(
    '7',
    'Masque Purifiant Argile Verte',
    'Visage',
    900000, // 9,000 CFA
    1800000, // 18,000 CFA
    {
      brand: 'PureClay',
      rating: 4.5,
      reviewCount: 78,
      stock: 22,
      isFeatured: true,
      imageUrl: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Purifiant', 'Argile', 'Masque']
    }
  ),

  createPromoProduct(
    '8',
    'Shampooing Hydratant Coco',
    'Cheveux',
    700000, // 7,000 CFA
    1400000, // 14,000 CFA
    {
      brand: 'TropicHair',
      rating: 4.3,
      reviewCount: 92,
      stock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Hydratant', 'Coco', 'Naturel']
    }
  ),

  createPromoProduct(
    '9',
    'Palette Fards à Paupières',
    'Maquillage',
    1800000, // 18,000 CFA
    3000000, // 30,000 CFA
    {
      brand: 'EyeMagic',
      rating: 4.6,
      reviewCount: 134,
      stock: 11,
      imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90c4da120ed?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Palette', 'Couleurs', 'Yeux']
    }
  ),

  createPromoProduct(
    '10',
    'Gel Douche Parfumé Vanille',
    'Corps',
    500000, // 5,000 CFA
    1000000, // 10,000 CFA
    {
      brand: 'SweetSkin',
      rating: 4.4,
      reviewCount: 67,
      stock: 28,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-dd6f96ac4f96?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Vanille', 'Parfumé', 'Doux']
    }
  ),

  // High discount items
  createPromoProduct(
    '11',
    'Coffret Soin Visage Complet',
    'Visage',
    2500000, // 25,000 CFA
    8000000, // 80,000 CFA
    {
      brand: 'SkinCare Pro',
      rating: 4.9,
      reviewCount: 245,
      stock: 6,
      isFeatured: true,
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Coffret', 'Complet', 'Premium']
    }
  ),

  createPromoProduct(
    '12',
    'Eau de Toilette Fraîche 100ml',
    'Parfums',
    2200000, // 22,000 CFA
    4400000, // 44,000 CFA
    {
      brand: 'FreshScent',
      rating: 4.5,
      reviewCount: 98,
      stock: 14,
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0fa12d78e0c?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
      tags: ['Fraîche', '100ml', 'Eau de toilette']
    }
  )
];

// Categories for filtering
export const categories = [
  { id: 'all', name: 'Toutes catégories', count: mockPromoProducts.length },
  { id: 'visage', name: 'Visage', count: mockPromoProducts.filter(p => p.category.toLowerCase() === 'visage').length },
  { id: 'corps', name: 'Corps', count: mockPromoProducts.filter(p => p.category.toLowerCase() === 'corps').length },
  { id: 'cheveux', name: 'Cheveux', count: mockPromoProducts.filter(p => p.category.toLowerCase() === 'cheveux').length },
  { id: 'parfums', name: 'Parfums', count: mockPromoProducts.filter(p => p.category.toLowerCase() === 'parfums').length },
  { id: 'maquillage', name: 'Maquillage', count: mockPromoProducts.filter(p => p.category.toLowerCase() === 'maquillage').length },
];

// Flash sale products (ending within 24 hours)
export const flashSaleProducts = mockPromoProducts.filter(product => 
  product.isFlashSale && 
  product.flashSaleEndDate && 
  product.flashSaleEndDate > new Date()
);

// Featured promotional products
export const featuredPromoProducts = mockPromoProducts.filter(product => product.isFeatured);

// Best discount products (50%+ off)
export const bestDiscountProducts = mockPromoProducts.filter(product => product.discountPercentage >= 50);

// Low stock products (create urgency)
export const lowStockProducts = mockPromoProducts.filter(product => 
  product.stock && product.stock <= 10
);