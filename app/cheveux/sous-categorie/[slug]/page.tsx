import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { cheveuxSubcategories, cheveuxProducts } from '@/lib/data/cheveux'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CheveuxSubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  const subcategoryData = cheveuxSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  const subcategoryProducts = cheveuxProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  const categoryData = {
    id: 'cheveux',
    name: 'Cheveux',
    description: 'Découvrez notre sélection de soins pour les cheveux',
    icon: '💇',
    color: 'bg-purple-500',
    subcategories: cheveuxSubcategories,
    totalProducts: cheveuxProducts.length,
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
      category={categoryData}
      subcategory={subcategoryData}
      products={subcategoryProducts}
      guides={guides}
      loading={false}
    />
  )
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { slug } = await params
  
  const subcategoryData = cheveuxSubcategories.find(
    sub => sub.slug === slug
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
  return cheveuxSubcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }))
}
