'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Scissors, Sparkles, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { cheveuxProducts, cheveuxSubcategories } from '@/lib/data/cheveux'

export default function CheveuxPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? cheveuxProducts 
    : cheveuxProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Cheveux' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Cheveux"
        description="Prenez soin de vos cheveux avec notre sélection de produits capillaires de qualité. Des shampoings aux soins, trouvez les produits adaptés à votre type de cheveux et à vos besoins."
        image="/images/cheveux-hero.jpg"
        badge="Soins professionnels"
        stats={{
          products: cheveuxProducts.length,
          brands: new Set(cheveuxProducts.map(p => p.brand)).size,
          rating: 4.6
        }}
        features={[
          'Produits adaptés à tous types de cheveux',
          'Marques professionnelles reconnues',
          'Formules sans sulfates et parabens'
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
              <span className="text-2xl">💇‍♀️</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {cheveuxProducts.length}
              </Badge>
            </Button>
            
            {cheveuxSubcategories.map((subcategory) => (
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

        {/* Guide des cheveux */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide Capillaire</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Diagnostic Capillaire</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Identifiez votre type de cheveux et trouvez les produits adaptés.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/diagnostic-capillaire">
                    Faire le diagnostic
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Routine Capillaire</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les étapes essentielles pour une routine capillaire efficace.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/routine-capillaire">
                    Voir la routine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <CardTitle className="text-lg">Conseils Experts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Les conseils de nos coiffeurs professionnels pour des cheveux sublimes.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/conseils-coiffeurs">
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
                : cheveuxSubcategories.find(s => s.id === selectedSubcategory)?.name
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
