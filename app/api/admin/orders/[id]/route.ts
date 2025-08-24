import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { id } = await ctx.params
	const [{ data: order, error: orderError }, { data: items, error: itemsError }] = await Promise.all([
		supabase.from('orders').select('*').eq('id', id).single(),
		supabase.from('order_items').select('*').eq('order_id', id).order('created_at', { ascending: true }),
	])
	if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 })
	if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 })
	return NextResponse.json({ order, items })
}

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { id } = await ctx.params
	const body = await request.json().catch(() => null) as { status?: string, payment_status?: string } | null
	if (!body) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

	const { error } = await supabase.from('orders').update({
		...(body.status ? { status: body.status } : {}),
		...(body.payment_status ? { payment_status: body.payment_status } : {}),
	}).eq('id', id)

	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	// Audit log (best effort)
	try {
		await supabase.from('audit_logs').insert({
			action: 'order.update',
			entity: 'orders',
			entity_id: id,
			actor_id: session.user.id,
			details: body,
		})
	} catch {}
	return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { id } = await ctx.params
	const { error } = await supabase.from('orders').update({ status: 'cancelled' }).eq('id', id)
	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	try {
		await supabase.from('audit_logs').insert({
			action: 'order.cancel',
			entity: 'orders',
			entity_id: id,
			actor_id: session.user.id,
		})
	} catch {}
	return NextResponse.json({ ok: true })
}


