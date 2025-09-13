'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  User 
} from 'lucide-react'

export function MobileNavSticky() {
  const { data: session } = useSession()

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault()
      window.location.href = '/auth'
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="grid grid-cols-5 h-16">
        <Link 
          href="/" 
          className="mobile-nav-item text-xs hover:bg-accent transition-colors"
        >
          <Home className="mobile-nav-icon" />
          <span>Accueil</span>
        </Link>
        
        <Link 
          href="/search" 
          className="mobile-nav-item text-xs hover:bg-accent transition-colors"
        >
          <Search className="mobile-nav-icon" />
          <span>Recherche</span>
        </Link>
        
        <Link 
          href="/products" 
          className="mobile-nav-item text-xs hover:bg-accent transition-colors"
        >
          <ShoppingBag className="mobile-nav-icon" />
          <span>Produits</span>
        </Link>
        
        <Link 
          href="/favorites" 
          className="mobile-nav-item text-xs hover:bg-accent transition-colors"
        >
          <Heart className="mobile-nav-icon" />
          <span>Favoris</span>
        </Link>
        
        <Link 
          href={session?.user ? "/account" : "/auth"} 
          onClick={handleAccountClick}
          className="mobile-nav-item text-xs hover:bg-accent transition-colors"
        >
          <User className="mobile-nav-icon" />
          <span>Compte</span>
        </Link>
      </div>
    </nav>
  )
}
