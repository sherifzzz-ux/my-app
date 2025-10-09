# 🔧 Correction de la contrainte userId pour Guest Checkout

## 🚨 Problème

Vous recevez cette erreur lors du checkout :

```
Null constraint violation on the fields: (`userId`)
```

**Cause** : La colonne `userId` dans la table `Order` est définie comme `NOT NULL`, mais le code essaie de créer des commandes avec `userId = null` pour les **guests** (utilisateurs non connectés).

## ✅ Solution

Rendre la colonne `userId` **nullable** pour permettre le guest checkout.

---

## 📋 Commande SQL à Exécuter

### Dans Supabase SQL Editor

Copiez et exécutez cette commande :

```sql
-- Rendre userId nullable
ALTER TABLE "Order" 
ALTER COLUMN "userId" DROP NOT NULL;
```

---

## 🔍 Vérifier que c'est corrigé

Exécutez cette requête pour vérifier :

```sql
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order' 
  AND column_name = 'userId';
```

**Résultat attendu :**
- `is_nullable` doit être `YES` (et non `NO`)

---

## 🎯 Après l'exécution

Une fois cette commande exécutée :

1. ✅ Les **utilisateurs connectés** pourront toujours passer commande (userId renseigné)
2. ✅ Les **guests** (non connectés) pourront aussi passer commande (userId = null)
3. ✅ L'erreur `Null constraint violation on the fields: (userId)` sera résolue
4. ✅ Le checkout fonctionnera pour tous les types de clients

---

## 📊 Impact sur les données

### Contraintes conservées

La contrainte de **clé étrangère** `Order_userId_fkey` reste en place :
- Elle permet `userId = NULL` (pour les guests)
- Elle vérifie que les `userId` non-NULL correspondent bien à des utilisateurs existants
- Les commandes restent liées aux utilisateurs quand c'est applicable

### Aucune perte de données

Cette modification :
- ✅ Ne supprime aucune donnée
- ✅ Ne modifie aucune commande existante
- ✅ Permet simplement de créer de nouvelles commandes sans userId

---

## 🧪 Test après correction

Pour tester que tout fonctionne :

1. **Testez le checkout en tant que guest** (non connecté)
   - Ajoutez un produit au panier
   - Allez au checkout
   - Remplissez le formulaire
   - Finalisez la commande
   - ✅ Devrait fonctionner sans erreur

2. **Testez le checkout en tant qu'utilisateur connecté**
   - Connectez-vous
   - Ajoutez un produit au panier
   - Allez au checkout
   - Finalisez la commande
   - ✅ La commande devrait être liée à votre compte

3. **Vérifiez dans la base de données**
```sql
-- Voir les commandes créées
SELECT 
  id,
  "orderNumber",
  userId,
  guestEmail,
  guestName,
  status,
  totalCents,
  "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

## 📝 Note sur l'architecture

### Distinction Guest vs User

Le système identifie les commandes ainsi :

**Guest Checkout** (userId = null) :
- `userId` : NULL
- `guestEmail` : email du guest
- `guestName` : nom du guest
- `guestPhone` : téléphone du guest

**User Checkout** (userId renseigné) :
- `userId` : ID de l'utilisateur
- `email`, `firstName`, `lastName`, `phone` : infos de l'utilisateur
- `guestEmail`, `guestName`, `guestPhone` : NULL

Cela permet de gérer les deux types de commandes dans la même table tout en gardant la traçabilité.
