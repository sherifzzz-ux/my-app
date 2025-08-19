"use client"

import { Home, Grid3X3, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function MobileFooterNav() {
  const { state, dispatch } = useCart()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] shadow-lg">
      <div className="flex items-center justify-around py-2">
        <Link href="/" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600">
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">ACCUEIL</span>
        </Link>

        <Link href="/marques" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600">
          <Grid3X3 className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">MARQUES</span>
        </Link>

        <button
          onClick={() => dispatch({ type: "TOGGLE_CART" })}
          className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 relative"
        >
          <ShoppingCart className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">PANIER</span>
          {state.items.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {state.items.length}
            </div>
          )}
        </button>

        <Link href="/compte" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600">
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">COMPTE</span>
        </Link>
      </div>
    </div>
  )
}
