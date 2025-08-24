import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

const DEFAULTS = {
  site_name: 'Flawless Beauty',
  currency: 'XOF',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'SN',
  free_shipping_threshold: 0,
  maintenance_mode: false,
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServiceSupabaseClient()
  const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Expect table public.site_settings (id uuid default, singleton row)
  const { data, error } = await supabase.from('site_settings').select('*').limit(1)
  if (error) return NextResponse.json({ ...DEFAULTS, _warning: 'site_settings table missing or unreadable', _error: error.message })
  const row = (data && data[0]) || null
  return NextResponse.json(row ? row : DEFAULTS)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServiceSupabaseClient()
  const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json().catch(() => null) as Partial<typeof DEFAULTS> | null
  if (!body) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

  // Upsert single row (using a fixed id for singleton behavior)
  const singletonId = '00000000-0000-0000-0000-000000000001'
  const payload = { id: singletonId, ...DEFAULTS, ...body }
  const { error } = await supabase.from('site_settings').upsert(payload, { onConflict: 'id' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  try {
    await supabase.from('audit_logs').insert({
      action: 'settings.general.update',
      entity: 'site_settings',
      entity_id: singletonId,
      actor_id: session.user.id,
      details: body,
    })
  } catch {}
  return NextResponse.json({ ok: true })
}


