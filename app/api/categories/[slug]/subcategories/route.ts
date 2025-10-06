import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase'
import { typedSupabase } from '@/lib/supabase/client'

export const runtime = 'nodejs'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Récupérer la catégorie par son slug
    const { data: category, error: categoryError } = await typedSupabase.getCategoryBySlug(slug)

    if (categoryError || !category) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
    }

    // Récupérer les sous-catégories de cette catégorie
    const { data: subcategories, error: subcategoriesError } = await typedSupabase.getSubcategoriesByCategory(category.id)

    if (subcategoriesError) throw subcategoriesError

    // Transformer les données pour correspondre au format attendu
    const transformedSubcategories = subcategories?.map((sub) => ({
      id: sub.id,
      name: sub.name,
      slug: sub.slug,
      description: `Découvrez notre sélection de ${sub.name.toLowerCase()}`,
      icon: getSubcategoryIcon(sub.slug),
      productCount: 0, // Sera calculé côté client ou via une autre API
      featured: false,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug
      }
    })) || []

    return NextResponse.json({
      category,
      subcategories: transformedSubcategories
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des sous-catégories:', error)
    return NextResponse.json({ 
      error: 'Erreur interne du serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}

// Fonction pour assigner des icônes selon le slug de la sous-catégorie
function getSubcategoryIcon(slug: string): string {
  const iconMap: { [key: string]: string } = {
    'soins-corps': '🧴',
    'bain-douche': '🛁',
    'epilation': '✨',
    'hygiene-intime': '🌸',
    'mains-pieds': '👐',
    'gommages': '🧽',
    'huiles-massage': '💆‍♀️',
    'nettoyants': '🧼',
    'hydratants': '💧',
    'protection-solaire': '☀️',
    'serums': '💉',
    'masques': '🎭',
    'soins-cibles': '🎯',
    'baumes-levres': '💋',
    'demaquillants-nettoyants': '🧴',
    'shampoings': '🧴',
    'apres-shampoings': '💆‍♀️',
    'soins-cheveux': '💇‍♀️',
    'traitements': '💊',
    'accessoires-cheveux': '🎀',
    'teint': '🎨',
    'yeux': '👁️',
    'levres': '💋',
    'ongles': '💅',
    'accessoires-maquillage': '🖌️',
    'palettes': '🎨',
    'pinceaux': '🖌️',
    'vitamines': '💊',
    'minceur': '⚖️',
    'bien-etre': '🧘‍♀️',
    'medicaments-sans-ordonnance': '💊',
    'complements-alimentaires': '💊',
    'routine-capillaire': '💇‍♀️',
    'parfums-femme': '🌸',
    'parfums-homme': '🌿',
    'eaux-de-toilette': '💧',
    'coffrets-parfums': '🎁',
    'huiles-parfumees': '🕯️',
    'bougies-parfumees': '🕯️',
    'accessoires': '🎀',
    'cremes': '🧴',
    'traitements-cibles': '🎯'
  }

  return iconMap[slug] || '📦'
}
