#!/bin/bash

# =====================================================
# Script de Diagnostic Automatique - FlawlessBeauty
# =====================================================
# Ce script vérifie l'état de votre base de données
# et vous guide pour résoudre les problèmes
# =====================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Diagnostic Base de Données - FlawlessBeauty    ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo ""

# Vérifier si DATABASE_URL est défini
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ ERROR: DATABASE_URL n'est pas défini${NC}"
    echo -e "${YELLOW}💡 Ajoutez DATABASE_URL dans votre fichier .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ DATABASE_URL trouvé${NC}"
echo ""

# Vérifier si Prisma est installé
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ ERROR: npx n'est pas installé${NC}"
    echo -e "${YELLOW}💡 Installez Node.js et npm${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js et npm installés${NC}"
echo ""

# Étape 1: Vérifier le schéma Prisma
echo -e "${BLUE}📋 Étape 1: Validation du schéma Prisma${NC}"
if npx prisma validate; then
    echo -e "${GREEN}✅ Schéma Prisma valide${NC}"
else
    echo -e "${RED}❌ Schéma Prisma invalide${NC}"
    echo -e "${YELLOW}💡 Corrigez les erreurs dans prisma/schema.prisma${NC}"
    exit 1
fi
echo ""

# Étape 2: Vérifier les migrations
echo -e "${BLUE}📋 Étape 2: Vérification des migrations${NC}"
MIGRATION_STATUS=$(npx prisma migrate status 2>&1 || true)

if echo "$MIGRATION_STATUS" | grep -q "Database schema is up to date"; then
    echo -e "${GREEN}✅ Base de données à jour${NC}"
elif echo "$MIGRATION_STATUS" | grep -q "Your database schema is not in sync"; then
    echo -e "${YELLOW}⚠️  Base de données non synchronisée${NC}"
    echo -e "${YELLOW}💡 Des migrations doivent être appliquées${NC}"
    echo ""
    echo -e "${BLUE}Options disponibles:${NC}"
    echo -e "  1) ${GREEN}npx prisma db push${NC} - Push le schéma sans créer de migration"
    echo -e "  2) ${GREEN}npx prisma migrate deploy${NC} - Applique les migrations"
    echo -e "  3) ${GREEN}Exécuter 02-fix-order-table.sql${NC} - Correction manuelle SQL"
else
    echo -e "${RED}❌ Erreur lors de la vérification des migrations${NC}"
    echo "$MIGRATION_STATUS"
fi
echo ""

# Étape 3: Générer le client Prisma
echo -e "${BLUE}📋 Étape 3: Génération du client Prisma${NC}"
if npx prisma generate; then
    echo -e "${GREEN}✅ Client Prisma généré${NC}"
else
    echo -e "${RED}❌ Erreur lors de la génération du client${NC}"
    exit 1
fi
echo ""

# Étape 4: Tester la connexion à la base de données
echo -e "${BLUE}📋 Étape 4: Test de connexion à la base de données${NC}"

# Créer un script de test temporaire
cat > /tmp/test-db-connection.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Connexion réussie')
    
    // Tester si la table Order existe
    const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'Order' 
      AND column_name = 'orderNumber'
      LIMIT 1
    `
    
    if (result.length > 0) {
      console.log('✅ Colonne orderNumber existe')
    } else {
      console.log('❌ Colonne orderNumber MANQUANTE')
      console.log('💡 Exécutez scripts/sql/02-fix-order-table.sql dans Supabase')
    }
  } catch (error) {
    console.log('❌ Erreur de connexion:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
EOF

node /tmp/test-db-connection.js
rm /tmp/test-db-connection.js
echo ""

# Résumé et recommandations
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              Résumé et Recommandations            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📝 Si la colonne orderNumber est manquante:${NC}"
echo ""
echo -e "  ${GREEN}Méthode 1 - Correction SQL (Recommandé):${NC}"
echo -e "    1. Ouvrez Supabase SQL Editor"
echo -e "    2. Exécutez ${BLUE}scripts/sql/01-diagnostic-database.sql${NC}"
echo -e "    3. Exécutez ${BLUE}scripts/sql/02-fix-order-table.sql${NC}"
echo ""
echo -e "  ${GREEN}Méthode 2 - Push Prisma:${NC}"
echo -e "    1. ${BLUE}npx prisma db push${NC}"
echo -e "    2. Confirmez les changements"
echo ""
echo -e "  ${GREEN}Méthode 3 - Reset (⚠️  Perte de données):${NC}"
echo -e "    1. ${BLUE}npx prisma migrate reset${NC}"
echo -e "    2. ${BLUE}npx prisma db push${NC}"
echo ""
echo -e "${YELLOW}📚 Documentation:${NC}"
echo -e "  Consultez ${BLUE}scripts/sql/README.md${NC} pour plus de détails"
echo ""
echo -e "${GREEN}✨ Diagnostic terminé !${NC}"
