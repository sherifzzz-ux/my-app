-- Vérifier les sous-catégories de Parfumerie
SELECT 
    c.name as category_name,
    c.slug as category_slug,
    s.name as subcategory_name,
    s.slug as subcategory_slug
FROM "Category" c
LEFT JOIN "Subcategory" s ON c.id = s."categoryId"
WHERE c.slug = 'parfumerie'
ORDER BY s.name;

-- Vérifier si la catégorie Parfumerie existe
SELECT id, name, slug FROM "Category" WHERE slug = 'parfumerie';
