import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { Resend } from 'resend'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const body = await request.json().catch(() => null) as { to?: string, subject?: string, text?: string } | null
	if (!body?.to || !body?.subject || !body?.text) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

	const resend = new Resend(process.env.RESEND_API_KEY || '')
	if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 })

	await resend.emails.send({ from: 'no-reply@flawless-beauty.app', to: body.to, subject: body.subject, text: body.text })
	return NextResponse.json({ ok: true })
}


