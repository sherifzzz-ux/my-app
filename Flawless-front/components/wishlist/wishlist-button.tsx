"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import type { Product } from "@/types/product"

interface WishlistButtonProps {
  product: Product
  size?: "sm" | "md" | "lg"
  variant?: "default" | "ghost" | "outline"
}

export function WishlistButton({ product, size = "md", variant = "ghost" }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={`${inWishlist ? "text-pink-600 hover:text-pink-700" : "text-gray-400 hover:text-pink-600"}`}
    >
      <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
    </Button>
  )
}
