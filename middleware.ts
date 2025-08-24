import { NextResponse } from 'next/server'

export async function middleware(req: any) {
	// Run NextAuth edge authorization first (re-exported)
	const res = await (await import('@/auth-edge')).auth(req)

	const url = new URL(req.nextUrl)
	const path = url.pathname

	// Skip maintenance for admin and admin APIs and maintenance API itself
	if (path.startsWith('/admin') || path.startsWith('/api/admin') || path.startsWith('/api/maintenance')) {
		return res
	}

	try {
		const base = process.env.NEXT_PUBLIC_BASE_URL || `${url.origin}`
		const check = await fetch(`${base}/api/maintenance`, { cache: 'no-store' })
		if (check.ok) {
			const { maintenance } = await check.json()
			if (maintenance) {
				return NextResponse.rewrite(new URL('/maintenance.html', url.origin))
			}
		}
	} catch {}

	return res
}

export const config = {
	matcher: ["/:path*"],
};


