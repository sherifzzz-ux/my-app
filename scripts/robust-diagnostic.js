const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnostic Robuste - Configuration Supabase\n');

// 1. Vérifier l'existence du fichier .env
console.log('1️⃣ Vérification du fichier .env...');
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ Fichier .env trouvé');
  
  // Lire le contenu du fichier .env
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  console.log(`   - ${envLines.length} variables d'environnement trouvées`);
  
  // Analyser les variables Supabase
  const supabaseVars = envLines.filter(line => 
    line.includes('SUPABASE') || 
    line.includes('DATABASE_URL') || 
    line.includes('DIRECT_URL')
  );
  
  console.log(`   - ${supabaseVars.length} variables Supabase trouvées`);
  
} else {
  console.log('❌ Fichier .env non trouvé');
}
console.log('');

// 2. Vérifier les variables d'environnement chargées
console.log('2️⃣ Variables d\'environnement chargées...');

// Variables critiques
const criticalVars = {
  'DATABASE_URL': process.env.DATABASE_URL,
  'DIRECT_URL': process.env.DIRECT_URL,
  'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY
};

Object.entries(criticalVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: Présent`);
    
    // Analyser l'URL si c'est une URL de base de données
    if (key.includes('URL') && value.includes('@')) {
      try {
        const urlParts = value.split('@')[1];
        if (urlParts) {
          const [host, port] = urlParts.split(':');
          console.log(`   - Host: ${host}`);
          console.log(`   - Port: ${port}`);
          
          if (port === '6543') {
            console.log('   - Type: Pooler Supabase');
          } else if (port === '5432') {
            console.log('   - Type: Direct PostgreSQL');
          } else {
            console.log('   - Type: Port personnalisé');
          }
        }
      } catch (e) {
        console.log('   - Erreur parsing URL');
      }
    }
  } else {
    console.log(`❌ ${key}: Manquant`);
  }
});

// Autres variables importantes
console.log('\n3️⃣ Autres variables importantes...');
const otherVars = {
  'AUTH_SECRET': process.env.AUTH_SECRET,
  'RESEND_API_KEY': process.env.RESEND_API_KEY,
  'NODE_ENV': process.env.NODE_ENV
};

Object.entries(otherVars).forEach(([key, value]) => {
  console.log(`${key}: ${value ? '✅ Présent' : '❌ Manquant'}`);
});

console.log('\n4️⃣ Analyse des URLs de connexion...');

if (process.env.DATABASE_URL && process.env.DIRECT_URL) {
  try {
    const dbUrl = process.env.DATABASE_URL;
    const directUrl = process.env.DIRECT_URL;
    
    const dbHost = dbUrl.split('@')[1]?.split(':')[0];
    const directHost = directUrl.split('@')[1]?.split(':')[0];
    
    if (dbHost === directHost) {
      console.log('⚠️ ATTENTION: DATABASE_URL et DIRECT_URL pointent vers le même host');
      console.log(`   - Host commun: ${dbHost}`);
      console.log('   - Cela peut causer des conflits de connexion');
    } else {
      console.log('✅ DATABASE_URL et DIRECT_URL pointent vers des hosts différents');
      console.log(`   - DATABASE_URL: ${dbHost}`);
      console.log(`   - DIRECT_URL: ${directHost}`);
    }
    
    // Vérifier les ports
    const dbPort = dbUrl.split(':').pop()?.split('/')[0];
    const directPort = directUrl.split(':').pop()?.split('/')[0];
    
    console.log(`   - DATABASE_URL port: ${dbPort}`);
    console.log(`   - DIRECT_URL port: ${directPort}`);
    
  } catch (e) {
    console.log('⚠️ Erreur lors de l\'analyse des URLs');
  }
} else {
  console.log('❌ Impossible d\'analyser: URLs manquantes');
}

console.log('\n5️⃣ Recommandations immédiates...');

if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) {
  console.log('🚨 Variables de connexion manquantes');
  console.log('   - Vérifiez votre fichier .env');
  console.log('   - Régénérez les URLs dans Supabase Dashboard');
} else if (process.env.DATABASE_URL.includes(':6543') && process.env.DIRECT_URL.includes(':6543')) {
  console.log('🚨 Les deux URLs utilisent le pooler (port 6543)');
  console.log('   - DIRECT_URL devrait utiliser le port 5432');
  console.log('   - Régénérez DIRECT_URL dans Supabase Dashboard');
} else if (process.env.DATABASE_URL.includes(':5432') && process.env.DIRECT_URL.includes(':5432')) {
  console.log('🚨 Les deux URLs utilisent la connexion directe (port 5432)');
  console.log('   - DATABASE_URL devrait utiliser le port 6543');
  console.log('   - Régénérez DATABASE_URL dans Supabase Dashboard');
} else {
  console.log('✅ Configuration des URLs correcte');
  console.log('   - Le problème peut venir de Supabase lui-même');
  console.log('   - Vérifiez le statut de votre projet');
}

console.log('\n6️⃣ Actions recommandées...');
console.log('1. Allez sur https://supabase.com/dashboard');
console.log('2. Sélectionnez votre projet');
console.log('3. Settings > Database');
console.log('4. Vérifiez que "Connection Pooling" est activé');
console.log('5. Régénérez les URLs de connexion');
console.log('6. Vérifiez que votre projet est actif (pas suspendu)');
console.log('7. Vérifiez les limites de votre plan');

console.log('\n🎯 Résumé du diagnostic...');
const hasAllVars = Object.values(criticalVars).every(v => v);
if (hasAllVars) {
  console.log('✅ Toutes les variables critiques sont présentes');
  console.log('🔍 Le problème semble venir de Supabase ou de la configuration des URLs');
} else {
  console.log('❌ Variables critiques manquantes');
  console.log('🔧 Corrigez d\'abord votre fichier .env');
}
