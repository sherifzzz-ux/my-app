'use client'

import { useState, useMemo } from 'react'
import { GiftIdeaCard } from './GiftIdeaCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid, List, Filter, Search, X, Gift, Package, MessageSquare } from 'lucide-react'
import { GiftIdea, giftOccasions, giftCategories, giftRecipients } from '@/lib/data/idees-cadeaux'

interface GiftIdeasGridProps {
  gifts: GiftIdea[]
  title?: string
  showFilters?: boolean
}

export function GiftIdeasGrid({ gifts, title, showFilters = true }: GiftIdeasGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all')
  const [selectedRecipient, setSelectedRecipient] = useState<string>('all')
  const [selectedBudget, setSelectedBudget] = useState<string>('all')
  const [selectedGiftType, setSelectedGiftType] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Get unique subcategories for selected category
  const subcategories = useMemo(() => {
    if (selectedCategory === 'all') {
      const allSubcategories = [...new Set(gifts.map(g => g.category))]
      return allSubcategories.sort()
    }
    const categoryData = giftCategories.find(c => c.id === selectedCategory)
    return categoryData ? categoryData.subcategories : []
  }, [selectedCategory, gifts])

  // Get unique gift types
  const giftTypes = useMemo(() => {
    const allGiftTypes = [...new Set(gifts.map(g => g.giftType))]
    return allGiftTypes.sort()
  }, [gifts])

  // Get unique budgets
  const budgets = useMemo(() => {
    const allBudgets = [...new Set(gifts.map(g => g.budget))]
    return allBudgets.sort()
  }, [gifts])

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(gifts.map(g => g.brand).filter(Boolean))]
    return uniqueBrands.sort()
  }, [gifts])

  // Filter and sort gifts
  const filteredGifts = useMemo(() => {
    let filtered = gifts.filter(gift => {
      const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gift.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gift.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (gift.brand && gift.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || gift.category === selectedCategory
      const matchesOccasion = selectedOccasion === 'all' || gift.occasion.includes(selectedOccasion)
      const matchesRecipient = selectedRecipient === 'all' || gift.recipient.includes(selectedRecipient)
      const matchesBudget = selectedBudget === 'all' || gift.budget === selectedBudget
      const matchesGiftType = selectedGiftType === 'all' || gift.giftType === selectedGiftType
      
      let matchesPrice = true
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number)
        if (max) {
          matchesPrice = gift.price >= min && gift.price <= max
        } else {
          matchesPrice = gift.price >= min
        }
      }
      
      return matchesSearch && matchesCategory && matchesOccasion && 
             matchesRecipient && matchesBudget && matchesGiftType && matchesPrice
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
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [gifts, searchTerm, selectedCategory, selectedOccasion, selectedRecipient, selectedBudget, selectedGiftType, priceRange, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedOccasion('all')
    setSelectedRecipient('all')
    setSelectedBudget('all')
    setSelectedGiftType('all')
    setPriceRange('all')
  }

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedOccasion !== 'all',
    selectedRecipient !== 'all',
    selectedBudget !== 'all',
    selectedGiftType !== 'all',
    priceRange !== 'all'
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Header */}
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">
            {filteredGifts.length} idée{filteredGifts.length > 1 ? 's' : ''} de cadeau{filteredGifts.length > 1 ? 'x' : ''} trouvée{filteredGifts.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une idée de cadeau..."
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
              <SelectItem value="popular">Plus populaires</SelectItem>
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
                <CardTitle className="text-lg">Filtres Cadeaux</CardTitle>
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
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {giftCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Occasion</label>
                  <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les occasions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les occasions</SelectItem>
                      {giftOccasions.map((occasion) => (
                        <SelectItem key={occasion.id} value={occasion.name}>
                          {occasion.icon} {occasion.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Recipient */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Destinataire</label>
                  <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les destinataires" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les destinataires</SelectItem>
                      {giftRecipients.map((recipient) => (
                        <SelectItem key={recipient.id} value={recipient.name}>
                          {recipient.icon} {recipient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Budget</label>
                  <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les budgets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les budgets</SelectItem>
                      {budgets.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gift Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Type de Cadeau</label>
                  <Select value={selectedGiftType} onValueChange={setSelectedGiftType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {giftTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
                    <SelectItem value="0-30">Moins de 30€</SelectItem>
                    <SelectItem value="30-60">30€ - 60€</SelectItem>
                    <SelectItem value="60-100">60€ - 100€</SelectItem>
                    <SelectItem value="100">Plus de 100€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Results */}
      {filteredGifts.length === 0 ? (
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Aucune idée de cadeau ne correspond à vos critères de recherche.
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
          {filteredGifts.map((gift) => (
            <GiftIdeaCard key={gift.id} gift={gift} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
