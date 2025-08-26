import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		// Compter les produits avec Prisma
		const totalProducts = await prisma.product.count()
		const totalCategories = await prisma.category.count()
		const totalBrands = await prisma.brand.count()
		const lowStockProducts = await prisma.product.count({
			where: { stock: { lte: 10 } }
		})
		const outOfStockProducts = await prisma.product.count({
			where: { stock: 0 }
		})
		const featuredProducts = await prisma.product.count({
			where: { isFeatured: true }
		})

		// Récupérer les produits récents (5 derniers)
		const recentProducts = await prisma.product.findMany({
			take: 5,
			select: {
				id: true,
				name: true,
				priceCents: true,
				stock: true,
				createdAt: true,
				category: {
					select: { name: true }
				},
				brand: {
					select: { name: true }
				}
			},
			orderBy: { createdAt: 'desc' }
		})

		// Récupérer les produits les plus chers
		const expensiveProducts = await prisma.product.findMany({
			take: 5,
			select: {
				id: true,
				name: true,
				priceCents: true,
				imageUrl: true
			},
			orderBy: { priceCents: 'desc' }
		})

		// Récupérer les catégories avec le nombre de produits
		const categoriesWithCount = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
				_count: {
					select: { products: true }
				}
			},
			orderBy: { name: 'asc' }
		})

		// Calculer le stock total et la valeur
		const stockResult = await prisma.product.aggregate({
			_sum: { stock: true }
		})
		const totalStock = stockResult._sum.stock || 0

		// Valeur totale du stock (estimation)
		const productsForValue = await prisma.product.findMany({
			select: { priceCents: true, stock: true }
		})
		
		const totalStockValue = productsForValue.reduce((sum, product) => {
			return sum + ((product.priceCents || 0) * (product.stock || 0))
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
