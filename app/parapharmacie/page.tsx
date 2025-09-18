'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ParapharmacieGrid } from '@/components/parapharmacie/ParapharmacieGrid'
import { HealthCategoryCard } from '@/components/parapharmacie/HealthCategoryCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Heart, Pill, Star, Users, Award, TrendingUp, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { parapharmacieProducts, healthCategories, healthConditions, parapharmacieStats } from '@/lib/data/parapharmacie'

export default function ParapharmaciePage() {
  const breadcrumbItems = [
    { label: 'Parapharmacie' }
  ]

  // Get featured products
  const featuredProducts = parapharmacieProducts.filter(p => p.rating >= 4.6 || p.isNew)
  const newProducts = parapharmacieProducts.filter(p => p.isNew)
  const promoProducts = parapharmacieProducts.filter(p => p.isPromo)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Parapharmacie & Bien-être"
        description="Découvrez notre sélection de produits de parapharmacie pour votre santé et votre bien-être. Des compléments alimentaires aux soins naturels, trouvez ce dont vous avez besoin."
        image="/images/parapharmacie-hero.jpg"
        badge="Santé & Bien-être"
        stats={{
          products: parapharmacieStats.totalProducts,
          brands: parapharmacieStats.totalCategories,
          rating: parapharmacieStats.averageRating
        }}
        features={[
          'Produits naturels et bio',
          'Conseils d\'experts santé',
          'Livraison sécurisée'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Parapharmacie en Chiffres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection complète de produits de santé et de bien-être
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parapharmacieStats.totalProducts}
                </div>
                <p className="text-sm text-muted-foreground">Produits de Santé</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parapharmacieStats.totalCategories}
                </div>
                <p className="text-sm text-muted-foreground">Catégories</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parapharmacieStats.naturalProducts}
                </div>
                <p className="text-sm text-muted-foreground">Produits Naturels</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parapharmacieStats.averageRating}/5
                </div>
                <p className="text-sm text-muted-foreground">Note Moyenne</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Catégories de Santé */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Catégories de Santé</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez les produits adaptés à vos besoins de santé et de bien-être
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthCategories.map((category) => (
              <HealthCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Conditions de Santé */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solutions par Problème</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des solutions naturelles pour les problèmes de santé les plus courants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthConditions.map((condition) => (
              <Card key={condition.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{condition.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{condition.name}</CardTitle>
                      <CardDescription>{condition.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Symptoms */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Symptômes courants :</h4>
                      <div className="flex flex-wrap gap-1">
                        {condition.symptoms.map((symptom) => (
                          <Badge key={symptom} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recommended Products */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Produits recommandés :</h4>
                      <div className="flex flex-wrap gap-1">
                        {condition.recommendedProducts.map((product) => (
                          <Badge key={product} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/parapharmacie?condition=${condition.id}`}>
                        Voir les solutions
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nouveautés */}
        {newProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nouveautés</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les derniers produits ajoutés à notre parapharmacie
              </p>
            </div>
            
            <ParapharmacieGrid 
              products={newProducts} 
              showFilters={false}
            />
          </div>
        )}

        {/* Promotions */}
        {promoProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Promotions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des offres spéciales sur nos produits de santé
              </p>
            </div>
            
            <ParapharmacieGrid 
              products={promoProducts} 
              showFilters={false}
            />
          </div>
        )}

        {/* Collection Complète */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Collection Complète</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre sélection complète de produits de parapharmacie
            </p>
          </div>
          
          <ParapharmacieGrid products={parapharmacieProducts} />
        </div>

        {/* Garanties et Sécurité */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Garanties & Sécurité</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Tous nos produits sont sélectionnés selon les plus hauts standards de qualité et de sécurité.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <Shield className="h-8 w-8 text-green-500 mb-2" />
                    <h3 className="font-semibold mb-1">Produits Certifiés</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Tous nos produits respectent les normes européennes
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
                    <h3 className="font-semibold mb-1">Qualité Garantie</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Sélection rigoureuse par nos experts santé
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Heart className="h-8 w-8 text-red-500 mb-2" />
                    <h3 className="font-semibold mb-1">Conseils Personnalisés</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Accompagnement par nos professionnels
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/parapharmacie">
                      <Pill className="h-5 w-5 mr-2" />
                      Découvrir nos produits
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
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Votre Santé, Notre Priorité</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Prenez soin de votre santé avec nos produits de qualité et nos conseils d&apos;experts. 
                  Votre bien-être est notre engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/parapharmacie">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Explorer la Parapharmacie
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Award className="h-5 w-5 mr-2" />
                      Consultation Santé
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