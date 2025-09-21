import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'

// Interfaces génériques pour toutes les catégories
export interface GenericSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface GenericProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isNew: boolean
  isOnSale: boolean
  category: string
  subcategory: string
  tags: string[]
  description: string
}

export interface GenericCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: GenericSubcategory[]
  totalProducts: number
  featured: boolean
}

export interface GenericGuide {
  id: string
  title: string
  description: string
  content: string
  image: string
  readTime: number
  category: string
  subcategory: string
  featured: boolean
}

interface GenericSubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
  categoryData: GenericCategory
  subcategories: GenericSubcategory[]
  products: GenericProduct[]
  categoryName: string
  categoryDescription: string
  categoryIcon: string
  categoryColor: string
}

export default async function GenericSubcategoryPage({
  params,
  categoryData,
  subcategories,
  products,
  categoryName,
  categoryDescription,
  categoryIcon,
  categoryColor
}: GenericSubcategoryPageProps) {
  const { slug } = await params

  // Trouver la sous-catégorie correspondante
  const subcategoryData = subcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  // Filtrer les produits pour cette sous-catégorie
  const subcategoryProducts = products.filter(
    product => product.subcategory === subcategoryData.id
  )

  // Guides génériques pour cette sous-catégorie
  const guides: GenericGuide[] = [
    {
      id: '1',
      title: `Guide ${subcategoryData.name}`,
      description: `Découvrez tout ce qu'il faut savoir sur les ${subcategoryData.name.toLowerCase()}`,
      content: 'Contenu du guide...',
      image: '/images/guides/guide-placeholder.jpg',
      readTime: 5,
      category: categoryData.id,
      subcategory: subcategoryData.id,
      featured: true
    }
  ]

  return (
    <SubcategoryPage
      category={categoryData}
      subcategory={subcategoryData}
      products={subcategoryProducts}
      guides={guides}
      loading={false}
    />
  )
}

// Générer les métadonnées pour chaque sous-catégorie
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  subcategories: GenericSubcategory[],
  categoryName: string
) {
  const { slug } = await params
  
  const subcategoryData = subcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${subcategoryData.name} - ${categoryName} | Mami Shop`,
    description: subcategoryData.description,
    keywords: [`${subcategoryData.name}`, categoryName.toLowerCase(), 'beauté', 'cosmétique'],
    openGraph: {
      title: `${subcategoryData.name} - ${categoryName}`,
      description: subcategoryData.description,
      type: 'website',
    },
  }
}

// Générer les paramètres statiques pour toutes les sous-catégories
export function generateStaticParams(subcategories: GenericSubcategory[]) {
  return subcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }))
}
