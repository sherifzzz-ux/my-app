/**
 * Checkout Page
 * Multi-step checkout flow with PayTech integration
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCart } from '@/hooks/use-cart'
import { useCheckout } from '@/hooks/use-checkout'
import { createOrder } from '@/server/actions/checkout'
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout'
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps'
import { CheckoutCart } from '@/components/checkout/CheckoutCart'
import { CustomerInfoForm } from '@/components/checkout/CustomerInfoForm'
import { ShippingSelector } from '@/components/checkout/ShippingSelector'
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector'
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, clear: clearCart } = useCart()
  const { step, goToStep, nextStep, previousStep, customer, shipping, payment, reset } = useCheckout()
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0 && step !== 1) {
      router.push('/cart')
    }
  }, [items.length, step, router])

  // Handle checkout submission
  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // 1. Create order
      const result = await createOrder({
        customer,
        shipping,
        payment,
        termsAccepted: true,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          priceCents: item.priceCents,
        })),
      })

      if (!result.success || !result.orderId) {
        throw new Error(result.error || 'Failed to create order')
      }

      // 2. Handle payment method
      if (payment.method === 'CASH_ON_DELIVERY') {
        // Paiement à la livraison - Redirect to success page directly
        clearCart()
        reset()
        router.push(`/checkout/success?orderId=${result.orderId}&method=cash`)
      } else {
        // Online payment via PayTech
        const sessionResponse = await fetch('/api/paytech/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: result.orderId }),
        })

        if (!sessionResponse.ok) {
          const errorData = await sessionResponse.json()
          
          if (sessionResponse.status === 503) {
            throw new Error(
              'Le système de paiement n\'est pas disponible pour le moment. Veuillez réessayer plus tard ou contacter le support.'
            )
          }
          
          throw new Error(
            errorData.details || errorData.error || 'Impossible de créer la session de paiement'
          )
        }

        const sessionData = await sessionResponse.json()

        if (!sessionData.redirectUrl) {
          throw new Error('Aucune URL de redirection reçue du système de paiement')
        }

        // Clear cart and checkout state
        clearCart()
        reset()

        // Redirect to PayTech
        window.location.href = sessionData.redirectUrl
      }
    } catch (error) {
      console.error('Checkout error:', error)
      
      const errorMessage = error instanceof Error
        ? error.message
        : 'Une erreur est survenue. Veuillez réessayer.'
      
      toast.error('Erreur de paiement', {
        description: errorMessage,
        duration: 5000,
      })
      
      setIsLoading(false)
    }
  }

  // Empty cart message
  if (items.length === 0) {
    return (
      <CheckoutLayout>
        <div className="max-w-2xl mx-auto py-12">
          <Card>
            <CardContent className="py-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
                <p className="text-muted-foreground">
                  Ajoutez des produits à votre panier pour passer commande
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/catalog">Continuer les achats</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </CheckoutLayout>
    )
  }

  return (
    <CheckoutLayout>
      {/* Progress bar */}
      <CheckoutSteps currentStep={step} />

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Main content */}
        <div className="lg:col-span-2">
          {step === 1 && <CheckoutCart onNext={nextStep} />}
          {step === 2 && (
            <CustomerInfoForm
              onNext={nextStep}
              onBack={previousStep}
            />
          )}
          {step === 3 && (
            <ShippingSelector
              onNext={nextStep}
              onBack={previousStep}
            />
          )}
          {step === 4 && (
            <PaymentMethodSelector
              onBack={previousStep}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Sidebar summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </CheckoutLayout>
  )
}
