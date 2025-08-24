import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET(req: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const url = new URL(req.url)
	const q = url.searchParams.get('q') || ''
	const status = url.searchParams.get('status') || 'all' // all | active | inactive
	const source = url.searchParams.get('source') || undefined
	const from = url.searchParams.get('from') || undefined
	const to = url.searchParams.get('to') || undefined

	let query = supabase.from('newsletter_subscribers').select('*')
	if (status !== 'all') query = query.eq('is_active', status === 'active')
	if (source) query = query.eq('source', source)
	if (from) query = query.gte('subscribed_at', from)
	if (to) query = query.lte('subscribed_at', to)
	const { data, error } = await query.order('subscribed_at', { ascending: false })
	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	let rows = data ?? []
	if (q) {
		const qLower = q.toLowerCase()
		rows = rows.filter((s: any) => String(s.email || '').toLowerCase().includes(qLower))
	}
	return NextResponse.json(rows)
}


