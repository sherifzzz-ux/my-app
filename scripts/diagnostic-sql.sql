-- ========================================
-- DIAGNOSTIC COMPLET DE LA BASE DE DONNÉES
-- ========================================

-- 1. LISTER TOUTES LES TABLES DU SCHÉMA PUBLIC
-- ============================================
SELECT 
    table_name,
    table_type,
    is_insertable_into,
    is_typed
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. VÉRIFIER LA STRUCTURE DES TABLES PRINCIPALES
-- ===============================================

-- Table users (si elle existe)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- Table orders (si elle existe)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'orders'
ORDER BY ordinal_position;

-- Table products (si elle existe)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;

-- Table user_favorites (si elle existe)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_favorites'
ORDER BY ordinal_position;

-- 3. COMPTER LES ENREGISTREMENTS DANS CHAQUE TABLE
-- ================================================

-- Compter les utilisateurs
SELECT 
    'users' as table_name,
    COUNT(*) as record_count
FROM users
UNION ALL
SELECT 
    'orders' as table_name,
    COUNT(*) as record_count
FROM orders
UNION ALL
SELECT 
    'products' as table_name,
    COUNT(*) as record_count
FROM products
UNION ALL
SELECT 
    'user_favorites' as table_name,
    COUNT(*) as record_count
FROM user_favorites;

-- 4. VÉRIFIER LES RELATIONS ET CONTRAINTES
-- ========================================

-- Contraintes de clés étrangères
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 5. VÉRIFIER LES POLITIQUES RLS (ROW LEVEL SECURITY)
-- ===================================================

-- Tables avec RLS activé
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;

-- Politiques RLS actives
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

-- 6. VÉRIFIER LES PERMISSIONS UTILISATEUR
-- ========================================

-- Permissions sur les tables
SELECT 
    table_schema,
    table_name,
    privilege_type,
    grantee
FROM information_schema.table_privileges 
WHERE table_schema = 'public'
ORDER BY table_name, privilege_type;

-- 7. VÉRIFIER LES INDEX
-- ======================

-- Index sur les tables principales
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
AND tablename IN ('users', 'orders', 'products', 'user_favorites')
ORDER BY tablename, indexname;

-- 8. VÉRIFIER LES SÉQUENCES
-- ==========================

-- Séquences auto-incrémentées
SELECT 
    sequence_schema,
    sequence_name,
    data_type,
    start_value,
    increment
FROM information_schema.sequences 
WHERE sequence_schema = 'public'
ORDER BY sequence_name;

-- 9. TESTER L'ACCÈS AUX DONNÉES
-- ==============================

-- Test d'accès à la table users (si elle existe)
SELECT 
    'users' as table_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM users LIMIT 1) THEN 'Accessible'
        ELSE 'Non accessible ou vide'
    END as status,
    COUNT(*) as record_count
FROM users;

-- Test d'accès à la table orders (si elle existe)
SELECT 
    'orders' as table_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM orders LIMIT 1) THEN 'Accessible'
        ELSE 'Non accessible ou vide'
    END as status,
    COUNT(*) as record_count
FROM orders;

-- Test d'accès à la table products (si elle existe)
SELECT 
    'products' as table_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM products LIMIT 1) THEN 'Accessible'
        ELSE 'Non accessible ou vide'
    END as status,
    COUNT(*) as record_count
FROM products;

-- 10. VÉRIFIER LES DONNÉES D'AUTHENTIFICATION SUPABASE
-- ====================================================

-- Tables du schéma auth (si accessible)
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'auth' 
ORDER BY table_name;

-- 11. DIAGNOSTIC DES ERREURS RÉCENTES
-- ====================================

-- Vérifier les erreurs dans les logs (si accessible)
SELECT 
    'Logs access' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_stat_activity) THEN 'Accessible'
        ELSE 'Non accessible'
    END as status;

-- 12. RÉSUMÉ DE LA STRUCTURE
-- ===========================

-- Vue d'ensemble des tables et leurs enregistrements
WITH table_counts AS (
    SELECT 'users' as table_name, COUNT(*) as count FROM users
    UNION ALL
    SELECT 'orders', COUNT(*) FROM orders
    UNION ALL
    SELECT 'products', COUNT(*) FROM products
    UNION ALL
    SELECT 'user_favorites', COUNT(*) FROM user_favorites
)
SELECT 
    table_name,
    count,
    CASE 
        WHEN count = 0 THEN 'Vide'
        WHEN count < 10 THEN 'Peu de données'
        WHEN count < 100 THEN 'Modérément remplie'
        ELSE 'Bien remplie'
    END as status
FROM table_counts
ORDER BY table_name;
