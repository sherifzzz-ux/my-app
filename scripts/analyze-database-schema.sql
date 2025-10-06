-- Script d'analyse complète du schéma de base de données
-- Ce script va documenter la structure exacte pour la configuration TypeScript

-- 1. Lister toutes les tables avec leurs types
SELECT 
    table_name,
    table_type,
    table_schema
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Analyser la structure de chaque table principale
-- Table Category
SELECT 
    'Category' as table_name,
    column_name, 
    data_type, 
    is_nullable, 
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'Category' 
ORDER BY ordinal_position;

-- Table Subcategory  
SELECT 
    'Subcategory' as table_name,
    column_name, 
    data_type, 
    is_nullable, 
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'Subcategory' 
ORDER BY ordinal_position;

-- Table Brand
SELECT 
    'Brand' as table_name,
    column_name, 
    data_type, 
    is_nullable, 
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'Brand' 
ORDER BY ordinal_position;

-- Table Product
SELECT 
    'Product' as table_name,
    column_name, 
    data_type, 
    is_nullable, 
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'Product' 
ORDER BY ordinal_position;

-- 3. Analyser les contraintes de clés étrangères
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
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- 4. Vérifier les relations entre tables
-- Relation Category -> Subcategory
SELECT 
    'Category -> Subcategory' as relation,
    COUNT(*) as subcategory_count
FROM "Category" c
LEFT JOIN "Subcategory" s ON s."categoryId" = c.id
GROUP BY c.id, c.name
ORDER BY c.name;

-- Relation Product -> Category
SELECT 
    'Product -> Category' as relation,
    COUNT(*) as product_count
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
GROUP BY c.id, c.name
ORDER BY c.name;

-- Relation Product -> Brand
SELECT 
    'Product -> Brand' as relation,
    COUNT(*) as product_count
FROM "Product" p
LEFT JOIN "Brand" b ON p."brandId" = b.id
GROUP BY b.id, b.name
ORDER BY b.name;
