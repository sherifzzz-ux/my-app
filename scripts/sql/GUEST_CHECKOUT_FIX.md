# 🔧 Correction du Guest Checkout - userId nullable

## Problème

L'erreur actuelle :
```
Null constraint violation on the fields: (`userId`)
```

**Cause** : La base de données PostgreSQL a la contrainte `NOT NULL` sur le champ `userId` de la table `Order`, mais le code essaie de créer des commandes sans `userId` pour le guest checkout.

## Solution

Rendre le champ `userId` nullable dans PostgreSQL pour permettre les commandes sans compte utilisateur.

---

## 📋 Instructions Supabase SQL Editor

### Étape 1 : Copier et exécuter ce SQL

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

### Étape 2 : Vérifier que ça a fonctionné

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

✅ Si `is_nullable = YES`, c'est bon !

---

## 📝 Ce que ça change

### Avant
- ❌ Seuls les utilisateurs connectés pouvaient passer commande
- ❌ Erreur `Null constraint violation` au checkout guest

### Après
- ✅ **Utilisateurs connectés** : `userId` contient l'ID du user
- ✅ **Utilisateurs invités** : `userId = null`
- ✅ Les infos client sont dans `firstName`, `lastName`, `email`, `phone`, etc.

---

## 🧪 Tester le Guest Checkout

Après avoir exécuté le SQL :

1. Allez sur le site en mode navigation privée (non connecté)
2. Ajoutez des produits au panier
3. Allez au checkout
4. Remplissez le formulaire avec vos informations
5. Validez la commande

✅ **Résultat attendu** : La commande est créée avec succès sans erreur

---

## ⚠️ Note de Sécurité

La contrainte `ON DELETE SET NULL` signifie que si un utilisateur supprime son compte, ses commandes ne seront pas supprimées, mais le champ `userId` sera mis à `null`. Les informations de commande (nom, email, etc.) seront conservées dans les champs dédiés.

Cela permet de :
- Garder l'historique des commandes
- Respecter les obligations légales de conservation
- Permettre le guest checkout

---

## 🔍 Vérification dans l'interface Supabase

Après l'exécution :

1. Allez dans **Table Editor** → **Order**
2. Cliquez sur la colonne `userId`
3. Vérifiez que **"Is Nullable"** est coché (✅)
4. Vérifiez que la **Foreign Key** pointe vers `User.id`

---

## 📊 Impact sur les données existantes

Si vous avez déjà des commandes dans la base (actuellement 0 d'après le diagnostic) :
- ✅ Elles conserveront leur `userId` existant
- ✅ Aucune donnée ne sera perdue
- ✅ Les nouvelles commandes pourront avoir `userId = null`

---

## 🚀 Prochaines étapes

Une fois ce script exécuté :

1. ✅ Le guest checkout fonctionnera
2. ✅ L'erreur `Null constraint violation` sera résolue
3. ✅ Les utilisateurs pourront commander sans créer de compte
4. ✅ Les commandes seront suivies via `orderNumber`, `email`, et autres champs

---

## 💡 Rappel : Schéma Prisma

Le schéma Prisma est déjà correct :

```prisma
model Order {
  id      String  @id @default(cuid())
  userId  String? // ← Déjà nullable dans Prisma
  user    User?   @relation(fields: [userId], references: [id])
  // ...
}
```

C'est juste la base de données PostgreSQL qui n'était pas synchronisée avec le schéma Prisma.
