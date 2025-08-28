require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

async function simpleDiagnostic() {
  console.log('🔍 Diagnostic simple de la base de données...')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Variables d\'environnement manquantes')
    return
  }
  
  const supabase = createClient(supabaseUrl, serviceKey)
  
  // 1. Lister toutes les tables
  console.log('\n📋 1. LISTE DES TABLES DISPONIBLES:')
  try {
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE')
    
    if (error) {
      console.log('⚠️  Impossible de lister les tables:', error.message)
    } else {
      console.log('✅ Tables trouvées:')
      tables.forEach(table => {
        console.log(`   - ${table.table_name}`)
      })
    }
  } catch (error) {
    console.log('❌ Erreur lors de la liste des tables:', error.message)
  }
  
  // 2. Tester l'accès à la table users
  console.log('\n👥 2. TEST TABLE USERS:')
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('❌ Erreur table users:', error.message)
    } else {
      console.log('✅ Table users accessible')
      console.log(`   Enregistrements: ${users?.length || 0}`)
      if (users && users.length > 0) {
        console.log('   Exemple:', Object.keys(users[0]))
      }
    }
  } catch (error) {
    console.log('❌ Erreur lors du test users:', error.message)
  }
  
  // 3. Tester l'accès à la table orders
  console.log('\n📦 3. TEST TABLE ORDERS:')
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('❌ Erreur table orders:', error.message)
    } else {
      console.log('✅ Table orders accessible')
      console.log(`   Enregistrements: ${orders?.length || 0}`)
      if (orders && orders.length > 0) {
        console.log('   Exemple:', Object.keys(orders[0]))
      }
    }
  } catch (error) {
    console.log('❌ Erreur lors du test orders:', error.message)
  }
  
  // 4. Tester l'accès à la table products
  console.log('\n🛍️  4. TEST TABLE PRODUCTS:')
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('❌ Erreur table products:', error.message)
    } else {
      console.log('✅ Table products accessible')
      console.log(`   Enregistrements: ${products?.length || 0}`)
      if (products && products.length > 0) {
        console.log('   Exemple:', Object.keys(products[0]))
      }
    }
  } catch (error) {
    console.log('❌ Erreur lors du test products:', error.message)
  }
  
  // 5. Tester l'accès à la table user_favorites
  console.log('\n❤️  5. TEST TABLE USER_FAVORITES:')
  try {
    const { data: favorites, error } = await supabase
      .from('user_favorites')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('❌ Erreur table user_favorites:', error.message)
    } else {
      console.log('✅ Table user_favorites accessible')
      console.log(`   Enregistrements: ${favorites?.length || 0}`)
      if (favorites && favorites.length > 0) {
        console.log('   Exemple:', Object.keys(favorites[0]))
      }
    }
  } catch (error) {
    console.log('❌ Erreur lors du test user_favorites:', error.message)
  }
  
  // 6. Tester une requête de jointure
  console.log('\n🔗 6. TEST REQUÊTE AVEC JOINTURE:')
  try {
    const { data: joinTest, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            price
          )
        )
      `)
      .limit(1)
    
    if (error) {
      console.log('❌ Erreur jointure orders-order_items-products:', error.message)
    } else {
      console.log('✅ Jointure orders-order_items-products fonctionne')
      console.log(`   Résultats: ${joinTest?.length || 0}`)
    }
  } catch (error) {
    console.log('❌ Erreur lors du test de jointure:', error.message)
  }
  
  // 7. Vérifier les politiques RLS
  console.log('\n🔒 7. VÉRIFICATION RLS:')
  try {
    const { data: rlsTables, error } = await supabase
      .from('pg_tables')
      .select('tablename, rowsecurity')
      .eq('schemaname', 'public')
      .eq('rowsecurity', true)
    
    if (error) {
      console.log('⚠️  Impossible de vérifier RLS:', error.message)
    } else {
      if (rlsTables && rlsTables.length > 0) {
        console.log('⚠️  Tables avec RLS activé:')
        rlsTables.forEach(table => {
          console.log(`   - ${table.tablename}`)
        })
      } else {
        console.log('✅ Aucune table avec RLS activé')
      }
    }
  } catch (error) {
    console.log('❌ Erreur lors de la vérification RLS:', error.message)
  }
  
  console.log('\n🎉 Diagnostic terminé !')
}

// Exécuter le diagnostic
simpleDiagnostic()
