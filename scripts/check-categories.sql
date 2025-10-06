-- Vérifier les catégories existantes dans la base de données
SELECT id, name, slug FROM "Category" ORDER BY name;

-- Vérifier les sous-catégories de "Corps & Bain"
SELECT 
    s.id, 
    s.name, 
    s.slug, 
    c.name as category_name,
    c.slug as category_slug
FROM "Subcategory" s
JOIN "Category" c ON s."categoryId" = c.id
WHERE c.slug = 'corps-bain'
ORDER BY s.name;
