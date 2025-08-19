# FlawlessBeauty - Documentation Complète du Projet

## 📁 Arborescence du Projet

\`\`\`
FlawlessBeauty/
├── app/
│   ├── layout.tsx                    # Layout principal avec navigation mobile
│   ├── page.tsx                      # Page d\'accueil avec tous les composants
│   ├── globals.css                   # Styles globaux et animations
│   ├── soin-du-visage/
│   │   └── page.tsx                  # Page catégorie soin du visage
│   ├── korean-beauty/
│   │   └── page.tsx                  # Page catégorie Korean Beauty
│   ├── marques/
│   │   └── page.tsx                  # Page des marques
│   └── nouveautes/
│       └── page.tsx                  # Page des nouveautés
├── components/
│   ├── header.tsx                    # Header avec menus déroulants
│   ├── hero-section.tsx              # Carousel d'images hero (10 slides)
│   ├── category-grid.tsx             # Grille des catégories
\
│   ├── featured-products.tsx         # Produits vedettes
│   ├── brand-logos.tsx               # Logos de marques défilants
│   ├── product-grid-
with-cart.tsx    #
Grille
produits
avec
bouton
panier
│   ├── product-showcase.tsx          # Vitrine de produits
\
│   ├── recommendations-section.tsx   # Section recommandations auto-défilante
\
│   ├── nouveautes-section.tsx        # Section nouveautés auto-défilante
│   ├── newsletter-section.tsx        # Section newsletter
│   ├── footer.tsx                    # Footer principal
│   ├── mobile-footer-nav.tsx         # Navigation mobile fixe en bas
│   └── ui/                           # Composants UI (shadcn/ui)
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── ... (autres composants UI)
├── lib/
│   └── utils.ts                      # Utilitaires (fonction cn)
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── next.config.mjs                   # Configuration Next.js
├── package.json                      # Dépendances du projet
└── tsconfig.json                     # Configuration TypeScript
\`\`\`

## 🚀 Instructions d'Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
\`\`\`bash
# Cloner ou créer le projet
npx create-next-app
@latest
flawless - beauty--
typescript--
tailwind--
eslint--
app

#
Installer
les
dépendances
supplémentaires
\
npm install lucide-react
@radix
;-ui / react - slot
class-variance-authority clsx tailwind-merge

# Installer shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input card
\`\`\`

## 📄 Contenu des Fichiers

\
### app/layout.tsx
\`\`\`tsx
\
import type React from \"react"
\
import type { Metadata }
from
;("next")
\
import { Inter, Playfair_Display } from
\'next/font/google'
\
import
\"./globals.css"
\
import MobileFooterNav from
\"@/components/mobile-footer-nav\"

\
const inter = Inter({
\
  subsets: [\"latin"],
\
  display: \"swap",
\
  variable: "--font-inter",
\
})
\

\
const playfair = Playfair_Display({
\
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: \"FlawlessBeauty - Parapharmacie en ligne & Cosmétiques",
\
  description:
\
    \"Découvrez notre sélection de produits de beauté, cosmétiques et parapharmacie. Livraison gratuite dès 39€.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="pb-16">
        {children}
        <MobileFooterNav />
      </body>
    </html>
  )
}
\`\`\`

### app/page.tsx
\`\`\`tsx
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandLogos } from "@/components/brand-logos"
import { ProductGridWithCart } from "@/components/product-grid-with-cart"
import { ProductShowcase } from "@/components/product-showcase"
import { RecommendationsSection } from "@/components/recommendations-section"
import { NouveautesSection } from "@/components/nouveautes-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandLogos />
      <ProductGridWithCart />
      <ProductShowcase />
      <RecommendationsSection />
      <NouveautesSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
\`\`\`

### app/globals.css
\`\`\`css
@
import "tailwindcss"
@
import "tw-animate-css"

@custom
;-variant
dark (&:is(.dark *)
)

@theme
inline
{
  --font - sans
  :
  var(--font-inter);
  --font - serif
  :
  var(--font-playfair);
  --font - mono
  : ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace
}

:root
{
  --background
  : oklch(1 0 0)
  --foreground
  : oklch(0.145 0 0)
  --card
  : oklch(1 0 0)
  --card - foreground
  : oklch(0.145 0 0)
  --popover
  : oklch(1 0 0)
  --popover - foreground
  : oklch(0.145 0 0)
  --primary
  : oklch(0.205 0 0)
  --primary - foreground
  : oklch(0.985 0 0)
  --secondary
  : oklch(0.97 0 0)
  --secondary - foreground
  : oklch(0.205 0 0)
  --muted
  : oklch(0.97 0 0)
  --muted - foreground
  : oklch(0.556 0 0)
  --accent
  : oklch(0.97 0 0)
  --accent - foreground
  : oklch(0.205 0 0)
  --destructive
  : oklch(0.577 0.245 27.325)
  --destructive - foreground
  : oklch(0.577 0.245 27.325)
  --border
  : oklch(0.922 0 0)
  --input
  : oklch(0.922 0 0)
  --ring
  : oklch(0.708 0 0)
  --chart - 1
  : oklch(0.646 0.222 41.116)
  --chart - 2
  : oklch(0.6 0.118 184.704)
  --chart - 3
  : oklch(0.398 0.07 227.392)
  --chart - 4
  : oklch(0.828 0.189 84.429)
  --chart - 5
  : oklch(0.769 0.188 70.08)
  --radius
  : 0.625rem
  --sidebar
  : oklch(0.985 0 0)
  --sidebar - foreground
  : oklch(0.145 0 0)
  --sidebar - primary
  : oklch(0.205 0 0)
  --sidebar - primary - foreground
  : oklch(0.985 0 0)
  --sidebar - accent
  : oklch(0.97 0 0)
  --sidebar - accent - foreground
  : oklch(0.205 0 0)
  --sidebar - border
  : oklch(0.922 0 0)
  --sidebar - ring
  : oklch(0.708 0 0)
}

.dark
{
  --background
  : oklch(0.145 0 0)
  --foreground
  : oklch(0.985 0 0)
  --card
  : oklch(0.145 0 0)
  --card - foreground
  : oklch(0.985 0 0)
  --popover
  : oklch(0.145 0 0)
  --popover - foreground
  : oklch(0.985 0 0)
  --primary
  : oklch(0.985 0 0)
  --primary - foreground
  : oklch(0.205 0 0)
  --secondary
  : oklch(0.269 0 0)
  --secondary - foreground
  : oklch(0.985 0 0)
  --muted
  : oklch(0.269 0 0)
  --muted - foreground
  : oklch(0.708 0 0)
  --accent
  : oklch(0.269 0 0)
  --accent - foreground
  : oklch(0.985 0 0)
  --destructive
  : oklch(0.396 0.141 25.723)
  --destructive - foreground
  : oklch(0.637 0.237 25.331)
  --border
  : oklch(0.269 0 0)
  --input
  : oklch(0.269 0 0)
  --ring
  : oklch(0.439 0 0)
  --chart - 1
  : oklch(0.488 0.243 264.376)
  --chart - 2
  : oklch(0.696 0.17 162.48)
  --chart - 3
  : oklch(0.769 0.188 70.08)
  --chart - 4
  : oklch(0.627 0.265 303.9)
  --chart - 5
  : oklch(0.645 0.246 16.439)
  --sidebar
  : oklch(0.205 0 0)
  --sidebar - foreground
  : oklch(0.985 0 0)
  --sidebar - primary
  : oklch(0.488 0.243 264.376)
  --sidebar - primary - foreground
  : oklch(0.985 0 0)
  --sidebar - accent
  : oklch(0.269 0 0)
  --sidebar - accent - foreground
  : oklch(0.985 0 0)
  --sidebar - border
  : oklch(0.269 0 0)
  --sidebar - ring
  : oklch(0.439 0 0)
}

@theme
inline
{
  --color - background
  :
  var(--background);
  --color - foreground
  :
  var(--foreground);
  --color - card
  :
  var(--card);
  --color - card - foreground
  :
  var(--card-foreground);
  --color - popover
  :
  var(--popover);
  --color - popover - foreground
  :
  var(--popover-foreground);
  --color - primary
  :
  var(--primary);
  --color - primary - foreground
  :
  var(--primary-foreground);
  --color - secondary
  :
  var(--secondary);
  --color - secondary - foreground
  :
  var(--secondary-foreground);
  --color - muted
  :
  var(--muted);
  --color - muted - foreground
  :
  var(--muted-foreground);
  --color - accent
  :
  var(--accent);
  --color - accent - foreground
  :
  var(--accent-foreground);
  --color - destructive
  :
  var(--destructive);
  --color - destructive - foreground
  :
  var(--destructive-foreground);
  --color - border
  :
  var(--border);
  --color - input
  :
  var(--input);
  --color - ring
  :
  var(--ring);
  --color - chart - 1
  :
  var(--chart-1);
  --color - chart - 2
  :
  var(--chart-2);
  --color - chart - 3
  :
  var(--chart-3);
  --color - chart - 4
  :
  var(--chart-4);
  --color - chart - 5
  :
  var(--chart-5);
  --radius - sm
  : calc(
  var(--radius) - 4px);
  --radius - md
  : calc(
  var(--radius) - 2px);
  --radius - lg
  :
  var(--radius);
  --radius - xl
  : calc(
  var(--radius) + 4px);
  --color - sidebar
  :
  var(--sidebar);
  --color - sidebar - foreground
  :
  var(--sidebar-foreground);
  --color - sidebar - primary
  :
  var(--sidebar-primary);
  --color - sidebar - primary - foreground
  :
  var(--sidebar-primary-foreground);
  --color - sidebar - accent
  :
  var(--sidebar-accent);
  --color - sidebar - accent - foreground
  :
  var(--sidebar-accent-foreground);
  --color - sidebar - border
  :
  var(--sidebar-border);
  --color - sidebar - ring
  :
  var(--sidebar-ring);
}

@layer
base
{
  *
  @apply
  border - border
  outline - ring / 50
  body
  @apply
  bg - background
  text - foreground
  font - sans
}

/* Adding custom animations for scrolling logos and carousels */
@keyframes
scroll
{
  0% {
    transform: translateX(0);
}
100% {
    transform: translateX(-50%);
}
}

.animate-scroll
{
  animation: scroll
  20s linear infinite
}

/* Adding smooth transitions for product cards */
.line-clamp-2
{
  display: -webkit - box
  ;-webkit - line - clamp
  : 2
  ;-webkit - box - orient
  : vertical
  overflow: hidden
}

/* Adding hover effects for better interactivity */
.hover-scale
{
  transition: transform
  0.2s ease-in-out
}

.hover-scale:hover
{
  transform: scale(1.05)
}
\`\`\`

### components/header.tsx
\`\`\`tsx
"use client"

import { Search, Heart, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const menuItems = {
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
  }

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
              <div className="text-xs text-gray-500 hidden md:block">Parapharmacie en ligne & Cosmétiques</div>
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
  )
}
\`\`\`

### components/mobile-footer-nav.tsx
\`\`\`tsx
"use client"

import { Home, Grid3X3, ShoppingCart, User } from "lucide-react"
import Link from "next/link"

export default function MobileFooterNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] shadow-lg">
      <div className="flex items-center justify-around py-2">
        <Link href="/" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]">
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">ACCUEIL</span>
        </Link>
        
        <Link href="/marques" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]">
          <Grid3X3 className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">MARQUES</span>
        </Link>
        
        <Link href="/panier" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]">
          <ShoppingCart className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">PANIER</span>
        </Link>
        
        <Link href="/compte" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-[#F792CC]">
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">COMPTE</span>
        </Link>
      </div>
    </div>
  )
}

export { MobileFooterNav }
\`\`\`

## 🎨 Fonctionnalités Principales

### 1. Navigation Responsive
- **Header avec menus déroulants** : Survol sur desktop, clic sur mobile
- **Navigation mobile fixe** : Barre en bas avec 4 boutons principaux
- **Recherche adaptative** : Intégrée au header sur desktop, séparée sur mobile

### 2. Carousel Hero (10 slides)
- **Images changeantes automatiques** : 10 slides avec marques populaires
- **Navigation manuelle** : Boutons précédent/suivant et indicateurs
- **Responsive** : Adapté à toutes les tailles d'écran

### 3. Sections Défilantes
- **Top Marques** : Logos défilants en continu (animation CSS)
- **Recommandations** : Produits auto-défilants avec navigation
- **Nouveautés** : Section similaire avec produits récents

### 4. Grilles de Produits
- **Avec boutons panier** : Interaction directe sur les produits
- **Cards responsives** : Adaptation automatique selon l'écran
- **Effets hover** : Animations subtiles pour l'interactivité

## 🛠️ Technologies Utilisées

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse
- **Tailwind CSS v4** : Styling utilitaire moderne
- **Lucide React** : Icônes cohérentes et légères
- **shadcn/ui** : Composants UI pré-stylés
- **Google Fonts** : Inter (sans-serif) + Playfair Display (serif)

## 🎯 Points Clés pour le Rendu Identique

### Couleurs Principales
- **Vert principal** : `text-green-600`, `bg-green-500`
- **Gris neutres** : `text-gray-500`, `text-gray-600`, `bg-gray-50`
- **Blanc/Noir** : Contraste principal

### Animations CSS
- **Défilement logos** : `animate-scroll` (20s linear infinite)
- **Hover effects** : `hover-scale` avec transform scale(1.05)
- **Transitions** : 0.2s ease-in-out pour la fluidité

### Responsive Design
- **Mobile-first** : Conception prioritaire mobile
- **Breakpoints** : `md:` pour desktop (768px+)
- **Navigation adaptative** : Menu hamburger → navigation horizontale

### Structure des Données
- **Produits** : Nom, prix, image, description
- **Catégories** : Hiérarchie avec sous-catégories
- **Marques** : Logos avec liens vers pages dédiées

## 📱 Optimisations Mobile

- **Navigation fixe en bas** : Accès rapide aux fonctions principales
- **Menus déroulants tactiles** : Interaction optimisée pour le touch
- **Images responsives** : Chargement adaptatif selon la taille
- **Padding bottom** : Évite le masquage par la navigation fixe

## 🚀 Déploiement

\`\`\`bash
# Build de production
npm run build

# Démarrage en production
npm start

# Ou déploiement sur Vercel
npx vercel --prod
\`\`\`

---

**Note** : Ce projet reproduit fidèlement l'interface et les fonctionnalités d'Univers Cosmetix avec le nom FlawlessBeauty. Tous les composants sont optimisés pour une expérience utilisateur fluide sur mobile et desktop.
