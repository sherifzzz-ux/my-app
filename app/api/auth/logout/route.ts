import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
	try {
		console.log('🔄 Déconnexion demandée via API...');
		
		// Créer une réponse de succès
		const response = NextResponse.json({ 
			success: true, 
			message: 'Déconnexion réussie' 
		});
		
		// Effacer les cookies spécifiques d'authentification
		response.cookies.delete('next-auth.session-token');
		response.cookies.delete('next-auth.csrf-token');
		response.cookies.delete('next-auth.callback-url');
		response.cookies.delete('__Secure-next-auth.session-token');
		response.cookies.delete('__Secure-next-auth.csrf-token');
		response.cookies.delete('__Secure-next-auth.callback-url');
		
		// Effacer les cookies de session Supabase si ils existent
		response.cookies.delete('sb-access-token');
		response.cookies.delete('sb-refresh-token');
		response.cookies.delete('supabase-auth-token');
		
		// Effacer les cookies de session génériques
		response.cookies.delete('session');
		response.cookies.delete('auth');
		response.cookies.delete('token');
		
		console.log('✅ Cookies d\'authentification effacés avec succès');
		
		return response;
		
	} catch (error) {
		console.error('❌ Erreur lors de la déconnexion:', error);
		return NextResponse.json({ 
			success: false, 
			error: 'Erreur lors de la déconnexion' 
		}, { status: 500 });
	}
}
