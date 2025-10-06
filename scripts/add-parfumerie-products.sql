-- Ajouter des produits de test pour la Parfumerie

-- Parfums Femme
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Parfum Femme Élégant', 'Parfum floral et sophistiqué pour femme', 4590, 5290, '/images/parfum-femme-elegant.jpg', true, 10, 4.7,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'parfums-femme' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Eau de Parfum Rose', 'Eau de parfum aux notes de rose', 3890, 4490, '/images/parfum-rose.jpg', false, 15, 4.3,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'parfums-femme' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
);

-- Parfums Homme
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Parfum Homme Sport', 'Parfum frais et dynamique pour homme', 4290, 4890, '/images/parfum-homme-sport.jpg', true, 12, 4.5,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'parfums-homme' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Eau de Toilette Boisée', 'Eau de toilette aux notes boisées', 3290, 3790, '/images/parfum-boise.jpg', false, 18, 4.2,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'parfums-homme' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
);

-- Eaux de Toilette
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Eau de Toilette Fraîche', 'Eau de toilette légère et fraîche', 2290, 2790, '/images/eau-toilette-fraiche.jpg', true, 20, 4.4,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'eaux-de-toilette' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
);

-- Coffrets Parfums
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Coffret Découverte', 'Coffret avec 3 parfums miniatures', 1590, 1890, '/images/coffret-decouverte.jpg', false, 25, 4.6,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'coffrets-parfums' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
);

-- Vérifier les produits ajoutés
SELECT 
    p.name,
    p."priceCents",
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
WHERE c.slug = 'parfumerie'
ORDER BY s.name, p."isFeatured" DESC;
