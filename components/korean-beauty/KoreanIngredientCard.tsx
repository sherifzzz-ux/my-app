import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { KoreanIngredient } from '@/lib/data/korean-beauty'

interface KoreanIngredientCardProps {
  ingredient: KoreanIngredient
}

export function KoreanIngredientCard({ ingredient }: KoreanIngredientCardProps) {
  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'Très Populaire':
        return 'bg-red-500'
      case 'Populaire':
        return 'bg-orange-500'
      case 'Émergent':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-3">{ingredient.icon}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CardTitle className="text-lg">{ingredient.name}</CardTitle>
          <Badge className={`text-white ${getPopularityColor(ingredient.popularity)}`}>
            <Star className="h-3 w-3 mr-1" />
            {ingredient.popularity}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {ingredient.description}
        </CardDescription>
        <p className="text-sm text-muted-foreground font-korean mt-2">
          {ingredient.koreanName}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Benefits */}
          <div>
            <h4 className="text-sm font-medium mb-2">Bénéfices</h4>
            <div className="flex flex-wrap gap-1">
              {ingredient.benefits.map((benefit) => (
                <Badge key={benefit} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Skin Types */}
          <div>
            <h4 className="text-sm font-medium mb-2">Types de peau</h4>
            <div className="flex flex-wrap gap-1">
              {ingredient.skinTypes.map((skinType) => (
                <Badge key={skinType} variant="secondary" className="text-xs">
                  {skinType}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
            <Link href={`/korean-beauty?ingredient=${ingredient.id}`}>
              Découvrir les produits
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
