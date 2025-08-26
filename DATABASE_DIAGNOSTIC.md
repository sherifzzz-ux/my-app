# Diagnostic de la Base de Données Supabase - Mami Shop

## 🎯 Contexte Supabase
Vous utilisez **uniquement Supabase** comme base de données PostgreSQL hébergée.

## 📊 Schéma Prisma Identifié

### Modèles Principaux
- **User**: Utilisateurs avec email, nom, mot de passe
- **Product**: Produits avec prix, stock, catégorie, marque
- **Category**: Catégories de produits
- **Subcategory**: Sous-catégories
- **Brand**: Marques de produits
- **Order**: Commandes avec statut et total
- **Cart**: Panier d'achat
- **Review**: Avis sur les produits
- **Address**: Adresses des utilisateurs

### Relations Clés
- User ↔ Order (1:N)
- User ↔ Cart (1:1)
- User ↔ Review (1:N)
- User ↔ Address (1:N)
- Category ↔ Product (1:N)
- Brand ↔ Product (1:N)
- Product ↔ Review (1:N)
- Product ↔ OrderItem (1:N)

## 🔍 Requêtes de Diagnostic Supabase

### 1. Vérification de la Connexion Supabase
```sql
-- Test de base
SELECT version();
SELECT current_database();
SELECT current_user;

-- Vérification des schémas Supabase
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name IN ('public', 'auth', 'storage', 'graphql_public')
ORDER BY schema_name;
```

### 2. Vérification des Tables Publiques
```sql
-- Tables dans le schéma public (votre application)
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Vérification des tables d'authentification Supabase
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth' 
ORDER BY table_name;
```

### 3. Vérification des Colonnes des Tables Principales
```sql
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('User', 'Product', 'Category', 'Brand', 'Order')
ORDER BY table_name, ordinal_position;
```

### 4. Vérification des Contraintes et RLS
```sql
-- Contraintes de base
SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- Vérification des politiques RLS (Row Level Security)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### 5. Vérification des Index et Performance
```sql
-- Index sur les tables principales
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Statistiques d'utilisation des index
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### 6. Compter les Enregistrements
```sql
-- Compter les enregistrements dans chaque table
SELECT 'User' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Product', COUNT(*) FROM "Product"
UNION ALL
SELECT 'Category', COUNT(*) FROM "Category"
UNION ALL
SELECT 'Subcategory', COUNT(*) FROM "Subcategory"
UNION ALL
SELECT 'Brand', COUNT(*) FROM "Brand"
UNION ALL
SELECT 'Order', COUNT(*) FROM "Order"
UNION ALL
SELECT 'OrderItem', COUNT(*) FROM "OrderItem"
UNION ALL
SELECT 'Cart', COUNT(*) FROM "Cart"
UNION ALL
SELECT 'CartItem', COUNT(*) FROM "CartItem"
UNION ALL
SELECT 'Review', COUNT(*) FROM "Review"
UNION ALL
SELECT 'Address', COUNT(*) FROM "Address";
```

### 7. Vérification des Relations et Intégrité
```sql
-- Produits avec catégories et marques
SELECT 
    p.id,
    p.name as product_name,
    p."categoryId",
    c.name as category_name,
    p."brandId",
    b.name as brand_name,
    p.stock,
    p.priceCents
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
LEFT JOIN "Brand" b ON p."brandId" = b.id
ORDER BY p.createdAt DESC
LIMIT 10;
```

### 8. Détection des Problèmes Spécifiques Supabase
```sql
-- Vérification des produits orphelins
SELECT 
    'PRODUITS_SANS_CATEGORIE' as probleme,
    COUNT(*) as nombre
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
WHERE c.id IS NULL

UNION ALL

-- Vérification des permissions utilisateur
SELECT 
    'PERMISSIONS_UTILISATEUR',
    has_table_privilege(current_user, '"User"', 'SELECT') as can_read_user,
    has_table_privilege(current_user, '"Product"', 'SELECT') as can_read_product,
    has_table_privilege(current_user, '"Category"', 'SELECT') as can_read_category;

-- Vérification des connexions actives
SELECT 
    datname,
    usename,
    application_name,
    client_addr,
    state,
    query_start
FROM pg_stat_activity 
WHERE datname = current_database()
AND state = 'active';
```

### 9. Vérification des Tables d'Authentification
```sql
-- Utilisateurs dans le système d'auth Supabase
SELECT 
    au.id,
    au.email,
    au.created_at,
    au.last_sign_in_at,
    au.confirmed_at
FROM auth.users au
ORDER BY au.created_at DESC
LIMIT 10;

-- Vérification des sessions actives
SELECT 
    id,
    user_id,
    created_at,
    not_after
FROM auth.sessions
WHERE not_after > now()
ORDER BY created_at DESC;
```

### 10. Vérification des Politiques RLS
```sql
-- Politiques RLS actives
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('User', 'Product', 'Category', 'Brand', 'Order')
ORDER BY tablename, policyname;

-- Test des politiques RLS
-- (Exécuter en tant qu'utilisateur authentifié)
SELECT 
    'TEST_RLS_PRODUCT' as test,
    COUNT(*) as accessible_products
FROM "Product";

SELECT 
    'TEST_RLS_CATEGORY' as test,
    COUNT(*) as accessible_categories
FROM "Category";
```

## 🔧 Variables d'Environnement Supabase Requises
```bash
# Connexion principale (via Supabase Edge)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Connexion directe (pour migrations et diagnostics)
DIRECT_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# API Supabase
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Environnement
NODE_ENV=development|production
```

## ⚠️ Problèmes Spécifiques Supabase

### 1. **Base Auto-Suspend**
- Supabase suspend les bases inactives
- Première requête peut prendre 2-5 secondes
- Timeouts courts dans votre configuration (5-10s)

### 2. **Politiques RLS (Row Level Security)**
- Peuvent bloquer l'accès aux données
- Vérifiez que l'utilisateur admin a les bonnes permissions
- Testez avec `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Connexions Edge vs Direct**
- `DATABASE_URL` : Via Supabase Edge (plus lent)
- `DIRECT_URL` : Directement à PostgreSQL (plus rapide)

### 4. **Limites de Connexions**
- Supabase a des limites sur les connexions simultanées
- Vérifiez les connexions actives

## 🚀 Actions de Diagnostic Recommandées

1. **Vérifier les variables d'environnement Supabase**
2. **Tester la connexion directe vs edge**
3. **Vérifier les politiques RLS**
4. **Tester avec les clés de service**
5. **Vérifier les permissions utilisateur**
6. **Analyser les logs de connexion**

## 📋 Checklist Spécifique Supabase

- [ ] Variables d'environnement Supabase présentes
- [ ] Connexion directe à PostgreSQL réussie
- [ ] Connexion via Edge Functions réussie
- [ ] Politiques RLS correctement configurées
- [ ] Permissions utilisateur suffisantes
- [ ] Pas de limite de connexions atteinte
- [ ] Base de données non suspendue
- [ ] Clés d'API Supabase valides
