const { createClient } = require('@supabase/supabase-js')

async function testDatabaseConnection() {
  console.log('🔍 Test de connexion à la base de données Supabase...')
  
  // Vérifier les variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Variables d\'environnement manquantes:')
    console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
    console.error('SUPABASE_SERVICE_ROLE_KEY:', !!serviceKey)
    return
  }
  
  try {
    // Créer le client Supabase
    const supabase = createClient(supabaseUrl, serviceKey)
    console.log('✅ Client Supabase créé avec succès')
    
    // Tester la connexion en listant les tables
    console.log('\n📋 Vérification des tables existantes...')
    
    // Vérifier la table users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (usersError) {
      console.log('⚠️  Table "users":', usersError.message)
    } else {
      console.log('✅ Table "users" accessible')
    }
    
    // Vérifier la table orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('count')
      .limit(1)
    
    if (ordersError) {
      console.log('⚠️  Table "orders":', ordersError.message)
    } else {
      console.log('✅ Table "orders" accessible')
    }
    
    // Vérifier la table user_favorites
    const { data: favorites, error: favoritesError } = await supabase
      .from('user_favorites')
      .select('count')
      .limit(1)
    
    if (favoritesError) {
      console.log('⚠️  Table "user_favorites":', favoritesError.message)
    } else {
      console.log('✅ Table "user_favorites" accessible')
    }
    
    // Vérifier la table products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (productsError) {
      console.log('⚠️  Table "products":', productsError.message)
    } else {
      console.log('✅ Table "products" accessible')
    }
    
    // Lister toutes les tables du schéma public
    console.log('\n🔍 Liste de toutes les tables du schéma public:')
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_schema_tables')
    
    if (tablesError) {
      // Alternative: utiliser une requête SQL directe
      const { data: tablesAlt, error: tablesAltError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_type', 'BASE TABLE')
      
      if (tablesAltError) {
        console.log('⚠️  Impossible de lister les tables:', tablesAltError.message)
      } else {
        console.log('📋 Tables disponibles:')
        tablesAlt.forEach(table => {
          console.log(`  - ${table.table_name}`)
        })
      }
    } else {
      console.log('📋 Tables disponibles:')
      tables.forEach(table => {
        console.log(`  - ${table}`)
      })
    }
    
    // Tester une requête de statistiques
    console.log('\n📊 Test de récupération des statistiques...')
    const { data: stats, error: statsError } = await supabase
      .from('orders')
      .select('status, total_amount')
      .limit(5)
    
    if (statsError) {
      console.log('⚠️  Erreur lors de la récupération des statistiques:', statsError.message)
    } else {
      console.log('✅ Statistiques récupérées avec succès')
      console.log('📈 Données récupérées:', stats?.length || 0, 'commandes')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

// Exécuter le test
testDatabaseConnection()
