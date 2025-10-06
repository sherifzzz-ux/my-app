const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabaseData() {
  try {
    console.log('🔍 Vérification des données de la base...\n');

    // Vérifier les catégories
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true
      }
    });

    console.log(`📁 Catégories trouvées: ${categories.length}`);
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.id}) - ${cat.subcategories.length} sous-catégories`);
      cat.subcategories.forEach(sub => {
        console.log(`    └─ ${sub.name} (${sub.id})`);
      });
    });

    // Vérifier les marques
    const brands = await prisma.brand.findMany();
    console.log(`\n🏷️  Marques trouvées: ${brands.length}`);
    brands.forEach(brand => {
      console.log(`  - ${brand.name} (${brand.id})`);
    });

    // Vérifier les produits
    const products = await prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        brand: true
      }
    });
    console.log(`\n📦 Produits trouvées: ${products.length}`);
    products.forEach(product => {
      console.log(`  - ${product.name}`);
      console.log(`    Catégorie: ${product.category.name}`);
      if (product.subcategory) console.log(`    Sous-catégorie: ${product.subcategory.name}`);
      if (product.brand) console.log(`    Marque: ${product.brand.name}`);
    });

    if (categories.length === 0) {
      console.log('\n⚠️  Aucune catégorie trouvée ! Création de données de test...');
      await createTestData();
    }

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function createTestData() {
  try {
    // Créer des catégories de test
    const categories = [
      { name: 'Soin du visage', slug: 'soin-du-visage' },
      { name: 'Corps & Bain', slug: 'corps-bain' },
      { name: 'Cheveux', slug: 'cheveux' },
      { name: 'Parfumerie', slug: 'parfumerie' },
      { name: 'Parapharmacie', slug: 'parapharmacie' }
    ];

    const createdCategories = [];
    for (const cat of categories) {
      const category = await prisma.category.create({ data: cat });
      createdCategories.push(category);
      console.log(`✅ Catégorie créée: ${category.name}`);
    }

    // Créer des sous-catégories
    const subcategories = [
      { name: 'Nettoyants', slug: 'nettoyants', categoryId: createdCategories[0].id },
      { name: 'Hydratants', slug: 'hydratants', categoryId: createdCategories[0].id },
      { name: 'Protection solaire', slug: 'protection-solaire', categoryId: createdCategories[0].id },
      { name: 'Soins corps', slug: 'soins-corps', categoryId: createdCategories[1].id },
      { name: 'Bain & Douche', slug: 'bain-douche', categoryId: createdCategories[1].id },
      { name: 'Shampoings', slug: 'shampoings', categoryId: createdCategories[2].id },
      { name: 'Après-shampoings', slug: 'apres-shampoings', categoryId: createdCategories[2].id },
      { name: 'Parfums femme', slug: 'parfums-femme', categoryId: createdCategories[3].id },
      { name: 'Parfums homme', slug: 'parfums-homme', categoryId: createdCategories[3].id },
      { name: 'Compléments', slug: 'complements', categoryId: createdCategories[4].id }
    ];

    for (const sub of subcategories) {
      const subcategory = await prisma.subcategory.create({ data: sub });
      console.log(`✅ Sous-catégorie créée: ${subcategory.name} (${subcategory.categoryId})`);
    }

    // Créer des marques
    const brands = [
      { name: 'La Roche-Posay', slug: 'la-roche-posay' },
      { name: 'Vichy', slug: 'vichy' },
      { name: 'L\'Oréal', slug: 'loreal' },
      { name: 'Nivea', slug: 'nivea' },
      { name: 'Garnier', slug: 'garnier' }
    ];

    for (const brand of brands) {
      const createdBrand = await prisma.brand.create({ data: brand });
      console.log(`✅ Marque créée: ${createdBrand.name}`);
    }

    console.log('\n🎉 Données de test créées avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
  }
}

checkDatabaseData();
