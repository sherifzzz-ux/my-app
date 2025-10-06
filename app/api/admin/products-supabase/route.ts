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
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const url = new URL(req.url)
	const q = url.searchParams.get('q') || undefined
	const categoryId = url.searchParams.get('categoryId') || undefined
	const subcategoryId = url.searchParams.get('subcategoryId') || undefined
	const brandId = url.searchParams.get('brandId') || undefined
	const featured = url.searchParams.get('featured') || undefined
	const lowStock = url.searchParams.get('lowStock') || undefined
	const stockFilter = url.searchParams.get('stockFilter') || undefined

	try {
		const supabase = createServiceSupabaseClient()

		// Construire la requête de base
		let query = supabase
			.from('Product')
			.select(`
				id,
				name,
				description,
				priceCents,
				oldPriceCents,
				imageUrl,
				isFeatured,
				stock,
				rating,
				createdAt,
				updatedAt,
				categoryId,
				subcategoryId,
				brandId,
				Category (
					id,
					name,
					slug
				),
				Subcategory (
					id,
					name,
					slug
				),
				Brand (
					id,
					name,
					slug
				)
			`)

		// Appliquer les filtres
		if (q) {
			query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
		}
		if (categoryId && categoryId !== 'all') {
			query = query.eq('categoryId', categoryId)
		}
		if (subcategoryId && subcategoryId !== 'all') {
			query = query.eq('subcategoryId', subcategoryId)
		}
		if (brandId && brandId !== 'all') {
			query = query.eq('brandId', brandId)
		}
		if (featured && featured !== 'all') {
			query = query.eq('isFeatured', featured === 'true')
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

		// Trier par date de mise à jour
		query = query.order('updatedAt', { ascending: false })

		const { data: products, error } = await query

		if (error) throw error

		return NextResponse.json(products || [])

	} catch (error) {
		console.error('Erreur lors de la récupération des produits:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const body = await request.json()
		
		// Valider les données avec Zod
		const validatedData = ProductSchema.parse(body)

		const supabase = createServiceSupabaseClient()

		// Vérifier que la catégorie existe
		const { data: categoryExists } = await supabase
			.from('Category')
			.select('id')
			.eq('id', validatedData.categoryId)
			.single()

		if (!categoryExists) {
			return NextResponse.json({ error: 'Catégorie invalide' }, { status: 400 })
		}

		// Vérifier que la sous-catégorie existe si fournie
		if (validatedData.subcategoryId) {
			const { data: subcategoryExists } = await supabase
				.from('Subcategory')
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
				.from('Brand')
				.select('id')
				.eq('id', validatedData.brandId)
				.single()

			if (!brandExists) {
				return NextResponse.json({ error: 'Marque invalide' }, { status: 400 })
			}
		}

		// Créer le produit
		const { data: product, error } = await supabase
			.from('Product')
			.insert([{
				name: validatedData.name,
				description: validatedData.description || null,
				priceCents: validatedData.priceCents,
				oldPriceCents: validatedData.oldPriceCents || null,
				imageUrl: validatedData.imageUrl || null,
				isFeatured: validatedData.isFeatured,
				stock: validatedData.stock,
				categoryId: validatedData.categoryId,
				subcategoryId: validatedData.subcategoryId || null,
				brandId: validatedData.brandId || null,
				rating: validatedData.rating || 0,
			}])
			.select(`
				id,
				name,
				description,
				priceCents,
				oldPriceCents,
				imageUrl,
				isFeatured,
				stock,
				rating,
				createdAt,
				updatedAt,
				categoryId,
				subcategoryId,
				brandId,
				Category (
					id,
					name,
					slug
				),
				Subcategory (
					id,
					name,
					slug
				),
				Brand (
					id,
					name,
					slug
				)
			`)
			.single()

		if (error) throw error

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

export async function DELETE(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const url = new URL(request.url)
		const id = url.searchParams.get('id')

		if (!id) {
			return NextResponse.json({ error: 'ID du produit requis' }, { status: 400 })
		}

		const supabase = createServiceSupabaseClient()

		// Vérifier que le produit existe
		const { data: existingProduct } = await supabase
			.from('Product')
			.select('id, name')
			.eq('id', id)
			.single()

		if (!existingProduct) {
			return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
		}

		// Supprimer le produit
		const { error } = await supabase
			.from('Product')
			.delete()
			.eq('id', id)

		if (error) throw error

		return NextResponse.json({ message: 'Produit supprimé avec succès' })

	} catch (error) {
		console.error('Erreur lors de la suppression du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
