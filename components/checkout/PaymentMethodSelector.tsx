/**
 * Payment Method Selector (Step 4)
 * Select payment method and review order
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useCheckout, useCheckoutValidation } from '@/hooks/use-checkout'
import type { PaymentMethod } from '@/lib/paytech/types'
import { CreditCard, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface PaymentMethodSelectorProps {
  onBack: () => void
  onSubmit: () => Promise<void>
}

const paymentMethods: { value: PaymentMethod; label: string; icon: string; description: string }[] = [
  {
    value: 'ORANGE_MONEY',
    label: 'Orange Money',
    icon: '🟠',
    description: 'Paiement sécurisé via Orange Money',
  },
  {
    value: 'WAVE',
    label: 'Wave',
    icon: '🔵',
    description: 'Paiement sécurisé via Wave',
  },
  {
    value: 'CARD',
    label: 'Carte Bancaire',
    icon: '💳',
    description: 'Visa, Mastercard',
  },
  {
    value: 'CASH_ON_DELIVERY',
    label: 'Paiement à la livraison',
    icon: '💵',
    description: 'Payez en espèces à la réception',
  },
]

export function PaymentMethodSelector({ onBack, onSubmit }: PaymentMethodSelectorProps) {
  const { payment, selectPaymentMethod, termsAccepted, acceptTerms } = useCheckout()
  const { canSubmit } = useCheckoutValidation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canSubmit) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit()
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Méthode de paiement
          </CardTitle>
          <CardDescription>
            Choisissez votre moyen de paiement préféré
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={payment.method}
            onValueChange={(value) => selectPaymentMethod(value as PaymentMethod)}
          >
            {paymentMethods.map((method) => (
              <div
                key={method.value}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors"
              >
                <RadioGroupItem value={method.value} id={method.value} />
                <Label
                  htmlFor={method.value}
                  className="flex-1 cursor-pointer flex items-center gap-3"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <p className="font-medium">{method.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Terms and conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => acceptTerms(checked === true)}
            />
            <Label
              htmlFor="terms"
              className="text-sm cursor-pointer leading-relaxed"
            >
              J&apos;accepte les{' '}
              <Link
                href="/conditions-generales"
                target="_blank"
                className="text-primary hover:underline"
              >
                conditions générales de vente
              </Link>{' '}
              et la{' '}
              <Link
                href="/politique-confidentialite"
                target="_blank"
                className="text-primary hover:underline"
              >
                politique de confidentialité
              </Link>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Security notice */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
        <div className="flex gap-3">
          <span className="text-2xl">🔒</span>
          <div className="flex-1">
            <p className="font-medium text-sm">Paiement sécurisé</p>
            <p className="text-xs text-muted-foreground mt-1">
              Vos informations de paiement sont cryptées et sécurisées.
              Nous ne stockons jamais vos données bancaires.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Retour
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit || isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement...
            </>
          ) : (
            'Finaliser la commande'
          )}
        </Button>
      </div>
    </form>
  )
}
