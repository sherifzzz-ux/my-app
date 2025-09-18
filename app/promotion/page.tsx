'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { PromotionCarousel } from '@/components/promotion/PromotionCarousel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Tag, Zap, Gift, Star } from 'lucide-react'
import Link from 'next/link'
import { promotions, promotionCategories } from '@/lib/data/promotions'

export default function PromotionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filtrer les promotions selon la catégorie sélectionnée
  const filteredPromotions = selectedCategory === 'all' 
    ? promotions 
    : promotions.filter(promotion => promotion.category === selectedCategory)

  const breadcrumbItems = [
    { label: 'Promotions' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Promotions"
        description="Découvrez nos offres exceptionnelles et profitez de réductions incroyables sur vos produits beauté préférés. Des promotions limitées dans le temps vous attendent !"
        image="/images/promotions-hero.jpg"
        badge="Offres limitées"
        stats={{
          products: promotions.length,
          brands: new Set(promotions.map(p => p.category)).size,
          rating: 4.8
        }}
        features={[
          'Réductions jusqu\'à -70%',
          'Offres limitées dans le temps',
          'Produits de qualité garantie'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Carrousel des promotions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Promotions en cours</h2>
          <PromotionCarousel 
            promotions={promotions.filter(p => p.isActive)}
            autoPlay={true}
            autoPlayInterval={6000}
          />
        </div>

        {/* Catégories de promotions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Promotions par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setSelectedCategory('all')}
            >
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-medium">Toutes</span>
              <Badge variant="secondary" className="text-xs">
                {promotions.length}
              </Badge>
            </Button>
            
            {promotionCategories.map((category) => (
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

        {/* Avantages des promotions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Pourquoi nos promotions ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Réductions Flash</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des réductions exceptionnelles sur des durées limitées pour des économies maximales.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/promotions/flash">
                    Voir les offres flash
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Cadeaux Bonus</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des échantillons et cadeaux gratuits avec vos achats en promotion.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/promotions/cadeaux">
                    Découvrir les cadeaux
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Produits Premium</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des marques de luxe et produits premium à des prix accessibles.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/promotions/premium">
                    Voir les produits premium
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Liste des promotions filtrées */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' 
                ? 'Toutes les promotions' 
                : promotionCategories.find(c => c.id === selectedCategory)?.name
              }
            </h2>
            <Badge variant="secondary">
              {filteredPromotions.length} promotion{filteredPromotions.length > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promotion) => (
              <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${promotion.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">
                      <Tag className="w-3 h-3 mr-1" />
                      -{promotion.discount}%
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {promotion.endDate}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{promotion.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {promotion.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {promotion.salePrice.toLocaleString()} FCFA
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {promotion.originalPrice.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Profiter de l&apos;offre
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter pour les promotions */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ne ratez aucune promotion !</h3>
              <p className="text-muted-foreground mb-6">
                Inscrivez-vous à notre newsletter pour être informé en premier des meilleures offres.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button>S&apos;inscrire</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
