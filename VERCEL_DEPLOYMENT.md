# 🚀 Guide de Déploiement Vercel - FlawlessBeauty

## 🔍 Diagnostic du Problème

Votre déploiement échoue sur Vercel probablement à cause des **variables d'environnement manquantes**. Le build passe localement mais échoue sur Vercel car les secrets ne sont pas configurés.

## ✅ Variables d'Environnement OBLIGATOIRES

### 1. Base de Données (CRITIQUE)
```bash
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```
**Où le trouver :** Votre dashboard Neon ou autre fournisseur PostgreSQL

### 2. NextAuth (CRITIQUE)
```bash
AUTH_URL="https://votre-domaine.vercel.app"
AUTH_SECRET="genere-avec-openssl-rand-base64-32"
```
**Comment générer AUTH_SECRET :**
```bash
openssl rand -base64 32
```

### 3. Supabase (CRITIQUE pour l'Admin)
```bash
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbG..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbG..."
```
**Où le trouver :** Dashboard Supabase → Settings → API

### 4. Stripe (pour les paiements)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```
**Où le trouver :** Dashboard Stripe → Developers → API Keys

### 5. PayTech (paiements Mobile Money)
```bash
PAYTECH_API_KEY="votre-api-key"
PAYTECH_API_SECRET="votre-api-secret"
PAYTECH_ENV="production"
PAYTECH_SUCCESS_URL="https://votre-domaine.vercel.app/checkout/success"
PAYTECH_CANCEL_URL="https://votre-domaine.vercel.app/checkout"
PAYTECH_IPN_URL="https://votre-domaine.vercel.app/api/paytech/webhook"
```
**Où le trouver :** Dashboard PayTech

### 6. Uploadthing (optionnel)
```bash
UPLOADTHING_TOKEN="votre-token"
UPLOADTHING_SECRET="votre-secret"
```
**Où le trouver :** Dashboard Uploadthing

### 7. Resend (emails - optionnel)
```bash
RESEND_API_KEY="re_..."
```
**Où le trouver :** Dashboard Resend

## 📝 Étapes de Configuration sur Vercel

### Étape 1 : Accéder aux Settings
1. Allez sur votre projet Vercel
2. Cliquez sur l'onglet **Settings**
3. Dans le menu latéral, cliquez sur **Environment Variables**

### Étape 2 : Ajouter les Variables
Pour chaque variable ci-dessus :
1. Cliquez sur **Add New**
2. **Key** : Nom de la variable (ex: `DATABASE_URL`)
3. **Value** : Valeur de la variable
4. **Environments** : Cochez `Production`, `Preview`, et `Development`
5. Cliquez sur **Save**

### Étape 3 : Redéployer
Après avoir ajouté toutes les variables :
1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les 3 points → **Redeploy**
4. Cochez "Use existing Build Cache" (optionnel)
5. Cliquez sur **Redeploy**

## 🔧 Variables Minimales pour Faire Fonctionner l'Admin

Si vous voulez juste que l'interface admin fonctionne rapidement, configurez AU MINIMUM :

```bash
# Base de données
DATABASE_URL="postgresql://..."

# Auth
AUTH_URL="https://votre-domaine.vercel.app"
AUTH_SECRET="votre-secret-genere"

# Supabase (pour l'authentification admin)
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
```

## 🐛 Dépannage

### Erreur : "Deployment has failed"
**Cause :** Variables d'environnement manquantes
**Solution :** Ajoutez toutes les variables OBLIGATOIRES ci-dessus

### Erreur : "Database connection failed"
**Cause :** `DATABASE_URL` invalide ou manquant
**Solution :** Vérifiez que votre URL de base de données est correcte et inclut `?sslmode=require`

### Erreur : "Supabase client error"
**Cause :** Variables Supabase manquantes
**Solution :** Ajoutez `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, et `SUPABASE_SERVICE_ROLE_KEY`

### L'admin redirige vers la page d'accueil
**Cause :** Vous n'êtes pas authentifié comme admin
**Solution :** 
1. Connectez-vous d'abord sur le site
2. Dans votre base de données Supabase, exécutez :
   ```sql
   -- Mettre à jour le rôle de votre utilisateur
   UPDATE profiles 
   SET role = 'admin' 
   WHERE email = 'votre-email@example.com';
   ```

## 📊 Vérifier les Logs

Si le déploiement échoue encore :
1. Allez dans **Deployments**
2. Cliquez sur le déploiement qui a échoué
3. Regardez les logs dans l'onglet **Build Logs**
4. Cherchez les lignes avec "error" ou "missing"

## 🎯 Checklist Finale

- [ ] `DATABASE_URL` configuré
- [ ] `AUTH_URL` configuré avec le bon domaine Vercel
- [ ] `AUTH_SECRET` généré et configuré
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configuré
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configuré
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configuré
- [ ] Toutes les variables marquées pour `Production`, `Preview`, et `Development`
- [ ] Redéploiement lancé

## 💡 Astuce

Pour tester rapidement si vos variables sont bien configurées, ajoutez une page de test :

```typescript
// app/test-env/page.tsx
export default function TestEnv() {
  const vars = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    AUTH_URL: !!process.env.AUTH_URL,
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
  
  return (
    <div className="p-8">
      <h1>Test Variables d'Environnement</h1>
      <pre>{JSON.stringify(vars, null, 2)}</pre>
    </div>
  )
}
```

Visitez `/test-env` sur votre déploiement Vercel pour voir quelles variables sont manquantes (les valeurs `false` indiquent une variable manquante).

---

**Besoin d'aide ?** Si le problème persiste après avoir suivi ce guide, vérifiez les logs de build sur Vercel et partagez le message d'erreur exact.
