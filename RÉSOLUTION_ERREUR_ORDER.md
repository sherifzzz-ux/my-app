# 🚨 Résolution de l'Erreur : The column `orderNumber` does not exist

## 📋 Résumé du Problème

### Erreur Principale
```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

### Cause
La table `Order` dans votre base de données Supabase ne contient que **6 colonnes** au lieu des **30 colonnes** attendues par votre application. Il manque 24 colonnes essentielles, dont `orderNumber` qui est critique pour le processus de checkout.

### Impact
- ❌ Le checkout ne fonctionne pas
- ❌ Les utilisateurs ne peuvent pas passer de commandes
- ❌ L'application affiche une erreur 400

---

## ✅ Solution : 3 Étapes Simples

### 📍 Étape 1 : Aller dans Supabase SQL Editor

1. Connectez-vous à votre projet Supabase
2. Cliquez sur **SQL Editor** dans le menu de gauche
3. Cliquez sur **New query**

### 📍 Étape 2 : Exécuter les Commandes SQL

Copiez et collez ce bloc complet, puis cliquez sur **Run** :

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

-- Mettre à jour les orderNumber NULL avec un numéro unique
UPDATE "Order" 
SET "orderNumber" = 'ORD-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || LPAD(id::text, 6, '0')
WHERE "orderNumber" IS NULL;

-- Rendre orderNumber obligatoire
ALTER TABLE "Order" ALTER COLUMN "orderNumber" SET NOT NULL;

-- Ajouter une contrainte d'unicité
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");

-- Créer un index pour les performances
CREATE INDEX IF NOT EXISTS "Order_orderNumber_idx" ON "Order"("orderNumber");
```

### 📍 Étape 3 : Vérifier que tout fonctionne

Exécutez cette requête pour confirmer :

```sql
SELECT 
  COUNT(*) as total_colonnes,
  COUNT(CASE WHEN column_name = 'orderNumber' THEN 1 END) as orderNumber_presente
FROM information_schema.columns
WHERE table_name = 'Order';
```

**Résultat attendu :**
- `total_colonnes` : **30** ✅
- `orderNumber_presente` : **1** ✅

---

## 🎯 Après la Correction

### Ce qui sera réparé :
✅ La colonne `orderNumber` existera  
✅ Le checkout fonctionnera normalement  
✅ Les commandes pourront être créées  
✅ L'erreur 400 disparaîtra  

### Test Final :
1. Retournez sur votre application
2. Essayez de passer une commande
3. Vérifiez qu'il n'y a plus d'erreur

---

## 📁 Fichiers de Documentation Créés

1. **`database_schemas.md`** : Documentation complète de la structure de la base de données
2. **`scripts/sql/02-fix-order-table.sql`** : Script SQL complet avec commentaires détaillés
3. **`scripts/sql/03-verify-order-table.sql`** : Script de vérification après correction
4. **`COMMANDES_SQL_SUPABASE.md`** : Guide détaillé étape par étape

---

## 📊 Détails Techniques

### Colonnes Ajoutées (24)

#### Informations de Base (5)
- `orderNumber` - Numéro de commande unique **[CRITIQUE]**
- `email` - Email du client
- `firstName` - Prénom
- `lastName` - Nom
- `phone` - Téléphone

#### Guest Checkout (3)
- `guestEmail` - Email guest
- `guestName` - Nom guest
- `guestPhone` - Téléphone guest

#### Adresse de Livraison (7)
- `shippingAddress` - Adresse complète
- `shippingName` - Nom destinataire
- `shippingPhone` - Téléphone destinataire
- `shippingCity` - Ville
- `ville` - Ville (alternatif)
- `quartier` - Quartier
- `adresseDetaillee` - Adresse détaillée

#### Livraison (3)
- `shippingZone` - Zone (Dakar, Thiès, Autres)
- `shippingCents` - Frais en centimes
- `shippingFees` - Frais décimaux

#### Paiement (4)
- `paymentMethod` - Méthode (Orange Money, Wave, CB)
- `paymentStatus` - Statut du paiement
- `paytechRef` - Référence PayTech
- `paytechToken` - Token PayTech

#### Autres (2)
- `subtotalCents` - Sous-total en centimes
- `orderNote` - Note du client

---

## ⚠️ Problèmes Secondaires (Images 404)

Les erreurs d'images sont un problème séparé :
```
❌ /images/shampoing.jpg - 404
❌ /images/fond-teint.jpg - 404
❌ /images/vitamines.jpg - 404
```

### Solutions :
1. Vérifiez que les fichiers existent dans `/public/images/`
2. Vérifiez les noms de fichiers (sensible à la casse)
3. Remplacez par des images existantes ou des placeholders

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. **Vérifiez les permissions** : Assurez-vous d'avoir les droits d'admin sur Supabase
2. **Vérifiez la connexion** : La base de données doit être accessible
3. **Relancez l'app** : Redémarrez votre application après la correction
4. **Consultez les logs** : Vérifiez les erreurs dans la console Supabase

---

## 📈 Progression

Avant :
```
Table Order : 6 colonnes ❌
Checkout : Non fonctionnel ❌
Erreur : orderNumber does not exist ❌
```

Après :
```
Table Order : 30 colonnes ✅
Checkout : Fonctionnel ✅
Erreur : Résolue ✅
```

---

## 🚀 Prochaines Étapes

Après avoir corrigé la base de données :

1. ✅ Testez le checkout complet
2. ✅ Vérifiez la création de commandes
3. ✅ Testez avec un utilisateur connecté
4. ✅ Testez avec un guest checkout
5. ✅ Configurez PayTech pour les paiements
6. ✅ Ajoutez les images manquantes

---

**Bonne chance ! 🎉**
