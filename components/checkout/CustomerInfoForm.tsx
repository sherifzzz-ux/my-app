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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useCheckout } from '@/hooks/use-checkout'
import { useSession } from 'next-auth/react'
import { DELIVERY_ZONES, VILLES } from '@/lib/delivery-zones'

interface CustomerInfoFormProps {
  onNext: () => void
  onBack: () => void
}

export function CustomerInfoForm({ onNext, onBack }: CustomerInfoFormProps) {
  const { data: session } = useSession()
  const { customer, updateCustomer } = useCheckout()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: customer.email,
    phone: customer.phone,
    ville: '',
    quartier: '',
    autreQuartier: '', // Pour le champ "Autre"
    adresseDetaillee: '',
    orderNote: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (session?.user) {
      const [firstName, ...lastNameParts] = (session.user.name || '').split(' ')
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || prev.email,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
      }))
    }
  }, [session])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'Prénom requis (min. 2 caractères)'
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Nom requis (min. 2 caractères)'
    }

    if (!formData.email) {
      newErrors.email = 'Email requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.phone) {
      newErrors.phone = 'Téléphone requis'
    } else if (!/^(77|78|76|70|75)[0-9]{7}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Téléphone invalide (ex: 77 123 45 67)'
    }

    if (!formData.ville) {
      newErrors.ville = 'Ville requise'
    }

    if (!formData.quartier) {
      newErrors.quartier = 'Quartier / Zone de livraison requis'
    }

    if (formData.quartier === 'Autre' && !formData.autreQuartier) {
      newErrors.autreQuartier = 'Veuillez préciser le quartier'
    }

    if (!formData.adresseDetaillee || formData.adresseDetaillee.length < 5) {
      newErrors.adresseDetaillee = 'Adresse détaillée requise (min. 5 caractères)'
    }

    if (formData.adresseDetaillee && formData.adresseDetaillee.length > 60) {
      newErrors.adresseDetaillee = 'Adresse détaillée trop longue (max. 60 caractères)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Update checkout state with all new fields
    updateCustomer({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      ville: formData.ville,
      quartier: formData.quartier === 'Autre' ? formData.autreQuartier : formData.quartier,
      adresseDetaillee: formData.adresseDetaillee,
      orderNote: formData.orderNote,
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
          <CardTitle>Informations du panier</CardTitle>
          <CardDescription>
            {session?.user
              ? 'Vérifiez vos informations de livraison'
              : 'Entrez vos coordonnées pour la livraison'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Prénom & Nom */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Prénom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Nom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Nom"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={errors.lastName ? 'border-destructive' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Téléphone & Email */}
          <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                E-mail <span className="text-destructive">*</span>
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
          </div>

          {/* Ville */}
          <div className="space-y-2">
            <Label htmlFor="ville">
              Ville <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.ville}
              onValueChange={(value) => handleChange('ville', value)}
            >
              <SelectTrigger className={errors.ville ? 'border-destructive' : ''}>
                <SelectValue placeholder="Sélectionnez votre ville" />
              </SelectTrigger>
              <SelectContent>
                {VILLES.map((ville) => (
                  <SelectItem key={ville} value={ville}>
                    {ville}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ville && (
              <p className="text-sm text-destructive">{errors.ville}</p>
            )}
          </div>

          {/* Quartier / Zone de livraison */}
          <div className="space-y-2">
            <Label htmlFor="quartier">
              Quartier / Zone de livraison <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.quartier}
              onValueChange={(value) => handleChange('quartier', value)}
            >
              <SelectTrigger className={errors.quartier ? 'border-destructive' : ''}>
                <SelectValue placeholder="Sélectionnez votre quartier" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {DELIVERY_ZONES.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.quartier && (
              <p className="text-sm text-destructive">{errors.quartier}</p>
            )}
          </div>

          {/* Autre quartier (si sélectionné) */}
          {formData.quartier === 'Autre' && (
            <div className="space-y-2">
              <Label htmlFor="autreQuartier">
                Précisez le quartier <span className="text-destructive">*</span>
              </Label>
              <Input
                id="autreQuartier"
                type="text"
                placeholder="Entrez le nom du quartier"
                value={formData.autreQuartier}
                onChange={(e) => handleChange('autreQuartier', e.target.value)}
                className={errors.autreQuartier ? 'border-destructive' : ''}
              />
              {errors.autreQuartier && (
                <p className="text-sm text-destructive">{errors.autreQuartier}</p>
              )}
            </div>
          )}

          {/* Adresse Détaillée - Point de repère */}
          <div className="space-y-2">
            <Label htmlFor="adresseDetaillee">
              Adresse Détaillée - Point de repère{' '}
              <span className="text-destructive">*</span>
              <span className="text-xs text-muted-foreground ml-1">(60 caractères max)</span>
            </Label>
            <Input
              id="adresseDetaillee"
              type="text"
              placeholder="Ex: En face de la station Total, à côté de la pharmacie"
              value={formData.adresseDetaillee}
              onChange={(e) => handleChange('adresseDetaillee', e.target.value)}
              maxLength={60}
              className={errors.adresseDetaillee ? 'border-destructive' : ''}
            />
            <p className="text-xs text-muted-foreground">
              {formData.adresseDetaillee.length}/60 caractères
            </p>
            {errors.adresseDetaillee && (
              <p className="text-sm text-destructive">{errors.adresseDetaillee}</p>
            )}
          </div>

          {/* Note de commande (facultatif) */}
          <div className="space-y-2">
            <Label htmlFor="orderNote">
              Note de commande <span className="text-xs text-muted-foreground">(facultatif)</span>
            </Label>
            <Textarea
              id="orderNote"
              placeholder="Instructions spéciales pour votre commande..."
              value={formData.orderNote}
              onChange={(e) => handleChange('orderNote', e.target.value)}
              rows={3}
            />
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
        <Button type="submit">Continuer vers le paiement</Button>
      </div>
    </form>
  )
}
