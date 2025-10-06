-- Script pour ajouter des produits de test dans la sous-catégorie "bain-douche"

-- Vérifier d'abord que la sous-catégorie existe
SELECT id, name, slug FROM "Subcategory" WHERE slug = 'bain-douche';

-- Ajouter des produits de test pour la sous-catégorie "bain-douche"
INSERT INTO "Product" (
    id,
    name,
    description,
    "priceCents",
    "oldPriceCents",
    "imageUrl",
    "isFeatured",
    stock,
    rating,
    "categoryId",
    "subcategoryId",
    "brandId",
    "createdAt",
    "updatedAt"
) VALUES 
-- Produit 1: Gel douche
(
    gen_random_uuid()::text,
    'Gel Douche Hydratant',
    'Gel douche nourrissant pour tous types de peau. Formule douce et hydratante.',
    1290,
    1590,
    '/images/gel-douche-hydratant.jpg',
    true,
    25,
    4.5,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1),
    NOW(),
    NOW()
),

-- Produit 2: Savon de Marseille
(
    gen_random_uuid()::text,
    'Savon de Marseille Authentique',
    'Savon de Marseille traditionnel 72% d\'huile d\'olive. 100% naturel.',
    890,
    1090,
    '/images/savon-marseille.jpg',
    false,
    30,
    4.3,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1),
    NOW(),
    NOW()
),

-- Produit 3: Huile de douche
(
    gen_random_uuid()::text,
    'Huile de Douche Nourrissante',
    'Huile de douche qui nettoie et nourrit en une seule étape. Parfait pour les peaux sèches.',
    1890,
    2290,
    '/images/huile-douche.jpg',
    true,
    15,
    4.7,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1),
    NOW(),
    NOW()
),

-- Produit 4: Gel douche bio
(
    gen_random_uuid()::text,
    'Gel Douche Bio Aloe Vera',
    'Gel douche bio à l\'aloe vera. Formule respectueuse de l\'environnement.',
    1690,
    1990,
    '/images/gel-douche-bio.jpg',
    false,
    20,
    4.2,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1),
    NOW(),
    NOW()
),

-- Produit 5: Crème de douche
(
    gen_random_uuid()::text,
    'Crème de Douche Relaxante',
    'Crème de douche aux huiles essentielles pour un moment de détente.',
    1490,
    1790,
    '/images/creme-douche.jpg',
    true,
    18,
    4.4,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1),
    NOW(),
    NOW()
);

-- Vérifier que les produits ont été ajoutés
SELECT 
    p.name,
    p."priceCents",
    p."oldPriceCents",
    p."imageUrl",
    p.rating,
    p.stock,
    p."isFeatured",
    c.name as category,
    s.name as subcategory,
    b.name as brand
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
LEFT JOIN "Subcategory" s ON p."subcategoryId" = s.id
LEFT JOIN "Brand" b ON p."brandId" = b.id
WHERE s.slug = 'bain-douche'
ORDER BY p."isFeatured" DESC, p.rating DESC;
