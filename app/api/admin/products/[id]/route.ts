import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { id } = await ctx.params
	const body = await request.json().catch(() => null) as any
	if (!body) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

	const product = await prisma.product.update({
		where: { id },
		data: {
			...(body.name !== undefined ? { name: body.name } : {}),
			...(body.description !== undefined ? { description: body.description } : {}),
			...(body.priceCents !== undefined ? { priceCents: Number(body.priceCents) } : {}),
			...(body.oldPriceCents !== undefined ? { oldPriceCents: Number(body.oldPriceCents) } : {}),
			...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
			...(body.isFeatured !== undefined ? { isFeatured: !!body.isFeatured } : {}),
			...(body.stock !== undefined ? { stock: Number(body.stock) } : {}),
			...(body.categoryId !== undefined ? { categoryId: body.categoryId } : {}),
			...(body.subcategoryId !== undefined ? { subcategoryId: body.subcategoryId } : {}),
			...(body.brandId !== undefined ? { brandId: body.brandId } : {}),
		},
	})

	try {
		await supabase.from('audit_logs').insert({
			action: 'product.update',
			entity: 'product',
			entity_id: id,
			actor_id: session.user.id,
			details: body,
		})
	} catch {}
	return NextResponse.json(product)
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { id } = await ctx.params
	await prisma.product.delete({ where: { id } })
	try {
		await supabase.from('audit_logs').insert({
			action: 'product.delete',
			entity: 'product',
			entity_id: id,
			actor_id: session.user.id,
		})
	} catch {}
	return NextResponse.json({ ok: true })
}


