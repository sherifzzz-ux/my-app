'use client'

import { useState, useEffect } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ProductGrid } from '@/components/category/ProductGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Info, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { soinVisageProducts, soinVisageSubcategories } from '@/lib/data/soin-visage'

interface SubCategoryPageProps {
  params: Promise<{ sub: string }>
}

export default function SubCategoryPage({ params }: SubCategoryPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ sub: string } | null>(null)
  
  // Résoudre les params de manière asynchrone
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  if (!resolvedParams) {
    return <div>Chargement...</div>
  }

  const { sub } = resolvedParams
  
  // Trouver la sous-catégorie
  const subcategory = soinVisageSubcategories.find(s => s.id === sub)
  
  if (!subcategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sous-catégorie non trouvée</h1>
          <p className="text-muted-foreground mb-6">
            La sous-catégorie &quot;{sub}&quot; n&apos;existe pas.
          </p>
          <Button asChild>
            <Link href="/soin-du-visage">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux soins du visage
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Filtrer les produits de cette sous-catégorie
  const products = soinVisageProducts.filter(product => product.subcategory === sub)

  const breadcrumbItems = [
    { label: 'Soin du visage', href: '/soin-du-visage' },
    { label: subcategory.name }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title={subcategory.name}
        description={subcategory.description}
        image={`/images/soin-visage-${sub}.jpg`}
        badge={`${products.length} produits`}
        stats={{
          products: products.length,
          brands: new Set(products.map(p => p.brand)).size,
          rating: 4.4
        }}
        features={[
          'Produits de qualité',
          'Marques reconnues',
          'Livraison rapide'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Informations sur la sous-catégorie */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{subcategory.icon}</span>
                <div>
                  <CardTitle className="text-2xl">{subcategory.name}</CardTitle>
                  <CardDescription className="text-base">
                    {subcategory.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Conseils d&apos;utilisation</p>
                    <p className="text-sm text-muted-foreground">
                      Découvrez comment utiliser ces produits
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Star className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Produits recommandés</p>
                    <p className="text-sm text-muted-foreground">
                      Sélectionnés par nos experts
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Avis clients</p>
                    <p className="text-sm text-muted-foreground">
                      Plus de 1000 avis vérifiés
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Produits */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Produits {subcategory.name}
            </h2>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                {products.length} produit{products.length > 1 ? 's' : ''}
              </Badge>
              <Button variant="outline" asChild>
                <Link href="/soin-du-visage">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voir toutes les catégories
                </Link>
              </Button>
            </div>
          </div>
          
          <ProductGrid
            products={products}
            showFilters={true}
            showSort={true}
            showViewToggle={true}
          />
        </div>
      </div>
    </div>
  )
}
