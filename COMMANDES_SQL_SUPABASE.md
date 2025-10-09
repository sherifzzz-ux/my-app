# 🔧 Commandes SQL à Exécuter dans Supabase

## Instructions

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Copiez et exécutez les commandes ci-dessous **dans l'ordre**

---

## 📋 ÉTAPE 1 : Ajouter toutes les colonnes manquantes

Copiez et exécutez ce bloc complet :

```sql
-- Ajout des colonnes d'informations de base
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- Ajout des colonnes pour Guest Checkout
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestEmail" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestPhone" TEXT;

-- Ajout des colonnes d'adresse de livraison
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingAddress" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "ville" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "quartier" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "adresseDetaillee" TEXT;

-- Ajout des colonnes de livraison
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingZone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCents" INTEGER DEFAULT 0;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingFees" DECIMAL(10,2) DEFAULT 0;

-- Ajout des colonnes de paiement
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paytechRef" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paytechToken" TEXT;

-- Ajout des colonnes financières et notes
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "subtotalCents" INTEGER DEFAULT 0;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNote" TEXT;
```

---

## 📋 ÉTAPE 2 : Générer les numéros de commande

```sql
-- Mettre à jour les orderNumber NULL avec un numéro unique
UPDATE "Order" 
SET "orderNumber" = 'ORD-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || LPAD(id::text, 6, '0')
WHERE "orderNumber" IS NULL;
```

---

## 📋 ÉTAPE 3 : Rendre orderNumber obligatoire et unique

```sql
-- Rendre orderNumber obligatoire
ALTER TABLE "Order" ALTER COLUMN "orderNumber" SET NOT NULL;

-- Ajouter une contrainte d'unicité
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");

-- Créer un index pour les performances
CREATE INDEX IF NOT EXISTS "Order_orderNumber_idx" ON "Order"("orderNumber");
```

---

## ✅ ÉTAPE 4 : Vérifier que tout est OK

Exécutez cette requête pour vérifier que toutes les colonnes sont présentes :

```sql
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order'
ORDER BY ordinal_position;
```

Vous devriez maintenant voir **30 colonnes** au lieu de 6 :
- ✅ id
- ✅ status
- ✅ totalCents
- ✅ createdAt
- ✅ updatedAt
- ✅ userId
- ✅ **orderNumber** ← La colonne qui manquait
- ✅ email
- ✅ firstName
- ✅ lastName
- ✅ phone
- ✅ guestEmail
- ✅ guestName
- ✅ guestPhone
- ✅ shippingAddress
- ✅ shippingName
- ✅ shippingPhone
- ✅ shippingCity
- ✅ ville
- ✅ quartier
- ✅ adresseDetaillee
- ✅ shippingZone
- ✅ shippingCents
- ✅ shippingFees
- ✅ paymentMethod
- ✅ paymentStatus
- ✅ paytechRef
- ✅ paytechToken
- ✅ subtotalCents
- ✅ orderNote

---

## 🔍 ÉTAPE 5 : Tester avec une requête

Pour vérifier que vous pouvez maintenant créer des commandes avec orderNumber :

```sql
SELECT 
  COUNT(*) as total_colonnes,
  COUNT(CASE WHEN column_name = 'orderNumber' THEN 1 END) as orderNumber_presente
FROM information_schema.columns
WHERE table_name = 'Order';
```

Résultat attendu :
- `total_colonnes` : 30
- `orderNumber_presente` : 1

---

## 🎯 Après l'exécution

Une fois **TOUTES** ces commandes exécutées (y compris l'ÉTAPE 6 sur userId) :

1. ✅ L'erreur `The column orderNumber does not exist` sera résolue
2. ✅ L'erreur `Null constraint violation on userId` sera résolue
3. ✅ Le guest checkout fonctionnera (commandes sans compte utilisateur)
4. ✅ Le checkout fonctionnera normalement pour les utilisateurs connectés
5. ✅ Les commandes pourront être créées avec tous les champs nécessaires

---

---

## 📋 ÉTAPE 6 : Rendre userId nullable (GUEST CHECKOUT)

**⚠️ IMPORTANT** : Cette étape est **CRITIQUE** pour permettre le guest checkout !

```sql
-- Supprimer la contrainte de clé étrangère
ALTER TABLE "Order" 
DROP CONSTRAINT IF EXISTS "Order_userId_fkey";

-- Rendre userId nullable
ALTER TABLE "Order" 
ALTER COLUMN "userId" DROP NOT NULL;

-- Recréer la contrainte FK avec ON DELETE SET NULL
ALTER TABLE "Order" 
ADD CONSTRAINT "Order_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "User"("id") 
ON DELETE SET NULL 
ON UPDATE CASCADE;
```

---

## 📋 ÉTAPE 7 : Vérifier userId nullable

```sql
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order' AND column_name = 'userId';
```

**Résultat attendu** :
```
column_name | data_type | is_nullable | column_default
userId      | text      | YES         | null
```

✅ Si `is_nullable = YES`, le guest checkout est maintenant possible !

---

## ⚠️ Note Importante

Si vous avez déjà des commandes dans la base de données (actuellement 0 d'après le diagnostic), elles recevront automatiquement un `orderNumber` généré avec le format : `ORD-YYYYMMDD-XXXXXX`

## 📝 Problèmes d'Images

Les erreurs 404 sur les images sont un problème séparé. Vérifiez que :
1. Les fichiers existent bien dans `/public/images/`
2. Les noms correspondent exactement : `shampoing.jpg`, `fond-teint.jpg`, `vitamines.jpg`
3. Les chemins d'accès sont corrects dans votre code

Pour corriger les images manquantes, vous pouvez soit :
- Ajouter les images dans `/public/images/`
- Ou modifier les références dans votre code pour utiliser des images existantes
