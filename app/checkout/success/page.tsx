/**
 * Checkout Success Page
 * Displays order confirmation after successful payment
 */

import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Package, Truck, Mail, Home, AlertCircle } from 'lucide-react'
import { getOrder, getOrderByNumber, confirmCashOnDeliveryOrder } from '@/server/actions/checkout'
import { formatCFA } from '@/lib/utils/price-utils'
import { getDeliveryDelay } from '@/lib/paytech/config'

interface SearchParams {
  token?: string
  ref?: string
  order?: string
  orderId?: string
  method?: string
}

async function SuccessContent({ searchParams }: { searchParams: SearchParams }) {
  // Try to get order from params
  let order = null
  let error = null
  let isCashOnDelivery = searchParams.method === 'cash'

  // Handle cash on delivery
  if (searchParams.orderId && isCashOnDelivery) {
    const result = await getOrder(searchParams.orderId)
    if (result.success && result.order) {
      order = result.order
      
      // Confirm the order and update stock
      if (order.status === 'PENDING') {
        await confirmCashOnDeliveryOrder(searchParams.orderId)
      }
    } else {
      error = result.error
    }
  }
  // Handle order number
  else if (searchParams.order) {
    const result = await getOrderByNumber(searchParams.order)
    if (result.success) {
      order = result.order
    } else {
      error = result.error
    }
  }
  // Verify PayTech payment if token provided
  else if (searchParams.token && !order) {
    try {
      const verifyResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/paytech/verify?token=${searchParams.token}`,
        { cache: 'no-store' }
      )
      const verifyData = await verifyResponse.json()

      if (verifyData.success && verifyData.ref_command) {
        const result = await getOrderByNumber(verifyData.ref_command)
        if (result.success) {
          order = result.order
        }
      }
    } catch (err) {
      console.error('Payment verification error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success message */}
          <Card className="border-green-200 dark:border-green-900">
            <CardContent className="pt-12 pb-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Commande confirmée !</h1>
                <p className="text-lg text-muted-foreground">
                  {isCashOnDelivery
                    ? "Merci pour votre commande. Vous paierez à la livraison."
                    : "Merci pour votre commande. Nous avons bien reçu votre paiement."}
                </p>
              </div>
              {order && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                  <Package className="w-4 h-4" />
                  <span className="font-mono font-semibold">
                    #{order.orderNumber}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cash on delivery notice */}
          {isCashOnDelivery && order && (
            <Card className="border-blue-200 dark:border-blue-900">
              <CardContent className="py-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1 text-blue-600 dark:text-blue-400">
                      Paiement à la livraison
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vous devrez payer <span className="font-semibold">{formatCFA(order.totalCents)}</span> en espèces lors de la réception de votre commande.
                      Assurez-vous d&apos;avoir le montant exact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order details */}
          {order && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Détails de la commande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {formatCFA(item.unitPriceCents * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{formatCFA(order.subtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span>{formatCFA(order.shippingCents)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">
                        {formatCFA(order.totalCents)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Adresse de livraison
                    </p>
                    <p className="font-medium">{order.shippingName}</p>
                    <p className="text-sm">{order.shippingAddress}</p>
                    <p className="text-sm">
                      {order.shippingCity}, {order.shippingZone}
                    </p>
                    <p className="text-sm">{order.shippingPhone}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                    <p className="text-sm font-medium">
                      {getDeliveryDelay(order.shippingZone)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Email confirmation */}
              <Card>
                <CardContent className="py-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">
                        Email de confirmation envoyé
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Un email de confirmation a été envoyé à{' '}
                        <span className="font-medium">
                          {order.guestEmail || order.user?.email}
                        </span>
                        . Vous y trouverez tous les détails de votre commande.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Error message */}
          {error && (
            <Card className="border-yellow-200 dark:border-yellow-900">
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  {error}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/account/orders">
                <Package className="mr-2 h-4 w-4" />
                Voir mes commandes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
      }
    >
      <SuccessContent searchParams={params} />
    </Suspense>
  )
}
