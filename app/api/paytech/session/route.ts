/**
 * PayTech Session Creation API Route
 * Creates a PayTech payment session for an order
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPaytechSession, formatPaytechAmount } from '@/lib/paytech/api'
import { paytechConfig } from '@/lib/paytech/config'
import { checkRateLimit, getRateLimitIdentifier, rateLimitConfig } from '@/lib/rate-limit'
import { paytechSessionSchema } from '@/lib/validations/checkout'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(req)
    const rateLimit = checkRateLimit(
      identifier,
      rateLimitConfig.payment.maxAttempts,
      rateLimitConfig.payment.windowMs
    )

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request
    const body = await req.json()
    const validation = paytechSessionSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { orderId } = validation.data

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // 1. Récupérer la commande
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // 2. Vérifier que la commande n'est pas déjà payée
    if (order.paymentStatus === 'PAID') {
      return NextResponse.json(
        { error: 'Order is already paid' },
        { status: 400 }
      )
    }

    // 3. Créer la session PayTech
    const session = await createPaytechSession({
      item_name: `Commande FlawlessBeauty #${order.orderNumber}`,
      item_price: formatPaytechAmount(order.totalCents),
      currency: paytechConfig.currency,
      ref_command: order.orderNumber,
      command_name: `Order-${order.orderNumber}`,
      env: paytechConfig.env as 'test' | 'production',
      custom_field: orderId, // Notre ID pour retrouver la commande
      ipn_url: paytechConfig.ipnUrl,
      success_url: paytechConfig.successUrl,
      cancel_url: paytechConfig.cancelUrl,
    })

    // 4. Sauvegarder le token PayTech dans la commande
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paytechToken: session.token,
        paytechRef: session.ref_command,
        paymentStatus: 'PROCESSING',
      },
    })

    // 5. Retourner l'URL de redirection
    return NextResponse.json({
      success: true,
      redirectUrl: session.redirect_url,
      token: session.token,
    })
  } catch (error) {
    console.error('PayTech session creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create payment session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
