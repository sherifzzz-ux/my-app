const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addDisplaySettings() {
  try {
    console.log('🔄 Vérification de la structure de la base de données...');

    // Vérifier si les champs displaySettings existent
    const productSample = await prisma.product.findFirst();
    if (!productSample) {
      console.log('❌ Aucun produit trouvé dans la base de données');
      return;
    }

    console.log('📦 Structure actuelle des produits:', Object.keys(productSample));

    // Vérifier si le champ displaySettings existe
    if ('displaySettings' in productSample) {
      console.log('✅ Le champ displaySettings existe déjà');
      
      // Mettre à jour les produits existants avec des paramètres d'affichage par défaut
      const products = await prisma.product.findMany();
      console.log(`📦 Mise à jour de ${products.length} produits...`);

      for (const product of products) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            displaySettings: {
              showInMenu: product.isFeatured || false,
              showInSubcategory: true,
              displayOrder: 0,
              isHighlighted: product.isFeatured || false
            }
          }
        });
      }

      // Mettre à jour les catégories existantes avec des paramètres d'affichage par défaut
      const categories = await prisma.category.findMany();
      console.log(`📁 Mise à jour de ${categories.length} catégories...`);

      for (const category of categories) {
        await prisma.category.update({
          where: { id: category.id },
          data: {
            displaySettings: {
              showInMainMenu: true,
              displayOrder: 0,
              featuredProducts: []
            }
          }
        });
      }

      console.log('✅ Paramètres d\'affichage ajoutés avec succès !');
    } else {
      console.log('❌ Le champ displaySettings n\'existe pas encore');
      console.log('💡 Veuillez d\'abord exécuter: npx prisma db push');
      console.log('💡 Puis relancer ce script');
    }

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    
    if (error.message.includes('Can\'t reach database server')) {
      console.log('💡 Problème de connexion à la base de données');
      console.log('💡 Vérifiez votre configuration DATABASE_URL');
    }
  } finally {
    await prisma.$disconnect();
  }
}

addDisplaySettings();
