/**
 * Composant HeaderWithNavigation - Header avec navigation intégrée
 * Remplace le header existant avec notre nouvelle navigation
 */

'use client'

import { Search, Heart, Menu, X, ShoppingBag, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Link from 'next/link'
import { HeaderNavigation } from './HeaderNavigation'
import { MobileMenu } from './MobileMenu'

export function HeaderWithNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Barre principale */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FB</span>
              </div>
              <span className="font-bold text-xl">Flawless Beauty</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <HeaderNavigation />
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="hover-lift focus-ring">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Favoris</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="hover-lift focus-ring">
                <ShoppingBag className="h-4 w-4" />
                <span className="sr-only">Panier</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="hover-lift focus-ring">
                <User className="h-4 w-4" />
                <span className="sr-only">Compte</span>
              </Button>
            </div>

            {/* Bouton menu mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover-lift focus-ring"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        <div className="sm:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  )
}
