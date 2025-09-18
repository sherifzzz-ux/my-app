'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { KoreanBeautyGrid } from '@/components/korean-beauty/KoreanBeautyGrid'
import { KoreanRoutineStep } from '@/components/korean-beauty/KoreanRoutineStep'
import { KoreanIngredientCard } from '@/components/korean-beauty/KoreanIngredientCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Crown, Sparkles, TrendingUp, Users, Award, Heart, Shield, Leaf } from 'lucide-react'
import Link from 'next/link'
import { koreanBeautyProducts, koreanBeautyCategories, koreanIngredients, koreanRoutineSteps, koreanBeautyStats } from '@/lib/data/korean-beauty'

export default function KoreanBeautyPage() {
  const breadcrumbItems = [
    { label: 'Korean Beauty' }
  ]

  // Get featured products
  const featuredProducts = koreanBeautyProducts.filter(p => p.rating >= 4.6 || p.isTrending)
  const newProducts = koreanBeautyProducts.filter(p => p.isNew)
  const trendingProducts = koreanBeautyProducts.filter(p => p.isTrending)
  const limitedProducts = koreanBeautyProducts.filter(p => p.isLimited)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Korean Beauty Collection"
        description="Découvrez l'univers magique de la K-Beauty avec nos produits coréens authentiques. Des routines de soins révolutionnaires aux ingrédients innovants, plongez dans l'excellence de la beauté coréenne."
        image="/images/korean-beauty-hero.jpg"
        badge="🇰🇷 Made in Korea"
        stats={{
          products: koreanBeautyStats.totalProducts,
          brands: koreanBeautyStats.totalBrands,
          rating: koreanBeautyStats.averageRating
        }}
        features={[
          'Produits authentiques de Corée',
          'Routine 10 étapes',
          'Ingrédients révolutionnaires'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Collection K-Beauty en Chiffres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection authentique de produits coréens de qualité
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanBeautyStats.totalProducts}
                </div>
                <p className="text-sm text-muted-foreground">Produits K-Beauty</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanBeautyStats.madeInKorea}
                </div>
                <p className="text-sm text-muted-foreground">Made in Korea</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanBeautyStats.crueltyFree}
                </div>
                <p className="text-sm text-muted-foreground">Cruelty Free</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {koreanBeautyStats.averageRating}/5
                </div>
                <p className="text-sm text-muted-foreground">Note Moyenne</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Catégories K-Beauty */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Catégories K-Beauty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez les différentes catégories de produits coréens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {koreanBeautyCategories.map((category) => (
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
                      <Link href={`/korean-beauty?category=${category.id}`}>
                        Découvrir
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Routine 10 Étapes */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Routine 10 Étapes K-Beauty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez la célèbre routine de soins coréenne en 10 étapes pour une peau parfaite
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {koreanRoutineSteps.map((step) => (
              <KoreanRoutineStep key={step.id} step={step} />
            ))}
          </div>
        </div>

        {/* Ingrédients Révolutionnaires */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ingrédients Révolutionnaires</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les ingrédients phares de la K-Beauty qui révolutionnent les soins de la peau
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {koreanIngredients.map((ingredient) => (
              <KoreanIngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </div>

        {/* Tendances */}
        {trendingProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tendances K-Beauty</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les produits qui font sensation dans l'univers de la beauté coréenne
              </p>
            </div>
            
            <KoreanBeautyGrid 
              products={trendingProducts} 
              showFilters={false}
            />
          </div>
        )}

        {/* Nouveautés */}
        {newProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nouveautés K-Beauty</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les dernières créations de nos marques coréennes préférées
              </p>
            </div>
            
            <KoreanBeautyGrid 
              products={newProducts} 
              showFilters={false}
            />
          </div>
        )}

        {/* Éditions Limitées */}
        {limitedProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Éditions Limitées</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des créations exclusives et rares de la K-Beauty
              </p>
            </div>
            
            <KoreanBeautyGrid 
              products={limitedProducts} 
              showFilters={false}
            />
          </div>
        )}

        {/* Collection Complète */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Collection Complète K-Beauty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre sélection complète de produits coréens authentiques
            </p>
          </div>
          
          <KoreanBeautyGrid products={koreanBeautyProducts} />
        </div>

        {/* Guide K-Beauty */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Guide K-Beauty Complet</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Apprenez tous les secrets de la beauté coréenne avec nos guides experts 
                  et découvrez comment adopter la routine 10 étapes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/guide-beaute">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Guide Complet
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Users className="h-5 w-5 mr-2" />
                      Conseils d&apos;Expert
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Final */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Découvrez la Magie K-Beauty</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Plongez dans l'univers fascinant de la beauté coréenne et transformez 
                  votre routine de soins avec des produits authentiques et innovants.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/korean-beauty">
                      <Crown className="h-5 w-5 mr-2" />
                      Explorer la Collection
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Award className="h-5 w-5 mr-2" />
                      Consultation K-Beauty
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