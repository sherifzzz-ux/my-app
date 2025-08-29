'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatCFA } from '@/lib/utils'
import AddToCartButton from '@/components/product/AddToCartButton'

interface HeroProductCardProps {
  product: {
    id: string
    name: string
    imageUrl: string | null
    priceCents: number
    oldPriceCents?: number | null
    brand?: { name: string } | null
  }
  className?: string
}

export function HeroProductCard({ product, className = "" }: HeroProductCardProps) {
  return (
    <div className={`bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Image cliquable pour voir le produit */}
        <div className="order-2 lg:order-1">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.imageUrl || '/placeholder.svg'}
              alt={product.name}
              width={800}
              height={600}
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </Link>
        </div>
        
        <div className="order-1 lg:order-2 text-center lg:text-left">
          {/* Marque */}
          {product.brand?.name && (
            <div className="bg-black text-white px-4 py-2 inline-block rounded mb-4">
              {product.brand.name}
            </div>
          )}
          
          {/* Nom du produit cliquable */}
          <Link href={`/product/${product.id}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 hover:text-pink-600 transition-colors cursor-pointer">
              {product.name}
            </h2>
          </Link>
          
          {/* Prix */}
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
            {product.oldPriceCents ? (
              <>
                <span className="text-lg text-gray-500 line-through">
                  {formatCFA(product.oldPriceCents)}
                </span>
                <span className="text-2xl font-bold text-pink-600">
                  {formatCFA(product.priceCents)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-pink-600">
                {formatCFA(product.priceCents)}
              </span>
            )}
          </div>
          
          {/* Bouton Ajouter au panier */}
          <AddToCartButton
            productId={product.id}
            name={product.name}
            brand={product.brand?.name}
            priceCents={product.priceCents}
            originalPriceCents={product.oldPriceCents || undefined}
            imageUrl={product.imageUrl}
            size="lg"
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3"
          />
        </div>
      </div>
    </div>
  )
}
