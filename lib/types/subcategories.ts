// Types TypeScript pour les sous-catégories

export interface SubcategoryConfig {
  id: string
  name: string
  description: string
  slug: string
  icon: string
  productCount: number
  featured: boolean
  filters?: SubcategoryFilters
}

export interface SubcategoryFilters {
  brands?: string[]
  priceRanges?: PriceRange[]
  skinTypes?: string[]
  textures?: string[]
  ingredients?: string[]
  concerns?: string[]
}

export interface PriceRange {
  min: number
  max: number
  label: string
}

export interface CategoryConfig {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: SubcategoryConfig[]
  totalProducts: number
  featured: boolean
}

export interface SubcategoryProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isNew: boolean
  isOnSale: boolean
  tags: string[]
  category: string
  subcategory: string
}

export interface SubcategoryGuide {
  id: string
  title: string
  description: string
  content: string
  image: string
  readTime: number
  category: string
  subcategory: string
  featured: boolean
}

export interface SubcategoryPageProps {
  params: {
    category: string
    subcategory: string
  }
}

export interface SubcategoryHeroProps {
  category: CategoryConfig
  subcategory: SubcategoryConfig
}

export interface SubcategoryFiltersProps {
  filters: SubcategoryFilters
  onFilterChange: (filters: Partial<SubcategoryFilters>) => void
  activeFilters: Partial<SubcategoryFilters>
}

export interface SubcategoryBreadcrumbProps {
  category: CategoryConfig
  subcategory: SubcategoryConfig
}

export interface SubcategoryGridProps {
  products: SubcategoryProduct[]
  loading?: boolean
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
}

export interface SubcategoryGuidesProps {
  guides: SubcategoryGuide[]
  category: string
  subcategory: string
}

// Types pour les filtres actifs
export interface ActiveFilters {
  brands?: string[]
  priceRange?: { min: number; max: number }
  skinTypes?: string[]
  textures?: string[]
  ingredients?: string[]
  concerns?: string[]
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
  search?: string
}

// Types pour les paramètres de recherche
export interface SearchParams {
  brands?: string
  priceRange?: string
  skinTypes?: string
  textures?: string
  ingredients?: string
  concerns?: string
  sortBy?: string
  search?: string
  page?: string
}

// Types pour les statistiques de sous-catégorie
export interface SubcategoryStats {
  totalProducts: number
  averagePrice: number
  averageRating: number
  topBrands: { name: string; count: number }[]
  priceRange: { min: number; max: number }
}

// Types pour les recommandations
export interface SubcategoryRecommendations {
  similarProducts: SubcategoryProduct[]
  relatedSubcategories: SubcategoryConfig[]
  popularGuides: SubcategoryGuide[]
}

// Types pour les métadonnées SEO
export interface SubcategoryMetadata {
  title: string
  description: string
  keywords: string[]
  canonical: string
  openGraph: {
    title: string
    description: string
    image: string
    url: string
  }
}

// Types pour les erreurs
export interface SubcategoryError {
  code: 'NOT_FOUND' | 'INVALID_CATEGORY' | 'INVALID_SUBCATEGORY' | 'SERVER_ERROR'
  message: string
  details?: string
}

// Types pour les états de chargement
export interface SubcategoryLoadingState {
  products: boolean
  guides: boolean
  filters: boolean
  recommendations: boolean
}

// Types pour les actions de filtrage
export interface FilterAction {
  type: 'SET_BRANDS' | 'SET_PRICE_RANGE' | 'SET_SKIN_TYPES' | 'SET_TEXTURES' | 'SET_INGREDIENTS' | 'SET_CONCERNS' | 'SET_SORT' | 'SET_SEARCH' | 'CLEAR_FILTERS'
  payload: string | string[] | { min: number; max: number } | null
}

// Types pour les résultats de recherche
export interface SearchResults {
  products: SubcategoryProduct[]
  totalCount: number
  hasMore: boolean
  currentPage: number
  totalPages: number
}

// Types pour les comparaisons de produits
export interface ProductComparison {
  products: SubcategoryProduct[]
  features: string[]
  comparison: Record<string, Record<string, string | number | boolean>>
}
