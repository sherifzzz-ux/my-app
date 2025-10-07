# 🚀 Quick Start - Checkout PayTech

## Démarrage Rapide en 5 Minutes

### Étape 1: Configuration Environnement

```bash
# Copier le template
cp .env.example .env

# Éditer .env et ajouter vos credentials
# Minimum requis:
# - DATABASE_URL
# - NEXTAUTH_URL
# - NEXTAUTH_SECRET
# - PAYTECH_API_KEY
# - PAYTECH_API_SECRET
```

### Étape 2: Base de Données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# (Optionnel) Seed la base
npx prisma db seed
```

### Étape 3: Lancer le Serveur

```bash
# Développement
npm run dev

# Production
npm run build
npm start
```

### Étape 4: Tester le Checkout

1. Aller sur `http://localhost:3000`
2. Ajouter des produits au panier
3. Cliquer sur "Passer à la caisse"
4. Suivre le flow checkout (4 étapes)

---

## 📋 Checklist Pré-Production

- [ ] Credentials PayTech configurés (test)
- [ ] Database migrée
- [ ] Test checkout complet
- [ ] Test webhook IPN
- [ ] Variables d'environnement production
- [ ] Credentials PayTech production
- [ ] Backup base de données

---

## 🔑 Variables d'Environnement Essentielles

### Obligatoires

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://votresite.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
PAYTECH_API_KEY="your-key"
PAYTECH_API_SECRET="your-secret"
```

### Optionnelles

```bash
PAYTECH_ENV="test"  # ou "production"
RESEND_API_KEY="re_xxx"  # Pour emails
UPLOADTHING_SECRET="sk_xxx"  # Pour uploads
```

---

## 🧪 Test Rapide

### 1. Test Checkout Guest

```
1. Ajouter produit au panier
2. /checkout
3. Remplir formulaire
4. Sélectionner zone livraison
5. Choisir méthode paiement
6. Accepter CGV
7. Cliquer "Finaliser"
```

### 2. Test Webhook (Local)

```bash
# Installer ngrok
ngrok http 3000

# Configurer URL IPN dans PayTech:
# https://votre-url.ngrok.io/api/paytech/webhook

# Tester avec Postman
POST https://votre-url.ngrok.io/api/paytech/webhook
```

---

## 🐛 Dépannage Rapide

### Erreur "PayTech API Key not set"
→ Vérifier `.env` et redémarrer serveur

### Migration échoue
→ `npx prisma migrate reset`

### TypeScript erreurs
→ `npx prisma generate && npm run build`

### Webhook non reçu
→ Vérifier URL IPN dans dashboard PayTech  
→ Tester avec ngrok en local

---

## 📚 Documentation Complète

- **Guide complet**: `CHECKOUT_PAYTECH_README.md`
- **Checklist**: `MIGRATION_CHECKLIST.md`
- **Résumé**: `IMPLEMENTATION_SUMMARY.md`
- **Plan original**: `PLAN_CHECKOUT_PAYTECH.md`

---

## 🆘 Besoin d'Aide?

1. Consulter `CHECKOUT_PAYTECH_README.md`
2. Vérifier les logs: `console` et `server logs`
3. PayTech Support: support@paytech.sn
4. Documentation API: https://paytech.sn/documentation

---

**Temps estimé setup complet:** 10-15 minutes  
**Prêt à recevoir des paiements!** 💰
