'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Temps de cache par défaut (5 minutes)
            staleTime: 5 * 60 * 1000,
            // Temps de cache maximum (30 minutes)
            gcTime: 30 * 60 * 1000,
            // Retry automatique en cas d'échec
            retry: (failureCount, error: any) => {
              // Ne pas retry sur les erreurs 4xx
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              // Retry jusqu'à 3 fois pour les autres erreurs
              return failureCount < 3
            },
            // Retry delay avec backoff exponentiel
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch automatique quand la fenêtre reprend le focus
            refetchOnWindowFocus: false,
            // Refetch automatique quand la connexion reprend
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry automatique pour les mutations
            retry: (failureCount, error: any) => {
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              return failureCount < 2
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
