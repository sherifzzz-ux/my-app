'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { 
  Home, 
  User, 
  ShoppingBag, 
  Heart, 
  Search,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const { data: session } = useSession()

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault()
      // Rediriger vers la page d'authentification
      window.location.href = '/auth'
    }
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Flawless Beauty</h3>
            <p className="text-sm text-muted-foreground">
              Votre destination beauté de confiance pour des produits cosmétiques de qualité et des conseils experts.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support client
                </Link>
              </li>
              <li>
                <Link href="/loyalty" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Programme de fidélité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@flawlessbeauty.fr</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation mobile avec icônes optimisée */}
        <div className="md:hidden border-t pt-6">
          <div className="grid grid-cols-5 gap-2">
            <Link href="/" className="mobile-nav-item text-xs">
              <Home className="mobile-nav-icon" />
              <span>Accueil</span>
            </Link>
            
            <Link href="/search" className="mobile-nav-item text-xs">
              <Search className="mobile-nav-icon" />
              <span>Recherche</span>
            </Link>
            
            <Link href="/products" className="mobile-nav-item text-xs">
              <ShoppingBag className="mobile-nav-icon" />
              <span>Produits</span>
            </Link>
            
            <Link href="/favorites" className="mobile-nav-item text-xs">
              <Heart className="mobile-nav-icon" />
              <span>Favoris</span>
            </Link>
            
            <Link 
              href={session?.user ? "/account" : "/auth"} 
              onClick={handleAccountClick}
              className="mobile-nav-item text-xs"
            >
              <User className="mobile-nav-icon" />
              <span>Compte</span>
            </Link>
          </div>
        </div>

        {/* Ligne de séparation */}
        <Separator className="my-8" />

        {/* Bas de page */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Flawless Beauty. Tous droits &apos;réservés&apos;.
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
