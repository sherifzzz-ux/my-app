/**
 * Shipping Selector (Step 3)
 * Select shipping zone and enter address
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useCheckout } from '@/hooks/use-checkout'
import { paytechConfig, getShippingFees, getDeliveryDelay } from '@/lib/paytech/config'
import type { ShippingZone } from '@/lib/paytech/config'
import { formatCFA } from '@/lib/utils/price-utils'
import { Truck, MapPin } from 'lucide-react'

interface ShippingSelectorProps {
  onNext: () => void
  onBack: () => void
}

export function ShippingSelector({ onNext, onBack }: ShippingSelectorProps) {
  const { shipping, updateShipping } = useCheckout()

  const [formData, setFormData] = useState({
    zone: shipping.zone,
    address: shipping.address,
    city: shipping.city,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update fees when zone changes
  useEffect(() => {
    const fees = getShippingFees(formData.zone)
    updateShipping({ zone: formData.zone, fees })
  }, [formData.zone])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.address || formData.address.length < 10) {
      newErrors.address = 'Adresse requise (min. 10 caractères)'
    }

    if (!formData.city || formData.city.length < 2) {
      newErrors.city = 'Ville requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Update checkout state
    updateShipping({
      zone: formData.zone,
      address: formData.address,
      city: formData.city,
      fees: getShippingFees(formData.zone),
    })

    onNext()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Zone selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Zone de livraison
          </CardTitle>
          <CardDescription>
            Sélectionnez votre zone pour calculer les frais de livraison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.zone}
            onValueChange={(value) => handleChange('zone', value)}
          >
            {(Object.keys(paytechConfig.shippingZones) as ShippingZone[]).map((zone) => {
              const zoneInfo = paytechConfig.shippingZones[zone]
              return (
                <div
                  key={zone}
                  className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <RadioGroupItem value={zone} id={zone} />
                  <Label
                    htmlFor={zone}
                    className="flex-1 cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{zoneInfo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {zoneInfo.delay}
                      </p>
                    </div>
                    <p className="font-semibold text-primary">
                      {formatCFA(zoneInfo.feeCents)}
                    </p>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Adresse de livraison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">
              Ville <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Ex: Dakar, Thiès, Saint-Louis..."
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={errors.city ? 'border-destructive' : ''}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Adresse complète <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="address"
              placeholder="Numéro, rue, quartier, point de repère..."
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={4}
              className={errors.address ? 'border-destructive' : ''}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Indiquez un point de repère pour faciliter la livraison
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">Continuer vers le paiement</Button>
      </div>
    </form>
  )
}
