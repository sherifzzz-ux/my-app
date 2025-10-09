# 🔧 Guide de résolution des problèmes - FlawlessBeauty

## 📋 Problèmes identifiés et solutions

---

## ❌ PROBLÈME 1 : Erreur "orderNumber does not exist"

### Symptômes
```
Error: Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

### Cause
La table `Order` dans la base de données est incomplète. Elle ne contient que 6 colonnes alors que le schéma Prisma en définit 29.

**Colonnes actuelles :**
- ✅ id
- ✅ status
- ✅ totalCents
- ✅ createdAt
- ✅ updatedAt
- ✅ userId

**Colonnes manquantes :** 23 colonnes (orderNumber, firstName, lastName, email, etc.)

### Solution ✅

**Étape 1 : Exécuter le script de correction**
```sql
-- Dans Supabase SQL Editor
\i scripts/sql/02-fix-order-table.sql
```

**Étape 2 : Vérifier la correction**
```sql
-- Vérifier que toutes les colonnes sont présentes
\i scripts/sql/03-verify-order-table.sql
```

**Étape 3 : Régénérer le client Prisma**
```bash
npx prisma generate
```

### Fichiers concernés
- 📄 `scripts/sql/02-fix-order-table.sql` - Script de correction
- 📄 `scripts/sql/03-verify-order-table.sql` - Script de vérification
- 📄 `database_schemas.md` - Documentation de la structure

---

## ❌ PROBLÈME 2 : Images manquantes (404)

### Symptômes
```
Failed to load resource: the server responded with a status of 404 ()
- /images/shampoing.jpg
- /images/fond-teint.jpg
- /images/vitamine.jpg
```

### Cause
Certains produits dans la base de données ont des URLs d'images qui pointent vers des fichiers inexistants.

### Solution ✅

**Option 1 : Remplacer par des placeholders (Rapide)**
```sql
-- Dans Supabase SQL Editor
\i scripts/sql/04-fix-missing-images.sql
```

Ce script va :
- Remplacer `/images/shampoing.jpg` → `/images/category-cheveux.png`
- Remplacer `/images/fond-teint.jpg` → `/images/category-maquillage.png`
- Remplacer `/images/vitamine.jpg` → `/images/category-parapharmacie.png`

**Option 2 : Uploader les vraies images (Recommandé)**
1. Aller dans l'admin : `/admin/products`
2. Modifier les produits concernés
3. Uploader les images via Uploadthing
4. Sauvegarder

### Fichiers concernés
- 📄 `scripts/sql/04-fix-missing-images.sql` - Script de correction
- 📁 `public/images/` - Dossier des images

---

## ❌ PROBLÈME 3 : Tables dupliquées / legacy

### Symptômes
La base de données contient des tables en double :
- `Order` vs `orders`
- `OrderItem` vs `order_items`
- `Address` vs `user_addresses`
- `UserFavorite` vs `user_favorites`

### Cause
Migration incomplète ou ancien schéma non nettoyé.

### Solution ✅

**⚠️ ATTENTION : Créer un backup avant !**

```bash
# Backup de la base de données
pg_dump -U postgres -d flawlessbeauty > backup_$(date +%Y%m%d).sql
```

**Ensuite, nettoyer les tables legacy :**
```sql
-- Dans Supabase SQL Editor
-- 1. Vérifier le contenu des tables
\i scripts/sql/05-cleanup-legacy-tables.sql

-- 2. Si les tables sont vides, décommenter la section DROP TABLE
-- 3. Re-exécuter le script
```

### Tables à supprimer
- ❌ `contact_messages`
- ❌ `newsletter_subscribers`
- ❌ `order_items` (doublon)
- ❌ `orders` (doublon)
- ❌ `profiles`
- ❌ `shipping_methods`
- ❌ `user_addresses` (doublon)
- ❌ `user_favorites` (doublon)
- ❌ `user_roles`
- ❌ `user_suspensions`

### Fichiers concernés
- 📄 `scripts/sql/05-cleanup-legacy-tables.sql` - Script de nettoyage

---

## ❌ PROBLÈME 4 : ENUMs incomplets

### Symptômes
```sql
ERROR: invalid input value for enum OrderStatus: "CONFIRMED"
```

### Cause
L'ENUM `OrderStatus` dans la base de données ne contient que 4 valeurs au lieu de 6.

**État actuel :**
- ✅ PENDING
- ❌ CONFIRMED (manquant)
- ❌ PROCESSING (manquant)
- ✅ SHIPPED
- ❌ DELIVERED (manquant)
- ✅ CANCELLED

**ENUMs manquants :**
- ❌ `PaymentStatus` (n'existe pas)
- ❌ `PaymentMethod` (n'existe pas)
- ❌ `ShippingZone` (n'existe pas)

### Solution ✅

Le script `02-fix-order-table.sql` crée automatiquement tous les ENUMs manquants.

```sql
-- Exécuter le script de correction
\i scripts/sql/02-fix-order-table.sql
```

### Fichiers concernés
- 📄 `scripts/sql/02-fix-order-table.sql` - Crée les ENUMs
- 📄 `prisma/schema.prisma` - Définition des ENUMs

---

## ❌ PROBLÈME 5 : Erreur de compilation Next.js

### Symptômes
```
Error: Build failed
Type error: Property 'orderNumber' does not exist on type 'Order'
```

### Cause
Le client Prisma n'est pas synchronisé avec la base de données.

### Solution ✅

```bash
# 1. Appliquer les corrections SQL (voir problème 1)

