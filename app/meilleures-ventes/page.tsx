'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Trophy, TrendingUp, Star, Users, Award, Crown } from 'lucide-react'
import Link from 'next/link'
import { meilleuresVentesProducts, meilleuresVentesCategories, topBrands, salesPeriods, popularTags } from '@/lib/data/meilleures-ventes'

export default function MeilleuresVentesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all')

  // Filtrer les produits selon la catégorie et la période sélectionnées
  const filteredProducts = meilleuresVentesProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPeriod = selectedPeriod === 'all' || 
                         (selectedPeriod === 'month' && product.salesCount > 1000) ||
                         (selectedPeriod === 'week' && product.salesCount > 500) ||
                         (selectedPeriod === 'day' && product.salesCount > 100)
    return matchesCategory && matchesPeriod
  })

  const breadcrumbItems = [
    { label: 'Meilleures Ventes' }
  ]

  const totalSales = meilleuresVentesProducts.reduce((sum, product) => sum + product.salesCount, 0)
  const averageRating = meilleuresVentesProducts.reduce((sum, product) => sum + product.rating, 0) / meilleuresVentesProducts.length
  const topProduct = meilleuresVentesProducts[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Meilleures Ventes"
        description="Découvrez nos produits les plus populaires et les plus appréciés par nos clients. Des bestsellers qui ont conquis des milliers de personnes."
        image="/images/meilleures-ventes-hero.jpg"
        badge="Produits plébiscités"
        stats={{
          products: meilleuresVentesProducts.length,
          brands: new Set(meilleuresVentesProducts.map(p => p.brand)).size,
          rating: Math.round(averageRating * 10) / 10
        }}
        features={[
          'Produits les plus vendus',
          'Avis clients excellents',
          'Qualité garantie'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques des meilleures ventes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Nos Meilleures Ventes en Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-1">{totalSales.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">Ventes totales</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Crown className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="text-2xl font-bold mb-1">#{topProduct?.rank}</h3>
                <p className="text-sm text-muted-foreground">Produit #1</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold mb-1">{Math.round(averageRating * 10) / 10}</h3>
                <p className="text-sm text-muted-foreground">Note moyenne</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="text-2xl font-bold mb-1">{meilleuresVentesProducts.reduce((sum, p) => sum + p.reviews, 0).toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">Avis clients</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top 3 des produits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Top 3 des Produits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {meilleuresVentesProducts.slice(0, 3).map((product, index) => (
              <Card key={product.id} className="relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className={`text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    'bg-orange-500'
                  }`}>
                    #{product.rank}
                  </Badge>
                </div>
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.brand}</CardDescription>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.salesCount.toLocaleString()} ventes
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price}€</span>
                    <Button size="sm" asChild>
                      <Link href={`/product/${product.id}`}>
                        Voir le produit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top marques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Top Marques</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topBrands.map((brand) => (
              <Card key={brand.id} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Award className={`h-6 w-6 ${
                      brand.rank === 1 ? 'text-yellow-500' : 
                      brand.rank === 2 ? 'text-gray-400' : 
                      brand.rank === 3 ? 'text-orange-500' : 
                      'text-gray-300'
                    }`} />
                  </div>
                  <h3 className="font-semibold mb-1">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {brand.salesCount.toLocaleString()} ventes
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {brand.products} produit{brand.products > 1 ? 's' : ''}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filtres par période */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Filtrer par Période</h2>
          <div className="flex flex-wrap gap-4">
            {salesPeriods.map((period) => (
              <Button
                key={period.id}
                variant={selectedPeriod === period.id ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period.id)}
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                {period.name}
                <Badge variant="secondary" className="ml-1">
                  {period.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {meilleuresVentesCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Tags populaires */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Tags Populaires</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag.name} ({tag.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Guide des meilleures ventes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Pourquoi Ces Produits ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Qualité Garantie</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Tous nos bestsellers sont testés et approuvés par des milliers de clients.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/qualite-garantie">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Avis Clients</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez pourquoi ces produits ont conquis nos clients.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/avis-clients">
                    Lire les avis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Tendances</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Les produits qui définissent les tendances beauté actuelles.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/tendances-bestsellers">
                    Voir les tendances
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Produits */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' 
                ? 'Toutes les meilleures ventes' 
                : meilleuresVentesCategories.find(c => c.id === selectedCategory)?.name
              }
            </h2>
            <Badge variant="secondary">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <ProductGrid
            products={filteredProducts}
            showFilters={true}
            showSort={true}
            showViewToggle={true}
          />
        </div>
      </div>
    </div>
  )
}
