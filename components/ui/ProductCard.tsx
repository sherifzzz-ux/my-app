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
    category: { name: string }
    priceCents: number
    oldPriceCents?: number | null
    imageUrl?: string | null
    stock: number
    isNew?: boolean
    isPromo?: boolean
    discountPercentage?: number
  }
  className?: string
  showWishlist?: boolean
  showRating?: boolean
  showDescription?: boolean
}

function formatCFA(cents: number) {
  return `${(cents / 100).toLocaleString()} FCFA`
}

export function ProductCard({ 
  product, 
  className = "", 
  showWishlist = true, 
  showRating = false,
  showDescription = false 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const price = product.priceCents;
  const oldPrice = product.oldPriceCents;
  const discountPercentage = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${className}`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* Product Image - Clickable to view product */}
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative w-full h-64">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image non disponible</span>
                </div>
              )}
            </div>
          </Link>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isNew && (
              <Badge className="bg-success text-success-foreground shadow-md">
                Nouveau
              </Badge>
            )}
            {product.isPromo && discountPercentage > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md">
                -{discountPercentage}%
              </Badge>
            )}
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground shadow-md">
              {product.category.name}
            </Badge>
            {product.stock === 0 && (
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

          {/* Stock Status */}
          <div className="text-xs mb-3">
            {product.stock > 0 ? (
              <span className="text-[#F792CC]">En stock: {product.stock}</span>
            ) : (
              <span className="text-red-600">Rupture de stock</span>
            )}
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              {formatCFA(price)}
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                {formatCFA(oldPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Always visible at bottom */}
          <Button 
            className="w-full" 
            size="sm"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
