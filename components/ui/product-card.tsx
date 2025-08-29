'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatCFA } from '@/lib/utils'
import AddToCartButton from '@/components/product/AddToCartButton'

interface ProductCardProps {
  product: {
    id: string
    name: string
    imageUrl: string | null
    priceCents: number
    oldPriceCents?: number | null
    brand?: { name: string } | null
    rating?: number | null
  }
  showBrand?: boolean
  showRating?: boolean
  showNewBadge?: boolean
  className?: string
}

export function ProductCard({ 
  product, 
  showBrand = true, 
  showRating = true, 
  showNewBadge = false,
  className = "" 
}: ProductCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {showNewBadge && (
        <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full z-10">
          NOUVEAU
        </div>
      )}
      
      {/* Image cliquable pour voir le produit */}
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        {/* Marque */}
        {showBrand && product.brand?.name && (
          <div className="text-sm text-gray-500 mb-1">{product.brand.name}</div>
        )}
        
        {/* Nom du produit */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {/* Note */}
        {showRating && product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-sm" aria-hidden>
              {'★'.repeat(Math.round(product.rating))}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}
        
        {/* Prix */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.oldPriceCents ? (
              <>
                <span className="text-sm text-gray-500 line-through mr-2">
                  {formatCFA(product.oldPriceCents)}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCFA(product.priceCents)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatCFA(product.priceCents)}
              </span>
            )}
          </div>
        </div>
        
        {/* Bouton Ajouter au panier */}
        <AddToCartButton
          productId={product.id}
          name={product.name}
          brand={product.brand?.name}
          priceCents={product.priceCents}
          originalPriceCents={product.oldPriceCents || undefined}
          imageUrl={product.imageUrl}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white"
        />
      </div>
    </div>
  )
}
