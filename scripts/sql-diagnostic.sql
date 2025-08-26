-- =====================================================
-- DIAGNOSTIC COMPLET DE LA BASE DE DONNÉES MAMI SHOP
-- =====================================================

-- 1. INFORMATIONS SYSTÈME
-- =====================================================
SELECT 
    'VERSION_POSTGRES' as info_type,
    version() as value
UNION ALL
SELECT 
    'BASE_ACTUELLE',
    current_database()
UNION ALL
SELECT 
    'UTILISATEUR_ACTUEL',
    current_user
UNION ALL
SELECT 
    'SCHEMA_ACTUEL',
    current_schema();

-- 2. LISTE COMPLÈTE DES TABLES
-- =====================================================
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 3. STRUCTURE DÉTAILLÉE DES TABLES PRINCIPALES
-- =====================================================
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default,
    c.ordinal_position
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE t.table_schema = 'public' 
AND t.table_type = 'BASE TABLE'
AND t.table_name IN ('User', 'Product', 'Category', 'Brand', 'Order', 'Cart')
ORDER BY t.table_name, c.ordinal_position;

-- 4. CONTRAINTES ET CLÉS
-- =====================================================
SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- 5. INDEX ET PERFORMANCE
-- =====================================================
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_indexes i
LEFT JOIN pg_stat_user_indexes s ON i.indexname = s.indexrelname
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 6. COMPTAGE DES DONNÉES
-- =====================================================
SELECT 'User' as table_name, COUNT(*) as record_count FROM "User"
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

-- 7. VÉRIFICATION DES RELATIONS ET INTÉGRITÉ
-- =====================================================
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

-- 8. DÉTECTION DES PROBLÈMES
-- =====================================================
-- Produits orphelins (sans catégorie)
SELECT 
    'PRODUITS_SANS_CATEGORIE' as probleme,
    COUNT(*) as nombre
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
WHERE c.id IS NULL

UNION ALL

-- Produits orphelins (sans marque)
SELECT 
    'PRODUITS_SANS_MARQUE',
    COUNT(*)
FROM "Product" p
LEFT JOIN "Brand" b ON p."brandId" = b.id
WHERE b.id IS NULL

UNION ALL

-- Catégories sans produits
SELECT 
    'CATEGORIES_VIDES',
    COUNT(*)
FROM "Category" c
LEFT JOIN "Product" p ON c.id = p."categoryId"
WHERE p.id IS NULL

UNION ALL

-- Marques sans produits
SELECT 
    'MARQUES_VIDES',
    COUNT(*)
FROM "Brand" b
LEFT JOIN "Product" p ON b.id = p."brandId"
WHERE p.id IS NULL;

-- 9. STATISTIQUES DES DONNÉES
-- =====================================================
-- Répartition des produits par catégorie
SELECT 
    c.name as category_name,
    COUNT(p.id) as product_count,
    AVG(p.priceCents) as avg_price,
    MIN(p.priceCents) as min_price,
    MAX(p.priceCents) as max_price
FROM "Category" c
LEFT JOIN "Product" p ON c.id = p."categoryId"
GROUP BY c.id, c.name
ORDER BY product_count DESC;

-- Répartition des produits par marque
SELECT 
    b.name as brand_name,
    COUNT(p.id) as product_count,
    AVG(p.priceCents) as avg_price
FROM "Brand" b
LEFT JOIN "Product" p ON b.id = p."brandId"
GROUP BY b.id, b.name
ORDER BY product_count DESC;

-- 10. VÉRIFICATION DES TIMESTAMPS
-- =====================================================
SELECT 
    'DERNIERE_MODIFICATION_PRODUIT' as info,
    MAX(updatedAt) as date
FROM "Product"
UNION ALL
SELECT 
    'DERNIERE_MODIFICATION_CATEGORIE',
    MAX(updatedAt)
FROM "Category"
UNION ALL
SELECT 
    'DERNIERE_MODIFICATION_MARQUE',
    MAX(updatedAt)
FROM "Brand"
UNION ALL
SELECT 
    'DERNIERE_COMMANDE',
    MAX(createdAt)
FROM "Order";

-- 11. VÉRIFICATION DES PERMISSIONS
-- =====================================================
SELECT 
    grantee,
    table_name,
    privilege_type,
    is_grantable
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
AND grantee = current_user
ORDER BY table_name, privilege_type;
