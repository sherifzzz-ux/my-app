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
import { parapharmacieProducts, parapharmacieSubcategories } from '@/lib/data/parapharmacie'

export default function ParapharmaciePage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? parapharmacieProducts 
    : parapharmacieProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Parapharmacie' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Parapharmacie"
        description="Découvrez notre sélection de produits de parapharmacie et compléments alimentaires. Des soins dermatologiques aux vitamines, prenez soin de votre santé au quotidien."
        image="/images/parapharmacie-hero.jpg"
        badge="Produits certifiés"
        stats={{
          products: parapharmacieProducts.length,
          brands: new Set(parapharmacieProducts.map(p => p.brand)).size,
          rating: 4.5
        }}
        features={[
          'Produits testés dermatologiquement',
          'Compléments alimentaires certifiés',
          'Conseils de professionnels de santé'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Sous-catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button
              variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setSelectedSubcategory('all')}
            >
              <span className="text-2xl">🌟</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {parapharmacieProducts.length}
              </Badge>
            </Button>
            
            {parapharmacieSubcategories.map((subcategory) => (
              <Button
                key={subcategory.id}
                variant={selectedSubcategory === subcategory.id ? 'default' : 'outline'}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedSubcategory(subcategory.id)}
                asChild
              >
                <Link href={`/parapharmacie/${subcategory.slug}`}>
                  <span className="text-2xl">{subcategory.icon}</span>
                  <span className="text-sm font-medium">{subcategory.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {subcategory.productCount}
                  </Badge>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Guide de santé */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide Santé & Bien-être</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Compléments Alimentaires</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les vitamines et compléments essentiels pour votre santé.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/complements-alimentaires">
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
                  <CardTitle className="text-lg">Soins Dermatologiques</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Soins recommandés par les dermatologues pour tous types de peau.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/soins-dermatologiques">
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
                  <CardTitle className="text-lg">Conseils Santé</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Les conseils de nos professionnels de santé pour votre bien-être.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/conseils-sante">
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
                : parapharmacieSubcategories.find(s => s.id === selectedSubcategory)?.name
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