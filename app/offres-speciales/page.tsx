'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { OffresGrid } from '@/components/offers/OffresGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Percent, Clock, Tag, Star, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { offresSpeciales, offresSpecialesCategories, discountRanges, offerTypes } from '@/lib/data/offres-speciales'

export default function OffresSpecialesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filtrer les offres selon la catégorie sélectionnée
  const filteredOffres = selectedCategory === 'all' 
    ? offresSpeciales 
    : offresSpeciales.filter(offre => {
        if (selectedCategory === 'packs') return offre.subcategory === 'packs'
        if (selectedCategory === 'collections') return offre.subcategory === 'collections'
        if (selectedCategory === 'promotions') return offre.subcategory === 'promotions'
        return offre.category === selectedCategory
      })

  const breadcrumbItems = [
    { label: 'Offres Spéciales' }
  ]

  const totalOffres = offresSpeciales.length
  const activeOffres = offresSpeciales.filter(o => o.isActive).length
  const limitedOffres = offresSpeciales.filter(o => o.isLimited).length
  const averageDiscount = offresSpeciales.reduce((sum, offre) => sum + offre.discountPercentage, 0) / offresSpeciales.length

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Offres Spéciales"
        description="Découvrez nos offres exceptionnelles et promotions limitées. Des réductions incroyables sur vos produits de beauté préférés, pour un temps limité seulement."
        image="/images/offres-speciales-hero.jpg"
        badge="Promotions limitées"
        stats={{
          products: totalOffres,
          brands: new Set(offresSpeciales.map(o => o.brand)).size,
          rating: Math.round(averageDiscount)
        }}
        features={[
          'Réductions jusqu\'à 50%',
          'Offres limitées dans le temps',
          'Produits de qualité garantie'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques des offres */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Nos Offres en Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Percent className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <h3 className="text-2xl font-bold mb-1">{Math.round(averageDiscount)}%</h3>
                <p className="text-sm text-muted-foreground">Réduction moyenne</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Tag className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold mb-1">{totalOffres}</h3>
                <p className="text-sm text-muted-foreground">Offres actives</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <h3 className="text-2xl font-bold mb-1">{limitedOffres}</h3>
                <p className="text-sm text-muted-foreground">Offres limitées</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="text-2xl font-bold mb-1">{activeOffres}</h3>
                <p className="text-sm text-muted-foreground">En cours</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alertes importantes */}
        <div className="mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-1">Offres limitées dans le temps</h3>
                <p className="text-sm text-orange-700">
                  Certaines offres ont une quantité limitée ou expirent bientôt. 
                  Profitez-en rapidement pour ne pas les manquer !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Catégories d'offres */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Types d&apos;Offres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {offresSpecialesCategories.map((category) => (
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

        {/* Guide des offres */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Comment Profiter des Offres</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-lg">Offres Limitées</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Certaines offres ont une quantité limitée. Commandez rapidement pour ne pas les manquer.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/offres-limitees">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-lg">Réductions Exceptionnelles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des réductions jusqu&apos;à 50% sur des produits de qualité premium.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/reductions-exceptionnelles">
                    Voir les réductions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Packs & Coffrets</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des packs et coffrets à prix réduits pour découvrir plusieurs produits.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide/packs-coffrets">
                    Découvrir les packs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Grille d'offres */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' 
                ? 'Toutes les offres' 
                : offresSpecialesCategories.find(c => c.id === selectedCategory)?.name
              }
            </h2>
            <Badge variant="secondary">
              {filteredOffres.length} offre{filteredOffres.length > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <OffresGrid
            offres={filteredOffres}
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
