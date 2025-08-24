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

	const { data, error } = await supabase
		.from('shipping_methods')
		.select('*')
		.order('created_at', { ascending: true })
	if (error) return NextResponse.json({ error: error.message }, { status: 500 })
	return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
	// Bulk import/upsert
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const body = await request.json().catch(() => null) as any[] | null
	if (!Array.isArray(body)) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
	// Upsert by name
	for (const m of body) {
		await supabase.from('shipping_methods').upsert({
			id: m.id,
			name: m.name,
			description: m.description ?? null,
			price: Number(m.price) || 0,
			estimated_days_min: m.estimated_days_min ?? null,
			estimated_days_max: m.estimated_days_max ?? null,
			is_active: m.is_active ?? true,
		})
	}
	return NextResponse.json({ ok: true })
}


