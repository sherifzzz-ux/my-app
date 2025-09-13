import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingBag, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mes Favoris - Flawless Beauty',
  description: 'Retrouvez tous vos produits de beauté favoris en un seul endroit. Gestion facile de votre wishlist.',
}

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Mes Favoris' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-pink-500 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Mes Favoris
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Retrouvez tous vos produits de beauté préférés en un seul endroit. 
          Ajoutez des produits à vos favoris pour les retrouver facilement plus tard.
        </p>
      </div>

      {/* État vide */}
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="bg-gray-50 rounded-lg p-12">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Votre liste de favoris est vide
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Découvrez nos produits et ajoutez-les à vos favoris en cliquant sur le cœur 
            pour les retrouver facilement plus tard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Découvrir nos produits
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/catalog">
                Parcourir le catalogue
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Fonctionnalités des favoris */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Pourquoi utiliser les favoris ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sauvegardez vos préférés</h3>
            <p className="text-gray-600">
              Ajoutez des produits à vos favoris pour les retrouver facilement lors de votre prochaine visite.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Liste personnalisée</h3>
            <p className="text-gray-600">
              Créez votre propre sélection de produits adaptée à vos besoins et préférences.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Achat rapide</h3>
            <p className="text-gray-600">
              Ajoutez rapidement vos favoris au panier pour un achat en quelques clics.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-16 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
        <p className="text-gray-600 mb-6">
          Explorez notre catalogue et commencez à créer votre liste de favoris personnalisée.
        </p>
        <Link 
          href="/catalog" 
          className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Commencer mes achats
        </Link>
      </div>
    </div>
  )
}
