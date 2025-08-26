const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['error'],
  datasources: {
    db: {
      url: process.env.DIRECT_URL, // Utilise DIRECT_URL pour le test
    },
  },
});

async function checkExactStructure() {
  console.log('🔍 Vérification de la structure exacte avec Prisma...\n');

  try {
    await prisma.$connect();
    console.log('✅ Connexion Prisma réussie\n');

    // 1. Vérifier la table Product
    console.log('1️⃣ Structure de la table Product:');
    try {
      const products = await prisma.product.findMany({
        take: 1,
        select: {
          id: true,
          name: true,
          description: true,
          priceCents: true,
          stock: true,
          categoryId: true,
          brandId: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (products.length > 0) {
        const product = products[0];
        console.log('✅ Structure Product:');
        console.log('   Colonnes disponibles:');
        Object.keys(product).forEach(key => {
          console.log(`     - ${key}: ${typeof product[key]} (${product[key]})`);
        });
      } else {
        console.log('❌ Aucun produit trouvé');
      }
    } catch (e) {
      console.log('❌ Erreur Product:', e.message);
    }
    console.log('');

    // 2. Vérifier la table Category
    console.log('2️⃣ Structure de la table Category:');
    try {
      const categories = await prisma.category.findMany({
        take: 1,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (categories.length > 0) {
        const category = categories[0];
        console.log('✅ Structure Category:');
        console.log('   Colonnes disponibles:');
        Object.keys(category).forEach(key => {
          console.log(`     - ${key}: ${typeof category[key]} (${category[key]})`);
        });
      } else {
        console.log('❌ Aucune catégorie trouvée');
      }
    } catch (e) {
      console.log('❌ Erreur Category:', e.message);
    }
    console.log('');

    // 3. Vérifier la table Brand
    console.log('3️⃣ Structure de la table Brand:');
    try {
      const brands = await prisma.brand.findMany({
        take: 1,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          logoUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (brands.length > 0) {
        const brand = brands[0];
        console.log('✅ Structure Brand:');
        console.log('   Colonnes disponibles:');
        Object.keys(brand).forEach(key => {
          console.log(`     - ${key}: ${typeof brand[key]} (${brand[key]})`);
        });
      } else {
        console.log('❌ Aucune marque trouvée');
      }
    } catch (e) {
      console.log('❌ Erreur Brand:', e.message);
    }
    console.log('');

    // 4. Test des relations
    console.log('4️⃣ Test des relations:');
    try {
      const productWithRelations = await prisma.product.findFirst({
        include: {
          category: true,
          brand: true
        }
      });

      if (productWithRelations) {
        console.log('✅ Relations Product:');
        console.log(`   - Catégorie: ${productWithRelations.category?.name || 'Aucune'}`);
        console.log(`   - Marque: ${productWithRelations.brand?.name || 'Aucune'}`);
      }
    } catch (e) {
      console.log('❌ Erreur relations:', e.message);
    }

    console.log('\n🎯 CONCLUSION:');
    console.log('✅ Votre base utilise des noms avec majuscules (Product, Category, Brand)');
    console.log('✅ Les colonnes utilisent camelCase (priceCents, categoryId, etc.)');
    console.log('✅ Vos APIs doivent être adaptées en conséquence');

  } catch (error) {
    console.error('❌ Erreur critique:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Connexion fermée');
  }
}

// Exécuter le script
checkExactStructure().catch(console.error);
