'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Baby, Shield, Heart, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { bebeEnfantProducts, bebeEnfantSubcategories } from '@/lib/data/bebe-enfant'

export default function BebeEnfantPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? bebeEnfantProducts 
    : bebeEnfantProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Bébé & Enfant' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Bébé & Enfant"
        description="Des soins doux et sûrs pour la peau délicate de bébé et des enfants. Tous nos produits sont testés dermatologiquement et approuvés par les pédiatres."
        image="/images/bebe-enfant-hero.jpg"
        badge="Sécurité garantie"
        stats={{
          products: bebeEnfantProducts.length,
          brands: new Set(bebeEnfantProducts.map(p => p.brand)).size,
          rating: 4.7
        }}
        features={[
          'Produits hypoallergéniques',
          'Testés dermatologiquement',
          'Approuvés par les pédiatres'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Garanties de sécurité */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Nos Garanties de Sécurité</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold mb-1">Hypoallergénique</h3>
                <p className="text-sm text-muted-foreground">Testé pour minimiser les réactions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold mb-1">Testé Dermatologiquement</h3>
                <p className="text-sm text-muted-foreground">Sous contrôle dermatologique</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                <h3 className="font-semibold mb-1">Approuvé Pédiatre</h3>
                <p className="text-sm text-muted-foreground">Recommandé par les professionnels</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="font-semibold mb-1">Bio & Naturel</h3>
                <p className="text-sm text-muted-foreground">Ingrédients naturels certifiés</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sous-catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button
              variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setSelectedSubcategory('all')}
            >
              <span className="text-2xl">👶</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {bebeEnfantProducts.length}
              </Badge>
            </Button>
            
            {bebeEnfantSubcategories.map((subcategory) => (
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

        {/* Guide des soins bébé */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide Soins Bébé & Enfant</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Baby className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Routine Bébé</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez la routine de soins adaptée à l&apos;âge de votre enfant.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/routine-bebe">
                    Voir la routine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Protection Solaire</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Apprenez à protéger la peau sensible de votre enfant du soleil.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/protection-solaire-enfant">
                    Protéger du soleil
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <CardTitle className="text-lg">Peau Sensible</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Conseils pour prendre soin d&apos;une peau sensible et réactive.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/peau-sensible-enfant">
                    Soigner la peau sensible
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
                : bebeEnfantSubcategories.find(s => s.id === selectedSubcategory)?.name
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
