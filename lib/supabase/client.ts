// Client Supabase configuré avec les types personnalisés
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Client Supabase avec types personnalisés
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Fonctions d'aide pour les requêtes typées
export const typedSupabase = {
  // Requêtes Category
  getCategories: () => supabase.from('Category').select('*'),
  getCategoryBySlug: (slug: string) => supabase.from('Category').select('*').eq('slug', slug).single(),
  
  // Requêtes Subcategory
  getSubcategories: () => supabase.from('Subcategory').select('*'),
  getSubcategoriesByCategory: (categoryId: string) => 
    supabase.from('Subcategory').select('*').eq('categoryId', categoryId),
  getSubcategoryBySlug: (slug: string) => 
    supabase.from('Subcategory').select('*').eq('slug', slug).single(),
  
  // Requêtes Brand
  getBrands: () => supabase.from('Brand').select('*'),
  getBrandBySlug: (slug: string) => supabase.from('Brand').select('*').eq('slug', slug).single(),
  
  // Requêtes Product
  getProducts: () => supabase.from('Product').select('*'),
  getProductById: (id: string) => supabase.from('Product').select('*').eq('id', id).single(),
  getProductsByCategory: (categoryId: string) => 
    supabase.from('Product').select('*').eq('categoryId', categoryId),
  getProductsBySubcategory: (subcategoryId: string) => 
    supabase.from('Product').select('*').eq('subcategoryId', subcategoryId),
  getProductsByBrand: (brandId: string) => 
    supabase.from('Product').select('*').eq('brandId', brandId),
  getFeaturedProducts: () => 
    supabase.from('Product').select('*').eq('isFeatured', true),
  
  // Requêtes avec relations
  getProductsWithRelations: () => supabase
    .from('Product')
    .select(`
      *,
      Category (*),
      Brand (*),
      Subcategory (*)
    `),
  
  getCategoriesWithSubcategories: () => supabase
    .from('Category')
    .select(`
      *,
      Subcategory (*)
    `),
  
  getSubcategoriesWithCategory: () => supabase
    .from('Subcategory')
    .select(`
      *,
      Category (*)
    `),
};

export default supabase;