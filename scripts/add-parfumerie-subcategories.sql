-- Ajouter les sous-catégories manquantes pour Parfumerie

-- Vérifier d'abord que la catégorie Parfumerie existe
SELECT id, name, slug FROM "Category" WHERE slug = 'parfumerie';

-- Ajouter les sous-catégories de Parfumerie
INSERT INTO "Subcategory" (id, name, slug, "categoryId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::text as id,
    subcategory_name,
    subcategory_slug,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie') as category_id,
    NOW() as created_at,
    NOW() as updated_at
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

-- Vérifier les sous-catégories ajoutées
SELECT 
    c.name as category_name,
    s.name as subcategory_name,
    s.slug as subcategory_slug
FROM "Category" c
JOIN "Subcategory" s ON c.id = s."categoryId"
WHERE c.slug = 'parfumerie'
ORDER BY s.name;
