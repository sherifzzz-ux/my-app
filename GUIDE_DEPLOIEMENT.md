# 🚀 GUIDE DE DÉPLOIEMENT - FLAWLESSBEAUTY

**Version:** 1.0  
**Date:** 2025-10-06  
**Environnement cible:** Production (Vercel + PostgreSQL)

---

## 📋 PRÉ-REQUIS

### Comptes Requis
- [ ] Compte Vercel (https://vercel.com)
- [ ] Base de données PostgreSQL (Supabase/Neon/Vercel Postgres)
- [ ] Compte Stripe (https://stripe.com)
- [ ] Compte Uploadthing (https://uploadthing.com)
- [ ] Compte Resend (https://resend.com) pour emails
- [ ] (Optionnel) Compte Google Cloud (OAuth)
- [ ] (Optionnel) Compte GitHub (OAuth)

### Outils Locaux
- Node.js 18+ installé
- Git installé
- Prisma CLI (`npm install -g prisma`)
- Stripe CLI (pour tester webhooks)

---

## 🔧 ÉTAPE 1 : CONFIGURATION LOCALE

### 1.1 Cloner le Projet
```bash
git clone <repository-url>
cd workspace
npm install
```

### 1.2 Configurer Variables d'Environnement
```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer .env avec vos vraies valeurs
nano .env
```

**Variables critiques à remplir :**
```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
AUTH_SECRET="<générer avec: openssl rand -base64 32>"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."

# Uploadthing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# Resend
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@votredomaine.com"
```

### 1.3 Initialiser la Base de Données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# (Optionnel) Seed avec données de test
npm run db:seed
```

### 1.4 Tester en Local
```bash
# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
# Tester :
# - Connexion/inscription
# - Navigation catalogue
# - Ajout au panier
# - Checkout (mode test Stripe)
```

---

## 🌐 ÉTAPE 2 : DÉPLOIEMENT VERCEL

### 2.1 Préparer le Projet

#### Vérifier le Build
```bash
# Clean build
rm -rf .next
npm run build

# Tester en production locale
npm run start
```

#### Vérifier les Fichiers Critiques
- [ ] `vercel.json` existe et est configuré
- [ ] `.gitignore` contient `.env*`
- [ ] `package.json` a les bons scripts
- [ ] `next.config.ts` est configuré
- [ ] `middleware.ts` est présent

### 2.2 Créer Projet Vercel

#### Option A : Via Interface Web
1. Aller sur https://vercel.com/new
2. Importer le repository Git
3. Configurer le projet :
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Option B : Via CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel
```

### 2.3 Configurer Variables d'Environnement Vercel

**Via Dashboard Vercel :**
1. Aller dans **Project Settings** → **Environment Variables**
2. Ajouter TOUTES les variables de `.env` :

**Variables Production (Critical) :**
```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Auth
AUTH_SECRET=<votre-secret-32-chars>
NEXTAUTH_URL=https://votredomaine.com
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...

# Stripe (MODE LIVE!)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Uploadthing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# Resend
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@votredomaine.com

# App
NEXT_PUBLIC_APP_URL=https://votredomaine.com
NODE_ENV=production
```

**Important :** Pour chaque variable :
- Sélectionner environnements : **Production**, **Preview**, **Development**
- Ou séparer les valeurs test/prod selon environnement

### 2.4 Configurer le Domaine

1. **Ajouter le domaine :**
   - Project Settings → Domains
   - Ajouter `votredomaine.com` et `www.votredomaine.com`

2. **Configurer DNS :**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Attendre propagation DNS** (5-30 min)

4. **Vérifier SSL** (automatique avec Vercel)

---

## 🗄️ ÉTAPE 3 : BASE DE DONNÉES PRODUCTION

### Option A : Supabase (Recommandé)

#### 3.1 Créer Projet Supabase
```bash
# 1. Aller sur https://supabase.com
# 2. Créer nouveau projet
# 3. Choisir région (Europe pour RGPD)
# 4. Noter les credentials
```

#### 3.2 Configurer Prisma pour Supabase
```bash
# Dans .env production (Vercel)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

#### 3.3 Migrer le Schéma
```bash
# En local, connecté à Supabase prod
npx prisma migrate deploy

# Vérifier
npx prisma studio
```

### Option B : Neon

#### 3.1 Créer Projet Neon
```bash
# 1. Aller sur https://neon.tech
# 2. Créer nouveau projet
# 3. Noter connection string
```

#### 3.2 Configuration
```bash
DATABASE_URL="postgresql://user:pass@ep-xyz.region.neon.tech/dbname?sslmode=require"
```

### Option C : Vercel Postgres

#### 3.1 Créer Database
```bash
# Dans Vercel dashboard
# Storage → Create Database → Postgres
```

#### 3.2 Connecter au Projet
```bash
# Les variables sont auto-ajoutées
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
```

---

## 💳 ÉTAPE 4 : CONFIGURATION STRIPE

### 4.1 Passer en Mode Live

1. **Activer mode Live :**
   - Dashboard Stripe → Toggle "Test mode" OFF
   - Compléter activation compte (KYC, bank account)

2. **Obtenir clés LIVE :**
   ```bash
   # Developers → API Keys
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
   ```

3. **Mettre à jour Vercel env vars** avec clés LIVE

### 4.2 Configurer Webhook Production

1. **Créer webhook :**
   - Dashboard Stripe → Developers → Webhooks
   - Add endpoint
   - URL: `https://votredomaine.com/api/checkout/webhook`

2. **Événements à écouter :**
   ```
   checkout.session.completed
   payment_intent.succeeded
   payment_intent.payment_failed
   charge.refunded
   ```

3. **Récupérer signing secret :**
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **Ajouter dans Vercel env vars**

### 4.3 Tester Webhook

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks vers production
stripe listen --forward-to https://votredomaine.com/api/checkout/webhook

# Tester un paiement
stripe trigger checkout.session.completed
```

---

## 📧 ÉTAPE 5 : EMAILS RESEND

### 5.1 Configurer Domaine

1. **Ajouter domaine :**
   - Dashboard Resend → Domains → Add Domain
   - Entrer `votredomaine.com`

2. **Configurer DNS :**
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [fourni par Resend]
   
   Type: TXT
   Name: @
   Value: v=spf1 include:resend.com ~all
   ```

3. **Vérifier domaine** (attendre 24h max)

### 5.2 Créer API Key

```bash
# API Keys → Create
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@votredomaine.com
```

### 5.3 Tester Emails

```bash
# Créer un test email en local
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@votredomaine.com",
    "to": "votre@email.com",
    "subject": "Test FlawlessBeauty",
    "html": "<p>Email test</p>"
  }'
```

---

## 🔐 ÉTAPE 6 : SÉCURITÉ PRODUCTION

### 6.1 Vérifier Headers Sécurité

Dans `next.config.ts` :
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}
```

### 6.2 Activer Rate Limiting

Créer `/lib/rate-limit.ts` :
```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})
```

### 6.3 Audit Sécurité

```bash
# Vérifier vulnérabilités npm
npm audit

# Corriger automatiquement
npm audit fix

# Scan Snyk
npx snyk test
```

---

## 📊 ÉTAPE 7 : MONITORING & ANALYTICS

### 7.1 Vercel Analytics

```bash
# Activer dans Vercel dashboard
# Analytics → Enable

# Ajouter dans layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 7.2 Google Analytics 4

```bash
# 1. Créer propriété GA4
# 2. Obtenir Measurement ID: G-XXXXXXXXXX

# 3. Ajouter dans Vercel env vars
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 4. Installer package
npm install @next/third-parties
```

### 7.3 Sentry (Error Tracking)

```bash
# 1. Créer projet Sentry
# 2. Installer
npm install @sentry/nextjs

# 3. Configurer
npx @sentry/wizard@latest -i nextjs

# 4. Ajouter DSN dans env vars
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## ✅ ÉTAPE 8 : VÉRIFICATIONS POST-DÉPLOIEMENT

### 8.1 Checklist Fonctionnelle

**Tester en production :**
- [ ] Homepage charge sans erreur
- [ ] Navigation toutes les pages
- [ ] Catalogue produits affiche
- [ ] Recherche fonctionne
- [ ] Connexion/Inscription OK
- [ ] OAuth Google/GitHub OK
- [ ] Ajout au panier fonctionne
- [ ] Checkout Stripe fonctionne
- [ ] Paiement test réussi
- [ ] Email confirmation reçu
- [ ] Commande visible dans admin
- [ ] Upload image admin OK
- [ ] Dashboard admin charge

### 8.2 Tests Performance

```bash
# Lighthouse audit
npx lighthouse https://votredomaine.com --view

# Cibles :
# Performance: > 85
# Accessibility: > 90
# Best Practices: > 90
# SEO: > 90
```

### 8.3 Tests Sécurité

```bash
# SSL Labs
https://www.ssllabs.com/ssltest/analyze.html?d=votredomaine.com

# Security Headers
https://securityheaders.com/?q=votredomaine.com

# OWASP ZAP scan
zap-cli quick-scan https://votredomaine.com
```

### 8.4 Tests SEO

- [ ] Sitemap accessible : `/sitemap.xml`
- [ ] Robots.txt accessible : `/robots.txt`
- [ ] Meta tags présents sur toutes les pages
- [ ] Open Graph tags OK
- [ ] Schema.org markup présent
- [ ] Mobile-friendly (Google test)

---

## 🔄 ÉTAPE 9 : CI/CD (Optionnel mais Recommandé)

### 9.1 GitHub Actions

Créer `.github/workflows/ci.yml` :
```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test # si tests implémentés

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 9.2 Environnements Multiples

**Développement :**
```bash
# Branch: develop
# URL: https://develop.votredomaine.com
# Env: development
```

**Staging :**
```bash
# Branch: staging
# URL: https://staging.votredomaine.com
# Env: staging
```

**Production :**
```bash
# Branch: main
# URL: https://votredomaine.com
# Env: production
```

---

## 🆘 ÉTAPE 10 : PLAN DE ROLLBACK

### 10.1 Backup Base de Données

```bash
# Backup automatique quotidien (Supabase)
# Ou backup manuel :
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restaurer :
psql $DATABASE_URL < backup-20250106.sql
```

### 10.2 Rollback Vercel

```bash
# Via Dashboard :
# Deployments → Previous deployment → Promote to Production

# Via CLI :
vercel rollback
```

### 10.3 Rollback Database

```bash
# Si migration problématique :
npx prisma migrate resolve --rolled-back <migration-name>

# Restaurer backup :
psql $DATABASE_URL < backup-before-migration.sql
```

---

## 📞 CONTACTS & SUPPORT

### Support Services
- **Vercel Support :** https://vercel.com/support
- **Stripe Support :** https://support.stripe.com
- **Supabase Discord :** https://discord.supabase.com
- **Resend Support :** support@resend.com

### Documentation
- **Next.js :** https://nextjs.org/docs
- **Prisma :** https://www.prisma.io/docs
- **Stripe :** https://stripe.com/docs
- **Vercel :** https://vercel.com/docs

---

## 🎯 CHECKLIST FINALE DÉPLOIEMENT

### Avant de lancer en production :

**Configuration :**
- [ ] Variables d'environnement PROD configurées
- [ ] Base de données migrée
- [ ] Stripe en mode LIVE
- [ ] Webhooks Stripe configurés
- [ ] Domaine DNS configuré
- [ ] SSL activé
- [ ] Emails Resend configurés et testés

**Code :**
- [ ] Build production sans erreurs
- [ ] Tous les tests passent
- [ ] Aucun console.log en production
- [ ] Code review effectué

**Sécurité :**
- [ ] Headers sécurité configurés
- [ ] Rate limiting activé
- [ ] Audit sécurité passé
- [ ] Backups configurés

**Monitoring :**
- [ ] Analytics configurées
- [ ] Error tracking (Sentry) configuré
- [ ] Alertes configurées
- [ ] Uptime monitoring actif

**Legal :**
- [ ] Politique de confidentialité publiée
- [ ] Conditions d'utilisation publiées
- [ ] Mentions légales publiées
- [ ] Politique cookies publiée

**Tests :**
- [ ] Parcours utilisateur testés
- [ ] Paiement test réussi
- [ ] Emails fonctionnels
- [ ] Performance > 85 (Lighthouse)
- [ ] SEO vérifié

### Après le lancement :

**Jour 1 :**
- [ ] Monitoring 24h actif
- [ ] Vérifier logs erreurs
- [ ] Tester paiement réel
- [ ] Vérifier emails production

**Semaine 1 :**
- [ ] Analyser métriques (GA, Vercel)
- [ ] Optimiser selon retours utilisateurs
- [ ] Corriger bugs critiques
- [ ] Backup DB quotidien vérifié

**Mois 1 :**
- [ ] Analyse performances
- [ ] Optimisations SEO continues
- [ ] Fonctionnalités feedback utilisateurs
- [ ] Plan de maintenance établi

---

**Guide créé le :** 2025-10-06  
**Version :** 1.0  
**Auteur :** FlawlessBeauty Team  
**Status :** Ready for Production Deployment
