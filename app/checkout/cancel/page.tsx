'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderRef, setOrderRef] = useState<string>('')

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      setOrderRef(ref)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-red-950/10 dark:to-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Animation d'annulation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Paiement annulé
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Votre paiement n&apos;a pas été effectué
            </p>
          </div>

          {/* Informations */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Que s&apos;est-il passé ?</CardTitle>
              <CardDescription>
                {orderRef && (
                  <>
                    Référence: <span className="font-mono font-semibold">{orderRef}</span>
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Vous avez annulé le processus de paiement ou celui-ci a expiré. 
                  Votre panier a été conservé et aucun montant n&apos;a été débité.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Raisons possibles :</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Vous avez cliqué sur le bouton &quot;Annuler&quot; ou &quot;Retour&quot;</li>
                  <li>La session de paiement a expiré</li>
                  <li>Une erreur s&apos;est produite avec votre moyen de paiement</li>
                  <li>Vous avez fermé la fenêtre de paiement</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Que faire maintenant ?
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Vos articles sont toujours dans votre panier. Vous pouvez retourner au panier 
                  et réessayer le paiement quand vous le souhaitez.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => router.push('/cart')} 
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Retour au panier
            </Button>
            <Button 
              onClick={() => router.push('/catalog')} 
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer mes achats
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Besoin d&apos;aide ?{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contactez notre service client
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
