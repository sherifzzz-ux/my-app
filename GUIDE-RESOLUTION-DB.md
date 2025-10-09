# 🔧 Guide de Résolution - Erreur Checkout FlawlessBeauty

## ❌ Problème Identifié

```
Error: Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

## 🔍 Cause

Le schéma Prisma définit une colonne `orderNumber` dans le modèle `Order`, mais cette colonne n'existe pas dans votre base de données Supabase. Cela se produit quand :

1. Les migrations Prisma n'ont pas été appliquées à Supabase
2. Le schéma a été modifié sans créer de migration
3. La base de données a été créée manuellement sans suivre le schéma

## ✅ Solutions

### Solution 1 : Correction SQL Directe (RECOMMANDÉ)

Cette méthode ajoute les colonnes manquantes sans perdre de données.

#### Étape 1 : Diagnostic

1. Connectez-vous à [Supabase](https://app.supabase.com)
2. Ouvrez votre projet FlawlessBeauty
3. Allez dans **SQL Editor**
4. Créez un nouveau query
5. Copiez-collez le contenu de `scripts/sql/01-diagnostic-database.sql`
6. Exécutez la **Requête 7** pour voir les colonnes manquantes :

```sql
SELECT 
    CASE 
        WHEN column_name IS NULL THEN '❌ MANQUANTE'
        ELSE '✅ EXISTE'
    END AS status,
    expected_column
FROM (
    VALUES 
        ('orderNumber'),
        ('firstName'),
        ('lastName'),
        -- ... etc
) AS expected(expected_column)
LEFT JOIN information_schema.columns c
    ON c.table_name = 'Order' 
    AND c.column_name = expected.expected_column;
```

#### Étape 2 : Sauvegarde (Important !)

```sql
-- Sauvegarder la table Order
SELECT * INTO "Order_backup" FROM "Order";

-- Sauvegarder OrderItem
SELECT * INTO "OrderItem_backup" FROM "OrderItem";
```

#### Étape 3 : Correction

1. Dans Supabase SQL Editor
2. Copiez-collez **TOUT** le contenu de `scripts/sql/02-fix-order-table.sql`
3. Exécutez le script en une seule fois
4. Vérifiez les messages `NOTICE` qui confirment l'ajout des colonnes

#### Étape 4 : Vérification

```sql
-- Vérifier que orderNumber existe
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'Order' 
  AND column_name = 'orderNumber';
```

Si cette requête retourne un résultat, c'est bon ! ✅

#### Étape 5 : Test

- Retournez sur votre site
- Allez au checkout
- Essayez de passer une commande
- Si ça fonctionne, le problème est résolu ! 🎉

### Solution 2 : Push Prisma

Si la Solution 1 ne fonctionne pas ou si vous préférez utiliser Prisma :

```bash
# 1. Vérifier le schéma
npx prisma validate

# 2. Push le schéma vers Supabase (sans créer de migration)
npx prisma db push

# 3. Confirmer les changements quand demandé
# ⚠️ Attention : Cela peut modifier la structure existante

# 4. Générer le client Prisma
npx prisma generate

# 5. Vérifier avec Prisma Studio
npx prisma studio
```

### Solution 3 : Reset Complet (⚠️ DANGEREUX)

**À utiliser uniquement en développement ou si tout le reste échoue**

```bash
# 1. Sauvegarder vos données depuis Supabase Dashboard
#    Settings > Database > Backups

# 2. Reset complet
npx prisma migrate reset

# 3. Push le schéma
npx prisma db push

# 4. Re-seed si vous avez un script de seed
npx prisma db seed
```

## 🚀 Diagnostic Automatique

Nous avons créé un script pour automatiser le diagnostic :

```bash
# Rendre le script exécutable
chmod +x scripts/diagnose-db.sh

