const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function runDiagnostics() {
  console.log('🔍 Démarrage du diagnostic de la base de données...\n');

  try {
    // Test de connexion
    console.log('1️⃣ Test de connexion...');
    await prisma.$connect();
    console.log('✅ Connexion réussie à la base de données\n');

    // Vérification des tables
    console.log('2️⃣ Vérification des tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log('📋 Tables trouvées:', tables);
    console.log('');

    // Compter les enregistrements
    console.log('3️⃣ Comptage des enregistrements...');
    const counts = await prisma.$queryRaw`
      SELECT 'User' as table_name, COUNT(*) as count FROM "User"
      UNION ALL
      SELECT 'Product', COUNT(*) FROM "Product"
      UNION ALL
      SELECT 'Category', COUNT(*) FROM "Category"
      UNION ALL
      SELECT 'Brand', COUNT(*) FROM "Brand"
      UNION ALL
      SELECT 'Order', COUNT(*) FROM "Order"
      UNION ALL
      SELECT 'Cart', COUNT(*) FROM "Cart"
    `;
    console.log('📊 Nombre d\'enregistrements par table:', counts);
    console.log('');

    // Vérifier les relations
    console.log('4️⃣ Vérification des relations...');
    const productsWithRelations = await prisma.$queryRaw`
      SELECT 
        p.id,
        p.name as product_name,
        c.name as category_name,
        b.name as brand_name,
        p."categoryId",
        p."brandId"
      FROM "Product" p
      LEFT JOIN "Category" c ON p."categoryId" = c.id
      LEFT JOIN "Brand" b ON p."brandId" = b.id
      LIMIT 5
    `;
    console.log('🔗 Exemples de produits avec relations:', productsWithRelations);
    console.log('');

    // Vérifier les produits orphelins
    console.log('5️⃣ Vérification des produits orphelins...');
    const orphanedProducts = await prisma.$queryRaw`
      SELECT COUNT(*) as orphaned_count
      FROM "Product" p
      LEFT JOIN "Category" c ON p."categoryId" = c.id
      WHERE c.id IS NULL
    `;
    console.log('⚠️ Produits sans catégorie:', orphanedProducts);
    console.log('');

    // Vérifier la structure des colonnes
    console.log('6️⃣ Structure des colonnes principales...');
    const columns = await prisma.$queryRaw`
      SELECT 
        table_name,
        column_name,
        data_type,
        is_nullable
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name IN ('User', 'Product', 'Category', 'Brand')
      ORDER BY table_name, ordinal_position
    `;
    console.log('🏗️ Structure des colonnes:', columns);
    console.log('');

    // Test des requêtes Prisma
    console.log('7️⃣ Test des requêtes Prisma...');
    
    const categories = await prisma.category.findMany();
    console.log('✅ Categories via Prisma:', categories.length, 'trouvées');
    
    const products = await prisma.product.findMany({
      take: 3,
      include: {
        category: true,
        brand: true
      }
    });
    console.log('✅ Produits via Prisma:', products.length, 'trouvés');
    
    const brands = await prisma.brand.findMany();
    console.log('✅ Marques via Prisma:', brands.length, 'trouvées');

  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
    
    if (error.code === 'P1001') {
      console.error('🔌 Erreur de connexion - Vérifiez DATABASE_URL');
    } else if (error.code === 'P2002') {
      console.error('🔑 Erreur de contrainte unique');
    } else if (error.code === 'P2003') {
      console.error('🔗 Erreur de relation - Clé étrangère manquante');
    }
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Connexion fermée');
  }
}

// Exécuter le diagnostic
runDiagnostics().catch(console.error);
