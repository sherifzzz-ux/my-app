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

async function checkTables() {
  try {
    console.log('🔍 Vérification des tables existantes...\n');

    // 1. Lister toutes les tables
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name');

    if (tablesError) {
      console.error('❌ Erreur lors de la récupération des tables:', tablesError);
      return;
    }

    console.log('📋 Tables disponibles dans le schéma public:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });

    console.log('\n🔍 Test d\'accès aux tables principales...\n');

    // 2. Tester l'accès aux tables principales
    const testTables = [
      'users', 'orders', 'products', 'user_favorites', 'user_addresses',
      'profiles', 'categories', 'brands', 'order_items'
    ];

    for (const tableName of testTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (error) {
          console.log(`❌ ${tableName}: ${error.message}`);
        } else {
          console.log(`✅ ${tableName}: accessible (${data?.length || 0} lignes)`);
        }
      } catch (err) {
        console.log(`❌ ${tableName}: ${err.message}`);
      }
    }

    console.log('\n🔍 Test de requête sur la table profiles...\n');

    // 3. Tester une requête spécifique sur profiles
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(3);

      if (profilesError) {
        console.log('❌ Erreur sur profiles:', profilesError.message);
      } else {
        console.log('✅ Profiles accessible:', profiles?.length || 0, 'lignes');
        if (profiles && profiles.length > 0) {
          console.log('   Exemple de profil:', profiles[0]);
        }
      }
    } catch (err) {
      console.log('❌ Erreur sur profiles:', err.message);
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

checkTables();
