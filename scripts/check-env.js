require('dotenv').config();

console.log('🔍 Vérification des variables d\'environnement...\n');

// Variables Supabase
console.log('1️⃣ Variables Supabase:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Présent' : '❌ Manquant');
if (process.env.DATABASE_URL) {
  const dbUrl = process.env.DATABASE_URL;
  const isPooler = dbUrl.includes(':6543');
  const isDirect = dbUrl.includes(':5432');
  console.log('   - Type:', isPooler ? 'Pooler (6543)' : isDirect ? 'Direct (5432)' : 'Autre');
  console.log('   - Host:', dbUrl.split('@')[1]?.split(':')[0] || 'Non détecté');
}

console.log('DIRECT_URL:', process.env.DIRECT_URL ? '✅ Présent' : '❌ Manquant');
if (process.env.DIRECT_URL) {
  const directUrl = process.env.DIRECT_URL;
  const isPooler = directUrl.includes(':6543');
  const isDirect = directUrl.includes(':5432');
  console.log('   - Type:', isPooler ? 'Pooler (6543)' : isDirect ? 'Direct (5432)' : 'Autre');
  console.log('   - Host:', directUrl.split('@')[1]?.split(':')[0] || 'Non détecté');
}

console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Présent' : '❌ Manquant');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Présent' : '❌ Manquant');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Présent' : '❌ Manquant');

console.log('\n2️⃣ Autres variables:');
console.log('AUTH_SECRET:', process.env.AUTH_SECRET ? '✅ Présent' : '❌ Manquant');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Présent' : '❌ Manquant');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Non défini');

console.log('\n3️⃣ Analyse:');
if (process.env.DATABASE_URL && process.env.DIRECT_URL) {
  const dbHost = process.env.DATABASE_URL.split('@')[1]?.split(':')[0];
  const directHost = process.env.DIRECT_URL.split('@')[1]?.split(':')[0];
  
  if (dbHost === directHost) {
    console.log('⚠️ DATABASE_URL et DIRECT_URL pointent vers le même host');
    console.log('   Cela peut causer des conflits de connexion');
  } else {
    console.log('✅ DATABASE_URL et DIRECT_URL pointent vers des hosts différents');
  }
}

console.log('\n4️⃣ Recommandations:');
console.log('- Vérifiez que votre base Supabase est active');
console.log('- Vérifiez les URLs dans Supabase Dashboard > Settings > Database');
console.log('- Régénérez les URLs de connexion si nécessaire');
console.log('- Vérifiez que votre projet Supabase n\'est pas suspendu');
