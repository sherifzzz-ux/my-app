# Configuration PayTech pour Univers Cosmetix

## Vue d'ensemble

Ce document explique comment configurer et utiliser le système de paiement PayTech.sn sur votre site e-commerce Univers Cosmetix.

PayTech.sn est une passerelle de paiement sénégalaise qui supporte :
- **Orange Money** 🟠
- **Wave** 🔵
- **Free Money**
- **Cartes bancaires** (Visa, Mastercard) 💳
- **Paiement à la livraison** 💵 (géré en interne)

## Fonctionnalités implémentées

### ✅ Système de panier
- Ajout/modification/suppression de produits
- Persistance du panier (localStorage)
- Calcul automatique des totaux
- Gestion des quantités

### ✅ Checkout multi-étapes
1. **Récapitulatif du panier** - Vérification des articles
2. **Informations client** - Email, nom, téléphone (avec support guest checkout)
3. **Livraison** - Choix de la zone et calcul des frais
4. **Paiement** - Sélection du mode de paiement

### ✅ Modes de paiement
- **Paiement en ligne via PayTech** (Orange Money, Wave, CB)
- **Paiement à la livraison** (espèces)

### ✅ Gestion des commandes
- Vérification automatique de la disponibilité des produits
- Mise à jour automatique du stock après paiement
- Statuts de commande (PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- Statuts de paiement (PENDING, PROCESSING, PAID, FAILED, CANCELLED, REFUNDED)

### ✅ Zones de livraison
- **Dakar** : 2000 CFA - Livraison en moins de 24h
- **Thiès** : 3000 CFA - Livraison en 24-48h
- **Autres régions** : 5000 CFA - Livraison en 48-72h

### ✅ Webhooks PayTech (IPN)
- Réception des notifications de paiement
- Vérification de signature SHA256
- Mise à jour automatique des commandes
- Gestion des remboursements

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# PayTech Configuration
PAYTECH_API_KEY=your_api_key_here
PAYTECH_API_SECRET=your_api_secret_here
PAYTECH_ENV=test  # ou 'production'

# PayTech Callback URLs
PAYTECH_SUCCESS_URL=http://localhost:3000/checkout/success
PAYTECH_CANCEL_URL=http://localhost:3000/checkout
PAYTECH_IPN_URL=http://localhost:3000/api/paytech/webhook

# NextAuth (pour les URLs absolues)
NEXTAUTH_URL=http://localhost:3000
```

### 2. Obtenir vos identifiants PayTech

1. Inscrivez-vous sur [PayTech.sn](https://paytech.sn)
2. Créez un compte marchand
3. Accédez à votre tableau de bord
4. Récupérez votre `API_KEY` et `API_SECRET`
5. Configurez vos URLs de callback (IPN, Success, Cancel)

### 3. Configuration en production

Pour la production, mettez à jour les variables :

```bash
PAYTECH_ENV=production
PAYTECH_SUCCESS_URL=https://votre-domaine.com/checkout/success
PAYTECH_CANCEL_URL=https://votre-domaine.com/checkout
PAYTECH_IPN_URL=https://votre-domaine.com/api/paytech/webhook
NEXTAUTH_URL=https://votre-domaine.com
```

⚠️ **Important** : L'URL IPN doit être accessible publiquement pour que PayTech puisse envoyer les notifications de paiement.

## Architecture du système

### Structure des fichiers

```
├── app/
│   ├── checkout/
│   │   ├── page.tsx                    # Page principale du checkout
│   │   └── success/
│   │       └── page.tsx                # Page de confirmation
│   ├── api/
│   │   └── paytech/
│   │       ├── session/route.ts        # Création de session PayTech
│   │       ├── webhook/route.ts        # Réception des notifications (IPN)
│   │       └── verify/route.ts         # Vérification de paiement
├── components/
│   └── checkout/
│       ├── CheckoutLayout.tsx          # Layout du checkout
│       ├── CheckoutSteps.tsx           # Indicateur d'étapes
│       ├── CheckoutCart.tsx            # Étape 1: Panier
│       ├── CustomerInfoForm.tsx        # Étape 2: Infos client
│       ├── ShippingSelector.tsx        # Étape 3: Livraison
│       ├── PaymentMethodSelector.tsx   # Étape 4: Paiement
│       └── CheckoutSummary.tsx         # Récapitulatif
├── lib/
│   └── paytech/
│       ├── types.ts                    # Types TypeScript
│       ├── config.ts                   # Configuration
│       └── api.ts                      # Fonctions API PayTech
├── server/
│   └── actions/
│       └── checkout.ts                 # Server actions (createOrder, updateStock, etc.)
└── hooks/
    ├── use-checkout.ts                 # Hook de gestion du checkout
    └── use-cart.ts                     # Hook de gestion du panier
```

### Flow de paiement

#### Paiement en ligne (PayTech)

1. **Client remplit le formulaire** → Étapes 1-4 du checkout
2. **Création de la commande** → `createOrder()` vérifie le stock et crée la commande (status: PENDING)
3. **Session PayTech** → `POST /api/paytech/session` crée une session de paiement
4. **Redirection** → Client redirigé vers PayTech
5. **Paiement** → Client paie via Orange Money/Wave/CB
6. **Webhook (IPN)** → PayTech notifie `POST /api/paytech/webhook`
7. **Mise à jour** → Commande confirmée (status: CONFIRMED, paymentStatus: PAID)
8. **Stock** → `updateProductStock()` décrémente le stock
9. **Redirection** → Client redirigé vers `/checkout/success`

#### Paiement à la livraison

1. **Client remplit le formulaire** → Étapes 1-4 du checkout
2. **Création de la commande** → `createOrder()` vérifie le stock et crée la commande (status: PENDING)
3. **Confirmation** → `confirmCashOnDeliveryOrder()` confirme la commande
4. **Stock** → `updateProductStock()` décrémente le stock
5. **Redirection** → Client redirigé vers `/checkout/success?method=cash`

### Gestion du stock

Le stock est mis à jour automatiquement lors de :
- ✅ **Paiement réussi** → Stock décrémenté
- ❌ **Commande annulée** → Stock restauré (si la commande était confirmée)
- 💰 **Remboursement** → Stock restauré

```typescript
// Décrémentation du stock
await updateProductStock(orderId)

// Restauration du stock
await restoreProductStock(orderId)
```

## Webhook PayTech (IPN)

### Configuration

L'URL IPN doit être configurée sur PayTech.sn :
```
https://votre-domaine.com/api/paytech/webhook
```

### Événements supportés

- `sale_complete` → Paiement réussi
- `sale_canceled` → Paiement annulé
- `sale_refund` → Paiement remboursé

### Sécurité

Le webhook vérifie automatiquement :
1. La signature SHA256 de `api_key_sha256`
2. La signature SHA256 de `api_secret_sha256`

Si la signature est invalide, le webhook retourne une erreur 400.

## Tests

### Mode test

En mode test, utilisez :
```bash
PAYTECH_ENV=test
```

Vous pouvez tester les paiements sans effectuer de vraies transactions.

### Tester le webhook localement

Pour tester le webhook en développement local, utilisez [ngrok](https://ngrok.com/) :

```bash
# Démarrer ngrok
ngrok http 3000

# Mettre à jour PAYTECH_IPN_URL
PAYTECH_IPN_URL=https://votre-url-ngrok.ngrok.io/api/paytech/webhook
```

## Sécurité

### Rate limiting

Les routes de paiement sont protégées par un rate limiting :
- **Session PayTech** : 5 tentatives par 15 minutes
- **Webhook** : Aucune limite (vient de PayTech)

### Validation

Toutes les données sont validées avec Zod :
- Données de checkout
- Payload du webhook
- Requêtes de session

### Authentification

- Les commandes sont liées à l'utilisateur connecté (si authentifié)
- Support du guest checkout (commandes sans compte)

## Monitoring et logs

### Logs

Les événements importants sont loggés :
```typescript
console.log('Order confirmed:', order.orderNumber)
console.log('Order cancelled:', order.orderNumber)
console.log('Order refunded:', order.orderNumber)
```

### Erreurs

Les erreurs sont capturées et loggées :
```typescript
console.error('PayTech session creation error:', error)
console.error('Webhook processing error:', error)
console.error('Stock update error:', error)
```

## FAQ

### Comment tester le paiement ?

1. Activez le mode test : `PAYTECH_ENV=test`
2. Créez une commande sur votre site
3. Utilisez les numéros de test fournis par PayTech

### Le webhook ne fonctionne pas

Vérifiez que :
1. L'URL IPN est accessible publiquement
2. Les credentials PayTech sont corrects
3. La signature est valide

### Comment gérer les remboursements ?

Les remboursements sont gérés automatiquement via le webhook :
1. Remboursement initié depuis le dashboard PayTech
2. Webhook `sale_refund` reçu
3. Stock restauré automatiquement
4. Statut de paiement mis à jour : `REFUNDED`

### Comment personnaliser les frais de livraison ?

Modifiez `lib/paytech/config.ts` :

```typescript
shippingZones: {
  DAKAR: {
    name: 'Dakar',
    delay: 'Livraison en moins de 24h',
    feeCents: 200000, // 2000 CFA en centimes
  },
  // ...
}
```

## Support

Pour toute question ou problème :
- Documentation PayTech : https://paytech.sn/documentation
- Support PayTech : support@paytech.sn
- Documentation du projet : `/docs`

---

**Dernière mise à jour** : 2025-10-09
