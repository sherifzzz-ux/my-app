/**
 * Types TypeScript pour le système de navigation
 * Basés sur la structure de la base de données Supabase
 */

// Interface pour les éléments de menu statiques
export interface StaticMenuItem {
  label: string
  href: string
  icon?: string
  description?: string
}

// Interface pour les sous-catégories
export interface SubcategoryMenuItem {
  id: string
  label: string
  href: string
  slug: string
  productCount?: number
}

// Interface pour les catégories principales
export interface CategoryMenuItem {
  id: string
  label: string
  href: string
  slug: string
  imageUrl?: string
  children: SubcategoryMenuItem[]
  productCount?: number
}

// Interface pour les éléments de navigation génériques
export interface NavigationItem {
  id?: string
  label: string
  href: string
  icon?: string
  imageUrl?: string
  description?: string
  children?: NavigationItem[]
  productCount?: number
  isActive?: boolean
  isExternal?: boolean
}

// Interface pour les données de navigation complètes
export interface NavigationData {
  staticItems: StaticMenuItem[]
  categories: CategoryMenuItem[]
  isLoading: boolean
  error?: string
}

// Interface pour les props des composants de navigation
export interface NavigationItemProps {
  item: NavigationItem
  className?: string
  showIcon?: boolean
  showCount?: boolean
  level?: number
}

// Interface pour les props des dropdowns
export interface CategoryDropdownProps {
  category: CategoryMenuItem
  className?: string
  showImage?: boolean
  showCount?: boolean
}

// Interface pour les props du menu principal
export interface HeaderNavigationProps {
  className?: string
  showStaticItems?: boolean
  showCategories?: boolean
  maxCategories?: number
}

// Interface pour les props du menu mobile
export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

// Types pour les états de chargement
export type NavigationState = 'idle' | 'loading' | 'success' | 'error'

// Types pour les types de menu
export type MenuType = 'main' | 'footer' | 'mobile' | 'sidebar'

// Types pour les tailles d'écran
export type ScreenSize = 'mobile' | 'tablet' | 'desktop'

// Interface pour la configuration de navigation
export interface NavigationConfig {
  enableCache: boolean
  cacheTimeout: number
  enableSkeleton: boolean
  enableErrorBoundary: boolean
  maxRetries: number
}

// Interface pour les erreurs de navigation
export interface NavigationError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// Types pour les événements de navigation
export interface NavigationEvent {
  type: 'click' | 'hover' | 'focus' | 'blur'
  target: string
  timestamp: Date
  metadata?: Record<string, any>
}
