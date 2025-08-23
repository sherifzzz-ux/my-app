"use client";

import { useSession } from 'next-auth/react';
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
    // This would be handled by NextAuth signOut
    setUserRole(null);
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
