"use client";

import { Search, Heart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Délais d'ouverture/fermeture pour menus déroulants (hover-intent desktop)
  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  const handleItemEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    openTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(key);
    }, 80);
  };

  const handleItemLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const cancelCloseAndKeepOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    // Fermer le dropdown lors du scroll horizontal de la barre de menu
    const navEl = desktopNavRef.current;
    const handleScroll = () => setActiveDropdown(null);
    if (navEl) navEl.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      if (navEl) navEl.removeEventListener("scroll", handleScroll as EventListener);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const menuItems: Record<
    string,
    { href: string; subcategories: { name: string; href: string }[] }
  > = {
    PROMOTION: {
      href: "/promotion",
      subcategories: [],
    },
    "SOIN DU VISAGE": {
      href: "/soin-du-visage",
      subcategories: [
        { name: "Protection solaire", href: "/soin-du-visage/protection-solaire" },
        { name: "Soins du visage par produit", href: "/soin-du-visage/soins-par-produit" },
        { name: "Soins ciblés", href: "/soin-du-visage/soins-cibles" },
        { name: "Baumes hydratants lèvres", href: "/soin-du-visage/baumes-levres" },
        { name: "Démaquillants & Nettoyants", href: "/soin-du-visage/demaquillants-nettoyants" },
        { name: "Accessoires & Appareils visage", href: "/soin-du-visage/accessoires-appareils" },
      ],
    },
    "CORPS & BAIN": {
      href: "/corps-bain",
      subcategories: [
        { name: "Soins Corps", href: "/corps-bain/soins-corps" },
        { name: "Bain & Douche", href: "/corps-bain/bain-douche" },
        { name: "Épilation", href: "/corps-bain/epilation" },
        { name: "Hygiène intime", href: "/corps-bain/hygiene-intime" },
        { name: "Mains & Pieds", href: "/corps-bain/mains-pieds" },
        { name: "L'hygiène Bucco-Dentaire", href: "/corps-bain/hygiene-bucco-dentaire" },
      ],
    },
    MAQUILLAGE: {
      href: "/maquillage",
      subcategories: [
        { name: "Teint", href: "/maquillage/teint" },
        { name: "Maquillage Yeux", href: "/maquillage/yeux" },
        { name: "Lèvres", href: "/maquillage/levres" },
        { name: "Ongles", href: "/maquillage/ongles" },
        { name: "Accessoires Maquillage", href: "/maquillage/accessoires" },
        { name: "Sourcils", href: "/maquillage/sourcils" },
      ],
    },
    PARAPHARMACIE: {
      href: "/parapharmacie",
      subcategories: [
        { name: "Complément Alimentaire", href: "/parapharmacie/complements" },
        { name: "Soins du visage", href: "/parapharmacie/soins-visage" },
        { name: "Soins du corps", href: "/parapharmacie/soins-corps" },
        { name: "Homme", href: "/parapharmacie/homme" },
      ],
    },
    "IDÉES CADEAUX": {
      href: "/idees-cadeaux",
      subcategories: [],
    },
    CHEVEUX: {
      href: "/cheveux",
      subcategories: [
        { name: "Compléments alimentaires", href: "/cheveux/complements-alimentaires" },
        { name: "Routine capillaire", href: "/cheveux/routine-capillaire" },
        { name: "Soins cheveux", href: "/cheveux/soins-cheveux" },
        { name: "Accessoires & Brosses", href: "/cheveux/accessoires-brosses" },
      ],
    },
    PARFUMERIE: {
      href: "/parfumerie",
      subcategories: [
        { name: "Parfumerie Femmes", href: "/parfumerie/femmes" },
        { name: "Parfumerie Hommes", href: "/parfumerie/hommes" },
        { name: "Huiles parfumées", href: "/parfumerie/huiles-parfumees" },
      ],
    },
    "BÉBÉ & ENFANT": {
      href: "/bebe-enfant",
      subcategories: [
        { name: "Appareils Bébé", href: "/bebe-enfant/appareils-bebe" },
        { name: "Sécurité Enfants", href: "/bebe-enfant/securite-enfants" },
        { name: "Alimentation Bébé", href: "/bebe-enfant/alimentation-bebe" },
        { name: "Hygiène Bébé", href: "/bebe-enfant/hygiene-bebe" },
        { name: "Maman & Grossesse", href: "/bebe-enfant/maman-grossesse" },
      ],
    },
    MARQUES: {
      href: "/marques",
      subcategories: [],
    },
    "KOREAN SKINCARE": {
      href: "/korean-skincare",
      subcategories: [],
    },
  };

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
            <div ref={desktopNavRef} className="flex items-center space-x-6 overflow-x-auto overflow-y-visible whitespace-nowrap">
              <Link href="/nouveautes">
                <Button variant="ghost" className="whitespace-nowrap">
                  NOUVEAUTÉS
                </Button>
              </Link>

              {Object.entries(menuItems).map(([key, item]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleItemEnter(key)}
                  onMouseLeave={handleItemLeave}
                >
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={`whitespace-nowrap flex items-center hover:text-[#F792CC] ${activeDropdown === key ? "text-[#F792CC]" : ""}`}
                      onClick={() => setActiveDropdown(key)}
                      onFocus={() => setActiveDropdown(key)}
                    >
                      {key}
                      {item.subcategories.length > 0 && (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      )}
                    </Button>
                  </Link>

                  {/* Dropdown desktop rendu globalement en overlay (fixed) */}

                  {/* Dropdowns */}
                  {activeDropdown === key && (
                    <>
                      {/* Mobile: ouverture au clic via état */}
                      <div className="md:hidden mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
                      {/* Desktop: dropdown positionné sous l'item parent (sans styles inline) */}
                      <div
                        className="hidden md:block absolute left-0 top-full z-[10000]"
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
                    </>
                  )}
                </div>
              ))}

              {/* Liens statiques retirés pour éviter les doublons avec menuItems */}
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
                {/* Liens statiques retirés pour éviter les doublons avec menuItems */}
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;


