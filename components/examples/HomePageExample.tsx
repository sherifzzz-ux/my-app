'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/ui/product-card'
import { HeroProductCard } from '@/components/ui/hero-product-card'

export default function HomePageExample() {
  const exampleProducts = [
    {
      id: 'example-1',
      name: 'Crème hydratante bio',
      brand: { name: 'BioBeauty' },
      priceCents: 2500, // 25.00 €
      oldPriceCents: 3000, // 30.00 €
      imageUrl: '/placeholder-product.jpg',
      rating: 4.5
    },
    {
      id: 'example-2',
      name: 'Sérum anti-âge',
      brand: { name: 'SkinCare Pro' },
      priceCents: 4500, // 45.00 €
      imageUrl: '/placeholder-product.jpg',
      rating: 4.8
    },
    {
      id: 'example-3',
      name: 'Masque facial',
      brand: { name: 'BeautyLab' },
      priceCents: 1800, // 18.00 €
      oldPriceCents: 2200, // 22.00 €
      imageUrl: '/placeholder-product.jpg',
      rating: 4.2
    },
    {
      id: 'example-4',
      name: 'Huile essentielle',
      brand: { name: 'NaturalCare' },
      priceCents: 3200, // 32.00 €
      imageUrl: '/placeholder-product.jpg',
      rating: 4.6
    }
  ]

  const heroProduct = {
    id: 'hero-1',
    name: 'Collection Premium Soins du Visage',
    brand: { name: 'LuxuryBeauty' },
    priceCents: 8900, // 89.00 €
    oldPriceCents: 12000, // 120.00 €
    imageUrl: '/placeholder-product.jpg'
  }

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Démonstration de la Page d'Accueil Modifiée
        </h1>
        <p className="text-gray-600">
          Testez les nouvelles fonctionnalités : clic sur le produit pour le voir, bouton "Ajouter au panier" avec popup
        </p>
      </div>

      {/* Section Héro */}
      <Card>
        <CardHeader>
          <CardTitle>Section Héro - Produit Principal</CardTitle>
          <CardDescription>
            Produit mis en avant avec design spécial et bouton "Ajouter au panier"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HeroProductCard product={heroProduct} />
        </CardContent>
      </Card>

      {/* Produits en Vedette */}
      <Card>
        <CardHeader>
          <CardTitle>Produits en Vedette</CardTitle>
          <CardDescription>
            Grille de produits avec boutons "Ajouter au panier" et clic sur le produit pour le voir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showBrand={true}
                showRating={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nouveautés */}
      <Card>
        <CardHeader>
          <CardTitle>Section Nouveautés</CardTitle>
          <CardDescription>
            Produits avec badge "NOUVEAU" et boutons "Ajouter au panier"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exampleProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={`new-${product.id}`}
                product={product}
                showBrand={true}
                showRating={true}
                showNewBadge={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Instructions de Test</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Clic sur l'image du produit :</strong> Redirige vers la page du produit</li>
            <li><strong>Clic sur le nom du produit :</strong> Redirige vers la page du produit</li>
            <li><strong>Bouton "Ajouter au panier" :</strong> Affiche le popup de confirmation</li>
            <li><strong>Dans le popup :</strong> Vous pouvez voir le panier ou continuer les achats</li>
            <li><strong>Responsive :</strong> Testez sur différentes tailles d'écran</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
