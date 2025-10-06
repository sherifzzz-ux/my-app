import { NextRequest, NextResponse } from 'next/server'
import { getPayTechClient, type PayTechIPNData } from '@/lib/paytech'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Webhook IPN (Instant Payment Notification) de PayTech
 * Documentation: https://docs.intech.sn/doc_paytech.php#ipn
 */
export async function POST(req: NextRequest) {
  try {
    // Récupérer les données envoyées par PayTech
    const body = await req.json()
    
    const ipnData: PayTechIPNData = {
      type_event: body.type_event,
      ref_command: body.ref_command,
      item_name: body.item_name,
      item_price: body.item_price,
      devise: body.devise,
      payment_method: body.payment_method,
      payment_ref: body.payment_ref,
      custom_field: body.custom_field,
    }

    // Récupérer la signature pour vérification
    const signature = req.headers.get('paytech-signature') || body.signature

    if (!signature) {
      console.error('Webhook PayTech: signature manquante')
      return NextResponse.json(
        { error: 'Signature manquante' },
        { status: 400 }
      )
    }

    // Vérifier la signature pour s'assurer que la requête vient bien de PayTech
    const paytech = getPayTechClient()
    const isValid = paytech.verifyIPNSignature(ipnData, signature)

    if (!isValid) {
      console.error('Webhook PayTech: signature invalide')
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      )
    }

    console.log('Webhook PayTech reçu:', {
      event: ipnData.type_event,
      ref: ipnData.ref_command,
      method: ipnData.payment_method,
    })

    // Traiter selon le type d'événement
    switch (ipnData.type_event) {
      case 'sale_complete':
      case 'payment_complete': {
        // Paiement réussi
        await handleSuccessfulPayment(ipnData)
        break
      }
      
      case 'sale_cancelled':
      case 'payment_cancelled': {
        // Paiement annulé
        await handleCancelledPayment(ipnData)
        break
      }
      
      case 'sale_failed':
      case 'payment_failed': {
        // Paiement échoué
        await handleFailedPayment(ipnData)
        break
      }
      
      default:
        console.log('Événement PayTech non géré:', ipnData.type_event)
    }

    // Toujours retourner un succès à PayTech
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erreur webhook PayTech:', error)
    // Même en cas d'erreur, on retourne 200 pour éviter que PayTech réessaie
    return NextResponse.json({ error: 'Internal error' }, { status: 200 })
  }
}

/**
 * Traite un paiement réussi
 */
async function handleSuccessfulPayment(data: PayTechIPNData) {
  try {
    // Extraire les données personnalisées
    let customData: any = {}
    if (data.custom_field) {
      try {
        customData = JSON.parse(data.custom_field)
      } catch {
        console.error('Impossible de parser custom_field')
      }
    }

    const orderId = customData.order_id

    if (!orderId || orderId === 'guest') {
      // Commande invité - créer la commande maintenant
      console.log('Création commande invité après paiement:', data.ref_command)
      
      // TODO: Créer un utilisateur invité si nécessaire
      // Pour l'instant, on log juste
      console.log('Commande invité payée:', {
        ref: data.ref_command,
        amount: data.item_price,
        method: data.payment_method,
        customer: customData.customer_name,
      })
      
      return
    }

    // Mettre à jour la commande existante
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      console.error('Commande introuvable:', orderId)
      return
    }

    if (order.status === 'PAID') {
      console.log('Commande déjà payée:', orderId)
      return
    }

    // Mettre à jour le statut de la commande
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        updatedAt: new Date(),
      },
    })

    console.log('Commande marquée comme payée:', {
      orderId,
      ref: data.ref_command,
      method: data.payment_method,
      amount: data.item_price,
    })

    // TODO: Envoyer un email de confirmation avec Resend
    // TODO: Mettre à jour le stock des produits
    // TODO: Créer une notification pour l'admin
  } catch (error) {
    console.error('Erreur lors du traitement du paiement réussi:', error)
    throw error
  }
}

/**
 * Traite un paiement annulé
 */
async function handleCancelledPayment(data: PayTechIPNData) {
  try {
    let customData: any = {}
    if (data.custom_field) {
      try {
        customData = JSON.parse(data.custom_field)
      } catch {
        console.error('Impossible de parser custom_field')
      }
    }

    const orderId = customData.order_id

    if (orderId && orderId !== 'guest') {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          updatedAt: new Date(),
        },
      })
      
      console.log('Commande annulée:', orderId)
    }
  } catch (error) {
    console.error('Erreur lors du traitement du paiement annulé:', error)
  }
}

/**
 * Traite un paiement échoué
 */
async function handleFailedPayment(data: PayTechIPNData) {
  try {
    let customData: any = {}
    if (data.custom_field) {
      try {
        customData = JSON.parse(data.custom_field)
      } catch {
        console.error('Impossible de parser custom_field')
      }
    }

    const orderId = customData.order_id

    if (orderId && orderId !== 'guest') {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          updatedAt: new Date(),
        },
      })
      
      console.log('Commande échouée:', orderId)
    }
  } catch (error) {
    console.error('Erreur lors du traitement du paiement échoué:', error)
  }
}
