'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '@/contexts/cart-context'
import { useWishlist } from '@/contexts/wishlist-context'
import type { Product } from '@/types/product'
import { getRelatedProducts } from '@/lib/products-data'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const relatedProducts = getRelatedProducts(product.id)
  const images = product.images || [product.image]
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">
              Accueil
            </Link>
            <span>/</span>
            <Link
              href={`/categories/${product.category}`}
              className="hover:text-pink-600 capitalize"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={images[selectedImageIndex] || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Image précédente"
                    title="Image précédente"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Image suivante"
                    title="Image suivante"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronRight aria-hidden="true" className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Voir l'image ${index + 1}`}
                    title={`Voir l'image ${index + 1}`}
                    className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-pink-600 font-medium">{product.brand}</p>
                <div className="flex items-center space-x-2">
                  {isWishlisted ? (
                    <button
                      type="button"
                      onClick={toggleWishlist}
                      aria-label="Retirer des favoris"
                      title="Retirer des favoris"
                      aria-pressed="true"
                      className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-100 hover:text-pink-600"
                    >
                      <Heart aria-hidden="true" className="w-5 h-5 fill-current" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={toggleWishlist}
                      aria-label="Ajouter aux favoris"
                      title="Ajouter aux favoris"
                      aria-pressed="false"
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
                    >
                      <Heart aria-hidden="true" className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label="Partager ce produit"
                    title="Partager ce produit"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
                  >
                    <Share2 aria-hidden="true" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-pink-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
                {product.isOnSale && <Badge variant="destructive">Promotion</Badge>}
                {product.isNew && <Badge className="bg-[#FFDAFC] text-[#F792CC]">Nouveau</Badge>}
              </div>

              <p className="text-gray-700 mb-6">{product.shortDescription}</p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-[#F792CC] font-medium">✓ En stock</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Rupture de stock</span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Quantité:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Diminuer la quantité"
                    title="Diminuer la quantité"
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Augmenter la quantité"
                    title="Augmenter la quantité"
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 text-lg font-medium"
              >
                {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="usage">Mode d'emploi</TabsTrigger>
              <TabsTrigger value="ingredients">Composition</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviewCount || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Description du produit</h3>
                <p className="text-gray-700 mb-6">{product.description}</p>

                {product.benefits && (
                  <div>
                    <h4 className="font-semibold mb-3">Bénéfices:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Mode d'emploi</h3>
                {product.usage && (
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {product.usage.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Composition</h3>
                {product.ingredients && (
                  <div className="text-gray-700">
                    <p className="mb-2">Ingrédients (INCI):</p>
                    <p className="text-sm leading-relaxed">{product.ingredients.join(', ')}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Avis clients</h3>
                <p className="text-gray-600">Les avis clients seront bientôt disponibles.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={relatedProduct.image || '/placeholder.svg'}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-pink-600 font-medium">{relatedProduct.brand}</p>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pink-600">{relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
