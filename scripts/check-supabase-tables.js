const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSupabaseTables() {
  console.log('🔍 Vérification des noms de tables réels dans Supabase...\n');

  try {
    // 1. Lister toutes les tables du schéma public
    console.log('1️⃣ Tables du schéma public:');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE');

    if (tablesError) {
      console.log('❌ Erreur lors de la récupération des tables:', tablesError.message);
    } else {
      console.log('✅ Tables trouvées:');
      tables.forEach(table => {
        console.log(`   - ${table.table_name}`);
      });
    }
    console.log('');

    // 2. Vérifier les colonnes de quelques tables clés
    const keyTables = ['products', 'categories', 'brands', 'Product', 'Category', 'Brand'];
    
    for (const tableName of keyTables) {
      console.log(`2️⃣ Colonnes de la table "${tableName}":`);
      try {
        const { data: columns, error: columnsError } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_schema', 'public')
          .eq('table_name', tableName);

        if (columnsError) {
          console.log(`   ❌ Erreur pour ${tableName}:`, columnsError.message);
        } else if (columns && columns.length > 0) {
          console.log(`   ✅ Table "${tableName}" existe avec ${columns.length} colonnes:`);
          columns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`);
          });
        } else {
          console.log(`   ❌ Table "${tableName}" n'existe pas`);
        }
      } catch (e) {
        console.log(`   ❌ Erreur lors de la vérification de ${tableName}:`, e.message);
      }
      console.log('');
    }

    // 3. Test de connexion directe à quelques tables
    console.log('3️⃣ Test de connexion directe:');
    
    // Test avec noms en minuscules
    console.log('   Test avec "products":');
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .limit(1);
      
      if (productsError) {
        console.log(`     ❌ Erreur: ${productsError.message}`);
      } else {
        console.log(`     ✅ Succès: ${productsData?.length || 0} produit(s) trouvé(s)`);
      }
    } catch (e) {
      console.log(`     ❌ Exception: ${e.message}`);
    }

    // Test avec noms en majuscules
    console.log('   Test avec "Product":');
    try {
      const { data: productData, error: productError } = await supabase
        .from('Product')
        .select('*')
        .limit(1);
      
      if (productError) {
        console.log(`     ❌ Erreur: ${productError.message}`);
      } else {
        console.log(`     ✅ Succès: ${productData?.length || 0} produit(s) trouvé(s)`);
      }
    } catch (e) {
      console.log(`     ❌ Exception: ${e.message}`);
    }

    console.log('\n🎯 CONCLUSION:');
    console.log('Ce script vous montre les noms de tables réels dans votre base Supabase.');
    console.log('Vous devrez adapter vos APIs en conséquence.');

  } catch (error) {
    console.error('❌ Erreur critique:', error.message);
  }
}

// Exécuter le script
checkSupabaseTables().catch(console.error);
