-- =====================================================
-- Script de vérification de la structure Order
-- =====================================================

-- 1. Vérifier le nombre total de colonnes
-- Attendu : 30+ colonnes
SELECT 
  COUNT(*) as total_colonnes
FROM information_schema.columns
WHERE table_name = 'Order';

-- 2. Vérifier que userId est nullable
-- Attendu : is_nullable = YES
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order' AND column_name = 'userId';

-- 3. Vérifier que orderNumber existe et est unique
-- Attendu : column_name = orderNumber
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Order' AND column_name = 'orderNumber';

-- 4. Vérifier les contraintes
SELECT 
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = '"Order"'::regclass
ORDER BY contype;

-- 5. Lister toutes les colonnes
SELECT 
  ordinal_position,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order'
ORDER BY ordinal_position;

-- =====================================================
-- Résultats Attendus
-- =====================================================

-- 1. total_colonnes : 30+
-- 2. userId.is_nullable : YES
-- 3. orderNumber : text, NOT NULL
-- 4. Contraintes :
--    - Order_pkey (PRIMARY KEY)
--    - Order_userId_fkey (FOREIGN KEY avec ON DELETE SET NULL)
--    - Order_orderNumber_key (UNIQUE)
-- 5. Toutes les colonnes listées avec leurs propriétés
