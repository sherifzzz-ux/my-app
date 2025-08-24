import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET(req: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const supabase = createServiceSupabaseClient()

	// Vérifier rôle admin
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Parse filters
  const url = new URL(req.url)
  const status = url.searchParams.get('status') || undefined
  const paymentStatus = url.searchParams.get('payment_status') || undefined
  const from = url.searchParams.get('from') || undefined
  const to = url.searchParams.get('to') || undefined
  const q = url.searchParams.get('q') || undefined

	// 1) Récupérer les commandes avec filtres simples
  let query = supabase.from('orders').select('*')
  if (status && status !== 'all') query = query.eq('status', status)
  if (paymentStatus && paymentStatus !== 'all') query = query.eq('payment_status', paymentStatus)
  if (from) query = query.gte('created_at', from)
  if (to) query = query.lte('created_at', to)
  const { data: orders, error: ordersError } = await query.order('created_at', { ascending: false })

	if (ordersError) return NextResponse.json({ error: ordersError.message }, { status: 500 })

	if (!orders || orders.length === 0) return NextResponse.json([])

	// 2) Récupérer les profils correspondants et fusionner côté serveur
	const userIds = Array.from(new Set(orders.map((o: any) => o.user_id).filter(Boolean)))
	let profilesMap = new Map<string, { first_name: string | null; last_name: string | null }>()
	if (userIds.length > 0) {
		const { data: profiles, error: profilesError } = await supabase
			.from('profiles')
			.select('id, first_name, last_name')
			.in('id', userIds)
		if (profilesError) return NextResponse.json({ error: profilesError.message }, { status: 500 })
		for (const p of profiles ?? []) {
			profilesMap.set(p.id as string, { first_name: p.first_name as any, last_name: p.last_name as any })
		}
	}

	let merged = orders.map((o: any) => ({
		...o,
		profiles: profilesMap.get(o.user_id) ?? null,
	}))

  // Filtre recherche texte (client nom/prénom ou numéro commande)
  if (q) {
    const qLower = q.toLowerCase()
    merged = merged.filter((o: any) =>
      String(o.order_number || '').toLowerCase().includes(qLower) ||
      String(o.profiles?.first_name || '').toLowerCase().includes(qLower) ||
      String(o.profiles?.last_name || '').toLowerCase().includes(qLower)
    )
  }

	return NextResponse.json(merged)
}


