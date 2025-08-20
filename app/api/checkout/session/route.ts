import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY manquant côté serveur')
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-07-30.basil',
  })
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') ?? process.env.AUTH_URL ?? 'http://localhost:3000'
    const { items, customer } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    const line_items = items.map(
      (i: { name: string; priceCents: number; quantity: number; imageUrl?: string | null }) => ({
        price_data: {
          currency: 'xof',
          product_data: {
            name: i.name,
            images: i.imageUrl ? [i.imageUrl] : undefined,
          },
          // XOF = devise à 0 décimales → envoyer le montant en unité entière
          unit_amount: Math.max(0, Math.round((i.priceCents ?? 0) / 100)),
        },
        quantity: Math.max(1, Math.round(i.quantity ?? 1)),
      }),
    )

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout?success=1`,
      cancel_url: `${origin}/checkout?canceled=1`,
      currency: 'xof',
      metadata: {
        customer_name: customer?.name ?? '',
        customer_phone: customer?.phone ?? '',
        customer_city: customer?.city ?? '',
        customer_address: customer?.addressLine1 ?? '',
      },
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: unknown) {
    console.error('checkout session error', err)
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
