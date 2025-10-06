// Script de test pour vérifier les APIs
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('🧪 Test de l\'API /api/categories/corps-bain/subcategories...');
    
    const response = await fetch('http://localhost:3000/api/categories/corps-bain/subcategories');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers.raw());
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Données reçues:', JSON.stringify(data, null, 2));
    } else {
      const error = await response.text();
      console.log('❌ Erreur:', error);
    }
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
  }
}

testAPI();
