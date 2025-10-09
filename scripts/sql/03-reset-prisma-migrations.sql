-- =====================================================
-- SCRIPT DE RÉINITIALISATION DES MIGRATIONS PRISMA
-- =====================================================
-- Utilisez ce script si vous voulez réinitialiser complètement
-- la base de données et recommencer avec Prisma
-- ⚠️ ATTENTION : Cela supprimera TOUTES vos données !
-- =====================================================

-- OPTION 1 : RESET COMPLET (DANGEREUX - Perte de données)
-- =====================================================
-- Décommentez pour exécuter :
/*
-- Supprimer toutes les tables
DROP TABLE IF EXISTS "UserFavorite" CASCADE;
DROP TABLE IF EXISTS "DeliveryZone" CASCADE;
DROP TABLE IF EXISTS "Address" CASCADE;
DROP TABLE IF EXISTS "CartItem" CASCADE;
DROP TABLE IF EXISTS "Cart" CASCADE;
DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "Review" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "Subcategory" CASCADE;
DROP TABLE IF EXISTS "Brand" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "_prisma_migrations" CASCADE;

-- Supprimer les types ENUM
DROP TYPE IF EXISTS "ShippingZone" CASCADE;
DROP TYPE IF EXISTS "PaymentMethod" CASCADE;
DROP TYPE IF EXISTS "PaymentStatus" CASCADE;
DROP TYPE IF EXISTS "OrderStatus" CASCADE;

-- Ensuite, exécutez dans votre terminal :
-- npx prisma migrate reset
-- npx prisma db push
-- npx prisma db seed
*/

-- OPTION 2 : RESET UNIQUEMENT LA TABLE ORDER (Moins dangereux)
-- =====================================================
-- Décommentez pour exécuter :
/*
-- Supprimer les contraintes et la table
DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;

-- Recréer la table avec Prisma
-- Ensuite, exécutez : npx prisma db push
*/

-- OPTION 3 : VÉRIFIER L'ÉTAT DES MIGRATIONS
-- =====================================================
SELECT 
    migration_name,
    started_at,
    finished_at,
    applied_steps_count,
    logs
FROM "_prisma_migrations"
ORDER BY finished_at DESC;

-- APRÈS RESET, SUIVEZ CES ÉTAPES :
-- =====================================================
-- 1. Dans votre terminal, exécutez :
--    npx prisma migrate reset
--
-- 2. Créez une nouvelle migration :
--    npx prisma migrate dev --name init
--
-- 3. Générez le client Prisma :
--    npx prisma generate
--
-- 4. Exécutez le seed si vous en avez un :
--    npx prisma db seed
-- =====================================================
