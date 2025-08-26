const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['error'],
});

async function supabaseQuickDiagnostic() {
  console.log('🚀 Diagnostic Rapide Supabase - Mami Shop\n');

  // 1. Vérifier les variables d'environnement Supabase
  console.log('1️⃣ Variables d\'environnement Supabase:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Présent' : '❌ Manquant');
  console.log('DIRECT_URL:', process.env.DIRECT_URL ? '✅ Présent' : '❌ Manquant');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Présent' : '❌ Manquant');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Présent' : '❌ Manquant');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Présent' : '❌ Manquant');
  console.log('AUTH_SECRET:', process.env.AUTH_SECRET ? '✅ Présent' : '❌ Manquant');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Présent' : '❌ Manquant');
  console.log('');

  // 2. Test de connexion directe
  try {
    console.log('2️⃣ Test de connexion directe à PostgreSQL...');
    await prisma.$connect();
    console.log('✅ Connexion directe réussie\n');

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
    
    let productCount = 0;
    try {
      const categoryCount = await prisma.category.count();
      console.log('✅ Categories:', categoryCount);
    } catch (e) {
      console.log('❌ Erreur categories:', e.message);
    }
    
    try {
      productCount = await prisma.product.count();
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
    console.log('');

    // 5. Vérification des politiques RLS
    console.log('5️⃣ Vérification des politiques RLS...');
    try {
      const rlsCount = await prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM pg_policies 
        WHERE schemaname = 'public'
      `;
      console.log('🔒 Politiques RLS:', rlsCount[0].count);
      
      if (rlsCount[0].count > 0) {
        console.log('⚠️ Des politiques RLS sont actives - peuvent bloquer l\'accès');
      }
    } catch (e) {
      console.log('⚠️ Erreur lors de la vérification RLS:', e.message);
    }
    console.log('');

    // 6. Test des relations
    if (productCount > 0) {
      console.log('6️⃣ Test des relations...');
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
        if (e.message.includes('permission')) {
          console.log('🔒 Problème de permission - Vérifiez les politiques RLS');
        }
      }
    }

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

// Exécuter le diagnostic rapide Supabase
supabaseQuickDiagnostic().catch(console.error);
