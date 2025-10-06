-- Script pour vérifier la structure de la table Product dans Supabase

-- 1. Vérifier que la table Product existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'Product';

-- 2. Vérifier la structure de la table Product
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Product' 
ORDER BY ordinal_position;

-- 3. Vérifier les contraintes de clé étrangère
SELECT 
    tc.constraint_name,
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
    AND tc.table_name = 'Product';

-- 4. Vérifier les données existantes
SELECT COUNT(*) as total_products FROM "Product";

-- 5. Voir quelques exemples de produits
SELECT 
    p.id,
    p.name,
    p."priceCents",
    p.stock,
    p."isFeatured",
    c.name as category_name,
    s.name as subcategory_name,
    b.name as brand_name
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
LEFT JOIN "Subcategory" s ON p."subcategoryId" = s.id
LEFT JOIN "Brand" b ON p."brandId" = b.id
LIMIT 5;
