"use client";

import { usePathname } from 'next/navigation'
import FlawlessFooter from '@/components/flawless/footer'
import { Header } from '@/components/flawless/header'
import MobileFooterNav from '@/components/flawless/mobile-footer-nav'

export function LayoutShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const isAdmin = pathname?.startsWith('/admin')

	if (isAdmin) {
		return <>{children}</>
	}

	return (
		<>
			<Header />
			{children}
			<FlawlessFooter />
			<MobileFooterNav />
		</>
	)
}


