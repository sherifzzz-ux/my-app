import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const body = await request.json().catch(() => null) as any
	if (!body?.name || !body?.priceCents || !body?.categoryId) {
		return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
	}

	const { data: product, error } = await supabase
		.from('products')
		.update({
			name: body.name,
			description: body.description ?? null,
			price_cents: Number(body.priceCents) || 0,
			old_price_cents: body.oldPriceCents != null ? Number(body.oldPriceCents) : null,
			image_url: body.imageUrl ?? null,
			is_featured: !!body.isFeatured,
			stock: Number(body.stock) || 0,
			category_id: body.categoryId,
			subcategory_id: body.subcategoryId ?? null,
			brand_id: body.brandId ?? null,
		})
		.eq('id', id)
		.select()
		.single()

	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	// Audit log
	try {
		await supabase.from('audit_logs').insert({
			action: 'product.update',
			entity: 'products',
			entity_id: id,
			actor_id: session.user.id,
			details: { name: body.name, price_cents: body.priceCents },
		})
	} catch {}

	return NextResponse.json(product)
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { error } = await supabase.from('products').delete().eq('id', id)

	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	// Audit log
	try {
		await supabase.from('audit_logs').insert({
			action: 'product.delete',
			entity: 'products',
			entity_id: id,
			actor_id: session.user.id,
			details: { deleted_at: new Date().toISOString() },
		})
	} catch {}

	return NextResponse.json({ success: true })
}


