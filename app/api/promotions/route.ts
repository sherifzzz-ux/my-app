import { NextResponse } from 'next/server'
import { PromoProduct } from '@/types/promo'
import { calculateDiscountPercentage, calculateSavings } from '@/lib/utils/price-utils'
import { createServerSupabaseClient } from '@/lib/supabase'

type RawProductRow = {
  id: string | number
  name?: string
  category_name?: string
  category?: string
  brand_name?: string
  brand?: string
  image_url?: string
  imageUrl?: string
  price_cents?: number | string
  priceCents?: number | string
  old_price_cents?: number | string
  oldPriceCents?: number | string
  stock?: number | string
  rating?: number | string
  tags?: string[] | unknown
  is_featured?: boolean
  isFeatured?: boolean
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    // Use an untyped interface to access a possibly non-typed table name like "products"
    const supabaseUntyped = supabase as unknown as {
      from: (table: string) => {
        select: (columns: string) => {
          limit: (n: number) => Promise<{ data: unknown[] | null; error: { message: string } | null }>
        }
      }
    }
    // Try a permissive select to support varying schemas
    const { data, error } = await supabaseUntyped
      .from('products')
      .select('*')
      .limit(100)

    if (error) {
      console.error('Supabase error:', error.message)
      return NextResponse.json({ products: [] }, { status: 200 })
    }

    const mapped: PromoProduct[] = (data as RawProductRow[]).map((p: RawProductRow) => {
      const currentCents: number = Number(p.price_cents ?? p.priceCents ?? 0)
      const originalCents: number = Number(p.old_price_cents ?? p.oldPriceCents ?? currentCents)

      return {
        id: String(p.id),
        name: String(p.name ?? ''),
        category: String(p.category_name ?? p.category ?? ''),
        brand: p.brand_name ?? p.brand ?? undefined,
        imageUrl:
          p.image_url ??
          p.imageUrl ??
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&w=400&h=400&fit=crop',
        priceCents: currentCents,
        oldPriceCents: originalCents,
        discountPercentage: calculateDiscountPercentage(originalCents, currentCents),
        savings: calculateSavings(originalCents, currentCents),
        stock: typeof p.stock === 'number' ? p.stock : Number(p.stock ?? 0),
        rating:
          typeof p.rating === 'number'
            ? Math.round(p.rating)
            : p.rating
            ? Math.round(Number(p.rating))
            : undefined,
        reviewCount: undefined,
        isFeatured: Boolean(p.is_featured ?? p.isFeatured ?? false),
        isFlashSale: false,
        flashSaleEndDate: undefined,
        tags: Array.isArray(p.tags) ? (p.tags as string[]) : undefined,
      }
    })

    return NextResponse.json({ products: mapped })
  } catch (error) {
    console.error('GET /api/promotions error:', error)
    return NextResponse.json({ products: [] }, { status: 200 })
  }
}


