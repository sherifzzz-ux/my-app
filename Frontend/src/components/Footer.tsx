import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="font-bold text-xl text-primary font-playfair">
              Flawless Beauty
            </div>
            <p className="text-muted-foreground text-sm">
              Votre parapharmacie en ligne spécialisée dans les cosmétiques 
              et produits de beauté de qualité premium.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Catégories</h3>
            <div className="space-y-2 text-sm">
              <Link to="/soin-du-visage" className="block text-muted-foreground hover:text-primary">
                Soin du Visage
              </Link>
              <Link to="/corps-bain" className="block text-muted-foreground hover:text-primary">
                Corps & Bain
              </Link>
              <Link to="/maquillage" className="block text-muted-foreground hover:text-primary">
                Maquillage
              </Link>
              <Link to="/cheveux" className="block text-muted-foreground hover:text-primary">
                Cheveux
              </Link>
              <Link to="/korean-skincare" className="block text-muted-foreground hover:text-primary">
                Korean Skincare
              </Link>
              <Link to="/parfumerie" className="block text-muted-foreground hover:text-primary">
                Parfumerie
              </Link>
              <Link to="/parapharmacie" className="block text-muted-foreground hover:text-primary">
                Parapharmacie
              </Link>
              <Link to="/marques" className="block text-muted-foreground hover:text-primary">
                Marques
              </Link>
            </div>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Service Client</h3>
            <div className="space-y-2 text-sm">
              <Link to="/contact" className="block text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary">
                FAQ
              </Link>
              <Link to="/aide" className="block text-muted-foreground hover:text-primary">
                Centre d'Aide
              </Link>
              <Link to="/suivi-commande" className="block text-muted-foreground hover:text-primary">
                Suivi de Commande
              </Link>
              <Link to="/livraison" className="block text-muted-foreground hover:text-primary">
                Livraison
              </Link>
              <Link to="/retours" className="block text-muted-foreground hover:text-primary">
                Retours
              </Link>
              <Link to="/cgv" className="block text-muted-foreground hover:text-primary">
                Conditions générales
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+221 77 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">contact@flawlessbeauty.sn</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Dakar, Sénégal<br />
                  Plateau, Rue de la République
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Flawless Beauty. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/politique-confidentialite" className="text-muted-foreground hover:text-primary">
                Politique de confidentialité
              </Link>
              <Link to="/mentions-legales" className="text-muted-foreground hover:text-primary">
                Mentions légales
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}