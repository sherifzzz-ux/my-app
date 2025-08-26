const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Utilise DATABASE_URL (pooler)
    },
  },
});

async function testAdminDataPooler() {
  console.log('🧪 Test des données admin avec DATABASE_URL (pooler)...\n');

  try {
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion réussie avec DATABASE_URL (pooler)\n');

    // 1. Test des catégories (comme dans l'interface admin)
    console.log('1️⃣ Test des catégories...');
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { products: true }
          }
        },
        orderBy: { name: 'asc' }
      });
      
      console.log(`✅ ${categories.length} catégories récupérées`);
      categories.slice(0, 3).forEach(cat => {
        console.log(`   - ${cat.name} (${cat._count.products} produits)`);
      });
    } catch (e) {
      console.log('❌ Erreur catégories:', e.message);
    }
    console.log('');

    // 2. Test des produits (comme dans l'interface admin)
    console.log('2️⃣ Test des produits...');
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          priceCents: true,
          stock: true,
          rating: true,
          imageUrl: true,
          category: {
            select: { name: true }
          },
          brand: {
            select: { name: true }
          }
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      
      console.log(`✅ ${products.length} produits récupérés`);
      products.forEach(prod => {
        console.log(`   - ${prod.name} (${prod.category?.name || 'Aucune catégorie'}) - Stock: ${prod.stock}`);
      });
    } catch (e) {
      console.log('❌ Erreur produits:', e.message);
    }
    console.log('');

    // 3. Test des marques (comme dans l'interface admin)
    console.log('3️⃣ Test des marques...');
    try {
      const brands = await prisma.brand.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrl: true
        },
        take: 5,
        orderBy: { name: 'asc' }
      });
      
      console.log(`✅ ${brands.length} marques récupérées`);
      brands.forEach(brand => {
        console.log(`   - ${brand.name}`);
      });
    } catch (e) {
      console.log('❌ Erreur marques:', e.message);
    }
    console.log('');

    // 4. Test des commandes (comme dans l'interface admin)
    console.log('4️⃣ Test des commandes...');
    try {
      const orders = await prisma.order.findMany({
        select: {
          id: true,
          status: true,
          totalCents: true,
          createdAt: true,
          user: {
            select: { email: true }
          },
          _count: {
            select: { items: true }
          }
        },
        take: 3,
        orderBy: { createdAt: 'desc' }
      });
      
      console.log(`✅ ${orders.length} commandes récupérées`);
      orders.forEach(order => {
        console.log(`   - Commande ${order.id} (${order.status}) - ${order._count.items} articles`);
      });
    } catch (e) {
      console.log('❌ Erreur commandes:', e.message);
    }
    console.log('');

    // 5. Test de performance avec plusieurs requêtes simultanées
    console.log('5️⃣ Test de performance...');
    const startTime = Date.now();
    
    try {
      const [catCount, prodCount, brandCount, orderCount] = await Promise.all([
        prisma.category.count(),
        prisma.product.count(),
        prisma.brand.count(),
        prisma.order.count()
      ]);
      
      const endTime = Date.now();
      console.log(`✅ Requêtes parallèles exécutées en ${endTime - startTime}ms`);
      console.log(`   - Catégories: ${catCount}`);
      console.log(`   - Produits: ${prodCount}`);
      console.log(`   - Marques: ${brandCount}`);
      console.log(`   - Commandes: ${orderCount}`);
    } catch (e) {
      console.log('❌ Erreur test performance:', e.message);
    }

    console.log('\n🎯 CONCLUSION:');
    console.log('Si toutes les données sont récupérées avec succès,');
    console.log('votre interface admin devrait fonctionner correctement !');

  } catch (error) {
    console.error('❌ Erreur critique:', error.message);
    
    if (error.code === 'P1001') {
      console.error('🔌 Erreur de connexion - Vérifiez DATABASE_URL');
      console.error('💡 Solutions possibles:');
      console.error('   - Vérifiez que Supabase est accessible');
      console.error('   - Vérifiez les credentials PostgreSQL');
      console.error('   - Vérifiez le firewall/network');
      console.error('   - Vérifiez que la base n\'est pas suspendue');
    } else if (error.code === 'P2002') {
      console.error('🔑 Erreur de contrainte unique');
    } else if (error.code === 'P2003') {
      console.error('🔗 Erreur de relation - Clé étrangère manquante');
    } else if (error.code === 'P2024') {
      console.error('⏱️ Timeout de connexion - Base Supabase peut être suspendue');
    } else if (error.code === 'P2025') {
      console.error('🔒 Erreur de permission - Vérifiez les politiques RLS');
    }
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Connexion fermée');
  }
}

// Exécuter le test
testAdminDataPooler().catch(console.error);
