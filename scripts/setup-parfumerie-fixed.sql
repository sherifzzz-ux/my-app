-- Script corrigé pour créer la catégorie Parfumerie et ses sous-catégories

-- 1. Ajouter la catégorie Parfumerie
INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt", "imageUrl")
VALUES (
    gen_random_uuid()::text,
    'Parfumerie',
    'parfumerie',
    NOW(),
    NOW(),
    '/images/parfumerie-category.jpg'
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Ajouter les sous-catégories de Parfumerie (sans createdAt/updatedAt)
INSERT INTO "Subcategory" (id, name, slug, "categoryId")
SELECT 
    gen_random_uuid()::text as id,
    subcategory_name,
    subcategory_slug,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie') as category_id
FROM (VALUES 
    ('Parfums Femme', 'parfums-femme'),
    ('Parfums Homme', 'parfums-homme'),
    ('Eaux de Toilette', 'eaux-de-toilette'),
    ('Coffrets Parfums', 'coffrets-parfums'),
    ('Huiles Parfumées', 'huiles-parfumees'),
    ('Bougies Parfumées', 'bougies-parfumees')
) AS subcategories(subcategory_name, subcategory_slug)
WHERE NOT EXISTS (
    SELECT 1 FROM "Subcategory" s 
    WHERE s.slug = subcategories.subcategory_slug 
    AND s."categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')
);

-- 3. Vérifier que tout a été créé
SELECT 
    c.name as category_name,
    c.slug as category_slug,
    s.name as subcategory_name,
    s.slug as subcategory_slug
FROM "Category" c
LEFT JOIN "Subcategory" s ON c.id = s."categoryId"
WHERE c.slug = 'parfumerie'
ORDER BY s.name;