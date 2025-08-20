'use client'

import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import Link from 'next/link'
import Image from 'next/image'

export function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Votre liste de souhaits est vide
          </h1>
          <p className="text-gray-600 mb-6">
            Découvrez nos produits et ajoutez vos favoris à votre liste de souhaits
          </p>
          <Link href="/">
            <Button className="bg-pink-600 hover:bg-pink-700">Découvrir nos produits</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma liste de souhaits</h1>
        <p className="text-gray-600">
          {wishlistItems.length} produit{wishlistItems.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((product) => (
          <Card key={product.id} className="group">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-gray-900 hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600">{product.brand}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice} CFA
                      </span>
                    )}
                    <span className="font-bold text-pink-600">{product.price} CFA</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-pink-600 hover:bg-pink-700 mt-3"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
