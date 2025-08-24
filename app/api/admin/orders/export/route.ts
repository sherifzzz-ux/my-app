import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

function toCsv(rows: any[]) {
	if (!rows || rows.length === 0) return ''
	const headers = Object.keys(rows[0])
	const lines = [headers.join(',')]
	for (const r of rows) {
		lines.push(headers.map((h) => JSON.stringify(r[h] ?? '').replace(/^"|"$/g, '')).join(','))
	}
	return lines.join('\n')
}

export async function GET(req: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	// Reuse filters from /api/admin/orders
	const url = new URL(req.url)
	const status = url.searchParams.get('status') || undefined
	const paymentStatus = url.searchParams.get('payment_status') || undefined
	const from = url.searchParams.get('from') || undefined
	const to = url.searchParams.get('to') || undefined

	let query = supabase.from('orders').select('*')
	if (status && status !== 'all') query = query.eq('status', status)
	if (paymentStatus && paymentStatus !== 'all') query = query.eq('payment_status', paymentStatus)
	if (from) query = query.gte('created_at', from)
	if (to) query = query.lte('created_at', to)

	const { data, error } = await query.order('created_at', { ascending: false })
	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	const csv = toCsv(data ?? [])
	return new NextResponse(csv, {
		headers: {
			'Content-Type': 'text/csv; charset=utf-8',
			'Content-Disposition': 'attachment; filename="orders.csv"',
		},
	})
}


