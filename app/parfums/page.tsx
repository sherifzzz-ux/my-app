'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ParfumGrid } from '@/components/parfums/ParfumGrid'
import { OlfactiveFamilyCard } from '@/components/parfums/OlfactiveFamilyCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Award, Crown, Sparkles, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { parfums, parfumCategories, olfactiveFamilies, parfumStats } from '@/lib/data/parfums'

export default function ParfumsPage() {
  const breadcrumbItems = [
    { label: 'Parfums' }
  ]

  // Get featured parfums (top rated and new)
  const featuredParfums = parfums.filter(p => p.rating >= 4.7 || p.isNew)
  const newArrivals = parfums.filter(p => p.isNew)
  const limitedEditions = parfums.filter(p => p.isLimited)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Collection Parfums de Luxe"
        description="Découvrez notre sélection exclusive de parfums de luxe, des créations iconiques aux nouveautés les plus raffinées. Chaque parfum raconte une histoire unique."
        image="/images/parfums-hero.jpg"
        badge="Collection Luxe"
        stats={{
          products: parfumStats.totalParfums,
          brands: parfumStats.totalBrands,
          rating: parfumStats.averageRating
        }}
        features={[
          'Parfums de créateurs exclusifs',
          'Conseils d\'experts parfumeurs',
          'Échantillons gratuits disponibles'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Collection en Chiffres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection soigneusement choisie des plus belles créations parfumées
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parfumStats.totalParfums}
                </div>
                <p className="text-sm text-muted-foreground">Parfums de Luxe</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parfumStats.totalBrands}
                </div>
                <p className="text-sm text-muted-foreground">Marques Prestigieuses</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parfumStats.averageRating}/5
                </div>
                <p className="text-sm text-muted-foreground">Note Moyenne</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {parfumStats.totalReviews}
                </div>
                <p className="text-sm text-muted-foreground">Avis Clients</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explorez par Catégorie</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez le parfum parfait selon vos préférences et votre style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parfumCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      {category.count} parfums
                    </Badge>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/parfums?category=${category.id}`}>
                        Découvrir
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Familles Olfactives */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Familles Olfactives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les différentes familles olfactives et trouvez celle qui vous correspond
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {olfactiveFamilies.map((family) => {
              const familyParfums = parfums.filter(p => p.family === family.name)
              return (
                <OlfactiveFamilyCard 
                  key={family.id} 
                  family={family} 
                  parfumCount={familyParfums.length}
                />
              )
            })}
          </div>
        </div>

        {/* Nouveautés */}
        {newArrivals.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nouveautés</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les dernières créations parfumées qui viennent enrichir notre collection
              </p>
            </div>
            
            <ParfumGrid 
              parfums={newArrivals} 
              showFilters={false}
            />
          </div>
        )}

        {/* Éditions Limitées */}
        {limitedEditions.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Éditions Limitées</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des créations exclusives et rares, disponibles en quantités limitées
              </p>
            </div>
            
            <ParfumGrid 
              parfums={limitedEditions} 
              showFilters={false}
            />
          </div>
        )}

        {/* Collection Complète */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Collection Complète</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre sélection complète de parfums de luxe avec nos filtres avancés
            </p>
          </div>
          
          <ParfumGrid parfums={parfums} />
        </div>

        {/* Guide des Parfums */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Guide des Parfums</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Apprenez à choisir le parfum parfait selon votre personnalité, 
                  votre style de vie et vos préférences olfactives.
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
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Trouvez Votre Signature Olfactive</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Chaque parfum raconte une histoire. Découvrez celle qui vous ressemble 
                  et créez votre signature olfactive unique.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/parfums">
                      <Crown className="h-5 w-5 mr-2" />
                      Explorer la Collection
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Award className="h-5 w-5 mr-2" />
                      Consultation Personnalisée
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