import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  Heart, 
  Star, 
  Users, 
  Award, 
  Globe, 
  Shield,
  Truck,
  Phone,
  Mail,
  MapPin,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos de nous - Flawless Beauty',
  description: 'Découvrez l\'histoire de Flawless Beauty, votre partenaire beauté de confiance au Sénégal. Qualité, expertise et service client premium.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'À propos' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          À propos de Flawless Beauty
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Votre destination beauté de confiance au Sénégal. Depuis notre création, 
          nous nous engageons à vous offrir les meilleurs produits cosmétiques et de parapharmacie 
          avec un service client exceptionnel.
        </p>
      </div>

      {/* Notre histoire */}
      <div className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Notre histoire
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Flawless Beauty est née de la passion pour la beauté et du désir de démocratiser 
                l&apos;accès aux meilleurs produits cosmétiques au Sénégal. Fondée par une équipe 
                d&apos;experts en beauté, notre mission est de vous accompagner dans votre routine 
                beauté quotidienne.
              </p>
              <p>
                Nous croyons que chaque personne mérite de se sentir belle et confiante. 
                C&apos;est pourquoi nous sélectionnons rigoureusement nos produits parmi les 
                marques les plus réputées du marché, en privilégiant la qualité, l&apos;efficacité 
                et l&apos;innovation.
              </p>
              <p>
                Aujourd&apos;hui, Flawless Beauty est fière d&apos;être votre partenaire beauté 
                de confiance, avec plus de 1000 produits disponibles et une équipe dédiée 
                à votre satisfaction.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">1000+</div>
                <div className="text-sm text-gray-600">Produits disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Marques partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
                <div className="text-sm text-gray-600">Livraison Dakar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nos valeurs */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Nos valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Passion</h3>
            <p className="text-gray-600 text-sm">
              Notre passion pour la beauté nous pousse à toujours vous proposer le meilleur.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Qualité</h3>
            <p className="text-gray-600 text-sm">
              Nous sélectionnons uniquement des produits de qualité premium et testés.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Service</h3>
            <p className="text-gray-600 text-sm">
              Notre équipe est dédiée à votre satisfaction et à votre bien-être.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Confiance</h3>
            <p className="text-gray-600 text-sm">
              Transparence et fiabilité dans tous nos produits et services.
            </p>
          </div>
        </div>
      </div>

      {/* Notre engagement */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Notre engagement
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Produits authentiques
              </h3>
              <p className="text-gray-600 mb-4">
                Tous nos produits sont 100% authentiques, importés directement des fabricants 
                ou de leurs distributeurs officiels. Nous garantissons l&apos;origine et la qualité 
                de chaque article.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Conseils experts
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe d&apos;experts en beauté vous accompagne dans vos choix et vous 
                conseille selon votre type de peau, vos besoins et vos préférences.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Livraison rapide
              </h3>
              <p className="text-gray-600 mb-4">
                Livraison en 24h à Dakar et dans les meilleurs délais pour les régions. 
                Emballage soigné et protection garantie de vos produits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Service client premium
              </h3>
              <p className="text-gray-600 mb-4">
                Support client réactif et professionnel. Retours et échanges facilités 
                pour votre satisfaction totale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notre équipe */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Notre équipe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Équipe Beauté</h3>
            <p className="text-gray-600 text-sm">
              Experts en cosmétiques et soins, passionnés par l&apos;innovation beauté 
              et toujours à l&apos;affût des dernières tendances.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Service Client</h3>
            <p className="text-gray-600 text-sm">
              Équipe dédiée à votre satisfaction, disponible pour répondre à toutes 
              vos questions et vous accompagner dans vos achats.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Truck className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Logistique</h3>
            <p className="text-gray-600 text-sm">
              Professionnels de la logistique garantissant une livraison rapide, 
              sécurisée et soignée de vos commandes.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Contactez-nous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
            <p className="text-gray-600 mb-2">+221 12 34 56 78 9</p>
            <p className="text-sm text-gray-500">Lun-Ven: 8h-18h</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-2">contact@flawlessbeauty.sn</p>
            <p className="text-sm text-gray-500">Réponse sous 24h</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Adresse</h3>
            <p className="text-gray-600 mb-2">Dakar, Sénégal</p>
            <p className="text-sm text-gray-500">Livraison partout au Sénégal</p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-8 text-center">
        <Globe className="h-16 w-16 text-pink-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Rejoignez la communauté Flawless Beauty</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Découvrez nos produits, suivez nos conseils beauté et partagez votre expérience 
          avec notre communauté passionnée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/catalog" 
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Découvrir nos produits
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  )
}
