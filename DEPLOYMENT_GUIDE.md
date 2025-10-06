# Guide de Déploiement - Mami-Shop E-Commerce

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Configuration Supabase](#configuration-supabase)
3. [Configuration PayTech](#configuration-paytech)
4. [Variables d'environnement](#variables-denvironnement)
5. [Déploiement sur Vercel](#déploiement-sur-vercel)
6. [Configuration post-déploiement](#configuration-post-déploiement)
7. [Tests](#tests)
8. [Maintenance](#maintenance)

---

## 🎯 Prérequis

- [x] Compte Supabase (déjà configuré)
- [x] Compte Vercel (déjà configuré avec auto-déploiement depuis GitHub)
- [ ] Compte PayTech pour les paiements mobiles
- [ ] Compte Resend pour les emails (déjà configuré)
- [x] Repository GitHub

---

## 🗄️ Configuration Supabase

### ✅ Déjà configuré

Votre base de données Supabase est déjà opérationnelle avec :

- **Database URL (Pooled)**: Pour l'application Next.js
- **Direct URL**: Pour les migrations Prisma
- **Storage**: Pour les images des produits

### Vérification de la configuration

```bash
# Tester la connexion à la base de données
npm run db:generate
npm run db:studio
```

---

## 💳 Configuration PayTech

### Étape 1: Créer un compte PayTech

1. Visitez [https://paytech.sn](https://paytech.sn)
2. Créez un compte marchand
3. Complétez la vérification KYC (Know Your Customer)

### Étape 2: Récupérer les clés API

1. Connectez-vous à votre dashboard PayTech
2. Allez dans **Paramètres > API**
3. Récupérez vos clés :
   - `API_KEY` (clé publique)
   - `API_SECRET` (clé secrète)

### Étape 3: Configurer les webhooks PayTech

Dans le dashboard PayTech, configurez l'URL IPN (Instant Payment Notification) :

- **URL IPN de test**: `https://votre-app.vercel.app/api/checkout/paytech-webhook`
- **URL IPN de production**: `https://mami-shop.com/api/checkout/paytech-webhook`

### Modes de paiement supportés

PayTech supporte les méthodes suivantes au Sénégal :
- ✅ Wave
- ✅ Orange Money
- ✅ Free Money
- ✅ E-Money (Wizall)
- ✅ Cartes bancaires (Visa, Mastercard)

---

## 🔐 Variables d'environnement

### Sur Vercel

1. Allez dans votre projet Vercel
2. **Settings > Environment Variables**
3. Ajoutez les variables suivantes :

#### Base de données (Supabase)

```bash
# Connexion poolée pour l'app
DATABASE_URL="postgresql://postgres.fjarsnhfbdmlqgyfjzvt:Mamita-2025%23@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"

# Connexion directe pour Prisma Migrate
DIRECT_URL="postgresql://postgres:Mamita-2025%23@db.fjarsnhfbdmlqgyfjzvt.supabase.co:5432/postgres?sslmode=require"
```

#### Supabase

```bash
NEXT_PUBLIC_SUPABASE_URL=https://fjarsnhfbdmlqgyfjzvt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYXJzbmhmYmRtbHFneWZqenZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzM2OTksImV4cCI6MjA3MTMwOTY5OX0.Hk09T1oz_w8MvCud3Vi22Lfyv7Z8MKlIqGDZVip0nMo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYXJzbmhmYmRtbHFneWZqenZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTczMzY5OSwiZXhwIjoyMDcxMzA5Njk5fQ.k380ej2oDPfSaMgFJ6073C2LPofD2uc2cOvXjz8QS4E
```

#### Auth.js (NextAuth v5)

```bash
# Générer un nouveau secret avec: openssl rand -hex 32
NEXTAUTH_SECRET="9128bac5a32920b10463076a6da2dcca1ab97c734e156be8b05def9472922d43"

# URL de production (à mettre à jour avec votre domaine)
NEXTAUTH_URL=https://votre-app.vercel.app
```

#### Resend (Emails)

```bash
RESEND_API_KEY=re_aCVhDxrR_EVwjp8sEeDwNxcszJuMJcKKt
```

#### PayTech (Paiements)

```bash
# À CONFIGURER APRÈS CRÉATION DU COMPTE PAYTECH
PAYTECH_API_KEY=votre_api_key_paytech
PAYTECH_SECRET_KEY=votre_secret_key_paytech

# Mode: "test" pour le développement, "prod" pour la production
PAYTECH_ENV=test

# URLs de callback (à mettre à jour avec votre domaine)
NEXT_PUBLIC_PAYTECH_SUCCESS_URL=https://votre-app.vercel.app/checkout/success
NEXT_PUBLIC_PAYTECH_CANCEL_URL=https://votre-app.vercel.app/checkout/cancel
NEXT_PUBLIC_PAYTECH_IPN_URL=https://votre-app.vercel.app/api/checkout/paytech-webhook
```

### Important

- ✅ Toutes les variables préfixées `NEXT_PUBLIC_` sont exposées au client
- ⚠️ Les autres variables sont uniquement accessibles côté serveur
- 🔒 Ne JAMAIS commiter les valeurs réelles dans Git

---

## 🚀 Déploiement sur Vercel

### Déploiement automatique (déjà configuré)

Votre projet est déjà configuré pour le déploiement automatique :

1. **Push sur GitHub** → Déploiement automatique sur Vercel
2. **Branch principale** → Production
3. **Autres branches** → Preview deployments

### Première migration de la base de données

Après le premier déploiement, vous devez exécuter les migrations :

```bash
# Option 1: Via Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed

# Option 2: Via le projet déployé (ajouter une route temporaire)
# Créer app/api/migrate/route.ts pour migration manuelle
```

### Configuration Build sur Vercel

Vercel utilise déjà la configuration dans `vercel.json` :

```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build"
}
```

Le script `prebuild` dans `package.json` génère automatiquement le client Prisma :

```json
"prebuild": "prisma generate"
```

---

## ⚙️ Configuration post-déploiement

### 1. Configurer le domaine custom (optionnel)

1. Allez dans **Settings > Domains** sur Vercel
2. Ajoutez votre domaine personnalisé (ex: `mami-shop.com`)
3. Configurez les DNS selon les instructions Vercel
4. Mettez à jour `NEXTAUTH_URL` avec le nouveau domaine

### 2. Tester le webhook PayTech

PayTech doit pouvoir accéder à votre webhook. Testez avec :

```bash
curl -X POST https://votre-app.vercel.app/api/checkout/paytech-webhook \
  -H "Content-Type: application/json" \
  -H "paytech-signature: test_signature" \
  -d '{
    "type_event": "payment_complete",
    "ref_command": "TEST-123",
    "item_name": "Test",
    "item_price": "5000",
    "devise": "XOF",
    "payment_method": "wave",
    "payment_ref": "PAY-123"
  }'
```

### 3. Créer un utilisateur admin

Connectez-vous à Prisma Studio en production :

```bash
# Via Supabase SQL Editor
# Ou créer une route admin temporaire pour le premier setup
```

### 4. Importer les produits

Utilisez l'interface admin pour importer vos produits :

1. Connectez-vous à `/admin`
2. Allez dans **Products > Import**
3. Uploadez votre fichier CSV

---

## 🧪 Tests

### Test du flux de paiement complet

1. **Ajouter un produit au panier**
   - Allez sur `/catalog`
   - Ajoutez un produit au panier

2. **Passer une commande**
   - Allez dans `/cart`
   - Cliquez sur "Commander"
   - Remplissez le formulaire `/checkout`

3. **Tester le paiement**
   - Mode test PayTech : utilisez les coordonnées de test
   - Vérifiez la redirection vers `/checkout/success`

4. **Vérifier la commande**
   - Allez dans `/admin/orders`
   - Vérifiez que la commande apparaît avec le statut `PAID`

### Test des webhooks PayTech

1. Effectuez un paiement test
2. Vérifiez les logs Vercel :
   ```bash
   vercel logs --follow
   ```
3. Confirmez que le webhook IPN est reçu et traité

### Test mobile

1. **Chrome DevTools**
   - F12 > Toggle device toolbar
   - Testez sur iPhone SE, iPhone 12 Pro, Pixel 5

2. **Tests réels**
   - Testez sur de vrais appareils Android et iOS
   - Vérifiez Wave et Orange Money sur téléphone

---

## 🔧 Maintenance

### Monitoring

1. **Vercel Analytics**
   - Activez dans **Settings > Analytics**
   - Suivez les performances et erreurs

2. **Logs**
   ```bash
   # Voir les logs en temps réel
   vercel logs --follow
   
   # Logs d'une fonction spécifique
   vercel logs --function api/checkout/paytech-webhook
   ```

3. **Supabase Dashboard**
   - Surveillez l'utilisation de la base de données
   - Vérifiez les requêtes lentes dans **Database > Query Performance**

### Sauvegardes

1. **Base de données**
   - Supabase fait des backups automatiques quotidiens
   - Pour backup manuel : **Database > Backups**

2. **Images**
   - Les images sont stockées sur Supabase Storage
   - Configurez des backups dans **Storage > Settings**

### Mises à jour

```bash
# Mettre à jour les dépendances
npm update

# Vérifier les vulnérabilités
npm audit

# Fixer les vulnérabilités
npm audit fix
```

### Migrations de schéma

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name description_du_changement

# Appliquer en production
npx prisma migrate deploy
```

---

## 📊 Checklist de déploiement

### Avant le premier déploiement

- [x] Base de données Supabase configurée
- [x] Repository GitHub connecté à Vercel
- [ ] Compte PayTech créé et vérifié
- [ ] Variables d'environnement configurées sur Vercel
- [x] Clés API Resend configurées
- [ ] Domaine personnalisé configuré (optionnel)

### Après le premier déploiement

- [ ] Migrations Prisma exécutées
- [ ] Données seed importées
- [ ] Utilisateur admin créé
- [ ] Webhook PayTech testé
- [ ] Flux de paiement complet testé
- [ ] Tests sur mobile (iOS et Android)
- [ ] Analytics activées
- [ ] Monitoring configuré

### En production

- [ ] Mode PayTech passé en `prod`
- [ ] HTTPS vérifié (automatique avec Vercel)
- [ ] CSP headers configurés
- [ ] Rate limiting activé
- [ ] Emails de confirmation fonctionnels
- [ ] Notifications admin configurées

---

## 🆘 Dépannage

### Erreur de connexion Prisma

```bash
# Vérifier les variables DATABASE_URL et DIRECT_URL
# Régénérer le client Prisma
npx prisma generate
```

### Webhook PayTech non reçu

1. Vérifier l'URL IPN dans le dashboard PayTech
2. Vérifier les logs Vercel
3. Tester avec curl
4. Vérifier la signature

### Images non chargées

1. Vérifier que l'URL Supabase est bien dans `next.config.ts`
2. Vérifier les permissions dans Supabase Storage

---

## 📞 Support

- **PayTech**: [support@paytech.sn](mailto:support@paytech.sn)
- **Supabase**: [Support](https://supabase.com/support)
- **Vercel**: [Support](https://vercel.com/support)

---

## 🎉 Félicitations !

Votre application e-commerce Mami-Shop est maintenant déployée et prête pour les paiements mobiles au Sénégal ! 🇸🇳

**Prochaines étapes recommandées :**

1. Configurer Google Analytics ou Matomo
2. Ajouter des tests automatisés
3. Configurer un monitoring avancé (Sentry, LogRocket)
4. Optimiser le SEO
5. Mettre en place une stratégie de contenu

Bon commerce ! 🚀
