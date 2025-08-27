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

	const [{ data: profiles, error: profilesError }, { data: roles, error: rolesError }] = await Promise.all([
		supabase.from('profiles').select('*').order('created_at', { ascending: false }),
		supabase.from('user_roles').select('user_id, role'),
	])

	if (profilesError) return NextResponse.json({ error: profilesError.message }, { status: 500 })
	if (rolesError) return NextResponse.json({ error: rolesError.message }, { status: 500 })

	// Enrichir avec emails via Admin API
	const { data: list } = await supabase.auth.admin.listUsers()
	const idToEmail = new Map<string, string>()
	const idToBannedUntil = new Map<string, string | null | undefined>()
	for (const u of list?.users ?? []) {
		idToEmail.set(u.id, u.email ?? '')
		idToBannedUntil.set(u.id, (u as any).banned_until)
	}

	// Récupérer les suspensions depuis notre table personnalisée
	const { data: suspensions } = await supabase
		.from('user_suspensions')
		.select('user_id, suspended_until')
		.gt('suspended_until', new Date().toISOString())

	const userIdToSuspended = new Map<string, boolean>()
	for (const s of suspensions ?? []) {
		userIdToSuspended.set(s.user_id, true)
	}

	const userIdToRoles = new Map<string, string[]>()
	for (const r of roles ?? []) {
		const arr = userIdToRoles.get(r.user_id as string) ?? []
		arr.push(r.role as string)
		userIdToRoles.set(r.user_id as string, arr)
	}

	const merged = (profiles ?? []).map((p: any) => {
		// Vérifier si l'utilisateur est suspendu via l'API Supabase OU notre table personnalisée
		const isBannedViaSupabase = !!(idToBannedUntil.get(p.id) ?? null)
		const isBannedViaCustom = userIdToSuspended.get(p.id) ?? false
		const isBanned = isBannedViaSupabase || isBannedViaCustom

		return {
		...p,
		email: idToEmail.get(p.id) ?? null,
			is_banned: isBanned,
		user_roles: (userIdToRoles.get(p.id) ?? []).map((role) => ({ role })),
		}
	})

	return NextResponse.json(merged)
}

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const supabase = createServiceSupabaseClient()
	const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const body = await request.json().catch(() => null) as { userId?: string, role?: 'admin' | 'moderator' | 'user' } | null
	if (!body?.userId || !body?.role) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

	const { error } = await supabase
		.from('user_roles')
		.upsert({ user_id: body.userId, role: body.role })

	if (error) return NextResponse.json({ error: error.message }, { status: 500 })

	try {
		await supabase.from('audit_logs').insert({
			action: 'user.assign_role',
			entity: 'user_roles',
			entity_id: body.userId,
			actor_id: session.user.id,
			details: { role: body.role },
		})
	} catch {}
	return NextResponse.json({ ok: true })
}


