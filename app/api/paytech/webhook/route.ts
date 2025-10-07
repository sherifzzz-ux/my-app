/**
 * PayTech Webhook (IPN) API Route
 * Handles payment notifications from PayTech
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handlePaytechWebhook } from '@/lib/paytech/api'
import type { PaytechIPNPayload } from '@/lib/paytech/types'
import { paytechWebhookSchema } from '@/lib/validations/checkout'

export async function POST(req: NextRequest) {
  try {
    // 1. Parse and validate the payload
    const body = await req.json()
    const validation = paytechWebhookSchema.safeParse(body)

    if (!validation.success) {
      console.error('Invalid webhook payload:', validation.error)
      return NextResponse.json(
        { error: 'Invalid payload', details: validation.error.issues },
        { status: 400 }
      )
    }

    const payload: PaytechIPNPayload = body

    console.log('PayTech IPN received:', payload)

    // 2. Handle the webhook (verifies signature)
    const result = await handlePaytechWebhook(payload)

    if (!result.success) {
      console.error('Webhook validation failed:', result.error)
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    if (!result.orderId) {
      console.error('Order ID not found in webhook payload')
      return NextResponse.json(
        { error: 'Order ID missing' },
        { status: 400 }
      )
    }

    // 3. Récupérer la commande
    const order = await prisma.order.findUnique({
      where: { id: result.orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      console.error('Order not found:', result.orderId)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // 4. Mettre à jour le statut selon l'événement PayTech
    switch (result.status) {
      case 'success':
        // Paiement réussi
        await prisma.order.update({
          where: { id: result.orderId },
          data: {
            paymentStatus: 'PAID',
            status: 'CONFIRMED',
          },
        })

        // TODO: Envoyer email de confirmation
        // await sendOrderConfirmationEmail(order)

        // TODO: Mettre à jour le stock des produits
        // await updateProductStock(order.items)

        console.log('Order confirmed:', order.orderNumber)
        break

      case 'cancelled':
        // Paiement annulé
        await prisma.order.update({
          where: { id: result.orderId },
          data: {
            paymentStatus: 'CANCELLED',
            status: 'CANCELLED',
          },
        })

        console.log('Order cancelled:', order.orderNumber)
        break

      case 'refunded':
        // Paiement remboursé
        await prisma.order.update({
          where: { id: result.orderId },
          data: {
            paymentStatus: 'REFUNDED',
          },
        })

        // TODO: Restaurer le stock
        console.log('Order refunded:', order.orderNumber)
        break

      default:
        console.warn('Unknown payment status:', result.status)
    }

    // 5. Confirmer la réception du webhook
    return NextResponse.json({
      success: true,
      received: true,
      orderId: result.orderId,
      status: result.status,
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET method for testing
export async function GET() {
  return NextResponse.json({
    message: 'PayTech webhook endpoint is active',
    timestamp: new Date().toISOString(),
  })
}
