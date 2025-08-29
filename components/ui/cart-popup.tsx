'use client'

import * as React from "react"
import { CheckCircle, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CartPopupProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    brand?: string
    price: number
    imageUrl?: string | null
    quantity: number
  }
  onViewCart?: () => void
  onContinueShopping?: () => void
}

export function CartPopup({
  isOpen,
  onClose,
  product,
  onViewCart,
  onContinueShopping
}: CartPopupProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(), 300) // Wait for animation to complete
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div
        className={cn(
          "relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Fermer le popup"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Success icon and title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Produit ajouté au panier !
            </h3>
            <p className="text-gray-600">
              Votre produit a été ajouté avec succès
            </p>
          </div>

          {/* Product info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4">
              {product.imageUrl && (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                {product.brand && (
                  <p className="text-sm text-gray-500">
                    {product.brand}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {product.price.toFixed(2)} €
                  </span>
                  <span className="text-sm text-gray-500">
                    Quantité: {product.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            {onViewCart && (
              <Button
                onClick={onViewCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Voir le panier
              </Button>
            )}
            
            {onContinueShopping && (
              <Button
                onClick={onContinueShopping}
                variant="outline"
                className="w-full"
              >
                Continuer les achats
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
