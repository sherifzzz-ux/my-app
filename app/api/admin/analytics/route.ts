import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function getPeriodRange(period?: string) {
  const now = new Date()
  let from = new Date()
  switch (period) {
    case '7d': from.setDate(now.getDate() - 7); break
    case '30d': from.setDate(now.getDate() - 30); break
    case '90d': from.setDate(now.getDate() - 90); break
    case '1y': from.setFullYear(now.getFullYear() - 1); break
    default: from.setDate(now.getDate() - 30); break
  }
  return { from: from.toISOString(), to: now.toISOString() }
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceSupabaseClient()
  const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const url = new URL(req.url)
  const period = url.searchParams.get('period') || undefined
  const { from, to } = getPeriodRange(period)

  // Orders in period
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('id, user_id, total_amount, created_at, shipping_address, payment_status, status')
    .gte('created_at', from)
    .lte('created_at', to)
    .order('created_at', { ascending: true })
  if (ordersError) return NextResponse.json({ error: ordersError.message }, { status: 500 })

  const orderIds = (orders ?? []).map(o => o.id)

  // Order items for top products
  let items: any[] = []
  if (orderIds.length > 0) {
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, product_name, quantity, total_price, order_id')
      .in('order_id', orderIds)
    if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 })
    items = orderItems ?? []
  }

  // Sales by day
  const byDayMap = new Map<string, { date: string, orders: number, revenue: number }>()
  for (const o of orders ?? []) {
    const d = new Date(o.created_at as string).toISOString().slice(0,10)
    const prev = byDayMap.get(d) || { date: d, orders: 0, revenue: 0 }
    prev.orders += 1
    prev.revenue += Number(o.total_amount || 0)
    byDayMap.set(d, prev)
  }
  const salesByDay = Array.from(byDayMap.values()).sort((a,b)=>a.date.localeCompare(b.date))

  // Top products
  const prodMap = new Map<string, { product_name: string, quantity: number, revenue: number }>()
  for (const it of items) {
    const key = it.product_id || it.product_name
    const prev = prodMap.get(key) || { product_name: it.product_name, quantity: 0, revenue: 0 }
    prev.quantity += Number(it.quantity || 0)
    prev.revenue += Number(it.total_price || 0)
    prodMap.set(key, prev)
  }
  const topProducts = Array.from(prodMap.values()).sort((a,b)=>b.revenue - a.revenue).slice(0,10)

  // Customer stats
  const { data: newProfiles, error: profErr } = await supabase
    .from('profiles')
    .select('id')
    .gte('created_at', from)
    .lte('created_at', to)
  if (profErr) return NextResponse.json({ error: profErr.message }, { status: 500 })

  const activeCustomers = new Set((orders ?? []).map(o => o.user_id))
  const totalRevenue = (orders ?? []).reduce((s,o)=>s + Number(o.total_amount || 0), 0)

  // Geo sales
  const geoMap = new Map<string, { key: string, revenue: number, orders: number }>()
  for (const o of orders ?? []) {
    let key = 'Inconnu'
    try {
      const addr = o.shipping_address as any
      const country = addr?.country || addr?.country_code || addr?.Country
      const city = addr?.city || addr?.City
      key = country || city || 'Inconnu'
    } catch {}
    const prev = geoMap.get(key) || { key, revenue: 0, orders: 0 }
    prev.revenue += Number(o.total_amount || 0)
    prev.orders += 1
    geoMap.set(key, prev)
  }
  const geoSales = Array.from(geoMap.values()).sort((a,b)=>b.revenue - a.revenue).slice(0,20)

  // Stock alerts from Prisma
  let stockAlerts: any[] = []
  try {
    stockAlerts = await prisma.product.findMany({ where: { stock: { lte: 5 } }, select: { id: true, name: true, stock: true } })
  } catch {}

  const result = {
    period: { from, to },
    totals: {
      totalRevenue,
      ordersCount: (orders ?? []).length,
      activeCustomers: activeCustomers.size,
      newCustomers: (newProfiles ?? []).length,
    },
    salesByDay,
    topProducts,
    geoSales,
    stockAlerts,
  }

  return NextResponse.json(result)
}


