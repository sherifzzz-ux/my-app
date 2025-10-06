import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getSubcategoryData(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/categories/cheveux/subcategories`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch subcategories')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching subcategory data:', error)
    return null
  }
}

async function getProducts(categorySlug: string, subcategorySlug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category=${categorySlug}&subcategory=${subcategorySlug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function CheveuxSubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  // Récupérer les données de la catégorie et sous-catégories
  const categoryData = await getSubcategoryData(slug)
  
  if (!categoryData) {
    notFound()
  }

  const subcategoryData = categoryData.subcategories.find(
    (sub: { slug: string }) => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  // Récupérer les produits de cette sous-catégorie
  const subcategoryProducts = await getProducts('cheveux', slug)

  const categoryInfo = {
    id: categoryData.category.id,
    name: categoryData.category.name,
    description: 'Découvrez notre sélection de soins pour les cheveux',
    icon: '💇',
    color: 'bg-purple-500',
    subcategories: categoryData.subcategories,
    totalProducts: subcategoryProducts.length,
    featured: true
  }

  const guides = [
    {
      id: '1',
      title: `Guide ${subcategoryData.name}`,
      description: `Découvrez tout ce qu'il faut savoir sur les ${subcategoryData.name.toLowerCase()}`,
      content: 'Contenu du guide...',
      image: '/images/guides/guide-placeholder.jpg',
      readTime: 5,
      category: 'cheveux',
      subcategory: subcategoryData.id,
      featured: true
    }
  ]

  return (
    <SubcategoryPage
      category={categoryInfo}
      subcategory={subcategoryData}
      products={subcategoryProducts}
      guides={guides}
      loading={false}
    />
  )
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { slug } = await params
  
  const categoryData = await getSubcategoryData(slug)
  
  if (!categoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  const subcategoryData = categoryData.subcategories.find(
    (sub: { slug: string }) => sub.slug === slug
  )

  if (!subcategoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${subcategoryData.name} - Cheveux | Mami Shop`,
    description: subcategoryData.description,
    keywords: [`${subcategoryData.name}`, 'cheveux', 'beauté', 'soins capillaires'],
    openGraph: {
      title: `${subcategoryData.name} - Cheveux`,
      description: subcategoryData.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  try {
    const categoryData = await getSubcategoryData('')
    return categoryData?.subcategories?.map((subcategory: { slug: string }) => ({
      slug: subcategory.slug,
    })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
