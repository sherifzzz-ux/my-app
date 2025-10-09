'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { CartPopup } from '@/components/ui/cart-popup'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface AddToCartButtonProps {
  productId: string
  name: string
  brand?: string
  priceCents: number
  originalPriceCents?: number
  imageUrl?: string | null
  quantity?: number
  disabled?: boolean
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  className?: string
}

export default function AddToCartButton({
  productId,
  name,
  brand,
  priceCents,
  originalPriceCents,
  imageUrl,
  quantity = 1,
  disabled = false,
  size = 'default',
  variant = 'default',
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  
  const handleAddToCart = () => {
    addItem({ 
      id: productId, // Utiliser productId comme id
      productId, 
      name, 
      brand: brand || '',
      price: priceCents / 100, // Convertir en prix décimal
      priceCents, 
      originalPrice: originalPriceCents ? originalPriceCents / 100 : undefined,
      originalPriceCents,
      image: imageUrl || '', // Utiliser imageUrl comme image
      imageUrl: imageUrl ?? undefined 
    }, quantity)
    
    setShowPopup(true)
  }

  const handleViewCart = () => {
    setShowPopup(false)
    router.push('/cart')
  }

  const handleContinueShopping = () => {
    setShowPopup(false)
  }

  return (
    <>
      <Button
        onClick={handleAddToCart}
        disabled={disabled}
        size={size}
        variant={variant}
        className={className}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Ajouter au panier
      </Button>

      <CartPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        product={{
          name,
          brand,
          price: priceCents / 100,
          imageUrl,
          quantity
        }}
        onViewCart={handleViewCart}
        onContinueShopping={handleContinueShopping}
      />
    </>
  )
}
