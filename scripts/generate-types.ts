// Script pour générer les types TypeScript corrects
// Basé sur l'analyse du schéma de base de données

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string | null;
  imageUrl: string | null;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
  categoryId: string;
  brandId: string | null;
  isFeatured: boolean;
  oldPriceCents: number | null;
  rating: number;
  stock: number;
  subcategoryId: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string | null;
}

// Types pour les relations
export interface CategoryWithSubcategories extends Category {
  Subcategory: Subcategory[];
}

export interface ProductWithRelations extends Product {
  Category: Category;
  Subcategory: Subcategory | null;
  Brand: Brand | null;
}

// Types pour les requêtes Supabase
export interface SupabaseTables {
  Category: Category;
  Subcategory: Subcategory;
  Brand: Brand;
  Product: Product;
}

// Types pour les relations Supabase
export interface SupabaseRelations {
  Category: {
    Subcategory: Subcategory[];
  };
  Subcategory: {
    Category: Category;
  };
  Product: {
    Category: Category;
    Subcategory: Subcategory | null;
    Brand: Brand | null;
  };
}
