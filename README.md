Ce projet est une application [Next.js](https://nextjs.org) utilisant Prisma, Auth.js (NextAuth v5), Tailwind v4, et Zustand.

## Installation

1) Copier et remplir les variables d'environnement

```bash
cp env.example .env
```

2) Installer les dépendances

```bash
npm install
```

3) Générer le client Prisma et appliquer les migrations

```bash
npm run db:generate
npm run db:migrate
```

4) (Optionnel) Peupler la base de données

```bash
npm run db:seed
```

5) Lancer le serveur de développement

```bash
npm run dev
```

Accéder à `http://localhost:3000`.

## Authentification

- Credentials (email/mot de passe) disponible côté runtime Node via `app/api/auth/[...nextauth]/route.ts`.
- OAuth Google/GitHub activés côté Node et Edge (middleware) via `auth.ts` et `auth-edge.ts`.
- Le middleware protège `"/admin/*"`, `"/api/admin/*"` et `"/account/*"`.

Variables requises: voir `env.example`.
