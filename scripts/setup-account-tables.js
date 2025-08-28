const { createClient } = require('@supabase/supabase-js')

async function setupAccountTables() {
  console.log('🔧 Configuration des tables pour la page compte...')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Variables d\'environnement manquantes')
    return
  }
  
  const supabase = createClient(supabaseUrl, serviceKey)
  
  try {
    // 1. Vérifier/Créer la table users si elle n'existe pas
    console.log('\n👥 Vérification de la table users...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (usersError) {
      console.log('⚠️  Table users non accessible:', usersError.message)
      console.log('🔧 Création de la table users...')
      
      // Créer la table users
      const { error: createUsersError } = await supabase.rpc('create_users_table')
      if (createUsersError) {
        console.log('❌ Impossible de créer la table users:', createUsersError.message)
      } else {
        console.log('✅ Table users créée avec succès')
      }
    } else {
      console.log('✅ Table users accessible')
    }
    
    // 2. Vérifier/Créer la table orders
    console.log('\n📦 Vérification de la table orders...')
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1)
    
    if (ordersError) {
      console.log('⚠️  Table orders non accessible:', ordersError.message)
      console.log('🔧 Création de la table orders...')
      
      const { error: createOrdersError } = await supabase.rpc('create_orders_table')
      if (createOrdersError) {
        console.log('❌ Impossible de créer la table orders:', createOrdersError.message)
      } else {
        console.log('✅ Table orders créée avec succès')
      }
    } else {
      console.log('✅ Table orders accessible')
    }
    
    // 3. Vérifier/Créer la table user_favorites
    console.log('\n❤️  Vérification de la table user_favorites...')
    const { data: favorites, error: favoritesError } = await supabase
      .from('user_favorites')
      .select('*')
      .limit(1)
    
    if (favoritesError) {
      console.log('⚠️  Table user_favorites non accessible:', favoritesError.message)
      console.log('🔧 Création de la table user_favorites...')
      
      const { error: createFavoritesError } = await supabase.rpc('create_user_favorites_table')
      if (createFavoritesError) {
        console.log('❌ Impossible de créer la table user_favorites:', createFavoritesError.message)
      } else {
        console.log('✅ Table user_favorites créée avec succès')
      }
    } else {
      console.log('✅ Table user_favorites accessible')
    }
    
    // 4. Vérifier/Créer la table products
    console.log('\n🛍️  Vérification de la table products...')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1)
    
    if (productsError) {
      console.log('⚠️  Table products non accessible:', productsError.message)
      console.log('🔧 Création de la table products...')
      
      const { error: createProductsError } = await supabase.rpc('create_products_table')
      if (createProductsError) {
        console.log('❌ Impossible de créer la table products:', createProductsError.message)
      } else {
        console.log('✅ Table products créée avec succès')
      }
    } else {
      console.log('✅ Table products accessible')
    }
    
    // 5. Insérer des données de test si les tables sont vides
    console.log('\n📝 Vérification des données existantes...')
    
    // Vérifier s'il y a des utilisateurs
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (userCount === 0) {
      console.log('🔧 Insertion d\'un utilisateur de test...')
      const { error: insertUserError } = await supabase
        .from('users')
        .insert({
          id: 'test-user-1',
          email: 'test@example.com',
          name: 'Utilisateur Test',
          created_at: new Date().toISOString()
        })
      
      if (insertUserError) {
        console.log('⚠️  Impossible d\'insérer l\'utilisateur de test:', insertUserError.message)
      } else {
        console.log('✅ Utilisateur de test créé')
      }
    } else {
      console.log(`✅ ${userCount} utilisateur(s) trouvé(s)`)
    }
    
    // Vérifier s'il y a des produits
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    
    if (productCount === 0) {
      console.log('🔧 Insertion de produits de test...')
      const { error: insertProductsError } = await supabase
        .from('products')
        .insert([
          {
            id: 'prod-1',
            name: 'Produit Test 1',
            description: 'Description du produit test 1',
            price: 29.99,
            image_url: 'https://via.placeholder.com/300x300',
            stock_quantity: 100,
            created_at: new Date().toISOString()
          },
          {
            id: 'prod-2',
            name: 'Produit Test 2',
            description: 'Description du produit test 2',
            price: 49.99,
            image_url: 'https://via.placeholder.com/300x300',
            stock_quantity: 50,
            created_at: new Date().toISOString()
          }
        ])
      
      if (insertProductsError) {
        console.log('⚠️  Impossible d\'insérer les produits de test:', insertProductsError.message)
      } else {
        console.log('✅ Produits de test créés')
      }
    } else {
      console.log(`✅ ${productCount} produit(s) trouvé(s)`)
    }
    
    // 6. Tester les requêtes des API
    console.log('\n🧪 Test des requêtes des API...')
    
    // Test de l'API stats
    try {
      const { data: stats, error: statsError } = await supabase
        .from('orders')
        .select('status, total_amount')
        .limit(5)
      
      if (statsError) {
        console.log('⚠️  API stats:', statsError.message)
      } else {
        console.log('✅ API stats fonctionne')
      }
    } catch (error) {
      console.log('⚠️  Erreur API stats:', error.message)
    }
    
    console.log('\n🎉 Configuration terminée !')
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message)
  }
}

// Exécuter la configuration
setupAccountTables()
