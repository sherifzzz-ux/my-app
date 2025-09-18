'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Grid, List, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isOnSale?: boolean
  category: string
  tags?: string[]
}

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  showFilters?: boolean
  showSort?: boolean
  showViewToggle?: boolean
  className?: string
}

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
type ViewMode = 'grid' | 'list'

export function ProductGrid({
  products,
  loading = false,
  showFilters = true,
  showSort = true,
  showViewToggle = true,
  className
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  // Tri des produits
  const sortedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })
    return sorted
  }, [products, sortBy])

  const sortOptions = [
    { value: 'name', label: 'Nom A-Z' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Mieux notés' },
    { value: 'newest', label: 'Nouveautés' }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Barre d'outils */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Filtres */}
          {showFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          )}

          {/* Tri */}
          {showSort && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* Toggle vue */}
          {showViewToggle && (
            <div className="flex border border-input rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Panneau de filtres */}
      {showFilterPanel && showFilters && (
        <div className="p-4 border border-input rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Panneau de filtres - À implémenter
          </p>
        </div>
      )}

      {/* Grille de produits */}
      <div
        className={cn(
          'grid gap-6',
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        )}
      >
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Message si aucun produit */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Aucun produit trouvé
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Essayez de modifier vos filtres de recherche
          </p>
        </div>
      )}
    </div>
  )
}
