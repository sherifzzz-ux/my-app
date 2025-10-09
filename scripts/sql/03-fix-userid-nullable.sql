-- =====================================================
-- Script de correction de la contrainte userId
-- Rend le champ userId nullable pour permettre le guest checkout
-- =====================================================

-- ÉTAPE 1 : Supprimer la contrainte NOT NULL sur userId
-- =====================================================

-- Rendre userId nullable pour permettre les commandes sans compte utilisateur
ALTER TABLE "Order" 
ALTER COLUMN "userId" DROP NOT NULL;

-- ÉTAPE 2 : Vérifier la modification
-- =====================================================

-- Afficher les informations sur la colonne userId
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order' 
  AND column_name = 'userId';

-- ÉTAPE 3 : Vérifier les contraintes de clé étrangère
-- =====================================================

-- La contrainte de clé étrangère Order_userId_fkey reste en place
-- Elle permet userId NULL mais vérifie que les userId non-NULL 
-- correspondent bien à des utilisateurs existants dans la table User

SELECT 
  tc.constraint_name, 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM 
  information_schema.table_constraints AS tc 
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'Order'
  AND kcu.column_name = 'userId';

-- RÉSULTAT ATTENDU :
-- is_nullable = 'YES' pour userId
-- La contrainte Order_userId_fkey reste présente
