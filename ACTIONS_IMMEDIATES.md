# ⚡ ACTIONS IMMÉDIATES - FLAWLESSBEAUTY

**Date :** 2025-10-06  
**Priorité :** 🔴 CRITIQUE  
**Objectif :** Site déployable en 5 jours

---

## 🎯 OBJECTIF SEMAINE

**Avoir un site 100% fonctionnel en staging d'ici vendredi**

### Résultat attendu :
- ✅ Site accessible sur domaine staging
- ✅ Toutes les fonctionnalités testées
- ✅ Prêt pour déploiement production

---

## 📅 PLANNING JOUR PAR JOUR

### 🔴 JOUR 1 (AUJOURD'HUI) - Configuration Environnement

#### Matin (3-4h)

**1. Créer et configurer le fichier `.env`**
```bash
# À la racine du projet
cp .env.example .env
nano .env
```

**Variables OBLIGATOIRES à remplir :**
```bash
# 1. BASE DE DONNÉES (Priorité #1)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# 2. AUTHENTIFICATION
AUTH_SECRET="<générer: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"

# 3. STRIPE (Mode Test)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."

# 4. UPLOADTHING
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# 5. RESEND (Emails)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@votredomaine.com"
```

**Services à créer (30 min chacun) :**

1. **Uploadthing** (30 min)
   - Aller sur https://uploadthing.com
   - Sign up / Login
   - Create new app
   - Copier `UPLOADTHING_SECRET` et `UPLOADTHING_APP_ID`
   - Coller dans `.env`

2. **Stripe Test** (30 min)
   - Aller sur https://dashboard.stripe.com
   - Mode "Test data" activé
   - Developers → API Keys
   - Copier clés test
   - Coller dans `.env`

3. **Resend** (30 min)
   - Aller sur https://resend.com
   - Sign up / Login
   - API Keys → Create
   - Copier `RESEND_API_KEY`
   - Coller dans `.env`

#### Après-midi (3-4h)

**2. Base de données PostgreSQL**

**Option A : Supabase (Recommandé - Gratuit)**
```bash
# 1. Aller sur https://supabase.com
# 2. Sign up / Login
# 3. New Project
# 4. Region: Europe West (Ireland)
# 5. Database Password: <noter quelque part>
# 6. Create project (attendre 2 min)

# 7. Settings → Database → Connection string
# Copier "URI" et "Direct URL"

# 8. Dans .env :
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
```

**Option B : Neon (Gratuit)**
```bash
# 1. Aller sur https://neon.tech
# 2. Sign up
# 3. Create project
# 4. Copier connection string
```

**3. Initialiser la base de données**
```bash
# Générer Prisma client
npx prisma generate

# Créer les tables
npx prisma migrate deploy

# Seed avec données de test
npm run db:seed

# Vérifier dans Prisma Studio
npx prisma studio
# Ouvrir http://localhost:5555
# Vérifier que les tables existent avec des données
```

**4. Tester le serveur local**
```bash
# Démarrer
npm run dev

# Tester :
# http://localhost:3000 - Homepage ✅
# http://localhost:3000/auth - Connexion ✅
# http://localhost:3000/catalog - Catalogue ✅
# http://localhost:3000/admin - Admin (après connexion) ✅
```

---

### 🟠 JOUR 2 - Build & Tests Critiques

#### Matin (3-4h)

**1. Test du build production**
```bash
# Clean
rm -rf .next

# Build
npm run build

# Si erreurs :
# - Lire les messages d'erreur
# - Corriger un par un
# - Re-build jusqu'à succès
```

**Erreurs communes :**
- Variables env manquantes → Vérifier `.env`
- Imports manquants → Ajouter imports
- Types incorrects → Corriger types TypeScript
- Images invalides → Vérifier chemins images

**2. Corriger warnings ESLint critiques**
```bash
# Lister les erreurs
npm run lint

# Corriger automatiquement ce qui est possible
npm run lint -- --fix

# Corriger manuellement le reste
# Focus sur :
# - Variables inutilisées (supprimer)
# - Imports non utilisés (supprimer)
# - Hooks dependencies (ajouter dans [])
```

