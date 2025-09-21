import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { soinVisageSubcategories, soinVisageProducts } from '@/lib/data/soin-visage'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SoinDuVisageSubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  // Trouver la sous-catégorie correspondante
  const subcategoryData = soinVisageSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  // Filtrer les produits pour cette sous-catégorie
  const subcategoryProducts = soinVisageProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  // Données de la catégorie parent
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

  // Guides de test pour cette sous-catégorie
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

// Générer les métadonnées pour chaque sous-catégorie
export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { slug } = await params
  
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

// Générer les paramètres statiques pour toutes les sous-catégories
export async function generateStaticParams() {
  return soinVisageSubcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }))
}
