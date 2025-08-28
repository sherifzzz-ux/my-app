import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
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

interface Order {
  id: string
  date: string
  status: string
  statusText: string
  total: number
  items: number
  tracking?: string
  address: string
  paymentMethod: string
  estimatedDelivery: string
  products: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }>
}

interface Favorite {
  id: string
  productId: string
  addedAt: string
  product: {
    id: string
    name: string
    description?: string
    price: number
    salePrice?: number
    image?: string
    finalPrice: number
    isOnSale: boolean
  }
}

interface UserProfile {
  id: string
  email: string
  name: string
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
  birth_date?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Clés de cache
export const accountKeys = {
  all: ['account'] as const,
  stats: () => [...accountKeys.all, 'stats'] as const,
  orders: () => [...accountKeys.all, 'orders'] as const,
  ordersByStatus: (status: string) => [...accountKeys.orders(), status] as const,
  favorites: () => [...accountKeys.all, 'favorites'] as const,
  profile: () => [...accountKeys.all, 'profile'] as const,
  addresses: () => [...accountKeys.all, 'addresses'] as const,
}

// Hook pour les statistiques utilisateur
export function useUserStats() {
  return useQuery({
    queryKey: accountKeys.stats(),
    queryFn: async (): Promise<UserStats> => {
      const response = await fetch('/api/account/stats', {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques')
      }
      return response.json()
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook pour les commandes
export function useUserOrders(status?: string, limit = 10, offset = 0) {
  return useQuery({
    queryKey: accountKeys.ordersByStatus(status || 'all'),
    queryFn: async (): Promise<{ orders: Order[]; total: number; hasMore: boolean }> => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      if (status && status !== 'all') {
        params.append('status', status)
      }

      const response = await fetch(`/api/account/orders?${params}`, {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commandes')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Hook pour les favoris
export function useUserFavorites(limit = 20, offset = 0) {
  return useQuery({
    queryKey: accountKeys.favorites(),
    queryFn: async (): Promise<{ favorites: Favorite[]; total: number; hasMore: boolean }> => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })

      const response = await fetch(`/api/account/favorites?${params}`, {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des favoris')
      }
      return response.json()
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Hook pour le profil utilisateur
export function useUserProfile() {
  return useQuery({
    queryKey: accountKeys.profile(),
    queryFn: async (): Promise<UserProfile> => {
      const response = await fetch('/api/account/profile', {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil')
      }
      return response.json()
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 heure
  })
}

// Hook pour les adresses
export function useUserAddresses() {
  return useQuery({
    queryKey: accountKeys.addresses(),
    queryFn: async (): Promise<any[]> => {
      const response = await fetch('/api/account/addresses', {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des adresses')
      }
      return response.json()
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 45 * 60 * 1000, // 45 minutes
  })
}

// Hook pour mettre à jour le profil
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
      const response = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la mise à jour du profil')
      }
      return response.json()
    },
    onSuccess: (updatedProfile) => {
      // Mettre à jour le cache du profil
      queryClient.setQueryData(accountKeys.profile(), updatedProfile)
      
      // Invalider les statistiques car elles peuvent avoir changé
      queryClient.invalidateQueries({ queryKey: accountKeys.stats() })
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour du profil:', error)
    },
  })
}

// Hook pour ajouter aux favoris
export function useAddToFavorites() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productId: string): Promise<any> => {
      const response = await fetch('/api/account/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de l\'ajout aux favoris')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalider le cache des favoris et des statistiques
      queryClient.invalidateQueries({ queryKey: accountKeys.favorites() })
      queryClient.invalidateQueries({ queryKey: accountKeys.stats() })
    },
    onError: (error) => {
      console.error('Erreur lors de l\'ajout aux favoris:', error)
    },
  })
}

// Hook pour supprimer des favoris
export function useRemoveFromFavorites() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ favoriteId, productId }: { favoriteId?: string; productId?: string }): Promise<any> => {
      const params = new URLSearchParams()
      if (favoriteId) params.append('id', favoriteId)
      if (productId) params.append('productId', productId)

      const response = await fetch(`/api/account/favorites?${params}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la suppression du favori')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalider le cache des favoris et des statistiques
      queryClient.invalidateQueries({ queryKey: accountKeys.favorites() })
      queryClient.invalidateQueries({ queryKey: accountKeys.stats() })
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression du favori:', error)
    },
  })
}

// Hook pour gérer les adresses
export function useManageAddresses() {
  const queryClient = useQueryClient()

  const addAddress = useMutation({
    mutationFn: async (addressData: any): Promise<any> => {
      const response = await fetch('/api/account/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(addressData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création de l\'adresse')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.addresses() })
    },
  })

  const updateAddress = useMutation({
    mutationFn: async (addressData: any): Promise<any> => {
      const response = await fetch('/api/account/addresses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(addressData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la mise à jour de l\'adresse')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.addresses() })
    },
  })

  const deleteAddress = useMutation({
    mutationFn: async (addressId: string): Promise<any> => {
      const response = await fetch(`/api/account/addresses?id=${addressId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la suppression de l\'adresse')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.addresses() })
    },
  })

  return {
    addAddress,
    updateAddress,
    deleteAddress,
  }
}
