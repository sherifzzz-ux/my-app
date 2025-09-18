'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { GiftIdeasGrid } from '@/components/idees-cadeaux/GiftIdeasGrid'
import { GiftOccasionCard } from '@/components/idees-cadeaux/GiftOccasionCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gift, Heart, Sparkles, TrendingUp, Users, Award, Package, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { giftIdeas, giftOccasions, giftCategories, giftRecipients, giftStats } from '@/lib/data/idees-cadeaux'

export default function IdeesCadeauxPage() {
  const breadcrumbItems = [
    { label: 'Idées Cadeaux' }
  ]

  // Get featured gifts
  const featuredGifts = giftIdeas.filter(g => g.rating >= 4.6 || g.isPopular)
  const newGifts = giftIdeas.filter(g => g.isNew)
  const popularGifts = giftIdeas.filter(g => g.isPopular)
  const limitedGifts = giftIdeas.filter(g => g.isLimited)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Idées Cadeaux Parfaites"
        description="Trouvez le cadeau idéal pour toutes les occasions ! Notre sélection soigneusement choisie vous aide à faire plaisir à vos proches avec des produits de qualité et des coffrets élégants."
        image="/images/idees-cadeaux-hero.jpg"
        badge="🎁 Cadeaux Parfaits"
        stats={{
          products: giftStats.totalGifts,
          brands: giftStats.totalOccasions,
          rating: giftStats.averageRating
        }}
        features={[
          'Emballage cadeau inclus',
          'Message personnalisé',
          'Livraison rapide'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Idées Cadeaux en Chiffres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection complète pour toutes les occasions et tous les budgets
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {giftStats.totalGifts}
                </div>
                <p className="text-sm text-muted-foreground">Idées de Cadeaux</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {giftStats.totalOccasions}
                </div>
                <p className="text-sm text-muted-foreground">Occasions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {giftStats.totalCategories}
                </div>
                <p className="text-sm text-muted-foreground">Catégories</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {giftStats.averageRating}/5
                </div>
                <p className="text-sm text-muted-foreground">Note Moyenne</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Occasions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cadeaux par Occasion</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez le cadeau parfait pour chaque moment spécial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftOccasions.map((occasion) => (
              <GiftOccasionCard key={occasion.id} occasion={occasion} />
            ))}
          </div>
        </div>

        {/* Collection Complète */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Collection Complète</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre sélection complète d&apos;idées de cadeaux
            </p>
          </div>
          
          <GiftIdeasGrid gifts={giftIdeas} />
        </div>

        {/* CTA Final */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Faites Plaisir avec le Cadeau Parfait</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Trouvez le cadeau idéal pour chaque occasion et faites plaisir à vos proches 
                  avec nos sélections soigneusement choisies et nos services cadeaux.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/idees-cadeaux">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Explorer nos Idées
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Award className="h-5 w-5 mr-2" />
                      Conseil Cadeaux
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