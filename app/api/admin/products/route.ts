import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const url = new URL(req.url)
	const q = url.searchParams.get('q') || undefined
	const categoryId = url.searchParams.get('categoryId') || undefined
	const subcategoryId = url.searchParams.get('subcategoryId') || undefined
	const brandId = url.searchParams.get('brandId') || undefined
	const featured = url.searchParams.get('featured') || undefined
	const lowStock = url.searchParams.get('lowStock') || undefined

	const where: any = {}
	if (q) where.OR = [
		{ name: { contains: q, mode: 'insensitive' } },
		{ description: { contains: q, mode: 'insensitive' } },
	]
	if (categoryId) where.categoryId = categoryId
	if (subcategoryId) where.subcategoryId = subcategoryId
	if (brandId) where.brandId = brandId
	if (featured && featured !== 'all') where.isFeatured = featured === 'true'
	if (lowStock === 'true') where.stock = { lte: 5 }

	const products = await prisma.product.findMany({
		where,
		orderBy: { updatedAt: 'desc' },
	})

	return NextResponse.json(products)
}

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const body = await request.json().catch(() => null) as any
	if (!body?.name || !body?.priceCents || !body?.categoryId) {
		return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
	}

	const product = await prisma.product.create({
		data: {
			name: body.name,
			description: body.description ?? null,
			priceCents: Number(body.priceCents) || 0,
			oldPriceCents: body.oldPriceCents != null ? Number(body.oldPriceCents) : null,
			imageUrl: body.imageUrl ?? null,
			isFeatured: !!body.isFeatured,
			stock: Number(body.stock) || 0,
			categoryId: body.categoryId,
			subcategoryId: body.subcategoryId ?? null,
			brandId: body.brandId ?? null,
		},
	})

	return NextResponse.json(product)
}


