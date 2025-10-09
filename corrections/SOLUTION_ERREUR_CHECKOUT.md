# 🔧 Solution à l'Erreur de Checkout

## ❌ Erreur Actuelle

```
Null constraint violation on the fields: (`userId`)
```

---

## 📊 Diagnostic

Le problème vient de la base de données PostgreSQL qui n'est **pas synchronisée** avec le schéma Prisma.

### Dans Prisma (schema.prisma) - ✅ Correct
```prisma
model Order {
  id      String  @id @default(cuid())
  userId  String? // ← Nullable (optionnel)
  user    User?   @relation(fields: [userId], references: [id])
  // ...
}
```

### Dans PostgreSQL - ❌ Incorrect
```sql
userId TEXT NOT NULL  -- ← Pas nullable !
```

### Dans le Code (checkout.ts) - ✅ Correct
```typescript
userId: session?.user?.id || null,  // ← Peut être null pour guest checkout
```

**Résultat** : Le code essaie de créer une commande avec `userId = null`, mais PostgreSQL refuse car la colonne a la contrainte `NOT NULL`.

---

## 🎯 Solution

Exécuter le script SQL suivant dans **Supabase SQL Editor** :

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

## 📝 Fichiers de Référence

- **Script SQL complet** : `scripts/sql/03-make-userId-nullable.sql`
- **Documentation détaillée** : `scripts/sql/GUEST_CHECKOUT_FIX.md`
- **Toutes les commandes SQL** : `COMMANDES_SQL_SUPABASE.md` (ÉTAPE 6)

---

## ✅ Après l'Exécution

Une fois le script exécuté :

1. ✅ L'erreur `Null constraint violation on userId` sera résolue
2. ✅ Le **guest checkout** fonctionnera (commandes sans compte)
3. ✅ Les utilisateurs **connectés** pourront toujours commander normalement
4. ✅ Les commandes seront suivies via :
   - `orderNumber` (unique)
   - `email`, `firstName`, `lastName`, `phone`
   - `userId` (si utilisateur connecté)

---

## 🧪 Test de Validation

### Test 1 : Guest Checkout
1. Ouvrir le site en navigation privée (non connecté)
2. Ajouter un produit au panier
3. Aller au checkout
4. Remplir le formulaire
5. Valider la commande

✅ **Attendu** : Commande créée avec succès, `userId = null`

### Test 2 : Utilisateur Connecté
1. Se connecter avec un compte
2. Ajouter un produit au panier
3. Aller au checkout
4. Valider la commande

✅ **Attendu** : Commande créée avec succès, `userId = <id de l'utilisateur>`

---

## 🔍 Vérification des Données

Pour voir les commandes dans Supabase :

```sql
SELECT 
  id,
  orderNumber,
  userId,
  firstName,
  lastName,
  email,
  totalCents,
  status,
  createdAt
FROM "Order"
ORDER BY createdAt DESC
LIMIT 10;
```

Vous devriez voir :
- Des commandes avec `userId` (utilisateurs connectés)
- Des commandes avec `userId = null` (guests)

---

## ⚠️ Important

### Pourquoi userId est nullable ?

Le guest checkout permet aux utilisateurs de commander **sans créer de compte** :
- ✅ Moins de friction
- ✅ Meilleure conversion
- ✅ Expérience utilisateur optimisée

### Données conservées pour tous

Même pour les guests, on garde :
- `orderNumber` - Numéro de commande unique
- `email` - Pour les confirmations
- `firstName`, `lastName` - Identité
- `phone` - Contact
- `ville`, `quartier`, `adresseDetaillee` - Livraison
- Tous les autres champs de commande

---

## 📞 Si ça ne Fonctionne Toujours Pas

1. Vérifiez que **tous les scripts SQL précédents** ont été exécutés :
   - ✅ ÉTAPE 1 : Ajout des 24 colonnes manquantes
   - ✅ ÉTAPE 2 : Génération des orderNumber
   - ✅ ÉTAPE 3 : Contraintes sur orderNumber
   - ✅ **ÉTAPE 6 : userId nullable** ← CRITIQUE

2. Vérifiez dans Table Editor de Supabase :
   - La colonne `userId` doit avoir "Is Nullable" coché
   - La foreign key doit pointer vers `User.id`

3. Redémarrez l'application Next.js pour forcer la reconnexion Prisma

4. Vérifiez les logs d'erreur pour d'autres problèmes potentiels

---

## 🎉 Résultat Final

Une fois tout corrigé, vous aurez :

✅ **Checkout fonctionnel** pour :
- Utilisateurs connectés
- Utilisateurs invités (guests)

✅ **Suivi complet** des commandes via :
- Numéro de commande unique
- Informations client complètes
- Statuts de commande et paiement

✅ **Flexibilité** :
- Commandes sans compte
- Commandes avec compte
- Migration facile de guest → user

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- `scripts/sql/GUEST_CHECKOUT_FIX.md` - Guide détaillé
- `COMMANDES_SQL_SUPABASE.md` - Toutes les commandes SQL
- `database_schemas.md` - Structure complète de la BDD
