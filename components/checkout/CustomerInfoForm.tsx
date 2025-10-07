/**
 * Customer Info Form (Step 2)
 * Collects customer information for guest or logged-in users
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useCheckout } from '@/hooks/use-checkout'
import { useSession } from 'next-auth/react'

interface CustomerInfoFormProps {
  onNext: () => void
  onBack: () => void
}

export function CustomerInfoForm({ onNext, onBack }: CustomerInfoFormProps) {
  const { data: session } = useSession()
  const { customer, updateCustomer } = useCheckout()

  const [formData, setFormData] = useState({
    email: customer.email,
    name: customer.name,
    phone: customer.phone,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || prev.email,
        name: session.user.name || prev.name,
      }))
      updateCustomer({
        email: session.user.email || '',
        name: session.user.name || '',
        isGuest: false,
      })
    }
  }, [session])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Nom complet requis (min. 3 caractères)'
    }

    if (!formData.phone) {
      newErrors.phone = 'Téléphone requis'
    } else if (!/^(77|78|76|70|75)[0-9]{7}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Téléphone invalide (ex: 77 123 45 67)'
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
    updateCustomer({
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      isGuest: !session?.user,
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
      <Card>
        <CardHeader>
          <CardTitle>Vos informations</CardTitle>
          <CardDescription>
            {session?.user
              ? 'Vérifiez vos informations'
              : 'Entrez vos coordonnées pour la livraison'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!!session?.user?.email}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nom complet <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Prénom Nom"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Téléphone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="77 123 45 67"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Nous vous contacterons sur ce numéro pour la livraison
            </p>
          </div>

          {!session?.user && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                💡 Vous avez déjà un compte ?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Connectez-vous
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">Continuer vers la livraison</Button>
      </div>
    </form>
  )
}
