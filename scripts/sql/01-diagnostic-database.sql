-- =====================================================
-- SCRIPTS SQL DE DIAGNOSTIC POUR SUPABASE
-- =====================================================
-- Exécutez ces scripts dans le SQL Editor de Supabase
-- pour diagnostiquer la structure de votre base de données
-- =====================================================

-- 1. LISTER TOUTES LES TABLES
-- =====================================================
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. VÉRIFIER LA STRUCTURE DE LA TABLE "Order"
-- =====================================================
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable,
    udt_name
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'Order'
ORDER BY ordinal_position;

-- 3. VÉRIFIER LES CONTRAINTES ET INDEX SUR "Order"
-- =====================================================
SELECT
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public' 
    AND tc.table_name = 'Order'
ORDER BY tc.constraint_type, kcu.column_name;

-- 4. VÉRIFIER LES CLÉS ÉTRANGÈRES
-- =====================================================
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
    AND tc.table_name = 'Order';

-- 5. COMPTER LES ENREGISTREMENTS DANS LES TABLES PRINCIPALES
-- =====================================================
SELECT 'User' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Product', COUNT(*) FROM "Product"
UNION ALL
SELECT 'Category', COUNT(*) FROM "Category"
UNION ALL
SELECT 'Order', COUNT(*) FROM "Order"
UNION ALL
SELECT 'OrderItem', COUNT(*) FROM "OrderItem"
UNION ALL
SELECT 'Cart', COUNT(*) FROM "Cart"
UNION ALL
SELECT 'CartItem', COUNT(*) FROM "CartItem"
UNION ALL
SELECT 'Brand', COUNT(*) FROM "Brand"
UNION ALL
SELECT 'Subcategory', COUNT(*) FROM "Subcategory"
ORDER BY table_name;

-- 6. VÉRIFIER LES TYPES ENUM PERSONNALISÉS
-- =====================================================
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN ('OrderStatus', 'PaymentStatus', 'PaymentMethod', 'ShippingZone')
ORDER BY t.typname, e.enumsortorder;

-- 7. VÉRIFIER LES COLONNES MANQUANTES POTENTIELLES DANS "Order"
-- =====================================================
-- Ce script vérifie si les colonnes définies dans Prisma existent
SELECT 
    CASE 
        WHEN column_name IS NULL THEN '❌ MANQUANTE'
        ELSE '✅ EXISTE'
    END AS status,
    expected_column
FROM (
    VALUES 
        ('id'),
        ('orderNumber'),
        ('userId'),
        ('firstName'),
        ('lastName'),
        ('email'),
        ('phone'),
        ('ville'),
        ('quartier'),
        ('adresseDetaillee'),
        ('orderNote'),
        ('guestEmail'),
        ('guestName'),
        ('guestPhone'),
        ('shippingName'),
        ('shippingPhone'),
        ('shippingAddress'),
        ('shippingCity'),
        ('shippingZone'),
        ('shippingFees'),
        ('paymentMethod'),
        ('paymentStatus'),
        ('paytechToken'),
        ('paytechRef'),
        ('subtotalCents'),
        ('shippingCents'),
        ('totalCents'),
        ('status'),
        ('createdAt'),
        ('updatedAt')
) AS expected(expected_column)
LEFT JOIN information_schema.columns c
    ON c.table_schema = 'public' 
    AND c.table_name = 'Order' 
    AND c.column_name = expected.expected_column
ORDER BY 
    CASE WHEN column_name IS NULL THEN 0 ELSE 1 END,
    expected_column;

-- 8. STATISTIQUES SUR LES COMMANDES (si la table existe)
-- =====================================================
-- Décommentez si la table Order existe et contient des données
/*
SELECT 
    status,
    COUNT(*) as count,
    SUM(totalCents) / 100.0 as total_amount_fcfa
FROM "Order"
GROUP BY status
ORDER BY count DESC;
*/

-- 9. VÉRIFIER LES MIGRATIONS PRISMA
-- =====================================================
SELECT * FROM "_prisma_migrations"
ORDER BY finished_at DESC
LIMIT 10;

-- 10. RÉSUMÉ DE LA STRUCTURE DE TOUTES LES TABLES
-- =====================================================
SELECT 
    t.table_name,
    COUNT(c.column_name) as column_count,
    COUNT(DISTINCT tc.constraint_type) as constraint_count
FROM information_schema.tables t
LEFT JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
LEFT JOIN information_schema.table_constraints tc 
    ON t.table_name = tc.table_name 
    AND t.table_schema = tc.table_schema
WHERE t.table_schema = 'public' 
    AND t.table_type = 'BASE TABLE'
GROUP BY t.table_name
ORDER BY t.table_name;
