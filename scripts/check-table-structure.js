require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

async function checkTableStructure() {
  console.log('🔍 Vérification de la structure des tables...')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Variables d\'environnement manquantes')
    return
  }
  
  const supabase = createClient(supabaseUrl, serviceKey)
  
  // Tables à vérifier
  const tablesToCheck = [
    'User', 'Order', 'Product', 'profiles', 'orders', 'order_items'
  ]
  
  for (const tableName of tablesToCheck) {
    console.log(`\n📋 Table: ${tableName}`)
    
    try {
      // Vérifier si la table est accessible
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1)
      
      if (error) {
        console.log(`   ❌ Erreur: ${error.message}`)
      } else {
        console.log(`   ✅ Accessible`)
        console.log(`   📊 Enregistrements: ${data?.length || 0}`)
        
        if (data && data.length > 0) {
          console.log(`   🏗️  Structure des colonnes:`)
          const columns = Object.keys(data[0])
          columns.forEach(col => {
            console.log(`      - ${col}`)
          })
        }
      }
    } catch (error) {
      console.log(`   ❌ Exception: ${error.message}`)
    }
  }
  
  // Vérifier spécifiquement la table user_favorites
  console.log('\n❤️  Table user_favorites (manquante)')
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('   ❌ Table user_favorites n\'existe pas')
      console.log('   🔧 Cette table doit être créée')
    } else {
      console.log('   ✅ Table user_favorites existe')
    }
  } catch (error) {
    console.log('   ❌ Table user_favorites n\'existe pas')
  }
  
  // Tester une requête de jointure avec les vraies tables
  console.log('\n🔗 Test de jointure avec les vraies tables:')
  try {
    const { data: joinTest, error } = await supabase
      .from('Order') // Utiliser la table avec majuscule
      .select(`
        *,
        OrderItem (
          *,
          Product (
            id,
            name,
            price
          )
        )
      `)
      .limit(1)
    
    if (error) {
      console.log(`   ❌ Erreur jointure Order-OrderItem-Product: ${error.message}`)
    } else {
      console.log('   ✅ Jointure Order-OrderItem-Product fonctionne')
      console.log(`   📊 Résultats: ${joinTest?.length || 0}`)
    }
  } catch (error) {
    console.log(`   ❌ Exception lors de la jointure: ${error.message}`)
  }
  
  console.log('\n🎉 Vérification terminée !')
}

// Exécuter la vérification
checkTableStructure()
