import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

// Définir les types pour les données Supabase
interface Product {
  id: string
  name: string
  description: string | null
  priceCents: number
  imageUrl: string | null
  categoryId: string | null
  brandId: string | null
  stock: number
  createdAt: string
}



export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createServiceSupabaseClient()
    
    // Récupérer les favoris avec les détails des produits
    const { data: favorites, error, count } = await supabase
      .from('user_favorites')
      .select(`
        id,
        "userId",
        "productId",
        "createdAt"
      `)
      .eq('userId', session.user.id)
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Erreur lors de la récupération des favoris:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la récupération des favoris' 
      }, { status: 500 })
    }

    // Récupérer les détails des produits séparément
    if (favorites && favorites.length > 0) {
      const productIds = favorites.map(fav => fav.productId)
      const { data: products, error: productsError } = await supabase
        .from('Product' as any)
        .select(`
          id,
          name,
          description,
          "priceCents",
          "imageUrl",
          "categoryId",
          "brandId",
          stock,
          "createdAt",
          "oldPriceCents",
          rating,
          "isFeatured"
        `)
        .in('id', productIds)

      if (productsError) {
        console.error('Erreur lors de la récupération des produits:', productsError)
        return NextResponse.json({ 
          error: 'Erreur lors de la récupération des produits' 
        }, { status: 500 })
      }

      // Créer un map des produits pour un accès rapide
      const productsMap = new Map(products?.map((p: any) => [p.id, p]) || [])

      // Formater les données pour l'affichage
      const formattedFavorites = favorites.map(fav => {
        const product = productsMap.get(fav.productId)
        return {
          id: fav.id,
          productId: fav.productId,
          addedAt: fav.createdAt,
          product: product ? {
            id: product.id,
            name: product.name,
            description: product.description,
            price: (product.priceCents || 0) / 100, // Convertir centimes en euros
            image: product.imageUrl,
            categoryId: product.categoryId,
            brandId: product.brandId,
            stockQuantity: product.stock || 0,
            isOnSale: product.oldPriceCents && product.oldPriceCents > product.priceCents,
            finalPrice: (product.priceCents || 0) / 100,
            oldPrice: product.oldPriceCents ? product.oldPriceCents / 100 : null,
            rating: product.rating || 0,
            isFeatured: product.isFeatured || false
          } : null
        }
      })

      return NextResponse.json({
        favorites: formattedFavorites,
        total: count || 0,
        hasMore: (offset + limit) < (count || 0)
      })
    }

    return NextResponse.json({
      favorites: [],
      total: 0,
      hasMore: false
    })
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { productId } = await request.json()
    
    if (!productId) {
      return NextResponse.json({ 
        error: 'ID du produit requis' 
      }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()
    
    // Vérifier si le produit existe déjà dans les favoris
    const { data: existingFavorite } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('userId', session.user.id)
      .eq('productId', productId)
      .single()

    if (existingFavorite) {
      return NextResponse.json({ 
        error: 'Produit déjà dans les favoris' 
      }, { status: 400 })
    }

    // Ajouter aux favoris
    const { data: newFavorite, error } = await supabase
      .from('user_favorites')
      .insert({
        userId: session.user.id,
        productId: productId,
        createdAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de l\'ajout aux favoris' 
      }, { status: 500 })
    }

    return NextResponse.json(newFavorite)
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const favoriteId = searchParams.get('id')
    const productId = searchParams.get('productId')
    
    if (!favoriteId && !productId) {
      return NextResponse.json({ 
        error: 'ID du favori ou du produit requis' 
      }, { status: 400 })
    }

    const supabase = createServiceSupabaseClient()
    
    let query = supabase
      .from('user_favorites')
      .delete()
      .eq('userId', session.user.id)

    if (favoriteId) {
      query = query.eq('id', favoriteId)
    } else if (productId) {
      query = query.eq('productId', productId)
    }

    const { error } = await query

    if (error) {
      console.error('Erreur lors de la suppression du favori:', error)
      return NextResponse.json({ 
        error: 'Erreur lors de la suppression du favori' 
      }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return NextResponse.json({ 
      error: 'Erreur inattendue' 
    }, { status: 500 })
  }
}
