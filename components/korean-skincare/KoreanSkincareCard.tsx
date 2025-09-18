import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Heart, ShoppingCart, Info, Leaf, Shield, Droplets } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { KoreanSkincareProduct } from '@/lib/data/korean-skincare'

interface KoreanSkincareCardProps {
  product: KoreanSkincareProduct
  viewMode?: 'grid' | 'list'
}

export function KoreanSkincareCard({ product, viewMode = 'grid' }: KoreanSkincareCardProps) {
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
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  Nouveau
                </Badge>
              )}
              {product.isTrending && (
                <Badge className="absolute top-2 right-2 bg-orange-500">
                  Tendance
                </Badge>
              )}
              {product.isLimited && (
                <Badge className="absolute bottom-2 left-2 bg-red-500">
                  Édition Limitée
                </Badge>
              )}
              {product.madeInKorea && (
                <Badge className="absolute bottom-2 right-2 bg-blue-500">
                  🇰🇷 Corée
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
                    {product.brand}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  {product.step && (
                    <Badge variant="outline" className="text-xs">
                      Étape {product.step}
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                {product.koreanName && (
                  <p className="text-sm text-muted-foreground mb-2 font-korean">
                    {product.koreanName}
                  </p>
                )}
                <CardDescription className="mb-3">
                  {product.description}
                </CardDescription>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} avis)
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.subcategory}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {product.size}
                  </span>
                </div>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Bénéfices</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.slice(0, 3).map((benefit) => (
                      <Badge key={benefit} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                    {product.benefits.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.benefits.length - 3} autres
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Target Concerns */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Problèmes ciblés</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.targetConcerns.slice(0, 3).map((concern) => (
                      <Badge key={concern} variant="secondary" className="text-xs">
                        {concern}
                      </Badge>
                    ))}
                    {product.targetConcerns.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.targetConcerns.length - 3} autres
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Certifications */}
                <div className="flex items-center gap-2 mb-4">
                  {product.crueltyFree && (
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Cruelty Free
                    </Badge>
                  )}
                  {product.vegan && (
                    <Badge variant="outline" className="text-xs">
                      <Leaf className="h-3 w-3 mr-1" />
                      Vegan
                    </Badge>
                  )}
                  {product.pH && (
                    <Badge variant="outline" className="text-xs">
                      <Droplets className="h-3 w-3 mr-1" />
                      pH {product.pH}
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
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Nouveau
          </Badge>
        )}
        {product.isTrending && (
          <Badge className="absolute top-2 right-2 bg-orange-500">
            Tendance
          </Badge>
        )}
        {product.isLimited && (
          <Badge className="absolute bottom-2 left-2 bg-red-500">
            Édition Limitée
          </Badge>
        )}
        {product.madeInKorea && (
          <Badge className="absolute bottom-2 right-2 bg-blue-500">
            🇰🇷
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
            {product.brand}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
        {product.koreanName && (
          <p className="text-sm text-muted-foreground font-korean">
            {product.koreanName}
          </p>
        )}
        <CardDescription className="text-sm line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          
          {/* Subcategory and Step */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {product.subcategory}
            </Badge>
            {product.step && (
              <Badge variant="outline" className="text-xs">
                Étape {product.step}
              </Badge>
            )}
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {product.size}
            </span>
          </div>
          
          {/* Key Benefits */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Bénéfices principaux :</p>
            <div className="flex flex-wrap gap-1">
              {product.benefits.slice(0, 2).map((benefit) => (
                <Badge key={benefit} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Target Concerns */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Problèmes ciblés :</p>
            <div className="flex flex-wrap gap-1">
              {product.targetConcerns.slice(0, 2).map((concern) => (
                <Badge key={concern} variant="secondary" className="text-xs">
                  {concern}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div className="flex items-center gap-1">
            {product.crueltyFree && (
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                CF
              </Badge>
            )}
            {product.vegan && (
              <Badge variant="outline" className="text-xs">
                <Leaf className="h-3 w-3 mr-1" />
                Vegan
              </Badge>
            )}
            {product.pH && (
              <Badge variant="outline" className="text-xs">
                <Droplets className="h-3 w-3 mr-1" />
                pH {product.pH}
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
