import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { parapharmacieSubcategories, parapharmacieProducts } from '@/lib/data/parapharmacie'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ParapharmacieSubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  const subcategoryData = parapharmacieSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  const subcategoryProducts = parapharmacieProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  const categoryData = {
    id: 'parapharmacie',
    name: 'Parapharmacie',
    description: 'Découvrez notre sélection de produits de parapharmacie',
    icon: '💊',
    color: 'bg-green-500',
    subcategories: parapharmacieSubcategories,
    totalProducts: parapharmacieProducts.length,
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
      category: 'parapharmacie',
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
  
  const subcategoryData = parapharmacieSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${subcategoryData.name} - Parapharmacie | Mami Shop`,
    description: subcategoryData.description,
    keywords: [`${subcategoryData.name}`, 'parapharmacie', 'santé', 'bien-être'],
    openGraph: {
      title: `${subcategoryData.name} - Parapharmacie`,
      description: subcategoryData.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return parapharmacieSubcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }))
}
