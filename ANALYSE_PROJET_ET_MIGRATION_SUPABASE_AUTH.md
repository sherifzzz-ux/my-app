# 📊 ANALYSE COMPLÈTE DU PROJET & MIGRATION VERS SUPABASE AUTHENTICATION

## 🎯 OBJECTIF
Migrer l'authentification actuelle (NextAuth.js) vers **Supabase Authentication** pour l'inscription et la connexion des utilisateurs.

---

## 📐 ARCHITECTURE ACTUELLE

### Structure du Projet
- **Framework**: Next.js 15 avec App Router
- **Base de données**: PostgreSQL (via Supabase)
- **ORM**: Prisma (pour les données métier)
- **Authentification actuelle**: NextAuth.js v5.0 (beta)
- **État global**: Zustand
- **UI**: Shadcn/UI + Tailwind CSS
- **Paiement**: Stripe
- **Upload**: Uploadthing

### Statistiques du Projet
- **104 pages** dans l'application
- **170 composants** React
- **43 fichiers** dans le dossier `lib`
- **9 hooks** personnalisés

---

## 🔐 SYSTÈME D'AUTHENTIFICATION ACTUEL

### Fichiers d'Authentification Identifiés

#### 1. Configuration NextAuth
- **`/lib/auth.ts`** (153 lignes) - Configuration principale NextAuth avec Supabase
- **`/auth-edge.ts`** (38 lignes) - Configuration Edge pour le middleware
- **`/middleware.ts`** - Protection des routes `/admin` et `/account`
- **`/app/api/auth/[...nextauth]/route.ts`** - Handler API NextAuth

#### 2. Pages d'Authentification
- **`/app/auth/page.tsx`** (503 lignes) - Page de connexion/inscription
  - Formulaires de connexion et d'inscription
  - Validation côté client
  - Connexion sociale (Google, Facebook - simulée)
  - **⚠️ ACTUELLEMENT EN MODE SIMULATION** (pas de vraie connexion)

#### 3. Hooks et Utilitaires
- **`/hooks/use-auth.ts`** (107 lignes) - Hook d'authentification
  - Wrapper autour de `useSession` de NextAuth
  - Fonctions `signIn`, `signUp`, `signOut` (actuellement des stubs)
  - Gestion du rôle utilisateur avec Zustand

#### 4. API Routes
- **`/app/api/auth/logout/route.ts`** - Endpoint de déconnexion personnalisé

### Fonctionnalités Actuelles

#### ✅ Implémenté
1. **Architecture dual-runtime** (Node.js + Edge)
2. **Protection des routes** via middleware
3. **Intégration Supabase** (partielle)
   - La connexion via Credentials utilise déjà `supabase.auth.signInWithPassword`
   - Les profils sont stockés dans `profiles` (table Supabase)
4. **OAuth providers** configurés (Google, GitHub)
5. **JWT callbacks** pour synchronisation avec Supabase
6. **Gestion des rôles** (admin, user)

#### ❌ Non Implémenté / En Simulation
1. **Inscription utilisateur** - Actuellement simulée
2. **Connexion réelle** - Formulaire présent mais non fonctionnel
3. **Réinitialisation de mot de passe**
4. **Vérification d'email**
5. **Connexion sociale réelle** (Google, Facebook)

---

## 🗄️ STRUCTURE DE LA BASE DE DONNÉES

### Tables Supabase Actuelles

#### Table `profiles`
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Table `user_roles`
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table `user_suspensions`
```sql
CREATE TABLE user_suspensions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  suspended_until TIMESTAMP NOT NULL,
  suspended_by UUID NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tables Prisma (Données Métier)

Le projet utilise également Prisma pour certaines données :
- **User** (CUID) - Pour compatibilité avec l'ancien système
- **Order**, **OrderItem** - Commandes
- **Product**, **Category**, **Brand** - Catalogue
- **Cart**, **CartItem** - Panier
- **Review** - Avis
- **Address** - Adresses de livraison
- **UserFavorite** - Favoris

**⚠️ PROBLÈME**: Double système de gestion utilisateur (Prisma + Supabase Auth)

---

## 🎯 PLAN DE MIGRATION VERS SUPABASE AUTH

### Phase 1: Préparation et Configuration (2-3h)

#### 1.1 Configurer les variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Garder temporairement pour OAuth
AUTH_SECRET=[random-secret]
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

#### 1.2 Configurer Supabase Auth
Dans le Dashboard Supabase > Authentication > Settings :
- ✅ Enable Email provider
- ✅ Enable Email confirmations (optionnel)
- ✅ Configure OAuth providers (Google, GitHub)
- ✅ Add redirect URLs: `http://localhost:3000`, `https://[domain].vercel.app`
- ✅ Configure email templates

