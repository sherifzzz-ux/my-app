const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function quickTest() {
  console.log('🧪 Test rapide de la suspension...\n');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.log('❌ Variables d\'environnement manquantes');
    return;
  }

  const supabase = createClient(url, serviceKey);

  try {
    // Test 1: Vérifier la table user_suspensions
    console.log('📊 Test de la table user_suspensions...');
    const { data, error } = await supabase
      .from('user_suspensions')
      .select('*')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        console.log('❌ Table user_suspensions n\'existe pas');
        console.log('   Solution: Exécuter la migration SQL');
      } else {
        console.log(`❌ Erreur: ${error.message}`);
      }
    } else {
      console.log('✅ Table user_suspensions existe');
    }

    // Test 2: Vérifier la fonction exec_sql
    console.log('\n🔧 Test de la fonction exec_sql...');
    try {
      const { error: execError } = await supabase.rpc('exec_sql', { 
        sql: 'SELECT 1 as test' 
      });
      
      if (execError) {
        console.log(`❌ Fonction exec_sql: ${execError.message}`);
      } else {
        console.log('✅ Fonction exec_sql fonctionne');
      }
    } catch (execError) {
      console.log(`❌ Erreur exec_sql: ${execError.message}`);
    }

  } catch (error) {
    console.log(`💥 Erreur: ${error.message}`);
  }
}

quickTest().catch(console.error);
