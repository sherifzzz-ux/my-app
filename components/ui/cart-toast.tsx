'use client'

import * as React from "react"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CartToastProps {
  product: {
    name: string
    brand?: string
    price: number
    imageUrl?: string | null
    quantity: number
  }
  onViewCart?: () => void
  className?: string
}

export function CartToast({ product, onViewCart, className }: CartToastProps) {
  return (
    <div className={cn(
      "flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg max-w-sm",
      className
    )}>
      {/* Product image */}
      {product.imageUrl && (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Success indicator */}
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            Ajouté au panier
          </span>
        </div>
        
        {/* Product info */}
        <h4 className="font-medium text-gray-900 text-sm truncate">
          {product.name}
        </h4>
        {product.brand && (
          <p className="text-xs text-gray-500">
            {product.brand}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-gray-900">
            {product.price.toFixed(2)} €
          </span>
          <span className="text-xs text-gray-500">
            Qty: {product.quantity}
          </span>
        </div>
        
        {/* Action button */}
        {onViewCart && (
          <Button
            onClick={onViewCart}
            size="sm"
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
          >
            <ShoppingBag className="w-3 h-3 mr-1" />
            Voir le panier
          </Button>
        )}
      </div>
    </div>
  )
}
