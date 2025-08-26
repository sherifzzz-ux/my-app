import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

// Récupérer un produit spécifique
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const { id } = await params
		
		const product = await prisma.product.findUnique({
			where: { id },
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

		if (!product) {
			return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
		}

		return NextResponse.json(product)

	} catch (error) {
		console.error('Erreur lors de la récupération du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

// Mettre à jour un produit spécifique
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const { id } = await params
		const body = await request.json()

		// Vérifier que le produit existe
		const existingProduct = await prisma.product.findUnique({
			where: { id }
		})

		if (!existingProduct) {
			return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
		}

		// Mettre à jour le produit
		const updatedProduct = await prisma.product.update({
			where: { id },
			data: {
				...body,
				updatedAt: new Date(),
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
					${'product.update'}, 
					${'Product'}, 
					${id}, 
					${session.user.id}, 
					${JSON.stringify(body)}
				)
			`
		} catch (auditError) {
			console.warn('Erreur lors de l\'audit log:', auditError)
		}

		return NextResponse.json(updatedProduct)

	} catch (error) {
		console.error('Erreur lors de la modification du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}

// Supprimer un produit spécifique
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	
	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const { id } = await params
		
		// Vérifier que le produit existe
		const existingProduct = await prisma.product.findUnique({
			where: { id }
		})

		if (!existingProduct) {
			return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
		}

		// Supprimer le produit
		await prisma.product.delete({
			where: { id }
		})

		// Audit log (si la table existe)
		try {
			await prisma.$executeRaw`
				INSERT INTO "audit_logs" (
					action, entity, entity_id, actor_id, details
				) VALUES (
					${'product.delete'}, 
					${'Product'}, 
					${id}, 
					${session.user.id}, 
					${JSON.stringify({ 
						name: existingProduct.name,
						priceCents: existingProduct.priceCents,
						categoryId: existingProduct.categoryId 
					})}
				)
			`
		} catch (auditError) {
			console.warn('Erreur lors de l\'audit log:', auditError)
		}

		return NextResponse.json({ message: 'Produit supprimé avec succès' })

	} catch (error) {
		console.error('Erreur lors de la suppression du produit:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}


