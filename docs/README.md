# 📚 Documentation - Univers Cosmetix

Bienvenue dans la documentation du système e-commerce Univers Cosmetix.

## 📂 Structure de la documentation

### Guides principaux

1. **[Configuration PayTech](./PAYTECH_SETUP.md)** ⚙️
   - Configuration complète de PayTech.sn
   - Variables d'environnement
   - Webhook (IPN)
   - Architecture du système
   - Sécurité et monitoring

2. **[Système de Checkout](./CHECKOUT_SYSTEM.md)** 🛒
   - Vue d'ensemble du système de panier et paiement
   - Fonctionnalités détaillées
   - Flow de commande
   - API Routes
   - Server Actions

3. **[Guide de Test](./TESTING_GUIDE.md)** 🧪
   - Scénarios de test complets
   - Tests de paiement (en ligne et à la livraison)
   - Tests de sécurité
   - Validation avant production

## 🚀 Démarrage rapide

### 1. Installation

```bash
# Cloner le projet
git clone [url]

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos credentials
```

### 2. Configuration de la base de données

```bash
# Appliquer les migrations
npx prisma migrate dev

# Générer le client Prisma
npx prisma generate

# (Optionnel) Seeder la base
npx prisma db seed
```

### 3. Configuration PayTech

1. Créer un compte sur [PayTech.sn](https://paytech.sn)
2. Récupérer vos API credentials
3. Configurer les variables d'environnement (voir `.env.example`)
4. Tester en mode `test` avant de passer en `production`

Voir le [guide complet de configuration PayTech](./PAYTECH_SETUP.md).

### 4. Lancer le serveur

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

## 🎯 Fonctionnalités principales

### ✅ Déjà implémenté

- [x] **Panier** : Ajout, modification, suppression de produits
- [x] **Checkout multi-étapes** : 4 étapes fluides
- [x] **Paiement en ligne** : PayTech (Orange Money, Wave, CB)
- [x] **Paiement à la livraison** : Espèces
- [x] **Guest checkout** : Commandes sans compte
- [x] **Gestion du stock** : Vérification et mise à jour automatique
- [x] **Webhooks PayTech** : Notifications de paiement (IPN)
- [x] **Zones de livraison** : Dakar, Thiès, Autres (avec frais)
- [x] **Page de confirmation** : Adaptée selon le mode de paiement
- [x] **Sécurité** : Rate limiting, validation Zod, signatures SHA256

### 🚧 En cours / À venir

- [ ] Emails de confirmation (Resend)
- [ ] Dashboard admin pour gérer les commandes
- [ ] Système de coupons/promotions
- [ ] Tracking de livraison
- [ ] Analytics de conversion
- [ ] Tests automatisés

## 📋 Structure du projet

```
├── app/
│   ├── checkout/              # Pages de checkout
│   ├── api/paytech/           # API routes PayTech
│   └── ...
├── components/
│   ├── checkout/              # Composants de checkout
│   ├── cart/                  # Composants du panier
│   └── ...
├── lib/
│   ├── paytech/               # Configuration et API PayTech
│   ├── validations/           # Schémas Zod
│   └── ...
├── server/
│   └── actions/
│       └── checkout.ts        # Server actions
├── hooks/
│   ├── use-checkout.ts        # Hook de checkout
│   └── use-cart.ts            # Hook de panier
├── docs/                      # Documentation
├── prisma/                    # Schema et migrations
└── ...
```

## 🔐 Sécurité

- **Rate limiting** : Protection contre les abus
- **Validation Zod** : Toutes les entrées sont validées
- **Signatures SHA256** : Vérification des webhooks PayTech
- **HTTPS** : Communication cryptée avec PayTech
- **Pas de données sensibles** : Aucune donnée bancaire stockée

## 🌍 Zones de livraison

| Zone | Frais | Délai |
|------|-------|-------|
| Dakar | 2 000 CFA | < 24h |
| Thiès | 3 000 CFA | 24-48h |
| Autres | 5 000 CFA | 48-72h |

## 💳 Modes de paiement

- 🟠 **Orange Money** (via PayTech)
- 🔵 **Wave** (via PayTech)
- 💳 **Carte Bancaire** - Visa, Mastercard (via PayTech)
- 💵 **Paiement à la livraison** (géré en interne)

## 📊 Statuts

### Commandes (OrderStatus)
- `PENDING` : En attente de paiement
- `CONFIRMED` : Confirmée (payée)
- `PROCESSING` : En préparation
- `SHIPPED` : Expédiée
- `DELIVERED` : Livrée
- `CANCELLED` : Annulée

### Paiements (PaymentStatus)
- `PENDING` : En attente
- `PROCESSING` : En cours
- `PAID` : Payé
- `FAILED` : Échoué
- `CANCELLED` : Annulé
- `REFUNDED` : Remboursé

## 🧪 Tests

Voir le [guide de test complet](./TESTING_GUIDE.md) pour :
- Tester le panier
- Tester le checkout (en ligne et cash)
- Tester les webhooks PayTech
- Tester la sécurité
- Valider avant production

## 📞 Support

Pour toute question ou problème :

- **PayTech** : https://paytech.sn/documentation
- **Support PayTech** : support@paytech.sn
- **Issues GitHub** : [Lien vers les issues]

## 📝 Changelog

### Version 1.0.0 (2025-10-09)
- ✅ Système de panier complet
- ✅ Checkout multi-étapes
- ✅ Intégration PayTech
- ✅ Paiement à la livraison
- ✅ Gestion automatique du stock
- ✅ Webhooks PayTech
- ✅ Guest checkout
- ✅ Documentation complète

## 🙏 Remerciements

- PayTech.sn pour la passerelle de paiement
- Next.js pour le framework
- Prisma pour l'ORM
- Shadcn/ui pour les composants UI

---

**Dernière mise à jour** : 2025-10-09  
**Version** : 1.0.0
