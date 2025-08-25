import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

export const runtime = 'nodejs'

const categorySchema = z.object({
	name: z.string().min(1, 'Le nom de la catégorie est requis'),
	slug: z.string().min(1, 'Le slug est requis'),
	imageUrl: z.string().optional()
})

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const { data: categories, error } = await supabase
			.from('categories')
			.select('*')
			.order('name')

		if (error) throw error

		return NextResponse.json(categories)
	} catch (error) {
		console.error('Erreur lors du chargement des catégories:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const body = await request.json()
		const validatedData = categorySchema.parse(body)

		// Vérifier si la catégorie existe déjà
		const { data: existingCategory } = await supabase
			.from('categories')
			.select('id')
			.or(`name.eq.${validatedData.name},slug.eq.${validatedData.slug}`)
			.single()

		if (existingCategory) {
			return NextResponse.json({ 
				error: 'Une catégorie avec ce nom ou ce slug existe déjà' 
			}, { status: 400 })
		}

		const { data: category, error } = await supabase
			.from('categories')
			.insert([validatedData])
			.select()
			.single()

		if (error) throw error

		// Log d'audit
		await supabase
			.from('audit_logs')
			.insert([{
				action: 'CREATE',
				table_name: 'categories',
				record_id: category.id,
				user_id: session.user.id,
				details: `Catégorie créée: ${validatedData.name}`,
				ip_address: request.headers.get('x-forwarded-for') || 'unknown'
			}])

		return NextResponse.json(category, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides',
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la création de la catégorie:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
