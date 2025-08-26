const path = require('path');
const fs = require('fs');

console.log('🧪 Test du chargement des variables d\'environnement...\n');

// 1. Vérifier le répertoire de travail
console.log('1️⃣ Répertoire de travail:');
console.log('   - CWD:', process.cwd());
console.log('   - __dirname:', __dirname);
console.log('');

// 2. Vérifier l'existence du fichier .env
console.log('2️⃣ Fichier .env:');
const envPath = path.join(process.cwd(), '.env');
const envPathAlt = path.join(__dirname, '.env');
const envPathParent = path.join(process.cwd(), '..', '.env');

console.log('   - Chemin principal:', envPath);
console.log('   - Existe:', fs.existsSync(envPath));
console.log('   - Chemin alternatif:', envPathAlt);
console.log('   - Existe:', fs.existsSync(envPathAlt));
console.log('   - Chemin parent:', envPathParent);
console.log('   - Existe:', fs.existsSync(envPathParent));
console.log('');

// 3. Lire le contenu du fichier .env
console.log('3️⃣ Contenu du fichier .env:');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    console.log(`   - ${envLines.length} lignes non-vides trouvées:`);
    envLines.forEach((line, index) => {
      const [key] = line.split('=');
      console.log(`     ${index + 1}. ${key}`);
    });
  } catch (e) {
    console.log('   - Erreur lecture:', e.message);
  }
} else {
  console.log('   - Fichier .env non trouvé');
}
console.log('');

// 4. Tester le chargement manuel
console.log('4️⃣ Test de chargement manuel:');
try {
  // Charger dotenv manuellement
  require('dotenv').config({ path: envPath });
  console.log('   - dotenv.config() exécuté');
  
  // Vérifier les variables
  const vars = [
    'DATABASE_URL',
    'DIRECT_URL', 
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  vars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`   ✅ ${varName}: Présent`);
      // Masquer la valeur pour la sécurité
      const masked = value.substring(0, 20) + '...';
      console.log(`      Valeur: ${masked}`);
    } else {
      console.log(`   ❌ ${varName}: Manquant`);
    }
  });
  
} catch (e) {
  console.log('   - Erreur chargement dotenv:', e.message);
}
console.log('');

// 5. Vérifier le module dotenv
console.log('5️⃣ Module dotenv:');
try {
  const dotenv = require('dotenv');
  console.log('   - Version:', dotenv.version || 'Non disponible');
  console.log('   - Module chargé avec succès');
} catch (e) {
  console.log('   - Erreur module dotenv:', e.message);
}

console.log('\n🎯 Conclusion:');
if (process.env.DATABASE_URL) {
  console.log('✅ Variables d\'environnement maintenant chargées');
  console.log('🔧 Le problème était le chargement de dotenv');
} else {
  console.log('❌ Variables toujours manquantes');
  console.log('🔧 Vérifiez la syntaxe de votre fichier .env');
}
