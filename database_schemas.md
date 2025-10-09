# Documentation de la base de données FlawlessBeauty

## 📊 Vue d'ensemble

Cette documentation décrit la structure complète de la base de données PostgreSQL du projet FlawlessBeauty.

---

## 🔍 État actuel de la base de données (Diagnostic)

### Tables existantes

| Table                  | Type       | Nombre de lignes | Statut |
|------------------------|------------|------------------|--------|
| Address                | BASE TABLE | -                | ✅ OK  |
| Brand                  | BASE TABLE | 30               | ✅ OK  |
| Cart                   | BASE TABLE | 3                | ✅ OK  |
| CartItem               | BASE TABLE | 0                | ✅ OK  |
| Category               | BASE TABLE | 10               | ✅ OK  |
| **Order**              | BASE TABLE | 0                | ⚠️ INCOMPLET |
| OrderItem              | BASE TABLE | 0                | ✅ OK  |
| Product                | BASE TABLE | 16               | ✅ OK  |
| Review                 | BASE TABLE | 0                | ✅ OK  |
| Subcategory            | BASE TABLE | 46               | ✅ OK  |
| User                   | BASE TABLE | 3                | ✅ OK  |
| contact_messages       | BASE TABLE | -                | ⚠️ Legacy |
| newsletter_subscribers | BASE TABLE | -                | ⚠️ Legacy |
| order_items            | BASE TABLE | -                | ⚠️ Legacy |
| orders                 | BASE TABLE | -                | ⚠️ Legacy |
| profiles               | BASE TABLE | -                | ⚠️ Legacy |
| shipping_methods       | BASE TABLE | -                | ⚠️ Legacy |
| user_addresses         | BASE TABLE | -                | ⚠️ Legacy |
| user_favorites         | BASE TABLE | -                | ⚠️ Legacy |
| user_roles             | BASE TABLE | -                | ⚠️ Legacy |
| user_suspensions       | BASE TABLE | -                | ⚠️ Legacy |

### ⚠️ Problème identifié : Table `Order` incomplète

**Colonnes actuelles** (6 colonnes) :
- ✅ id
- ✅ status
- ✅ totalCents
- ✅ createdAt
- ✅ updatedAt
- ✅ userId

**Colonnes manquantes** (23 colonnes) :
- ❌ orderNumber
- ❌ firstName
- ❌ lastName
- ❌ email
- ❌ phone
- ❌ ville
- ❌ quartier
- ❌ adresseDetaillee
- ❌ orderNote
- ❌ guestEmail
- ❌ guestName
- ❌ guestPhone
- ❌ shippingName
- ❌ shippingPhone
- ❌ shippingAddress
- ❌ shippingCity
- ❌ shippingZone
- ❌ shippingFees
- ❌ paymentMethod
- ❌ paymentStatus
- ❌ paytechToken
- ❌ paytechRef
- ❌ subtotalCents
- ❌ shippingCents

---

## 📋 Schéma Prisma complet

### Enums

#### OrderStatus
```typescript
enum OrderStatus {
  PENDING      // En attente de paiement
  CONFIRMED    // Confirmée (payée)
  PROCESSING   // En préparation
  SHIPPED      // Expédiée
  DELIVERED    // Livrée
  CANCELLED    // Annulée
}
```

**État actuel dans la DB** : ⚠️ Incomplet
- ✅ PENDING
- ❌ CONFIRMED (manquant)
- ❌ PROCESSING (manquant)
- ✅ SHIPPED
- ❌ DELIVERED (manquant)
- ✅ CANCELLED

#### PaymentStatus
```typescript
enum PaymentStatus {
  PENDING      // En attente
  PROCESSING   // En cours
  PAID         // Payé
  FAILED       // Échoué
  CANCELLED    // Annulé
  REFUNDED     // Remboursé
}
```

**État actuel dans la DB** : ❌ N'existe pas

