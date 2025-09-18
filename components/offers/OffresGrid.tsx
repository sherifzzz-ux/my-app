'use client'

import { useState } from 'react'
import { OffreCard } from './OffreCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Grid3X3, List, Filter, X, Clock, Tag } from 'lucide-react'
import { OffreSpeciale, offresSpecialesCategories, discountRanges, offerTypes } from '@/lib/data/offres-speciales'

interface OffresGridProps {
  offres: OffreSpeciale[]
  showFilters?: boolean
  showSearch?: boolean
  showSort?: boolean
  showViewToggle?: boolean
}

export function OffresGrid({ 
  offres, 
  showFilters = true, 
  showSearch = true, 
  showSort = true, 
  showViewToggle = true 
}: OffresGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDiscount, setSelectedDiscount] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('discount')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)

  // Filtrer les offres
  const filteredOffres = offres.filter(offre => {
    const matchesSearch = offre.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.brand.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'packs' && offre.subcategory === 'packs') ||
                           (selectedCategory === 'collections' && offre.subcategory === 'collections') ||
                           (selectedCategory === 'promotions' && offre.subcategory === 'promotions') ||
                           offre.category === selectedCategory
    
    const matchesDiscount = selectedDiscount === 'all' || 
                           (selectedDiscount === '50-plus' && offre.discountPercentage >= 50) ||
                           (selectedDiscount === '30-49' && offre.discountPercentage >= 30 && offre.discountPercentage < 50) ||
                           (selectedDiscount === '20-29' && offre.discountPercentage >= 20 && offre.discountPercentage < 30) ||
                           (selectedDiscount === '10-19' && offre.discountPercentage >= 10 && offre.discountPercentage < 20)
    
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'limited' && offre.isLimited) ||
                       (selectedType === 'active' && offre.isActive) ||
                       (selectedType === 'ending-soon' && (() => {
                         const endDate = new Date(offre.endDate)
                         const today = new Date()
                         const diffTime = endDate.getTime() - today.getTime()
                         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                         return diffDays <= 7 && diffDays > 0
                       })())
    
    return matchesSearch && matchesCategory && matchesDiscount && matchesType
  })

  // Trier les offres
  const sortedOffres = [...filteredOffres].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discountPercentage - a.discountPercentage
      case 'price':
        return a.salePrice - b.salePrice
      case 'endDate':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedDiscount !== 'all',
    selectedType !== 'all'
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
                placeholder="Rechercher une offre..."
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
                    <SelectItem value="discount">Réduction (plus élevée)</SelectItem>
                    <SelectItem value="price">Prix (plus bas)</SelectItem>
                    <SelectItem value="endDate">Fin d&apos;offre</SelectItem>
                    <SelectItem value="title">Nom (A-Z)</SelectItem>
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
                      {offresSpecialesCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Réduction */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Réduction</label>
                  <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {discountRanges.map((range) => (
                        <SelectItem key={range.id} value={range.id}>
                          {range.name} ({range.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type d'offre */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Type d&apos;offre</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {offerTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.count})
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
          {sortedOffres.length} offre{sortedOffres.length > 1 ? 's' : ''} trouvée{sortedOffres.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille d'offres */}
      {sortedOffres.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedOffres.map((offre) => (
            <OffreCard key={offre.id} offre={offre} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune offre trouvée avec ces critères.</p>
        </div>
      )}
    </div>
  )
}
