const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['error'],
});

async function quickDiagnostic() {
  console.log('🚀 Diagnostic rapide de la base de données...\n');

  // 1. Vérifier les variables d'environnement
  console.log('1️⃣ Variables d\'environnement:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Présent' : '❌ Manquant');
  console.log('DIRECT_URL:', process.env.DIRECT_URL ? '✅ Présent' : '❌ Manquant');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'Non défini');
  console.log('');

  // 2. Test de connexion
  try {
    console.log('2️⃣ Test de connexion...');
    await prisma.$connect();
    console.log('✅ Connexion réussie\n');

    // 3. Vérification rapide des tables
    console.log('3️⃣ Vérification des tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    const expectedTables = ['User', 'Product', 'Category', 'Brand', 'Order', 'Cart'];
    const foundTables = tables.map(t => t.table_name);
    
    console.log('Tables trouvées:', foundTables);
    
    const missingTables = expectedTables.filter(t => !foundTables.includes(t));
    if (missingTables.length > 0) {
      console.log('❌ Tables manquantes:', missingTables);
    } else {
      console.log('✅ Toutes les tables principales sont présentes');
    }
    console.log('');

    // 4. Test des requêtes Prisma de base
    console.log('4️⃣ Test des requêtes Prisma...');
    
    try {
      const categoryCount = await prisma.category.count();
      console.log('✅ Categories:', categoryCount);
    } catch (e) {
      console.log('❌ Erreur categories:', e.message);
    }
    
    try {
      const productCount = await prisma.product.count();
      console.log('✅ Produits:', productCount);
    } catch (e) {
      console.log('❌ Erreur produits:', e.message);
    }
    
    try {
      const brandCount = await prisma.brand.count();
      console.log('✅ Marques:', brandCount);
    } catch (e) {
      console.log('❌ Erreur marques:', e.message);
    }
    
    try {
      const userCount = await prisma.user.count();
      console.log('✅ Utilisateurs:', userCount);
    } catch (e) {
      console.log('❌ Erreur utilisateurs:', e.message);
    }
    console.log('');

    // 5. Vérification des relations
    if (productCount > 0) {
      console.log('5️⃣ Test des relations...');
      try {
        const sampleProduct = await prisma.product.findFirst({
          include: {
            category: true,
            brand: true
          }
        });
        
        if (sampleProduct) {
          console.log('✅ Relations testées sur un produit:');
          console.log('  - Catégorie:', sampleProduct.category?.name || 'Aucune');
          console.log('  - Marque:', sampleProduct.brand?.name || 'Aucune');
        }
      } catch (e) {
        console.log('❌ Erreur relations:', e.message);
      }
    }

  } catch (error) {
    console.error('❌ Erreur critique:', error.message);
    
    if (error.code === 'P1001') {
      console.error('🔌 Erreur de connexion - Vérifiez DATABASE_URL');
      console.error('💡 Solutions possibles:');
      console.error('   - Vérifiez que la base est accessible');
      console.error('   - Vérifiez les credentials');
      console.error('   - Vérifiez le firewall/network');
    } else if (error.code === 'P2002') {
      console.error('🔑 Erreur de contrainte unique');
    } else if (error.code === 'P2003') {
      console.error('🔗 Erreur de relation - Clé étrangère manquante');
    } else if (error.code === 'P2024') {
      console.error('⏱️ Timeout de connexion - Base peut être suspendue (Neon)');
    }
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Connexion fermée');
  }
}

// Exécuter le diagnostic rapide
quickDiagnostic().catch(console.error);