#### PaymentMethod
```typescript
enum PaymentMethod {
  ORANGE_MONEY
  WAVE
  CARD
  CASH_ON_DELIVERY  // Paiement à la livraison
}
```

**État actuel dans la DB** : ❌ N'existe pas

#### ShippingZone
```typescript
enum ShippingZone {
  DAKAR
  THIES
  AUTRE
}
```

**État actuel dans la DB** : ❌ N'existe pas

---

## 📦 Modèles de données

### 1. User (Utilisateur)

**Colonnes** :
- `id` : String (CUID, PK)
- `email` : String (unique)
- `name` : String (nullable)
- `password` : String (nullable)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Relations** :
- `orders` : Order[] (1-N)
- `reviews` : Review[] (1-N)
- `cart` : Cart (1-1)
- `addresses` : Address[] (1-N)
- `favorites` : UserFavorite[] (1-N)

**Statut** : ✅ Complet

---

### 2. Category (Catégorie)

**Colonnes** :
- `id` : String (CUID, PK)
- `name` : String (unique)
- `slug` : String (unique)
- `imageUrl` : String (nullable)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Relations** :
- `products` : Product[] (1-N)
- `subcategories` : Subcategory[] (1-N)

**Statut** : ✅ Complet

---

### 3. Subcategory (Sous-catégorie)

**Colonnes** :
- `id` : String (CUID, PK)
- `name` : String
- `slug` : String (unique)
- `categoryId` : String (FK → Category.id)

**Relations** :
- `category` : Category (N-1)
- `products` : Product[] (1-N)

**Statut** : ✅ Complet

---

### 4. Brand (Marque)

**Colonnes** :
- `id` : String (CUID, PK)
- `name` : String (unique)
- `slug` : String (unique)
- `imageUrl` : String (nullable)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Relations** :
- `products` : Product[] (1-N)

**Statut** : ✅ Complet

---

### 5. Product (Produit)

**Colonnes** :
- `id` : String (CUID, PK)
- `name` : String
- `description` : String (nullable)
- `priceCents` : Int (défaut: 0)
- `imageUrl` : String (nullable)
- `categoryId` : String (FK → Category.id)
- `subcategoryId` : String (nullable, FK → Subcategory.id)
- `brandId` : String (nullable, FK → Brand.id)
- `oldPriceCents` : Int (nullable)
- `isFeatured` : Boolean (défaut: false)
- `rating` : Float (nullable, défaut: 0)
- `stock` : Int (défaut: 0)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Relations** :
- `category` : Category (N-1)
- `subcategory` : Subcategory (N-1, optional)
- `brand` : Brand (N-1, optional)
- `reviews` : Review[] (1-N)
- `orderItems` : OrderItem[] (1-N)
- `cartItems` : CartItem[] (1-N)
- `favorites` : UserFavorite[] (1-N)

**Statut** : ✅ Complet

---

### 6. Order (Commande) ⚠️

**Colonnes attendues** :
- `id` : String (CUID, PK)
- `orderNumber` : String (unique) ⚠️ **MANQUANT**
- `userId` : String (nullable, FK → User.id)
- `firstName` : String ⚠️ **MANQUANT**
- `lastName` : String ⚠️ **MANQUANT**
- `email` : String ⚠️ **MANQUANT**
- `phone` : String ⚠️ **MANQUANT**
- `ville` : String ⚠️ **MANQUANT**
- `quartier` : String ⚠️ **MANQUANT**
- `adresseDetaillee` : String ⚠️ **MANQUANT**
- `orderNote` : String (nullable) ⚠️ **MANQUANT**
- `guestEmail` : String (nullable) ⚠️ **MANQUANT**
- `guestName` : String (nullable) ⚠️ **MANQUANT**
- `guestPhone` : String (nullable) ⚠️ **MANQUANT**
- `shippingName` : String (nullable) ⚠️ **MANQUANT**
- `shippingPhone` : String (nullable) ⚠️ **MANQUANT**
- `shippingAddress` : String (nullable) ⚠️ **MANQUANT**
- `shippingCity` : String (nullable) ⚠️ **MANQUANT**
- `shippingZone` : ShippingZone (défaut: DAKAR) ⚠️ **MANQUANT**
- `shippingFees` : Int (défaut: 0) ⚠️ **MANQUANT**
- `paymentMethod` : PaymentMethod (défaut: ORANGE_MONEY) ⚠️ **MANQUANT**
- `paymentStatus` : PaymentStatus (défaut: PENDING) ⚠️ **MANQUANT**
- `paytechToken` : String (nullable) ⚠️ **MANQUANT**
- `paytechRef` : String (nullable) ⚠️ **MANQUANT**
- `subtotalCents` : Int ⚠️ **MANQUANT**
- `shippingCents` : Int ⚠️ **MANQUANT**
- `totalCents` : Int ✅ **EXISTE**
- `status` : OrderStatus (défaut: PENDING) ✅ **EXISTE**
- `createdAt` : DateTime ✅ **EXISTE**
- `updatedAt` : DateTime ✅ **EXISTE**

