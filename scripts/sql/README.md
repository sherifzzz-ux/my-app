# 🛠️ Scripts SQL de maintenance - FlawlessBeauty

Ce dossier contient les scripts SQL pour diagnostiquer et corriger les problèmes de la base de données.

## 📋 Scripts disponibles

### 1. `01-diagnostic-database.sql` ✅
**Diagnostic complet de la base de données**

- Liste toutes les tables
- Vérifie la structure de la table Order
- Affiche les colonnes manquantes
- Compte les enregistrements
- Liste les ENUMs et contraintes

**Utilisation :**
```sql
-- Exécuter dans Supabase SQL Editor
\i 01-diagnostic-database.sql
```

---

### 2. `02-fix-order-table.sql` 🔧
**Correction de la table Order**

Ce script ajoute toutes les colonnes manquantes pour le checkout PayTech :

**Actions effectuées :**
- ✅ Création des ENUMs manquants (PaymentStatus, PaymentMethod, ShippingZone)
- ✅ Mise à jour de l'ENUM OrderStatus (ajoute CONFIRMED, PROCESSING, DELIVERED)
- ✅ Ajout de 23 colonnes manquantes dans la table Order
- ✅ Configuration des valeurs par défaut
- ✅ Création des contraintes et index
- ✅ Support du guest checkout (userId nullable)
- ✅ Création des tables DeliveryZone et UserFavorite

**⚠️ IMPORTANT : Exécuter ce script avant de déployer le checkout PayTech**

**Utilisation :**
```sql
-- Exécuter dans Supabase SQL Editor
\i 02-fix-order-table.sql
```

---

### 3. `03-verify-order-table.sql` ✅
**Vérification de la table Order**

Script de vérification post-migration :

- Affiche tous les ENUMs
- Liste la structure complète de Order
- Vérifie les colonnes manquantes
- Affiche les contraintes et relations
- Génère un rapport de conformité

**Utilisation :**
```sql
-- Exécuter après 02-fix-order-table.sql
\i 03-verify-order-table.sql
```

---

### 4. `04-fix-missing-images.sql` 🖼️
**Correction des images manquantes**

Résout les erreurs 404 des images :

- Identifie les produits avec images manquantes
- Remplace par des placeholders appropriés
- Assigne des images de catégorie
- Génère des statistiques

**Actions :**
- `/images/shampoing.jpg` → `/images/category-cheveux.png`
- `/images/fond-teint.jpg` → `/images/category-maquillage.png`
- `/images/vitamine.jpg` → `/images/category-parapharmacie.png`

**Utilisation :**
```sql
-- Exécuter dans Supabase SQL Editor
\i 04-fix-missing-images.sql
```

---

### 5. `05-cleanup-legacy-tables.sql` 🗑️
**Nettoyage des tables legacy**

⚠️ **ATTENTION : Script de suppression**

Supprime les tables dupliquées et obsolètes :
- contact_messages
- newsletter_subscribers
- order_items (doublon de OrderItem)
- orders (doublon de Order)
- profiles
- shipping_methods
- user_addresses (doublon de Address)
- user_favorites (doublon de UserFavorite)
- user_roles
- user_suspensions

**⚠️ Avant d'exécuter :**
1. Créer un backup de la base de données
2. Vérifier que les tables ne contiennent pas de données importantes
3. Décommenter les lignes DROP TABLE dans le script

**Utilisation :**
```sql
-- 1. Vérifier le contenu des tables
\i 05-cleanup-legacy-tables.sql

-- 2. Créer un backup
pg_dump -U postgres -d flawlessbeauty > backup.sql

-- 3. Décommenter la section DROP TABLE dans le script

-- 4. Re-exécuter
\i 05-cleanup-legacy-tables.sql
```

---

## 🚀 Guide d'exécution sur Supabase

### Méthode 1 : SQL Editor (Recommandé)

