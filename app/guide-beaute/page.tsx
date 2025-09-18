'use client'

import { useState } from 'react'
import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { GuidesGrid } from '@/components/guides/GuidesGrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Clock, Star, TrendingUp, Award, Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { guideArticles, guideCategories, popularTags } from '@/lib/data/guide-beaute'

export default function GuideBeautePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filtrer les articles selon la catégorie sélectionnée
  const filteredArticles = selectedCategory === 'all' 
    ? guideArticles 
    : guideArticles.filter(article => article.category === selectedCategory)

  const breadcrumbItems = [
    { label: 'Guide Beauté' }
  ]

  const totalArticles = guideArticles.length
  const totalViews = guideArticles.reduce((sum, article) => sum + article.views, 0)
  const totalLikes = guideArticles.reduce((sum, article) => sum + article.likes, 0)
  const averageReadTime = guideArticles.reduce((sum, article) => sum + article.readTime, 0) / guideArticles.length

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Guide Beauté"
        description="Découvrez nos conseils d'experts, tutoriels et guides complets pour prendre soin de votre beauté. Des routines simples aux techniques avancées, apprenez les secrets de la beauté."
        image="/images/guide-beaute-hero.jpg"
        badge="Conseils d'experts"
        stats={{
          products: totalArticles,
          brands: new Set(guideArticles.map(a => a.author)).size,
          rating: Math.round(averageReadTime * 10) / 10
        }}
        features={[
          'Conseils d\'experts certifiés',
          'Tutoriels pas à pas',
          'Guides adaptés à tous les niveaux'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques du guide */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Notre Guide en Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="text-2xl font-bold mb-1">{totalArticles}</h3>
                <p className="text-sm text-muted-foreground">Articles</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="text-2xl font-bold mb-1">{totalViews.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">Vues totales</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-1">{totalLikes.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">J&apos;aime</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="text-2xl font-bold mb-1">{Math.round(averageReadTime)}</h3>
                <p className="text-sm text-muted-foreground">Min de lecture</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Articles vedettes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Articles Vedettes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guideArticles.filter(a => a.isFeatured).slice(0, 2).map((article) => (
              <Card key={article.id} className="relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Article Vedette
                  </Badge>
                </div>
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>Par {article.author} • {article.readTime} min de lecture</CardDescription>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes}
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/guide/${article.id}`}>
                        Lire l&apos;article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {guideCategories.map((category) => (
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

        {/* Tags populaires */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Tags Populaires</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag.name} ({tag.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Guide des niveaux */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Niveaux de Difficulté</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Débutant</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des guides simples et accessibles pour commencer votre routine beauté.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide?difficulty=debutant">
                    Voir les guides débutant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Intermédiaire</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des techniques plus avancées pour perfectionner votre routine.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide?difficulty=intermediaire">
                    Voir les guides intermédiaire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg">Avancé</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Des techniques expertes pour les plus expérimentés.
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guide?difficulty=avance">
                    Voir les guides avancé
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Grille d'articles */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' 
                ? 'Tous les articles' 
                : guideCategories.find(c => c.id === selectedCategory)?.name
              }
            </h2>
            <Badge variant="secondary">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <GuidesGrid
            articles={filteredArticles}
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
