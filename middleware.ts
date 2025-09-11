import { auth } from '@/auth-edge'
import { NextResponse } from 'next/server'

export default auth((req) => {
	const { pathname } = req.nextUrl
	const isLoggedIn = !!req.auth?.user

	// Check if user is trying to access protected routes
	if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
		if (!isLoggedIn) {
			return NextResponse.redirect(new URL('/auth', req.url))
		}
	}

	if (pathname.startsWith('/account')) {
		if (!isLoggedIn) {
			return NextResponse.redirect(new URL('/auth', req.url))
		}
	}

	return NextResponse.next()
})

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


