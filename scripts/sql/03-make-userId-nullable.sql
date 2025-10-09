-- =====================================================
-- Script pour rendre userId nullable (guest checkout)
-- =====================================================

-- ÉTAPE 1 : Supprimer la contrainte de clé étrangère
-- =====================================================
-- On doit d'abord supprimer la contrainte FK pour pouvoir modifier la colonne

ALTER TABLE "Order" 
DROP CONSTRAINT IF EXISTS "Order_userId_fkey";

-- ÉTAPE 2 : Rendre userId nullable
-- =====================================================

ALTER TABLE "Order" 
ALTER COLUMN "userId" DROP NOT NULL;

-- ÉTAPE 3 : Recréer la contrainte de clé étrangère
-- =====================================================
-- Avec ON DELETE SET NULL pour gérer la suppression d'utilisateurs

ALTER TABLE "Order" 
ADD CONSTRAINT "Order_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "User"("id") 
ON DELETE SET NULL 
ON UPDATE CASCADE;

-- ÉTAPE 4 : Vérifier que la modification est appliquée
-- =====================================================

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order' AND column_name = 'userId';

-- Résultat attendu :
-- column_name | data_type | is_nullable | column_default
-- userId      | text      | YES         | null

-- =====================================================
-- Explication
-- =====================================================
-- Cette modification permet le guest checkout :
-- - Les utilisateurs connectés auront un userId
-- - Les utilisateurs invités auront userId = null
-- - Les informations client sont stockées dans firstName, lastName, email, etc.
