const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debugSuspension() {
  console.log('🔍 Diagnostic de la suspension des utilisateurs...\n');

  // Vérifier les variables d'environnement
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('📋 Variables d\'environnement:');
  console.log(`- URL: ${url ? '✅ Configurée' : '❌ Manquante'}`);
  console.log(`- Service Key: ${serviceKey ? '✅ Configurée' : '❌ Manquante'}`);
  console.log(`- Anon Key: ${anonKey ? '✅ Configurée' : '❌ Manquante'}\n`);

  if (!url || !serviceKey) {
    console.log('❌ Variables d\'environnement manquantes');
    return;
  }

  const supabase = createClient(url, serviceKey);

  try {
    // Test 1: Vérifier la connexion
    console.log('🔌 Test de connexion...');
    const { data: testData, error: testError } = await supabase
      .from('user_suspensions')
      .select('*')
      .limit(1);

    if (testError) {
      console.log(`❌ Erreur de connexion: ${testError.message}`);
      console.log(`   Code: ${testError.code}`);
      console.log(`   Détails: ${testError.details}`);
    } else {
      console.log('✅ Connexion réussie');
    }

    // Test 2: Vérifier si la table user_suspensions existe
    console.log('\n📊 Test de la table user_suspensions...');
    if (testError && testError.code === '42P01') {
      console.log('❌ Table user_suspensions n\'existe pas');
      console.log('   Solution: Appliquer la migration SQL');
    } else if (testError) {
      console.log(`❌ Autre erreur: ${testError.message}`);
    } else {
      console.log('✅ Table user_suspensions existe');
      console.log(`   Nombre d'enregistrements: ${testData?.length || 0}`);
    }

    // Test 3: Vérifier la fonction get_user_role
    console.log('\n🔧 Test de la fonction get_user_role...');
    try {
      const { data: roleData, error: roleError } = await supabase.rpc('get_user_role', {
        _user_id: '00000000-0000-0000-0000-000000000000' // UUID de test
      });

      if (roleError) {
        console.log(`❌ Fonction get_user_role: ${roleError.message}`);
        console.log(`   Code: ${roleError.code}`);
      } else {
        console.log('✅ Fonction get_user_role fonctionne');
        console.log(`   Résultat: ${roleData}`);
      }
    } catch (roleError) {
      console.log(`❌ Erreur lors de l\'appel de get_user_role: ${roleError.message}`);
    }

    // Test 4: Vérifier la fonction has_role
    console.log('\n🔐 Test de la fonction has_role...');
    try {
      const { data: hasRoleData, error: hasRoleError } = await supabase.rpc('has_role', {
        _user_id: '00000000-0000-0000-0000-000000000000',
        _role: 'admin'
      });

      if (hasRoleError) {
        console.log(`❌ Fonction has_role: ${hasRoleError.message}`);
        console.log(`   Code: ${hasRoleError.code}`);
      } else {
        console.log('✅ Fonction has_role fonctionne');
        console.log(`   Résultat: ${hasRoleData}`);
      }
    } catch (hasRoleError) {
      console.log(`❌ Erreur lors de l\'appel de has_role: ${hasRoleError.message}`);
    }

    // Test 5: Vérifier la table user_roles
    console.log('\n👥 Test de la table user_roles...');
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(5);

    if (rolesError) {
      console.log(`❌ Table user_roles: ${rolesError.message}`);
      console.log(`   Code: ${rolesError.code}`);
    } else {
      console.log('✅ Table user_roles existe');
      console.log(`   Nombre de rôles: ${rolesData?.length || 0}`);
      if (rolesData && rolesData.length > 0) {
        console.log('   Exemples de rôles:');
        rolesData.forEach(role => {
          console.log(`     - ${role.user_id}: ${role.role}`);
        });
      }
    }

    // Test 6: Vérifier le type app_role
    console.log('\n🏷️ Test du type app_role...');
    try {
      const { data: enumData, error: enumError } = await supabase
        .from('user_roles')
        .select('role')
        .limit(1);

      if (enumError) {
        console.log(`❌ Type app_role: ${enumError.message}`);
      } else {
        console.log('✅ Type app_role fonctionne');
      }
    } catch (enumError) {
      console.log(`❌ Erreur lors du test du type app_role: ${enumError.message}`);
    }

  } catch (error) {
    console.log(`💥 Erreur générale: ${error.message}`);
  }

  console.log('\n🎯 Résumé des problèmes identifiés:');
  console.log('1. Vérifiez que la migration SQL a été appliquée');
  console.log('2. Vérifiez que les fonctions RPC existent');
  console.log('3. Vérifiez que les permissions RLS sont correctes');
  console.log('4. Vérifiez que l\'utilisateur a bien le rôle admin');
}

debugSuspension().catch(console.error);
