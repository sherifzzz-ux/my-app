import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { parfumerieSubcategories, parfumerieProducts } from '@/lib/data/parfumerie'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ParfumsFemmePage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  const subcategoryData = parfumerieSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    notFound()
  }

  const subcategoryProducts = parfumerieProducts.filter(
    product => product.subcategory === subcategoryData.id
  )

  const categoryData = {
    id: 'parfumerie',
    name: 'Parfumerie',
    description: 'Découvrez notre sélection de parfums et eaux de toilette',
    icon: '🌸',
    color: 'bg-rose-500',
    subcategories: parfumerieSubcategories,
    totalProducts: parfumerieProducts.length,
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
      category: 'parfumerie',
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
  
  const subcategoryData = parfumerieSubcategories.find(
    sub => sub.slug === slug
  )

  if (!subcategoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${subcategoryData.name} - Parfumerie | Mami Shop`,
    description: subcategoryData.description,
    keywords: [`${subcategoryData.name}`, 'parfumerie', 'parfums', 'beauté'],
    openGraph: {
      title: `${subcategoryData.name} - Parfumerie`,
      description: subcategoryData.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return parfumerieSubcategories.map((subcategory) => ({
    slug: subcategory.slug,
  }))
}