**Relations** :
- `user` : User (N-1, optional)
- `items` : OrderItem[] (1-N)

**Statut** : ⚠️ **INCOMPLET - 23 colonnes manquantes**

---

### 7. OrderItem (Article de commande)

**Colonnes** :
- `id` : String (CUID, PK)
- `quantity` : Int (défaut: 1)
- `unitPriceCents` : Int (défaut: 0)
- `orderId` : String (FK → Order.id)
- `productId` : String (FK → Product.id)

**Relations** :
- `order` : Order (N-1)
- `product` : Product (N-1)

**Statut** : ✅ Complet

---

### 8. Cart (Panier)

**Colonnes** :
- `id` : String (CUID, PK)
- `userId` : String (unique, FK → User.id)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Relations** :
- `user` : User (1-1)
- `items` : CartItem[] (1-N)

**Statut** : ✅ Complet

---

### 9. CartItem (Article de panier)

**Colonnes** :
- `id` : String (CUID, PK)
- `quantity` : Int (défaut: 1)
- `cartId` : String (FK → Cart.id)
- `productId` : String (FK → Product.id)

**Relations** :
- `cart` : Cart (N-1)
- `product` : Product (N-1)

**Statut** : ✅ Complet

---

### 10. Review (Avis)

**Colonnes** :
- `id` : String (CUID, PK)
- `rating` : Int
- `comment` : String (nullable)
- `productId` : String (FK → Product.id)
- `userId` : String (FK → User.id)
- `createdAt` : DateTime

**Relations** :
- `product` : Product (N-1)
- `user` : User (N-1)

**Statut** : ✅ Complet

---

### 11. Address (Adresse)

**Colonnes** :
- `id` : String (CUID, PK)
- `name` : String
- `phone` : String
- `city` : String
- `addressLine1` : String
- `addressLine2` : String (nullable)
- `isDefault` : Boolean (défaut: false)
- `userId` : String (FK → User.id)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Relations** :
- `user` : User (N-1)

**Statut** : ✅ Complet

---

### 12. UserFavorite (Favoris)

**Colonnes** :
- `id` : String (CUID, PK)
- `userId` : String (FK → User.id)
- `productId` : String (FK → Product.id)
- `createdAt` : DateTime

**Contraintes** :
- Unique constraint sur (userId, productId)

**Relations** :
- `user` : User (N-1)
- `product` : Product (N-1)

**Statut** : ✅ Complet

---

### 13. DeliveryZone (Zone de livraison)

**Colonnes** :
- `id` : String (CUID, PK)
- `name` : String (unique)
- `ville` : String
- `isActive` : Boolean (défaut: true)
- `order` : Int (défaut: 0)
- `createdAt` : DateTime
- `updatedAt` : DateTime

**Statut** : ✅ Complet

---

## 🔧 Actions requises pour corriger la base de données

### 1. Créer les ENUMs manquants

