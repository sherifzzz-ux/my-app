"use client";

import { Search, Heart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems: Record<
    string,
    { href: string; subcategories: { name: string; href: string }[] }
  > = {
    "SOIN DU VISAGE": {
      href: "/soin-du-visage",
      subcategories: [
        { name: "Nettoyants", href: "/soin-du-visage/nettoyants" },
        { name: "Sérums", href: "/soin-du-visage/serums" },
        { name: "Crèmes hydratantes", href: "/soin-du-visage/cremes-hydratantes" },
        { name: "Masques", href: "/soin-du-visage/masques" },
        { name: "Contour des yeux", href: "/soin-du-visage/contour-yeux" },
        { name: "Protection solaire", href: "/soin-du-visage/protection-solaire" },
      ],
    },
    "CORPS & BAIN": {
      href: "/corps-bain",
      subcategories: [
        { name: "Gels douche", href: "/corps-bain/gels-douche" },
        { name: "Crèmes corps", href: "/corps-bain/cremes-corps" },
        { name: "Huiles corps", href: "/corps-bain/huiles-corps" },
        { name: "Gommages", href: "/corps-bain/gommages" },
        { name: "Déodorants", href: "/corps-bain/deodorants" },
      ],
    },
    MAQUILLAGE: {
      href: "/maquillage",
      subcategories: [
        { name: "Teint", href: "/maquillage/teint" },
        { name: "Yeux", href: "/maquillage/yeux" },
        { name: "Lèvres", href: "/maquillage/levres" },
        { name: "Ongles", href: "/maquillage/ongles" },
        { name: "Pinceaux", href: "/maquillage/pinceaux" },
      ],
    },
    PARAPHARMACIE: {
      href: "/parapharmacie",
      subcategories: [
        { name: "Compléments alimentaires", href: "/parapharmacie/complements" },
        { name: "Hygiène intime", href: "/parapharmacie/hygiene-intime" },
        { name: "Premiers secours", href: "/parapharmacie/premiers-secours" },
        { name: "Bien-être", href: "/parapharmacie/bien-etre" },
      ],
    },
    CHEVEUX: {
      href: "/cheveux",
      subcategories: [
        { name: "Shampooings", href: "/cheveux/shampooings" },
        { name: "Après-shampooings", href: "/cheveux/apres-shampooings" },
        { name: "Masques capillaires", href: "/cheveux/masques" },
        { name: "Huiles capillaires", href: "/cheveux/huiles" },
        { name: "Coiffage", href: "/cheveux/coiffage" },
      ],
    },
    "KOREAN BEAUTY": {
      href: "/korean-beauty",
      subcategories: [
        { name: "K-Beauty Skincare", href: "/korean-beauty/skincare" },
        { name: "Masques coréens", href: "/korean-beauty/masques" },
        { name: "Essences & Toners", href: "/korean-beauty/essences" },
        { name: "BB & CC Crèmes", href: "/korean-beauty/bb-cc-cremes" },
      ],
    },
  };

  return (
    <div className="w-full">
      {/* Top banner */}
      <div className="bg-green-500 text-white text-center py-2 text-sm">
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
              <div className="text-xl md:text-2xl font-bold text-green-600">FlawlessBeauty</div>
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
            <div className="flex items-center space-x-6 overflow-x-auto">
              <Link href="/nouveautes">
                <Button variant="ghost" className="whitespace-nowrap">
                  NOUVEAUTÉS
                </Button>
              </Link>

              {Object.entries(menuItems).map(([key, item]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.href}>
                    <Button variant="ghost" className="whitespace-nowrap flex items-center">
                      {key}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>

                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-2">
                        {item.subcategories.map((subcat) => (
                          <Link key={subcat.name} href={subcat.href}>
                            <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              {subcat.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link href="/parfums">
                <Button variant="ghost" className="whitespace-nowrap">
                  PARFUMS
                </Button>
              </Link>
              <Link href="/bebe-enfant">
                <Button variant="ghost" className="whitespace-nowrap">
                  BÉBÉ & ENFANT
                </Button>
              </Link>
              <Link href="/sexualite">
                <Button variant="ghost" className="whitespace-nowrap">
                  SEXUALITÉ
                </Button>
              </Link>
              <Link href="/idees-cadeaux">
                <Button variant="ghost" className="whitespace-nowrap">
                  IDÉES CADEAUX
                </Button>
              </Link>
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
                      onClick={() =>
                        setActiveDropdown(activeDropdown === key ? null : key)
                      }
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
                <Link href="/parfums">
                  <Button variant="ghost" className="justify-start">
                    PARFUMS
                  </Button>
                </Link>
                <Link href="/bebe-enfant">
                  <Button variant="ghost" className="justify-start">
                    BÉBÉ & ENFANT
                  </Button>
                </Link>
                <Link href="/sexualite">
                  <Button variant="ghost" className="justify-start">
                    SEXUALITÉ
                  </Button>
                </Link>
                <Link href="/idees-cadeaux">
                  <Button variant="ghost" className="justify-start">
                    IDÉES CADEAUX
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;


