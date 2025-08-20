'use client'

import { Search, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { state, dispatch } = useCart()

  const menuItems = {
    PROMOTION: {
      href: '/promotion',
      subcategories: [],
    },
    VISAGE: {
      href: '/soin-du-visage',
      subcategories: [
        { name: 'Protection solaire', href: '/soin-du-visage/protection-solaire' },
        { name: 'Soins du visage par produit', href: '/soin-du-visage/soins-par-produit' },
        { name: 'Soins ciblés', href: '/soin-du-visage/soins-cibles' },
        { name: 'Baumes hydratants lèvres', href: '/soin-du-visage/baumes-levres' },
        { name: 'Démaquillants & Nettoyants', href: '/soin-du-visage/demaquillants-nettoyants' },
        { name: 'Accessoires & Appareils visage', href: '/soin-du-visage/accessoires-appareils' },
      ],
    },
    CORPS: {
      href: '/corps-bain',
      subcategories: [
        { name: 'Soins Corps', href: '/corps-bain/soins-corps' },
        { name: 'Bain & Douche', href: '/corps-bain/bain-douche' },
        { name: 'Epilation', href: '/corps-bain/epilation' },
        { name: 'Hygyène intime', href: '/corps-bain/hygiene-intime' },
        { name: 'Mains & Pieds', href: '/corps-bain/mains-pieds' },
        { name: "L'hygiène Bucco-Dentaire", href: '/corps-bain/hygiene-bucco-dentaire' },
      ],
    },
    MAQUILLAGE: {
      href: '/maquillage',
      subcategories: [
        { name: 'Teint', href: '/maquillage/teint' },
        { name: 'Maquillage Yeux', href: '/maquillage/yeux' },
        { name: 'Lèvres', href: '/maquillage/levres' },
        { name: 'Ongles', href: '/maquillage/ongles' },
        { name: 'Accessoires Maquillage', href: '/maquillage/accessoires' },
        { name: 'Sourcils', href: '/maquillage/sourcils' },
      ],
    },
    PARAPHARMACIE: {
      href: '/parapharmacie',
      subcategories: [
        { name: 'Complément Alimentaire', href: '/parapharmacie/complement-alimentaire' },
        { name: 'Soins du visage', href: '/parapharmacie/soins-visage' },
        { name: 'Soins du corps', href: '/parapharmacie/soins-corps' },
        { name: 'Homme', href: '/parapharmacie/homme' },
      ],
    },
    CADEAUX: {
      href: '/idees-cadeaux',
      subcategories: [],
    },
    CHEUVEUX: {
      href: '/cheveux',
      subcategories: [
        { name: 'Complements alimentaires', href: '/cheveux/complements-alimentaires' },
        { name: 'Routine Capilaire', href: '/cheveux/routine-capilaire' },
        { name: 'Soins cheuveux', href: '/cheveux/soins-cheveux' },
        { name: 'Accessoires & Brosses', href: '/cheveux/accessoires-brosses' },
      ],
    },
    PARFUMERIE: {
      href: '/parfumerie',
      subcategories: [
        { name: 'Parfumerie Femmes', href: '/parfumerie/femmes' },
        { name: 'Parfumerie Hommes', href: '/parfumerie/hommes' },
        { name: 'Huile Parfumé', href: '/parfumerie/huile-parfume' },
      ],
    },
    BÉBÉ: {
      href: '/bebe-enfant',
      subcategories: [
        { name: 'Appareils Bébé', href: '/bebe-enfant/appareils-bebe' },
        { name: 'Securité Enfants', href: '/bebe-enfant/securite-enfants' },
        { name: 'Alimentation Bébé', href: '/bebe-enfant/alimentation-bebe' },
        { name: 'Hygiène Bébé', href: '/bebe-enfant/hygiene-bebe' },
        { name: 'Mmaman & Grossesse', href: '/bebe-enfant/maman-grossesse' },
      ],
    },
    MARQUES: {
      href: '/marques',
      subcategories: [],
    },
    'K-BEAUTY': {
      href: '/korean-skincare',
      subcategories: [],
    },
  }

  return (
    <div className="w-full">
      {/* Top banner */}
      <div className="bg-pink-600 text-white text-center py-2 text-sm font-medium">
        LIVRAISON EN MOINS DE 24H À DAKAR (HORS DIMANCHES/JOURS FÉRIÉS)
      </div>

      {/* Main header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center space-x-3">
              <img
                src="/flawless-beauty-logo.jpg"
                alt="Flawless Beauty"
                className="h-12 w-12 object-contain"
              />
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-serif text-pink-600 italic">Flawless</div>
                <div className="text-sm text-pink-600 font-medium -mt-1">Beauty</div>
              </div>
            </div>

            {/* Desktop search bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  placeholder="Rechercher..."
                  className="pr-10 border-gray-300 focus:border-pink-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex text-pink-600">
                <Heart className="h-5 w-5" />
              </Button>
              <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} className="relative">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {state.items.length}
                </div>
                {state.items.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {state.items.reduce((total, item) => total + item.quantity, 0)}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Input
                placeholder="Rechercher..."
                className="pr-10 border-gray-300 focus:border-pink-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block border-t py-2 relative">
            <div className="flex items-center space-x-1 overflow-x-auto">
              <Link href="/nouveautes">
                <Button
                  variant="ghost"
                  className="whitespace-nowrap text-gray-700 hover:text-pink-600 text-xs px-2 py-1 h-7"
                >
                  NOUVEAUTÉS
                </Button>
              </Link>

              {Object.entries(menuItems).map(([key, item]) => (
                <div key={key}>
                  {item.subcategories.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="whitespace-nowrap flex items-center text-gray-700 hover:text-pink-600 text-xs px-2 py-1 h-7"
                        >
                          <span className="truncate max-w-[100px]">{key}</span>
                          <ChevronDown className="ml-1 h-2 w-2 flex-shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {item.subcategories.map((subcat) => (
                          <DropdownMenuItem key={subcat.name} asChild>
                            <Link href={subcat.href} className="text-xs">
                              {subcat.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className="whitespace-nowrap text-gray-700 hover:text-pink-600 text-xs px-2 py-1 h-7"
                      >
                        <span className="truncate max-w-[100px]">{key}</span>
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden border-t py-4">
              <div className="flex flex-col space-y-2">
                <Link href="/nouveautes">
                  <Button variant="ghost" className="justify-start text-gray-700">
                    NOUVEAUTÉS
                  </Button>
                </Link>
                {Object.entries(menuItems).map(([key, item]) => (
                  <div key={key}>
                    <Button
                      variant="ghost"
                      className="justify-start w-full text-gray-700"
                      onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                    >
                      {key}
                      {item.subcategories.length > 0 && <ChevronDown className="ml-auto h-4 w-4" />}
                    </Button>
                    {activeDropdown === key && item.subcategories.length > 0 && (
                      <div className="mt-1 w-full bg-gray-50 rounded-md">
                        <div className="py-2">
                          {item.subcategories.map((subcat) => (
                            <Link key={subcat.name} href={subcat.href}>
                              <div className="px-6 py-2 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 cursor-pointer">
                                {subcat.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  )
}
