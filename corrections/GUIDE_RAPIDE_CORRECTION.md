# ⚡ Guide Rapide de Correction - 5 minutes

## 🎯 Objectif

Corriger l'erreur : `Null constraint violation on the fields: (userId)`

---

## 📋 Checklist

### ✅ Étape 1 : Connexion à Supabase (30 secondes)

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Cliquez sur **SQL Editor** dans le menu de gauche

---

### ✅ Étape 2 : Exécuter le Script SQL (2 minutes)

Copiez-collez et exécutez ce bloc complet :

```sql
-- 1. Supprimer la contrainte FK
ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "Order_userId_fkey";

-- 2. Rendre userId nullable
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;

-- 3. Recréer la contrainte FK
ALTER TABLE "Order" 
ADD CONSTRAINT "Order_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "User"("id") 
ON DELETE SET NULL 
ON UPDATE CASCADE;
```

**Résultat attendu** :
```
Success. No rows returned
```

---

### ✅ Étape 3 : Vérifier (1 minute)

Exécutez cette requête :

```sql
SELECT 
  column_name,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Order' AND column_name = 'userId';
```

**Résultat attendu** :
```
column_name | is_nullable
userId      | YES
```

✅ Si vous voyez `YES`, c'est bon !

---

### ✅ Étape 4 : Tester le Site (1 minute)

1. Ouvrez votre site en **navigation privée** (non connecté)
2. Ajoutez un produit au panier
3. Allez au checkout
4. Remplissez le formulaire
5. Validez la commande

**Résultat attendu** :
- ✅ Pas d'erreur `Null constraint violation`
- ✅ Commande créée avec succès
- ✅ Redirection vers la page de confirmation

---

## 🆘 Aide Rapide

### Problème : "constraint does not exist"

C'est normal si c'est la première fois. Continuez avec les autres commandes.

### Problème : Erreur persiste après le script

1. Vérifiez que `is_nullable = YES` dans l'étape 3
2. Redémarrez votre application Next.js
3. Videz le cache du navigateur
4. Réessayez

### Problème : Autres erreurs au checkout

Vérifiez que **toutes les colonnes** sont présentes :

```sql
SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'Order';
```

Résultat attendu : **30+** colonnes

Si moins de 30, exécutez d'abord le script `02-fix-order-table.sql`

---

## 📞 Support

Si ça ne fonctionne toujours pas après ces étapes :

1. Consultez `SOLUTION_ERREUR_CHECKOUT.md` pour plus de détails
2. Vérifiez les logs d'erreur dans la console navigateur
3. Vérifiez les logs Prisma dans le terminal Next.js
4. Partagez les erreurs exactes pour un diagnostic plus précis

---

## 🎉 Succès !

Une fois que ça fonctionne :

✅ Le guest checkout est activé
✅ Les utilisateurs peuvent commander sans compte
✅ Les utilisateurs connectés peuvent toujours commander normalement
✅ Toutes les commandes sont trackées avec `orderNumber`, `email`, etc.

---

## 📚 Documentation Complète

- **Solution détaillée** : `SOLUTION_ERREUR_CHECKOUT.md`
- **Script SQL complet** : `scripts/sql/03-make-userId-nullable.sql`
- **Guide guest checkout** : `scripts/sql/GUEST_CHECKOUT_FIX.md`
- **Toutes les commandes** : `COMMANDES_SQL_SUPABASE.md`
- **Vérification structure** : `scripts/sql/verify-order-structure.sql`

---

## ⏱️ Temps Total Estimé

- ⚡ **Rapide** : 5 minutes (juste le script userId)
- 📊 **Complet** : 15 minutes (tous les scripts + vérification)
- 🔍 **Diagnostic** : 2 minutes (scripts de vérification)

---

## 🚀 Prochaines Étapes

Après correction :

1. ✅ Testez le checkout (guest + connecté)
2. ✅ Vérifiez les commandes dans Supabase
3. ✅ Configurez PayTech pour les paiements réels
4. ✅ Configurez les emails de confirmation
5. ✅ Testez le flow complet de bout en bout

Bon courage ! 💪
