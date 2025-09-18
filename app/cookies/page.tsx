import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { 
  Cookie, 
  Shield, 
  Settings, 
  Eye, 
  Lock, 
  Globe,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique des cookies - Flawless Beauty',
  description: 'Informations sur l\'utilisation des cookies sur notre site. Gestion de vos préférences et protection de votre vie privée.',
}

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Politique des cookies' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Cookie className="h-12 w-12 text-orange-500 mr-4" />
          <h1 className="heading-1 text-gray-900">
            Politique des cookies
          </h1>
        </div>
        <p className="text-lead max-w-2xl mx-auto">
          Découvrez comment nous utilisons les cookies pour améliorer votre expérience 
          sur Flawless Beauty et comment vous pouvez gérer vos préférences.
        </p>
      </div>

      {/* Qu'est-ce qu'un cookie */}
      <div className="mb-12">
        <h2 className="heading-3 mb-6">
          Qu&apos;est-ce qu&apos;un cookie ?
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-500 mr-3 mt-1" />
            <div>
              <p className="text-gray-700 mb-4">
                Un cookie est un petit fichier texte stocké sur votre ordinateur, tablette ou smartphone 
                lorsque vous visitez notre site web. Les cookies nous permettent de reconnaître votre 
                appareil et de mémoriser vos préférences pour améliorer votre expérience de navigation.
              </p>
              <p className="text-gray-700">
                Les cookies ne peuvent pas endommager votre appareil et ne contiennent aucun virus. 
                Ils sont essentiels au fonctionnement de nombreux services en ligne.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Types de cookies */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Types de cookies utilisés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">Cookies essentiels</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Authentification utilisateur</li>
              <li>• Panier d&apos;achat</li>
              <li>• Préférences de langue</li>
              <li>• Sécurité du site</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">Cookies de performance</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Ces cookies nous aident à comprendre comment vous utilisez notre site.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Statistiques de visite</li>
              <li>• Pages les plus consultées</li>
              <li>• Temps passé sur le site</li>
              <li>• Sources de trafic</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold">Cookies de fonctionnalité</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Ces cookies améliorent votre expérience en mémorisant vos choix.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Préférences d&apos;affichage</li>
              <li>• Historique de navigation</li>
              <li>• Favoris et listes</li>
              <li>• Personnalisation</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold">Cookies marketing</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Ces cookies sont utilisés pour vous proposer des publicités pertinentes.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Publicités ciblées</li>
              <li>• Réseaux sociaux</li>
              <li>• Mesure d&apos;efficacité</li>
              <li>• Remarketing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cookies tiers */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Cookies tiers
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
          <p className="text-gray-700 mb-4">
            Nous utilisons également des services tiers qui peuvent placer leurs propres cookies sur votre appareil :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-600">Google Analytics - Analyse du trafic</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-600">Facebook Pixel - Publicités ciblées</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-600">NextAuth - Authentification</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-600">Supabase - Base de données</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gestion des cookies */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Comment gérer vos cookies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">Paramètres du navigateur</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Chrome :</strong> Paramètres → Confidentialité → Cookies</li>
              <li>• <strong>Firefox :</strong> Options → Vie privée → Cookies</li>
              <li>• <strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
              <li>• <strong>Edge :</strong> Paramètres → Cookies et autorisations</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">Centre de préférences</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Utilisez notre centre de préférences pour gérer vos choix de cookies :
            </p>
            <Button className="w-full hover-scale focus-ring">
              Gérer mes préférences
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Vous pouvez modifier vos préférences à tout moment
            </p>
          </div>
        </div>
      </div>

      {/* Durée de conservation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Durée de conservation
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover-lift hover-glow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Cookies de session</h3>
              <p className="text-sm text-gray-600">Supprimés à la fermeture du navigateur</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Cookie className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Cookies persistants</h3>
              <p className="text-sm text-gray-600">Conservés jusqu&apos;à 2 ans maximum</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Cookies de préférences</h3>
              <p className="text-sm text-gray-600">Renouvelés à chaque visite</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conséquences du refus */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Conséquences du refus des cookies
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <XCircle className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Attention : Désactiver les cookies peut affecter votre expérience
              </h3>
              <ul className="text-yellow-700 space-y-1">
                <li>• Impossibilité de vous connecter à votre compte</li>
                <li>• Perte de votre panier d&apos;achat</li>
                <li>• Réinitialisation de vos préférences</li>
                <li>• Fonctionnalités limitées du site</li>
                <li>• Publicités non personnalisées</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Questions sur les cookies ?
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Nous sommes là pour vous aider</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si vous avez des questions sur notre utilisation des cookies ou souhaitez 
            exercer vos droits, n&apos;hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nous contacter
            </Link>
            <Link 
              href="/politique-de-confidentialite" 
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>

      {/* Dernière mise à jour */}
      <div className="text-center text-sm text-gray-500">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        <p className="mt-1">
          Cette politique peut être mise à jour. Nous vous informerons de tout changement important.
        </p>
      </div>
    </div>
  )
}
