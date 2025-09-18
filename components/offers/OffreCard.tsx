import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Tag, Users, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { OffreSpeciale } from '@/lib/data/offres-speciales'

interface OffreCardProps {
  offre: OffreSpeciale
  viewMode?: 'grid' | 'list'
}

export function OffreCard({ offre, viewMode = 'grid' }: OffreCardProps) {
  const endDate = new Date(offre.endDate)
  const today = new Date()
  const diffTime = endDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const isEndingSoon = diffDays <= 7 && diffDays > 0

  if (viewMode === 'list') {
    return (
      <Card className="flex flex-row overflow-hidden">
        <div className="relative w-48 h-32 flex-shrink-0">
          <Image
            src={offre.image}
            alt={offre.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white">
              -{offre.discountPercentage}%
            </Badge>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <CardTitle className="text-xl mb-1">{offre.title}</CardTitle>
              <CardDescription className="text-sm mb-2">
                {offre.brand} • {offre.category}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-500">
                {offre.salePrice}€
              </div>
              <div className="text-sm text-muted-foreground line-through">
                {offre.originalPrice}€
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {offre.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {diffDays > 0 ? `${diffDays} jours restants` : 'Expiré'}
              </div>
              {offre.isLimited && offre.remainingQuantity && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {offre.remainingQuantity} restants
                </div>
              )}
            </div>
            <Button asChild>
              <Link href={`/offres/${offre.id}`}>
                Voir l&apos;offre
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
          src={offre.image}
          alt={offre.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className="bg-red-500 text-white text-lg px-3 py-1">
            -{offre.discountPercentage}%
          </Badge>
          {isEndingSoon && (
            <Badge className="bg-orange-500 text-white">
              Bientôt terminé
            </Badge>
          )}
          {offre.isLimited && (
            <Badge variant="secondary" className="bg-white/90 text-black">
              Quantité limitée
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <CardTitle className="text-lg mb-1">{offre.title}</CardTitle>
            <CardDescription className="text-sm">
              {offre.brand} • {offre.category}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-red-500">
              {offre.salePrice}€
            </div>
            <div className="text-sm text-muted-foreground line-through">
              {offre.originalPrice}€
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {offre.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {offre.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {diffDays > 0 ? `${diffDays} jours restants` : 'Expiré'}
            </div>
            {offre.isLimited && offre.remainingQuantity && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                {offre.remainingQuantity} restants
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {offre.products.length} produit{offre.products.length > 1 ? 's' : ''}
            </div>
            <Button size="sm" asChild>
              <Link href={`/offres/${offre.id}`}>
                Voir l&apos;offre
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
