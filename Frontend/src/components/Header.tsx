"use client"

import { Search, Heart, Menu, X, ChevronDown, ShoppingCart, User, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useWishlist } from "@/hooks/useWishlist"

export function Header() {
  const navigate = useNavigate()
  const { wishlistCount } = useWishlist()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const menuItems = {
    "SOIN DU VISAGE": {
      href: "/soin-du-visage",
      subcategories: [
        { name: "Protection solaire", href: "/soin-du-visage/protection-solaire" },
        { name: "Soins du visage par produit", href: "/soin-du-visage/par-produit" },
        { name: "Soins ciblés", href: "/soin-du-visage/soins-cibles" },
        { name: "Baumes hydratants lèvres", href: "/soin-du-visage/baumes-levres" },
        { name: "Démaquillants & Nettoyants", href: "/soin-du-visage/demaquillants-nettoyants" },
      ],
    },
    "CORPS & BAIN": {
      href: "/corps-bain",
      subcategories: [
        { name: "Soins Corps", href: "/corps-bain/soins-corps" },
        { name: "Bain & Douche", href: "/corps-bain/bain-douche" },
        { name: "Epilation", href: "/corps-bain/epilation" },
        { name: "Hygiène intime", href: "/corps-bain/hygiene-intime" },
        { name: "Mains & Pieds", href: "/corps-bain/mains-pieds" },
      ],
    },
    PARAPHARMACIE: {
      href: "/parapharmacie",
      subcategories: [
        { name: "Complément Alimentaire", href: "/parapharmacie/complement-alimentaire" },
        { name: "Soins du visage", href: "/parapharmacie/soins-visage" },
        { name: "Soins du corps", href: "/parapharmacie/soins-corps" },
      ],
    },
    CHEVEUX: {
      href: "/cheveux",
      subcategories: [
        { name: "Compléments alimentaires", href: "/cheveux/complements-alimentaires" },
        { name: "Routine Capillaire", href: "/cheveux/routine-capillaire" },
        { name: "Soins cheveux", href: "/cheveux/soins-cheveux" },
      ],
    },
    PARFUMERIE: {
      href: "/parfumerie",
      subcategories: [
        { name: "Parfumerie Femmes", href: "/parfumerie/femmes" },
        { name: "Parfumerie Hommes", href: "/parfumerie/hommes" },
        { name: "Huile Parfumé bougie parfumée", href: "/parfumerie/huiles-bougies" },
      ],
    },
  }

  return (
    <div className="w-full">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        LIVRAISON EN MOINS DE 24H À DAKAR (HORS DIMANCHES/JOURS FÉRIÉS)
      </div>

      {/* Main header */}
      <header className="bg-background border-b">
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
            <Link to="/" className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-bold text-primary font-playfair">
                Flawless Beauty
              </div>
              <div className="text-xs text-muted-foreground hidden md:block">
                Parapharmacie en ligne & Cosmétiques
              </div>
            </Link>

            {/* Desktop search bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input 
                  placeholder="Recherche..." 
                  className="pr-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-primary transition-colors"
                >
                  <Search className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/favoris">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1 relative">
                  <Heart className="h-5 w-5" />
                  <span className="hidden lg:inline text-xs">Favoris</span>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/panier">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden lg:inline text-xs">Panier</span>
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                </Button>
              </Link>
              <Link to="/compte">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline text-xs">Compte</span>
                </Button>
              </Link>
              <Link to="/promotions">
                <Button variant="outline" size="sm" className="text-xs">
                  PROMOS
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                placeholder="Recherche..." 
                className="pr-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </button>
            </form>
          </div>

          <nav className="hidden md:block border-t py-3 relative">
            <div className="flex items-center justify-center space-x-1 text-xs">
              <Link to="/promotions">
                <Button variant="ghost" className="whitespace-nowrap text-primary font-semibold px-1 py-1 h-8">
                  PROMOTION
                </Button>
              </Link>

              {Object.entries(menuItems).map(([key, item]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to={item.href}>
                    <Button variant="ghost" className="whitespace-nowrap flex items-center px-1 py-1 h-8 hover:bg-accent">
                      {key}
                      <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200" />
                    </Button>
                  </Link>

                  {/* Dropdown Menu */}
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-background border border-border rounded-lg shadow-2xl z-[1000] animate-fade-in overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-3 border-b border-border">
                        <h3 className="font-semibold text-foreground text-sm">{key}</h3>
                        <p className="text-xs text-muted-foreground">Découvrez notre sélection</p>
                      </div>
                      <div className="py-2 bg-background">
                        {item.subcategories.map((subcat, index) => (
                          <Link key={subcat.name} to={subcat.href}>
                            <div className={`px-4 py-3 text-sm text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-foreground cursor-pointer transition-all duration-200 border-l-4 border-transparent hover:border-primary group ${
                              index !== item.subcategories.length - 1 ? 'border-b border-border/30' : ''
                            }`}>
                              <div className="flex items-center justify-between">
                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                  {subcat.name}
                                </span>
                                <ChevronDown className="h-3 w-3 -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                              </div>
                            </div>
                          </Link>
                        ))}
                        <div className="px-4 py-3 border-t border-border/30 mt-2">
                          <Link to={item.href}>
                            <Button size="sm" className="w-full text-xs">
                              Voir toute la catégorie {key}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invisible bridge to prevent dropdown from closing */}
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 w-72 h-1 bg-transparent z-[999]" />
                  )}
                </div>
              ))}

              <Link to="/grossesse-post-partum">
                <Button variant="ghost" className="whitespace-nowrap px-1 py-1 h-8">
                  GROSSESSE
                </Button>
              </Link>
              
              <Link to="/marques">
                <Button variant="ghost" className="whitespace-nowrap px-1 py-1 h-8">
                  MARQUES
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile navigation with dropdown menus */}
          {isMobileMenuOpen && (
            <nav className="md:hidden border-t py-4">
              <div className="flex flex-col space-y-2">
                <Link to="/promotions">
                  <Button variant="ghost" className="justify-start text-primary font-semibold">
                    PROMOTION
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
                      <div className="mt-1 w-full bg-muted rounded-md">
                        <div className="py-2">
                          {item.subcategories.map((subcat) => (
                            <Link key={subcat.name} to={subcat.href}>
                              <div className="px-6 py-2 text-sm text-foreground hover:bg-accent cursor-pointer">
                                {subcat.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <Link to="/grossesse-post-partum">
                  <Button variant="ghost" className="justify-start">
                    GROSSESSE ET POST-PARTUM
                  </Button>
                </Link>
                <Link to="/marques">
                  <Button variant="ghost" className="justify-start">
                    MARQUES
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  )
}