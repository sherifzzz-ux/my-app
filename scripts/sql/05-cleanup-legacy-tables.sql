-- ====================================================================
-- Script de nettoyage : Tables legacy
-- Description : Supprime les tables dupliquées et obsolètes
-- Date : 2025-10-09
-- ⚠️ ATTENTION : Ce script supprime définitivement des tables
-- ====================================================================

-- ====================================================================
-- AVERTISSEMENT
-- ====================================================================

DO $$ 
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '           ⚠️  SCRIPT DE NETTOYAGE LEGACY ⚠️';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE 'Ce script va SUPPRIMER DÉFINITIVEMENT les tables suivantes :';
    RAISE NOTICE '';
    RAISE NOTICE '  ❌ contact_messages';
    RAISE NOTICE '  ❌ newsletter_subscribers';
    RAISE NOTICE '  ❌ order_items (doublon de OrderItem)';
    RAISE NOTICE '  ❌ orders (doublon de Order)';
    RAISE NOTICE '  ❌ profiles';
    RAISE NOTICE '  ❌ shipping_methods';
    RAISE NOTICE '  ❌ user_addresses (doublon de Address)';
    RAISE NOTICE '  ❌ user_favorites (doublon de UserFavorite)';
    RAISE NOTICE '  ❌ user_roles';
    RAISE NOTICE '  ❌ user_suspensions';
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  VÉRIFIEZ QUE CES TABLES NE CONTIENNENT PAS DE DONNÉES IMPORTANTES !';
    RAISE NOTICE '';
    RAISE NOTICE 'Pour continuer :';
    RAISE NOTICE '  1. Créez un backup de la base de données';
    RAISE NOTICE '  2. Décommentez les lignes DROP TABLE ci-dessous';
    RAISE NOTICE '  3. Relancez le script';
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '';
END $$;

-- ====================================================================
-- 1. Vérifier le contenu des tables legacy
-- ====================================================================

-- Contact messages
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contact_messages') THEN
        SELECT COUNT(*) INTO row_count FROM "contact_messages";
        RAISE NOTICE '📧 contact_messages : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ contact_messages : n''existe pas';
    END IF;
END $$;

-- Newsletter subscribers
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'newsletter_subscribers') THEN
        SELECT COUNT(*) INTO row_count FROM "newsletter_subscribers";
        RAISE NOTICE '📬 newsletter_subscribers : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ newsletter_subscribers : n''existe pas';
    END IF;
END $$;

-- Orders (legacy)
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        SELECT COUNT(*) INTO row_count FROM "orders";
        RAISE NOTICE '📦 orders (legacy) : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ orders (legacy) : n''existe pas';
    END IF;
END $$;

-- Order items (legacy)
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'order_items') THEN
        SELECT COUNT(*) INTO row_count FROM "order_items";
        RAISE NOTICE '📋 order_items (legacy) : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ order_items (legacy) : n''existe pas';
    END IF;
END $$;

-- Profiles
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
        SELECT COUNT(*) INTO row_count FROM "profiles";
        RAISE NOTICE '👤 profiles : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ profiles : n''existe pas';
    END IF;
END $$;

-- Shipping methods
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shipping_methods') THEN
        SELECT COUNT(*) INTO row_count FROM "shipping_methods";
        RAISE NOTICE '🚚 shipping_methods : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ shipping_methods : n''existe pas';
    END IF;
END $$;

-- User addresses (legacy)
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_addresses') THEN
        SELECT COUNT(*) INTO row_count FROM "user_addresses";
        RAISE NOTICE '🏠 user_addresses (legacy) : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ user_addresses (legacy) : n''existe pas';
    END IF;
END $$;

-- User favorites (legacy)
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_favorites') THEN
        SELECT COUNT(*) INTO row_count FROM "user_favorites";
        RAISE NOTICE '⭐ user_favorites (legacy) : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ user_favorites (legacy) : n''existe pas';
    END IF;
END $$;

-- User roles
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles') THEN
        SELECT COUNT(*) INTO row_count FROM "user_roles";
        RAISE NOTICE '🔑 user_roles : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ user_roles : n''existe pas';
    END IF;
END $$;

