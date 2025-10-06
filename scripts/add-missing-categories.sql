-- Ajouter les catégories manquantes

-- Vérifier d'abord les catégories existantes
SELECT id, name, slug FROM "Category" ORDER BY name;

-- Ajouter la catégorie Parfumerie
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

-- Ajouter la catégorie Maquillage si elle n'existe pas
INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt", "imageUrl")
VALUES (
    gen_random_uuid()::text,
    'Maquillage',
    'maquillage',
    NOW(),
    NOW(),
    '/images/maquillage-category.jpg'
)
ON CONFLICT (slug) DO NOTHING;

-- Ajouter la catégorie Korean Beauty si elle n'existe pas
INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt", "imageUrl")
VALUES (
    gen_random_uuid()::text,
    'Korean Beauty',
    'korean-beauty',
    NOW(),
    NOW(),
    '/images/korean-beauty-category.jpg'
)
ON CONFLICT (slug) DO NOTHING;

-- Vérifier les catégories après ajout
SELECT id, name, slug FROM "Category" ORDER BY name;