#### Après-midi (3-4h)

**3. Tests fonctionnels manuels**

**Parcours à tester (30 min chacun) :**

A. **Authentification**
- [ ] Inscription avec email/password
- [ ] Connexion
- [ ] Déconnexion
- [ ] (Optionnel) OAuth Google
- [ ] Reset password

B. **Catalogue**
- [ ] Page d'accueil charge
- [ ] Catalogue produits affiche
- [ ] Filtres fonctionnent
- [ ] Tri fonctionne
- [ ] Pagination fonctionne
- [ ] Fiche produit charge

C. **Panier & Checkout**
- [ ] Ajout au panier
- [ ] Modification quantité
- [ ] Suppression article
- [ ] Checkout charge
- [ ] Paiement test Stripe
  - Carte test : `4242 4242 4242 4242`
  - Expiration : `12/34`
  - CVC : `123`
- [ ] Confirmation commande
- [ ] Email reçu

D. **Admin**
- [ ] Login admin
- [ ] Dashboard charge
- [ ] Graphiques affichent
- [ ] Liste produits charge
- [ ] Créer produit
- [ ] Upload image
- [ ] Liste commandes charge

**4. Documenter bugs trouvés**
```bash
# Créer un fichier
nano BUGS_A_CORRIGER.md

# Lister tous les bugs avec :
# - Description
# - Étapes pour reproduire
# - Priorité (Critique/Important/Mineur)
```

---

### 🟡 JOUR 3 - Corrections & Optimisations

#### Toute la journée (6-8h)

**1. Corriger bugs critiques trouvés Jour 2**
- Focus sur bugs bloquants
- Tester après chaque correction

**2. Fonctionnalités manquantes critiques**

**A. Webhooks Stripe (2h)**

Créer endpoint test local :
```bash
# Terminal 1 : Server
npm run dev

# Terminal 2 : Stripe CLI
stripe listen --forward-to localhost:3000/api/checkout/webhook

# Terminal 3 : Test
stripe trigger checkout.session.completed

# Vérifier dans logs que webhook est reçu
```

**B. Emails confirmation commande (2h)**

Créer `/emails/order-confirmation.tsx` :
```tsx
export default function OrderConfirmationEmail({ 
  orderNumber, 
  items, 
  total 
}) {
  return (
    <div>
      <h1>Commande confirmée #{orderNumber}</h1>
      <p>Total : {total} CFA</p>
      {/* Template email */}
    </div>
  )
}
```

Modifier `/app/api/checkout/webhook/route.ts` :
```typescript
// Après création commande, envoyer email
await resend.emails.send({
  from: process.env.EMAIL_FROM,
  to: customerEmail,
  subject: `Commande confirmée #${order.id}`,
  react: OrderConfirmationEmail({ order })
})
```

**C. Gestion stocks (2h)**

Modifier `/app/api/checkout/webhook/route.ts` :
```typescript
// Après paiement confirmé, décrémenter stock
for (const item of orderItems) {
  await prisma.product.update({
    where: { id: item.productId },
    data: {
      stock: { decrement: item.quantity }
    }
  })
}
```

**3. Re-tester build**
```bash
rm -rf .next
npm run build
npm run start
# Tester toutes les fonctionnalités
```

---

### 🟢 JOUR 4 - Préparation Déploiement

#### Matin (3-4h)

**1. Créer compte Vercel**
```bash
# 1. Aller sur https://vercel.com
# 2. Sign up with GitHub
# 3. Autoriser accès repo
```

**2. Configurer projet Vercel**
```bash
# Installer CLI
npm i -g vercel

# Login
vercel login

# Lier projet
vercel link

# Suivre les prompts :
# - Set up and deploy? Yes
# - Scope? Your account
# - Link to existing project? No
# - Project name? flawlessbeauty
# - Directory? ./
```

**3. Ajouter variables d'environnement Vercel**
```bash
# Via dashboard : vercel.com/[votre-nom]/flawlessbeauty
# Settings → Environment Variables

