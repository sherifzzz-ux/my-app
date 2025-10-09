# Documentation de la Base de Données FlawlessBeauty

## État du Diagnostic (2025-10-09)

### 📊 Vue d'ensemble

La base de données contient **21 tables** avec un total de **1005 colonnes** et **69 contraintes**.

---

## 🔴 PROBLÈMES CRITIQUES DÉTECTÉS

### ⚠️ Table `Order` - Colonnes manquantes (23 colonnes)

**Statut**: ❌ **CRITIQUE** - La table Order est incomplète et cause des erreurs d'exécution.

**Erreur rencontrée**:
```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

#### Colonnes actuelles (6/29):
| Colonne | Type | Default | Nullable |
|---------|------|---------|----------|
| id | text | - | NO |
| status | OrderStatus | 'PENDING' | NO |
| totalCents | integer | 0 | NO |
| createdAt | timestamp | CURRENT_TIMESTAMP | NO |
| updatedAt | timestamp | - | NO |
| userId | text | - | NO |

#### Colonnes manquantes (23):
1. ❌ `orderNumber` - Numéro de commande unique
2. ❌ `firstName` - Prénom du client
3. ❌ `lastName` - Nom du client
4. ❌ `email` - Email du client
5. ❌ `phone` - Téléphone du client
6. ❌ `ville` - Ville de livraison
7. ❌ `quartier` - Quartier de livraison
8. ❌ `adresseDetaillee` - Adresse détaillée
9. ❌ `orderNote` - Note de commande (optionnel)
10. ❌ `guestEmail` - Email invité (legacy)
11. ❌ `guestName` - Nom invité (legacy)
12. ❌ `guestPhone` - Téléphone invité (legacy)
13. ❌ `shippingName` - Nom livraison (legacy)
14. ❌ `shippingPhone` - Téléphone livraison (legacy)
15. ❌ `shippingAddress` - Adresse livraison (legacy)
16. ❌ `shippingCity` - Ville livraison (legacy)
17. ❌ `shippingZone` - Zone de livraison (ENUM)
18. ❌ `shippingFees` - Frais de livraison
19. ❌ `paymentMethod` - Méthode de paiement (ENUM)
20. ❌ `paymentStatus` - Statut du paiement (ENUM)
21. ❌ `paytechToken` - Token PayTech
22. ❌ `paytechRef` - Référence PayTech
23. ❌ `subtotalCents` - Sous-total
24. ❌ `shippingCents` - Frais de livraison en centimes

### 🔧 SOLUTION

**Un script de correction complet existe**: `scripts/sql/02-fix-order-table.sql`

**Instructions pour corriger la base de données**:

```bash
# 1. Se connecter à Supabase SQL Editor
# 2. Copier le contenu de scripts/sql/02-fix-order-table.sql
# 3. Exécuter le script dans l'ordre

