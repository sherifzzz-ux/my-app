import { NextRequest, NextResponse } from 'next/server'
import { getPayTechClient, generatePaymentReference } from '@/lib/paytech'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth-edge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface CheckoutItem {
  id: string
  name: string
  priceCents: number
  quantity: number
  imageUrl?: string | null
}

interface CustomerData {
  name: string
  phone: string
  city: string
  addressLine1: string
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const origin = req.headers.get('origin') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
    
    const { items, customer } = await req.json() as {
      items: CheckoutItem[]
      customer: CustomerData
    }

    // Validation des données
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    if (!customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: 'Nom et téléphone requis' },
        { status: 400 }
      )
    }

    // Calculer le total en FCFA
    const totalCents = items.reduce((sum, item) => {
      return sum + (item.priceCents * item.quantity)
    }, 0)

    // Convertir en FCFA (les centimes sont déjà en FCFA dans notre système)
    const totalFCFA = Math.round(totalCents)

    // Générer une référence unique pour la commande
    const refCommand = generatePaymentReference()

    // Créer la commande en base de données avec statut PENDING
    let order
    if (session?.user?.id) {
      // Si l'utilisateur est connecté
      order = await prisma.order.create({
        data: {
          userId: session.user.id,
          status: 'PENDING',
          totalCents: totalFCFA,
          items: {
            create: items.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              unitPriceCents: item.priceCents,
            })),
          },
        },
        include: {
          items: true,
        },
      })
    } else {
      // Pour les utilisateurs non connectés, on stocke les infos temporairement
      // On pourrait créer un utilisateur temporaire ou gérer autrement
      // Pour l'instant, on continue sans créer l'order
    }

    // Préparer les données pour PayTech
    const itemName = items.length === 1 
      ? items[0].name 
      : `Commande de ${items.length} article${items.length > 1 ? 's' : ''}`

    const customField = {
      order_id: order?.id || 'guest',
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_city: customer.city,
      customer_address: customer.addressLine1,
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        qty: i.quantity,
        price: i.priceCents,
      })),
    }

    // Créer la session de paiement PayTech
    const paytech = getPayTechClient()
    const payment = await paytech.createPayment({
      item_name: itemName,
      item_price: totalFCFA,
      currency: 'XOF',
      ref_command: refCommand,
      success_url: `${origin}/checkout/success?ref=${refCommand}`,
      cancel_url: `${origin}/checkout/cancel?ref=${refCommand}`,
      ipn_url: `${origin}/api/checkout/paytech-webhook`,
      custom_field: customField,
    })

    if (!payment.success) {
      return NextResponse.json(
        { error: payment.error || 'Erreur lors de la création du paiement' },
        { status: 500 }
      )
    }

    // Mettre à jour l'order avec la référence PayTech
    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          // On peut ajouter un champ metadata pour stocker ref_command
          // Pour l'instant on utilise les champs existants
        },
      })
    }

    return NextResponse.json({
      success: true,
      token: payment.token,
      url: payment.redirect_url,
      ref_command: refCommand,
    })
  } catch (error) {
    console.error('Erreur création session PayTech:', error)
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
