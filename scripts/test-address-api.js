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

async function testAddressAPI() {
  try {
    console.log('🔍 Test de l\'API des adresses...\n');

    // 1. Vérifier que la table Address existe et est accessible
    console.log('1. Test d\'accès à la table Address...');
    const { data: addresses, error: selectError } = await supabase
      .from('Address')
      .select('*')
      .limit(5);

    if (selectError) {
      console.log('❌ Erreur lors de la sélection:', selectError.message);
      return;
    }

    console.log(`✅ Table Address accessible: ${addresses?.length || 0} adresses trouvées`);
    
    if (addresses && addresses.length > 0) {
      console.log('   Exemple d\'adresse:', addresses[0]);
    }

    // 2. Tester l'insertion d'une adresse de test
    console.log('\n2. Test d\'insertion d\'une adresse...');
    const testAddress = {
      id: 'test-addr-' + Date.now(),
      name: 'Test User',
      phone: '0123456789',
      city: 'Test City',
      addressLine1: '123 Test Street',
      addressLine2: 'Apt 1',
      isDefault: false,
      userId: 'test-user-123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const { data: newAddress, error: insertError } = await supabase
      .from('Address')
      .insert(testAddress)
      .select()
      .single();

    if (insertError) {
      console.log('❌ Erreur lors de l\'insertion:', insertError.message);
    } else {
      console.log('✅ Adresse insérée avec succès:', newAddress);
    }

    // 3. Tester la mise à jour d'une adresse
    if (newAddress) {
      console.log('\n3. Test de mise à jour d\'une adresse...');
      const { data: updatedAddress, error: updateError } = await supabase
        .from('Address')
        .update({ 
          name: 'Test User Updated',
          updatedAt: new Date().toISOString()
        })
        .eq('id', newAddress.id)
        .select()
        .single();

      if (updateError) {
        console.log('❌ Erreur lors de la mise à jour:', updateError.message);
      } else {
        console.log('✅ Adresse mise à jour avec succès:', updatedAddress);
      }

      // 4. Tester la suppression de l'adresse de test
      console.log('\n4. Test de suppression de l\'adresse de test...');
      const { error: deleteError } = await supabase
        .from('Address')
        .delete()
        .eq('id', newAddress.id);

      if (deleteError) {
        console.log('❌ Erreur lors de la suppression:', deleteError.message);
      } else {
        console.log('✅ Adresse supprimée avec succès');
      }
    }

    // 5. Vérifier la structure finale
    console.log('\n5. Vérification finale...');
    const { data: finalAddresses, error: finalError } = await supabase
      .from('Address')
      .select('*')
      .limit(5);

    if (finalError) {
      console.log('❌ Erreur lors de la vérification finale:', finalError.message);
    } else {
      console.log(`✅ Vérification finale: ${finalAddresses?.length || 0} adresses dans la table`);
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

testAddressAPI();
