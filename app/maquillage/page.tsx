'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Palette, Sparkles, Camera, Star } from 'lucide-react'
import Link from 'next/link'
import { maquillageProducts, maquillageSubcategories } from '@/lib/data/maquillage'

export default function MaquillagePage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? maquillageProducts 
    : maquillageProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Maquillage' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Maquillage"
        description="Découvrez notre collection de maquillage pour révéler votre beauté. Des fonds de teint aux rouges à lèvres, trouvez les produits parfaits pour créer le look de vos rêves."
        image="/images/maquillage-hero.jpg"
        badge="Nouveautés 2024"
        stats={{
          products: maquillageProducts.length,
          brands: new Set(maquillageProducts.map(p => p.brand)).size,
          rating: 4.6
        }}
        features={[
          'Marques de luxe et accessibles',
          'Couleurs tendance et intemporelles',
          'Formules longue tenue'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Sous-catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button
              variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setSelectedSubcategory('all')}
            >
              <span className="text-2xl">💄</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {maquillageProducts.length}
              </Badge>
            </Button>
            
            {maquillageSubcategories.map((subcategory) => (
              <Button
                key={subcategory.id}
                variant={selectedSubcategory === subcategory.id ? 'default' : 'outline'}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedSubcategory(subcategory.id)}
              >
                <span className="text-2xl">{subcategory.icon}</span>
                <span className="text-sm font-medium">{subcategory.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {subcategory.productCount}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Guide de maquillage */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide Maquillage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" />
                  <CardTitle className="text-lg">Tendances 2024</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les dernières tendances maquillage de cette année.
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
                  <Camera className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Tutoriels</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Apprenez les techniques de maquillage avec nos tutoriels vidéo.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/tutoriels">
                    Voir les tutoriels
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Conseils Pro</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Les conseils de nos maquilleurs professionnels.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/conseils-pro">
                    Lire les conseils
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
              {selectedSubcategory === 'all' 
                ? 'Tous les produits' 
                : maquillageSubcategories.find(s => s.id === selectedSubcategory)?.name
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
