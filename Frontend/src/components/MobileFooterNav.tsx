"use client"

import { Home, Grid3X3, ShoppingCart, User, Heart } from 'lucide-react'
import { Link } from "react-router-dom"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"

export default function MobileFooterNav() {
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-[9999] shadow-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        <Link to="/" className="flex flex-col items-center py-2 px-3 text-muted-foreground hover:text-primary transition-colors">
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">ACCUEIL</span>
        </Link>
        
        <Link to="/favoris" className="flex flex-col items-center py-2 px-3 text-muted-foreground hover:text-primary transition-colors relative">
          <div className="relative">
            <Heart className="h-6 w-6 mb-1" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">FAVORIS</span>
        </Link>
        
        <Link to="/panier" className="flex flex-col items-center py-2 px-3 text-muted-foreground hover:text-primary transition-colors relative">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 mb-1" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">PANIER</span>
        </Link>
        
        <Link to="/compte" className="flex flex-col items-center py-2 px-3 text-muted-foreground hover:text-primary transition-colors">
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">COMPTE</span>
        </Link>
      </div>
    </div>
  )
}

export { MobileFooterNav }