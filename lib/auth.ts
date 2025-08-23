import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { createServerSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

// Client Supabase pour les opérations serveur
const serverSupabase = createServerSupabaseClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data
        
        // Authentification via Supabase Auth
        const { data, error } = await serverSupabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error || !data.user) return null

        // Récupérer le profil utilisateur
        const { data: profile } = await serverSupabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        return {
          id: data.user.id,
          email: data.user.email!,
          name: profile ? `${profile.first_name} ${profile.last_name}`.trim() : data.user.email,
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Premier login: synchroniser avec Supabase Auth
      if (account && user?.email) {
        // Pour OAuth, créer/mettre à jour le profil utilisateur
        if (account.provider !== 'credentials') {
          // Vérifier si l'utilisateur existe dans Supabase Auth (fallback par listage)
          let supabaseUserId: string | undefined
          const emailStr = String(user.email)
          const { data: list } = await serverSupabase.auth.admin.listUsers()
          const found = list?.users?.find((u) => (u.email ?? '').toLowerCase() === emailStr.toLowerCase())
          supabaseUserId = found?.id

          // Si l'utilisateur n'existe pas, créer via OAuth
          if (!supabaseUserId) {
            const { data: newUser } = await serverSupabase.auth.admin.createUser({
              email: user.email,
              email_confirm: true,
              user_metadata: {
                provider: account.provider,
                name: user.name,
              }
            })
            supabaseUserId = newUser?.user?.id
          }

          if (supabaseUserId) {
            // Mettre à jour/créer le profil
            const [firstName, ...lastNameParts] = (user.name || '').split(' ')
            await serverSupabase
              .from('profiles')
              .upsert({
                id: supabaseUserId,
                first_name: firstName || null,
                last_name: lastNameParts.join(' ') || null,
                updated_at: new Date().toISOString(),
              })
              .select()

            token.userId = supabaseUserId
          }
        }

        token.userId = token.userId || user.id
        token.email = user.email
        token.name = user.name
      }

      // Credentials: token.sub existe déjà
      if (!token.userId && token.sub) {
        token.userId = token.sub
      }

      // Rotation légère sur update de session
      if (trigger === 'update' && session?.user) {
        token.name = session.user.name ?? token.name
        
        // Mettre à jour le profil Supabase si nécessaire
        if (token.userId && session.user.name) {
          const [firstName, ...lastNameParts] = session.user.name.split(' ')
          await serverSupabase
            .from('profiles')
            .update({
              first_name: firstName,
              last_name: lastNameParts.join(' ') || null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', token.userId as string)
        }
      }

      return token
    },
    async session({ session, token }) {
      // Propager les claims utiles au client sans perdre les champs AdapterUser (ex: emailVerified)
      if (session.user) {
        session.user.id = String((token.userId as string) ?? token.sub ?? '')
        if (token.email) session.user.email = token.email as string
        if (token.name) session.user.name = token.name as string
      }
      return session
    },
    // Autorisation côté middleware
    authorized: async ({ auth, request }) => {
      const isLoggedIn = !!auth?.user
      const { pathname } = request.nextUrl

      // Zones protégées
      if (pathname.startsWith('/admin')) return isLoggedIn
      if (pathname.startsWith('/api/admin')) return isLoggedIn
      if (pathname.startsWith('/account')) return isLoggedIn

      return true
    },
  },
})