# Le script effectue automatiquement :
# - Création des ENUMs manquants (ShippingZone, PaymentMethod, PaymentStatus)
# - Ajout de toutes les colonnes manquantes
# - Migration des données existantes (si applicable)
# - Ajout des contraintes (UNIQUE, NOT NULL)
```

**Ou via Prisma**:
```bash
# Alternative : Utiliser Prisma pour synchroniser le schéma
npx prisma db push --accept-data-loss
```

⚠️ **ATTENTION**: Sauvegardez vos données avant d'exécuter ces commandes !

---

## 📋 Structure Complète des Tables

### 1. Table `User` ✅
**Fonction**: Gestion des utilisateurs

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| email | text | - | NO | UNIQUE |
| name | text | - | YES | - |
| password | text | - | YES | - |
| createdAt | timestamp | now() | NO | - |
| updatedAt | timestamp | - | NO | - |

**Relations**:
- `orders` → Order[] (1-N)
- `reviews` → Review[] (1-N)
- `cart` → Cart (1-1)
- `addresses` → Address[] (1-N)
- `favorites` → UserFavorite[] (1-N)

**Statistiques**: 3 utilisateurs enregistrés

---

### 2. Table `Category` ✅
**Fonction**: Catégories principales de produits

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| name | text | - | NO | UNIQUE |
| slug | text | - | NO | UNIQUE |
| imageUrl | text | - | YES | - |
| createdAt | timestamp | now() | NO | - |
| updatedAt | timestamp | - | NO | - |

**Relations**:
- `products` → Product[] (1-N)
- `subcategories` → Subcategory[] (1-N)

**Statistiques**: 10 catégories créées

---

### 3. Table `Subcategory` ✅
**Fonction**: Sous-catégories de produits

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| name | text | - | NO | - |
| slug | text | - | NO | UNIQUE |
| categoryId | text | - | NO | FOREIGN KEY → Category.id |

**Relations**:
- `category` → Category (N-1)
- `products` → Product[] (1-N)

**Statistiques**: 46 sous-catégories créées

---

### 4. Table `Brand` ✅
**Fonction**: Marques de produits

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| name | text | - | NO | UNIQUE |
| slug | text | - | NO | UNIQUE |
| imageUrl | text | - | YES | - |
| createdAt | timestamp | now() | NO | - |
| updatedAt | timestamp | - | NO | - |

**Relations**:
- `products` → Product[] (1-N)

**Statistiques**: 30 marques créées

---

### 5. Table `Product` ✅
**Fonction**: Produits du catalogue

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| name | text | - | NO | - |
| description | text | - | YES | - |
| priceCents | integer | 0 | NO | - |
| imageUrl | text | - | YES | - |
| categoryId | text | - | NO | FOREIGN KEY → Category.id |
| subcategoryId | text | - | YES | FOREIGN KEY → Subcategory.id |
| brandId | text | - | YES | FOREIGN KEY → Brand.id |
| oldPriceCents | integer | - | YES | - |
| isFeatured | boolean | false | NO | - |
| rating | float | 0 | YES | - |
| stock | integer | 0 | NO | - |
| createdAt | timestamp | now() | NO | - |
| updatedAt | timestamp | - | NO | - |

**Relations**:
- `category` → Category (N-1)
- `subcategory` → Subcategory (N-1)
- `brand` → Brand (N-1)
- `reviews` → Review[] (1-N)
- `orderItems` → OrderItem[] (1-N)
- `cartItems` → CartItem[] (1-N)
- `favorites` → UserFavorite[] (1-N)

**Statistiques**: 16 produits créés

---

### 6. Table `Order` ❌ (INCOMPLÈTE)
**Fonction**: Commandes clients

**Voir section "PROBLÈMES CRITIQUES" ci-dessus pour les détails complets**

**Relations**:
- `user` → User (N-1, optionnel pour guest checkout)
- `items` → OrderItem[] (1-N)

**Statistiques**: 0 commandes (table vide)

---

### 7. Table `OrderItem` ✅
**Fonction**: Articles d'une commande

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| quantity | integer | 1 | NO | - |
| unitPriceCents | integer | 0 | NO | - |
| orderId | text | - | NO | FOREIGN KEY → Order.id |
| productId | text | - | NO | FOREIGN KEY → Product.id |

**Relations**:
- `order` → Order (N-1)
- `product` → Product (N-1)

**Statistiques**: 0 items (table vide)

---

### 8. Table `Cart` ✅
**Fonction**: Panier utilisateur

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| userId | text | - | NO | FOREIGN KEY → User.id, UNIQUE |
| createdAt | timestamp | now() | NO | - |
| updatedAt | timestamp | - | NO | - |

**Relations**:
- `user` → User (1-1)
- `items` → CartItem[] (1-N)

**Statistiques**: 3 paniers créés

---

### 9. Table `CartItem` ✅
**Fonction**: Articles du panier

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| quantity | integer | 1 | NO | - |
| cartId | text | - | NO | FOREIGN KEY → Cart.id |
| productId | text | - | NO | FOREIGN KEY → Product.id |

**Relations**:
- `cart` → Cart (N-1)
- `product` → Product (N-1)

**Statistiques**: 0 items (table vide)

---

### 10. Table `Review` ✅
**Fonction**: Avis clients sur les produits

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| rating | integer | - | NO | - |
| comment | text | - | YES | - |
| productId | text | - | NO | FOREIGN KEY → Product.id |
| userId | text | - | NO | FOREIGN KEY → User.id |
| createdAt | timestamp | now() | NO | - |

**Relations**:
- `product` → Product (N-1)
- `user` → User (N-1)

---

### 11. Table `Address` ✅
**Fonction**: Adresses de livraison des utilisateurs

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| name | text | - | NO | - |
| phone | text | - | NO | - |
| city | text | - | NO | - |
| addressLine1 | text | - | NO | - |
| addressLine2 | text | - | YES | - |
| isDefault | boolean | false | NO | - |
| userId | text | - | NO | FOREIGN KEY → User.id |
| createdAt | timestamp | now() | NO | - |
| updatedAt | timestamp | - | NO | - |

**Relations**:
- `user` → User (N-1)

---

### 12. Table `UserFavorite` ✅
**Fonction**: Wishlist / Produits favoris

| Colonne | Type | Default | Nullable | Contrainte |
|---------|------|---------|----------|------------|
| id | text | cuid() | NO | PRIMARY KEY |
| userId | text | - | NO | FOREIGN KEY → User.id |
| productId | text | - | NO | FOREIGN KEY → Product.id |
| createdAt | timestamp | now() | NO | - |

**Contraintes supplémentaires**:
- UNIQUE (userId, productId) - Un utilisateur ne peut favoriser un produit qu'une fois

**Relations**:
- `user` → User (N-1)
- `product` → Product (N-1)

---

### 13-21. Tables Supabase (Legacy/Système)

Ces tables semblent être des tables legacy ou créées par Supabase:

- `contact_messages` - Messages de contact (48 colonnes)
- `newsletter_subscribers` - Abonnés newsletter (20 colonnes)
- `order_items` - Duplicate OrderItem? (100 colonnes)
- `orders` - Duplicate Order? (112 colonnes)
- `profiles` - Profils utilisateurs (21 colonnes)
- `shipping_methods` - Méthodes de livraison (32 colonnes)
- `user_addresses` - Duplicate Address? (80 colonnes)
- `user_favorites` - Duplicate UserFavorite? (28 colonnes)
- `user_roles` - Rôles utilisateurs (28 colonnes)
- `user_suspensions` - Suspensions utilisateurs (56 colonnes)

⚠️ **Note**: Ces tables peuvent être en doublon avec les tables Prisma. Un audit et une consolidation sont recommandés.

---

## 📊 Types ENUM

### OrderStatus
```sql
CREATE TYPE "OrderStatus" AS ENUM (
  'PENDING',      -- En attente de paiement
  'CONFIRMED',    -- Confirmée (payée) - ❌ MANQUANT dans la base
  'PROCESSING',   -- En préparation - ❌ MANQUANT dans la base
  'PAID',         -- Payé - ✅ EXISTE dans la base
  'SHIPPED',      -- Expédiée - ✅ EXISTE dans la base
  'DELIVERED',    -- Livrée - ❌ MANQUANT dans la base
  'CANCELLED'     -- Annulée - ✅ EXISTE dans la base
);
```

**Valeurs actuelles dans la base**: PENDING, PAID, SHIPPED, CANCELLED

⚠️ **Incohérence**: Le schéma Prisma définit CONFIRMED, PROCESSING, DELIVERED mais la base n'a que PAID.

### PaymentStatus (❌ MANQUANT)
```sql
CREATE TYPE "PaymentStatus" AS ENUM (
  'PENDING',
  'PROCESSING',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED'
);
```

### PaymentMethod (❌ MANQUANT)
```sql
CREATE TYPE "PaymentMethod" AS ENUM (
  'ORANGE_MONEY',
  'WAVE',
  'CARD',
  'CASH_ON_DELIVERY'
);
```

### ShippingZone (❌ MANQUANT)
```sql
CREATE TYPE "ShippingZone" AS ENUM (
  'DAKAR',
  'THIES',
  'AUTRE'
);
```

---

## 🔗 Relations Clés

### User Relations
```
User
 ├── orders (1-N) → Order
 ├── reviews (1-N) → Review
 ├── cart (1-1) → Cart
 ├── addresses (1-N) → Address
 └── favorites (1-N) → UserFavorite