#### 1.3 Créer les fonctions Supabase nécessaires
```sql
-- Fonction pour créer automatiquement un profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW());
  
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (NEW.id, 'user', NOW());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer un profil automatiquement
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Phase 2: Migration des Hooks et Utilitaires (3-4h)

#### 2.1 Créer un nouveau hook `use-supabase-auth.ts`
```typescript
// /hooks/use-supabase-auth.ts
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Récupérer le rôle utilisateur
  useEffect(() => {
    if (user) {
      fetchUserRole(user.id);
    } else {
      setUserRole(null);
    }
  }, [user]);

  const fetchUserRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    setUserRole(data?.role ?? 'user');
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: { firstName?: string; lastName?: string }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata?.firstName,
          last_name: metadata?.lastName,
        },
      },
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    }
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { data, error };
  };

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  };

  return {
    user,
    session,
    loading,
    userRole,
    isAdmin: userRole === 'admin',
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
    updatePassword,
  };
}
```

#### 2.2 Créer un Provider Supabase Auth
```typescript
// /providers/supabase-auth-provider.tsx
'use client';

import { createContext, useContext } from 'react';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';

const SupabaseAuthContext = createContext<ReturnType<typeof useSupabaseAuth> | null>(null);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useSupabaseAuth();

  return (
    <SupabaseAuthContext.Provider value={auth}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within SupabaseAuthProvider');
  }
  return context;
}
```

#### 2.3 Mettre à jour le layout principal
```typescript
// /app/layout.tsx
import { SupabaseAuthProvider } from '@/providers/supabase-auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SupabaseAuthProvider>
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
```

### Phase 3: Mise à Jour de la Page d'Authentification (3-4h)

#### 3.1 Créer les composants d'inscription
```typescript
// /app/auth/components/signup-form.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/supabase-auth-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export function SignupForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Valider les données
      const validatedData = signupSchema.parse(formData);

      // Inscription via Supabase
      const { data, error } = await signUp(
        validatedData.email,
        validatedData.password,
        {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
        }
      );

      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "error",
        });
        return;
      }

      // Mettre à jour le profil avec les informations supplémentaires
      if (data.user) {
        // L'insertion dans profiles se fait automatiquement via le trigger
        // Mais on peut mettre à jour avec plus d'infos
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Erreur mise à jour profil:', profileError);
        }
      }

      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé. Vérifiez votre email pour confirmer votre inscription.",
        variant: "default",
      });

      // Rediriger vers la page de connexion ou le compte
      router.push('/account');

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "error",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'inscription",
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Formulaire d'inscription */}
      {/* ... Champs du formulaire ... */}
    </form>
  );
}
```

#### 3.2 Créer le formulaire de connexion
```typescript
// /app/auth/components/login-form.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/supabase-auth-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export function LoginForm() {
  const { signIn, signInWithOAuth } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = loginSchema.parse(formData);

      const { data, error } = await signIn(
        validatedData.email,
        validatedData.password
      );

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "error",
        });
        return;
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue !",
        variant: "default",
      });

      router.push('/account');

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    const { error } = await signInWithOAuth(provider);
    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Formulaire de connexion */}
      </form>

      <div className="mt-4">
        <button onClick={() => handleOAuthLogin('google')}>
          Connexion avec Google
        </button>
        <button onClick={() => handleOAuthLogin('github')}>
          Connexion avec GitHub
        </button>
      </div>
    </div>
  );
}
```

#### 3.3 Créer la page de callback OAuth
```typescript
// /app/auth/callback/route.ts
import { createServerSupabaseClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Rediriger vers la page d'accueil ou le compte
  return NextResponse.redirect(new URL('/account', request.url));
}
```

### Phase 4: Migration du Middleware (1-2h)

#### 4.1 Créer un nouveau middleware avec Supabase
```typescript
// /middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Protéger les routes admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Vérifier le rôle admin
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roleData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protéger les routes account
  if (pathname.startsWith('/account')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

### Phase 5: Migration des API Routes (2-3h)

#### 5.1 Créer des API helpers pour l'authentification
```typescript
// /lib/auth-helpers.ts
import { createServerSupabaseClient } from '@/lib/supabase';
import { NextRequest } from 'next/server';

export async function getAuthUser(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ?? null;
}

export async function getUserRole(userId: string) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
  return data?.role ?? 'user';
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    throw new Error('Non authentifié');
  }
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request);
  const role = await getUserRole(user.id);
  if (role !== 'admin') {
    throw new Error('Accès non autorisé');
  }
  return user;
}
```

#### 5.2 Mettre à jour les API routes existantes
```typescript
// Exemple: /app/api/account/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const supabase = createServerSupabaseClient();

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 401 }
    );
  }
}
```

### Phase 6: Nettoyage et Tests (2-3h)

#### 6.1 Supprimer NextAuth
```bash
npm uninstall next-auth
```

#### 6.2 Supprimer les fichiers NextAuth obsolètes
- [ ] Supprimer `/lib/auth.ts`
- [ ] Supprimer `/auth-edge.ts`
- [ ] Supprimer `/app/api/auth/[...nextauth]/route.ts`
- [ ] Supprimer `/app/api/auth/logout/route.ts`
- [ ] Renommer `/hooks/use-auth.ts` en `/hooks/use-auth-legacy.ts` (backup)

#### 6.3 Tests à effectuer
- [ ] Inscription d'un nouvel utilisateur
- [ ] Connexion avec email/password
- [ ] Connexion avec Google OAuth
- [ ] Connexion avec GitHub OAuth
- [ ] Déconnexion
- [ ] Réinitialisation de mot de passe
- [ ] Protection des routes `/admin`
- [ ] Protection des routes `/account`
- [ ] Accès aux API protégées

### Phase 7: Migrations des Données (Si nécessaire) (1-2h)

Si des utilisateurs existent déjà dans Prisma `User`:

```sql
-- Script de migration des utilisateurs Prisma vers Supabase Auth
-- À exécuter avec précaution !

-- 1. Créer les utilisateurs dans auth.users
-- 2. Copier les profils dans public.profiles
-- 3. Migrer les relations (orders, addresses, etc.)
```

---

## 🚀 AVANTAGES DE LA MIGRATION

### ✅ Bénéfices
1. **Authentification robuste** - Supabase Auth est battle-tested
2. **Gestion des emails** - Templates personnalisables
3. **OAuth simplifié** - Configuration facilitée
4. **Sécurité renforcée** - RLS (Row Level Security) natif
5. **Moins de code** - Réduction de la complexité
6. **Meilleure DX** - API intuitive et documentée
7. **Pas de JWT manuel** - Géré automatiquement
8. **Refresh tokens** - Rotation automatique

### ⚠️ Points d'Attention
1. **Migration des utilisateurs existants** (si applicable)
2. **Configuration OAuth** (Google, GitHub)
3. **Templates d'emails** à personnaliser
4. **Tests approfondis** requis
5. **Session management** différent

---

## 📋 CHECKLIST DE MIGRATION

### Préparation
- [ ] Configurer Supabase Auth dans le dashboard
- [ ] Ajouter les variables d'environnement
- [ ] Créer les triggers de base de données
- [ ] Configurer les providers OAuth

### Développement
- [ ] Créer le hook `use-supabase-auth.ts`
- [ ] Créer le provider `supabase-auth-provider.tsx`
- [ ] Mettre à jour le layout principal
- [ ] Créer les composants de formulaires (login, signup)
- [ ] Créer la page de callback OAuth
- [ ] Mettre à jour le middleware
- [ ] Créer les helpers d'authentification
- [ ] Mettre à jour les API routes

### Nettoyage
- [ ] Désinstaller NextAuth
- [ ] Supprimer les fichiers NextAuth
- [ ] Mettre à jour les imports dans tout le projet
- [ ] Supprimer les dépendances inutiles

### Tests
- [ ] Tests d'inscription
- [ ] Tests de connexion
- [ ] Tests OAuth
- [ ] Tests de déconnexion
- [ ] Tests de protection de routes
- [ ] Tests des API protégées
- [ ] Tests de réinitialisation de mot de passe

### Déploiement
- [ ] Configurer les variables d'environnement en production
- [ ] Migrer les utilisateurs existants (si applicable)
- [ ] Tester en staging
- [ ] Déployer en production
- [ ] Monitorer les erreurs

---

## 🕐 ESTIMATION DU TEMPS

| Phase | Tâche | Durée estimée |
|-------|-------|---------------|
| 1 | Préparation et configuration | 2-3h |
| 2 | Migration hooks et utilitaires | 3-4h |
| 3 | Mise à jour page auth | 3-4h |
| 4 | Migration middleware | 1-2h |
| 5 | Migration API routes | 2-3h |
| 6 | Nettoyage et tests | 2-3h |
| 7 | Migration données (optionnel) | 1-2h |
| **TOTAL** | | **14-21h** |

---

## 📚 RESSOURCES

### Documentation Supabase
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [OAuth Providers](https://supabase.com/docs/guides/auth/social-login)

### Exemples de Code
- [Next.js + Supabase Auth Example](https://github.com/vercel/next.js/tree/canary/examples/with-supabase)
- [Supabase Auth Helpers](https://github.com/supabase/auth-helpers)

---

## 🎬 PROCHAINES ÉTAPES

1. **Valider le plan de migration** avec l'équipe
2. **Créer une branche de migration** (`feature/supabase-auth-migration`)
3. **Commencer par la Phase 1** (Préparation)
4. **Tester chaque phase** avant de passer à la suivante
5. **Documenter les problèmes** rencontrés
6. **Créer une PR** pour review
7. **Tester en staging** avant production

---

## ⚡ DÉMARRAGE RAPIDE

Pour commencer la migration immédiatement :

```bash
# 1. Créer une branche de migration
git checkout -b feature/supabase-auth-migration

# 2. Installer les dépendances Supabase SSR (si pas déjà fait)
npm install @supabase/ssr

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# 4. Créer le hook use-supabase-auth.ts
# (Voir Phase 2.1)

# 5. Tester localement
npm run dev
```

---

**Date de création**: 2025-10-06  
**Statut**: 📝 Plan prêt à être exécuté  
**Priorité**: 🔴 Haute
