# 🔧 Instructions de Correction - Checkout FlawlessBeauty

## 🚨 Erreur Actuelle

```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

**Cause** : Le schéma Prisma a été mis à jour avec de nouveaux champs (orderNumber, guest checkout, etc.) mais la migration n'a jamais été exécutée en production.

---

## ✅ Solution en 3 Étapes (5 minutes max)

### Étape 1: Appliquer la Migration SQL ⚡

**Méthode Recommandée** - Exécutez ce script SQL :

```bash
# Si vous avez psql installé
psql $DATABASE_URL -f scripts/quick-fix.sql

# OU copiez-collez le contenu de scripts/quick-fix.sql dans pgAdmin/DBeaver
```

**Alternative** - Via Prisma :

```bash
# 1. Configurez DATABASE_URL
export DATABASE_URL="postgresql://user:password@host:port/database"

# 2. Appliquez la migration
npx prisma migrate deploy
```

### Étape 2: Vérifier la Correction

```sql
-- Vérifiez que orderNumber existe
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Order' AND column_name = 'orderNumber';

-- Vérifiez les données
SELECT id, orderNumber, firstName, email 
FROM "Order" 
ORDER BY createdAt DESC 
LIMIT 5;
```

### Étape 3: Tester le Checkout

1. Ouvrez votre site
2. Ajoutez des produits au panier
3. Procédez au checkout
4. ✅ La commande devrait être créée sans erreur

---

## 📦 Fichiers Fournis

### Scripts SQL
- ✅ **`scripts/quick-fix.sql`** - Fix rapide complet (30 secondes)
- ✅ **`scripts/fix-missing-images.sql`** - Correction images 404

### Scripts Bash
- ✅ **`scripts/apply-migration.sh`** - Script automatisé Prisma
- ✅ **`scripts/fix-images.sh`** - Correction images via API

### Migration Prisma
- ✅ **`prisma/migrations/20251009000000_add_order_number_and_guest_checkout/migration.sql`**

### Documentation
- ✅ **`README_CHECKOUT_FIX.md`** - Guide rapide
- ✅ **`URGENT_FIX.md`** - Fix urgent détaillé
- ✅ **`MIGRATION_FIX.md`** - Documentation complète
- ✅ **`FIX_IMAGES.md`** - Guide images
- ✅ **`SOLUTION_COMPLETE.md`** - Récapitulatif complet

---

## 🔍 Ce que la Migration Ajoute

### Nouveaux Champs Order
```typescript
orderNumber: string          // Numéro unique de commande (auto-généré)
firstName: string            // Prénom client
lastName: string             // Nom client
email: string                // Email client
phone: string                // Téléphone client
ville: string                // Ville de livraison
quartier: string             // Quartier/zone de livraison
adresseDetaillee: string     // Point de repère détaillé
orderNote?: string           // Note de commande (optionnel)
userId?: string              // Utilisateur (nullable pour guest checkout)
```

### Nouveaux Enums
```typescript
PaymentStatus: PENDING | PROCESSING | PAID | FAILED | CANCELLED | REFUNDED
PaymentMethod: ORANGE_MONEY | WAVE | CARD | CASH_ON_DELIVERY
ShippingZone: DAKAR | THIES | AUTRE
OrderStatus: + CONFIRMED | PROCESSING | DELIVERED (ajoutés)
```

### Nouvelles Tables
- `UserFavorite` - Wishlist/favoris utilisateur
- `DeliveryZone` - Zones de livraison configurables

---

## 🎯 Commandes Rapides

### Fix Base de Données (1 commande)
```bash
psql $DATABASE_URL -f scripts/quick-fix.sql
```

### Fix Images 404 (optionnel)
```bash
# Via API
./scripts/fix-images.sh

# Via SQL
psql $DATABASE_URL -f scripts/fix-missing-images.sql
```

### Vérification Complète
```bash
# Statut migrations
npx prisma migrate status

# Régénérer client
npx prisma generate

# Rebuild
npm run build
```

---

## 🆘 Si Ça Ne Fonctionne Pas

### 1. Vérifier DATABASE_URL
```bash
echo $DATABASE_URL
# Doit afficher: postgresql://...
```

### 2. Vérifier Connexion PostgreSQL
```bash
psql $DATABASE_URL -c "SELECT version();"
```

### 3. Logs Vercel
```bash
vercel logs --follow
```

### 4. Reset Complet (dernier recours)
```bash
# Sauvegarder les données importantes d'abord !
npx prisma migrate reset
npx prisma db push
```

---

## ✅ Checklist Post-Fix

- [ ] Migration SQL exécutée
- [ ] Colonne `orderNumber` existe dans la table Order
- [ ] Enums PaymentStatus, PaymentMethod, ShippingZone créés
- [ ] Test checkout réussi (créer une commande)
- [ ] Console navigateur sans erreur `orderNumber does not exist`
- [ ] Images corrigées (optionnel, erreurs 404 disparues)
- [ ] Application redéployée si nécessaire

---

## 📞 Support Technique

**Logs PostgreSQL** :
```bash
psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity WHERE datname = current_database();"
```

**Vérifier Structure Table** :
```sql
\d "Order"
```

**Lister Enums** :
```sql
SELECT typname, enumlabel 
FROM pg_type 
JOIN pg_enum ON pg_type.oid = pg_enum.enumtypid 
WHERE typname IN ('OrderStatus', 'PaymentStatus', 'PaymentMethod', 'ShippingZone')
ORDER BY typname, enumlabel;
```

---

## 🎉 Résultat Attendu

Après le fix :
- ✅ Checkout fonctionne sans erreur
- ✅ Commandes créées avec `orderNumber` unique
- ✅ Support guest checkout (commande sans connexion)
- ✅ Intégration PayTech complète
- ✅ Multi-moyens de paiement (Orange Money, Wave, CB, Cash)
- ✅ Système de zones de livraison fonctionnel

---

**Temps total** : 3-5 minutes  
**Difficulté** : Facile (copier-coller SQL)  
**Impact** : Critique (débloque le checkout)

---

💡 **Astuce** : Sauvegardez votre base de données avant toute migration en production !

```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```
