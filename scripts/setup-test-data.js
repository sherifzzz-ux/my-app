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

async function setupTestData() {
  try {
    console.log('🔧 Configuration des données de test...\n');

    // 1. Vérifier les utilisateurs existants
    console.log('1. Vérification des utilisateurs existants...');
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('*')
      .limit(5);

    if (usersError) {
      console.log('❌ Erreur lors de la récupération des utilisateurs:', usersError.message);
      return;
    }

    console.log(`✅ ${users?.length || 0} utilisateurs trouvés`);
    if (users && users.length > 0) {
      console.log('   Utilisateurs existants:', users.map(u => ({ id: u.id, email: u.email, name: u.name })));
    }

    // 2. Créer un utilisateur de test s'il n'existe pas
    const testUserId = 'test-user-123';
    let testUser = users?.find(u => u.id === testUserId);

    if (!testUser) {
      console.log('\n2. Création de l\'utilisateur de test...');
      const { data: newUser, error: createUserError } = await supabase
        .from('User')
        .insert({
          id: testUserId,
          email: 'test@example.com',
          name: 'Utilisateur Test',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .select()
        .single();

      if (createUserError) {
        console.log('❌ Erreur lors de la création de l\'utilisateur:', createUserError.message);
        return;
      }

      testUser = newUser;
      console.log('✅ Utilisateur de test créé:', testUser);
    } else {
      console.log('\n2. Utilisateur de test déjà existant:', testUser);
    }

    // 3. Créer des catégories de test
    console.log('\n3. Création des catégories de test...');
    const categories = [
      { id: 'cat-1', name: 'Soins du visage', slug: 'soins-visage' },
      { id: 'cat-2', name: 'Maquillage', slug: 'maquillage' },
      { id: 'cat-3', name: 'Soins des cheveux', slug: 'soins-cheveux' }
    ];

    for (const category of categories) {
      const { error: catError } = await supabase
        .from('Category')
        .upsert({
          ...category,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

      if (catError) {
        console.log(`❌ Erreur lors de la création de la catégorie ${category.name}:`, catError.message);
      } else {
        console.log(`✅ Catégorie ${category.name} créée/mise à jour`);
      }
    }

    // 4. Créer des marques de test
    console.log('\n4. Création des marques de test...');
    const brands = [
      { id: 'brand-1', name: 'L\'Oréal', slug: 'loreal' },
      { id: 'brand-2', name: 'Nivea', slug: 'nivea' },
      { id: 'brand-3', name: 'Garnier', slug: 'garnier' }
    ];

    for (const brand of brands) {
      const { error: brandError } = await supabase
        .from('Brand')
        .upsert({
          ...brand,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

      if (brandError) {
        console.log(`❌ Erreur lors de la création de la marque ${brand.name}:`, brandError.message);
      } else {
        console.log(`✅ Marque ${brand.name} créée/mise à jour`);
      }
    }

    // 5. Créer des produits de test
    console.log('\n5. Création des produits de test...');
    const products = [
      {
        id: 'prod-1',
        name: 'Crème hydratante visage',
        description: 'Crème hydratante pour tous types de peau',
        priceCents: 2500,
        imageUrl: 'https://via.placeholder.com/300x300?text=Crème+Visage',
        categoryId: 'cat-1',
        brandId: 'brand-1',
        stock: 100
      },
      {
        id: 'prod-2',
        name: 'Rouge à lèvres mat',
        description: 'Rouge à lèvres longue tenue',
        priceCents: 1800,
        imageUrl: 'https://via.placeholder.com/300x300?text=Rouge+Lèvres',
        categoryId: 'cat-2',
        brandId: 'brand-2',
        stock: 50
      }
    ];

    for (const product of products) {
      const { error: prodError } = await supabase
        .from('Product')
        .upsert({
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

      if (prodError) {
        console.log(`❌ Erreur lors de la création du produit ${product.name}:`, prodError.message);
      } else {
        console.log(`✅ Produit ${product.name} créé/mis à jour`);
      }
    }

    // 6. Créer des adresses de test
    console.log('\n6. Création des adresses de test...');
    const addresses = [
      {
        id: 'addr-1',
        name: 'Jean Dupont',
        phone: '0123456789',
        city: 'Paris',
        addressLine1: '123 Rue de la Paix',
        addressLine2: 'Appartement 4A',
        isDefault: true,
        userId: testUserId
      },
      {
        id: 'addr-2',
        name: 'Marie Martin',
        phone: '0987654321',
        city: 'Lyon',
        addressLine1: '456 Avenue des Champs',
        addressLine2: 'Bâtiment B',
        isDefault: false,
        userId: testUserId
      }
    ];

    for (const address of addresses) {
      const { error: addrError } = await supabase
        .from('Address')
        .upsert({
          ...address,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

      if (addrError) {
        console.log(`❌ Erreur lors de la création de l'adresse ${address.name}:`, addrError.message);
      } else {
        console.log(`✅ Adresse ${address.name} créée/mise à jour`);
      }
    }

    // 7. Créer des favoris de test
    console.log('\n7. Création des favoris de test...');
    const favorites = [
      { id: 'fav-1', userId: testUserId, productId: 'prod-1' },
      { id: 'fav-2', userId: testUserId, productId: 'prod-2' }
    ];

    for (const favorite of favorites) {
      const { error: favError } = await supabase
        .from('UserFavorite')
        .upsert({
          ...favorite,
          createdAt: new Date().toISOString()
        });

      if (favError) {
        console.log(`❌ Erreur lors de la création du favori:`, favError.message);
      } else {
        console.log(`✅ Favori créé pour le produit ${favorite.productId}`);
      }
    }

    // 8. Vérification finale
    console.log('\n8. Vérification finale...');
    const { data: finalData } = await supabase
      .from('Address')
      .select('*')
      .eq('userId', testUserId);

    console.log(`✅ Configuration terminée: ${finalData?.length || 0} adresses créées pour l'utilisateur de test`);

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

setupTestData();
