"use client";

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { create } from 'zustand';

interface AuthState {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
  isAdmin: boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
  get isAdmin() {
    return get().userRole === 'admin';
  },
}));

export function useAuth() {
  const { data: session, status } = useSession();
  const { userRole, setUserRole, isAdmin } = useAuthStore();

  const loading = status === 'loading';
  const user = session?.user || null;

  // Mock functions for compatibility with Frontend
  const signIn = async (email: string, password: string) => {
    // This would be handled by NextAuth signIn
    return { error: new Error('Use NextAuth signIn instead') };
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    // This would be handled by your registration API
    return { error: new Error('Use registration API instead') };
  };

  const signOut = async () => {
    try {
      console.log('🔄 Tentative de déconnexion...');
      
      // Essayer d'abord NextAuth si disponible
      try {
        await nextAuthSignOut({ 
          callbackUrl: '/', 
          redirect: true 
        });
        console.log('✅ Déconnexion réussie via NextAuth');
      } catch (nextAuthError) {
        console.log('⚠️ NextAuth signOut échoué, utilisation de la méthode alternative');
        throw nextAuthError; // Continuer vers la méthode alternative
      }
      
      // Effacer le rôle local
      setUserRole(null);
      
    } catch (error) {
      console.log('🔄 Utilisation de la méthode alternative de déconnexion...');
      
      try {
        // Méthode alternative 1 : API de déconnexion côté serveur
        console.log('🔄 Appel de l\'API de déconnexion...');
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
        
        if (response.ok) {
          console.log('✅ API de déconnexion réussie');
        } else {
          console.log('⚠️ API de déconnexion échouée, utilisation de la méthode locale');
        }
        
        // Méthode alternative 2 : effacer les données locales et rediriger
        setUserRole(null);
        
        // Effacer les données de session du localStorage si elles existent
        if (typeof window !== 'undefined') {
          localStorage.removeItem('userRole');
          localStorage.removeItem('adminSession');
          sessionStorage.clear();
        }
        
        // Rediriger vers la page d'accueil
        window.location.href = '/';
        console.log('✅ Déconnexion réussie via méthode alternative');
        
      } catch (fallbackError) {
        console.error('❌ Erreur lors de la déconnexion alternative:', fallbackError);
        // Dernière tentative : recharger la page
        window.location.reload();
      }
    }
  };

  return {
    user,
    session,
    loading,
    userRole,
    isAdmin,
    signIn,
    signUp,
    signOut,
  };
}
