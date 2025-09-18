'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Users, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryHeroProps {
  title: string
  description?: string
  image?: string
  badge?: string
  stats?: {
    products: number
    brands: number
    rating: number
  }
  features?: string[]
  className?: string
}

export function CategoryHero({
  title,
  description,
  image,
  badge,
  stats,
  features = [],
  className
}: CategoryHeroProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Image de fond */}
      {image && (
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          {badge && (
            <Badge variant="secondary" className="mb-4">
              {badge}
            </Badge>
          )}

          {/* Titre */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              {description}
            </p>
          )}

          {/* Statistiques */}
          {stats && (
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                <span className="font-semibold">{stats.products} produits</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">{stats.brands} marques</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{stats.rating}/5</span>
              </div>
            </div>
          )}

          {/* Fonctionnalités */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bouton d'action */}
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            Découvrir les produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dégradé en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
