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

  const [{ data: settings }, { data: methods, error: methodsError }] = await Promise.all([
    supabase.from('site_settings').select('free_shipping_threshold').limit(1),
    supabase.from('shipping_methods').select('*').order('created_at', { ascending: true })
  ])
  if (methodsError) return NextResponse.json({ error: methodsError.message }, { status: 500 })
  const freeShipping = settings && settings[0] ? (settings[0] as any).free_shipping_threshold ?? 0 : 0
  return NextResponse.json({ free_shipping_threshold: freeShipping, shipping_methods: methods ?? [] })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServiceSupabaseClient()
  const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json().catch(() => null) as { free_shipping_threshold?: number } | null
  if (!body || typeof body.free_shipping_threshold !== 'number') return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

  const singletonId = '00000000-0000-0000-0000-000000000001'
  const { error } = await supabase.from('site_settings').upsert({ id: singletonId, free_shipping_threshold: body.free_shipping_threshold }, { onConflict: 'id' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}


