'use client'

import { useState, useMemo } from 'react'
import { ParfumCard } from './ParfumCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid, List, Filter, Search, X } from 'lucide-react'
import { Parfum, olfactiveFamilies } from '@/lib/data/parfums'

interface ParfumGridProps {
  parfums: Parfum[]
  title?: string
  showFilters?: boolean
}

export function ParfumGrid({ parfums, title, showFilters = true }: ParfumGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFamily, setSelectedFamily] = useState<string>('all')
  const [selectedGender, setSelectedGender] = useState<string>('all')
  const [selectedConcentration, setSelectedConcentration] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(parfums.map(p => p.brand))]
    return uniqueBrands.sort()
  }, [parfums])

  // Filter and sort parfums
  const filteredParfums = useMemo(() => {
    let filtered = parfums.filter(parfum => {
      const matchesSearch = parfum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           parfum.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           parfum.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFamily = selectedFamily === 'all' || parfum.family === selectedFamily
      const matchesGender = selectedGender === 'all' || parfum.gender === selectedGender
      const matchesConcentration = selectedConcentration === 'all' || parfum.concentration === selectedConcentration
      const matchesBrand = selectedBrand === 'all' || parfum.brand === selectedBrand
      
      let matchesPrice = true
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number)
        if (max) {
          matchesPrice = parfum.price >= min && parfum.price <= max
        } else {
          matchesPrice = parfum.price >= min
        }
      }
      
      return matchesSearch && matchesFamily && matchesGender && 
             matchesConcentration && matchesBrand && matchesPrice
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
          return b.year - a.year
        default:
          return 0
      }
    })

    return filtered
  }, [parfums, searchTerm, selectedFamily, selectedGender, selectedConcentration, selectedBrand, priceRange, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedFamily('all')
    setSelectedGender('all')
    setSelectedConcentration('all')
    setSelectedBrand('all')
    setPriceRange('all')
  }

  const activeFiltersCount = [
    selectedFamily !== 'all',
    selectedGender !== 'all',
    selectedConcentration !== 'all',
    selectedBrand !== 'all',
    priceRange !== 'all'
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Header */}
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">
            {filteredParfums.length} parfum{filteredParfums.length > 1 ? 's' : ''} trouvé{filteredParfums.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un parfum..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Family */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Famille olfactive</label>
                  <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les familles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les familles</SelectItem>
                      {olfactiveFamilies.map((family) => (
                        <SelectItem key={family.id} value={family.name}>
                          {family.icon} {family.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Genre</label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les genres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les genres</SelectItem>
                      <SelectItem value="Femme">Femme</SelectItem>
                      <SelectItem value="Homme">Homme</SelectItem>
                      <SelectItem value="Unisexe">Unisexe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Concentration */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Concentration</label>
                  <Select value={selectedConcentration} onValueChange={setSelectedConcentration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les concentrations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les concentrations</SelectItem>
                      <SelectItem value="Eau de Cologne">Eau de Cologne</SelectItem>
                      <SelectItem value="Eau de Toilette">Eau de Toilette</SelectItem>
                      <SelectItem value="Eau de Parfum">Eau de Parfum</SelectItem>
                      <SelectItem value="Parfum">Parfum</SelectItem>
                      <SelectItem value="Extrait">Extrait</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Marque</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les marques" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les marques</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
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
                    <SelectItem value="0-50">Moins de 50€</SelectItem>
                    <SelectItem value="50-100">50€ - 100€</SelectItem>
                    <SelectItem value="100-200">100€ - 200€</SelectItem>
                    <SelectItem value="200-300">200€ - 300€</SelectItem>
                    <SelectItem value="300">Plus de 300€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Results */}
      {filteredParfums.length === 0 ? (
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Aucun parfum ne correspond à vos critères de recherche.
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
          {filteredParfums.map((parfum) => (
            <ParfumCard key={parfum.id} parfum={parfum} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
