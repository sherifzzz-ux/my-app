require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement manquantes');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTables() {
  try {
    console.log('🔍 Test d\'accès aux tables principales...\n');

    // Liste des tables à tester (basée sur le schéma Prisma)
    const testTables = [
      // Tables principales
      'User',
      'Product', 
      'Category',
      'Brand',
      'Order',
      'OrderItem',
      'Address',
      'UserFavorite',
      'Cart',
      'CartItem',
      'Review',
      'Subcategory',
      
      // Tables alternatives (noms en minuscules)
      'users',
      'products',
      'categories', 
      'brands',
      'orders',
      'order_items',
      'addresses',
      'user_favorites',
      'carts',
      'cart_items',
      'reviews',
      'subcategories',
      
      // Table profiles (mentionnée dans les erreurs)
      'profiles'
    ];

    for (const tableName of testTables) {
      try {
        console.log(`🔍 Test de la table: ${tableName}`);
        
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (error) {
          console.log(`  ❌ ${tableName}: ${error.message}`);
        } else {
          console.log(`  ✅ ${tableName}: accessible (${data?.length || 0} lignes)`);
          
          // Si la table est accessible, afficher sa structure
          if (data && data.length > 0) {
            const sample = data[0];
            console.log(`     Colonnes: ${Object.keys(sample).join(', ')}`);
          }
        }
      } catch (err) {
        console.log(`  ❌ ${tableName}: ${err.message}`);
      }
      console.log(''); // Ligne vide pour la lisibilité
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

testTables();
