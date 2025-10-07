/**
 * Checkout Cart (Step 1)
 * Display cart items summary
 */

'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import { formatCFA } from '@/lib/utils/price-utils'
import { Trash2 } from 'lucide-react'

interface CheckoutCartProps {
  onNext: () => void
}

export function CheckoutCart({ onNext }: CheckoutCartProps) {
  const { items, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Votre panier est vide</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Votre panier ({items.length} articles)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 border-b last:border-0"
              >
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      Pas d&apos;image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatCFA(item.priceCents)} × {item.quantity}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>

                {/* Total */}
                <div className="text-right min-w-[100px]">
                  <p className="font-semibold">
                    {formatCFA(item.priceCents * item.quantity)}
                  </p>
                </div>

                {/* Remove */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue button */}
      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Continuer vers les informations
        </Button>
      </div>
    </div>
  )
}
