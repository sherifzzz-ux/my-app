'use client'

import { ProductImageOptimized, CategoryImageOptimized, HeroImageOptimized } from './ProductImageOptimized'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Badge } from './badge'

export function ImageOptimizationDemo() {
  const demoImages = [
    {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Produit de beauté 1",
      title: "Crème hydratante",
      price: "29.99€"
    },
    {
      src: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Produit de beauté 2", 
      title: "Sérum anti-âge",
      price: "45.99€"
    },
    {
      src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Produit de beauté 3",
      title: "Masque purifiant",
      price: "19.99€"
    },
    {
      src: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Produit de beauté 4",
      title: "Nettoyant doux",
      price: "15.99€"
    }
  ]

  const categoryImages = [
    {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      alt: "Soins du visage",
      title: "Soins du visage"
    },
    {
      src: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      alt: "Maquillage",
      title: "Maquillage"
    },
    {
      src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      alt: "Cheveux",
      title: "Cheveux"
    },
    {
      src: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      alt: "Parfums",
      title: "Parfums"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Images Hero */}
      <Card>
        <CardHeader>
          <CardTitle>🖼️ Images Hero Optimisées</CardTitle>
          <CardDescription>
            Images prioritaires avec lazy loading et placeholder blur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <HeroImageOptimized
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Hero image optimisée"
              className="w-full h-full"
              priority={true}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Image Hero Optimisée</h3>
                <p className="text-sm opacity-90">Chargement prioritaire avec placeholder</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille de Produits */}
      <Card>
        <CardHeader>
          <CardTitle>🛍️ Grille de Produits Optimisée</CardTitle>
          <CardDescription>
            Images de produits avec lazy loading et optimisations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="product-grid">
            {demoImages.map((image, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <ProductImageOptimized
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full"
                    priority={index < 2} // Les 2 premières images sont prioritaires
                  />
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    -20%
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-1">{image.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Description du produit
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{image.price}</span>
                    <Badge variant="outline">En stock</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grille de Catégories */}
      <Card>
        <CardHeader>
          <CardTitle>📂 Grille de Catégories Optimisée</CardTitle>
          <CardDescription>
            Images de catégories avec lazy loading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="category-grid">
            {categoryImages.map((image, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32 w-full">
                  <CategoryImageOptimized
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-center">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
