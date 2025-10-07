import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Récupérer les statistiques de l'utilisateur
    const userId = session.user.id
    
    // Compter les commandes par statut
    const { data: orderStats, error: orderError } = await supabase
      .from('Order')
      .select('status, "totalAmount"')
      .eq('userId', userId)

    if (orderError) {
      console.error('Erreur lors de la récupération des statistiques de commandes:', orderError)
    }

    // Compter les favoris
    const { count: favoritesCount, error: favoritesError } = await supabase
      .from('user_favorites')
      .select('*', { count: 'exact', head: true })
      .eq('userId', userId)

    if (favoritesError) {
      console.error('Erreur lors du comptage des favoris:', favoritesError)
    }

    // Calculer les statistiques
    const stats = {
      orders: {
        total: orderStats?.length || 0,
        byStatus: {
          pending: orderStats?.filter(o => o.status === 'pending').length || 0,
          processing: orderStats?.filter(o => o.status === 'processing').length || 0,
          shipped: orderStats?.filter(o => o.status === 'shipped').length || 0,
          delivered: orderStats?.filter(o => o.status === 'delivered').length || 0,
          cancelled: orderStats?.filter(o => o.status === 'cancelled').length || 0
        },
        totalSpent: orderStats?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0
      },
      favorites: favoritesCount || 0,
      points: Math.floor((orderStats?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0) / 10), // 10 points par euro
      savings: orderStats?.reduce((sum, order) => {
        // Calculer les économies basées sur les réductions (à implémenter)
        return sum + 0
      }, 0) || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}
