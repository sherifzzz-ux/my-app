import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

// Fonction pour valider un UUID
function isValidUUID(uuid: string): boolean {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	const isValid = uuidRegex.test(uuid);
	console.log(`🔍 Validation UUID réactivation: "${uuid}" -> ${isValid ? '✅ Valide' : '❌ Invalide'}`);
	return isValid;
}

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			console.log('❌ Session non autorisée pour la réactivation')
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		console.log('🔐 Vérification des permissions pour la réactivation, utilisateur:', session.user.id)
		const supabase = createServiceSupabaseClient()
		
		// Vérifier que l'utilisateur est admin
		try {
			const { data: role, error: roleError } = await supabase.rpc('get_user_role', { 
				_user_id: session.user.id 
			})
			
			if (roleError) {
				console.error('❌ Erreur lors de la vérification du rôle:', roleError)
				return NextResponse.json({ 
					error: 'Erreur de vérification des permissions',
					details: roleError.message 
				}, { status: 500 })
			}
			
			if (role !== 'admin') {
				console.log('❌ Utilisateur non admin, rôle:', role)
				return NextResponse.json({ error: 'Forbidden - Rôle admin requis' }, { status: 403 })
			}
			
			console.log('✅ Permissions admin confirmées pour la réactivation')
		} catch (roleCheckError) {
			console.error('❌ Erreur lors de la vérification du rôle:', roleCheckError)
			return NextResponse.json({ 
				error: 'Erreur de vérification des permissions',
				details: 'Impossible de vérifier le rôle utilisateur'
			}, { status: 500 })
		}

		const { id: userId } = await ctx.params
		console.log('🎯 Tentative de réactivation de l\'utilisateur:', userId)
		
		// Valider que l'ID est un UUID valide
		if (!isValidUUID(userId)) {
			console.log('❌ ID utilisateur invalide pour la réactivation:', userId)
			return NextResponse.json({ 
				error: 'ID utilisateur invalide',
				details: 'L\'ID doit être un UUID valide'
			}, { status: 400 })
		}

		try {
			// Approche 1: Essayer d'abord avec supabase.auth.admin (si disponible)
			console.log('🔄 Tentative de réactivation via supabase.auth.admin...')
			const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
				// @ts-ignore banned_until support per GoTrue
				banned_until: null,
			})

			if (!authError) {
				console.log('✅ Réactivation réussie via auth.admin')
				return NextResponse.json({ 
					ok: true, 
					message: 'Utilisateur réactivé avec succès via auth.admin',
					method: 'auth.admin'
				})
			}

			console.log('⚠️ Auth admin method failed, trying alternative approach:', authError.message)
		} catch (authAdminError) {
			console.log('⚠️ Auth admin method not available, using fallback')
		}
		
		// Approche 2: Supprimer la suspension de la table personnalisée
		console.log('🔄 Utilisation de l\'approche alternative (table personnalisée)...')
		
		// Vérifier si la table existe
		const { error: tableCheckError } = await supabase
			.from('user_suspensions')
			.select('*')
			.eq('user_id', userId)
			.limit(1)

		if (tableCheckError) {
			console.log('❌ Erreur lors de la vérification de la table:', tableCheckError)
			
			if (tableCheckError.code === '42P01') {
				console.log('📋 Table user_suspensions n\'existe pas')
				return NextResponse.json({ 
					error: 'Configuration de réactivation non disponible. Table manquante.',
					details: 'Exécutez le script SQL de création de table dans Supabase'
				}, { status: 500 })
			} else {
				return NextResponse.json({ 
					error: 'Erreur de base de données lors de la vérification de la table',
					details: tableCheckError.message
				}, { status: 500 })
			}
		}

		// Supprimer la suspension
		console.log('🗑️ Suppression de la suspension...')
		const { error: deleteError } = await supabase
			.from('user_suspensions')
			.delete()
			.eq('user_id', userId)

		if (deleteError) {
			console.error('❌ Erreur lors de la suppression de la suspension:', deleteError)
			return NextResponse.json({ 
				error: 'Impossible de réactiver l\'utilisateur. Erreur de base de données.',
				details: deleteError.message
			}, { status: 500 })
		}

		console.log('✅ Réactivation réussie via table personnalisée')
		return NextResponse.json({ 
			ok: true, 
			message: 'Utilisateur réactivé avec succès',
			method: 'custom_table'
		})
		
	} catch (error) {
		console.error('💥 Erreur inattendue lors de la réactivation:', error)
		return NextResponse.json({ 
			error: 'Erreur inattendue lors de la réactivation',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}


