// Index pour faciliter les imports des sous-catégories

// Configuration des catégories
export {
  categoriesConfig,
  getCategoryById,
  getSubcategoryById,
  getFeaturedSubcategories,
  getAllSubcategories,
  getSubcategoriesByCategory,
  type CategoryConfig,
  type SubcategoryConfig
} from '../categories-config'

// Import des fonctions pour les utiliser dans ce fichier
import {
  getCategoryById,
  getSubcategoryById
} from '../categories-config'
import {
  getSubcategoryProducts
} from '../subcategories-data'

// Données des sous-catégories
export {
  getSubcategoryData,
  getSubcategoryProducts,
  getSubcategoryGuides,
  getFeaturedSubcategoryGuides,
  type SubcategoryProduct,
  type SubcategoryGuide
} from '../subcategories-data'

// Types TypeScript
export type {
  SubcategoryFilters,
  PriceRange,
  SubcategoryPageProps,
  SubcategoryHeroProps,
  SubcategoryFiltersProps,
  SubcategoryBreadcrumbProps,
  SubcategoryGridProps,
  SubcategoryGuidesProps,
  ActiveFilters,
  SearchParams,
  SubcategoryStats,
  SubcategoryRecommendations,
  SubcategoryMetadata,
  SubcategoryError,
  SubcategoryLoadingState,
  FilterAction,
  SearchResults,
  ProductComparison
} from '../../types/subcategories'

// Fonctions utilitaires
export function validateCategoryId(categoryId: string): boolean {
  const validCategories = ['soin-du-visage', 'maquillage', 'cheveux', 'corps-bain', 'parfumerie', 'bebe-enfant']
  return validCategories.includes(categoryId)
}

export function validateSubcategoryId(categoryId: string, subcategoryId: string): boolean {
  const category = getCategoryById(categoryId)
  if (!category) return false
  
  return category.subcategories.some(sub => sub.id === subcategoryId)
}

export function getSubcategorySlug(categoryId: string, subcategoryId: string): string | null {
  const subcategory = getSubcategoryById(categoryId, subcategoryId)
  return subcategory?.slug || null
}

export function getSubcategoryUrl(categoryId: string, subcategoryId: string): string {
  const slug = getSubcategorySlug(categoryId, subcategoryId)
  return slug ? `/${categoryId}/${slug}` : `/${categoryId}`
}

export function getCategoryUrl(categoryId: string): string {
  return `/${categoryId}`
}

// Fonction pour générer les métadonnées SEO
export function generateSubcategoryMetadata(categoryId: string, subcategoryId: string) {
  const category = getCategoryById(categoryId)
  const subcategory = getSubcategoryById(categoryId, subcategoryId)
  
  if (!category || !subcategory) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.',
      keywords: ['beauté', 'cosmétiques']
    }
  }
  
  return {
    title: `${subcategory.name} - ${category.name} | Mami Shop`,
    description: `${subcategory.description} Découvrez notre sélection de ${subcategory.productCount} produits ${subcategory.name.toLowerCase()} de qualité.`,
    keywords: [
      subcategory.name.toLowerCase(),
      category.name.toLowerCase(),
      'beauté',
      'cosmétiques',
      'produits',
      'soins',
      'maquillage'
    ]
  }
}

// Fonction pour générer les breadcrumbs
export function generateBreadcrumbs(categoryId: string, subcategoryId: string) {
  const category = getCategoryById(categoryId)
  const subcategory = getSubcategoryById(categoryId, subcategoryId)
  
  if (!category || !subcategory) {
    return [
      { label: 'Accueil', href: '/' },
      { label: 'Catégorie non trouvée' }
    ]
  }
  
  return [
    { label: 'Accueil', href: '/' },
    { label: category.name, href: `/${categoryId}` },
    { label: subcategory.name }
  ]
}

// Fonction pour obtenir les statistiques d'une sous-catégorie
export function getSubcategoryStats(categoryId: string, subcategoryId: string) {
  const products = getSubcategoryProducts(categoryId, subcategoryId)
  
  if (products.length === 0) {
    return {
      totalProducts: 0,
      averagePrice: 0,
      averageRating: 0,
      topBrands: [],
      priceRange: { min: 0, max: 0 }
    }
  }
  
  const prices = products.map(p => p.price)
  const ratings = products.map(p => p.rating)
  const brands = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    totalProducts: products.length,
    averagePrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    averageRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
    topBrands: Object.entries(brands)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }
}
