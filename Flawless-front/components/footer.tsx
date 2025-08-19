import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="text-2xl font-serif text-pink-400 italic mb-4">Flawless Beauty</div>
            <p className="text-gray-400 text-sm">
              Votre parapharmacie en ligne de confiance pour tous vos besoins en cosmétiques et soins de beauté.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nouveautes" className="text-gray-400 hover:text-white">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-gray-400 hover:text-white">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/marques" className="text-gray-400 hover:text-white">
                  Marques
                </Link>
              </li>
              <li>
                <Link href="/conseils" className="text-gray-400 hover:text-white">
                  Conseils beauté
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service client</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="text-gray-400 hover:text-white">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/retours" className="text-gray-400 hover:text-white">
                  Retours
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-gray-400 hover:text-white">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-gray-400 hover:text-white">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Flawless Beauty. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
