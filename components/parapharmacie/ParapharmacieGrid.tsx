'use client'

import { useState, useMemo } from 'react'
import { ParapharmacieCard } from './ParapharmacieCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid, List, Filter, Search, X, Shield, Pill } from 'lucide-react'
import { ParapharmacieProduct, healthCategories } from '@/lib/data/parapharmacie'

interface ParapharmacieGridProps {
  products: ParapharmacieProduct[]
  title?: string
  showFilters?: boolean
}

export function ParapharmacieGrid({ products, title, showFilters = true }: ParapharmacieGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all')
  const [selectedPrescription, setSelectedPrescription] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Get unique subcategories for selected category
  const subcategories = useMemo(() => {
    if (selectedCategory === 'all') {
      const allSubcategories = [...new Set(products.map(p => p.subcategory))]
      return allSubcategories.sort()
    }
    const categoryData = healthCategories.find(c => c.id === selectedCategory)
    return categoryData ? categoryData.subcategories : []
  }, [selectedCategory, products])

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => p.brand))]
    return uniqueBrands.sort()
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory
      const matchesAgeGroup = selectedAgeGroup === 'all' || product.ageGroup === selectedAgeGroup
      const matchesPrescription = selectedPrescription === 'all' || 
        (selectedPrescription === 'yes' && product.prescription) ||
        (selectedPrescription === 'no' && !product.prescription)
      
      let matchesPrice = true
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number)
        if (max) {
          matchesPrice = product.price >= min && product.price <= max
        } else {
          matchesPrice = product.price >= min
        }
      }
      
      return matchesSearch && matchesCategory && matchesSubcategory && 
             matchesAgeGroup && matchesPrescription && matchesPrice
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, selectedSubcategory, selectedAgeGroup, selectedPrescription, priceRange, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedSubcategory('all')
    setSelectedAgeGroup('all')
    setSelectedPrescription('all')
    setPriceRange('all')
  }

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedSubcategory !== 'all',
    selectedAgeGroup !== 'all',
    selectedPrescription !== 'all',
    priceRange !== 'all'
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Header */}
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* View Mode and Sort */}
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
              <SelectItem value="newest">Plus récents</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle className="text-lg">Filtres</CardTitle>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Effacer
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  {showAdvancedFilters ? 'Masquer' : 'Afficher'} les filtres
                </Button>
              </div>
            </div>
          </CardHeader>

          {showAdvancedFilters && (
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Catégorie</label>
                  <Select value={selectedCategory} onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSelectedSubcategory('all') // Reset subcategory when category changes
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {healthCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sous-catégorie</label>
                  <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les sous-catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les sous-catégories</SelectItem>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Group */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Âge</label>
                  <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les âges" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les âges</SelectItem>
                      <SelectItem value="Adulte">Adulte</SelectItem>
                      <SelectItem value="Enfant">Enfant</SelectItem>
                      <SelectItem value="Bébé">Bébé</SelectItem>
                      <SelectItem value="Tous âges">Tous âges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prescription */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select value={selectedPrescription} onValueChange={setSelectedPrescription}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="no">
                        <Shield className="h-4 w-4 mr-2 inline" />
                        Libre
                      </SelectItem>
                      <SelectItem value="yes">
                        <Pill className="h-4 w-4 mr-2 inline" />
                        Sur ordonnance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range */}
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Prix</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Tous les prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="0-10">Moins de 10€</SelectItem>
                    <SelectItem value="10-20">10€ - 20€</SelectItem>
                    <SelectItem value="20-30">20€ - 30€</SelectItem>
                    <SelectItem value="30">Plus de 30€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Aucun produit ne correspond à vos critères de recherche.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <ParapharmacieCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
