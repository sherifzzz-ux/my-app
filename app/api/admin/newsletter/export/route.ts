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
	const status = url.searchParams.get('status') || 'all'

	let query = supabase.from('newsletter_subscribers').select('email,is_active,source,subscribed_at')
	if (status !== 'all') query = query.eq('is_active', status === 'active')
	const { data, error } = await query.order('subscribed_at', { ascending: false })
	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	const headers = ['email','is_active','source','subscribed_at']
	const lines = [headers.join(',')]
	for (const r of data ?? []) {
		lines.push(headers.map((h) => JSON.stringify((r as any)[h] ?? '').replace(/^"|"$/g, '')).join(','))
	}
	return new NextResponse(lines.join('\n'), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="subscribers.csv"' } })
}


