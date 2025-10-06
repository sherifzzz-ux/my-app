-- Vérifier toutes les catégories existantes
SELECT id, name, slug FROM "Category" ORDER BY name;

-- Vérifier s'il y a une catégorie similaire à "Parfumerie"
SELECT id, name, slug FROM "Category" 
WHERE name ILIKE '%parfum%' OR slug ILIKE '%parfum%';
