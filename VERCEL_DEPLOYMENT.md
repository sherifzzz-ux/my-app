# 🚀 Guide de déploiement Vercel - FlawlessBeauty

Ce guide vous accompagne pas à pas pour déployer votre application e-commerce sur Vercel.

## 📋 Pré-requis

- [ ] Compte Vercel (gratuit : https://vercel.com/signup)
- [ ] Repository GitHub avec le code
- [ ] Base de données PostgreSQL (recommandé : Supabase, Neon, ou Railway)
- [ ] Comptes configurés pour les services externes (PayTech, Uploadthing, Resend)

## 🔧 Étape 1 : Préparer la base de données

### Option A : Supabase (Recommandé)

1. Créer un projet sur https://supabase.com
2. Récupérer l'URL de connexion PostgreSQL :
   - Settings > Database > Connection String (URI)
   - Format : `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`
3. Copier cette URL pour la variable `DATABASE_URL`

### Option B : Neon

1. Créer un projet sur https://neon.tech
2. Copier la connection string PostgreSQL
3. L'utiliser pour `DATABASE_URL`

### Option C : Railway

1. Créer un projet sur https://railway.app
2. Ajouter un service PostgreSQL
3. Copier la `DATABASE_URL` depuis les variables

## 🔐 Étape 2 : Configurer les services externes

### PayTech (Paiements locaux Sénégal)

1. Inscription : https://paytech.sn
2. Récupérer :
   - API Key
   - API Secret
3. Configurer le webhook :
   - URL : `https://votre-domaine.vercel.app/api/checkout/paytech-webhook`
   - Événements : Tous

### Uploadthing (Upload d'images)

1. Créer un compte : https://uploadthing.com
2. Créer une nouvelle application
3. Récupérer :
   - Secret
   - App ID

### Resend (Emails)

1. Créer un compte : https://resend.com
2. Générer une API Key
3. Configurer le domaine d'envoi (optionnel)

### NextAuth (Authentification sociale)

#### Google OAuth
1. Console Google Cloud : https://console.cloud.google.com
2. Créer un projet
3. APIs & Services > Credentials
4. Create OAuth 2.0 Client ID
5. Authorized redirect URIs : `https://votre-domaine.vercel.app/api/auth/callback/google`

#### GitHub OAuth
1. GitHub Settings > Developer settings > OAuth Apps
2. New OAuth App
3. Authorization callback URL : `https://votre-domaine.vercel.app/api/auth/callback/github`

## 🚀 Étape 3 : Déployer sur Vercel

### Via l'interface web

1. **Connecter le repository**
   - Aller sur https://vercel.com/new
   - Importer votre repository GitHub
   - Sélectionner le repository FlawlessBeauty

2. **Configurer le projet**
   - Framework Preset : Next.js (détecté automatiquement)
   - Root Directory : `.` (racine)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)

3. **Ajouter les variables d'environnement**
   
   Dans la section "Environment Variables", ajouter :

   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_URL=https://votre-domaine.vercel.app
   NEXTAUTH_SECRET=votre-secret-genere
   PAYTECH_API_KEY=...
   PAYTECH_API_SECRET=...
   PAYTECH_ENV=test
   UPLOADTHING_SECRET=...
   UPLOADTHING_APP_ID=...
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   RESEND_API_KEY=...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GITHUB_ID=...
   GITHUB_SECRET=...
   ```

   **Important :** Toutes les variables sont nécessaires pour les environnements :
   - ✅ Production
   - ✅ Preview
   - ⚠️ Development (optionnel)

4. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre la fin du build (2-5 minutes)
   - Vérifier les logs en cas d'erreur

### Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer (depuis la racine du projet)
vercel

# Pour la production
vercel --prod
```

## 🔍 Étape 4 : Vérifications post-déploiement

### Checklist de vérification

- [ ] **Page d'accueil** : `https://votre-domaine.vercel.app`
  - ✅ S'affiche correctement
  - ✅ Images chargées
  - ✅ Navigation fonctionnelle

- [ ] **Base de données**
  - ✅ Connexion établie
  - ✅ Tables créées (Prisma migrate)
  - ✅ Données de seed si nécessaire

