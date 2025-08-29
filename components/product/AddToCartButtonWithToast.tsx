'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { toast } from '@/hooks/use-toast'
import { CartToast } from '@/components/ui/cart-toast'

interface AddToCartButtonWithToastProps {
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

export default function AddToCartButtonWithToast({
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
}: AddToCartButtonWithToastProps) {
  const { addItem, setIsOpen } = useCart()
  
  const handleAddToCart = () => {
    addItem({ 
      id: productId,
      productId, 
      name, 
      brand: brand || '',
      price: priceCents / 100,
      priceCents, 
      originalPrice: originalPriceCents ? originalPriceCents / 100 : undefined,
      originalPriceCents,
      image: imageUrl || '',
      imageUrl: imageUrl ?? undefined 
    }, quantity)
    
    // Afficher le toast personnalisé
    toast({
      title: '',
      description: '',
      action: (
        <CartToast
          product={{
            name,
            brand,
            price: priceCents / 100,
            imageUrl,
            quantity
          }}
          onViewCart={() => setIsOpen(true)}
        />
      ),
    })
  }

  return (
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
  )
}
