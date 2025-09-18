'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { KoreanSkincareGrid } from '@/components/korean-skincare/KoreanSkincareGrid'
import { SkincareConcernCard } from '@/components/korean-skincare/SkincareConcernCard'
import { SkincareRoutineCard } from '@/components/korean-skincare/SkincareRoutineCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Crown, Sparkles, TrendingUp, Users, Award, Heart, Shield, Leaf, Droplets } from 'lucide-react'
import Link from 'next/link'
import { koreanSkincareProducts, skincareCategories, skincareConcerns, skincareRoutines, koreanSkincareStats } from '@/lib/data/korean-skincare'

export default function KoreanSkincarePage() {
  const breadcrumbItems = [
    { label: 'Korean Skincare' }
  ]

  // Get featured products
  const featuredProducts = koreanSkincareProducts.filter(p => p.rating >= 4.6 || p.isTrending)
  const newProducts = koreanSkincareProducts.filter(p => p.isNew)
  const trendingProducts = koreanSkincareProducts.filter(p => p.isTrending)
  const limitedProducts = koreanSkincareProducts.filter(p => p.isLimited)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Korean Skincare Collection"
        description="Découvrez l'art du soin coréen avec nos produits K-Skincare authentiques. Des routines révolutionnaires aux ingrédients innovants, transformez votre peau avec l'excellence de la beauté coréenne."
        image="/images/korean-skincare-hero.jpg"
        badge="🇰🇷 K-Skincare Authentique"
        stats={{
          products: koreanSkincareStats.totalProducts,
          brands: koreanSkincareStats.totalBrands,
          rating: koreanSkincareStats.averageRating
        }}
        features={[
          'Routine 10 étapes authentique',
          'Ingrédients révolutionnaires',
          'Produits Made in Korea'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Collection K-Skincare en Chiffres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection authentique de produits coréens de soin
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanSkincareStats.totalProducts}
                </div>
                <p className="text-sm text-muted-foreground">Produits K-Skincare</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanSkincareStats.madeInKorea}
                </div>
                <p className="text-sm text-muted-foreground">Made in Korea</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanSkincareStats.crueltyFree}
                </div>
                <p className="text-sm text-muted-foreground">Cruelty Free</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanSkincareStats.averageRating}/5
                </div>
                <p className="text-sm text-muted-foreground">Note Moyenne</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Catégories K-Skincare */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Catégories K-Skincare</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez les différentes étapes de la routine coréenne
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skincareCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    {category.step && (
                      <Badge variant="secondary" className="text-xs">
                        Étape {category.step}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <Badge variant="outline" className="mb-4">
                      {category.count} produits
                    </Badge>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/korean-skincare?category=${category.id}`}>
                        Découvrir
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Problèmes de Peau */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solutions par Problème de Peau</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez les produits adaptés à vos préoccupations cutanées
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skincareConcerns.map((concern) => (
              <SkincareConcernCard key={concern.id} concern={concern} />
            ))}
          </div>
        </div>

        {/* Routines de Soins */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Routines de Soins Coréennes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les routines K-Skincare adaptées à votre type de peau
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skincareRoutines.map((routine) => (
              <SkincareRoutineCard key={routine.id} routine={routine} />
            ))}
          </div>
        </div>

        {/* Collection Complète */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Collection Complète K-Skincare</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre sélection complète de produits coréens authentiques
            </p>
          </div>
          
          <KoreanSkincareGrid products={koreanSkincareProducts} />
        </div>

        {/* CTA Final */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Transformez Votre Peau avec la K-Skincare</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Découvrez l&apos;art du soin coréen et obtenez une peau parfaite 
                  avec nos produits authentiques et nos routines expertes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/korean-skincare">
                      <Crown className="h-5 w-5 mr-2" />
                      Explorer la Collection
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Award className="h-5 w-5 mr-2" />
                      Consultation K-Skincare
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}