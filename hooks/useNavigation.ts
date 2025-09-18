/**
 * Hook personnalisé pour la navigation
 * Gère le cache et les états de chargement
 */

import { useState, useEffect, useCallback } from 'react'
import { 
  getNavigationData, 
  getCategoryMenuItems, 
  getCategoryMenuItemsWithCount,
  staticMenuItems 
} from '@/lib/supabase/navigation'
import type { 
  NavigationData, 
  CategoryMenuItem, 
  StaticMenuItem,
  NavigationState 
} from '@/lib/supabase/navigation-types'

// Configuration du cache
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>()

/**
 * Hook principal pour la navigation
 */
export function useNavigation() {
  const [data, setData] = useState<NavigationData>({
    staticItems: staticMenuItems,
    categories: [],
    isLoading: true
  })
  const [state, setState] = useState<NavigationState>('idle')

  const fetchData = useCallback(async () => {
    try {
      setState('loading')
      
      // Vérifier le cache
      const cacheKey = 'navigation-data'
      const cached = cache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data)
        setState('success')
        return
      }
      
      // Récupérer les données
      const navigationData = await getNavigationData()
      
      // Mettre en cache
      cache.set(cacheKey, {
        data: navigationData,
        timestamp: Date.now()
      })
      
      setData(navigationData)
      setState('success')
    } catch (error) {
      console.error('Error in useNavigation:', error)
      setState('error')
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }))
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    cache.clear()
    fetchData()
  }, [fetchData])

  return {
    ...data,
    state,
    refetch,
    isLoading: state === 'loading',
    isError: state === 'error',
    isSuccess: state === 'success'
  }
}

/**
 * Hook pour récupérer uniquement les catégories
 */
export function useCategoryMenu() {
  const [categories, setCategories] = useState<CategoryMenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Vérifier le cache
      const cacheKey = 'category-menu'
      const cached = cache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setCategories(cached.data)
        setIsLoading(false)
        return
      }
      
      const categoryData = await getCategoryMenuItems()
      
      // Mettre en cache
      cache.set(cacheKey, {
        data: categoryData,
        timestamp: Date.now()
      })
      
      setCategories(categoryData)
    } catch (error) {
      console.error('Error in useCategoryMenu:', error)
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const refetch = useCallback(() => {
    cache.delete('category-menu')
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook pour récupérer les catégories avec compteurs
 */
export function useCategoryMenuWithCount() {
  const [categories, setCategories] = useState<CategoryMenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Vérifier le cache
      const cacheKey = 'category-menu-with-count'
      const cached = cache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setCategories(cached.data)
        setIsLoading(false)
        return
      }
      
      const categoryData = await getCategoryMenuItemsWithCount()
      
      // Mettre en cache
      cache.set(cacheKey, {
        data: categoryData,
        timestamp: Date.now()
      })
      
      setCategories(categoryData)
    } catch (error) {
      console.error('Error in useCategoryMenuWithCount:', error)
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const refetch = useCallback(() => {
    cache.delete('category-menu-with-count')
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook pour récupérer uniquement le menu statique
 */
export function useStaticMenu() {
  return {
    staticItems: staticMenuItems,
    isLoading: false,
    error: null
  }
}

/**
 * Hook pour gérer le cache de navigation
 */
export function useNavigationCache() {
  const clearCache = useCallback(() => {
    cache.clear()
  }, [])

  const clearCacheItem = useCallback((key: string) => {
    cache.delete(key)
  }, [])

  const getCacheInfo = useCallback(() => {
    const now = Date.now()
    const cacheInfo = Array.from(cache.entries()).map(([key, value]) => ({
      key,
      age: now - value.timestamp,
      isValid: now - value.timestamp < CACHE_DURATION
    }))
    
    return {
      items: cacheInfo,
      totalItems: cache.size,
      validItems: cacheInfo.filter(item => item.isValid).length
    }
  }, [])

  return {
    clearCache,
    clearCacheItem,
    getCacheInfo
  }
}

/**
 * Hook pour gérer l'état de navigation
 */
export function useNavigationState() {
  const [currentPath, setCurrentPath] = useState<string>('')
  const [isNavigating, setIsNavigating] = useState(false)

  const setCurrentPathname = useCallback((pathname: string) => {
    setCurrentPath(pathname)
  }, [])

  const startNavigation = useCallback(() => {
    setIsNavigating(true)
  }, [])

  const endNavigation = useCallback(() => {
    setIsNavigating(false)
  }, [])

  return {
    currentPath,
    isNavigating,
    setCurrentPathname,
    startNavigation,
    endNavigation
  }
}
