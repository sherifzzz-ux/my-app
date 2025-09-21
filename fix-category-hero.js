const fs = require('fs');
const path = require('path');

// Liste des fichiers à corriger
const filesToFix = [
  'app/marques/page.tsx',
  'app/idees-cadeaux/page.tsx',
  'app/korean-skincare/page.tsx',
  'app/korean-beauty/page.tsx',
  'app/parapharmacie/page.tsx',
  'app/offres-speciales/page.tsx',
  'app/meilleures-ventes/page.tsx',
  'app/nouveautes/page.tsx',
  'app/parfumerie/page.tsx',
  'app/promotion/page.tsx',
  'app/soin-du-visage/[sub]/page.tsx',
  'app/soin-du-visage/page.tsx'
];

// Mapping des catégories avec leurs icônes et couleurs
const categoryConfig = {
  'marques': { icon: '🏷️', color: 'text-indigo-600' },
  'idees-cadeaux': { icon: '🎁', color: 'text-red-600' },
  'korean-skincare': { icon: '🇰🇷', color: 'text-pink-600' },
  'korean-beauty': { icon: '✨', color: 'text-purple-600' },
  'parapharmacie': { icon: '💊', color: 'text-green-600' },
  'offres-speciales': { icon: '🔥', color: 'text-orange-600' },
  'meilleures-ventes': { icon: '⭐', color: 'text-yellow-600' },
  'nouveautes': { icon: '🆕', color: 'text-cyan-600' },
  'parfumerie': { icon: '🌹', color: 'text-rose-600' },
  'promotion': { icon: '🎯', color: 'text-red-500' },
  'soin-du-visage': { icon: '✨', color: 'text-blue-600' }
};

function fixCategoryHero(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Fichier non trouvé: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Vérifier si le fichier utilise l'ancienne syntaxe
    if (!content.includes('title=') || content.includes('category={{')) {
      console.log(`Fichier déjà corrigé ou ne nécessite pas de correction: ${filePath}`);
      return;
    }

    // Extraire les informations du CategoryHero existant
    const titleMatch = content.match(/title="([^"]+)"/);
    const descriptionMatch = content.match(/description="([^"]+)"/);
    const imageMatch = content.match(/image="([^"]+)"/);
    const badgeMatch = content.match(/badge="([^"]+)"/);
    
    if (!titleMatch) {
      console.log(`Impossible de trouver le titre dans: ${filePath}`);
      return;
    }

    const title = titleMatch[1];
    const description = descriptionMatch ? descriptionMatch[1] : '';
    const image = imageMatch ? imageMatch[1] : '';
    const badge = badgeMatch ? badgeMatch[1] : '';
    
    // Extraire les stats
    const statsMatch = content.match(/stats=\{\{([^}]+)\}\}/s);
    let stats = '{}';
    if (statsMatch) {
      stats = `{${statsMatch[1]}}`;
    }
    
    // Extraire les features
    const featuresMatch = content.match(/features=\[([^\]]+)\]/s);
    let features = '[]';
    if (featuresMatch) {
      features = `[${featuresMatch[1]}]`;
    }

    // Déterminer l'ID de la catégorie
    const categoryId = filePath.split('/')[1].replace('.tsx', '');
    const config = categoryConfig[categoryId] || { icon: '📦', color: 'text-gray-600' };

    // Créer le nouveau CategoryHero
    const newCategoryHero = `      <CategoryHero
        category={{
          id: '${categoryId}',
          name: '${title}',
          description: '${description}',
          icon: '${config.icon}',
          color: '${config.color}',
          totalProducts: 0,
          featured: true,
          image: '${image}',
          badge: '${badge}',
          stats: ${stats},
          features: ${features},
          subcategories: []
        }}
      />`;

    // Remplacer l'ancien CategoryHero
    const oldCategoryHeroRegex = /      <CategoryHero[\s\S]*?\/>/;
    content = content.replace(oldCategoryHeroRegex, newCategoryHero);

    // Écrire le fichier modifié
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fichier corrigé: ${filePath}`);
    
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
  }
}

// Corriger tous les fichiers
console.log('🔧 Correction des fichiers CategoryHero...\n');

filesToFix.forEach(fixCategoryHero);

console.log('\n✅ Correction terminée !');
