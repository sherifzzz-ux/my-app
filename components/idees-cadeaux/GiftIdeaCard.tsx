import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Heart, ShoppingCart, Info, Gift, MessageSquare, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GiftIdea } from '@/lib/data/idees-cadeaux'

interface GiftIdeaCardProps {
  gift: GiftIdea
  viewMode?: 'grid' | 'list'
}

export function GiftIdeaCard({ gift, viewMode = 'grid' }: GiftIdeaCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'Économique':
        return 'bg-green-500'
      case 'Modéré':
        return 'bg-blue-500'
      case 'Premium':
        return 'bg-purple-500'
      case 'Luxe':
        return 'bg-gold-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="w-full md:w-48 h-48 md:h-auto">
            <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={gift.image}
                alt={gift.name}
                fill
                className="object-cover"
              />
              {gift.isNew && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  Nouveau
                </Badge>
              )}
              {gift.isPopular && (
                <Badge className="absolute top-2 right-2 bg-orange-500">
                  Populaire
                </Badge>
              )}
              {gift.isLimited && (
                <Badge className="absolute bottom-2 left-2 bg-red-500">
                  Édition Limitée
                </Badge>
              )}
              <Badge className={`absolute bottom-2 right-2 ${getBudgetColor(gift.budget)}`}>
                {gift.budget}
              </Badge>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {gift.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {gift.giftType}
                  </Badge>
                  {gift.brand && (
                    <Badge variant="outline" className="text-xs">
                      {gift.brand}
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-xl mb-2">{gift.name}</CardTitle>
                <CardDescription className="mb-3">
                  {gift.description}
                </CardDescription>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{gift.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({gift.reviews} avis)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(gift.price)}
                  </span>
                  {gift.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(gift.originalPrice)}
                    </span>
                  )}
                  {gift.size && (
                    <span className="text-sm text-muted-foreground">
                      {gift.size}
                    </span>
                  )}
                </div>
                
                {/* Occasions */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Occasions</h4>
                  <div className="flex flex-wrap gap-1">
                    {gift.occasion.slice(0, 3).map((occasion) => (
                      <Badge key={occasion} variant="outline" className="text-xs">
                        {occasion}
                      </Badge>
                    ))}
                    {gift.occasion.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{gift.occasion.length - 3} autres
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Recipients */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Destinataires</h4>
                  <div className="flex flex-wrap gap-1">
                    {gift.recipient.map((recipient) => (
                      <Badge key={recipient} variant="secondary" className="text-xs">
                        {recipient}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Avantages</h4>
                  <div className="flex flex-wrap gap-1">
                    {gift.benefits.slice(0, 3).map((benefit) => (
                      <Badge key={benefit} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                    {gift.benefits.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{gift.benefits.length - 3} autres
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Services */}
                <div className="flex items-center gap-2 mb-4">
                  {gift.wrapping && (
                    <Badge variant="outline" className="text-xs">
                      <Package className="h-3 w-3 mr-1" />
                      Emballage
                    </Badge>
                  )}
                  {gift.message && (
                    <Badge variant="outline" className="text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Badge>
                  )}
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
          src={gift.image}
          alt={gift.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {gift.isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Nouveau
          </Badge>
        )}
        {gift.isPopular && (
          <Badge className="absolute top-2 right-2 bg-orange-500">
            Populaire
          </Badge>
        )}
        {gift.isLimited && (
          <Badge className="absolute bottom-2 left-2 bg-red-500">
            Édition Limitée
          </Badge>
        )}
        <Badge className={`absolute bottom-2 right-2 ${getBudgetColor(gift.budget)}`}>
          {gift.budget}
        </Badge>
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
            {gift.category}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {gift.giftType}
          </Badge>
        </div>
        
        <CardTitle className="text-lg line-clamp-1">{gift.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {gift.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{gift.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({gift.reviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(gift.price)}
            </span>
            {gift.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(gift.originalPrice)}
              </span>
            )}
            {gift.size && (
              <span className="text-sm text-muted-foreground">
                {gift.size}
              </span>
            )}
          </div>
          
          {/* Occasions */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Occasions :</p>
            <div className="flex flex-wrap gap-1">
              {gift.occasion.slice(0, 2).map((occasion) => (
                <Badge key={occasion} variant="outline" className="text-xs">
                  {occasion}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Recipients */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Pour :</p>
            <div className="flex flex-wrap gap-1">
              {gift.recipient.slice(0, 2).map((recipient) => (
                <Badge key={recipient} variant="secondary" className="text-xs">
                  {recipient}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div className="flex items-center gap-1">
            {gift.wrapping && (
              <Badge variant="outline" className="text-xs">
                <Package className="h-3 w-3 mr-1" />
                Emballage
              </Badge>
            )}
            {gift.message && (
              <Badge variant="outline" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Message
              </Badge>
            )}
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
