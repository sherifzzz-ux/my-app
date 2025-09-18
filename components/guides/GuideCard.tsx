import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, User, Eye, Heart, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { GuideArticle } from '@/lib/data/guide-beaute'

interface GuideCardProps {
  article: GuideArticle
  viewMode?: 'grid' | 'list'
}

export function GuideCard({ article, viewMode = 'grid' }: GuideCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="flex flex-row overflow-hidden">
        <div className="relative w-48 h-32 flex-shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
          {article.isFeatured && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Vedette
              </Badge>
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <CardTitle className="text-xl mb-1">{article.title}</CardTitle>
              <CardDescription className="text-sm mb-2">
                Par {article.author} • {article.category}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {article.difficulty}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {article.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime} min
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {article.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {article.likes}
              </div>
            </div>
            <Button asChild>
              <Link href={`/guide/${article.id}`}>
                Lire l&apos;article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {article.isFeatured && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Vedette
            </Badge>
          )}
          {article.isPopular && (
            <Badge className="bg-green-500 text-white">
              Populaire
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-black">
            {article.difficulty}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <CardTitle className="text-lg mb-1">{article.title}</CardTitle>
            <CardDescription className="text-sm">
              Par {article.author} • {article.category}
            </CardDescription>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min de lecture
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              {article.likes} j&apos;aime
            </div>
            <Button size="sm" asChild>
              <Link href={`/guide/${article.id}`}>
                Lire l&apos;article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
