'use client'

import { useState } from 'react'
import { BrandCard } from './BrandCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Grid3X3, List, Filter, X } from 'lucide-react'
import { Brand, brandCategories, countries, specialties } from '@/lib/data/real-brands'

interface BrandGridProps {
  brands: Brand[]
  showFilters?: boolean
  showSearch?: boolean
  showSort?: boolean
  showViewToggle?: boolean
}

export function BrandGrid({ 
  brands, 
  showFilters = true, 
  showSearch = true, 
  showSort = true, 
  showViewToggle = true 
}: BrandGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)

  // Filtrer les marques
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'luxe' && brand.isPremium) ||
                           (selectedCategory === 'francaises' && brand.country === 'France') ||
                           (selectedCategory === 'bio' && brand.tags.includes('bio')) ||
                           (selectedCategory === 'dermatologiques' && brand.tags.includes('dermatologique')) ||
                           (selectedCategory === 'bebe' && brand.category.includes('bebe-enfant'))
    
    const matchesCountry = selectedCountry === 'all' || 
                          brand.country.toLowerCase() === selectedCountry
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            brand.specialties.some(specialty => 
                              specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
                            )
    
    return matchesSearch && matchesCategory && matchesCountry && matchesSpecialty
  })

  // Trier les marques
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      case 'products':
        return b.productCount - a.productCount
      case 'founded':
        return b.founded - a.founded
      default:
        return 0
    }
  })

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedCountry !== 'all',
    selectedSpecialty !== 'all'
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      {(showSearch || showFilters || showSort || showViewToggle) && (
        <div className="space-y-4">
          {/* Recherche */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une marque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Barre d'outils */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Bouton filtres */}
              {showFilters && (
                <Button
                  variant="outline"
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              )}

              {/* Tri */}
              {showSort && (
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nom (A-Z)</SelectItem>
                    <SelectItem value="rating">Note</SelectItem>
                    <SelectItem value="products">Nombre de produits</SelectItem>
                    <SelectItem value="founded">Année de création</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Toggle vue */}
            {showViewToggle && (
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Panel de filtres */}
          {showFilters && showFiltersPanel && (
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filtres</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFiltersPanel(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Catégorie */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Catégorie</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brandCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pays */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Pays</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les pays</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country.name} value={country.name}>
                          {country.flag} {country.name} ({country.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Spécialité */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Spécialité</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les spécialités</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Résultats */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {sortedBrands.length} marque{sortedBrands.length > 1 ? 's' : ''} trouvée{sortedBrands.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille de marques */}
      {sortedBrands.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune marque trouvée avec ces critères.</p>
        </div>
      )}
    </div>
  )
}
