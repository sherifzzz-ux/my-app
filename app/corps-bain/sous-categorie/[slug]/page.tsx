import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { createServiceSupabaseClient } from '@/lib/supabase'

interface SubcategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getSubcategoryData(categorySlug: string, subcategorySlug: string) {
  try {
    console.log('🔍 Début de getSubcategoryData avec:', { categorySlug, subcategorySlug })
    
    const supabase = createServiceSupabaseClient()
    console.log('✅ Client Supabase créé')

    // Récupérer la catégorie
    console.log(`🔍 Recherche de la catégorie: ${categorySlug}`)
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('slug', categorySlug)
      .single()

    console.log('📊 Résultat de la recherche de catégorie:', { 
      category, 
      categoryError: categoryError?.message || categoryError,
      hasData: !!category 
    })

    if (categoryError) {
      console.error('❌ Erreur lors de la recherche de catégorie:', categoryError)
      return null
    }

    if (!category) {
      console.error('❌ Catégorie non trouvée pour le slug:', categorySlug)
      return null
    }

    console.log('✅ Catégorie trouvée:', category)

    // Récupérer toutes les sous-catégories de cette catégorie
    const categoryId: string = (category as unknown as { id: string }).id
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('id, name, slug, category_id')
      .eq('category_id', categoryId)
      .order('name')

    if (subcategoriesError) {
      console.error('Erreur sous-catégories:', subcategoriesError)
      return null
    }

    // Trouver la sous-catégorie demandée
    const subcategoryRows = (subcategories || []) as unknown as Array<{ id: string; name: string; slug: string }>
    const subcategory = subcategoryRows.find((sub: { slug: string }) => sub.slug === subcategorySlug)
    
    if (!subcategory) {
      console.error('Sous-catégorie non trouvée:', subcategorySlug)
      return null
    }

    return {
      category,
      subcategories: subcategoryRows.map(sub => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        description: `Découvrez notre sélection de ${sub.name.toLowerCase()}`,
        icon: getSubcategoryIcon(sub.slug),
        productCount: 0,
        featured: false
      })),
      subcategory: {
        id: subcategory.id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: `Découvrez notre sélection de ${subcategory.name.toLowerCase()}`,
        icon: getSubcategoryIcon(subcategory.slug),
        productCount: 0,
        featured: false
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    return null
  }
}

async function getProducts(categorySlug: string, subcategorySlug: string) {
  try {
    const supabase = createServiceSupabaseClient()

    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price_cents,
        old_price_cents,
        image_url,
        is_featured,
        stock,
        rating,
        created_at,
        categories!inner (
          id,
          name,
          slug
        ),
        subcategories (
          id,
          name,
          slug
        ),
        brands (
          id,
          name,
          slug
        )
      `)
      .eq('categories.slug', categorySlug)
      .eq('subcategories.slug', subcategorySlug)
      .gt('stock', 0)
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur lors de la récupération des produits:', error)
      return []
    }

    // Transformer les données
    const productRows = (products || []) as unknown as Array<{
      id: string;
      name: string;
      description?: string | null;
      priceCents: number;
      oldPriceCents?: number | null;
      imageUrl?: string | null;
      Brand?: { name: string } | null;
      rating?: number | null;
      stock: number;
      isFeatured: boolean;
      Category?: { name: string } | null;
      Subcategory?: { name: string } | null;
    }>
    
    return productRows.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      price: product.priceCents / 100,
      originalPrice: product.oldPriceCents ? product.oldPriceCents / 100 : undefined,
      image: product.imageUrl || '/images/placeholder-product.jpg',
      brand: product.Brand?.name || 'Marque inconnue',
      rating: product.rating || 0,
      reviews: Math.floor(Math.random() * 50) + 10,
      inStock: product.stock > 0,
      stock: product.stock,
      isFeatured: product.isFeatured,
      category: product.Category?.name || '',
      subcategory: product.Subcategory?.name || ''
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return []
  }
}

function getSubcategoryIcon(slug: string): string {
  const iconMap: { [key: string]: string } = {
    'soins-corps': '🧴',
    'bain-douche': '🛁',
    'epilation': '✨',
    'hygiene-intime': '🌸',
    'mains-pieds': '👐',
    'gommages': '🧽',
    'huiles-massage': '💆‍♀️'
  }
  return iconMap[slug] || '📦'
}

export default async function CorpsBainSubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug } = await params

  // Récupérer les données de la catégorie et sous-catégories
  const categoryData = await getSubcategoryData('corps-bain', slug)
  
  if (!categoryData) {
    console.error('Données de catégorie non trouvées pour:', slug)
    notFound()
  }

  // Récupérer les produits de cette sous-catégorie
  const subcategoryProducts = await getProducts('corps-bain', slug)
  console.log(`Produits trouvés pour ${slug}:`, subcategoryProducts.length)

  const categoryDataTyped = categoryData as unknown as {
    category: { id: string; name: string };
    subcategories: Array<{ id: string; name: string; slug: string; description: string; icon: string; productCount: number; featured: boolean }>;
  }

  const categoryInfo = {
    id: categoryDataTyped.category.id,
    name: categoryDataTyped.category.name,
    description: 'Découvrez notre sélection de soins pour le corps et le bain',
    icon: '🛁',
    color: 'bg-blue-500',
    subcategories: categoryDataTyped.subcategories,
    totalProducts: subcategoryProducts.length,
    featured: true
  }

  const guides = [
    {
      id: '1',
      title: `Guide ${categoryDataTyped.subcategories.find(s => s.slug === slug)?.name || 'Sous-catégorie'}`,
      description: `Découvrez tout ce qu'il faut savoir sur les ${categoryDataTyped.subcategories.find(s => s.slug === slug)?.name.toLowerCase() || 'produits'}`,
      content: 'Contenu du guide...',
      image: '/images/guides/guide-placeholder.jpg',
      readTime: 5,
      category: 'corps-bain',
      subcategory: categoryDataTyped.subcategories.find(s => s.slug === slug)?.id || '',
      featured: true
    }
  ]

  const currentSubcategory = categoryDataTyped.subcategories.find(s => s.slug === slug) || {
    id: '',
    name: 'Sous-catégorie',
    slug: slug,
    description: '',
    icon: '',
    productCount: 0,
    featured: false
  }

  return (
    <SubcategoryPage
      category={categoryInfo}
      subcategory={currentSubcategory}
      products={subcategoryProducts}
      guides={guides}
      loading={false}
    />
  )
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { slug } = await params
  
  const categoryData = await getSubcategoryData('corps-bain', slug)
  
  if (!categoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  const categoryDataTyped = categoryData as unknown as {
    subcategory: { name: string; description: string };
  }

  return {
    title: `${categoryDataTyped.subcategory.name} - Corps & Bain | Mami Shop`,
    description: categoryDataTyped.subcategory.description,
    keywords: [`${categoryDataTyped.subcategory.name}`, 'corps & bain', 'beauté', 'soins'],
    openGraph: {
      title: `${categoryDataTyped.subcategory.name} - Corps & Bain`,
      description: categoryDataTyped.subcategory.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  try {
    const supabase = createServiceSupabaseClient()
    
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'corps-bain')
      .single()
    
    if (!category) return []
    
    const { data: subcategories } = await supabase
      .from('subcategories')
      .select('slug')
      .eq('category_id', category.id)
    
    return subcategories?.map((subcategory) => ({
      slug: subcategory.slug,
    })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
