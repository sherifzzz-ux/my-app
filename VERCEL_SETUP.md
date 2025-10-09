# Configuration Vercel pour FlawlessBeauty

Ce guide explique comment configurer les variables d'environnement sur Vercel pour déployer FlawlessBeauty.

## 🚨 Problème actuel : Erreur 503 sur le checkout

**Erreur** : `POST /api/paytech/session 503 (Service Unavailable)`

**Cause** : Les variables d'environnement PayTech ne sont pas configurées sur Vercel.

**Solution** : Suivre les étapes ci-dessous pour configurer les variables d'environnement.

---

## Configuration des variables d'environnement sur Vercel

### 1. Accéder aux paramètres du projet

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `flawless-beauty`
3. Cliquez sur **Settings** (Paramètres)
4. Sélectionnez **Environment Variables** dans le menu de gauche

### 2. Variables requises pour PayTech

Ajoutez les variables suivantes (une par une) :

#### Variables PayTech (CRITIQUES)

```env
PAYTECH_API_KEY
Valeur: [Votre clé API PayTech]
Environnements: Production, Preview, Development
```

```env
PAYTECH_API_SECRET
Valeur: [Votre secret API PayTech]
Environnements: Production, Preview, Development
```

```env
PAYTECH_ENV
Valeur: test (ou "production" en prod)
Environnements: Production, Preview, Development
```

#### URLs de callback PayTech

```env
PAYTECH_SUCCESS_URL
Valeur: https://votre-domaine.vercel.app/checkout/success
Environnements: Production, Preview, Development
```

```env
PAYTECH_CANCEL_URL
Valeur: https://votre-domaine.vercel.app/checkout
Environnements: Production, Preview, Development
```

```env
PAYTECH_IPN_URL
Valeur: https://votre-domaine.vercel.app/api/paytech/webhook
Environnements: Production, Preview, Development
```

### 3. Autres variables requises

#### Base de données

```env
DATABASE_URL
Valeur: [Votre URL PostgreSQL]
Environnements: Production, Preview, Development
```

#### NextAuth

```env
NEXTAUTH_SECRET
Valeur: [Générer avec: openssl rand -base64 32]
Environnements: Production, Preview, Development
```

```env
NEXTAUTH_URL
Valeur: https://votre-domaine.vercel.app
Environnements: Production, Preview, Development
```

#### Uploadthing (optionnel mais recommandé)

```env
UPLOADTHING_SECRET
Valeur: [Votre secret Uploadthing]
Environnements: Production, Preview, Development
```

```env
UPLOADTHING_APP_ID
Valeur: [Votre App ID Uploadthing]
Environnements: Production, Preview, Development
```

### 4. Obtenir les clés PayTech

Si vous n'avez pas encore de compte PayTech :

1. Créez un compte sur [https://paytech.sn](https://paytech.sn)
2. Connectez-vous à votre tableau de bord
3. Allez dans **Paramètres** → **Clés API**
4. Copiez votre `API Key` et `API Secret`
5. Configurez les URLs de callback dans votre compte PayTech

### 5. Redéployer le projet

Après avoir ajouté toutes les variables :

1. Dans Vercel, allez sur **Deployments**
2. Cliquez sur les trois points (...) du dernier déploiement
3. Sélectionnez **Redeploy**
4. Cochez **Use existing Build Cache** (optionnel)
5. Cliquez sur **Redeploy**

---

## 🧪 Mode Test vs Production

### Mode Test (Recommandé pour commencer)

```env
PAYTECH_ENV=test
```

- Utilisez les numéros de test PayTech
- Aucun vrai paiement n'est effectué
- Parfait pour tester l'intégration

### Mode Production

```env
PAYTECH_ENV=production
```

- Utilisez uniquement après avoir testé en mode test
- Les vrais paiements sont effectués
- Vérifiez que tous vos webhooks fonctionnent

---

## ⚠️ Solution temporaire : Paiement à la livraison uniquement

Si vous ne pouvez pas configurer PayTech immédiatement, vous pouvez temporairement permettre uniquement le paiement à la livraison :

1. Les clients pourront toujours passer commande
2. Ils sélectionneront "Paiement à la livraison"
3. Aucune intégration PayTech n'est requise pour cette option

Le paiement à la livraison fonctionne déjà sans configuration supplémentaire !

---

## 🔍 Vérification de la configuration

Pour vérifier que tout fonctionne :

1. Déployez avec les nouvelles variables
2. Allez sur votre site : `https://votre-domaine.vercel.app/checkout`
3. Ajoutez un produit au panier
4. Essayez de finaliser une commande
5. Sélectionnez "Paiement à la livraison" pour tester sans PayTech
6. Ou sélectionnez "Paiement en ligne" pour tester PayTech

---

## 📋 Checklist de déploiement

- [ ] Variables PayTech configurées (API_KEY, API_SECRET, ENV)
- [ ] URLs de callback PayTech configurées
- [ ] DATABASE_URL configurée
- [ ] NEXTAUTH_SECRET et NEXTAUTH_URL configurées
- [ ] Projet redéployé sur Vercel
- [ ] Test de paiement à la livraison réussi
- [ ] Test de paiement PayTech réussi (si configuré)

---

## 🆘 Support

Si vous rencontrez des problèmes :

1. **Logs Vercel** : Vérifiez les logs dans Vercel → Deployments → [votre déploiement] → Runtime Logs
2. **PayTech** : Contactez le support PayTech à contact@paytech.sn
3. **Documentation** : Consultez `PAYTECH_SETUP.md` pour plus de détails

---

## 📚 Ressources

- [Documentation Vercel - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentation PayTech](https://paytech.sn/documentation)
- [PAYTECH_SETUP.md](./PAYTECH_SETUP.md) - Guide détaillé PayTech
- [.env.example](./.env.example) - Exemple de configuration locale