- [ ] **Authentification**
  - ✅ Connexion email/password
  - ✅ OAuth Google
  - ✅ OAuth GitHub
  - ✅ Création de compte

- [ ] **Produits**
  - ✅ Listing des produits
  - ✅ Détails d'un produit
  - ✅ Ajout au panier
  - ✅ Images des produits

- [ ] **Panier**
  - ✅ Ajout/suppression d'articles
  - ✅ Mise à jour des quantités
  - ✅ Calcul des totaux

- [ ] **Checkout**
  - ✅ Formulaire de livraison
  - ✅ Méthodes de paiement affichées
  - ✅ Redirection vers PayTech
  - ✅ Page de succès
  - ✅ Page d'annulation

- [ ] **Administration**
  - ✅ Accès au dashboard `/admin`
  - ✅ Gestion des produits
  - ✅ Gestion des commandes
  - ✅ Upload d'images

## 🐛 Résolution des problèmes courants

### Build échoue

**Erreur : "Failed to compile"**
```
Solution : Vérifier que les fichiers suivants sont présents :
- next.config.ts (avec eslint.ignoreDuringBuilds)
- .eslintrc.json
```

**Erreur : "Prisma Client not found"**
```
Solution : Vérifier que le script prebuild est présent dans package.json :
"prebuild": "prisma generate"
```

### Runtime errors

**Erreur : "DATABASE_URL not defined"**
```
Solution : Ajouter DATABASE_URL dans Vercel Environment Variables
```

**Erreur : "Invalid NEXTAUTH_URL"**
```
Solution : S'assurer que NEXTAUTH_URL pointe vers le domaine Vercel :
https://votre-domaine.vercel.app
```

**Erreur : "NEXTAUTH_SECRET not defined"**
```
Solution : Générer un secret avec :
openssl rand -base64 32

Puis l'ajouter dans Vercel Environment Variables
```

### Problèmes de paiement

**PayTech ne fonctionne pas**
```
Solution :
1. Vérifier PAYTECH_API_KEY et PAYTECH_API_SECRET
2. Vérifier que le webhook est configuré
3. Tester avec PAYTECH_ENV=test d'abord
```

### Problèmes d'upload

**Les images ne s'uploadent pas**
```
Solution :
1. Vérifier UPLOADTHING_SECRET et UPLOADTHING_APP_ID
2. Vérifier les CORS dans Uploadthing dashboard
3. Vérifier la limite de taille des fichiers
```

## 🔄 Mise à jour du déploiement

### Déploiement automatique

Par défaut, Vercel redéploie automatiquement à chaque push sur la branche principale (main/master).

### Déploiement manuel

```bash
# Depuis le terminal
vercel --prod

# Ou via l'interface Vercel
# Project > Deployments > Redeploy
```

### Rollback

1. Aller dans Vercel Dashboard
2. Project > Deployments
3. Trouver le déploiement précédent
4. Cliquer sur "..." > "Promote to Production"

## 📊 Monitoring

### Logs

- **Build logs** : Vercel Dashboard > Project > Deployments > [Deployment] > Build Logs
- **Runtime logs** : Vercel Dashboard > Project > Logs
- **Analytics** : Vercel Dashboard > Project > Analytics

### Performance

- **Web Vitals** : Vercel Analytics (gratuit)
- **Speed Insights** : Activer dans Project Settings

## 🔒 Sécurité

### Bonnes pratiques

- ✅ Utiliser HTTPS uniquement (Vercel le fait par défaut)
- ✅ Secrets dans Environment Variables, jamais dans le code
- ✅ Rotation régulière des secrets (NEXTAUTH_SECRET, API keys)
- ✅ Limiter les permissions des clés API
- ✅ Activer 2FA sur les comptes Vercel et GitHub

### Variables sensibles

Ne JAMAIS committer :
- ❌ .env.local
- ❌ .env.production
- ❌ Clés API
- ❌ Secrets

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma avec Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

## 🆘 Support

En cas de problème :
1. Consulter les logs Vercel
2. Vérifier les variables d'environnement
3. Tester localement avec les mêmes variables
4. Consulter la documentation officielle
5. Créer une issue sur GitHub

---

**Dernière mise à jour :** 2025-10-12