# Copier TOUTES les variables de .env local
# Pour chaque variable :
# - Name: NOM_VARIABLE
# - Value: valeur
# - Environments: Production, Preview, Development
```

**Important :** Variables à changer pour production :
```bash
# À modifier plus tard :
NEXT_PUBLIC_APP_URL="https://flawlessbeauty.vercel.app"
NEXTAUTH_URL="https://flawlessbeauty.vercel.app"

# Stripe : Passer en LIVE au moment du vrai lancement
STRIPE_SECRET_KEY="sk_test_..." # OK pour staging
```

#### Après-midi (3-4h)

**4. Premier déploiement**
```bash
# Deploy
vercel --prod

# Attendre build (2-5 min)
# Noter URL : https://flawlessbeauty.vercel.app
```

**5. Tests post-déploiement**

**À tester sur URL Vercel :**
- [ ] Homepage charge
- [ ] Navigation fonctionne
- [ ] Catalogue affiche produits
- [ ] Images chargent (Uploadthing)
- [ ] Connexion fonctionne
- [ ] Panier fonctionne
- [ ] Checkout fonctionne
- [ ] Admin accessible

**6. Corriger erreurs déploiement**

**Erreurs communes :**
- **500 Server Error** → Vérifier logs Vercel
- **Database connection failed** → Vérifier `DATABASE_URL`
- **Images ne chargent pas** → Vérifier `UPLOADTHING_*`
- **Stripe fail** → Vérifier `STRIPE_*` et webhook URL

---

### ✅ JOUR 5 - Tests Finaux & Documentation

#### Matin (3-4h)

**1. Tests complets staging**

**Checklist exhaustive :**

**Frontend :**
- [ ] Toutes les pages accessibles (104 pages)
- [ ] Navigation header fonctionne
- [ ] Footer liens fonctionnent
- [ ] Mobile responsive
- [ ] Images optimisées chargent
- [ ] Recherche fonctionne

**E-commerce :**
- [ ] Catalogue produits complet
- [ ] Filtres et tri fonctionnent
- [ ] Fiche produit détaillée OK
- [ ] Ajout panier fonctionnel
- [ ] Panier persistant
- [ ] Checkout complet
- [ ] Paiement Stripe test OK
- [ ] Email confirmation reçu
- [ ] Commande créée en DB

**Compte Utilisateur :**
- [ ] Inscription fonctionne
- [ ] Login fonctionne
- [ ] OAuth Google (si configuré)
- [ ] Dashboard compte OK
- [ ] Commandes affichées
- [ ] Adresses CRUD
- [ ] Favoris fonctionnent

**Admin :**
- [ ] Login admin
- [ ] Dashboard metrics OK
- [ ] Graphiques affichent
- [ ] Liste produits
- [ ] CRUD produits
- [ ] Upload images
- [ ] Liste commandes
- [ ] Gestion utilisateurs
- [ ] Export CSV

**2. Performance & SEO**
```bash
# Lighthouse audit
npx lighthouse https://flawlessbeauty.vercel.app --view

# Vérifier scores :
# Performance: > 70 (acceptable pour staging)
# Accessibility: > 80
# Best Practices: > 80
# SEO: > 80
```

#### Après-midi (3-4h)

**3. Documentation bugs & améliorations**

Créer `/RAPPORT_STAGING.md` :
```markdown
# Rapport Tests Staging

## ✅ Fonctionnel
- Liste ce qui marche

## ❌ Bugs Trouvés
- Liste bugs avec priorité

## 🔄 Améliorations Suggérées
- Liste optimisations possibles

## 📊 Métriques
- Lighthouse scores
- Temps de chargement
- Taux d'erreur
```

**4. Plan pour production**

Créer `/CHECKLIST_PRODUCTION.md` :
```markdown
# Checklist Avant Production

## Configuration
- [ ] Domaine acheté
- [ ] DNS configuré
- [ ] SSL activé
- [ ] Stripe en mode LIVE
- [ ] Variables env PROD
- [ ] Backup DB configuré

## Legal
- [ ] Politique confidentialité
- [ ] Conditions utilisation
- [ ] Mentions légales
- [ ] RGPD compliance

