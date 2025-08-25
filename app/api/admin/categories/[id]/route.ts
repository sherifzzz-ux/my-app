import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

export const runtime = 'nodejs'

const categoryUpdateSchema = z.object({
	name: z.string().min(1, 'Le nom de la catégorie est requis'),
	slug: z.string().min(1, 'Le slug est requis'),
	imageUrl: z.string().optional()
})

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 401 })

	try {
		const { id } = await params
		const body = await request.json()
		const validatedData = categoryUpdateSchema.parse(body)

		// Vérifier si la catégorie existe
		const { data: existingCategory } = await supabase
			.from('categories')
			.select('id, name')
			.eq('id', id)
			.single()

		if (!existingCategory) {
			return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
		}

		// Vérifier si le nouveau nom/slug n'existe pas déjà (sauf pour cette catégorie)
		const { data: duplicateCategory } = await supabase
			.from('categories')
			.select('id')
			.or(`name.eq.${validatedData.name},slug.eq.${validatedData.slug}`)
			.neq('id', id)
			.single()

		if (duplicateCategory) {
			return NextResponse.json({ 
				error: 'Une catégorie avec ce nom ou ce slug existe déjà' 
			}, { status: 400 })
		}

		const { data: category, error } = await supabase
			.from('categories')
			.update(validatedData)
			.eq('id', id)
			.select()
			.single()

		if (error) throw error

		// Log d'audit
		await supabase
			.from('audit_logs')
			.insert([{
				action: 'UPDATE',
				table_name: 'categories',
				record_id: id,
				user_id: session.user.id,
				details: `Catégorie mise à jour: ${existingCategory.name} → ${validatedData.name}`,
				ip_address: request.headers.get('x-forwarded-for') || 'unknown'
			}])

		return NextResponse.json(category)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides',
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la mise à jour de la catégorie:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 401 })

	try {
		const { id } = await params

		// Vérifier si la catégorie existe
		const { data: existingCategory } = await supabase
			.from('categories')
			.select('id, name')
			.eq('id', id)
			.single()

		if (!existingCategory) {
			return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
		}

		// Vérifier si la catégorie est utilisée par des produits
		const { data: productsUsingCategory } = await supabase
			.from('products')
			.select('id')
			.eq('categoryId', id)
			.limit(1)

		if (productsUsingCategory && productsUsingCategory.length > 0) {
			return NextResponse.json({ 
				error: 'Impossible de supprimer cette catégorie car elle est utilisée par des produits' 
			}, { status: 400 })
		}

		// Vérifier si la catégorie est utilisée par des sous-catégories
		const { data: subcategoriesUsingCategory } = await supabase
			.from('subcategories')
			.select('id')
			.eq('categoryId', id)
			.limit(1)

		if (subcategoriesUsingCategory && subcategoriesUsingCategory.length > 0) {
			return NextResponse.json({ 
				error: 'Impossible de supprimer cette catégorie car elle est utilisée par des sous-catégories' 
			}, { status: 400 })
		}

		const { error } = await supabase
			.from('categories')
			.delete()
			.eq('id', id)

		if (error) throw error

		// Log d'audit
		await supabase
			.from('audit_logs')
			.insert([{
				action: 'DELETE',
				table_name: 'categories',
				record_id: id,
				user_id: session.user.id,
				details: `Catégorie supprimée: ${existingCategory.name}`,
				ip_address: request.headers.get('x-forwarded-for') || 'unknown'
			}])

		return NextResponse.json({ message: 'Catégorie supprimée avec succès' })
	} catch (error) {
		console.error('Erreur lors de la suppression de la catégorie:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
