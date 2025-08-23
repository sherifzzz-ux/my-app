'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { toast } from '@/hooks/use-toast'

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
  
  const handleAddToCart = () => {
    addItem({ 
      productId, 
      name, 
      brand,
      priceCents, 
      originalPriceCents,
      imageUrl: imageUrl ?? undefined 
    }, quantity)
    
    toast({
      title: 'Ajouté au panier',
      description: `${quantity}x ${name}`,
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
