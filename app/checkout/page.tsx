'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { formatCFA } from '@/lib/utils'
import { ShoppingBag, CreditCard, Shield, Truck, Smartphone } from 'lucide-react'
import Image from 'next/image'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState({ 
    name: '', 
    phone: '', 
    city: '', 
    addressLine1: '' 
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!customer.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    
    if (!customer.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    } else if (!/^(77|78|76|70|75)\d{7}$/.test(customer.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone sénégalais invalide'
    }
    
    if (!customer.city.trim()) {
      newErrors.city = 'La ville est requise'
    }
    
    if (!customer.addressLine1.trim()) {
      newErrors.addressLine1 = 'L\'adresse est requise'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function startPayment() {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout/paytech-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data?.error || 'Erreur de paiement')
      }
      
      if (data.url) {
        window.location.href = data.url as string
      }
    } catch (e) {
      console.error(e)
      alert(e instanceof Error ? e.message : 'Le paiement a échoué. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">
            Ajoutez des articles à votre panier pour passer une commande
          </p>
          <Button onClick={() => window.location.href = '/catalog'}>
            Continuer mes achats
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finaliser ma commande</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire de commande */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations client */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de livraison</CardTitle>
                <CardDescription>
                  Entrez vos coordonnées pour la livraison
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      placeholder="Prénom et nom"
                      value={customer.name}
                      onChange={(e) => {
                        setCustomer({ ...customer, name: e.target.value })
                        setErrors({ ...errors, name: '' })
                      }}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="77 123 45 67"
                      value={customer.phone}
                      onChange={(e) => {
                        setCustomer({ ...customer, phone: e.target.value })
                        setErrors({ ...errors, phone: '' })
                      }}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    placeholder="Dakar, Thiès, Saint-Louis..."
                    value={customer.city}
                    onChange={(e) => {
                      setCustomer({ ...customer, city: e.target.value })
                      setErrors({ ...errors, city: '' })
                    }}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Input
                    id="address"
                    placeholder="Quartier, rue, numéro..."
                    value={customer.addressLine1}
                    onChange={(e) => {
                      setCustomer({ ...customer, addressLine1: e.target.value })
                      setErrors({ ...errors, addressLine1: '' })
                    }}
                    className={errors.addressLine1 ? 'border-red-500' : ''}
                  />
                  {errors.addressLine1 && (
                    <p className="text-sm text-red-500">{errors.addressLine1}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Informations de livraison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                    <div>
                      <strong>Dakar:</strong> Livraison en moins de 24h (hors dimanches et jours fériés)
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                    <div>
                      <strong>Autres régions:</strong> Livraison entre 24h et 72h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Moyens de paiement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Moyens de paiement
                </CardTitle>
                <CardDescription>
                  Paiement 100% sécurisé avec PayTech
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded border">
                    <Smartphone className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">Wave</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded border">
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">Orange Money</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded border">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Carte bancaire</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé par PayTech</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Articles */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      {item.imageUrl && (
                        <div className="relative w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qté: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium whitespace-nowrap">
                        {formatCFA(item.priceCents * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatCFA(totalCents)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCFA(totalCents)}</span>
                  </div>
                </div>

                {/* Bouton de paiement */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={startPayment} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Redirection...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Payer {formatCFA(totalCents)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  En passant commande, vous acceptez nos conditions générales de vente
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
