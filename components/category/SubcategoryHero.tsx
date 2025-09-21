import { CategoryConfig, SubcategoryConfig } from '@/lib/data/subcategories'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Package, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface SubcategoryHeroProps {
  category: CategoryConfig
  subcategory: SubcategoryConfig
}

export function SubcategoryHero({ category, subcategory }: SubcategoryHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icône et badges */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl">{subcategory.icon}</div>
            <div className="flex flex-col gap-2">
              {subcategory.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Recommandé
                </Badge>
              )}
              <Badge variant="outline">
                <Package className="h-3 w-3 mr-1" />
                {subcategory.productCount} produits
              </Badge>
            </div>
          </div>

          {/* Titre et description */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {subcategory.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {subcategory.description}
          </p>

          {/* Statistiques rapides */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Produits populaires</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-sm">Marques de qualité</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="text-sm">Livraison rapide</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={`#products`}>
                Voir les produits
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/${category.id}`}>
                Toute la catégorie {category.name}
              </Link>
            </Button>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Qualité garantie</h3>
                <p>Tous nos produits sont sélectionnés pour leur qualité et leur efficacité.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Conseils experts</h3>
                <p>Nos experts vous accompagnent dans le choix de vos produits.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Retour facile</h3>
                <p>30 jours pour changer d'avis, retour gratuit et sans frais.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
