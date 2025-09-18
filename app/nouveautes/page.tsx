'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Calendar, TrendingUp, Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { nouveautesProducts, nouveautesCategories, nouveautesByMonth, trendingTags } from '@/lib/data/nouveautes'

export default function NouveautesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')

  // Filtrer les produits selon la catégorie et le mois sélectionnés
  const filteredProducts = nouveautesProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesMonth = selectedMonth === 'all' || product.releaseDate.startsWith(selectedMonth)
    return matchesCategory && matchesMonth
  })

  const breadcrumbItems = [
    { label: 'Nouveautés' }
  ]

  const totalProducts = nouveautesProducts.length
  const thisMonthProducts = nouveautesProducts.filter(p => p.releaseDate.startsWith('2024-02')).length
  const averageRating = nouveautesProducts.reduce((sum, product) => sum + product.rating, 0) / nouveautesProducts.length

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Nouveautés"
        description="Découvrez les dernières innovations en beauté et cosmétiques. Des produits révolutionnaires aux tendances de la saison, restez à la pointe de la beauté."
        image="/images/nouveautes-hero.jpg"
        badge="Dernières innovations"
        stats={{
          products: totalProducts,
          brands: new Set(nouveautesProducts.map(p => p.brand)).size,
          rating: Math.round(averageRating * 10) / 10
        }}
        features={[
          'Produits révolutionnaires',
          'Tendances de la saison',
          'Innovations technologiques'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques des nouveautés */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Nos Nouveautés en Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="text-2xl font-bold mb-1">{totalProducts}</h3>
                <p className="text-sm text-muted-foreground">Nouveautés</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold mb-1">{thisMonthProducts}</h3>
                <p className="text-sm text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-1">{Math.round(averageRating * 10) / 10}</h3>
                <p className="text-sm text-muted-foreground">Note moyenne</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="text-2xl font-bold mb-1">{nouveautesByMonth.length}</h3>
                <p className="text-sm text-muted-foreground">Mois actifs</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filtres par mois */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Nouveautés par Mois</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant={selectedMonth === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedMonth('all')}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Tous les mois
              <Badge variant="secondary" className="ml-1">
                {totalProducts}
              </Badge>
            </Button>
            
            {nouveautesByMonth.map((month) => (
              <Button
                key={month.month}
                variant={selectedMonth === month.month.split(' ')[0].toLowerCase() + '-2024' ? 'default' : 'outline'}
                onClick={() => setSelectedMonth(month.month.split(' ')[0].toLowerCase() + '-2024')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                {month.month}
                <Badge variant="secondary" className="ml-1">
                  {month.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {nouveautesCategories.map((category) => (
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

        {/* Tags tendance */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Tendances du Moment</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
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

        {/* Guide des nouveautés */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide des Nouveautés</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Innovations Technologiques</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les dernières avancées technologiques en cosmétique.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/innovations-technologiques">
                    Voir les innovations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Tendances 2024</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Les tendances beauté qui marqueront l&apos;année 2024.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/tendances-2024">
                    Voir les tendances
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Produits Révolutionnaires</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Les produits qui changent les règles du jeu en beauté.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/produits-revolutionnaires">
                    Voir les produits
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
                ? 'Toutes les nouveautés' 
                : nouveautesCategories.find(c => c.id === selectedCategory)?.name
              }
            </h2>
            <Badge variant="secondary">
              {filteredProducts.length} nouveauté{filteredProducts.length > 1 ? 's' : ''}
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
