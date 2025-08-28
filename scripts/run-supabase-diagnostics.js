const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runDiagnostics() {
  console.log('🔍 DIAGNOSTICS SUPABASE - MAMI-SHOP');
  console.log('=====================================\n');

  try {
    // Diagnostic 1: Vérifier l'existence des tables
    console.log('1️⃣ Vérification de l\'existence des tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_type')
      .eq('table_schema', 'public')
      .order('table_name');

    if (tablesError) {
      console.log('❌ Erreur lors de la récupération des tables:', tablesError.message);
    } else {
      console.log('✅ Tables trouvées:');
      tables?.forEach(table => {
        console.log(`   - ${table.table_name} (${table.table_type})`);
      });
    }

    // Diagnostic 2: Vérifier la structure de user_favorites
    console.log('\n2️⃣ Structure de la table user_favorites...');
    const { data: userFavColumns, error: userFavError } = await supabase
      .rpc('get_table_columns', { table_name: 'user_favorites' });

    if (userFavError) {
      console.log('❌ Erreur lors de la récupération des colonnes user_favorites:', userFavError.message);
      // Essayer une approche alternative
      const { data: altUserFav, error: altError } = await supabase
        .from('user_favorites')
        .select('*')
        .limit(1);
      
      if (altError) {
        console.log('❌ Table user_favorites inaccessible:', altError.message);
      } else {
        console.log('✅ Table user_favorites accessible');
        console.log('   Colonnes disponibles:', Object.keys(altUserFav[0] || {}));
      }
    } else {
      console.log('✅ Colonnes user_favorites:', userFavColumns);
    }

    // Diagnostic 3: Vérifier la structure de products
    console.log('\n3️⃣ Structure de la table products...');
    const { data: productColumns, error: productError } = await supabase
      .rpc('get_table_columns', { table_name: 'products' });

    if (productError) {
      console.log('❌ Erreur lors de la récupération des colonnes products:', productError.message);
      // Essayer une approche alternative
      const { data: altProducts, error: altError } = await supabase
        .from('products')
        .select('*')
        .limit(1);
      
      if (altError) {
        console.log('❌ Table products inaccessible:', altError.message);
      } else {
        console.log('✅ Table products accessible');
        console.log('   Colonnes disponibles:', Object.keys(altProducts[0] || {}));
      }
    } else {
      console.log('✅ Colonnes products:', productColumns);
    }

    // Diagnostic 4: Vérifier les données d'exemple
    console.log('\n4️⃣ Données d\'exemple...');
    
    // Vérifier user_favorites
    const { data: favSample, error: favError } = await supabase
      .from('user_favorites')
      .select('*')
      .limit(2);
    
    if (favError) {
      console.log('❌ Erreur user_favorites:', favError.message);
    } else {
      console.log('✅ Échantillon user_favorites:', favSample?.length || 0, 'enregistrements');
      if (favSample && favSample.length > 0) {
        console.log('   Premier enregistrement:', favSample[0]);
      }
    }

    // Vérifier products
    const { data: productSample, error: productSampleError } = await supabase
      .from('products')
      .select('*')
      .limit(2);
    
    if (productSampleError) {
      console.log('❌ Erreur products:', productSampleError.message);
    } else {
      console.log('✅ Échantillon products:', productSample?.length || 0, 'enregistrements');
      if (productSample && productSample.length > 0) {
        console.log('   Premier enregistrement:', productSample[0]);
      }
    }

    // Diagnostic 5: Tester une requête spécifique
    console.log('\n5️⃣ Test de requête spécifique...');
    const { data: testQuery, error: testError } = await supabase
      .from('products')
      .select('id, name, description')
      .limit(1);
    
    if (testError) {
      console.log('❌ Erreur requête test:', testError.message);
    } else {
      console.log('✅ Requête test réussie:', testQuery);
    }

    // Diagnostic 6: Vérifier les contraintes
    console.log('\n6️⃣ Vérification des contraintes...');
    try {
      const { data: constraints, error: constraintsError } = await supabase
        .rpc('get_foreign_keys');
      
      if (constraintsError) {
        console.log('❌ Erreur contraintes:', constraintsError.message);
      } else {
        console.log('✅ Contraintes trouvées:', constraints);
      }
    } catch (e) {
      console.log('⚠️ Impossible de vérifier les contraintes:', e.message);
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }

  console.log('\n🏁 Diagnostics terminés');
}

// Fonction utilitaire pour créer les fonctions RPC nécessaires
async function createHelperFunctions() {
  console.log('🔧 Création des fonctions d\'aide...');
  
  try {
    // Fonction pour obtenir les colonnes d'une table
    const { error: columnsError } = await supabase.rpc('create_or_replace_function', {
      function_name: 'get_table_columns',
      function_definition: `
        CREATE OR REPLACE FUNCTION get_table_columns(table_name text)
        RETURNS TABLE(column_name text, data_type text, is_nullable text)
        LANGUAGE sql
        AS $$
          SELECT 
            column_name::text,
            data_type::text,
            is_nullable::text
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = $1
          ORDER BY ordinal_position;
        $$;
      `
    });

    if (columnsError) {
      console.log('⚠️ Impossible de créer la fonction get_table_columns:', columnsError.message);
    } else {
      console.log('✅ Fonction get_table_columns créée');
    }

  } catch (error) {
    console.log('⚠️ Erreur lors de la création des fonctions:', error.message);
  }
}

// Exécution principale
async function main() {
  try {
    await createHelperFunctions();
    await runDiagnostics();
  } catch (error) {
    console.error('❌ Erreur fatale:', error.message);
    process.exit(1);
  }
}

main();
