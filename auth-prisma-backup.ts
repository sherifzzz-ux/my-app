import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  // Optionnel: durée de vie du JWT (rotation naturelle via refresh côté client)
  // jwt: { maxAge: 60 * 60 * 24 * 30 },
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
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        // Import dynamique pour éviter de charger bcryptjs dans le runtime Edge (middleware)
        const { compare } = await import('bcryptjs')
        const isValid = await compare(password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name } as any
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Premier login: consolider l'identité DB et enrichir le token
      if (account && (user as any)?.email) {
        const email = (user as any).email as string
        // Relier/creer l'utilisateur en base pour OAuth (password nul)
        const dbUser = await prisma.user.upsert({
          where: { email },
          create: { email, name: (user as any).name ?? null, password: null },
          update: { name: (user as any).name ?? undefined },
        })

        token.userId = dbUser.id
        token.email = dbUser.email
        token.name = dbUser.name ?? undefined
      }

      // Credentials: token.sub existe déjà, on expose une clé userId pour la session
      if (!token.userId && token.sub) {
        token.userId = token.sub
      }

      // Rotation légère sur update de session (ex: changement de nom)
      if (trigger === 'update' && session?.user) {
        token.name = session.user.name ?? token.name
      }

      return token
    },
    async session({ session, token }) {
      // Propager les claims utiles au client
      ;(session as any).user = {
        id: (token as any).userId ?? token.sub ?? null,
        email: token.email ?? null,
        name: token.name ?? null,
      }
      return session
    },
  },
})
