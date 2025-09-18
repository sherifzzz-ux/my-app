'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Shield, Heart } from 'lucide-react'
import Link from 'next/link'
import { soinVisageProducts, soinVisageSubcategories } from '@/lib/data/soin-visage'

export default function SoinDuVisagePage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? soinVisageProducts 
    : soinVisageProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Soin du visage' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Soin du Visage"
        description="Découvrez notre sélection de soins du visage pour tous types de peau. Des nettoyants doux aux sérums anti-âge, trouvez les produits parfaits pour votre routine beauté."
        image="/images/soin-visage-hero.jpg"
        badge="Nouveautés 2024"
        stats={{
          products: soinVisageProducts.length,
          brands: new Set(soinVisageProducts.map(p => p.brand)).size,
          rating: 4.5
        }}
        features={[
          'Produits testés dermatologiquement',
          'Formules adaptées à tous types de peau',
          'Marques reconnues et de qualité'
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
              <span className="text-2xl">🌟</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {soinVisageProducts.length}
              </Badge>
            </Button>
            
            {soinVisageSubcategories.map((subcategory) => (
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

        {/* Guide de soins */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide des Soins</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Routine Matin</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les étapes essentielles pour une routine matinale efficace.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/routine-matin">
                    Voir le guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Types de Peau</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Identifiez votre type de peau et trouvez les produits adaptés.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/types-peau">
                    Découvrir
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
                  Les conseils de nos dermatologues pour une peau en pleine santé.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/conseils-experts">
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
                : soinVisageSubcategories.find(s => s.id === selectedSubcategory)?.name
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
