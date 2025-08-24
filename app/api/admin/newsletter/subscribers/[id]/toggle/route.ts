import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const { id } = await ctx.params
	const { data: existing, error: e1 } = await supabase.from('newsletter_subscribers').select('is_active').eq('id', id).single()
	if (e1) return NextResponse.json({ error: e1.message }, { status: 500 })
	const { error } = await supabase.from('newsletter_subscribers').update({ is_active: !existing?.is_active }).eq('id', id)
	if (error) return NextResponse.json({ error: error.message }, { status: 500 })
	return NextResponse.json({ ok: true })
}


