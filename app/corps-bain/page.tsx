'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Droplets, Sparkles, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { corpsBainProducts, corpsBainSubcategories } from '@/lib/data/corps-bain'

export default function CorpsBainPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  // Filtrer les produits selon la sous-catégorie sélectionnée
  const filteredProducts = selectedSubcategory === 'all' 
    ? corpsBainProducts 
    : corpsBainProducts.filter(product => product.subcategory === selectedSubcategory)

  const breadcrumbItems = [
    { label: 'Corps & Bain' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Corps & Bain"
        description="Prenez soin de votre corps avec notre sélection de produits de bain et de soins corporels. Des gels douche aux crèmes hydratantes, offrez à votre peau le soin qu'elle mérite."
        image="/images/corps-bain-hero.jpg"
        badge="Soins naturels"
        stats={{
          products: corpsBainProducts.length,
          brands: new Set(corpsBainProducts.map(p => p.brand)).size,
          rating: 4.5
        }}
        features={[
          'Produits naturels et doux',
          'Formules hydratantes et nourrissantes',
          'Senteurs délicates et relaxantes'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Sous-catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            <Button
              variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setSelectedSubcategory('all')}
            >
              <span className="text-2xl">🛁</span>
              <span className="text-sm font-medium">Tous</span>
              <Badge variant="secondary" className="text-xs">
                {corpsBainProducts.length}
              </Badge>
            </Button>
            
            {corpsBainSubcategories.map((subcategory) => (
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

        {/* Guide des soins corps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Guide Corps & Bain</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Routine Corps</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Découvrez les étapes essentielles pour une routine corps parfaite.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/routine-corps">
                    Voir la routine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Types de Peau</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Identifiez votre type de peau et choisissez les produits adaptés.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/types-peau-corps">
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
                  <CardTitle className="text-lg">Moment Détente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Créez votre moment spa à la maison avec nos conseils.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/moment-detente">
                    Créer le moment
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
                : corpsBainSubcategories.find(s => s.id === selectedSubcategory)?.name
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
