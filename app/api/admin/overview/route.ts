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

	try {
		// Compter les produits
		const { count: totalProducts } = await supabase
			.from('products')
			.select('*', { count: 'exact', head: true })

		// Compter les catégories
		const { count: totalCategories } = await supabase
			.from('categories')
			.select('*', { count: 'exact', head: true })

		// Compter les marques
		const { count: totalBrands } = await supabase
			.from('brands')
			.select('*', { count: 'exact', head: true })

		// Compter les produits en stock faible
		const { count: lowStockProducts } = await supabase
			.from('products')
			.select('*', { count: 'exact', head: true })
			.lte('stock', 10)

		// Compter les produits en rupture de stock
		const { count: outOfStockProducts } = await supabase
			.from('products')
			.select('*', { count: 'exact', head: true })
			.eq('stock', 0)

		// Compter les produits en vedette
		const { count: featuredProducts } = await supabase
			.from('products')
			.select('*', { count: 'exact', head: true })
			.eq('isFeatured', true)

		// Récupérer les produits récents (5 derniers)
		const { data: recentProducts } = await supabase
			.from('products')
			.select(`
				id,
				name,
				price_cents,
				stock,
				created_at,
				category:categories(name),
				brand:brands(name)
			`)
			.order('created_at', { ascending: false })
			.limit(5)

		// Récupérer les produits les plus chers
		const { data: expensiveProducts } = await supabase
			.from('products')
			.select(`
				id,
				name,
				price_cents,
				image_url
			`)
			.order('price_cents', { ascending: false })
			.limit(5)

		// Récupérer les catégories avec le nombre de produits
		const { data: categoriesWithCount } = await supabase
			.from('categories')
			.select(`
				id,
				name,
				slug
			`)

		// Calculer le stock total
		const { data: allProducts } = await supabase
			.from('products')
			.select('stock')
		
		const totalStock = (allProducts || []).reduce((sum, product) => sum + (product.stock || 0), 0)

		// Valeur totale du stock (estimation)
		const { data: productsForValue } = await supabase
			.from('products')
			.select('price_cents, stock')
		
		const totalStockValue = (productsForValue || []).reduce((sum, product) => {
			return sum + ((product.price_cents || 0) * (product.stock || 0))
		}, 0)

		return NextResponse.json({
			// Compteurs principaux
			totalProducts: totalProducts || 0,
			totalCategories: totalCategories || 0,
			totalBrands: totalBrands || 0,
			totalStock: totalStock || 0,
			totalStockValue: totalStockValue || 0,
			
			// Alertes
			lowStockProducts: lowStockProducts || 0,
			outOfStockProducts: outOfStockProducts || 0,
			featuredProducts: featuredProducts || 0,
			
			// Données récentes
			recentProducts: recentProducts || [],
			expensiveProducts: expensiveProducts || [],
			categoriesWithCount: categoriesWithCount || [],
			
			// Placeholders pour les fonctionnalités futures
			totalOrders: 0,
			totalRevenue: 0,
			totalUsers: 0,
			recentOrders: [],
			monthlyRevenue: [],
			orderStatuses: [],
			topProducts: [],
			pendingOrders: 0,
			revenueThisMonth: 0,
			revenueLastMonth: 0
		})

	} catch (error) {
		console.error('Erreur dans l\'API overview:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}


