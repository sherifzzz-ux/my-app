-- ====================================================================
-- Script de correction : Images manquantes
-- Description : Remplace les URLs d'images manquantes par des placeholders
-- Date : 2025-10-09
-- ====================================================================

-- ====================================================================
-- 1. Identifier les produits avec des images manquantes
-- ====================================================================

SELECT '🔍 Produits avec des images potentiellement manquantes :' as info;

SELECT 
    id,
    name,
    imageUrl,
    categoryId
FROM "Product"
WHERE imageUrl LIKE '%shampoing.jpg%'
   OR imageUrl LIKE '%fond-teint.jpg%'
   OR imageUrl LIKE '%vitamine.jpg%'
   OR imageUrl LIKE '%vitamines.jpg%';

-- ====================================================================
-- 2. Mapper les images manquantes vers des catégories appropriées
-- ====================================================================

-- Mise à jour des images basées sur la catégorie
UPDATE "Product"
SET imageUrl = CASE 
    -- Cheveux (shampoings, etc.)
    WHEN imageUrl LIKE '%shampoing%' THEN '/images/category-cheveux.png'
    
    -- Maquillage (fond de teint, etc.)
    WHEN imageUrl LIKE '%fond-teint%' THEN '/images/category-maquillage.png'
    
    -- Parapharmacie (vitamines, etc.)
    WHEN imageUrl LIKE '%vitamine%' THEN '/images/category-parapharmacie.png'
    
    ELSE imageUrl
END
WHERE imageUrl LIKE '%shampoing.jpg%'
   OR imageUrl LIKE '%fond-teint.jpg%'
   OR imageUrl LIKE '%vitamine.jpg%'
   OR imageUrl LIKE '%vitamines.jpg%';

-- ====================================================================
-- 3. Vérifier les autres images manquantes
-- ====================================================================

SELECT '📊 Produits avec des URLs d''images non standard :' as info;

SELECT 
    id,
    name,
    imageUrl,
    categoryId
FROM "Product"
WHERE imageUrl IS NOT NULL
  AND imageUrl NOT LIKE '/images/%'
  AND imageUrl NOT LIKE 'http%'
ORDER BY imageUrl;

-- ====================================================================
-- 4. Statistiques des images
-- ====================================================================

DO $$ 
DECLARE
    total_products INTEGER;
    products_with_images INTEGER;
    products_without_images INTEGER;
    local_images INTEGER;
    external_images INTEGER;
BEGIN
    -- Compter tous les produits
    SELECT COUNT(*) INTO total_products
    FROM "Product";
    
    -- Produits avec images
    SELECT COUNT(*) INTO products_with_images
    FROM "Product"
    WHERE imageUrl IS NOT NULL;
    
    -- Produits sans images
    products_without_images := total_products - products_with_images;
    
    -- Images locales
    SELECT COUNT(*) INTO local_images
    FROM "Product"
    WHERE imageUrl LIKE '/images/%';
    
    -- Images externes
    SELECT COUNT(*) INTO external_images
    FROM "Product"
    WHERE imageUrl LIKE 'http%';
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '              📊 STATISTIQUES DES IMAGES';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
    RAISE NOTICE '';
    RAISE NOTICE '📦 Total produits : %', total_products;
    RAISE NOTICE '🖼️  Produits avec images : %', products_with_images;
    RAISE NOTICE '❌ Produits sans images : %', products_without_images;
    RAISE NOTICE '📁 Images locales : %', local_images;
    RAISE NOTICE '🌐 Images externes : %', external_images;
    RAISE NOTICE '';
    
    IF products_without_images > 0 THEN
        RAISE NOTICE '⚠️  % produits n''ont pas d''image', products_without_images;
        RAISE NOTICE '💡 Conseil : Ajoutez des images via l''interface admin';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════';
END $$;

-- ====================================================================
-- 5. Mettre à jour les produits sans images avec des placeholders
-- ====================================================================

-- Assigner des images de catégorie aux produits sans images
UPDATE "Product" p
SET imageUrl = CASE 
    WHEN c.slug LIKE '%cheveux%' THEN '/images/category-cheveux.png'
    WHEN c.slug LIKE '%maquillage%' THEN '/images/category-maquillage.png'
    WHEN c.slug LIKE '%corps%' OR c.slug LIKE '%bain%' THEN '/images/category-corps-bain.png'
    WHEN c.slug LIKE '%visage%' OR c.slug LIKE '%soin%' THEN '/images/category-soins-visage.png'
    WHEN c.slug LIKE '%parapharmacie%' OR c.slug LIKE '%vitamine%' THEN '/images/category-parapharmacie.png'
    WHEN c.slug LIKE '%parfum%' THEN '/images/category-parfums.png'
    ELSE '/images/brands/placeholder-logo.svg'
END
FROM "Category" c
WHERE p.categoryId = c.id
  AND p.imageUrl IS NULL;

-- Afficher les produits mis à jour
SELECT '✅ Produits mis à jour avec des images de placeholder :' as info;

SELECT 
    p.id,
    p.name,
    p.imageUrl,
    c.name as category_name
FROM "Product" p
LEFT JOIN "Category" c ON p.categoryId = c.id
WHERE p.imageUrl LIKE '/images/category-%'
   OR p.imageUrl LIKE '%placeholder%'
ORDER BY c.name, p.name;

-- ====================================================================
-- 6. Résumé final
-- ====================================================================

DO $$ 
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '✅ Correction des images terminée !';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Actions effectuées :';
    RAISE NOTICE '   ✓ Images manquantes remplacées par des placeholders';
    RAISE NOTICE '   ✓ Produits sans images assignés à des images de catégorie';
    RAISE NOTICE '';
    RAISE NOTICE '💡 Prochaines étapes :';
    RAISE NOTICE '   1. Uploader les vraies images via Uploadthing';
    RAISE NOTICE '   2. Mettre à jour les URLs dans l''admin';
    RAISE NOTICE '   3. Vérifier que toutes les images s''affichent correctement';
    RAISE NOTICE '';
END $$;
