/**
 * Checkout Summary
 * Displays order summary in sidebar
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { useCheckout } from '@/hooks/use-checkout'
import { formatCFA } from '@/lib/utils/price-utils'
import { ShoppingBag, Truck } from 'lucide-react'

export function CheckoutSummary() {
  const { items, subtotal: subtotalCents } = useCart()
  const { shipping } = useCheckout()

  const subtotal = subtotalCents
  const shippingFees = shipping.fees
  const total = subtotal + shippingFees

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items count */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingBag className="h-4 w-4" />
            <span>Articles</span>
          </div>
          <span className="font-medium">{items.length}</span>
        </div>

        <Separator />

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Sous-total</span>
          <span className="font-medium">{formatCFA(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>Livraison</span>
          </div>
          <span className="font-medium">
            {shippingFees > 0 ? formatCFA(shippingFees) : 'À calculer'}
          </span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatCFA(total)}
          </span>
        </div>

        {/* Shipping info */}
        {shipping.zone && (
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs font-medium mb-1">Livraison</p>
            <p className="text-xs text-muted-foreground">
              {shipping.zone === 'DAKAR'
                ? 'Livraison en moins de 24h à Dakar'
                : shipping.zone === 'THIES'
                  ? 'Livraison en 24-48h à Thiès'
                  : 'Livraison en 48-72h dans les autres régions'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
