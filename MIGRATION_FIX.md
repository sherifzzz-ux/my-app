# Fix pour l'erreur "orderNumber does not exist"

## Problème
Le schéma Prisma a été modifié pour ajouter le champ `orderNumber` et d'autres champs pour le guest checkout, mais la migration n'a jamais été créée ou exécutée en production.

## Solution

### Option 1: Exécuter la migration en production (RECOMMANDÉ)

1. **Sur votre machine locale** avec accès à la DATABASE_URL de production :

```bash
# Assurez-vous que votre .env contient la DATABASE_URL de production
npx prisma migrate deploy
```

Cette commande va :
- Détecter les migrations non appliquées
- Appliquer la migration `20251009000000_add_order_number_and_guest_checkout`
- Ajouter tous les champs manquants à la table Order

### Option 2: Via Vercel CLI

```bash
# Connectez-vous à Vercel
vercel login

# Liez votre projet
vercel link

# Récupérez la DATABASE_URL
vercel env pull .env.local

# Exécutez la migration
npx prisma migrate deploy
```

### Option 3: Exécution manuelle du SQL

Si vous avez un accès direct à la base de données PostgreSQL, vous pouvez exécuter manuellement le fichier SQL :

```bash
psql $DATABASE_URL -f prisma/migrations/20251009000000_add_order_number_and_guest_checkout/migration.sql
```

## Vérification

Après l'exécution de la migration, vérifiez que :

1. La table `Order` a le champ `orderNumber` :
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Order' AND column_name = 'orderNumber';
```

2. Les enums sont créés :
```sql
SELECT * FROM pg_type WHERE typname IN ('PaymentStatus', 'PaymentMethod', 'ShippingZone');
```

3. Le checkout fonctionne correctement en créant une nouvelle commande

## Champs ajoutés par la migration

### Table Order
- `orderNumber` (String, unique, auto-généré)
- `firstName`, `lastName`, `email`, `phone` (infos client)
- `ville`, `quartier`, `adresseDetaillee` (adresse détaillée)
- `orderNote` (note de commande, optionnel)
- `guestEmail`, `guestName`, `guestPhone` (pour guest checkout)
- `shippingName`, `shippingPhone`, `shippingAddress`, `shippingCity` (livraison)
- `shippingZone` (DAKAR, THIES, AUTRE)
- `shippingFees`, `shippingCents` (frais de livraison)
- `paymentMethod` (ORANGE_MONEY, WAVE, CARD, CASH_ON_DELIVERY)
- `paymentStatus` (PENDING, PROCESSING, PAID, FAILED, CANCELLED, REFUNDED)
- `paytechToken`, `paytechRef` (intégration PayTech)
- `subtotalCents` (sous-total commande)
- `userId` devient nullable (guest checkout)

### Nouvelles tables
- `UserFavorite` (wishlist/favoris)
- `DeliveryZone` (zones de livraison)

### Nouveaux enums
- `PaymentStatus`
- `PaymentMethod`
- `ShippingZone`
- Modification de `OrderStatus` (ajout de CONFIRMED, PROCESSING, DELIVERED)

## Notes importantes

1. **Données existantes** : La migration inclut des valeurs par défaut pour les commandes existantes
2. **Sécurité** : Les champs sensibles restent protégés
3. **Compatibilité** : Les anciens champs sont conservés pour la rétrocompatibilité
4. **Performance** : Un index unique est créé sur `orderNumber` pour les recherches rapides

## Après la migration

Une fois la migration appliquée :

1. Redéployez l'application Vercel (si nécessaire)
2. Testez le checkout complet
3. Vérifiez que les commandes s'affichent correctement dans l'admin
4. Testez le guest checkout (commande sans connexion)

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs Vercel
2. Vérifiez les logs PostgreSQL
3. Contactez le support technique avec le message d'erreur complet
