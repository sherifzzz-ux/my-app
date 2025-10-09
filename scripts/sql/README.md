# 📊 Scripts SQL FlawlessBeauty

Ce dossier contient les scripts SQL pour diagnostiquer et corriger la base de données.

---

## 📋 Liste des Scripts

### 1. `01-diagnostic-database.sql` 🔍
**Fonction**: Diagnostic complet de la base de données

**Utilisation**:
```bash
# Via psql
psql $DATABASE_URL -f scripts/sql/01-diagnostic-database.sql

# Via Supabase SQL Editor
# Copiez-collez le contenu du fichier
```

**Ce que fait le script**:
1. ✅ Liste toutes les tables
2. ✅ Affiche les colonnes de la table Order
3. ✅ Affiche les contraintes
4. ✅ Affiche les relations (foreign keys)
5. ✅ Compte les enregistrements par table
6. ✅ Liste les ENUMs
7. ✅ **Détecte les colonnes manquantes** dans Order
8. ✅ Affiche un résumé global

**Résultat attendu**:
```
Section 7: Vérification des colonnes requises
----------------------------------------------
| status      | expected_column  |
| ----------- | ---------------- |
| ✅ EXISTE    | orderNumber      |
| ✅ EXISTE    | firstName        |
| ✅ EXISTE    | lastName         |
| ... (toutes les colonnes EXISTE) ... |
```

Si vous voyez `❌ MANQUANTE`, exécutez le script 02.

---

### 2. `02-fix-order-table.sql` 🔧
**Fonction**: Correction automatique de la table Order

**Utilisation**:
```bash
# Via psql
psql $DATABASE_URL -f scripts/sql/02-fix-order-table.sql

# Via Supabase SQL Editor
# Copiez-collez le contenu du fichier

# Via script automatisé (RECOMMANDÉ)
./scripts/fix-database-auto.sh
```

**Ce que fait le script**:

#### Étape 1: Colonne orderNumber
- ✅ Vérifie si orderNumber existe
- ✅ L'ajoute si manquante
- ✅ Génère des numéros uniques pour les commandes existantes (ORD-00000001, ORD-00000002, ...)
- ✅ Ajoute la contrainte UNIQUE

#### Étape 2: Colonnes Guest Checkout
- ✅ firstName (NOT NULL)
- ✅ lastName (NOT NULL)
- ✅ email (NOT NULL)
- ✅ phone (NOT NULL)

#### Étape 3: Adresse Détaillée
- ✅ ville (NOT NULL)
- ✅ quartier (NOT NULL)
- ✅ adresseDetaillee (NOT NULL)
- ✅ orderNote (nullable)

#### Étape 4: Colonnes Legacy
- ✅ guestEmail (nullable)
- ✅ guestName (nullable)
- ✅ guestPhone (nullable)
- ✅ shippingName (nullable)
- ✅ shippingPhone (nullable)
- ✅ shippingAddress (nullable)
- ✅ shippingCity (nullable)

#### Étape 5: ENUMs
- ✅ Crée ShippingZone ('DAKAR', 'THIES', 'AUTRE')
- ✅ Crée PaymentMethod ('ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY')
- ✅ Crée PaymentStatus ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED')
- ✅ Vérifie OrderStatus

#### Étape 6: Colonnes ENUM
- ✅ shippingZone (NOT NULL, default DAKAR)
- ✅ paymentMethod (NOT NULL, default ORANGE_MONEY)
- ✅ paymentStatus (NOT NULL, default PENDING)

#### Étape 7: Colonnes PayTech
- ✅ paytechToken (nullable)
- ✅ paytechRef (nullable)

#### Étape 8: Frais
- ✅ shippingFees (NOT NULL, default 0)
- ✅ subtotalCents (si manquant)
- ✅ shippingCents (si manquant)

**Résultat attendu**:
```
NOTICE: Colonne orderNumber ajoutée avec succès
NOTICE: Colonne firstName ajoutée
NOTICE: Colonne lastName ajoutée
... (messages de confirmation pour chaque colonne)

Vérification finale de la table Order
--------------------------------------
nombre_colonnes: 29
```

---

### 3. `03-reset-prisma-migrations.sql` 🔄
**Fonction**: Réinitialisation des migrations Prisma (utilisé en interne)

⚠️ **ATTENTION**: Ce script est destiné à l'usage interne de Prisma. Ne l'exécutez pas manuellement sauf si vous savez ce que vous faites.

---

## 🚀 Guide d'Utilisation Rapide

### Scenario 1: Première Installation
```bash
# 1. Diagnostic
psql $DATABASE_URL -f scripts/sql/01-diagnostic-database.sql

# 2. Si des colonnes manquent, correction automatique
./scripts/fix-database-auto.sh

# 3. Vérification
psql $DATABASE_URL -f scripts/sql/01-diagnostic-database.sql
```

---

### Scenario 2: Erreur "orderNumber does not exist"
```bash
# Solution rapide
./scripts/fix-database-auto.sh

# OU manuellement
psql $DATABASE_URL -f scripts/sql/02-fix-order-table.sql
npx prisma generate
```

---

### Scenario 3: Via Supabase Dashboard

1. **Diagnostic**:
   - Ouvrez Supabase SQL Editor
   - Copiez le contenu de `01-diagnostic-database.sql`
   - Exécutez
   - Vérifiez la section 7 (colonnes manquantes)

2. **Correction** (si nécessaire):
   - Copiez le contenu de `02-fix-order-table.sql`
   - Exécutez dans l'ordre
   - Chaque bloc DO $$ est indépendant

3. **Vérification**:
   - Ré-exécutez `01-diagnostic-database.sql`
   - Vérifiez que toutes les colonnes sont `✅ EXISTE`

---

## 📊 Interprétation des Résultats

