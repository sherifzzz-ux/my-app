'use client'

import { SubcategoryProduct } from '@/lib/data/subcategories'
import { ProductCard } from '@/components/ui/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Grid3X3, List } from 'lucide-react'

interface SubcategoryGridProps {
  products: SubcategoryProduct[]
  loading?: boolean
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
}

export function SubcategoryGrid({ 
  products, 
  loading = false, 
  viewMode = 'grid',
  onViewModeChange 
}: SubcategoryGridProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton pour la barre d'outils */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* Skeleton pour les produits */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
        <p className="text-muted-foreground mb-6">
          Essayez de modifier vos filtres pour voir plus de résultats.
        </p>
        <Button variant="outline">
          Effacer les filtres
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Grille de produits */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              category: { name: product.category },
              priceCents: Math.round(product.price * 100),
              oldPriceCents: product.originalPrice ? Math.round(product.originalPrice * 100) : null,
              imageUrl: product.image,
              stock: product.inStock ? 10 : 0,
              isNew: product.isNew,
              isPromo: product.isOnSale,
              discountPercentage: product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : undefined,
              // Propriétés supplémentaires pour la compatibilité
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.image,
              inStock: product.inStock,
              isOnSale: product.isOnSale,
              brand: product.brand,
              rating: product.rating,
              reviews: product.reviews,
              tags: product.tags,
              description: product.description
            }}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Pagination (à implémenter plus tard) */}
      {products.length >= 20 && (
        <div className="flex justify-center pt-8">
          <Button variant="outline">
            Charger plus de produits
          </Button>
        </div>
      )}
    </div>
  )
}
