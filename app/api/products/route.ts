import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { typedSupabase } from '@/lib/supabase/client'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const categorySlug = url.searchParams.get('category')
    const subcategorySlug = url.searchParams.get('subcategory')
    const featured = url.searchParams.get('featured')
    const limit = url.searchParams.get('limit')

    // Récupérer les produits avec relations
    const { data: products, error } = await typedSupabase.getProductsWithRelations()

    if (error) throw error

    // Appliquer les filtres côté client pour l'instant
    let filteredProducts = products || []

    if (categorySlug) {
      filteredProducts = filteredProducts.filter(product => 
        product.Category?.slug === categorySlug
      )
    }

    if (subcategorySlug) {
      filteredProducts = filteredProducts.filter(product => 
        product.Subcategory?.slug === subcategorySlug
      )
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.isFeatured)
    }

    // Filtrer seulement les produits en stock
    filteredProducts = filteredProducts.filter(product => product.stock > 0)

    // Trier par popularité (mis en avant, puis par note, puis par date)
    filteredProducts.sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1
      if (a.rating !== b.rating) return b.rating - a.rating
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Limiter le nombre de résultats
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }

    // Transformer les données pour correspondre au format attendu par l'interface
    const transformedProducts = filteredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.priceCents / 100, // Convertir de centimes en euros
      originalPrice: product.oldPriceCents ? product.oldPriceCents / 100 : undefined,
      image: product.imageUrl || '/images/placeholder-product.jpg',
      rating: product.rating || 0,
      reviews: Math.floor(Math.random() * 50) + 10, // Générer un nombre aléatoire de reviews
      inStock: product.stock > 0,
      stock: product.stock,
      isFeatured: product.isFeatured,
      category: {
        id: product.Category?.id,
        name: product.Category?.name,
        slug: product.Category?.slug
      },
      subcategory: product.Subcategory ? {
        id: product.Subcategory.id,
        name: product.Subcategory.name,
        slug: product.Subcategory.slug
      } : null,
      brand: product.Brand ? {
        id: product.Brand.id,
        name: product.Brand.name,
        slug: product.Brand.slug
      } : null
    }))

    return NextResponse.json(transformedProducts)

  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return NextResponse.json({ 
      error: 'Erreur interne du serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}