### Section 1: Tables
Liste toutes les tables dans la base de données.

**Attendu**: 
- ✅ Order, OrderItem, Product, Category, etc.
- ⚠️ Possibles doublons: orders, order_items (tables legacy)

---

### Section 2: Colonnes de Order
Liste toutes les colonnes actuelles de la table Order.

**Attendu**: 29 colonnes minimum

---

### Section 3: Contraintes
Liste les contraintes (PRIMARY KEY, FOREIGN KEY, UNIQUE).

**Attendu**:
- ✅ Order_pkey (PRIMARY KEY sur id)
- ✅ Order_userId_fkey (FOREIGN KEY vers User)
- ✅ Order_orderNumber_key (UNIQUE sur orderNumber)

---

### Section 4: Relations
Liste les foreign keys.

**Attendu**:
- ✅ Order.userId → User.id

---

### Section 5: Comptage
Compte les enregistrements par table.

**Normal**: Dépend de vos données de seed

---

### Section 6: ENUMs
Liste les valeurs des ENUMs.

**Attendu**:
- ✅ OrderStatus: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- ✅ PaymentStatus: PENDING, PROCESSING, PAID, FAILED, CANCELLED, REFUNDED
- ✅ PaymentMethod: ORANGE_MONEY, WAVE, CARD, CASH_ON_DELIVERY
- ✅ ShippingZone: DAKAR, THIES, AUTRE

---

### Section 7: Colonnes Requises ⭐ IMPORTANT
Vérifie que toutes les colonnes nécessaires existent.

**SUCCÈS** (base de données OK):
```
| status      | expected_column  |
| ----------- | ---------------- |
| ✅ EXISTE    | orderNumber      |
| ✅ EXISTE    | firstName        |
| ✅ EXISTE    | lastName         |
| ... toutes ✅ EXISTE ... |
```

**PROBLÈME** (base de données incomplète):
```
| status         | expected_column  |
| -------------- | ---------------- |
| ❌ MANQUANTE   | orderNumber      |
| ❌ MANQUANTE   | firstName        |
| ... autres manquantes ... |
```

➡️ **Action**: Exécuter `02-fix-order-table.sql`

---

### Section 8: Incohérences de Schéma
Détecte les incohérences entre Prisma et la base de données.

**Attendu**: Aucune ligne retournée (OK)

**Si lignes retournées**: Incohérences détectées

---

### Section 10: Résumé
Vue d'ensemble de toutes les tables avec nombre de colonnes et contraintes.

---

## 🔧 Dépannage

### Erreur: "relation Order does not exist"
**Cause**: La table Order n'a pas été créée

**Solution**:
```bash
npx prisma db push
# OU
npx prisma migrate deploy
```

---

### Erreur: "column orderNumber does not exist"
**Cause**: La table Order existe mais est incomplète

**Solution**:
```bash
./scripts/fix-database-auto.sh
```

---

### Erreur: "type ShippingZone does not exist"
**Cause**: Les ENUMs n'ont pas été créés

**Solution**:
```bash
# Le script 02 crée automatiquement les ENUMs
psql $DATABASE_URL -f scripts/sql/02-fix-order-table.sql
```

---

### Erreur: "permission denied"
**Cause**: Votre utilisateur DB n'a pas les permissions

**Solution**:
```bash
# Vérifiez vos permissions
psql $DATABASE_URL -c "
  SELECT current_user, 
         has_table_privilege('Order', 'INSERT');
"

# Si nécessaire, utilisez un utilisateur avec plus de privilèges
```

---

## 📝 Notes Importantes

### ⚠️ Sauvegarde
Avant toute modification, sauvegardez vos données:
```sql
CREATE TABLE "Order_backup" AS SELECT * FROM "Order";
```

### 🔄 Migrations Prisma
Ces scripts SQL sont des correctifs ponctuels. Pour les changements futurs, utilisez toujours les migrations Prisma:
```bash
npx prisma migrate dev --name description
```

### 🧪 Environnement de Test
Testez d'abord sur une base de données de développement:
```bash
# Créez une copie de votre base de données
pg_dump $PROD_DATABASE_URL | psql $DEV_DATABASE_URL

# Testez les scripts sur la copie
psql $DEV_DATABASE_URL -f scripts/sql/02-fix-order-table.sql

# Si OK, appliquez en production
psql $PROD_DATABASE_URL -f scripts/sql/02-fix-order-table.sql
```

---

## 🚀 Commandes Utiles

### Diagnostic Rapide
```bash
# Compter les colonnes de Order
psql $DATABASE_URL -c "
  SELECT COUNT(*) as nb_colonnes
  FROM information_schema.columns 
  WHERE table_name = 'Order'
"
```

### Vérifier une Colonne Spécifique
```bash
# Vérifier si orderNumber existe
psql $DATABASE_URL -c "
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns 
  WHERE table_name = 'Order' 
    AND column_name = 'orderNumber'
"
```

### Lister les ENUMs
```bash
psql $DATABASE_URL -c "
  SELECT t.typname, e.enumlabel
  FROM pg_type t
  JOIN pg_enum e ON t.oid = e.enumtypid
  ORDER BY t.typname, e.enumsortorder
"
```

### Restaurer depuis Backup
```bash
# Si vous avez créé un backup
psql $DATABASE_URL -c "
  TRUNCATE TABLE \"Order\" CASCADE;
  INSERT INTO \"Order\" SELECT * FROM \"Order_backup\";
"
```

---

## 📞 Support

Pour plus d'aide, consultez:
- `../database_schemas.md` - Documentation complète de la base de données
- `../../GUIDE_CORRECTION_ERREURS.md` - Guide de correction des erreurs
- `../../README.md` - Documentation du projet

---

**Dernière mise à jour**: 2025-10-09
