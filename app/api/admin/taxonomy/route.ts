import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const [categories, subcategories, brands] = await Promise.all([
		prisma.category.findMany({ orderBy: { name: 'asc' } }),
		prisma.subcategory.findMany({ orderBy: { name: 'asc' } }),
		prisma.brand.findMany({ orderBy: { name: 'asc' } }),
	])

	return NextResponse.json({ categories, subcategories, brands })
}