-- User suspensions
DO $$
DECLARE
    row_count INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_suspensions') THEN
        SELECT COUNT(*) INTO row_count FROM "user_suspensions";
        RAISE NOTICE '🚫 user_suspensions : % lignes', row_count;
    ELSE
        RAISE NOTICE '✅ user_suspensions : n''existe pas';
    END IF;
END $$;

-- ====================================================================
-- 2. Afficher les données avant suppression (OPTIONNEL)
-- ====================================================================

-- Décommentez pour voir les données dans les tables legacy

-- SELECT '📧 Aperçu contact_messages :' as info;
-- SELECT * FROM "contact_messages" LIMIT 5;

-- SELECT '📬 Aperçu newsletter_subscribers :' as info;
-- SELECT * FROM "newsletter_subscribers" LIMIT 5;

-- SELECT '📦 Aperçu orders (legacy) :' as info;
-- SELECT * FROM "orders" LIMIT 5;

-- ====================================================================
-- 3. SUPPRESSION DES TABLES (DÉCOMMENTER POUR ACTIVER)
-- ====================================================================

/*
-- ⚠️  DÉCOMMENTEZ CES LIGNES APRÈS AVOIR CRÉÉ UN BACKUP

-- Supprimer les tables legacy (sans contraintes FK)
DROP TABLE IF EXISTS "contact_messages" CASCADE;
DROP TABLE IF EXISTS "newsletter_subscribers" CASCADE;
DROP TABLE IF EXISTS "profiles" CASCADE;
DROP TABLE IF EXISTS "shipping_methods" CASCADE;
DROP TABLE IF EXISTS "user_roles" CASCADE;
DROP TABLE IF EXISTS "user_suspensions" CASCADE;

-- Supprimer les tables avec contraintes FK (dans l'ordre)
DROP TABLE IF EXISTS "order_items" CASCADE;
DROP TABLE IF EXISTS "orders" CASCADE;
DROP TABLE IF EXISTS "user_favorites" CASCADE;
DROP TABLE IF EXISTS "user_addresses" CASCADE;

RAISE NOTICE '';
RAISE NOTICE '✅ Toutes les tables legacy ont été supprimées';
RAISE NOTICE '';
*/

-- ====================================================================
-- 4. Vérification finale
-- ====================================================================

SELECT '📊 Tables restantes après nettoyage :' as info;

SELECT 
    table_name,
    CASE 
        WHEN table_name IN (
            'User', 'Category', 'Subcategory', 'Brand', 'Product',
            'Order', 'OrderItem', 'Cart', 'CartItem', 'Review',
            'Address', 'UserFavorite', 'DeliveryZone'
        ) THEN '✅ Active'
        ELSE '⚠️ Legacy'
    END as status
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY status, table_name;

-- ====================================================================
-- 5. Résumé
-- ====================================================================

DO $$ 
DECLARE
    active_tables INTEGER;
    legacy_tables INTEGER;
BEGIN
    -- Compter les tables actives
    SELECT COUNT(*) INTO active_tables
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name IN (
          'User', 'Category', 'Subcategory', 'Brand', 'Product',
          'Order', 'OrderItem', 'Cart', 'CartItem', 'Review',
          'Address', 'UserFavorite', 'DeliveryZone'
      );
    
    -- Compter les tables legacy
    SELECT COUNT(*) INTO legacy_tables
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name NOT IN (
          'User', 'Category', 'Subcategory', 'Brand', 'Product',
          'Order', 'OrderItem', 'Cart', 'CartItem', 'Review',
          'Address', 'UserFavorite', 'DeliveryZone'
      );
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '                   📊 RÉSUMÉ';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Tables actives (Prisma) : %', active_tables;
    RAISE NOTICE '⚠️  Tables legacy restantes : %', legacy_tables;
    RAISE NOTICE '';
    
    IF legacy_tables > 0 THEN
        RAISE NOTICE '💡 Pour supprimer les tables legacy :';
        RAISE NOTICE '   1. Créez un backup : pg_dump -U postgres -d flawlessbeauty > backup.sql';
        RAISE NOTICE '   2. Vérifiez le contenu des tables legacy';
        RAISE NOTICE '   3. Décommentez la section "SUPPRESSION DES TABLES"';
        RAISE NOTICE '   4. Re-exécutez ce script';
    ELSE
        RAISE NOTICE '✅ Aucune table legacy détectée';
        RAISE NOTICE '🎉 La base de données est propre !';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
END $$;
