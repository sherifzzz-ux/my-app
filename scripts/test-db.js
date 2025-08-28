console.log('🔍 Test de connexion à la base de données...')

// Vérifier les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('URL Supabase:', supabaseUrl ? '✅ Présent' : '❌ Manquant')
console.log('Clé service:', serviceKey ? '✅ Présent' : '❌ Manquant')

if (!supabaseUrl || !serviceKey) {
  console.log('❌ Variables d\'environnement manquantes')
  process.exit(1)
}

console.log('✅ Variables d\'environnement OK')
console.log('📋 Test terminé')
