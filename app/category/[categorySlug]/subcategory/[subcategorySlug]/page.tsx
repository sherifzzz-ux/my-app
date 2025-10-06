import { notFound } from 'next/navigation'
import { SubcategoryPage } from '@/components/category'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { typedSupabase } from '@/lib/supabase/client'

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string
    subcategorySlug: string
  }>
}

async function getSubcategoryData(categorySlug: string, subcategorySlug: string) {
  try {
    console.log('🔍 Début de getSubcategoryData avec:', { categorySlug, subcategorySlug })
    
    const supabase = createServiceSupabaseClient()
    console.log('✅ Client Supabase créé')

    // Récupérer la catégorie
    console.log(`🔍 Recherche de la catégorie: ${categorySlug}`)
    const { data: category, error: categoryError } = await typedSupabase.getCategoryBySlug(categorySlug)

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
    const { data: subcategories, error: subcategoriesError } = await typedSupabase.getSubcategoriesByCategory(category.id)

    if (subcategoriesError) {
      console.error('❌ Erreur lors de la récupération des sous-catégories:', subcategoriesError)
      return null
    }

    // Trouver la sous-catégorie demandée
    const subcategoryRows = (subcategories || []) as unknown as Array<{ id: string; name: string; slug: string }>
    const subcategory = subcategoryRows.find((sub: { slug: string }) => sub.slug === subcategorySlug)
    
    if (!subcategory) {
      console.error('❌ Sous-catégorie non trouvée:', subcategorySlug)
      return null
    }

    return {
      category,
      subcategories: subcategoryRows.map((sub: { id: string; name: string; slug: string }) => ({
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
    console.error('❌ Erreur lors de la récupération des données:', error)
    return null
  }
}

async function getProducts(categorySlug: string, subcategorySlug: string) {
  try {
    // Récupérer tous les produits avec relations
    const { data: allProducts, error } = await typedSupabase.getProductsWithRelations()

    if (error) {
      console.error('❌ Erreur lors de la récupération des produits:', error)
      return []
    }

    // Caster les données pour éviter les erreurs de typage
    const productRows = (allProducts || []) as unknown as Array<{
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
      createdAt: string;
      Category?: { slug: string; name: string } | null;
      Subcategory?: { slug: string; name: string } | null;
    }>

    // Filtrer les produits par catégorie et sous-catégorie
    const filteredProducts = productRows
      .filter(product => 
        product.Category?.slug === categorySlug && 
        product.Subcategory?.slug === subcategorySlug &&
        product.stock > 0
      )
      .sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1
        if (a.rating !== b.rating) return (b.rating || 0) - (a.rating || 0)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

    // Transformer les données
    return filteredProducts.map(product => ({
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
      isNew: false, // Ajout de la propriété manquante
      isOnSale: !!product.oldPriceCents, // Ajout de la propriété manquante
      tags: [], // Ajout de la propriété manquante
      category: product.Category?.name || '',
      subcategory: product.Subcategory?.name || ''
    })) || []
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error)
    return []
  }
}

function getSubcategoryIcon(slug: string): string {
  const iconMap: { [key: string]: string } = {
    // Corps & Bain
    'soins-corps': '🧴',
    'bain-douche': '🛁',
    'epilation': '✨',
    'hygiene-intime': '🌸',
    'mains-pieds': '👐',
    'gommages': '🧽',
    'huiles-massage': '💆‍♀️',
    
    // Cheveux
    'shampoings': '🧴',
    'apres-shampoings': '💆‍♀️',
    'soins-cheveux': '💇‍♀️',
    'traitements': '💊',
    'accessoires-cheveux': '🎀',
    'complements-alimentaires': '💊',
    'routine-capillaire': '💇‍♀️',
    
    // Maquillage
    'teint': '🎨',
    'yeux': '👁️',
    'levres': '💋',
    'ongles': '💅',
    'accessoires-maquillage': '🖌️',
    'palettes': '🎨',
    'pinceaux': '🖌️',
    
    // Parfumerie
    'parfums-femme': '🌸',
    'parfums-homme': '🌿',
    'eaux-de-toilette': '💧',
    'coffrets-parfums': '🎁',
    'huiles-parfumees': '🕯️',
    'bougies-parfumees': '🕯️',
    
    // Soin du visage
    'nettoyants': '🧼',
    'hydratants': '💧',
    'protection-solaire': '☀️',
    'serums': '💉',
    'masques': '🎭',
    'soins-cibles': '🎯',
    'baumes-levres': '💋',
    'demaquillants-nettoyants': '🧴',
    
    // Parapharmacie
    'vitamines': '💊',
    'minceur': '⚖️',
    'bien-etre': '🧘‍♀️',
    'medicaments-sans-ordonnance': '💊',
    'soins-visage': '🧴',
    
    // Korean Beauty
    'accessoires': '🎀',
    'cremes': '🧴',
    'traitements-cibles': '🎯'
  }
  return iconMap[slug] || '📦'
}

function getCategoryInfo(categoryName: string) {
  const categoryMap: { [key: string]: { icon: string; color: string; description: string } } = {
    'Corps & Bain': { icon: '🛁', color: 'bg-blue-500', description: 'Découvrez notre sélection de soins pour le corps et le bain' },
    'Cheveux': { icon: '💇', color: 'bg-purple-500', description: 'Découvrez notre sélection de soins pour les cheveux' },
    'Maquillage': { icon: '💄', color: 'bg-pink-500', description: 'Découvrez notre sélection de maquillage' },
    'Parfumerie': { icon: '🌸', color: 'bg-rose-500', description: 'Découvrez notre sélection de parfums' },
    'Parapharmacie': { icon: '💊', color: 'bg-green-500', description: 'Découvrez notre sélection de produits de parapharmacie' },
    'Soin du visage': { icon: '✨', color: 'bg-orange-500', description: 'Découvrez notre sélection de soins pour le visage' },
    'Korean Beauty': { icon: '🇰🇷', color: 'bg-red-500', description: 'Découvrez notre sélection de produits de beauté coréens' }
  }
  
  return categoryMap[categoryName] || { icon: '📦', color: 'bg-gray-500', description: 'Découvrez notre sélection de produits' }
}

export default async function GenericSubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params

  // Récupérer les données de la catégorie et sous-catégories
  const categoryData = await getSubcategoryData(categorySlug, subcategorySlug)
  
  if (!categoryData) {
    console.error('Données de catégorie non trouvées pour:', { categorySlug, subcategorySlug })
    notFound()
  }

  // Récupérer les produits de cette sous-catégorie
  const subcategoryProducts = await getProducts(categorySlug, subcategorySlug)
  console.log(`Produits trouvés pour ${subcategorySlug}:`, subcategoryProducts.length)

  const categoryInfo = getCategoryInfo(categoryData.category.name)
  const categoryInfoData = {
    id: categoryData.category.id,
    name: categoryData.category.name,
    description: categoryInfo.description,
    icon: categoryInfo.icon,
    color: categoryInfo.color,
    subcategories: categoryData.subcategories,
    totalProducts: subcategoryProducts.length,
    featured: true
  }

  const guides = [
    {
      id: '1',
      title: `Guide ${categoryData.subcategory.name}`,
      description: `Découvrez tout ce qu'il faut savoir sur les ${categoryData.subcategory.name.toLowerCase()}`,
      content: 'Contenu du guide...',
      image: '/images/guides/guide-placeholder.jpg',
      readTime: 5,
      category: categorySlug,
      subcategory: categoryData.subcategory.id,
      featured: true
    }
  ]

  return (
    <SubcategoryPage
      category={categoryInfoData}
      subcategory={categoryData.subcategory}
      products={subcategoryProducts}
      guides={guides}
      loading={false}
    />
  )
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params
  
  const categoryData = await getSubcategoryData(categorySlug, subcategorySlug)
  
  if (!categoryData) {
    return {
      title: 'Sous-catégorie non trouvée',
      description: 'La sous-catégorie demandée n\'existe pas.'
    }
  }

  return {
    title: `${categoryData.subcategory.name} - ${categoryData.category.name} | Mami Shop`,
    description: categoryData.subcategory.description,
    keywords: [`${categoryData.subcategory.name}`, categoryData.category.name.toLowerCase(), 'beauté', 'soins'],
    openGraph: {
      title: `${categoryData.subcategory.name} - ${categoryData.category.name}`,
      description: categoryData.subcategory.description,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  try {
    const supabase = createServiceSupabaseClient()
    
    // Récupérer toutes les sous-catégories (sans relations)
    const { data: subcategories } = await supabase
      .from('Subcategory')
      .select('slug, categoryId')

    // Récupérer les catégories pour mapper id -> slug
    const { data: categories } = await supabase
      .from('Category')
      .select('id, slug')

    const categorySlugById: Record<string, string> = {}
    const categoryRows = (categories || []) as unknown as Array<{ id: string; slug: string }>
    for (const cat of categoryRows) {
      categorySlugById[cat.id] = cat.slug
    }

    const params = []
    const subcategoryRows = (subcategories || []) as unknown as Array<{ slug: string; categoryId: string }>
    for (const sub of subcategoryRows) {
      const catSlug = categorySlugById[sub.categoryId]
      if (catSlug) {
        params.push({
          categorySlug: catSlug,
          subcategorySlug: sub.slug
        })
      }
    }
    
    return params
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
