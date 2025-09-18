'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { TeamCard } from '@/components/about/TeamCard'
import { ValueCard } from '@/components/about/ValueCard'
import { MilestoneCard } from '@/components/about/MilestoneCard'
import { StatCard } from '@/components/about/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Target, Heart, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { teamMembers, companyValues, companyMilestones, companyStats, companyStory, companyMission } from '@/lib/data/a-propos'

export default function AProposPage() {
  const breadcrumbItems = [
    { label: 'À Propos' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="À Propos de Mami Shop"
        description="Découvrez l'histoire de Mami Shop, notre mission et notre équipe passionnée qui œuvre chaque jour pour vous offrir le meilleur de la beauté."
        image="/images/a-propos-hero.jpg"
        badge="Depuis 2020"
        stats={{
          products: 0,
          brands: 0,
          rating: 4.9
        }}
        features={[
          '50K+ clients satisfaits',
          '500+ marques partenaires',
          'Équipe d\'experts certifiés'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Notre Histoire */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{companyStory.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <div className="prose prose-lg max-w-none">
                {companyStory.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mami Shop en Chiffres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des chiffres qui témoignent de notre croissance et de la confiance de nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyStats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>

        {/* Notre Mission */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{companyMission.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <div className="prose prose-lg max-w-none">
                {companyMission.content.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="mb-6">
                    {paragraph.includes('•') ? (
                      <div className="space-y-3">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className="flex items-start gap-3">
                            {line.startsWith('•') && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            )}
                            <p className="text-muted-foreground leading-relaxed">
                              {line.replace('•', '').trim()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nos Valeurs */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre action et notre engagement envers nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </div>
        </div>

        {/* Notre Équipe */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rencontrez les experts passionnés qui font de Mami Shop votre partenaire beauté de confiance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Notre Histoire - Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Parcours</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les étapes importantes qui ont marqué notre croissance et notre évolution
            </p>
          </div>
          
          <div className="space-y-12">
            {companyMilestones.map((milestone, index) => (
              <MilestoneCard 
                key={milestone.id} 
                milestone={milestone} 
                isEven={index % 2 === 1}
              />
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Rejoignez l&apos;Aventure Mami Shop</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Découvrez notre univers beauté et laissez-nous vous accompagner dans votre routine beauté personnalisée.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/catalog">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Découvrir nos produits
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Users className="h-5 w-5 mr-2" />
                      Nous contacter
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
