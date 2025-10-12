/**
 * Checkout Cancel Page
 * Displays when user cancels payment
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { XCircle, ShoppingCart, Home } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Cancel message */}
          <Card className="border-yellow-200 dark:border-yellow-900">
            <CardContent className="pt-12 pb-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Paiement annulé</h1>
                <p className="text-lg text-muted-foreground">
                  Votre paiement a été annulé. Aucun montant n&apos;a été débité.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info card */}
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Vous avez annulé le processus de paiement. Vos articles sont toujours dans votre panier.
                </p>
                <p className="text-sm text-muted-foreground">
                  Besoin d&apos;aide ? N&apos;hésitez pas à nous contacter.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/panier">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Voir mon panier
              </Link>
            </Button>
          </div>

          {/* Contact info */}
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">Besoin d&apos;assistance ?</p>
                <p className="text-sm text-muted-foreground">
                  Contactez notre service client pour toute question.
                </p>
                <Button asChild variant="link" className="text-primary">
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
