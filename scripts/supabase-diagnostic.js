const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function supabaseDiagnostic() {
  console.log('🔍 Diagnostic Supabase - Mami Shop\n');

  // 1. Vérifier les variables d'environnement Supabase
  console.log('1️⃣ Variables d\'environnement Supabase:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Présent' : '❌ Manquant');
  console.log('DIRECT_URL:', process.env.DIRECT_URL ? '✅ Présent' : '❌ Manquant');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Présent' : '❌ Manquant');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Présent' : '❌ Manquant');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Présent' : '❌ Manquant');
  console.log('AUTH_SECRET:', process.env.AUTH_SECRET ? '✅ Présent' : '❌ Manquant');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Présent' : '❌ Manquant');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'Non défini');
  console.log('');

  // 2. Test de connexion directe à PostgreSQL
  try {
    console.log('2️⃣ Test de connexion directe à PostgreSQL...');
    await prisma.$connect();
    console.log('✅ Connexion directe réussie\n');

    // 3. Vérification des schémas Supabase
    console.log('3️⃣ Vérification des schémas Supabase...');
    const schemas = await prisma.$queryRaw`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name IN ('public', 'auth', 'storage', 'graphql_public')
      ORDER BY schema_name
    `;
    console.log('📋 Schémas Supabase trouvés:', schemas.map(s => s.schema_name));
    console.log('');

    // 4. Vérification des tables publiques
    console.log('4️⃣ Vérification des tables publiques...');
    const tables = await prisma.$queryRaw`
      SELECT table_name, table_type 
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

    // 5. Vérification des politiques RLS
    console.log('5️⃣ Vérification des politiques RLS...');
    try {
      const rlsPolicies = await prisma.$queryRaw`
        SELECT 
          schemaname,
          tablename,
          policyname,
          permissive,
          roles,
          cmd
        FROM pg_policies 
        WHERE schemaname = 'public'
        ORDER BY tablename, policyname
      `;
      console.log('🔒 Politiques RLS trouvées:', rlsPolicies.length);
      rlsPolicies.forEach(policy => {
        console.log(`  - ${policy.tablename}.${policy.policyname} (${policy.cmd})`);
      });
    } catch (e) {
      console.log('⚠️ Erreur lors de la vérification RLS:', e.message);
    }
    console.log('');

    // 6. Test des requêtes Prisma avec relations
    console.log('6️⃣ Test des requêtes Prisma...');
    
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

    // 7. Test des relations et includes
    if (productCount > 0) {
      console.log('7️⃣ Test des relations et includes...');
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
          console.log('  - Stock:', sampleProduct.stock);
          console.log('  - Prix:', sampleProduct.priceCents);
        }
      } catch (e) {
        console.log('❌ Erreur relations:', e.message);
      }
    }

    // 8. Vérification des permissions utilisateur
    console.log('8️⃣ Vérification des permissions...');
    try {
      const permissions = await prisma.$queryRaw`
        SELECT 
          'PERMISSIONS_UTILISATEUR' as test,
          has_table_privilege(current_user, '"User"', 'SELECT') as can_read_user,
          has_table_privilege(current_user, '"Product"', 'SELECT') as can_read_product,
          has_table_privilege(current_user, '"Category"', 'SELECT') as can_read_category,
          has_table_privilege(current_user, '"Brand"', 'SELECT') as can_read_brand
      `;
      console.log('🔑 Permissions utilisateur:', permissions[0]);
    } catch (e) {
      console.log('⚠️ Erreur lors de la vérification des permissions:', e.message);
    }
    console.log('');

    // 9. Vérification des connexions actives
    console.log('9️⃣ Vérification des connexions actives...');
    try {
      const activeConnections = await prisma.$queryRaw`
        SELECT 
          COUNT(*) as total_connections,
          COUNT(*) FILTER (WHERE state = 'active') as active_queries,
          COUNT(*) FILTER (WHERE state = 'idle') as idle_connections
        FROM pg_stat_activity 
        WHERE datname = current_database()
      `;
      console.log('🔌 Connexions actives:', activeConnections[0]);
    } catch (e) {
      console.log('⚠️ Erreur lors de la vérification des connexions:', e.message);
    }
    console.log('');

    // 10. Test de performance avec plusieurs requêtes
    console.log('🔟 Test de performance...');
    const startTime = Date.now();
    
    try {
      const [categories, products, brands] = await Promise.all([
        prisma.category.findMany({ take: 5 }),
        prisma.product.findMany({ take: 5 }),
        prisma.brand.findMany({ take: 5 })
      ]);
      
      const endTime = Date.now();
      console.log(`✅ Requêtes parallèles exécutées en ${endTime - startTime}ms`);
      console.log(`  - Categories: ${categories.length}`);
      console.log(`  - Produits: ${products.length}`);
      console.log(`  - Marques: ${brands.length}`);
    } catch (e) {
      console.log('❌ Erreur lors du test de performance:', e.message);
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

// Exécuter le diagnostic Supabase
supabaseDiagnostic().catch(console.error);
