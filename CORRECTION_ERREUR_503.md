# 🚨 Correction de l'erreur 503 - Checkout bloqué

## Problème

Vous rencontrez l'erreur suivante lors de la finalisation de commande :

```
POST /api/paytech/session 503 (Service Unavailable)
Error: Le système de paiement n'est pas disponible pour le moment.
```

## Cause

Les variables d'environnement PayTech ne sont pas configurées sur Vercel.

---

## ✅ Solution 1 : Configuration rapide PayTech (Recommandé)

### Étape 1 : Accéder aux variables d'environnement Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `flawless-beauty`
3. Cliquez sur **Settings**
4. Allez dans **Environment Variables**

### Étape 2 : Ajouter les variables PayTech

Ajoutez les **3 variables minimum** suivantes :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `PAYTECH_API_KEY` | Votre clé API PayTech | Production, Preview, Development |
| `PAYTECH_API_SECRET` | Votre secret API PayTech | Production, Preview, Development |
| `PAYTECH_ENV` | `test` (pour tester) | Production, Preview, Development |

### Étape 3 : Obtenir vos clés PayTech

**Si vous n'avez pas encore de compte PayTech :**

1. Créez un compte sur [https://paytech.sn](https://paytech.sn)
2. Connectez-vous à votre tableau de bord
3. Allez dans **Paramètres** → **Clés API**
4. Copiez votre `API Key` et `API Secret`

**Mode test (recommandé pour commencer) :**
- Utilisez `PAYTECH_ENV=test`
- Les paiements ne seront pas réels
- Parfait pour tester l'intégration

### Étape 4 : Redéployer

1. Dans Vercel, allez sur **Deployments**
2. Cliquez sur les trois points (...) du dernier déploiement
3. Sélectionnez **Redeploy**
4. Attendez la fin du déploiement (1-2 minutes)

### Étape 5 : Tester

1. Allez sur votre site
2. Ajoutez un produit au panier
3. Essayez de finaliser une commande avec un paiement en ligne
4. Vous devriez être redirigé vers PayTech

---

## 🔄 Solution 2 : Utiliser le paiement à la livraison (Temporaire)

**Si vous ne pouvez pas configurer PayTech immédiatement**, vous pouvez quand même accepter des commandes :

### Comment faire ?

1. Lors du checkout, à l'étape **Méthode de paiement**
2. Sélectionnez **"Paiement à la livraison" 💵**
3. Finalisez la commande normalement

**Avantages :**
- ✅ Fonctionne sans configuration PayTech
- ✅ Permet aux clients de commander immédiatement
- ✅ Paiement en espèces à la réception

**Limitations :**
- ❌ Pas de paiement en ligne (Orange Money, Wave, CB)
- ❌ Les clients doivent payer en espèces

---

## 📋 Variables d'environnement complètes (Optionnel)

Pour une configuration complète, ajoutez également :

```env
# URLs de callback PayTech
PAYTECH_SUCCESS_URL=https://votre-domaine.vercel.app/checkout/success
PAYTECH_CANCEL_URL=https://votre-domaine.vercel.app/checkout
PAYTECH_IPN_URL=https://votre-domaine.vercel.app/api/paytech/webhook
```

Remplacez `votre-domaine.vercel.app` par votre vrai domaine Vercel.

---

## 🧪 Comment tester que ça fonctionne ?

### Test 1 : Paiement à la livraison
1. Ajoutez un produit au panier
2. Allez au checkout
3. Remplissez les informations
4. Sélectionnez "Paiement à la livraison"
5. Finalisez ✅

### Test 2 : Paiement en ligne (après configuration PayTech)
1. Ajoutez un produit au panier
2. Allez au checkout
3. Remplissez les informations
4. Sélectionnez "Orange Money", "Wave" ou "Carte Bancaire"
5. Vous devriez être redirigé vers PayTech ✅
6. Utilisez les numéros de test PayTech (en mode test)

---

## ❓ Questions fréquentes

### Q : Combien de temps prend la configuration ?
**R :** 5-10 minutes si vous avez déjà un compte PayTech, 15-20 minutes si vous devez créer un compte.

### Q : Le paiement à la livraison est-il sécurisé ?
**R :** Oui ! C'est un mode de paiement standard et sûr. Le client paie en espèces lors de la réception.

### Q : Dois-je redémarrer quelque chose après avoir ajouté les variables ?
**R :** Non, il suffit de redéployer sur Vercel. Le nouveau déploiement utilisera automatiquement les nouvelles variables.

### Q : Puis-je utiliser le mode test en production ?
**R :** Oui temporairement, mais passez en mode `production` dès que vous êtes prêt à accepter de vrais paiements.

### Q : Les variables sont-elles sécurisées sur Vercel ?
**R :** Oui ! Vercel crypte et sécurise toutes les variables d'environnement.

---

## 📚 Ressources utiles

- **Guide complet** : [`VERCEL_SETUP.md`](./VERCEL_SETUP.md)
- **Configuration PayTech** : [`PAYTECH_SETUP.md`](./PAYTECH_SETUP.md)
- **Exemple de configuration** : [`.env.example`](./.env.example)

---

## 🆘 Toujours bloqué ?

Si vous rencontrez toujours des problèmes :

1. **Vérifiez les logs Vercel** :
   - Vercel → Deployments → [dernier déploiement] → Runtime Logs
   - Cherchez les erreurs liées à PayTech

2. **Vérifiez que les variables sont bien définies** :
   - Vercel → Settings → Environment Variables
   - Assurez-vous que `PAYTECH_API_KEY` et `PAYTECH_API_SECRET` sont présents

3. **Contactez le support PayTech** :
   - Email : contact@paytech.sn
   - Ils peuvent vérifier que vos clés API sont correctes

---

## ✨ Résumé des actions

**Action immédiate (2 minutes) :**
- ✅ Utilisez "Paiement à la livraison" pour finaliser les commandes

**Configuration complète (10 minutes) :**
1. ✅ Créer un compte PayTech (si nécessaire)
2. ✅ Obtenir les clés API
3. ✅ Ajouter les 3 variables sur Vercel
4. ✅ Redéployer
5. ✅ Tester

**Bon shopping ! 🛍️**
