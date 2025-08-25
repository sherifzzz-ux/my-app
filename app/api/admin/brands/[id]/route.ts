import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

export const runtime = 'nodejs'

const brandUpdateSchema = z.object({
	name: z.string().min(1, 'Le nom de la marque est requis'),
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
		const validatedData = brandUpdateSchema.parse(body)

		// Vérifier si la marque existe
		const { data: existingBrand } = await supabase
			.from('brands')
			.select('id, name')
			.eq('id', id)
			.single()

		if (!existingBrand) {
			return NextResponse.json({ error: 'Marque non trouvée' }, { status: 404 })
		}

		// Vérifier si le nouveau nom/slug n'existe pas déjà (sauf pour cette marque)
		const { data: duplicateBrand } = await supabase
			.from('brands')
			.select('id')
			.or(`name.eq.${validatedData.name},slug.eq.${validatedData.slug}`)
			.neq('id', id)
			.single()

		if (duplicateBrand) {
			return NextResponse.json({ 
				error: 'Une marque avec ce nom ou ce slug existe déjà' 
			}, { status: 400 })
		}

		const { data: brand, error } = await supabase
			.from('brands')
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
				table_name: 'brands',
				record_id: id,
				user_id: session.user.id,
				details: `Marque mise à jour: ${existingBrand.name} → ${validatedData.name}`,
				ip_address: request.headers.get('x-forwarded-for') || 'unknown'
			}])

		return NextResponse.json(brand)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides',
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la mise à jour de la marque:', error)
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

		// Vérifier si la marque existe
		const { data: existingBrand } = await supabase
			.from('brands')
			.select('id, name')
			.eq('id', id)
			.single()

		if (!existingBrand) {
			return NextResponse.json({ error: 'Marque non trouvée' }, { status: 404 })
		}

		// Vérifier si la marque est utilisée par des produits
		const { data: productsUsingBrand } = await supabase
			.from('products')
			.select('id')
			.eq('brandId', id)
			.limit(1)

		if (productsUsingBrand && productsUsingBrand.length > 0) {
			return NextResponse.json({ 
				error: 'Impossible de supprimer cette marque car elle est utilisée par des produits' 
			}, { status: 400 })
		}

		const { error } = await supabase
			.from('brands')
			.delete()
			.eq('id', id)

		if (error) throw error

		// Log d'audit
		await supabase
			.from('audit_logs')
			.insert([{
				action: 'DELETE',
				table_name: 'brands',
				record_id: id,
				user_id: session.user.id,
				details: `Marque supprimée: ${existingBrand.name}`,
				ip_address: request.headers.get('x-forwarded-for') || 'unknown'
			}])

		return NextResponse.json({ message: 'Marque supprimée avec succès' })
	} catch (error) {
		console.error('Erreur lors de la suppression de la marque:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
