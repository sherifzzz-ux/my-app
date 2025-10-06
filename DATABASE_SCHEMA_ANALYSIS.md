# Analyse du schéma de base de données

## Objectif
Documenter la structure exacte de la base de données pour éliminer les `as any` et utiliser les vrais noms de tables.

## Tables identifiées (avec majuscules)
- `Category` - Catégories principales
- `Subcategory` - Sous-catégories
- `Brand` - Marques
- `Product` - Produits
- `User` - Utilisateurs
- `Cart` - Paniers
- `CartItem` - Articles du panier
- `Order` - Commandes
- `OrderItem` - Articles de commande
- `Review` - Avis
- `Address` - Adresses
- `contact_messages` - Messages de contact
- `newsletter_subscribers` - Abonnés newsletter
- `order_items` - Articles de commande (table alternative)
- `orders` - Commandes (table alternative)
- `profiles` - Profils utilisateurs
- `shipping_methods` - Méthodes de livraison
- `user_addresses` - Adresses utilisateurs
- `user_favorites` - Favoris utilisateurs
- `user_roles` - Rôles utilisateurs
- `user_suspensions` - Suspensions utilisateurs

## Structure des tables

### Table Category
- Colonnes identifiées :
  - `id` (text, NOT NULL)
  - `name` (text, NOT NULL)
  - `slug` (text, NOT NULL)
  - `createdAt` (timestamp, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - `updatedAt` (timestamp, NULL)
  - `imageUrl` (text, NULL)

### Table Subcategory
- Colonnes identifiées :
  - `id` (text, NOT NULL)
  - `name` (text, NOT NULL)
  - `slug` (text, NOT NULL)
  - `categoryId` (text, NOT NULL) - Clé étrangère vers Category
  - `imageUrl` (text, NULL)
  - `createdAt` (timestamp, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - `updatedAt` (timestamp, NULL)

### Table Brand
- Colonnes identifiées :
  - `id` (text, NOT NULL)
  - `name` (text, NOT NULL)
  - `slug` (text, NOT NULL)
  - `imageUrl` (text, NULL)
  - `createdAt` (timestamp, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - `updatedAt` (timestamp, NULL)

### Table Product
- Colonnes identifiées :
  - `id` (text, NOT NULL)
  - `name` (text, NOT NULL)
  - `description` (text, NULL)
  - `priceCents` (integer, NOT NULL)
  - `oldPriceCents` (integer, NULL)
  - `imageUrl` (text, NULL)
  - `isFeatured` (boolean, DEFAULT false)
  - `stock` (integer, DEFAULT 0)
  - `rating` (numeric, NULL)
  - `categoryId` (text, NOT NULL) - Clé étrangère vers Category
  - `subcategoryId` (text, NULL) - Clé étrangère vers Subcategory
  - `brandId` (text, NULL) - Clé étrangère vers Brand
  - `createdAt` (timestamp, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
  - `updatedAt` (timestamp, NULL)

## Relations identifiées
- `Subcategory.categoryId` -> `Category.id`
- `Product.categoryId` -> `Category.id`
- `Product.subcategoryId` -> `Subcategory.id`
- `Product.brandId` -> `Brand.id`

## Problème actuel
TypeScript/Supabase s'attend à des noms de tables en minuscules :
- `categories` au lieu de `Category`
- `subcategories` au lieu de `Subcategory`
- `brands` au lieu de `Brand`
- `products` au lieu de `Product`

## Solution proposée
1. Configurer Supabase pour reconnaître les noms avec majuscules
2. Générer des types TypeScript corrects
3. Remplacer tous les `as any` par les vrais types
