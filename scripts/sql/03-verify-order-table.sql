-- ====================================================================
-- Script de vérification : Table Order
-- Description : Vérifie que toutes les colonnes requises existent
-- Date : 2025-10-09
-- ====================================================================

-- ====================================================================
-- 1. Vérifier les ENUMs
-- ====================================================================

SELECT '📋 ENUMs disponibles :' as info;
SELECT 
    typname as enum_name,
    enumlabel as enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE typname IN ('OrderStatus', 'PaymentStatus', 'PaymentMethod', 'ShippingZone')
ORDER BY typname, e.enumsortorder;

-- ====================================================================
-- 2. Structure complète de la table Order
-- ====================================================================

SELECT '📊 Structure de la table Order :' as info;
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    CASE 
        WHEN column_name IN (
            'orderNumber', 'firstName', 'lastName', 'email', 'phone',
            'ville', 'quartier', 'adresseDetaillee', 'paymentMethod', 
            'paymentStatus', 'subtotalCents', 'shippingCents', 'shippingZone'
        ) THEN '✅ Requis'
        ELSE '📝 Optionnel'
    END as statut
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'Order'
ORDER BY ordinal_position;

-- ====================================================================
-- 3. Vérifier les colonnes manquantes
-- ====================================================================

SELECT '🔍 Vérification des colonnes requises :' as info;

WITH required_columns AS (
    SELECT unnest(ARRAY[
        'orderNumber', 'firstName', 'lastName', 'email', 'phone',
        'ville', 'quartier', 'adresseDetaillee', 'orderNote',
        'guestEmail', 'guestName', 'guestPhone',
        'shippingName', 'shippingPhone', 'shippingAddress', 'shippingCity', 
        'shippingZone', 'shippingFees',
        'paymentMethod', 'paymentStatus', 'paytechToken', 'paytechRef',
        'subtotalCents', 'shippingCents', 'totalCents', 'status',
        'createdAt', 'updatedAt', 'userId'
    ]) as expected_column
),
existing_columns AS (
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Order'
)
SELECT 
    rc.expected_column,
    CASE 
        WHEN ec.column_name IS NOT NULL THEN '✅ EXISTE'
        ELSE '❌ MANQUANTE'
    END as status
FROM required_columns rc
LEFT JOIN existing_columns ec ON rc.expected_column = ec.column_name
ORDER BY status DESC, expected_column;

-- ====================================================================
-- 4. Contraintes et index
-- ====================================================================

SELECT '🔒 Contraintes de la table Order :' as info;
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public' AND tc.table_name = 'Order'
ORDER BY tc.constraint_type, tc.constraint_name;

-- ====================================================================
-- 5. Relations (Foreign Keys)
-- ====================================================================

SELECT '🔗 Relations de la table Order :' as info;
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

-- ====================================================================
-- 6. Résumé final
-- ====================================================================

DO $$ 
DECLARE
    total_columns INTEGER;
    required_columns INTEGER;
    missing_columns INTEGER;
BEGIN
    -- Compter les colonnes
    SELECT COUNT(*) INTO total_columns
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Order';
    
    -- Compter les colonnes requises
    required_columns := 29;
    
    -- Calculer les colonnes manquantes
    SELECT COUNT(*) INTO missing_columns
    FROM (
        SELECT unnest(ARRAY[
            'orderNumber', 'firstName', 'lastName', 'email', 'phone',
            'ville', 'quartier', 'adresseDetaillee', 'orderNote',
            'guestEmail', 'guestName', 'guestPhone',
            'shippingName', 'shippingPhone', 'shippingAddress', 'shippingCity', 
            'shippingZone', 'shippingFees',
            'paymentMethod', 'paymentStatus', 'paytechToken', 'paytechRef',
            'subtotalCents', 'shippingCents', 'totalCents', 'status',
            'createdAt', 'updatedAt', 'userId'
        ]) as expected_column
    ) rc
    LEFT JOIN (
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'Order'
    ) ec ON rc.expected_column = ec.column_name
    WHERE ec.column_name IS NULL;
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '                  📊 RÉSUMÉ FINAL';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE '📋 Colonnes dans la table Order : % / % requises', total_columns, required_columns;
    
    IF missing_columns = 0 THEN
        RAISE NOTICE '✅ Toutes les colonnes requises sont présentes !';
        RAISE NOTICE '';
        RAISE NOTICE '🚀 La table Order est prête pour le checkout PayTech';
        RAISE NOTICE '';
        RAISE NOTICE '📝 Prochaines étapes :';
        RAISE NOTICE '   1. Configurer les variables PayTech dans .env';
        RAISE NOTICE '   2. Implémenter les routes API PayTech';
        RAISE NOTICE '   3. Créer les composants de checkout';
        RAISE NOTICE '   4. Tester le flow complet';
    ELSE
        RAISE NOTICE '❌ % colonnes manquantes détectées', missing_columns;
        RAISE NOTICE '';
        RAISE NOTICE '⚠️  Exécutez le script 02-fix-order-table.sql pour corriger';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
END $$;
