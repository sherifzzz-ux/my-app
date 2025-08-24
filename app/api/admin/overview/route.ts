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

	// Counts
	const [ordersCountRes, usersCountRes, subsCountRes, unreadMsgCountRes] = await Promise.all([
		supabase.from('orders').select('*', { count: 'exact', head: true }),
		supabase.from('profiles').select('*', { count: 'exact', head: true }),
		supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
		supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
	])

	// Revenue total (sum of total_amount)
	const { data: revenueRows, error: revenueError } = await supabase
		.from('orders')
		.select('total_amount')

	if (ordersCountRes.error) return NextResponse.json({ error: ordersCountRes.error.message }, { status: 500 })
	if (usersCountRes.error) return NextResponse.json({ error: usersCountRes.error.message }, { status: 500 })
	if (subsCountRes.error) return NextResponse.json({ error: subsCountRes.error.message }, { status: 500 })
	if (unreadMsgCountRes.error) return NextResponse.json({ error: unreadMsgCountRes.error.message }, { status: 500 })
	if (revenueError) return NextResponse.json({ error: revenueError.message }, { status: 500 })

	const totalRevenue = (revenueRows ?? []).reduce((sum: number, r: any) => sum + (r.total_amount || 0), 0)

	// Recent orders (limit 5) with basic fields
	const { data: recentOrders, error: recentError } = await supabase
		.from('orders')
		.select('id, order_number, total_amount, status, created_at')
		.order('created_at', { ascending: false })
		.limit(5)

	if (recentError) return NextResponse.json({ error: recentError.message }, { status: 500 })

	return NextResponse.json({
		totalOrders: ordersCountRes.count ?? 0,
		totalRevenue,
		totalUsers: usersCountRes.count ?? 0,
		newsletterSubscribers: subsCountRes.count ?? 0,
		recentOrders: recentOrders ?? [],
		pendingMessages: unreadMsgCountRes.count ?? 0,
	})
}


