# 🚨 Solution pour le Déploiement Vercel - FlawlessBeauty

## 📋 Diagnostic du Problème

Votre déploiement sur Vercel **échoue** car il manque des **variables d'environnement critiques**, notamment les clés **Uploadthing** qui sont utilisées dans l'application.

### Variables actuellement configurées sur Vercel ✅
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_PAYTECH_IPN_URL`
- `NEXT_PUBLIC_PAYTECH_CANCEL_URL`
- `NEXT_PUBLIC_PAYTECH_SUCCESS_URL`
- `PAYTECH_ENV`
- `PAYTECH_SECRET_KEY`
- `PAYTECH_API_KEY`
- `AUTH_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `DIRECT_URL`
- `DATABASE_URL`

### Variables manquantes critiques ❌

Les variables suivantes sont **OBLIGATOIRES** mais **MANQUANTES** sur votre configuration Vercel :

#### 1. **UPLOADTHING** (CRITIQUE - Cause probable de l'échec)
```bash
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
```
ou alternativement :
```bash
UPLOADTHING_TOKEN="your-token"
```

**Pourquoi c'est critique ?**
- L'application utilise Uploadthing pour l'upload d'images produits
- Le composant `ImageUpload` et les routes API dépendent de ces variables
- Sans ces variables, le build peut échouer ou l'admin ne fonctionnera pas

**Comment les obtenir ?**
1. Allez sur [uploadthing.com](https://uploadthing.com)
2. Créez un compte (gratuit)
3. Créez un nouveau projet
4. Dans le dashboard, allez dans **API Keys**
5. Copiez `UPLOADTHING_SECRET` et `UPLOADTHING_APP_ID`

#### 2. **STRIPE** (Optionnel mais utilisé dans le code)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Note :** Même si vous utilisez PayTech, le code contient des routes Stripe qui lancent des erreurs si les variables ne sont pas définies. Pour éviter les erreurs, ajoutez au moins des valeurs par défaut :
```bash
STRIPE_SECRET_KEY="sk_test_placeholder"
STRIPE_WEBHOOK_SECRET="whsec_placeholder"
```

#### 3. **RESEND** (Optionnel - Pour les emails admin)
```bash
RESEND_API_KEY="re_..."
```

#### 4. **OAUTH** (Optionnel - Si vous voulez la connexion Google/GitHub)
```bash
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

## 🔧 Solution Rapide (Étapes à suivre)

### Étape 1 : Créer un compte Uploadthing (URGENT)

1. **Allez sur** [uploadthing.com](https://uploadthing.com)
2. **Créez un compte** (gratuit, pas de carte bancaire requise)
3. **Créez un nouveau projet** nommé "FlawlessBeauty"
4. **Notez vos clés API** :
   - `UPLOADTHING_SECRET` (commence par `sk_live_...`)
   - `UPLOADTHING_APP_ID`

### Étape 2 : Ajouter les variables sur Vercel

1. **Allez sur votre dashboard Vercel**
2. Sélectionnez votre projet **FlawlessBeauty**
3. Cliquez sur **Settings** → **Environment Variables**
4. **Ajoutez les variables suivantes** :

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `UPLOADTHING_SECRET` | `sk_live_...` (depuis Uploadthing) | Production, Preview, Development |
| `UPLOADTHING_APP_ID` | Votre App ID (depuis Uploadthing) | Production, Preview, Development |
| `STRIPE_SECRET_KEY` | `sk_test_placeholder` | Production, Preview, Development |
| `STRIPE_WEBHOOK_SECRET` | `whsec_placeholder` | Production, Preview, Development |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_placeholder` | Production, Preview, Development |

**IMPORTANT :** Pour chaque variable, cochez **Production**, **Preview**, et **Development** !

### Étape 3 : Redéployer

1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les **3 points** → **Redeploy**
4. Cochez **"Use existing Build Cache"** (optionnel)
5. Cliquez sur **Redeploy**

### Étape 4 : Vérifier

Une fois le déploiement réussi :
1. Allez sur `https://votre-domaine.vercel.app/test-env`
2. Vérifiez que toutes les variables critiques sont configurées (✓ Configuré)
3. Essayez d'accéder à `/admin`

## 📝 Variables minimales pour faire fonctionner l'admin

Si vous voulez **juste faire fonctionner l'admin rapidement**, voici les variables **STRICTEMENT OBLIGATOIRES** :

```bash
# Base de données
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
AUTH_SECRET="votre-secret"
NEXTAUTH_URL="https://votre-domaine.vercel.app"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# Uploadthing (NOUVEAU - CRITIQUE)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"

# Stripe (placeholders pour éviter les erreurs)
STRIPE_SECRET_KEY="sk_test_placeholder"
STRIPE_WEBHOOK_SECRET="whsec_placeholder"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_placeholder"

# PayTech (déjà configuré)
PAYTECH_API_KEY="your-api-key"
PAYTECH_SECRET_KEY="your-secret"
PAYTECH_ENV="test"
NEXT_PUBLIC_PAYTECH_SUCCESS_URL="https://..."
NEXT_PUBLIC_PAYTECH_CANCEL_URL="https://..."
NEXT_PUBLIC_PAYTECH_IPN_URL="https://..."
```

## 🐛 Autres problèmes possibles

### Erreur : "Prisma Client not generated"
**Solution :** Vercel exécute automatiquement `prisma generate` via le script `prebuild` dans `package.json`. Vérifiez que le script existe :
```json
"scripts": {
  "prebuild": "prisma generate"
}
```

### Erreur : "Database connection failed"
**Solution :** Vérifiez que `DATABASE_URL` et `DIRECT_URL` sont corrects et incluent `?sslmode=require`

### L'admin redirige vers la page d'accueil
**Solution :** Vous n'êtes pas authentifié comme admin. Connectez-vous d'abord, puis mettez à jour votre rôle dans Supabase :
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'votre-email@example.com';
```

## 📊 Comment voir les logs d'erreur sur Vercel

1. Dashboard Vercel → **Deployments**
2. Cliquez sur le déploiement qui a échoué
3. Regardez l'onglet **Build Logs**
4. Cherchez les lignes avec `error`, `missing`, ou `failed`
5. Partagez ces logs si le problème persiste

## ✅ Checklist finale

Avant de redéployer, vérifiez que vous avez :

- [ ] Créé un compte Uploadthing
- [ ] Récupéré `UPLOADTHING_SECRET` et `UPLOADTHING_APP_ID`
- [ ] Ajouté ces variables sur Vercel
- [ ] Ajouté les placeholders Stripe
- [ ] Coché **Production, Preview, Development** pour chaque variable
- [ ] Lancé un redéploiement
- [ ] Testé `/test-env` après le déploiement
- [ ] Accédé à `/admin` avec succès

## 🎯 Résumé

**LE PROBLÈME PRINCIPAL :** Variables Uploadthing manquantes

**LA SOLUTION :** 
1. Créer compte Uploadthing (gratuit)
2. Ajouter `UPLOADTHING_SECRET` et `UPLOADTHING_APP_ID` sur Vercel
3. Redéployer

**DURÉE ESTIMÉE :** 5-10 minutes

---

**Besoin d'aide ?** Si le problème persiste après avoir suivi ces étapes, vérifiez les logs de build sur Vercel et partagez le message d'erreur exact.
