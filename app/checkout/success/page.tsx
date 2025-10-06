'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderRef, setOrderRef] = useState<string>('')

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      setOrderRef(ref)
      
      // Vider le panier côté client
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart-storage')
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/10 dark:to-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Animation de succès */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Paiement réussi !
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Votre commande a été confirmée avec succès
            </p>
          </div>

          {/* Détails de la commande */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Détails de la commande</CardTitle>
              <CardDescription>
                Référence: <span className="font-mono font-semibold">{orderRef}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">
                    Commande confirmée
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Un email de confirmation vous a été envoyé avec tous les détails de votre commande.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-purple-900 dark:text-purple-100">
                    Livraison rapide
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>Dakar:</strong> Livraison en moins de 24h (hors dimanches/jours fériés)
                    <br />
                    <strong>Régions:</strong> Livraison entre 24h et 72h
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <h4 className="font-medium mb-2">Prochaines étapes</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Vous recevrez un email de confirmation</li>
                  <li>Votre commande sera préparée dans les plus brefs délais</li>
                  <li>Vous serez notifié lors de l&apos;expédition</li>
                  <li>Suivez votre commande depuis votre compte</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => router.push('/account/orders')} 
              className="flex-1"
              size="lg"
            >
              <Package className="w-4 h-4 mr-2" />
              Voir mes commandes
            </Button>
            <Button 
              onClick={() => router.push('/')} 
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour à l&apos;accueil
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Une question sur votre commande ?{' '}
              <a href="/contact" className="text-primary hover:underline">
                Contactez-nous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
