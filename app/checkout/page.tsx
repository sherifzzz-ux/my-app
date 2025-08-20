'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { formatCFA } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState({ name: '', phone: '', city: '', addressLine1: '' })
  const [status, setStatus] = useState<'idle' | 'success' | 'canceled'>('idle')
  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

  async function startPayment() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erreur de paiement')
      if (data.url) window.location.href = data.url as string
    } catch (e) {
      console.error(e)
      alert('Le paiement a échoué. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === '1') {
      setStatus('success')
      clear()
    } else if (params.get('canceled') === '1') {
      setStatus('canceled')
    }
  }, [clear])

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Paiement</h1>
      {status === 'success' ? (
        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-2">Merci pour votre commande !</h2>
          <p className="text-sm text-muted-foreground">
            Votre paiement a été confirmé. Un email de confirmation vous sera envoyé.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-muted-foreground">Votre panier est vide.</div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border p-4">
            <h2 className="font-medium mb-3">Adresse et contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Nom complet"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
              <input
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Téléphone"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
              <input
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Ville"
                value={customer.city}
                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
              />
              <input
                className="h-10 rounded-md border border-input bg-background px-3 text-sm md:col-span-2"
                placeholder="Adresse"
                value={customer.addressLine1}
                onChange={(e) => setCustomer({ ...customer, addressLine1: e.target.value })}
              />
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="font-medium mb-3">Récapitulatif</h2>
            <div className="flex items-center justify-between text-sm">
              <div>Total</div>
              <div className="font-medium">{formatCFA(totalCents)}</div>
            </div>
            <Button className="mt-4 w-full" onClick={startPayment} disabled={loading}>
              {loading ? 'Redirection vers le paiement...' : 'Payer avec Stripe'}
            </Button>
            {status === 'canceled' ? (
              <div className="text-xs text-red-600 mt-2">
                Paiement annulé. Vous pouvez réessayer.
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
