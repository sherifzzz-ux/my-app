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
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const rawBody = await req.text()

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook non configuré' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed': {
        // TODO: marquer commande comme payée, créer record Order / OrderItem
        break
      }
      default:
        break
    }
    return NextResponse.json({ received: true })
  } catch (err: unknown) {
    console.error('webhook error', err)
    const message = err instanceof Error ? err.message : 'Erreur de signature'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
