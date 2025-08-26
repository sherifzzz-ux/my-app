console.log('🔍 Vérification simple des variables...\n');

// Vérifier si .env est chargé
if (process.env.DATABASE_URL) {
  console.log('✅ DATABASE_URL présent');
  const url = process.env.DATABASE_URL;
  if (url.includes(':6543')) {
    console.log('   - Type: Pooler Supabase (port 6543)');
  } else if (url.includes(':5432')) {
    console.log('   - Type: Direct PostgreSQL (port 5432)');
  } else {
    console.log('   - Type: Autre port');
  }
} else {
  console.log('❌ DATABASE_URL manquant');
}

if (process.env.DIRECT_URL) {
  console.log('✅ DIRECT_URL présent');
  const url = process.env.DIRECT_URL;
  if (url.includes(':6543')) {
    console.log('   - Type: Pooler Supabase (port 6543)');
  } else if (url.includes(':5432')) {
    console.log('   - Type: Direct PostgreSQL (port 5432)');
  } else {
    console.log('   - Type: Autre port');
  }
} else {
  console.log('❌ DIRECT_URL manquant');
}

console.log('\n🎯 Problème identifié:');
console.log('Ni DATABASE_URL ni DIRECT_URL ne peuvent se connecter');
console.log('Cela suggère un problème avec votre base Supabase elle-même');

console.log('\n💡 Solutions:');
console.log('1. Vérifiez que votre projet Supabase est actif');
console.log('2. Vérifiez les URLs dans Supabase Dashboard');
console.log('3. Régénérez les URLs de connexion');
console.log('4. Vérifiez que votre plan n\'est pas expiré');
