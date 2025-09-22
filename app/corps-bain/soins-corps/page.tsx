import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { corpsBainSubcategories, corpsBainProducts } from '@/lib/data/corps-bain'

export default async function SoinsCorpsPage() {
  const slug = 'soins-corps'
  
  const subcategoryData = corpsBainSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  const subcategoryProducts = corpsBainProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  const categoryData = {
    id: 'corps-bain',
    name: 'Corps & Bain',
    description: 'Découvrez notre sélection de soins pour le corps et le bain',
    icon: '🛁',
    color: 'bg-blue-500',
    subcategories: corpsBainSubcategories,
    totalProducts: corpsBainProducts.length,
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
      category: 'corps-bain',
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

export async function generateMetadata() {
  const slug = 'soins-corps'
  
  const subcategoryData = corpsBainSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${subcategoryData.name} - Corps & Bain | Mami Shop`,
    description: subcategoryData.description,
    keywords: [`${subcategoryData.name}`, 'corps & bain', 'beauté', 'soins'],
    openGraph: {
      title: `${subcategoryData.name} - Corps & Bain`,
      description: subcategoryData.description,
      type: 'website',
    },
  }
}