'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, Grid, List, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { useCart } from '@/contexts/cart-context'
import type { Product } from '@/types/product'

interface CategoryPageProps {
  categorySlug: string
  categoryName: string
  products: Product[]
  searchParams: {
    sort?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    page?: string
  }
}

const ITEMS_PER_PAGE = 12

export default function CategoryPage({
  categorySlug,
  categoryName,
  products,
  searchParams,
}: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState(searchParams.sort || 'name')
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.brand ? searchParams.brand.split(',') : [],
  )
  const [priceRange, setPriceRange] = useState([
    Number.parseInt(searchParams.minPrice || '0'),
    Number.parseInt(searchParams.maxPrice || '50000'),
  ])
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.page || '1'))

  const { addToCart } = useCart()

  // Get unique brands from products
  const availableBrands = useMemo(() => {
    const brands = [...new Set(products.map((p) => p.brand))].sort()
    return brands
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }

      // Price filter
      const price = Number.parseInt(product.price.replace(/[^\d]/g, ''))
      if (price < priceRange[0] || price > priceRange[1]) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (
            Number.parseInt(a.price.replace(/[^\d]/g, '')) -
            Number.parseInt(b.price.replace(/[^\d]/g, ''))
          )
        case 'price-desc':
          return (
            Number.parseInt(b.price.replace(/[^\d]/g, '')) -
            Number.parseInt(a.price.replace(/[^\d]/g, ''))
          )
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          return a.isNew ? -1 : b.isNew ? 1 : 0
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, selectedBrands, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
    setCurrentPage(1)
  }

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 })
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setPriceRange([0, 50000])
    setSortBy('name')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <nav className="flex items-center space-x-2 text-sm text-pink-100 mb-4">
            <Link href="/" className="hover:text-white">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white">{categoryName}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-pink-100">
            Découvrez notre sélection de produits {categoryName.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtres</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Effacer
                </Button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Marques</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableBrands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Prix</h4>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()} CFA</span>
                    <span>{priceRange[1].toLocaleString()} CFA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
                  </span>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtres
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filtres</SheetTitle>
                        <SheetDescription>Affinez votre recherche</SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-6">
                        {/* Mobile filters content - same as desktop */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Marques</h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {availableBrands.map((brand) => (
                              <div key={brand} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-${brand}`}
                                  checked={selectedBrands.includes(brand)}
                                  onCheckedChange={(checked) =>
                                    handleBrandChange(brand, checked as boolean)
                                  }
                                />
                                <label
                                  htmlFor={`mobile-${brand}`}
                                  className="text-sm text-gray-700 cursor-pointer"
                                >
                                  {brand}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Prix</h4>
                          <div className="space-y-4">
                            <Slider
                              value={priceRange}
                              onValueChange={setPriceRange}
                              max={50000}
                              step={500}
                              className="w-full"
                            />
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>{priceRange[0].toLocaleString()} CFA</span>
                              <span>{priceRange[1].toLocaleString()} CFA</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={clearFilters}
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          Effacer les filtres
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Trier par <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortBy('name')}>Nom A-Z</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('price-asc')}>
                        Prix croissant
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('price-desc')}>
                        Prix décroissant
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('rating')}>
                        Mieux notés
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('newest')}>
                        Nouveautés
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 50000) && (
                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Filtres actifs:</span>
                  {selectedBrands.map((brand) => (
                    <Badge
                      key={brand}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleBrandChange(brand, false)}
                    >
                      {brand} ×
                    </Badge>
                  ))}
                  {(priceRange[0] > 0 || priceRange[1] < 50000) && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => setPriceRange([0, 50000])}
                    >
                      {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} CFA ×
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">Aucun produit trouvé avec ces filtres.</p>
                <Button onClick={clearFilters} variant="outline">
                  Effacer les filtres
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div
                      className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}
                    >
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className="object-contain p-4 hover:scale-105 transition-transform"
                        />
                      </Link>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-[#FFDAFC] text-[#F792CC]">
                          Nouveau
                        </Badge>
                      )}
                      {product.isOnSale && (
                        <Badge className="absolute top-2 right-2" variant="destructive">
                          Promo
                        </Badge>
                      )}
                    </div>

                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <p className="text-sm text-pink-600 font-medium mb-1">{product.brand}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-medium text-gray-900 mb-2 hover:text-pink-600 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      {product.rating && (
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(product.rating!)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.reviewCount})</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-pink-600">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                        size="sm"
                      >
                        {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Précédent
                </Button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        size="sm"
                      >
                        {page}
                      </Button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page}>...</span>
                  }
                  return null
                })}

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
