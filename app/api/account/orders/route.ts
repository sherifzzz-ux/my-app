import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createServiceSupabaseClient()
    
    // Construire la requête de base
    let query = supabase
      .from('Order')
      .select(`
        *,
        items: OrderItem (
          *,
          Product (
            id,
            name,
            "priceCents",
            "imageUrl"
          )
        )
      `)
      .eq('userId', session.user.id)
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filtrer par statut si spécifié
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data: orders, error, count } = await query

    if (error) {
      console.error('Erreur lors de la récupération des commandes:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la récupération des commandes' 
      }, { status: 500 })
    }

    // Formater les données pour l'affichage
    const formattedOrders = orders?.map(order => ({
      id: order.id,
      date: order.createdAt,
      status: order.status,
      statusText: getStatusText(order.status),
      total: (order.totalAmount || 0) / 100, // Convertir en euros
      items: order.items?.length || 0,
      tracking: order.trackingNumber || 'Non disponible',
      address: order.shippingAddress || 'Adresse à implémenter',
      paymentMethod: order.paymentMethod || 'Carte bancaire',
      estimatedDelivery: getEstimatedDelivery(order.status, order.createdAt),
      products: order.items?.map(item => ({
        id: item.productId,
        name: item.Product?.name || 'Produit inconnu',
        price: (item.unitPrice || 0) / 100, // Convertir en euros
        quantity: item.quantity,
        image: item.Product?.["imageUrl"]
      })) || []
    })) || []

    return NextResponse.json({
      orders: formattedOrders,
      total: count || 0,
      hasMore: (offset + limit) < (count || 0)
    })
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'En attente',
    'processing': 'En cours de traitement',
    'shipped': 'En cours de livraison',
    'delivered': 'Livrée',
    'cancelled': 'Annulée',
    'refunded': 'Remboursée'
  }
  return statusMap[status] || status
}

function getEstimatedDelivery(status: string, createdDate: string): string {
  if (status === 'delivered') {
    return 'Livrée'
  }
  
  if (status === 'cancelled') {
    return 'Commande annulée'
  }

  const created = new Date(createdDate)
  const estimated = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000) // +7 jours
  
  return `Livraison estimée le ${estimated.toLocaleDateString('fr-FR')}`
}
