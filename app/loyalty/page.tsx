import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  Star, 
  Gift, 
  Crown, 
  Trophy, 
  ShoppingBag, 
  Heart,
  Percent,
  Calendar,
  Users,
  Award,
  Sparkles,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Programme de fidélité - Flawless Beauty',
  description: 'Rejoignez notre programme de fidélité et gagnez des points à chaque achat. Récompenses exclusives et avantages VIP.',
}

export default function LoyaltyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Programme de fidélité' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-12 w-12 text-yellow-500 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Programme de fidélité
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Rejoignez notre programme VIP et transformez chaque achat en récompenses. 
          Plus vous achetez, plus vous gagnez !
        </p>
      </div>

      {/* Comment ça marche */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Comment ça marche ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Achetez</h3>
            <p className="text-gray-600">
              Faites vos achats sur Flawless Beauty et gagnez automatiquement des points.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Accumulez</h3>
            <p className="text-gray-600">
              Collectez des points à chaque commande et montez en niveau.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Échangez</h3>
            <p className="text-gray-600">
              Utilisez vos points pour obtenir des réductions et des cadeaux exclusifs.
            </p>
          </div>
        </div>
      </div>

      {/* Système de points */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Système de points
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Gagnez des points</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Achat de produits</span>
                  <span className="font-semibold text-green-600">1 point / 100 CFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avis produit</span>
                  <span className="font-semibold text-blue-600">50 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Parrainage ami</span>
                  <span className="font-semibold text-purple-600">500 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Anniversaire</span>
                  <span className="font-semibold text-pink-600">200 points</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Échangez vos points</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Réduction 5%</span>
                  <span className="font-semibold text-green-600">500 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Réduction 10%</span>
                  <span className="font-semibold text-blue-600">1000 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Réduction 15%</span>
                  <span className="font-semibold text-purple-600">2000 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Produit gratuit</span>
                  <span className="font-semibold text-pink-600">5000 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Niveaux VIP */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Niveaux VIP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold">Membre</h3>
              <p className="text-sm text-gray-600">0 - 999 points</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Points sur chaque achat
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Newsletter exclusive
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-yellow-300 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                POPULAIRE
              </span>
            </div>
            <div className="text-center mb-4">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold">VIP</h3>
              <p className="text-sm text-gray-600">1000 - 4999 points</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Tous les avantages Membre
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                +20% de points bonus
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Livraison gratuite dès 20,000 CFA
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Accès prévente
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">VIP Premium</h3>
              <p className="text-sm text-gray-600">5000+ points</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Tous les avantages VIP
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                +50% de points bonus
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Livraison gratuite illimitée
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Conseiller beauté dédié
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Cadeaux d&apos;anniversaire
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Avantages exclusifs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Avantages exclusifs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Percent className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Réductions exclusives</h3>
            <p className="text-gray-600 text-sm">
              Accédez à des offres spéciales réservées aux membres VIP.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Accès prévente</h3>
            <p className="text-gray-600 text-sm">
              Soyez les premiers à découvrir nos nouveautés.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Gift className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cadeaux surprises</h3>
            <p className="text-gray-600 text-sm">
              Recevez des échantillons et cadeaux gratuits.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Programme de parrainage</h3>
            <p className="text-gray-600 text-sm">
              Gagnez des points en parrainant vos amis.
            </p>
          </div>
        </div>
      </div>

      {/* État actuel */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Votre statut actuel
        </h2>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Membre</h3>
          <p className="text-gray-600 mb-4">0 points accumulés</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-gray-400 h-3 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            1000 points pour devenir VIP
          </p>
          <Link 
            href="/auth" 
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Rejoindre le programme
          </Link>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-lg p-8 text-center">
        <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Prêt à devenir VIP ?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Rejoignez notre programme de fidélité dès maintenant et commencez à gagner des points 
          sur tous vos achats. Plus vous achetez, plus vous économisez !
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/catalog" 
            className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Commencer mes achats
          </Link>
          <Link 
            href="/auth" 
            className="inline-flex items-center px-6 py-3 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            <Heart className="h-5 w-5 mr-2" />
            Créer mon compte
          </Link>
        </div>
      </div>
    </div>
  )
}
