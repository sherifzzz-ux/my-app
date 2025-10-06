/**
 * Fonctions pour récupérer les données de navigation depuis Supabase
 * Basées sur la structure de la base de données existante
 */

import { createClient } from '@/lib/supabase/client'
import type { 
  CategoryMenuItem, 
  SubcategoryMenuItem, 
  StaticMenuItem, 
  NavigationData,
  NavigationError 
} from './navigation-types'

// Menu statique (éléments fixes)
export const staticMenuItems: StaticMenuItem[] = [
  { 
    label: "Accueil", 
    href: "/", 
    icon: "Home",
    description: "Retour à la page d'accueil"
  },
  { 
    label: "Marques", 
    href: "/marques", 
    icon: "Tag",
    description: "Découvrir nos marques partenaires"
  },
  { 
    label: "Promotions", 
    href: "/promotions", 
    icon: "Percent",
    description: "Nos offres et promotions"
  },
  { 
    label: "Contact", 
    href: "/contact", 
    icon: "Mail",
    description: "Nous contacter"
  }
]

/**
 * Récupère les catégories avec leurs sous-catégories depuis Supabase
 */
export async function getCategoryMenuItems(): Promise<CategoryMenuItem[]> {
  try {
    const supabase = createClient()
    
    const { data: categories, error } = await supabase
      .from('Category')
      .select(`
        id,
        name,
        slug,
        imageUrl,
        Subcategory (
          id,
          name,
          slug
        )
      `)
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching categories:', error)
      throw new Error(`Erreur lors de la récupération des catégories: ${error.message}`)
    }
    
    const categoryRows = (categories || []) as unknown as Array<{
      id: string;
      name: string;
      slug: string;
      imageUrl?: string;
      Subcategory?: Array<{ id: string; name: string; slug: string }>
    }>
    
    return categoryRows.map(cat => ({
      id: cat.id,
      label: cat.name,
      href: `/categories/${cat.slug}`,
      slug: cat.slug,
      imageUrl: cat.imageUrl || undefined,
      children: cat.Subcategory?.map(sub => ({
        id: sub.id,
        label: sub.name,
        href: `/categories/${cat.slug}/${sub.slug}`,
        slug: sub.slug
      })) || []
    }))
    
  } catch (error) {
    console.error('Error in getCategoryMenuItems:', error)
    return []
  }
}

/**
 * Récupère les catégories avec le nombre de produits
 */
export async function getCategoryMenuItemsWithCount(): Promise<CategoryMenuItem[]> {
  try {
    const supabase = createClient()
    
    // Récupérer les catégories avec le nombre de produits
    const { data: categories, error } = await supabase
      .from('Category')
      .select(`
        id,
        name,
        slug,
        imageUrl,
        Subcategory (
          id,
          name,
          slug
        )
      `)
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching categories with count:', error)
      throw new Error(`Erreur lors de la récupération des catégories: ${error.message}`)
    }
    
    // Récupérer le nombre de produits par catégorie
    const { data: productCounts, error: countError } = await supabase
      .from('Product')
      .select('categoryId')
    
    if (countError) {
      console.error('Error fetching product counts:', countError)
    }
    
    // Compter les produits par catégorie
    const productCountRows = (productCounts || []) as unknown as Array<{ categoryId: string }>
    const categoryCounts = productCountRows.reduce((acc, product) => {
      acc[product.categoryId] = (acc[product.categoryId] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const categoryRows = (categories || []) as unknown as Array<{
      id: string;
      name: string;
      slug: string;
      imageUrl?: string;
      Subcategory?: Array<{ id: string; name: string; slug: string }>
    }>
    
    return categoryRows.map(cat => ({
      id: cat.id,
      label: cat.name,
      href: `/categories/${cat.slug}`,
      slug: cat.slug,
      imageUrl: cat.imageUrl || undefined,
      productCount: categoryCounts[cat.id] || 0,
      children: cat.Subcategory?.map(sub => ({
        id: sub.id,
        label: sub.name,
        href: `/categories/${cat.slug}/${sub.slug}`,
        slug: sub.slug,
        productCount: 0 // TODO: Implémenter le comptage des sous-catégories si nécessaire
      })) || []
    })) || []
    
  } catch (error) {
    console.error('Error in getCategoryMenuItemsWithCount:', error)
    return []
  }
}

/**
 * Récupère toutes les données de navigation
 */
export async function getNavigationData(): Promise<NavigationData> {
  try {
    const categories = await getCategoryMenuItems()
    
    return {
      staticItems: staticMenuItems,
      categories,
      isLoading: false
    }
  } catch (error) {
    console.error('Error in getNavigationData:', error)
    return {
      staticItems: staticMenuItems,
      categories: [],
      isLoading: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }
  }
}

/**
 * Récupère une catégorie spécifique avec ses sous-catégories
 */
export async function getCategoryById(categoryId: string): Promise<CategoryMenuItem | null> {
  try {
    const supabase = createClient()
    
    const { data: category, error } = await supabase
      .from('Category')
      .select(`
        id,
        name,
        slug,
        imageUrl,
        Subcategory (
          id,
          name,
          slug
        )
      `)
      .eq('id', categoryId)
      .single()
    
    if (error) {
      console.error('Error fetching category by ID:', error)
      return null
    }
    
    const categoryRow = category as unknown as {
      id: string;
      name: string;
      slug: string;
      imageUrl?: string;
      Subcategory?: Array<{ id: string; name: string; slug: string }>
    }
    
    return {
      id: categoryRow.id,
      label: categoryRow.name,
      href: `/categories/${categoryRow.slug}`,
      slug: categoryRow.slug,
      imageUrl: categoryRow.imageUrl || undefined,
      children: categoryRow.Subcategory?.map(sub => ({
        id: sub.id,
        label: sub.name,
        href: `/categories/${categoryRow.slug}/${sub.slug}`,
        slug: sub.slug
      })) || []
    }
  } catch (error) {
    console.error('Error in getCategoryById:', error)
    return null
  }
}

/**
 * Récupère les sous-catégories d'une catégorie
 */
export async function getSubcategoriesByCategoryId(categoryId: string): Promise<SubcategoryMenuItem[]> {
  try {
    const supabase = createClient()
    
    const { data: subcategories, error } = await supabase
      .from('Subcategory')
      .select('id, name, slug')
      .eq('categoryId', categoryId)
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching subcategories:', error)
      return []
    }
    
    const subcategoryRows = (subcategories || []) as unknown as Array<{
      id: string;
      name: string;
      slug: string;
    }>
    
    return subcategoryRows.map(sub => ({
      id: sub.id,
      label: sub.name,
      href: `/categories/${categoryId}/${sub.slug}`,
      slug: sub.slug
    }))
  } catch (error) {
    console.error('Error in getSubcategoriesByCategoryId:', error)
    return []
  }
}

/**
 * Fonction utilitaire pour créer une erreur de navigation
 */
export function createNavigationError(
  code: string, 
  message: string, 
  details?: unknown
): NavigationError {
  return {
    code,
    message,
    details,
    timestamp: new Date()
  }
}

/**
 * Fonction utilitaire pour valider les données de navigation
 */
export function validateNavigationData(data: NavigationData): boolean {
  if (!data.staticItems || !Array.isArray(data.staticItems)) {
    return false
  }
  
  if (!data.categories || !Array.isArray(data.categories)) {
    return false
  }
  
  return true
}
