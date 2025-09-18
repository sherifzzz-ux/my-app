import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Brand } from '@/lib/data/marques'

interface BrandCardProps {
  brand: Brand
  viewMode?: 'grid' | 'list'
}

export function BrandCard({ brand, viewMode = 'grid' }: BrandCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="flex flex-row overflow-hidden">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={brand.logo}
            alt={`Logo ${brand.name}`}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <CardTitle className="text-xl mb-1">{brand.name}</CardTitle>
              <CardDescription className="text-sm mb-2">
                {brand.country} • Depuis {brand.founded}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{brand.rating}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {brand.productCount} produits
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {brand.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {brand.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/marques/${brand.id}`}>
                  Voir les produits
                </Link>
              </Button>
              {brand.website && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={brand.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={brand.banner}
          alt={`Bannière ${brand.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {brand.isPremium && (
            <Badge className="bg-yellow-500 text-white">Premium</Badge>
          )}
          {brand.isNew && (
            <Badge className="bg-green-500 text-white">Nouveau</Badge>
          )}
          {brand.isPopular && (
            <Badge className="bg-blue-500 text-white">Populaire</Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={brand.logo}
              alt={`Logo ${brand.name}`}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-lg">{brand.name}</CardTitle>
            <CardDescription className="text-sm">
              {brand.country} • Depuis {brand.founded}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{brand.rating}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {brand.productCount} produits
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {brand.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {brand.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/marques/${brand.id}`}>
              Voir les produits
            </Link>
          </Button>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            {brand.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