# 2. Régénérer le client Prisma
npx prisma generate

# 3. Redémarrer le serveur de dev
npm run dev
```

### Fichiers concernés
- 📄 `prisma/schema.prisma` - Schéma de données
- 📁 `node_modules/.prisma/client/` - Client généré

---

## ❌ PROBLÈME 6 : Guest checkout ne fonctionne pas

### Symptômes
```
Error: userId is required
```

### Cause
La colonne `userId` dans la table `Order` est NOT NULL alors qu'elle devrait être nullable pour le guest checkout.

### Solution ✅

Le script `02-fix-order-table.sql` rend la colonne `userId` nullable :

```sql
-- Exécuter le script de correction
\i scripts/sql/02-fix-order-table.sql
```

### Vérification
```sql
-- Vérifier que userId est nullable
SELECT column_name, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'Order' AND column_name = 'userId';

-- Résultat attendu : is_nullable = YES
```

### Fichiers concernés
- 📄 `scripts/sql/02-fix-order-table.sql` - Rend userId nullable
- 📄 `app/api/checkout/route.ts` - API de checkout

---

## 📊 Diagnostic complet

Pour vérifier l'état de votre base de données :

```sql
-- Exécuter le diagnostic complet
\i scripts/sql/01-diagnostic-database.sql
```

Ce script affiche :
- ✅ Liste de toutes les tables
- ✅ Structure de la table Order
- ✅ Colonnes manquantes
- ✅ ENUMs disponibles
- ✅ Contraintes et relations
- ✅ Statistiques des données

---

## 🚀 Ordre d'exécution recommandé

Pour résoudre tous les problèmes :

```bash
# 1. Diagnostic initial
psql < scripts/sql/01-diagnostic-database.sql

# 2. Correction de la table Order (CRITIQUE)
psql < scripts/sql/02-fix-order-table.sql

# 3. Vérification post-correction
psql < scripts/sql/03-verify-order-table.sql

# 4. Correction des images manquantes
psql < scripts/sql/04-fix-missing-images.sql

# 5. Nettoyage des tables legacy (OPTIONNEL)
psql < scripts/sql/05-cleanup-legacy-tables.sql

# 6. Régénération Prisma
npx prisma generate

# 7. Redémarrage du serveur
npm run dev
```

---

## 📝 Checklist de vérification

Après avoir exécuté les scripts :

- [ ] Table `Order` contient 29 colonnes
- [ ] ENUMs créés (OrderStatus, PaymentStatus, PaymentMethod, ShippingZone)
- [ ] `userId` est nullable dans `Order`
- [ ] Contrainte unique sur `orderNumber`
- [ ] Images manquantes remplacées
- [ ] Client Prisma régénéré
- [ ] Serveur redémarré
- [ ] Checkout fonctionnel

---

## 🆘 Support

### En cas de problème persistant :

1. **Vérifier les logs**
   ```bash
   # Logs Next.js
   npm run dev
   
   # Logs Prisma
   DEBUG=prisma:* npm run dev
   ```

2. **Consulter la documentation**
   - 📄 `database_schemas.md` - Structure complète de la DB
   - 📄 `scripts/sql/README.md` - Guide des scripts SQL
   - 📄 `prisma/schema.prisma` - Schéma Prisma

3. **Créer un backup**
   ```bash
   # Supabase CLI
   supabase db dump > backup.sql
   
   # ou pg_dump
   pg_dump -U postgres -d flawlessbeauty > backup.sql
   ```

4. **Réinitialiser la DB (dernier recours)**
   ```bash
   # ⚠️ ATTENTION : Cela supprime toutes les données !
   npx prisma migrate reset
   npx prisma db push
   npx prisma db seed
   ```

---

## 📚 Ressources

- **Documentation Prisma** : https://www.prisma.io/docs
- **Documentation Supabase** : https://supabase.com/docs
- **Documentation Next.js** : https://nextjs.org/docs

---

**Dernière mise à jour :** 2025-10-09  
**Version :** 1.0.0
