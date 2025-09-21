import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { corpsBainSubcategories, corpsBainProducts } from '@/lib/data/corps-bain'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SoinsCorpsPage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  // Trouver la sous-catégorie correspondante
  const subcategoryData = corpsBainSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  // Filtrer les produits pour cette sous-catégorie
  const subcategoryProducts = corpsBainProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  // Données de la catégorie parent
  const categoryData = {
    id: 'corps-bain',
    name: 'Corps & Bain',
    description: 'Découvrez notre sélection de soins pour le corps et produits de bain',
    icon: '🛁',
    color: 'bg-indigo-500',
    subcategories: corpsBainSubcategories,
    totalProducts: corpsBainProducts.length,
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

// Générer les métadonnées pour chaque sous-catégorie
export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { slug } = await params
  
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

// Générer les paramètres statiques pour toutes les sous-catégories
export async function generateStaticParams() {
  return corpsBainSubcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }))
}
