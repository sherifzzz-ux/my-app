import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const [categoriesResult, subcategoriesResult, brandsResult] = await Promise.all([
		supabase.from('categories').select('*').order('name', { ascending: true }),
		supabase.from('subcategories').select('*').order('name', { ascending: true }),
		supabase.from('brands').select('*').order('name', { ascending: true }),
	])

	if (categoriesResult.error) return NextResponse.json({ error: categoriesResult.error.message }, { status: 500 })
	if (subcategoriesResult.error) return NextResponse.json({ error: subcategoriesResult.error.message }, { status: 500 })
	if (brandsResult.error) return NextResponse.json({ error: brandsResult.error.message }, { status: 500 })

	return NextResponse.json({ 
		categories: categoriesResult.data || [], 
		subcategories: subcategoriesResult.data || [], 
		brands: brandsResult.data || [] 
	})
}