```

### Product Relations
```
Product
 ├── category (N-1) → Category
 ├── subcategory (N-1) → Subcategory (optional)
 ├── brand (N-1) → Brand (optional)
 ├── reviews (1-N) → Review
 ├── orderItems (1-N) → OrderItem
 ├── cartItems (1-N) → CartItem
 └── favorites (1-N) → UserFavorite
```

### Order Relations
```
Order
 ├── user (N-1) → User (optional, pour guest checkout)
 └── items (1-N) → OrderItem
```

---

## 📈 Statistiques de Données

| Table | Nombre d'enregistrements |
|-------|--------------------------|
| Brand | 30 |
| Category | 10 |
| Subcategory | 46 |
| Product | 16 |
| User | 3 |
| Cart | 3 |
| CartItem | 0 |
| Order | 0 |
| OrderItem | 0 |

**Total**: 108 enregistrements dans les tables principales

---

## 🚨 Actions Requises (Par Priorité)

### 🔴 CRITIQUE (Bloquant)
1. **Exécuter `scripts/sql/02-fix-order-table.sql`** pour corriger la table Order
   - Ajoute les 23 colonnes manquantes
   - Crée les ENUMs manquants
   - Permet la création de commandes

### 🟡 IMPORTANT (Recommandé)
2. **Synchroniser les ENUMs OrderStatus**
   - Décider entre PAID vs CONFIRMED
   - Harmoniser le schéma Prisma et la base de données

3. **Auditer les tables en doublon**
   - Vérifier `orders` vs `Order`
   - Vérifier `order_items` vs `OrderItem`
   - Vérifier `user_addresses` vs `Address`
   - Vérifier `user_favorites` vs `UserFavorite`
   - Décider de conserver Prisma ou les tables legacy

### 🟢 OPTIONNEL (Amélioration)
4. **Ajouter des index de performance**
   - Index sur `Product.categoryId`
   - Index sur `Product.brandId`
   - Index sur `Order.orderNumber`
   - Index sur `Order.userId`

5. **Ajouter des contraintes de données**
   - CHECK constraint sur `Product.priceCents >= 0`
   - CHECK constraint sur `Review.rating` BETWEEN 1 AND 5
   - CHECK constraint sur `CartItem.quantity > 0`

---

## 📝 Notes

### Schéma Prisma
Le fichier `prisma/schema.prisma` est **à jour** et contient toutes les définitions nécessaires. Le problème vient du fait que la base de données n'a pas été synchronisée avec le schéma.

### Migrations Prisma
Pour éviter les problèmes futurs, utilisez toujours les migrations Prisma:
```bash
# Créer une migration
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy
```

### Backup Recommandé
Avant toute modification majeure:
```sql
-- Backup de la table Order
CREATE TABLE "Order_backup" AS SELECT * FROM "Order";

-- Backup de toute la base
pg_dump -h <host> -U <user> -d <database> > backup.sql
```

---

## 🔄 Dernière Mise à Jour

**Date**: 2025-10-09  
**Source**: `scripts/sql/01-diagnostic-database.sql`  
**Statut**: ❌ Base de données incomplète - Correctifs requis
