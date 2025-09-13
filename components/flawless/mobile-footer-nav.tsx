'use client'

import { Home, Grid3X3, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'

export default function MobileFooterNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-[9999] shadow-lg md:hidden">
      <div className="grid grid-cols-4">
        <Link
          href="/"
          className="mobile-nav-item text-gray-600 hover:text-primary transition-colors"
        >
          <Home className="mobile-nav-icon" />
          <span className="text-xs font-medium">ACCUEIL</span>
        </Link>

        <Link
          href="/marques"
          className="mobile-nav-item text-gray-600 hover:text-primary transition-colors"
        >
          <Grid3X3 className="mobile-nav-icon" />
          <span className="text-xs font-medium">MARQUES</span>
        </Link>

        <Link
          href="/panier"
          className="mobile-nav-item text-gray-600 hover:text-primary transition-colors"
        >
          <ShoppingCart className="mobile-nav-icon" />
          <span className="text-xs font-medium">PANIER</span>
        </Link>

        <Link
          href="/compte"
          className="mobile-nav-item text-gray-600 hover:text-primary transition-colors"
        >
          <User className="mobile-nav-icon" />
          <span className="text-xs font-medium">COMPTE</span>
        </Link>
      </div>
    </div>
  )
}

export { MobileFooterNav }
