'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Heart, ShoppingCart, Star, Eye, Share2 } from 'lucide-react'

export function MicroInteractionsDemo() {
  return (
    <div className="space-y-8">
      {/* Boutons avec animations */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Micro-interactions - Boutons</CardTitle>
          <CardDescription>
            Démonstration des animations sur les boutons et éléments interactifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="hover-scale focus-ring">
              Hover Scale
            </Button>
            <Button variant="outline" className="hover-lift focus-ring">
              Hover Lift
            </Button>
            <Button variant="secondary" className="hover-glow focus-ring">
              Hover Glow
            </Button>
            <Button variant="destructive" className="hover-scale hover-glow focus-ring">
              Combo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cartes de produits avec animations */}
      <Card>
        <CardHeader>
          <CardTitle>🛍️ Cartes de Produits Animées</CardTitle>
          <CardDescription>
            Cartes avec micro-interactions pour améliorer l'engagement utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="product-grid">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden hover-lift hover-glow group">
                <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🛍️</div>
                  </div>
                  <Badge className="absolute top-2 left-2 group-hover:scale-110 transition-transform">
                    -20%
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover-scale"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    Produit {i}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Description du produit
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">(24)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">29.99€</span>
                    <Button size="sm" className="hover-scale focus-ring">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Éléments de navigation avec animations */}
      <Card>
        <CardHeader>
          <CardTitle>🧭 Navigation Animée</CardTitle>
          <CardDescription>
            Éléments de navigation avec micro-interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost" className="hover-lift focus-ring">
              <Eye className="h-4 w-4 mr-2" />
              Voir
            </Button>
            <Button variant="ghost" className="hover-scale focus-ring">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="ghost" className="hover-glow focus-ring">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </Button>
            <Button variant="ghost" className="hover-lift hover-glow focus-ring">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Panier
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* États de focus et d'accessibilité */}
      <Card>
        <CardHeader>
          <CardTitle>♿ Accessibilité & Focus</CardTitle>
          <CardDescription>
            États de focus visibles pour l'accessibilité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Input avec focus ring"
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus-ring"
              />
              <select className="w-full h-10 px-3 border border-gray-300 rounded-md focus-ring">
                <option>Select avec focus ring</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="focus-ring">
                Focus visible
              </Button>
              <Button variant="secondary" className="focus-ring">
                Focus visible
              </Button>
              <Button variant="destructive" className="focus-ring">
                Focus visible
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
