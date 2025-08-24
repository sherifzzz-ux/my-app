import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
	const session = await auth()
	if (!session?.user?.id) {
		redirect('/auth')
	}

	const supabase = createServerSupabaseClient()
	let role: string | null = null
	try {
		const { data } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
		role = (data as unknown as string) ?? null
	} catch {
		role = null
	}

	if (role !== 'admin') {
		redirect('/')
	}

	return <AdminDashboard />
}


