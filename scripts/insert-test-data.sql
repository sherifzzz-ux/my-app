-- ========================================
-- INSERTION DE DONNÉES DE TEST
-- ========================================

-- 1. Insérer un utilisateur de test
INSERT INTO "User" (id, email, name, "createdAt", "updatedAt") 
VALUES (
  'test-user-123',
  'test@example.com',
  'Utilisateur Test',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- 2. Insérer des catégories de test
INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt") 
VALUES 
  ('cat-1', 'Soins du visage', 'soins-visage', NOW(), NOW()),
  ('cat-2', 'Maquillage', 'maquillage', NOW(), NOW()),
  ('cat-3', 'Soins des cheveux', 'soins-cheveux', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 3. Insérer des marques de test
INSERT INTO "Brand" (id, name, slug, "createdAt", "updatedAt") 
VALUES 
  ('brand-1', 'L\'Oréal', 'loreal', NOW(), NOW()),
  ('brand-2', 'Nivea', 'nivea', NOW(), NOW()),
  ('brand-3', 'Garnier', 'garnier', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 4. Insérer des produits de test
INSERT INTO "Product" (id, name, description, "priceCents", "imageUrl", "categoryId", "brandId", stock, "createdAt", "updatedAt") 
VALUES 
  ('prod-1', 'Crème hydratante visage', 'Crème hydratante pour tous types de peau', 2500, 'https://via.placeholder.com/300x300?text=Crème+Visage', 'cat-1', 'brand-1', 100, NOW(), NOW()),
  ('prod-2', 'Rouge à lèvres mat', 'Rouge à lèvres longue tenue', 1800, 'https://via.placeholder.com/300x300?text=Rouge+Lèvres', 'cat-2', 'brand-2', 50, NOW(), NOW()),
  ('prod-3', 'Shampoing réparateur', 'Shampoing pour cheveux abîmés', 2200, 'https://via.placeholder.com/300x300?text=Shampoing', 'cat-3', 'brand-3', 75, NOW(), NOW()),
  ('prod-4', 'Masque visage purifiant', 'Masque purifiant à l\'argile', 3200, 'https://via.placeholder.com/300x300?text=Masque', 'cat-1', 'brand-1', 30, NOW(), NOW()),
  ('prod-5', 'Mascara volumateur', 'Mascara pour volume et longueur', 2100, 'https://via.placeholder.com/300x300?text=Mascara', 'cat-2', 'brand-2', 60, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. Insérer des commandes de test
INSERT INTO "Order" (id, status, "totalCents", "userId", "createdAt", "updatedAt") 
VALUES 
  ('order-1', 'PENDING', 4300, 'test-user-123', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('order-2', 'PAID', 1800, 'test-user-123', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('order-3', 'SHIPPED', 5400, 'test-user-123', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- 6. Insérer des éléments de commande
INSERT INTO "OrderItem" (id, quantity, "unitPriceCents", "orderId", "productId") 
VALUES 
  ('item-1', 1, 2500, 'order-1', 'prod-1'),
  ('item-2', 1, 1800, 'order-1', 'prod-2'),
  ('item-3', 1, 1800, 'order-2', 'prod-2'),
  ('item-4', 1, 2200, 'order-3', 'prod-3'),
  ('item-5', 1, 3200, 'order-3', 'prod-4')
ON CONFLICT (id) DO NOTHING;

-- 7. Insérer des favoris de test
INSERT INTO "UserFavorite" (id, "userId", "productId", "createdAt") 
VALUES 
  ('fav-1', 'test-user-123', 'prod-1', NOW() - INTERVAL '2 days'),
  ('fav-2', 'test-user-123', 'prod-3', NOW() - INTERVAL '1 day'),
  ('fav-3', 'test-user-123', 'prod-5', NOW())
ON CONFLICT (id) DO NOTHING;

-- 8. Insérer des adresses de test
INSERT INTO "Address" (id, name, phone, city, "addressLine1", "addressLine2", "isDefault", "userId", "createdAt", "updatedAt") 
VALUES 
  ('addr-1', 'Jean Dupont', '0123456789', 'Paris', '123 Rue de la Paix', 'Appartement 4A', true, 'test-user-123', NOW(), NOW()),
  ('addr-2', 'Marie Martin', '0987654321', 'Lyon', '456 Avenue des Champs', 'Bâtiment B', false, 'test-user-123', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 9. Insérer un profil utilisateur
INSERT INTO "profiles" (id, email, name, first_name, last_name, "avatar_url", created_at, updated_at) 
VALUES (
  'test-user-123',
  'test@example.com',
  'Utilisateur Test',
  'Utilisateur',
  'Test',
  'https://via.placeholder.com/150x150?text=UT',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- 10. Vérifier les données insérées
SELECT 'Users' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Products', COUNT(*) FROM "Product"
UNION ALL
SELECT 'Orders', COUNT(*) FROM "Order"
UNION ALL
SELECT 'OrderItems', COUNT(*) FROM "OrderItem"
UNION ALL
SELECT 'UserFavorites', COUNT(*) FROM "UserFavorite"
UNION ALL
SELECT 'Addresses', COUNT(*) FROM "Address"
UNION ALL
SELECT 'Profiles', COUNT(*) FROM "profiles";

-- 11. Vérifier les relations
SELECT 
  'Order with items' as check_type,
  COUNT(*) as count
FROM "Order" o
JOIN "OrderItem" oi ON o.id = oi."orderId"
WHERE o."userId" = 'test-user-123';

SELECT 
  'User favorites with products' as check_type,
  COUNT(*) as count
FROM "UserFavorite" uf
JOIN "Product" p ON uf."productId" = p.id
WHERE uf."userId" = 'test-user-123';
