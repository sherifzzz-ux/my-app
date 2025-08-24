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
	const status = url.searchParams.get('status') || 'all' // all | unread | read

	let { data, error } = await supabase
		.from('contact_messages')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	let filtered = data ?? []
	if (status !== 'all') {
		const isRead = status === 'read'
		filtered = filtered.filter((m: any) => !!m.is_read === isRead)
	}
	if (q) {
		const qLower = q.toLowerCase()
		filtered = filtered.filter((m: any) =>
			(String(m.name || '').toLowerCase().includes(qLower)) ||
			(String(m.email || '').toLowerCase().includes(qLower)) ||
			(String(m.subject || '').toLowerCase().includes(qLower)) ||
			(String(m.message || '').toLowerCase().includes(qLower))
		)
	}

	return NextResponse.json(filtered)
}


