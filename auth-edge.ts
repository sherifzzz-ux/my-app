import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    // Ne pas inclure Credentials ici (bcryptjs non supporté en Edge)
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Premier login: synchroniser avec Supabase Auth
      if (account && user?.email) {
        token.userId = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = String(token.userId ?? token.sub ?? '')
        if (token.email) session.user.email = token.email as string
        if (token.name) session.user.name = token.name as string
      }
      return session
    },
  },
})
