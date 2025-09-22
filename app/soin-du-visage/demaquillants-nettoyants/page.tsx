import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { soinVisageSubcategories, soinVisageProducts } from '@/lib/data/soin-visage'

export default async function DemaquillantsNettoyantsPage() {
  const slug = 'demaquillants-nettoyants'
  
  const subcategoryData = soinVisageSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  const subcategoryProducts = soinVisageProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  const categoryData = {
    id: 'soin-du-visage',
    name: 'Soin du visage',
    description: 'Découvrez notre sélection de soins du visage pour tous types de peau',
    icon: '🧴',
    color: 'bg-blue-500',
    subcategories: soinVisageSubcategories,
    totalProducts: soinVisageProducts.length,
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
      category: 'soin-du-visage',
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
  const slug = 'demaquillants-nettoyants'
  
  const subcategoryData = soinVisageSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${subcategoryData.name} - Soin du visage | Mami Shop`,
    description: subcategoryData.description,
    keywords: [`${subcategoryData.name}`, 'soin du visage', 'beauté', 'skincare'],
    openGraph: {
      title: `${subcategoryData.name} - Soin du visage`,
      description: subcategoryData.description,
      type: 'website',
    },
  }
}