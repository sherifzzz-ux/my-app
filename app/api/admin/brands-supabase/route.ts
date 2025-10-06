import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const supabase = createServiceSupabaseClient()

		// Récupérer toutes les marques
		const { data: brands, error } = await supabase
			.from('brands')
			.select('*')
			.order('name')

		if (error) throw error

		return NextResponse.json(brands || [])
	} catch (error) {
		console.error('Erreur lors du chargement des marques:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
