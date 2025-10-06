import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

export const runtime = 'nodejs'

// Schéma de validation pour la modification de produit
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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const { id } = await params
		const body = await request.json()
		const { id: bodyId, ...updateData } = body

		if (!bodyId || bodyId !== id) {
			return NextResponse.json({ error: 'ID du produit requis' }, { status: 400 })
		}

		// Valider les données avec Zod
		const validatedData = ProductSchema.parse(updateData)

		const supabase = createServiceSupabaseClient()

		// Vérifier que le produit existe
		const { data: existingProduct } = await supabase
			.from('products')
			.select('id')
			.eq('id', id)
			.single()

		if (!existingProduct) {
			return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
		}

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
				.eq('category_id', validatedData.categoryId)
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

		// Mettre à jour le produit
		const { data: updatedProduct, error } = await supabase
			.from('products')
			.update({
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
				updatedAt: new Date().toISOString(),
			})
			.eq('id', id)
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

		return NextResponse.json(updatedProduct)

	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides', 
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la modification du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const { id } = await params

		if (!id) {
			return NextResponse.json({ error: 'ID du produit requis' }, { status: 400 })
		}

		const supabase = createServiceSupabaseClient()

		// Vérifier que le produit existe
		const { data: existingProduct } = await supabase
			.from('products')
			.select('id, name')
			.eq('id', id)
			.single()

		if (!existingProduct) {
			return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
		}

		// Supprimer le produit
		const { error } = await supabase
			.from('products')
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
