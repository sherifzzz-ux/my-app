import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  FileText, 
  Truck, 
  CreditCard,
  Shield,
  Users
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support Client - Flawless Beauty',
  description: 'Centre d\'aide et support client. Trouvez des réponses à vos questions ou contactez notre équipe.',
}

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Support' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <MessageCircle className="h-12 w-12 text-blue-500 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Support Client
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nous sommes là pour vous aider ! Trouvez des réponses à vos questions 
          ou contactez directement notre équipe de support.
        </p>
      </div>

      {/* Contact rapide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
          <p className="text-gray-600 mb-3">Appelez-nous directement</p>
          <a href="tel:+221123456789" className="text-green-600 font-medium">
            +221 12 34 56 78 9
          </a>
          <p className="text-sm text-gray-500 mt-2">Lun-Ven: 8h-18h</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-600 mb-3">Écrivez-nous</p>
          <a href="mailto:support@flawlessbeauty.sn" className="text-blue-600 font-medium">
            support@flawlessbeauty.sn
          </a>
          <p className="text-sm text-gray-500 mt-2">Réponse sous 24h</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Clock className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chat en direct</h3>
          <p className="text-gray-600 mb-3">Discutez avec nous</p>
          <button className="text-purple-600 font-medium">
            Démarrer le chat
          </button>
          <p className="text-sm text-gray-500 mt-2">Disponible maintenant</p>
        </div>
      </div>

      {/* FAQ rapide */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Questions fréquentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
              Comment passer une commande ?
            </h3>
            <p className="text-gray-600">
              Ajoutez vos produits au panier, procédez au checkout, 
              choisissez votre mode de livraison et de paiement.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Truck className="h-5 w-5 text-green-500 mr-2" />
              Délais de livraison ?
            </h3>
            <p className="text-gray-600">
              Dakar : 24h, Régions : 24-72h. Livraison gratuite dès 25,000 CFA.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
              Modes de paiement ?
            </h3>
            <p className="text-gray-600">
              Carte bancaire, Orange Money, Free Money, paiement à la livraison.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              Retours et échanges ?
            </h3>
            <p className="text-gray-600">
              Retour possible sous 14 jours. Produits non ouverts et en bon état.
            </p>
          </div>
        </div>
      </div>

      {/* Liens utiles */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Liens utiles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/aide" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-sm font-medium">Centre d&apos;aide</div>
          </Link>

          <Link 
            href="/faq" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-medium">FAQ</div>
          </Link>

          <Link 
            href="/livraison" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <Truck className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-sm font-medium">Livraison</div>
          </Link>

          <Link 
            href="/retours" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-sm font-medium">Retours</div>
          </Link>
        </div>
      </div>

      {/* Équipe support */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
        <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Notre équipe à votre service</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Notre équipe de support est composée d&apos;experts en beauté et cosmétiques 
          qui vous accompagneront dans vos choix et répondront à toutes vos questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:support@flawlessbeauty.sn" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            Nous écrire
          </a>
          <a 
            href="tel:+221123456789" 
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Nous appeler
          </a>
        </div>
      </div>
    </div>
  )
}
