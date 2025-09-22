'use client'

import { Search, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { HeaderNavigation } from '@/components/navigation/HeaderNavigation'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Délais d'ouverture/fermeture pour menus déroulants (hover-intent desktop)
  const openTimeoutRef = useRef<number | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)
  const desktopNavRef = useRef<HTMLDivElement | null>(null)

  const handleItemEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
    openTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(key)
    }, 80)
  }

  const handleItemLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const cancelCloseAndKeepOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    // Fermer le dropdown lors du scroll horizontal de la barre de menu
    const navEl = desktopNavRef.current
    const handleScroll = () => setActiveDropdown(null)
    if (navEl)
      navEl.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      if (navEl) navEl.removeEventListener('scroll', handleScroll as EventListener)
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const menuItems: Record<
    string,
    { href: string; subcategories: { name: string; href: string }[] }
  > = {
    PROMOTION: {
      href: '/promotions',
      subcategories: [],
    },
    'SOIN DU VISAGE': {
      href: '/soin-du-visage',
      subcategories: [
        { name: 'Protection solaire', href: '/soin-du-visage/protection-solaire' },
        { name: 'Soins du visage par produit', href: '/soin-du-visage/soins-par-produit' },
        { name: 'Soins ciblés', href: '/soin-du-visage/soins-cibles' },
        { name: 'Baumes hydratants lèvres', href: '/soin-du-visage/baumes-levres' },
        { name: 'Démaquillants & Nettoyants', href: '/soin-du-visage/demaquillants-nettoyants' },
      ],
    },
    'CORPS & BAIN': {
      href: '/corps-bain',
      subcategories: [
        { name: 'Soins Corps', href: '/corps-bain/sous-categorie/soins-corps' },
        { name: 'Bain & Douche', href: '/corps-bain/sous-categorie/bain-douche' },
        { name: 'Épilation', href: '/corps-bain/sous-categorie/epilation' },
        { name: 'Hygiène intime', href: '/corps-bain/sous-categorie/hygiene-intime' },
        { name: 'Mains & Pieds', href: '/corps-bain/sous-categorie/mains-pieds' },
      ],
    },
    PARAPHARMACIE: {
      href: '/parapharmacie',
      subcategories: [
        { name: 'Complément Alimentaire', href: '/parapharmacie/sous-categorie/complements' },
        { name: 'Soins du visage', href: '/parapharmacie/sous-categorie/soins-visage' },
        { name: 'Soins du corps', href: '/parapharmacie/sous-categorie/soins-corps' },
      ],
    },
    CHEVEUX: {
      href: '/cheveux',
      subcategories: [
        { name: 'Compléments alimentaires', href: '/cheveux/sous-categorie/complements-alimentaires' },
        { name: 'Routine capillaire', href: '/cheveux/sous-categorie/routine-capillaire' },
        { name: 'Soins cheveux', href: '/cheveux/sous-categorie/soins-cheveux' },
      ],
    },
    PARFUMERIE: {
      href: '/parfumerie',
      subcategories: [
        { name: 'Parfumerie Femmes', href: '/parfumerie/sous-categorie/parfums-femme' },
        { name: 'Parfumerie Hommes', href: '/parfumerie/sous-categorie/parfums-homme' },
        { name: 'Eaux de toilette', href: '/parfumerie/sous-categorie/eaux-de-toilette' },
        { name: 'Coffrets parfums', href: '/parfumerie/sous-categorie/coffrets-parfums' },
      ],
    },
    'GROSSESSE ET POST-PARTUM': {
      href: '/grossesse-post-partum',
      subcategories: [],
    },
    MARQUES: {
      href: '/marques',
      subcategories: [],
    },
  }

  const orderedMenuKeys = [
    'PROMOTION',
    'SOIN DU VISAGE',
    'CORPS & BAIN',
    'PARAPHARMACIE',
    'CHEVEUX',
    'PARFUMERIE',
    'GROSSESSE ET POST-PARTUM',
    'MARQUES',
  ]

  return (
    <div className="w-full">
      {/* Top banner */}
      <div className="bg-[#F792CC] text-white text-center py-2 text-sm">
        LIVRAISON EN MOINS DE 24H À DAKAR (HORS DIMANCHES/JOURS FÉRIÉS)
      </div>

      {/* Main header */}
      <header className="bg-white border-b">
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

            {/* Logo - centered on mobile, left on desktop */}
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-bold text-[#F792CC]">FlawlessBeauty</div>
              <div className="text-xs text-gray-500 hidden md:block">
                Parapharmacie en ligne & Cosmétiques
              </div>
            </div>

            {/* Desktop search bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input placeholder="Recherche..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <div className="relative">
              <Input placeholder="Recherche..." className="pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <nav className="hidden md:block border-t py-3 relative">
            <div ref={desktopNavRef} className="bg-gray-50 rounded-lg border px-3 py-2">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Link href="/nouveautes">
                  <Button variant="ghost" size="sm" className="whitespace-nowrap text-xs px-2">
                    NOUVEAUTÉS
                  </Button>
                </Link>
                {orderedMenuKeys.map((key) => {
                  const item = menuItems[key]
                  return (
                    <div
                      key={key}
                      className="relative"
                      onMouseEnter={() => handleItemEnter(key)}
                      onMouseLeave={handleItemLeave}
                    >
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`whitespace-nowrap flex items-center hover:text-[#F792CC] text-xs px-2 ${activeDropdown === key ? 'text-[#F792CC]' : ''}`}
                          onClick={() => setActiveDropdown(key)}
                          onFocus={() => setActiveDropdown(key)}
                        >
                          {key}
                          {item.subcategories.length > 0 && (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      </Link>
                      {activeDropdown === key && item.subcategories.length > 0 && (
                        <div
                          className="absolute z-[10000] left-1/2 -translate-x-1/2 top-full mt-2"
                          onMouseEnter={cancelCloseAndKeepOpen}
                          onMouseLeave={handleItemLeave}
                        >
                          <div className="w-80 bg-white rounded-xl shadow-xl border border-[#F792CC]/30 ring-1 ring-[#F792CC]/15 overflow-hidden">
                            <div className="h-1 w-full bg-[#F792CC]" />
                            <div className="py-1">
                              {menuItems[activeDropdown]?.subcategories?.map((subcat) => (
                                <Link key={subcat.name} href={subcat.href}>
                                  <div className="px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFDAFC] hover:text-[#F792CC] cursor-pointer transition-colors">
                                    {subcat.name}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Mobile navigation with dropdown menus */}
          {isMobileMenuOpen && (
            <nav className="md:hidden border-t py-4">
              <div className="flex flex-col space-y-2">
                <Link href="/nouveautes">
                  <Button variant="ghost" className="justify-start">
                    NOUVEAUTÉS
                  </Button>
                </Link>
                {Object.entries(menuItems).map(([key, item]) => (
                  <div key={key}>
                    <Button
                      variant="ghost"
                      className="justify-start w-full"
                      onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                    >
                      {key}
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                    {activeDropdown === key && (
                      <div className="mt-1 w-full bg-gray-50 rounded-md">
                        <div className="py-2">
                          {item.subcategories.map((subcat) => (
                            <Link key={subcat.name} href={subcat.href}>
                              <div className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                {subcat.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Liens statiques retirés pour éviter les doublons avec menuItems */}
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
