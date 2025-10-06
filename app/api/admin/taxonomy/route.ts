import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		// Récupérer toutes les données de taxonomie avec Prisma
		const [categories, subcategories, brands] = await Promise.all([
			prisma.category.findMany({
				include: {
					subcategories: {
						orderBy: { name: 'asc' }
					}
				},
				orderBy: { name: 'asc' }
			}),
			prisma.subcategory.findMany({
				include: {
					category: {
						select: { id: true, name: true, slug: true }
					}
				},
				orderBy: { name: 'asc' }
			}),
			prisma.brand.findMany({
				orderBy: { name: 'asc' }
			})
		])

		return NextResponse.json({ 
			categories: categories || [], 
			subcategories: subcategories || [], 
			brands: brands || [] 
		})

	} catch (error) {
		console.error('Erreur lors de la récupération de la taxonomie:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
