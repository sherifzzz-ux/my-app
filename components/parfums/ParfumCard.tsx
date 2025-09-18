import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Heart, ShoppingCart, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Parfum } from '@/lib/data/parfums'

interface ParfumCardProps {
  parfum: Parfum
  viewMode?: 'grid' | 'list'
}

export function ParfumCard({ parfum, viewMode = 'grid' }: ParfumCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="w-full md:w-48 h-48 md:h-auto">
            <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={parfum.image}
                alt={parfum.name}
                fill
                className="object-cover"
              />
              {parfum.isNew && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  Nouveau
                </Badge>
              )}
              {parfum.isLimited && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  Édition Limitée
                </Badge>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {parfum.brand}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {parfum.concentration}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl mb-2">{parfum.name}</CardTitle>
                <CardDescription className="mb-3">
                  {parfum.description}
                </CardDescription>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{parfum.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({parfum.reviews} avis)
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {parfum.family}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {parfum.gender}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(parfum.price)}
                  </span>
                  {parfum.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(parfum.originalPrice)}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {parfum.size}ml
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button size="sm" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoris
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  <Info className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={parfum.image}
          alt={parfum.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {parfum.isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Nouveau
          </Badge>
        )}
        {parfum.isLimited && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            Édition Limitée
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {parfum.brand}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {parfum.concentration}
          </Badge>
        </div>
        
        <CardTitle className="text-lg line-clamp-1">{parfum.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {parfum.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{parfum.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({parfum.reviews})
            </span>
          </div>
          
          {/* Family and Gender */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {parfum.family}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {parfum.gender}
            </Badge>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(parfum.price)}
            </span>
            {parfum.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(parfum.originalPrice)}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {parfum.size}ml
            </span>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Panier
            </Button>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
