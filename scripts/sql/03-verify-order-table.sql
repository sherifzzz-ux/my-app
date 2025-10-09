-- =====================================================
-- Script de vérification de la table Order
-- À exécuter après avoir appliqué les corrections
-- =====================================================

-- VÉRIFICATION 1 : Compter les colonnes de la table Order
-- =====================================================
SELECT 
  'Nombre total de colonnes' as verification,
  COUNT(*) as valeur
FROM information_schema.columns
WHERE table_name = 'Order';

-- VÉRIFICATION 2 : Vérifier que les colonnes critiques existent
-- =====================================================
SELECT 
  CASE 
    WHEN column_name = 'orderNumber' THEN '✅ orderNumber'
    WHEN column_name = 'email' THEN '✅ email'
    WHEN column_name = 'firstName' THEN '✅ firstName'
    WHEN column_name = 'lastName' THEN '✅ lastName'
    WHEN column_name = 'phone' THEN '✅ phone'
    WHEN column_name = 'guestEmail' THEN '✅ guestEmail'
    WHEN column_name = 'guestName' THEN '✅ guestName'
    WHEN column_name = 'guestPhone' THEN '✅ guestPhone'
    WHEN column_name = 'shippingAddress' THEN '✅ shippingAddress'
    WHEN column_name = 'shippingName' THEN '✅ shippingName'
    WHEN column_name = 'shippingPhone' THEN '✅ shippingPhone'
    WHEN column_name = 'shippingCity' THEN '✅ shippingCity'
    WHEN column_name = 'ville' THEN '✅ ville'
    WHEN column_name = 'quartier' THEN '✅ quartier'
    WHEN column_name = 'adresseDetaillee' THEN '✅ adresseDetaillee'
    WHEN column_name = 'shippingZone' THEN '✅ shippingZone'
    WHEN column_name = 'shippingCents' THEN '✅ shippingCents'
    WHEN column_name = 'shippingFees' THEN '✅ shippingFees'
    WHEN column_name = 'paymentMethod' THEN '✅ paymentMethod'
    WHEN column_name = 'paymentStatus' THEN '✅ paymentStatus'
    WHEN column_name = 'paytechRef' THEN '✅ paytechRef'
    WHEN column_name = 'paytechToken' THEN '✅ paytechToken'
    WHEN column_name = 'subtotalCents' THEN '✅ subtotalCents'
    WHEN column_name = 'orderNote' THEN '✅ orderNote'
    ELSE column_name
  END as colonne,
  data_type as type,
  CASE 
    WHEN is_nullable = 'YES' THEN 'NULL autorisé'
    ELSE 'NOT NULL'
  END as nullable,
  COALESCE(column_default, 'Aucune') as defaut
FROM information_schema.columns
WHERE table_name = 'Order'
  AND column_name IN (
    'orderNumber', 'email', 'firstName', 'lastName', 'phone',
    'guestEmail', 'guestName', 'guestPhone',
    'shippingAddress', 'shippingName', 'shippingPhone', 'shippingCity',
    'ville', 'quartier', 'adresseDetaillee',
    'shippingZone', 'shippingCents', 'shippingFees',
    'paymentMethod', 'paymentStatus', 'paytechRef', 'paytechToken',
    'subtotalCents', 'orderNote'
  )
ORDER BY column_name;

-- VÉRIFICATION 3 : Vérifier les contraintes
-- =====================================================
SELECT 
  constraint_name as contrainte,
  constraint_type as type,
  STRING_AGG(column_name, ', ') as colonnes
FROM information_schema.constraint_column_usage
JOIN information_schema.table_constraints USING (constraint_name, table_name)
WHERE table_name = 'Order'
GROUP BY constraint_name, constraint_type
ORDER BY constraint_type, constraint_name;

-- VÉRIFICATION 4 : Vérifier les index
-- =====================================================
SELECT 
  indexname as index,
  indexdef as definition
FROM pg_indexes
WHERE tablename = 'Order'
ORDER BY indexname;

-- VÉRIFICATION 5 : Statistiques de la table
-- =====================================================
SELECT 
  'Statistiques de la table Order' as info,
  COUNT(*) as nombre_commandes
FROM "Order";

-- VÉRIFICATION 6 : Schéma complet de la table
-- =====================================================
SELECT 
  column_name as colonne,
  data_type as type,
  character_maximum_length as longueur_max,
  is_nullable as nullable,
  column_default as defaut
FROM information_schema.columns
WHERE table_name = 'Order'
ORDER BY ordinal_position;

-- VÉRIFICATION 7 : Test de contrainte unique sur orderNumber
-- =====================================================
SELECT 
  constraint_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'Order' 
  AND constraint_type = 'UNIQUE'
  AND constraint_name LIKE '%orderNumber%';

-- VÉRIFICATION 8 : Résumé final
-- =====================================================
SELECT 
  'RÉSUMÉ DE VÉRIFICATION' as titre,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'Order') as total_colonnes,
  (SELECT COUNT(*) FROM information_schema.table_constraints WHERE table_name = 'Order') as total_contraintes,
  (SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'Order') as total_index,
  (SELECT COUNT(*) FROM "Order") as total_commandes;
