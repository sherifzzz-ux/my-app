import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

// Schéma de validation pour la création/modification de produit
const ProductSchema = z.object({
	name: z.string().min(1, 'Le nom est requis'),
	description: z.string().optional(),
	priceCents: z.number().min(0, 'Le prix doit être positif'),
	oldPriceCents: z.number().min(0).optional(),
	imageUrl: z.string().url().optional().or(z.literal('')),
	isFeatured: z.boolean().default(false),
	stock: z.number().min(0, 'Le stock doit être positif'),
	categoryId: z.string().min(1, 'La catégorie est requise'),
	subcategoryId: z.string().optional(),
	brandId: z.string().optional(),
	rating: z.number().min(0).max(5).optional(),
})

export async function GET(req: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	const url = new URL(req.url)
	const q = url.searchParams.get('q') || undefined
	const categoryId = url.searchParams.get('categoryId') || undefined
	const subcategoryId = url.searchParams.get('subcategoryId') || undefined
	const brandId = url.searchParams.get('brandId') || undefined
	const featured = url.searchParams.get('featured') || undefined
	const lowStock = url.searchParams.get('lowStock') || undefined
	const stockFilter = url.searchParams.get('stockFilter') || undefined

	try {
		// Construire la requête Prisma
		const where: any = {}

		// Appliquer les filtres
		if (q) {
			where.OR = [
				{ name: { contains: q, mode: 'insensitive' } },
				{ description: { contains: q, mode: 'insensitive' } }
			]
		}
		if (categoryId && categoryId !== 'all') {
			where.categoryId = categoryId
		}
		if (subcategoryId && subcategoryId !== 'all') {
			where.subcategoryId = subcategoryId
		}
		if (brandId && brandId !== 'all') {
			where.brandId = brandId
		}
		if (featured && featured !== 'all') {
			where.isFeatured = featured === 'true'
		}
		
		// Filtres de stock
		if (lowStock === 'true') {
			where.stock = { lte: 5 }
		} else if (stockFilter === 'low') {
			where.stock = { lte: 5 }
		} else if (stockFilter === 'out') {
			where.stock = 0
		} else if (stockFilter === 'in') {
			where.stock = { gt: 0 }
		}

		const products = await prisma.product.findMany({
			where,
			include: {
				category: {
					select: { name: true, slug: true }
				},
				subcategory: {
					select: { name: true, slug: true }
				},
				brand: {
					select: { name: true, slug: true }
				}
			},
			orderBy: { updatedAt: 'desc' }
		})

		return NextResponse.json(products)

	} catch (error) {
		console.error('Erreur lors de la récupération des produits:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

export async function POST(request: Request) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const body = await request.json()
		
		// Valider les données avec Zod
		const validatedData = ProductSchema.parse(body)

		// Vérifier que la catégorie existe
		const categoryExists = await prisma.category.findUnique({
			where: { id: validatedData.categoryId }
		})

		if (!categoryExists) {
			return NextResponse.json({ error: 'Catégorie invalide' }, { status: 400 })
		}

		// Vérifier que la sous-catégorie existe si fournie
		if (validatedData.subcategoryId) {
			const subcategoryExists = await prisma.subcategory.findFirst({
				where: { 
					id: validatedData.subcategoryId,
					categoryId: validatedData.categoryId
				}
			})

			if (!subcategoryExists) {
				return NextResponse.json({ error: 'Sous-catégorie invalide pour cette catégorie' }, { status: 400 })
			}
		}

		// Vérifier que la marque existe si fournie
		if (validatedData.brandId) {
			const brandExists = await prisma.brand.findUnique({
				where: { id: validatedData.brandId }
			})

			if (!brandExists) {
				return NextResponse.json({ error: 'Marque invalide' }, { status: 400 })
			}
		}

		// Créer le produit
		const product = await prisma.product.create({
			data: {
				name: validatedData.name,
				description: validatedData.description || null,
				priceCents: validatedData.priceCents,
				oldPriceCents: validatedData.oldPriceCents || null,
				imageUrl: validatedData.imageUrl || null,
				isFeatured: validatedData.isFeatured,
				stock: validatedData.stock,
				categoryId: validatedData.categoryId,
				subcategoryId: validatedData.subcategoryId || null,
				brandId: validatedData.brandId || null,
				rating: validatedData.rating || 0,
			},
			include: {
				category: {
					select: { name: true, slug: true }
				},
				subcategory: {
					select: { name: true, slug: true }
				},
				brand: {
					select: { name: true, slug: true }
				}
			}
		})

		// Audit log (si la table existe)
		try {
			await prisma.$executeRaw`
				INSERT INTO "audit_logs" (
					action, entity, entity_id, actor_id, details
				) VALUES (
					${'product.create'}, 
					${'Product'}, 
					${product.id}, 
					${session.user.id}, 
					${JSON.stringify({ 
						name: validatedData.name, 
						priceCents: validatedData.priceCents,
						categoryId: validatedData.categoryId 
					})}
				)
			`
		} catch (auditError) {
			console.warn('Erreur lors de l\'audit log:', auditError)
		}

		return NextResponse.json(product)

	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides', 
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la création du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
