import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

export const runtime = 'nodejs'

// Schéma de validation pour la création/modification de produit
const ProductSchema = z.object({
	name: z.string().min(1, 'Le nom est requis'),
	description: z.string().optional(),
	priceCents: z.number().min(0, 'Le prix doit être positif'),
	oldPriceCents: z.number().min(0).optional(),
	imageUrl: z.string().url().optional().or(z.literal('')),
	isFeatured: z.boolean().default(false),
	stock: z.number().min(0, 'Le stock doit être positif'),
	categoryId: z.string().min(1, 'La catégorie est requise'),
	subcategoryId: z.string().optional(),
	brandId: z.string().optional(),
	rating: z.number().min(0).max(5).optional(),
})

export async function GET(req: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const url = new URL(req.url)
	const q = url.searchParams.get('q') || undefined
	const categoryId = url.searchParams.get('categoryId') || undefined
	const subcategoryId = url.searchParams.get('subcategoryId') || undefined
	const brandId = url.searchParams.get('brandId') || undefined
	const featured = url.searchParams.get('featured') || undefined
	const lowStock = url.searchParams.get('lowStock') || undefined
	const stockFilter = url.searchParams.get('stockFilter') || undefined

	// Construire la requête avec les relations
	let query = supabase
		.from('products')
		.select(`
			*,
			category:categories(name, slug),
			subcategory:subcategories(name, slug),
			brand:brands(name, slug)
		`)
		.order('updatedAt', { ascending: false })

	// Appliquer les filtres
	if (q) {
		query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
	}
	if (categoryId && categoryId !== 'all') {
		query = query.eq('category_id', categoryId)
	}
	if (subcategoryId && subcategoryId !== 'all') {
		query = query.eq('subcategory_id', subcategoryId)
	}
	if (brandId && brandId !== 'all') {
		query = query.eq('brand_id', brandId)
	}
	if (featured && featured !== 'all') {
		query = query.eq('is_featured', featured === 'true')
	}
	
	// Filtres de stock
	if (lowStock === 'true') {
		query = query.lte('stock', 5)
	} else if (stockFilter === 'low') {
		query = query.lte('stock', 5)
	} else if (stockFilter === 'out') {
		query = query.eq('stock', 0)
	} else if (stockFilter === 'in') {
		query = query.gt('stock', 0)
	}

	const { data: products, error } = await query

	if (error) {
		console.error('Erreur lors de la récupération des produits:', error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(products || [])
}

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const body = await request.json()
		
		// Valider les données avec Zod
		const validatedData = ProductSchema.parse(body)

		// Vérifier que la catégorie existe
		const { data: categoryExists } = await supabase
			.from('categories')
			.select('id')
			.eq('id', validatedData.categoryId)
			.single()

		if (!categoryExists) {
			return NextResponse.json({ error: 'Catégorie invalide' }, { status: 400 })
		}

		// Vérifier que la sous-catégorie existe si fournie
		if (validatedData.subcategoryId) {
			const { data: subcategoryExists } = await supabase
				.from('subcategories')
				.select('id')
				.eq('id', validatedData.subcategoryId)
				.eq('categoryId', validatedData.categoryId)
				.single()

			if (!subcategoryExists) {
				return NextResponse.json({ error: 'Sous-catégorie invalide pour cette catégorie' }, { status: 400 })
			}
		}

		// Vérifier que la marque existe si fournie
		if (validatedData.brandId) {
			const { data: brandExists } = await supabase
				.from('brands')
				.select('id')
				.eq('id', validatedData.brandId)
				.single()

			if (!brandExists) {
				return NextResponse.json({ error: 'Marque invalide' }, { status: 400 })
			}
		}

		// Créer le produit
		const { data: product, error: insertError } = await supabase
			.from('products')
			.insert({
				name: validatedData.name,
				description: validatedData.description || null,
				price_cents: validatedData.priceCents,
				old_price_cents: validatedData.oldPriceCents || null,
				image_url: validatedData.imageUrl || null,
				is_featured: validatedData.isFeatured,
				stock: validatedData.stock,
				category_id: validatedData.categoryId,
				subcategory_id: validatedData.subcategoryId || null,
				brand_id: validatedData.brandId || null,
				rating: validatedData.rating || 0,
			})
			.select(`
				*,
				category:categories(name, slug),
				subcategory:subcategories(name, slug),
				brand:brands(name, slug)
			`)
			.single()

		if (insertError) {
			console.error('Erreur lors de la création du produit:', insertError)
			return NextResponse.json({ error: insertError.message }, { status: 500 })
		}

		// Audit log
		try {
			await supabase.from('audit_logs').insert({
				action: 'product.create',
				entity: 'products',
				entity_id: product.id,
				actor_id: session.user.id,
				details: { 
					name: validatedData.name, 
					priceCents: validatedData.priceCents,
					categoryId: validatedData.categoryId 
				},
			})
		} catch (auditError) {
			console.warn('Erreur lors de l\'audit log:', auditError)
		}

		return NextResponse.json(product)

	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides', 
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la création du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}


