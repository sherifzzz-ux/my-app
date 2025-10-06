import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { typedSupabase } from '@/lib/supabase/client'

export const runtime = 'nodejs'

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		// Récupérer toutes les catégories avec leurs sous-catégories
		const { data: categories, error: categoriesError } = await typedSupabase.getCategoriesWithSubcategories()

		if (categoriesError) throw categoriesError

		// Récupérer toutes les sous-catégories séparément
		const { data: subcategories, error: subcategoriesError } = await typedSupabase.getSubcategories()

		if (subcategoriesError) throw subcategoriesError

		// Récupérer toutes les marques
		const { data: brands, error: brandsError } = await typedSupabase.getBrands()

		if (brandsError) throw brandsError

		// Grouper les sous-catégories par catégorie
		const subcategoriesByCategory = subcategories?.reduce((acc, subcategory) => {
			if (!acc[subcategory.categoryId]) {
				acc[subcategory.categoryId] = []
			}
			acc[subcategory.categoryId].push(subcategory)
			return acc
		}, {} as Record<string, typeof subcategories>) || {}

		// Transformer les données pour correspondre au format attendu
		const formattedCategories = categories?.map((category) => ({
			id: category.id,
			name: category.name,
			slug: category.slug,
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
			subcategories: subcategoriesByCategory[category.id] || []
		})) || []

		return NextResponse.json({ 
			categories: formattedCategories, 
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
