'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Flower, Sparkles, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { parfumerieProducts, parfumerieSubcategories } from '@/lib/data/parfumerie'

export default function ParfumeriePage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? parfumerieProducts 
    : parfumerieProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Parfumerie' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Parfumerie"
        description="Découvrez notre collection de parfums et eaux de toilette de marques prestigieuses. Des fragrances iconiques aux créations exclusives, trouvez votre signature olfactive."
        image="/images/parfumerie-hero.jpg"
        badge="Marques de luxe"
        stats={{
          products: parfumerieProducts.length,
          brands: new Set(parfumerieProducts.map(p => p.brand)).size,
          rating: 4.7
        }}
        features={[
          'Marques de luxe et exclusives',
          'Fragrances pour tous les goûts',
          'Conseils personnalisés par nos experts'
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
              <span className="text-2xl">🌸</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {parfumerieProducts.length}
              </Badge>
            </Button>
            
            {parfumerieSubcategories.map((subcategory) => (
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

        {/* Guide des parfums */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide Parfumerie</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flower className="h-5 w-5 text-pink-500" />
                  <CardTitle className="text-lg">Familles Olfactives</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les différentes familles olfactives et trouvez votre style.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/familles-olfactives">
                    Découvrir les familles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Conseils d&apos;Application</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Apprenez à bien appliquer votre parfum pour une tenue optimale.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/application-parfum">
                    Voir les conseils
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-lg">Signature Olfactive</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Trouvez votre parfum signature avec notre guide personnalisé.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/signature-olfactive">
                    Créer ma signature
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
                ? 'Tous les parfums' 
                : parfumerieSubcategories.find(s => s.id === selectedSubcategory)?.name
              }
            </h2>
            <Badge variant="secondary">
              {filteredProducts.length} parfum{filteredProducts.length > 1 ? 's' : ''}
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