# Exécuter le diagnostic
./scripts/diagnose-db.sh
```

Ce script vérifie :
- ✅ Schéma Prisma valide
- ✅ État des migrations
- ✅ Client Prisma à jour
- ✅ Connexion à la base de données
- ✅ Existence de la colonne `orderNumber`

## 📁 Fichiers Créés

```
scripts/
├── sql/
│   ├── 01-diagnostic-database.sql    # Diagnostic complet
│   ├── 02-fix-order-table.sql        # Correction automatique
│   ├── 03-reset-prisma-migrations.sql # Reset (avancé)
│   └── README.md                      # Documentation détaillée
├── diagnose-db.sh                     # Script de diagnostic automatique
└── GUIDE-RESOLUTION-DB.md            # Ce guide
```

## 🔍 Vérifications Post-Résolution

Après avoir appliqué une solution, vérifiez que tout fonctionne :

### 1. Vérifier la structure de la table Order

```sql
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'Order'
ORDER BY ordinal_position;
```

Vous devriez voir environ **30 colonnes**, incluant :
- ✅ orderNumber
- ✅ firstName
- ✅ lastName
- ✅ email
- ✅ phone
- ✅ ville
- ✅ quartier
- ✅ adresseDetaillee
- etc.

### 2. Tester le checkout

1. Ajoutez un produit au panier
2. Allez au checkout
3. Remplissez le formulaire
4. Validez la commande
5. Vérifiez qu'il n'y a pas d'erreur

### 3. Vérifier dans Supabase

```sql
-- Voir les commandes créées
SELECT 
    id,
    "orderNumber",
    email,
    status,
    "totalCents",
    "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 5;
```

## 🐛 Problèmes Courants

### Erreur : "Permission denied"

**Solution** :
- Vérifiez que vous êtes admin sur Supabase
- Utilisez le SQL Editor avec les permissions admin

### Erreur : "Type ENUM does not exist"

**Solution** :
- Exécutez l'ÉTAPE 5 de `02-fix-order-table.sql` qui crée les ENUMs

### Erreur : "Duplicate key violation"

**Solution** :
- La colonne existe déjà
- Passez directement au test du checkout

### Le checkout fonctionne mais les images 404

Ce sont des problèmes séparés liés aux images manquantes :

```
/images/shampoing.jpg
/images/fond-teint.jpg
/images/vitamines.jpg
```

**Solution** :
1. Ajoutez ces images dans le dossier `public/images/`
2. Ou mettez à jour les références dans votre code

## 📞 Besoin d'Aide ?

Si le problème persiste :

1. **Exécutez le diagnostic** :
   ```bash
   ./scripts/diagnose-db.sh
   ```

2. **Vérifiez les logs** dans Supabase :
   - Dashboard > Logs > Postgres Logs

3. **Partagez les informations** :
   - Résultat du diagnostic
   - Messages d'erreur complets
   - Structure actuelle de la table Order

## 🎯 Prévention Future

Pour éviter ce problème à l'avenir :

1. **Utilisez toujours les migrations Prisma** :
   ```bash
   npx prisma migrate dev --name descriptive-name
   ```

2. **Synchronisez régulièrement** :
   ```bash
   npx prisma migrate deploy
   ```

3. **Vérifiez avant de déployer** :
   ```bash
   npx prisma migrate status
   ```

4. **Automatisez avec CI/CD** :
   - Ajoutez `prisma migrate deploy` dans votre pipeline

## ✨ Checklist de Résolution

- [ ] Exécuter `01-diagnostic-database.sql` dans Supabase
- [ ] Identifier les colonnes manquantes
- [ ] Sauvegarder la table Order
- [ ] Exécuter `02-fix-order-table.sql` dans Supabase
- [ ] Vérifier que orderNumber existe
- [ ] Tester le checkout sur le site
- [ ] Vérifier qu'une commande peut être créée
- [ ] Vérifier les données dans Supabase
- [ ] Résoudre les images 404 (optionnel)

---

**Dernière mise à jour** : 2025-10-09

**Status** : ✅ Scripts SQL prêts à l'emploi
