-- Script pour corriger les URLs d'images manquantes dans la base de données
-- Ce script remplace les références aux images inexistantes par des placeholders

-- 1. Identifier les produits avec des images manquantes
-- SELECT id, name, "imageUrl" 
-- FROM "Product" 
-- WHERE "imageUrl" LIKE '/images/shampoing%' 
--    OR "imageUrl" LIKE '/images/fond-teint%' 
--    OR "imageUrl" LIKE '/images/vitamine%'
--    OR "imageUrl" LIKE '/images/gel-douche%'
--    OR "imageUrl" LIKE '/images/savon%'
--    OR "imageUrl" LIKE '/images/creme-%'
--    OR "imageUrl" LIKE '/images/parfum-%'
--    OR "imageUrl" LIKE '/images/correcteur%';

-- 2. Mettre à jour les URLs d'images manquantes avec des placeholders existants

-- Produits de cheveux (shampoings) -> utiliser p31-1.jpg
UPDATE "Product" 
SET "imageUrl" = '/images/p31-1.jpg'
WHERE "imageUrl" LIKE '/images/shampoing%';

-- Produits de maquillage (fond de teint, correcteur) -> utiliser p21-1.jpg
UPDATE "Product" 
SET "imageUrl" = '/images/p21-1.jpg'
WHERE "imageUrl" LIKE '/images/fond-teint%' 
   OR "imageUrl" LIKE '/images/correcteur%';

-- Produits de parapharmacie (vitamines) -> utiliser p11-1.jpg
UPDATE "Product" 
SET "imageUrl" = '/images/p11-1.jpg'
WHERE "imageUrl" LIKE '/images/vitamine%';

-- Produits corps & bain (gel douche, savon, crème) -> utiliser p12-1.jpg
UPDATE "Product" 
SET "imageUrl" = '/images/p12-1.jpg'
WHERE "imageUrl" LIKE '/images/gel-douche%' 
   OR "imageUrl" LIKE '/images/savon%'
   OR "imageUrl" LIKE '/images/creme-%';

-- Produits de parfumerie -> utiliser p32-1.jpg
UPDATE "Product" 
SET "imageUrl" = '/images/p32-1.jpg'
WHERE "imageUrl" LIKE '/images/parfum-%';

-- 3. Vérifier le résultat
SELECT 'Correction terminée' as status, 
       COUNT(*) as total_produits,
       COUNT(CASE WHEN "imageUrl" LIKE '/images/p%' THEN 1 END) as avec_placeholder
FROM "Product";
