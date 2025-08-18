import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { auth } = NextAuth({
	session: { strategy: "jwt" },
	providers: [
		// Ne pas inclure Credentials ici (bcryptjs non supporté en Edge)
		Google,
		GitHub,
	],
	callbacks: {
		// Autorisation côté middleware uniquement (pas d'accès DB nécessaire)
		authorized: async ({ auth, request }) => {
			const isLoggedIn = !!auth?.user;
			const { pathname } = request.nextUrl;

			if (pathname.startsWith("/admin")) return isLoggedIn;
			if (pathname.startsWith("/api/admin")) return isLoggedIn;
			if (pathname.startsWith("/account")) return isLoggedIn;

			return true;
		},
	},
});


