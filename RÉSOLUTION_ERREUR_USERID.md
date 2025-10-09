# 🔧 Résolution de l'Erreur Guest Checkout

## ❌ Erreur Actuelle

```
Null constraint violation on the fields: (`userId`)
```

Cette erreur se produit lors de la finalisation d'une commande en mode **guest** (utilisateur non connecté).

---

## 🔍 Diagnostic

### Cause du Problème

1. **Ce qui se passe** : Quand un utilisateur non connecté essaie de passer commande, le code tente de créer une commande avec `userId = null`

2. **Pourquoi ça échoue** : Dans votre base de données Supabase, la colonne `userId` de la table `Order` est définie comme `NOT NULL`, ce qui interdit les valeurs NULL

3. **Code concerné** : `server/actions/checkout.ts` ligne 79
   ```typescript
   userId: session?.user?.id || null,  // ❌ NULL rejeté par la DB
   ```

### Architecture Actuelle

Le système est conçu pour supporter **2 types de commandes** :

**👤 Utilisateur Connecté**
- `userId` : ID de l'utilisateur (ex: "user_123")
- Commande liée au compte
- Visible dans l'historique des commandes

**👥 Guest (Non connecté)**
- `userId` : NULL ❌ (actuellement rejeté)
- `guestEmail`, `guestName`, `guestPhone` : infos du guest
- Commande indépendante (pas de compte)

---

## ✅ Solution en 1 Commande SQL

### Étape 1 : Ouvrir Supabase SQL Editor

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor** (icône de terminal dans le menu de gauche)
3. Cliquez sur **New query**

### Étape 2 : Exécuter Cette Commande

Copiez et collez cette ligne, puis cliquez sur **Run** :

```sql
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;
```

### Étape 3 : Vérifier la Correction

Exécutez cette requête pour confirmer :

```sql
SELECT 
  column_name,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Order' 
  AND column_name = 'userId';
```

**Résultat attendu :**
```
column_name | is_nullable
------------|------------
userId      | YES          ← Doit être YES, pas NO
```

---

## 🎯 Résultat Après Correction

### ✅ Ce qui fonctionnera

**Checkout Guest (non connecté)**
```typescript
// userId sera NULL - ✅ ACCEPTÉ maintenant
userId: null
guestEmail: "client@example.com"
guestName: "Marie Ndiaye"
guestPhone: "+221771234567"
```

**Checkout User (connecté)**
```typescript
// userId sera renseigné - ✅ Fonctionnait déjà
userId: "user_abc123"
email: "user@example.com"
firstName: "Marie"
lastName: "Ndiaye"
```

### 🔒 Sécurité Préservée

La **contrainte de clé étrangère** `Order_userId_fkey` reste en place :
- ✅ Autorise `userId = NULL` pour les guests
- ✅ Vérifie que les `userId` non-NULL existent dans la table `User`
- ✅ Empêche de lier une commande à un utilisateur inexistant

---

## 🧪 Tests Recommandés

### Test 1 : Guest Checkout

1. **Déconnectez-vous** de votre compte (si connecté)
2. Ajoutez un produit au panier
3. Allez au checkout : `/checkout`
4. Remplissez le formulaire :
   - Nom : "Test Guest"
   - Email : "guest@test.com"
   - Téléphone : "+221771234567"
   - Adresse, ville, etc.
5. Cliquez sur "Finaliser la commande"
6. ✅ **Doit fonctionner sans erreur**

### Test 2 : User Checkout

1. **Connectez-vous** avec un compte
2. Ajoutez un produit au panier
3. Allez au checkout
4. Remplissez le formulaire
5. Cliquez sur "Finaliser la commande"
6. ✅ **Doit fonctionner et apparaître dans votre historique**

### Test 3 : Vérification Base de Données

```sql
-- Voir les dernières commandes créées
SELECT 
  id,
  "orderNumber",
  userId,
  guestEmail,
  guestName,
  CASE 
    WHEN userId IS NULL THEN 'GUEST'
    ELSE 'USER'
  END as type_commande,
  status,
  totalCents,
  "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

## 📊 Comparaison Avant/Après

| Situation | Avant | Après |
|-----------|-------|-------|
| **Guest Checkout** | ❌ Erreur NULL constraint | ✅ Fonctionne |
| **User Checkout** | ✅ Fonctionne | ✅ Fonctionne |
| **Sécurité** | ✅ Contrainte FK active | ✅ Contrainte FK active |
| **Historique User** | ✅ Disponible | ✅ Disponible |
| **Commandes Guest** | ❌ Impossibles | ✅ Possibles |

---

## 🚨 Autres Problèmes Identifiés

Les erreurs 404 sur les images sont un **problème séparé** :

```
/images/fond-teint.jpg - 404
/images/shampoing.jpg - 404
/images/vitamines.jpg - 404
```

### Solutions pour les Images

**Option 1 : Vérifier les fichiers**
```bash
ls -la public/images/
```

**Option 2 : Ajouter des images par défaut**
- Créez le dossier : `public/images/`
- Ajoutez des images ou utilisez des placeholders

**Option 3 : Utiliser des images de remplacement**
- Modifiez les composants pour utiliser des images existantes
- Ou utilisez un service comme Unsplash pour les placeholders

---

## 📝 Fichiers de Référence

- **Guide détaillé** : `scripts/sql/COMMANDE_FIX_USERID.md`
- **Script SQL complet** : `scripts/sql/03-fix-userid-nullable.sql`
- **Documentation DB** : `database_schemas.md` (mis à jour)
- **Code checkout** : `server/actions/checkout.ts`

---

## ✅ Checklist Finale

- [ ] ✅ Exécuter `ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;`
- [ ] ✅ Vérifier que `is_nullable = YES` pour `userId`
- [ ] ✅ Tester guest checkout (non connecté)
- [ ] ✅ Tester user checkout (connecté)
- [ ] ✅ Vérifier les commandes dans la base de données
- [ ] 🔲 (Optionnel) Résoudre les erreurs 404 des images

---

## 💡 Besoin d'Aide ?

Si après avoir exécuté la commande SQL vous avez toujours une erreur :

1. **Vérifiez que la commande s'est bien exécutée** : Pas de message d'erreur rouge dans Supabase
2. **Redémarrez l'application Next.js** : `npm run dev` (pour recharger la connexion Prisma)
3. **Vérifiez les logs** : Console navigateur + terminal Next.js
4. **Testez avec les données minimales** : Juste les champs obligatoires du formulaire

---

**🎉 Après cette correction, votre checkout fonctionnera pour tous les utilisateurs !**
