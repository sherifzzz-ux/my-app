import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

const brandSchema = z.object({
	name: z.string().min(1, 'Le nom de la marque est requis'),
	slug: z.string().min(1, 'Le slug est requis'),
	imageUrl: z.string().optional()
})

export async function GET() {
	const session = await auth()
	if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	// TODO: Adapter la logique de vérification admin selon votre système
	// const supabase = createServiceSupabaseClient()
	// const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id })
	// if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

	try {
		const brands = await prisma.brand.findMany({
			orderBy: { name: 'asc' }
		})

		return NextResponse.json(brands)
	} catch (error) {
		console.error('Erreur lors du chargement des marques:', error)
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
		const validatedData = brandSchema.parse(body)

		// Vérifier si la marque existe déjà
		const existingBrand = await prisma.brand.findFirst({
			where: {
				OR: [
					{ name: validatedData.name },
					{ slug: validatedData.slug }
				]
			}
		})

		if (existingBrand) {
			return NextResponse.json({ 
				error: 'Une marque avec ce nom ou ce slug existe déjà' 
			}, { status: 400 })
		}

		const brand = await prisma.brand.create({
			data: validatedData
		})

		// Audit log (si la table existe)
		try {
			await prisma.$executeRaw`
				INSERT INTO "audit_logs" (
					action, entity, entity_id, actor_id, details
				) VALUES (
					${'brand.create'}, 
					${'Brand'}, 
					${brand.id}, 
					${session.user.id}, 
					${JSON.stringify({ 
						name: validatedData.name, 
						slug: validatedData.slug 
					})}
				)
			`
		} catch (auditError) {
			console.warn('Erreur lors de l\'audit log:', auditError)
		}

		return NextResponse.json(brand, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ 
				error: 'Données invalides',
				details: error.issues 
			}, { status: 400 })
		}

		console.error('Erreur lors de la création de la marque:', error)
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}
