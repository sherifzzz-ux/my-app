import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Shield, 
  CreditCard,
  Phone,
  Mail,
  CheckCircle,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Livraison - Flawless Beauty',
  description: 'Informations détaillées sur nos services de livraison. Délais, frais, zones de livraison et suivi de commande.',
}

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Livraison' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Truck className="h-12 w-12 text-green-500 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Livraison
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Livraison rapide et sécurisée partout au Sénégal. 
          Découvrez nos options de livraison et nos zones de couverture.
        </p>
      </div>

      {/* Délais de livraison */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Délais de livraison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Dakar et banlieue</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">Livraison express :</span>
                <span className="ml-2 text-green-600 font-semibold">24h</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                <span className="font-medium">Livraison standard :</span>
                <span className="ml-2 text-orange-600 font-semibold">48h</span>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Livraison du lundi au samedi, hors dimanches et jours fériés.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Régions</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">Délai indicatif :</span>
                <span className="ml-2 text-blue-600 font-semibold">24-72h</span>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-purple-500 mr-2" />
                <span className="font-medium">Suivi disponible</span>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Délais variables selon la zone géographique et les conditions météo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frais de livraison */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Frais de livraison
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Livraison gratuite</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">25,000 CFA</p>
              <p className="text-sm text-gray-600">Commande minimum</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dakar</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">2,000 CFA</p>
              <p className="text-sm text-gray-600">Frais de port</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Régions</h3>
              <p className="text-2xl font-bold text-purple-600 mb-2">3,500 CFA</p>
              <p className="text-sm text-gray-600">Frais de port</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zones de livraison */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Zones de livraison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-green-500 mr-2" />
              Dakar et banlieue
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dakar Plateau</li>
              <li>• Almadies</li>
              <li>• Parcelles Assainies</li>
              <li>• Pikine</li>
              <li>• Guédiawaye</li>
              <li>• Rufisque</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-2" />
              Autres régions
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Thiès</li>
              <li>• Kaolack</li>
              <li>• Ziguinchor</li>
              <li>• Saint-Louis</li>
              <li>• Diourbel</li>
              <li>• Autres villes sur demande</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Suivi de commande */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Suivi de votre commande
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Comment suivre votre commande</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">SMS de confirmation</p>
                    <p className="text-sm text-gray-600">Reçu immédiatement après commande</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email de suivi</p>
                    <p className="text-sm text-gray-600">Mises à jour par email</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Appel téléphonique</p>
                    <p className="text-sm text-gray-600">Confirmation avant livraison</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact pour le suivi</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium">+221 12 34 56 78 9</p>
                    <p className="text-sm text-gray-600">Service client</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">support@flawlessbeauty.sn</p>
                    <p className="text-sm text-gray-600">Email de suivi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Garanties */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Nos garanties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Livraison sécurisée</h3>
            <p className="text-gray-600">
              Emballage soigné et protection des produits fragiles.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Produits intacts</h3>
            <p className="text-gray-600">
              Vérification qualité avant expédition et à la livraison.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Service premium</h3>
            <p className="text-gray-600">
              Livreurs formés et service client réactif.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
        <Truck className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Prêt à commander ?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Découvrez nos produits et bénéficiez d&apos;une livraison rapide et sécurisée 
          partout au Sénégal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/catalog" 
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Package className="h-5 w-5 mr-2" />
            Voir nos produits
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  )
}
