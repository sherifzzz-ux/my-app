'use client'

import { useState } from 'react'
import { SubcategoryFilters as SubcategoryFiltersType, ActiveFilters } from '@/lib/data/subcategories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Search, Filter, X } from 'lucide-react'

interface SubcategoryFiltersProps {
  filters: SubcategoryFiltersType
  onFilterChange: (filters: Partial<ActiveFilters>) => void
  activeFilters: ActiveFilters
}

export function SubcategoryFilters({ filters, onFilterChange, activeFilters }: SubcategoryFiltersProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [skinTypesOpen, setSkinTypesOpen] = useState(false)
  const [texturesOpen, setTexturesOpen] = useState(false)
  const [ingredientsOpen, setIngredientsOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value })
  }

  const handleBrandToggle = (brand: string) => {
    const currentBrands = activeFilters.brands || []
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand]
    onFilterChange({ brands: newBrands })
  }

  const handlePriceRangeChange = (value: number[]) => {
    if (value.length === 2) {
      onFilterChange({ priceRange: { min: value[0], max: value[1] } })
    }
  }

  const handleSkinTypeToggle = (skinType: string) => {
    const currentSkinTypes = activeFilters.skinTypes || []
    const newSkinTypes = currentSkinTypes.includes(skinType)
      ? currentSkinTypes.filter(s => s !== skinType)
      : [...currentSkinTypes, skinType]
    onFilterChange({ skinTypes: newSkinTypes })
  }

  const handleTextureToggle = (texture: string) => {
    const currentTextures = activeFilters.textures || []
    const newTextures = currentTextures.includes(texture)
      ? currentTextures.filter(t => t !== texture)
      : [...currentTextures, texture]
    onFilterChange({ textures: newTextures })
  }

  const handleIngredientToggle = (ingredient: string) => {
    const currentIngredients = activeFilters.ingredients || []
    const newIngredients = currentIngredients.includes(ingredient)
      ? currentIngredients.filter(i => i !== ingredient)
      : [...currentIngredients, ingredient]
    onFilterChange({ ingredients: newIngredients })
  }

  const handleSortChange = (value: string) => {
    onFilterChange({ sortBy: value as 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest' })
  }

  const clearFilter = (filterType: keyof ActiveFilters) => {
    switch (filterType) {
      case 'brands':
        onFilterChange({ brands: [] })
        break
      case 'priceRange':
        onFilterChange({ priceRange: undefined })
        break
      case 'skinTypes':
        onFilterChange({ skinTypes: [] })
        break
      case 'textures':
        onFilterChange({ textures: [] })
        break
      case 'ingredients':
        onFilterChange({ ingredients: [] })
        break
      case 'search':
        onFilterChange({ search: '' })
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Recherche */}
      <Collapsible open={searchOpen} onOpenChange={setSearchOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Recherche</span>
              {activeFilters.search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearFilter('search')
                  }}
                  className="h-4 w-4 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${searchOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <Input
            placeholder="Rechercher un produit..."
            value={activeFilters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Tri */}
      <div className="space-y-2">
        <Label>Trier par</Label>
        <Select value={activeFilters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Populaire</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="rating">Mieux notés</SelectItem>
            <SelectItem value="newest">Plus récents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Marques */}
      {filters.brands && filters.brands.length > 0 && (
        <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Marques</span>
                {(activeFilters.brands?.length || 0) > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFilter('brands')
                    }}
                    className="h-4 w-4 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${brandsOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {filters.brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={activeFilters.brands?.includes(brand) || false}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Prix */}
      {filters.priceRanges && filters.priceRanges.length > 0 && (
        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <span>Prix</span>
                {activeFilters.priceRange !== undefined && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFilter('priceRange')
                    }}
                    className="h-4 w-4 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                {activeFilters.priceRange 
                  ? `${activeFilters.priceRange.min}€ - ${activeFilters.priceRange.max}€`
                  : 'Sélectionnez une fourchette'
                }
              </Label>
              <Slider
                value={activeFilters.priceRange ? [activeFilters.priceRange.min, activeFilters.priceRange.max] : [0, 100]}
                onValueChange={handlePriceRangeChange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filters.priceRanges.map((range) => (
                <Button
                  key={`${range.min}-${range.max}`}
                  variant={activeFilters.priceRange?.min === range.min && activeFilters.priceRange?.max === range.max ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFilterChange({ priceRange: { min: range.min, max: range.max } })}
                  className="text-xs"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Types de peau */}
      {filters.skinTypes && filters.skinTypes.length > 0 && (
        <Collapsible open={skinTypesOpen} onOpenChange={setSkinTypesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <span>Type de peau</span>
                {(activeFilters.skinTypes?.length || 0) > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFilter('skinTypes')
                    }}
                    className="h-4 w-4 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${skinTypesOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {filters.skinTypes.map((skinType) => (
              <div key={skinType} className="flex items-center space-x-2">
                <Checkbox
                  id={`skin-${skinType}`}
                  checked={activeFilters.skinTypes?.includes(skinType) || false}
                  onCheckedChange={() => handleSkinTypeToggle(skinType)}
                />
                <Label htmlFor={`skin-${skinType}`} className="text-sm">
                  {skinType}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Textures */}
      {filters.textures && filters.textures.length > 0 && (
        <Collapsible open={texturesOpen} onOpenChange={setTexturesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <span>Texture</span>
                {(activeFilters.textures?.length || 0) > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFilter('textures')
                    }}
                    className="h-4 w-4 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${texturesOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {filters.textures.map((texture) => (
              <div key={texture} className="flex items-center space-x-2">
                <Checkbox
                  id={`texture-${texture}`}
                  checked={activeFilters.textures?.includes(texture) || false}
                  onCheckedChange={() => handleTextureToggle(texture)}
                />
                <Label htmlFor={`texture-${texture}`} className="text-sm">
                  {texture}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Ingrédients */}
      {filters.ingredients && filters.ingredients.length > 0 && (
        <Collapsible open={ingredientsOpen} onOpenChange={setIngredientsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <span>Ingrédients</span>
                {(activeFilters.ingredients?.length || 0) > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFilter('ingredients')
                    }}
                    className="h-4 w-4 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${ingredientsOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {filters.ingredients.map((ingredient) => (
              <div key={ingredient} className="flex items-center space-x-2">
                <Checkbox
                  id={`ingredient-${ingredient}`}
                  checked={activeFilters.ingredients?.includes(ingredient) || false}
                  onCheckedChange={() => handleIngredientToggle(ingredient)}
                />
                <Label htmlFor={`ingredient-${ingredient}`} className="text-sm">
                  {ingredient}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}
