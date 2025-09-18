'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { BrandGrid } from '@/components/brands/BrandGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Globe, Award, Users } from 'lucide-react'
import Link from 'next/link'
import { brands, brandCategories, countries } from '@/lib/data/marques'

export default function MarquesPage() {
  const breadcrumbItems = [
    { label: 'Marques' }
  ]

  const totalProducts = brands.reduce((sum, brand) => sum + brand.productCount, 0)
  const averageRating = brands.reduce((sum, brand) => sum + brand.rating, 0) / brands.length
  const premiumBrands = brands.filter(brand => brand.isPremium).length

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Marques"
        description="Découvrez notre sélection de marques de beauté et cosmétiques, des maisons de luxe aux marques dermatologiques, toutes soigneusement choisies pour leur qualité et leur innovation."
        image="/images/marques-hero.jpg"
        badge="Marques sélectionnées"
        stats={{
          products: totalProducts,
          brands: brands.length,
          rating: Math.round(averageRating * 10) / 10
        }}
        features={[
          'Marques de luxe et premium',
          'Marques dermatologiques certifiées',
          'Marques bio et naturelles'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques des marques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Nos Marques en Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-1">{brands.length}</h3>
                <p className="text-sm text-muted-foreground">Marques</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold mb-1">{premiumBrands}</h3>
                <p className="text-sm text-muted-foreground">Marques Premium</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="text-2xl font-bold mb-1">{countries.length}</h3>
                <p className="text-sm text-muted-foreground">Pays</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="text-2xl font-bold mb-1">{totalProducts}</h3>
                <p className="text-sm text-muted-foreground">Produits</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Catégories de marques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories de Marques</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandCategories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                asChild
              >
                <Link href={`/marques?category=${category.id}`}>
                  <span className="text-2xl">
                    {category.id === 'luxe' && '👑'}
                    {category.id === 'francaises' && '🇫🇷'}
                    {category.id === 'bio' && '🌱'}
                    {category.id === 'dermatologiques' && '🔬'}
                    {category.id === 'bebe' && '👶'}
                    {category.id === 'all' && '🏷️'}
                  </span>
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Guide des marques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide des Marques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Marques de Luxe</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les maisons de luxe françaises et internationales qui définissent les tendances.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/marques?category=luxe">
                    Voir les marques de luxe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Marques Dermatologiques</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des marques recommandées par les dermatologues pour des soins sûrs et efficaces.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/marques?category=dermatologiques">
                    Voir les marques dermatologiques
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Marques Bio</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des marques engagées pour une beauté respectueuse de l&apos;environnement.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/marques?category=bio">
                    Voir les marques bio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Grille de marques */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Toutes les Marques</h2>
            <Badge variant="secondary">
              {brands.length} marque{brands.length > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <BrandGrid
            brands={brands}
            showFilters={true}
            showSearch={true}
            showSort={true}
            showViewToggle={true}
          />
        </div>
      </div>
    </div>
  )
}
