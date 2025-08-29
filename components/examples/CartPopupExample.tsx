'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AddToCartButton from '@/components/product/AddToCartButton'
import AddToCartButtonWithToast from '@/components/product/AddToCartButtonWithToast'
import { CartPopup } from '@/components/ui/cart-popup'

export default function CartPopupExample() {
  const [showCustomPopup, setShowCustomPopup] = useState(false)

  const exampleProduct = {
    productId: 'example-1',
    name: 'Crème hydratante bio',
    brand: 'BioBeauty',
    priceCents: 2500, // 25.00 €
    imageUrl: '/placeholder-product.jpg',
    quantity: 1
  }

  const handleCustomAddToCart = () => {
    setShowCustomPopup(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Démonstration des Popups d'Ajout au Panier
        </h1>
        <p className="text-gray-600">
          Testez les différents types de notifications lors de l'ajout au panier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Popup Modal */}
        <Card>
          <CardHeader>
            <CardTitle>Popup Modal</CardTitle>
            <CardDescription>
              Un popup modal élégant qui s'affiche au centre de l'écran
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddToCartButton
              {...exampleProduct}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              Cliquez pour voir le popup modal avec animation
            </p>
          </CardContent>
        </Card>

        {/* Toast Personnalisé */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Personnalisé</CardTitle>
            <CardDescription>
              Un toast avec design personnalisé et informations du produit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddToCartButtonWithToast
              {...exampleProduct}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              Cliquez pour voir le toast personnalisé
            </p>
          </CardContent>
        </Card>

        {/* Popup Personnalisé */}
        <Card>
          <CardHeader>
            <CardTitle>Popup Personnalisé</CardTitle>
            <CardDescription>
              Un popup contrôlé manuellement avec logique personnalisée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleCustomAddToCart}
              className="w-full"
            >
              Ajouter au panier (Custom)
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Cliquez pour voir le popup personnalisé
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popup personnalisé contrôlé manuellement */}
      <CartPopup
        isOpen={showCustomPopup}
        onClose={() => setShowCustomPopup(false)}
        product={{
          name: exampleProduct.name,
          brand: exampleProduct.brand,
          price: exampleProduct.priceCents / 100,
          imageUrl: exampleProduct.imageUrl,
          quantity: exampleProduct.quantity
        }}
        onViewCart={() => {
          setShowCustomPopup(false)
          // Ici vous pouvez ajouter la logique pour ouvrir le panier
          console.log('Ouvrir le panier')
        }}
        onContinueShopping={() => setShowCustomPopup(false)}
      />
    </div>
  )
}
