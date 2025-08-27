import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServiceSupabaseClient } from '@/lib/supabase'

export const runtime = 'nodejs'

// Fonction pour valider un UUID (version plus permissive)
function isValidUUID(uuid: string): boolean {
	// Regex plus permissive qui accepte les UUID avec des zéros
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	const isValid = uuidRegex.test(uuid);
	console.log(`🔍 Validation UUID: "${uuid}" -> ${isValid ? '✅ Valide' : '❌ Invalide'}`);
	return isValid;
}

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			console.log('❌ Session non autorisée')
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		console.log('🔐 Vérification des permissions pour l\'utilisateur:', session.user.id)
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
			
			console.log('✅ Permissions admin confirmées')
		} catch (roleCheckError) {
			console.error('❌ Erreur lors de la vérification du rôle:', roleCheckError)
			return NextResponse.json({ 
				error: 'Erreur de vérification des permissions',
				details: 'Impossible de vérifier le rôle utilisateur'
			}, { status: 500 })
		}

		const { id: userId } = await ctx.params
		console.log('🎯 ID reçu dans les paramètres:', userId)
		console.log('🔍 Type de l\'ID:', typeof userId)
		console.log('🔍 Longueur de l\'ID:', userId.length)
		
		// Valider que l'ID est un UUID valide
		if (!isValidUUID(userId)) {
			console.log('❌ ID utilisateur invalide:', userId)
			return NextResponse.json({ 
				error: 'ID utilisateur invalide',
				details: `L'ID "${userId}" doit être un UUID valide (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`
			}, { status: 400 })
		}
		
		console.log('🎯 Tentative de suspension de l\'utilisateur:', userId)

		// Approche 1: Essayer d'abord avec supabase.auth.admin (si disponible)
		try {
			console.log('🔄 Tentative avec supabase.auth.admin...')
			const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
				// @ts-ignore banned_until support per GoTrue
				banned_until: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toISOString(),
			})

			if (!authError) {
				console.log('✅ Suspension réussie via auth.admin')
				return NextResponse.json({ 
					ok: true, 
					message: 'Utilisateur suspendu avec succès via auth.admin',
					method: 'auth.admin'
				})
			}

			console.log('⚠️ Auth admin method failed, trying alternative approach:', authError.message)
		} catch (authAdminError) {
			console.log('⚠️ Auth admin method not available, using fallback')
		}
		
		// Approche 2: Créer une table de suspension personnalisée
		console.log('🔄 Utilisation de l\'approche alternative...')
		
		// Vérifier si la table existe
		const { error: tableCheckError } = await supabase
			.from('user_suspensions')
			.select('*')
			.limit(1)

		if (tableCheckError) {
			console.log('❌ Erreur lors de la vérification de la table:', tableCheckError)
			
			if (tableCheckError.code === '42P01') {
				console.log('📋 Table user_suspensions n\'existe pas')
				return NextResponse.json({ 
					error: 'Configuration de suspension non disponible. Table manquante.',
					details: 'Exécutez le script SQL de création de table dans Supabase. Vérifiez que la migration user_suspensions a été appliquée.'
				}, { status: 500 })
			} else {
				return NextResponse.json({ 
					error: 'Erreur de base de données lors de la vérification de la table',
					details: tableCheckError.message
				}, { status: 500 })
			}
		}

		// Insérer ou mettre à jour la suspension
		console.log('💾 Insertion de la suspension...')
		const { error: insertError } = await supabase
			.from('user_suspensions')
			.upsert({
				user_id: userId,
				suspended_until: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toISOString(),
				suspended_by: session.user.id,
				reason: 'Suspension administrative'
			}, {
				onConflict: 'user_id'
			})

		if (insertError) {
			console.error('❌ Erreur lors de l\'insertion de la suspension:', insertError)
			return NextResponse.json({ 
				error: 'Impossible de suspendre l\'utilisateur. Erreur de base de données.',
				details: insertError.message
			}, { status: 500 })
		}

		console.log('✅ Suspension réussie via table personnalisée')
		return NextResponse.json({ 
			ok: true, 
			message: 'Utilisateur suspendu avec succès',
			method: 'custom_table'
		})
		
	} catch (error) {
		console.error('💥 Erreur inattendue lors de la suspension:', error)
		return NextResponse.json({ 
			error: 'Erreur inattendue lors de la suspension',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 })
	}
}


