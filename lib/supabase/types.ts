// Types Supabase personnalisés pour gérer les noms de tables avec majuscules
// Ce fichier remplace les types générés automatiquement

export interface Database {
  public: {
    Tables: {
      Category: {
        Row: {
          id: string;
          name: string;
          slug: string;
          createdAt: string;
          updatedAt: string | null;
          imageUrl: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          createdAt?: string;
          updatedAt?: string | null;
          imageUrl?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          createdAt?: string;
          updatedAt?: string | null;
          imageUrl?: string | null;
        };
        Relationships: [];
      };
      Subcategory: {
        Row: {
          id: string;
          name: string;
          slug: string;
          categoryId: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          categoryId: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          categoryId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Subcategory_categoryId_fkey";
            columns: ["categoryId"];
            referencedRelation: "Category";
            referencedColumns: ["id"];
          }
        ];
      };
      Brand: {
        Row: {
          id: string;
          name: string;
          slug: string;
          imageUrl: string | null;
          createdAt: string;
          updatedAt: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          imageUrl?: string | null;
          createdAt?: string;
          updatedAt?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          imageUrl?: string | null;
          createdAt?: string;
          updatedAt?: string | null;
        };
        Relationships: [];
      };
      Product: {
        Row: {
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
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          priceCents: number;
          imageUrl?: string | null;
          createdAt?: string;
          updatedAt?: string | null;
          categoryId: string;
          brandId?: string | null;
          isFeatured?: boolean;
          oldPriceCents?: number | null;
          rating?: number;
          stock?: number;
          subcategoryId?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          priceCents?: number;
          imageUrl?: string | null;
          createdAt?: string;
          updatedAt?: string | null;
          categoryId?: string;
          brandId?: string | null;
          isFeatured?: boolean;
          oldPriceCents?: number | null;
          rating?: number;
          stock?: number;
          subcategoryId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Product_categoryId_fkey";
            columns: ["categoryId"];
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Product_brandId_fkey";
            columns: ["brandId"];
            referencedRelation: "Brand";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Product_subcategoryId_fkey";
            columns: ["subcategoryId"];
            referencedRelation: "Subcategory";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Types d'aide pour les relations
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Types pour les requêtes avec relations
export type ProductWithRelations = Tables<'Product'> & {
  Category: Tables<'Category'>;
  Brand: Tables<'Brand'> | null;
  Subcategory: Tables<'Subcategory'> | null;
};

export type CategoryWithSubcategories = Tables<'Category'> & {
  Subcategory: Tables<'Subcategory'>[];
};

export type SubcategoryWithCategory = Tables<'Subcategory'> & {
  Category: Tables<'Category'>;
};
