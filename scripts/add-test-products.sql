-- Script pour ajouter des produits de test dans Supabase
-- Assurez-vous d'avoir les catégories et sous-catégories créées avant d'exécuter ce script

-- Produits pour "Soin du visage"
INSERT INTO "Product" (id, name, description, "priceCents", "imageUrl", "isFeatured", stock, rating, "categoryId", "subcategoryId", "brandId", "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Crème hydratante La Roche-Posay', 'Crème hydratante pour tous types de peau, formule hypoallergénique', 2490, '/images/creme-hydratante.jpg', true, 15, 4.5, 
 (SELECT id FROM "Category" WHERE slug = 'soin-du-visage'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'hydratants' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'soin-du-visage')), 
 (SELECT id FROM "Brand" WHERE slug = 'la-roche-posay'), 
 NOW(), NOW()),

(gen_random_uuid()::text, 'Sérum anti-âge Vichy', 'Sérum concentré en acide hyaluronique pour réduire les rides', 4590, '/images/serum-anti-age.jpg', true, 8, 4.8, 
 (SELECT id FROM "Category" WHERE slug = 'soin-du-visage'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'serums' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'soin-du-visage')), 
 (SELECT id FROM "Brand" WHERE slug = 'vichy'), 
 NOW(), NOW()),

(gen_random_uuid()::text, 'Protection solaire SPF 50+', 'Crème solaire haute protection pour le visage', 1890, '/images/protection-solaire.jpg', false, 25, 4.2, 
 (SELECT id FROM "Category" WHERE slug = 'soin-du-visage'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'protection-solaire' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'soin-du-visage')), 
 (SELECT id FROM "Brand" WHERE slug = 'avene'), 
 NOW(), NOW()),

-- Produits pour "Cheveux"
(gen_random_uuid()::text, 'Shampoing réparateur L\'Oréal', 'Shampoing pour cheveux abîmés et colorés', 1290, '/images/shampoing-reparateur.jpg', false, 20, 4.3, 
 (SELECT id FROM "Category" WHERE slug = 'cheveux'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'shampoings' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'cheveux')), 
 (SELECT id FROM "Brand" WHERE slug = 'loreal'), 
 NOW(), NOW()),

(gen_random_uuid()::text, 'Masque capillaire Nivea', 'Masque nourrissant pour cheveux secs', 1590, '/images/masque-capillaire.jpg', false, 12, 4.1, 
 (SELECT id FROM "Category" WHERE slug = 'cheveux'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'apres-shampoings' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'cheveux')), 
 (SELECT id FROM "Brand" WHERE slug = 'nivea'), 
 NOW(), NOW()),

-- Produits pour "Corps & Bain"
(gen_random_uuid()::text, 'Gel douche parfumé Garnier', 'Gel douche aux extraits de fruits', 890, '/images/gel-douche.jpg', false, 30, 4.0, 
 (SELECT id FROM "Category" WHERE slug = 'corps-bain'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'bain-douche' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')), 
 (SELECT id FROM "Brand" WHERE slug = 'garnier'), 
 NOW(), NOW()),

(gen_random_uuid()::text, 'Crème pour les mains Eucerin', 'Crème hydratante pour les mains sèches', 1290, '/images/creme-mains.jpg', false, 18, 4.4, 
 (SELECT id FROM "Category" WHERE slug = 'corps-bain'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'mains-pieds' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'corps-bain')), 
 (SELECT id FROM "Brand" WHERE slug = 'eucerin'), 
 NOW(), NOW()),

-- Produits pour "Maquillage"
(gen_random_uuid()::text, 'Fond de teint L\'Oréal', 'Fond de teint longue tenue, teint naturel', 2290, '/images/fond-de-teint.jpg', true, 10, 4.6, 
 (SELECT id FROM "Category" WHERE slug = 'maquillage'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'teint' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'maquillage')), 
 (SELECT id FROM "Brand" WHERE slug = 'loreal'), 
 NOW(), NOW()),

(gen_random_uuid()::text, 'Rouge à lèvres Nivea', 'Rouge à lèvres hydratant, couleur rose naturel', 1490, '/images/rouge-levres.jpg', false, 22, 4.2, 
 (SELECT id FROM "Category" WHERE slug = 'maquillage'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'levres' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'maquillage')), 
 (SELECT id FROM "Brand" WHERE slug = 'nivea'), 
 NOW(), NOW()),

-- Produits pour "Parapharmacie"
(gen_random_uuid()::text, 'Vitamines B12 Bioderma', 'Complément alimentaire en vitamines B12', 1890, '/images/vitamines-b12.jpg', false, 15, 4.3, 
 (SELECT id FROM "Category" WHERE slug = 'parapharmacie'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'vitamines' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parapharmacie')), 
 (SELECT id FROM "Brand" WHERE slug = 'bioderma'), 
 NOW(), NOW()),

(gen_random_uuid()::text, 'Complément minceur Garnier', 'Complément alimentaire pour accompagner un régime', 2490, '/images/complement-minceur.jpg', false, 8, 3.9, 
 (SELECT id FROM "Category" WHERE slug = 'parapharmacie'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'minceur' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'parapharmacie')), 
 (SELECT id FROM "Brand" WHERE slug = 'garnier'), 
 NOW(), NOW()),

-- Produits pour "Korean Beauty"
(gen_random_uuid()::text, 'Masque hydratant Korean', 'Masque en tissu pour une hydratation intense', 1290, '/images/masque-korean.jpg', true, 14, 4.7, 
 (SELECT id FROM "Category" WHERE slug = 'korean-beauty'), 
 (SELECT id FROM "Subcategory" WHERE slug = 'masques' AND "categoryId" = (SELECT id FROM "Category" WHERE slug = 'korean-beauty')), 
 (SELECT id FROM "Brand" WHERE slug = 'avene'), 
 NOW(), NOW());

-- Vérifier que les produits ont été créés
SELECT 
    p.name,
    c.name as category,
    s.name as subcategory,
    b.name as brand,
    p."priceCents",
    p.stock,
    p.rating
FROM "Product" p
LEFT JOIN "Category" c ON p."categoryId" = c.id
LEFT JOIN "Subcategory" s ON p."subcategoryId" = s.id
LEFT JOIN "Brand" b ON p."brandId" = b.id
ORDER BY c.name, p.name;
