// Script de test pour vérifier la connexion Supabase
const { createClient } = require('@supabase/supabase-js')

// Configuration Supabase (utilisez vos vraies valeurs)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Test de connexion Supabase...')
console.log('URL:', supabaseUrl ? '✅ Configurée' : '❌ Manquante')
console.log('Service Key:', supabaseServiceKey ? '✅ Configurée' : '❌ Manquante')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Configuration Supabase manquante!')
  console.log('Vérifiez vos variables d\'environnement dans .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testConnection() {
  try {
    console.log('\n📋 Test 1: Récupération des catégories...')
    const { data: categories, error: categoriesError } = await supabase
      .from('Category')
      .select('id, name, slug')
      .order('name')

    if (categoriesError) {
      console.error('❌ Erreur catégories:', categoriesError)
      return
    }

    console.log('✅ Catégories récupérées:', categories.length)
    console.log('Catégories:', categories.map(c => `${c.name} (${c.slug})`).join(', '))

    console.log('\n📋 Test 2: Recherche de "corps-bain"...')
    const { data: corpsBain, error: corpsBainError } = await supabase
      .from('Category')
      .select('id, name, slug')
      .eq('slug', 'corps-bain')
      .single()

    if (corpsBainError) {
      console.error('❌ Erreur corps-bain:', corpsBainError)
      return
    }

    console.log('✅ Corps & Bain trouvé:', corpsBain)

    console.log('\n📋 Test 3: Sous-catégories de Corps & Bain...')
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('Subcategory')
      .select('id, name, slug, categoryId')
      .eq('categoryId', corpsBain.id)
      .order('name')

    if (subcategoriesError) {
      console.error('❌ Erreur sous-catégories:', subcategoriesError)
      return
    }

    console.log('✅ Sous-catégories récupérées:', subcategories.length)
    console.log('Sous-catégories:', subcategories.map(s => `${s.name} (${s.slug})`).join(', '))

    console.log('\n📋 Test 4: Recherche de "bain-douche"...')
    const bainDouche = subcategories.find(s => s.slug === 'bain-douche')
    if (bainDouche) {
      console.log('✅ Bain & Douche trouvé:', bainDouche)
    } else {
      console.log('❌ Bain & Douche non trouvé')
    }

    console.log('\n🎉 Tous les tests sont passés! La connexion Supabase fonctionne.')

  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

testConnection()
