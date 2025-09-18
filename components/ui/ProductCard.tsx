'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    category?: { name: string } | string
    priceCents?: number
    price?: number
    oldPriceCents?: number | null
    originalPrice?: number
    imageUrl?: string | null
    image?: string
    stock?: number
    inStock?: boolean
    isNew?: boolean
    isPromo?: boolean
    isOnSale?: boolean
    discountPercentage?: number
    brand?: string
    rating?: number
    reviews?: number
    tags?: string[]
    description?: string
  }
  className?: string
  showWishlist?: boolean
  showRating?: boolean
  showDescription?: boolean
  viewMode?: 'grid' | 'list'
}

function formatCFA(cents: number) {
  return `${(cents / 100).toLocaleString()} FCFA`
}

function formatPrice(price: number) {
  return `${price.toLocaleString()} FCFA`
}

export function ProductCard({ 
  product, 
  className = "", 
  showWishlist = true, 
  showRating = false,
  showDescription = false,
  viewMode = 'grid'
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Adapter les données selon le format
  const price = product.priceCents ? product.priceCents / 100 : (product.price || 0);
  const oldPrice = product.oldPriceCents ? product.oldPriceCents / 100 : (product.originalPrice || 0);
  const imageUrl = product.imageUrl || product.image || '/placeholder-product.jpg';
  const categoryName = typeof product.category === 'string' ? product.category : product.category?.name || '';
  const inStock = product.stock !== undefined ? product.stock > 0 : (product.inStock || false);
  const isOnSale = product.isPromo || product.isOnSale || false;
  const discountPercentage = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  if (viewMode === 'list') {
    return (
      <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${className}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <Link href={`/product/${product.id}`} className="block flex-shrink-0">
              <div className="relative w-24 h-24">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </div>
            </Link>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  {product.brand && (
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  )}
                </div>
                {showWishlist && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className={`p-2 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>
              
              {showDescription && product.description && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(price)}
                  </span>
                  {oldPrice > price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(oldPrice)}
                    </span>
                  )}
                </div>
                
                <Button size="sm" disabled={!inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {inStock ? 'Ajouter' : 'Rupture'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${className}`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* Product Image - Clickable to view product */}
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative w-full h-64">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
            </div>
          </Link>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isNew && (
              <Badge className="bg-success text-success-foreground shadow-md">
                Nouveau
              </Badge>
            )}
            {isOnSale && discountPercentage > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md">
                -{discountPercentage}%
              </Badge>
            )}
            {categoryName && (
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground shadow-md">
                {categoryName}
              </Badge>
            )}
            {!inStock && (
              <Badge variant="destructive" className="shadow-md">
                Rupture
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          {showWishlist && (
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white shadow-md"
                onClick={handleWishlistToggle}
              >
                <Heart 
                  className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Product Name - Clickable to view product */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
          )}

          {/* Rating */}
          {showRating && product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews || 0})
              </span>
            </div>
          )}

          {/* Description */}
          {showDescription && product.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Stock Status */}
          <div className="text-xs mb-3">
            {inStock ? (
              <span className="text-[#F792CC]">En stock</span>
            ) : (
              <span className="text-red-600">Rupture de stock</span>
            )}
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Always visible at bottom */}
          <Button 
            className="w-full" 
            size="sm"
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {!inStock ? 'Indisponible' : 'Ajouter au panier'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
