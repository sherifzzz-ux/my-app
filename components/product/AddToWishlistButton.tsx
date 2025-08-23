'use client'

import { WishlistButton } from '@/components/wishlist/WishlistButton'

interface AddToWishlistButtonProps {
  productId: string
  name: string
  brand?: string
  priceCents: number
  originalPriceCents?: number
  imageUrl?: string | null
  rating?: number
  inStock?: boolean
  category?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showText?: boolean
}

export default function AddToWishlistButton({
  productId,
  name,
  brand,
  priceCents,
  originalPriceCents,
  imageUrl,
  rating,
  inStock = true,
  category,
  variant = 'outline',
  size = 'default',
  className,
  showText = true,
}: AddToWishlistButtonProps) {
  return (
    <WishlistButton
      product={{
        productId,
        name,
        brand,
        priceCents,
        originalPriceCents,
        imageUrl,
        rating,
        inStock,
        category,
      }}
      variant={variant}
      size={size}
      className={className}
      showText={showText}
    />
  )
}