```sql
-- PaymentStatus
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- PaymentMethod
CREATE TYPE "PaymentMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY');

-- ShippingZone
CREATE TYPE "ShippingZone" AS ENUM ('DAKAR', 'THIES', 'AUTRE');
```

### 2. Mettre à jour l'ENUM OrderStatus

```sql
-- Ajouter les valeurs manquantes
ALTER TYPE "OrderStatus" ADD VALUE 'CONFIRMED';
ALTER TYPE "OrderStatus" ADD VALUE 'PROCESSING';
ALTER TYPE "OrderStatus" ADD VALUE 'DELIVERED';
```

### 3. Ajouter les colonnes manquantes à la table Order

```sql
-- Informations client
ALTER TABLE "Order" ADD COLUMN "orderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN "firstName" TEXT;
ALTER TABLE "Order" ADD COLUMN "lastName" TEXT;
ALTER TABLE "Order" ADD COLUMN "email" TEXT;
ALTER TABLE "Order" ADD COLUMN "phone" TEXT;

-- Adresse de livraison
ALTER TABLE "Order" ADD COLUMN "ville" TEXT;
ALTER TABLE "Order" ADD COLUMN "quartier" TEXT;
ALTER TABLE "Order" ADD COLUMN "adresseDetaillee" TEXT;
ALTER TABLE "Order" ADD COLUMN "orderNote" TEXT;

-- Guest checkout
ALTER TABLE "Order" ADD COLUMN "guestEmail" TEXT;
ALTER TABLE "Order" ADD COLUMN "guestName" TEXT;
ALTER TABLE "Order" ADD COLUMN "guestPhone" TEXT;

-- Shipping (legacy)
ALTER TABLE "Order" ADD COLUMN "shippingName" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingAddress" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingZone" "ShippingZone" DEFAULT 'DAKAR';
ALTER TABLE "Order" ADD COLUMN "shippingFees" INTEGER DEFAULT 0;

-- Paiement
ALTER TABLE "Order" ADD COLUMN "paymentMethod" "PaymentMethod" DEFAULT 'ORANGE_MONEY';
ALTER TABLE "Order" ADD COLUMN "paymentStatus" "PaymentStatus" DEFAULT 'PENDING';
ALTER TABLE "Order" ADD COLUMN "paytechToken" TEXT;
ALTER TABLE "Order" ADD COLUMN "paytechRef" TEXT;

-- Totaux
ALTER TABLE "Order" ADD COLUMN "subtotalCents" INTEGER;
ALTER TABLE "Order" ADD COLUMN "shippingCents" INTEGER;

-- Contraintes
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;
```

---

## 📊 Statistiques de la base de données

- **Tables actives** : 13 tables Prisma
- **Tables legacy** : 11 tables (à nettoyer)
- **Enums** : 4 types énumérés
- **Relations** : 15+ clés étrangères
- **Données** :
  - 30 marques
  - 10 catégories
  - 46 sous-catégories
  - 16 produits
  - 3 utilisateurs
  - 3 paniers

---

## 🗑️ Tables legacy à supprimer

Ces tables sont des doublons ou des anciennes versions :
- `contact_messages`
- `newsletter_subscribers`
- `order_items` (doublon de OrderItem)
- `orders` (doublon de Order)
- `profiles`
- `shipping_methods`
- `user_addresses` (doublon de Address)
- `user_favorites` (doublon de UserFavorite)
- `user_roles`
- `user_suspensions`

---

## 📝 Notes importantes

1. **Guest Checkout** : La table Order supporte les commandes avec et sans compte utilisateur (userId nullable)
2. **Paiement local** : Intégration PayTech pour Orange Money et Wave
3. **Zones de livraison** : 3 zones définies (Dakar, Thiès, Autre)
4. **Prix** : Tous les prix sont stockés en centimes (CFA)
5. **Images** : URLs stockées en String (intégration Uploadthing)

---

**Dernière mise à jour** : 2025-10-09
