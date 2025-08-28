'use client'

import { memo, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  TrendingUp,
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface UserStats {
  orders: {
    total: number
    byStatus: {
      pending: number
      processing: number
      shipped: number
      delivered: number
      cancelled: number
    }
    totalSpent: number
  }
  favorites: number
  points: number
  savings: number
}

interface StatsCardsProps {
  stats: UserStats | null
  loading?: boolean
}

const StatsCards = memo<StatsCardsProps>(({ stats, loading = false }) => {
  // Memoization des données calculées
  const processedStats = useMemo(() => {
    if (!stats) return null

    return {
      orders: {
        total: stats.orders.total,
        pending: stats.orders.byStatus.pending,
        processing: stats.orders.byStatus.processing,
        shipped: stats.orders.byStatus.shipped,
        delivered: stats.orders.byStatus.delivered,
        cancelled: stats.orders.byStatus.cancelled,
        totalSpent: stats.orders.totalSpent
      },
      favorites: stats.favorites,
      points: stats.points,
      savings: stats.savings
    }
  }, [stats])

  // Memoization des cartes de statistiques
  const statsCards = useMemo(() => {
    if (!processedStats) return []

    return [
      {
        id: 'orders',
        title: 'Commandes',
        value: processedStats.orders.total,
        icon: ShoppingBag,
        color: 'blue',
        gradient: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        valueText: 'text-blue-800'
      },
      {
        id: 'favorites',
        title: 'Favoris',
        value: processedStats.favorites,
        icon: Heart,
        color: 'green',
        gradient: 'from-green-50 to-green-100',
        border: 'border-green-200',
        bg: 'bg-green-500',
        text: 'text-green-600',
        valueText: 'text-green-800'
      },
      {
        id: 'points',
        title: 'Points',
        value: processedStats.points,
        icon: Star,
        color: 'purple',
        gradient: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        valueText: 'text-purple-800'
      },
      {
        id: 'spent',
        title: 'Total dépensé',
        value: `€${processedStats.orders.totalSpent.toFixed(2)}`,
        icon: TrendingUp,
        color: 'orange',
        gradient: 'from-orange-50 to-orange-100',
        border: 'border-orange-200',
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        valueText: 'text-orange-800'
      }
    ]
  }, [processedStats])

  // Memoization des cartes de statut des commandes
  const orderStatusCards = useMemo(() => {
    if (!processedStats) return []

    return [
      {
        id: 'pending',
        title: 'En attente',
        value: processedStats.orders.pending,
        icon: Clock,
        color: 'yellow',
        gradient: 'from-yellow-50 to-yellow-100',
        border: 'border-yellow-200',
        bg: 'bg-yellow-500'
      },
      {
        id: 'processing',
        title: 'En traitement',
        value: processedStats.orders.processing,
        icon: Package,
        color: 'orange',
        gradient: 'from-orange-50 to-orange-100',
        border: 'border-orange-200',
        bg: 'bg-orange-500'
      },
      {
        id: 'shipped',
        title: 'En livraison',
        value: processedStats.orders.shipped,
        icon: Truck,
        color: 'blue',
        gradient: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        bg: 'bg-blue-500'
      },
      {
        id: 'delivered',
        title: 'Livrées',
        value: processedStats.orders.delivered,
        icon: CheckCircle,
        color: 'green',
        gradient: 'from-green-50 to-green-100',
        border: 'border-green-200',
        bg: 'bg-green-500'
      },
      {
        id: 'cancelled',
        title: 'Annulées',
        value: processedStats.orders.cancelled,
        icon: AlertCircle,
        color: 'red',
        gradient: 'from-red-50 to-red-100',
        border: 'border-red-200',
        bg: 'bg-red-500'
      }
    ]
  }, [processedStats])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!processedStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="p-4">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Chargement...</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cartes principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.id} className={`bg-gradient-to-r ${card.gradient} ${card.border}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${card.bg} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${card.text} font-medium`}>{card.title}</p>
                    <p className={`text-2xl font-bold ${card.valueText}`}>{card.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Statut des commandes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {orderStatusCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.id} className={`bg-gradient-to-r ${card.gradient} ${card.border}`}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`inline-flex p-2 ${card.bg} rounded-lg mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-xl font-bold text-foreground">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
})

StatsCards.displayName = 'StatsCards'

export default StatsCards
