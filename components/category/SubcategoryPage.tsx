'use client'

import { useState, useMemo } from 'react'
import { CategoryConfig, SubcategoryConfig, SubcategoryProduct, SubcategoryGuide } from '@/lib/data/subcategories'
import { SubcategoryHero } from './SubcategoryHero'
import { SubcategoryBreadcrumb } from './SubcategoryBreadcrumb'
import { SubcategoryFilters } from './SubcategoryFilters'
import { SubcategoryGrid } from './SubcategoryGrid'
import { SubcategoryGuides } from './SubcategoryGuides'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Grid3X3, List, Filter, X, Star, Package, TrendingUp } from 'lucide-react'

interface SubcategoryPageProps {
  category: CategoryConfig
  subcategory: SubcategoryConfig
  products: SubcategoryProduct[]
  guides: SubcategoryGuide[]
  loading?: boolean
}

export function SubcategoryPage({ 
  category, 
  subcategory, 
  products, 
  guides, 
  loading = false 
}: SubcategoryPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    brands: [] as string[],
    priceRange: undefined as { min: number; max: number } | undefined,
    skinTypes: [] as string[],
    textures: [] as string[],
    ingredients: [] as string[],
    concerns: [] as string[],
    sortBy: 'popular' as 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest',
    search: '' as string
  })

  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filtre par recherche
    if (activeFilters.search) {
      const searchLower = activeFilters.search.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Filtre par marques
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.brands.includes(product.brand)
      )
    }

    // Filtre par prix
    if (activeFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= activeFilters.priceRange!.min && 
        product.price <= activeFilters.priceRange!.max
      )
    }

    // Filtre par types de peau
    if (activeFilters.skinTypes.length > 0) {
      filtered = filtered.filter(product => 
        product.tags.some(tag => 
          activeFilters.skinTypes.some(skinType => 
            tag.toLowerCase().includes(skinType.toLowerCase())
          )
        )
      )
    }

    // Filtre par textures
    if (activeFilters.textures.length > 0) {
      filtered = filtered.filter(product => 
        product.tags.some(tag => 
          activeFilters.textures.some(texture => 
            tag.toLowerCase().includes(texture.toLowerCase())
          )
        )
      )
    }

    // Filtre par ingrédients
    if (activeFilters.ingredients.length > 0) {
      filtered = filtered.filter(product => 
        product.tags.some(tag => 
          activeFilters.ingredients.some(ingredient => 
            tag.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      )
    }

    // Tri des produits
    switch (activeFilters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return filtered
  }, [products, activeFilters])

  // Statistiques de la sous-catégorie
  const stats = useMemo(() => {
    const totalProducts = products.length
    const averagePrice = products.length > 0 
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
      : 0
    const averageRating = products.length > 0 
      ? products.reduce((sum, p) => sum + p.rating, 0) / products.length 
      : 0
    const topBrands = products.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalProducts,
      averagePrice,
      averageRating,
      topBrands: Object.entries(topBrands)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    }
  }, [products])

  const handleFilterChange = (newFilters: Partial<typeof activeFilters>) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setActiveFilters({
      brands: [],
      priceRange: undefined,
      skinTypes: [],
      textures: [],
      ingredients: [],
      concerns: [],
      sortBy: 'popular',
      search: ''
    })
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== undefined && value !== '' && value !== 'popular'
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <SubcategoryBreadcrumb category={category} subcategory={subcategory} />

      {/* Hero Section */}
      <SubcategoryHero category={category} subcategory={subcategory} />

      {/* Statistiques */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <div className="text-sm text-muted-foreground">Produits</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Note moyenne</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{stats.averagePrice.toFixed(0)}€</div>
                <div className="text-sm text-muted-foreground">Prix moyen</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.topBrands.length}</div>
                <div className="text-sm text-muted-foreground">Marques</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar avec filtres */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filtres
                    </CardTitle>
                    {hasActiveFilters && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Effacer
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <SubcategoryFilters
                    filters={subcategory.filters || {}}
                    onFilterChange={handleFilterChange}
                    activeFilters={activeFilters}
                  />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className="flex-1">
            {/* Barre d'outils */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      Filtré
                    </Badge>
                  )}
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Toggle de vue */}
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
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
              </div>
            </div>

            {/* Grille de produits */}
            <SubcategoryGrid
              products={filteredProducts}
              loading={loading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Guides et conseils */}
            {guides.length > 0 && (
              <>
                <Separator className="my-12" />
                <SubcategoryGuides
                  guides={guides}
                  category={category.id}
                  subcategory={subcategory.id}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