## Marketing
- [ ] Google Analytics
- [ ] Pixels Facebook/Instagram
- [ ] Newsletter configurée
```

**5. Présentation équipe**
- Démo du site staging
- Expliquer ce qui est fait
- Lister ce qui reste à faire
- Valider prochaines étapes

---

## 📋 RÉSUMÉ DES 5 JOURS

| Jour | Objectif | Durée | Livrables |
|------|----------|-------|-----------|
| **1** | Configuration env | 6-8h | `.env` complet, DB initialisée |
| **2** | Build & Tests | 6-8h | Build OK, Tests manuels |
| **3** | Corrections | 6-8h | Bugs corrigés, Features finalisées |
| **4** | Déploiement | 6-8h | Site en ligne sur Vercel |
| **5** | Tests finaux | 6-8h | Site validé, Documentation |

**Total : 30-40 heures sur 5 jours**

---

## 🆘 EN CAS DE PROBLÈME

### Problèmes Courants & Solutions

#### 1. Database Connection Failed
```bash
# Vérifier
npx prisma db pull

# Si erreur :
# - Vérifier DATABASE_URL dans .env
# - Vérifier que DB existe
# - Tester connexion avec psql
```

#### 2. Build Errors
```bash
# Lire message d'erreur complet
# Googler l'erreur
# Vérifier :
# - Imports corrects
# - Types corrects
# - Variables env présentes
```

#### 3. Vercel Deploy Failed
```bash
# Vérifier logs :
# vercel.com → Deployments → [Failed deploy] → Logs

# Solutions :
# - Vérifier env vars Vercel
# - Vérifier build local fonctionne
# - Contacter support Vercel
```

#### 4. Stripe Webhook Not Working
```bash
# Vérifier :
# - URL webhook correcte
# - STRIPE_WEBHOOK_SECRET correct
# - Endpoint /api/checkout/webhook accessible
# - Logs Stripe dashboard

# Tester local :
stripe listen --forward-to localhost:3000/api/checkout/webhook
```

### Contacts Support
- **Vercel :** support@vercel.com
- **Stripe :** https://support.stripe.com
- **Supabase :** https://discord.supabase.com
- **Uploadthing :** support@uploadthing.com

---

## ✅ VALIDATION FINALE

Avant de considérer le staging comme réussi :

### Critères Obligatoires
- [x] Site accessible sur URL Vercel
- [x] Toutes les pages chargent sans 404
- [x] Authentification fonctionne
- [x] Paiement test réussi
- [x] Email confirmation reçu
- [x] Admin opérationnel
- [x] Aucune erreur critique dans logs

### Critères Bonus
- [ ] Performance Lighthouse > 70
- [ ] SEO > 80
- [ ] Mobile responsive parfait
- [ ] Toutes les images optimisées

---

## 🚀 APRÈS LE STAGING

Une fois staging validé, prochaines étapes :

### Semaine suivante (Optionnel)
1. **Optimisations performance** (2-3 jours)
2. **Intégrations paiements locaux** (2-3 jours)
   - Orange Money
   - Wave
3. **Tests utilisateurs** (1-2 jours)
4. **Corrections feedback** (1-2 jours)

### Puis production
1. **Configuration domaine** (1 jour)
2. **Stripe mode LIVE** (1 jour)
3. **Migration données** (1 jour)
4. **Déploiement production** (1 jour)
5. **Monitoring 24h** (1 jour)

---

## 💪 MOTIVATION

**Vous avez déjà fait 95% du travail !**

Ces 5 jours sont juste pour :
- ✅ Configurer l'environnement
- ✅ Tester tout ce qui est déjà construit
- ✅ Corriger petits bugs
- ✅ Déployer en ligne

**C'est entièrement faisable !** 🚀

Le plus dur (architecture, composants, API, admin) est **DÉJÀ FAIT**.

**Bon courage ! 💪**

---

**Document créé le :** 2025-10-06  
**Priorité :** 🔴 CRITIQUE  
**Deadline :** 5 jours  
**Status :** PRÊT À COMMENCER