1. **Ouvrir Supabase Dashboard**
   - Aller sur [app.supabase.com](https://app.supabase.com)
   - Sélectionner votre projet FlawlessBeauty

2. **Accéder au SQL Editor**
   - Cliquer sur "SQL Editor" dans la barre latérale
   - Créer une nouvelle requête

3. **Copier-coller le script**
   - Ouvrir le fichier SQL désiré
   - Copier tout le contenu
   - Coller dans l'éditeur Supabase

4. **Exécuter le script**
   - Cliquer sur "Run" ou `Ctrl+Enter`
   - Vérifier les résultats dans l'onglet "Results"

### Méthode 2 : CLI Supabase

```bash
# Se connecter à Supabase
supabase login

# Lier le projet
supabase link --project-ref <votre-project-ref>

# Exécuter un script
supabase db execute --file scripts/sql/02-fix-order-table.sql
```

### Méthode 3 : psql (Avancé)

```bash
# Se connecter via psql
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Exécuter le script
\i scripts/sql/02-fix-order-table.sql
```

---

## 📊 Ordre d'exécution recommandé

Pour corriger tous les problèmes identifiés :

```bash
# 1. Diagnostic initial (déjà fait)
✅ 01-diagnostic-database.sql

# 2. Correction de la table Order (CRITIQUE)
⚠️ 02-fix-order-table.sql

# 3. Vérification post-correction
✅ 03-verify-order-table.sql

# 4. Correction des images manquantes
🖼️ 04-fix-missing-images.sql

# 5. Nettoyage des tables legacy (OPTIONNEL)
🗑️ 05-cleanup-legacy-tables.sql

# 6. Vérification finale
✅ 01-diagnostic-database.sql (re-exécuter)
```

### Résumé visuel

```
01-diagnostic-database.sql
        ↓
02-fix-order-table.sql (CRITIQUE - Ajoute 23 colonnes)
        ↓
03-verify-order-table.sql (Vérifie que tout est OK)
        ↓
04-fix-missing-images.sql (Corrige les 404)
        ↓
05-cleanup-legacy-tables.sql (OPTIONNEL - Nettoie les doublons)
        ↓
01-diagnostic-database.sql (Vérification finale)
```

---

## ⚠️ Avertissements

1. **Backup avant modification**
   - Toujours créer un backup avant d'exécuter des scripts de modification
   - Utiliser `pg_dump` ou la fonction backup de Supabase

2. **Environnement de production**
   - Tester d'abord sur un environnement de développement
   - Planifier une fenêtre de maintenance si nécessaire

3. **Données existantes**
   - Les scripts sont conçus pour préserver les données existantes
   - Les colonnes ajoutées acceptent NULL temporairement
   - Les valeurs par défaut sont appliquées

---

## 🔍 Résultats attendus

### Après `02-fix-order-table.sql` :

```
✅ Migration terminée avec succès !
📊 Nombre total de colonnes dans Order : 29
📝 Consultez le fichier database_schemas.md pour la documentation complète
```

### Après `03-verify-order-table.sql` :

```
✅ Toutes les colonnes requises sont présentes !
🚀 La table Order est prête pour le checkout PayTech
```

### Après `04-fix-missing-images.sql` :

```
✅ Correction des images terminée !
📁 Images locales : 16
🌐 Images externes : 0
```

---

## 📝 Documentation complémentaire

- **Structure complète de la DB** : Voir `database_schemas.md`
- **Schéma Prisma** : Voir `prisma/schema.prisma`
- **Migrations Prisma** : Voir `prisma/migrations/`

---

## 🆘 Résolution de problèmes

### Erreur : "type already exists"
```sql
-- L'ENUM existe déjà, c'est normal
-- Le script utilise IF NOT EXISTS pour éviter les doublons
```

### Erreur : "column already exists"
```sql
-- La colonne existe déjà, c'est normal
-- Le script utilise ADD COLUMN IF NOT EXISTS
```

### Erreur : "permission denied"
```sql
-- Vérifier que vous êtes connecté en tant que postgres
-- Ou avec un rôle ayant les privilèges ALTER TABLE
```

---

## 💡 Conseils

1. **Toujours commencer par un diagnostic**
   ```sql
   \i 01-diagnostic-database.sql
   ```

2. **Vérifier après chaque modification**
   ```sql
   \i 03-verify-order-table.sql
   ```

3. **Suivre les logs**
   - Activer `client_min_messages = notice` pour voir les logs
   - Les scripts utilisent `RAISE NOTICE` pour afficher la progression

4. **Garder une trace**
   - Sauvegarder les résultats des scripts
   - Noter les modifications effectuées

---

## 🔄 Synchronisation Prisma

Après avoir exécuté les scripts SQL :

```bash
# 1. Vérifier que le schéma Prisma est à jour
cat prisma/schema.prisma

# 2. Générer le client Prisma
npx prisma generate

# 3. (Optionnel) Créer une migration Prisma pour tracer les changements
npx prisma migrate dev --create-only --name fix_order_table
```

---

**Dernière mise à jour :** 2025-10-09  
**Version :** 1.0.0  
**Auteur :** FlawlessBeauty Dev Team
