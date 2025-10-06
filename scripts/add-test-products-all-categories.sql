-- Script pour ajouter des produits de test dans toutes les sous-catégories

-- 1. CORPS & BAIN - Bain & Douche
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Gel Douche Hydratant', 'Gel douche nourrissant pour tous types de peau', 1290, 1590, '/images/gel-douche-hydratant.jpg', true, 25, 4.5,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Savon de Marseille', 'Savon traditionnel 72% d''huile d''olive', 890, 1090, '/images/savon-marseille.jpg', false, 30, 4.3,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
);

-- 2. CORPS & BAIN - Soins Corps
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Crème Corps Nourrissante', 'Crème hydratante pour le corps', 1890, 2290, '/images/creme-corps.jpg', true, 20, 4.6,
    (SELECT id FROM "Category" WHERE slug = 'corps-bain'),
    (SELECT id FROM "Subcategory" WHERE slug = 'soins-corps' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
);

-- 3. CHEVEUX - Shampoings
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Shampoing Réparateur', 'Shampoing pour cheveux abîmés', 1890, 2290, '/images/shampoing-reparateur.jpg', true, 25, 4.5,
    (SELECT id FROM "Category" WHERE slug = 'cheveux'),
    (SELECT id FROM "Subcategory" WHERE slug = 'shampoings' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'cheveux')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Shampoing Bio', 'Shampoing 100% naturel', 2290, 2790, '/images/shampoing-bio.jpg', false, 15, 4.2,
    (SELECT id FROM "Category" WHERE slug = 'cheveux'),
    (SELECT id FROM "Subcategory" WHERE slug = 'shampoings' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'cheveux')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
);

-- 4. MAQUILLAGE - Teint
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Fond de Teint', 'Fond de teint longue tenue', 2290, 2790, '/images/fond-teint.jpg', true, 15, 4.3,
    (SELECT id FROM "Category" WHERE slug = 'maquillage'),
    (SELECT id FROM "Subcategory" WHERE slug = 'teint' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'maquillage')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Correcteur', 'Correcteur haute couverture', 1590, 1890, '/images/correcteur.jpg', false, 20, 4.1,
    (SELECT id FROM "Category" WHERE slug = 'maquillage'),
    (SELECT id FROM "Subcategory" WHERE slug = 'teint' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'maquillage')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
);

-- 5. PARFUMERIE - Parfums Femme
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Parfum Femme Élégant', 'Parfum floral et sophistiqué', 4590, 5290, '/images/parfum-femme.jpg', true, 10, 4.7,
    (SELECT id FROM "Category" WHERE slug = 'parfumerie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'parfums-femme' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parfumerie')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
);

-- 6. PARAPHARMACIE - Vitamines
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Vitamines B12', 'Complément alimentaire', 1590, 1890, '/images/vitamines-b12.jpg', false, 20, 4.1,
    (SELECT id FROM "Category" WHERE slug = 'parapharmacie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'vitamines' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parapharmacie')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Vitamine D3', 'Complément pour les os', 1290, 1590, '/images/vitamine-d3.jpg', true, 25, 4.4,
    (SELECT id FROM "Category" WHERE slug = 'parapharmacie'),
    (SELECT id FROM "Subcategory" WHERE slug = 'vitamines' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parapharmacie')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
);

-- 7. SOIN DU VISAGE - Protection Solaire
INSERT INTO "Product" (
    id, name, description, "priceCents", "oldPriceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt"
) VALUES 
(
    gen_random_uuid()::text, 'Crème Solaire SPF 50', 'Protection solaire haute', 2290, 2790, '/images/creme-solaire.jpg', true, 30, 4.5,
    (SELECT id FROM "Category" WHERE slug = 'soin-du-visage'),
    (SELECT id FROM "Subcategory" WHERE slug = 'protection-solaire' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'soin-du-visage')),
    (SELECT id FROM "Brand" WHERE slug = 'loreal' LIMIT 1), NOW(), NOW()
),
(
    gen_random_uuid()::text, 'Spray Solaire', 'Spray pratique SPF 30', 1890, 2290, '/images/spray-solaire.jpg', false, 20, 4.2,
    (SELECT id FROM "Category" WHERE slug = 'soin-du-visage'),
    (SELECT id FROM "Subcategory" WHERE slug = 'protection-solaire' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'soin-du-visage')),
    (SELECT id FROM "Brand" WHERE slug = 'bioderma' LIMIT 1), NOW(), NOW()
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
WHERE p."createdAt" > NOW() - INTERVAL '1 hour'
ORDER BY p."createdAt" DESC;
