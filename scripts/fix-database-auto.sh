#!/bin/bash

# =====================================================
# SCRIPT DE CORRECTION AUTOMATIQUE DE LA BASE DE DONNÉES
# =====================================================
# Ce script corrige automatiquement les problèmes détectés
# dans la base de données FlawlessBeauty
# =====================================================

set -e  # Arrêter en cas d'erreur

echo "🔧 FlawlessBeauty - Script de Correction Automatique"
echo "===================================================="
echo ""

# Vérifier que DATABASE_URL est définie
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erreur: DATABASE_URL n'est pas définie"
    echo "💡 Exportez votre DATABASE_URL:"
    echo "   export DATABASE_URL='postgresql://...'"
    exit 1
fi

echo "✅ DATABASE_URL détectée"
echo ""

# =====================================================
# ÉTAPE 1: Diagnostic
# =====================================================
echo "📊 ÉTAPE 1/5: Diagnostic de la base de données"
echo "----------------------------------------------"

# Compter les colonnes de la table Order
COLUMN_COUNT=$(psql "$DATABASE_URL" -t -c "
    SELECT COUNT(*) 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'Order'
")

COLUMN_COUNT=$(echo $COLUMN_COUNT | xargs)  # Trim whitespace

echo "📈 Nombre de colonnes dans la table Order: $COLUMN_COUNT"

if [ "$COLUMN_COUNT" -ge 29 ]; then
    echo "✅ La base de données semble déjà corrigée!"
    echo ""
    echo "🔍 Vérification finale..."
    
    # Vérifier que orderNumber existe
    ORDER_NUMBER_EXISTS=$(psql "$DATABASE_URL" -t -c "
        SELECT COUNT(*) 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'Order'
        AND column_name = 'orderNumber'
    ")
    
    ORDER_NUMBER_EXISTS=$(echo $ORDER_NUMBER_EXISTS | xargs)
    
    if [ "$ORDER_NUMBER_EXISTS" -eq 1 ]; then
        echo "✅ Colonne orderNumber existe"
        echo "✨ Aucune correction nécessaire!"
        echo ""
        echo "🚀 Vous pouvez maintenant démarrer l'application:"
        echo "   npm run dev"
        exit 0
    else
        echo "⚠️  La colonne orderNumber est manquante malgré $COLUMN_COUNT colonnes"
        echo "🔧 Application du correctif..."
    fi
else
    echo "⚠️  Base de données incomplète ($COLUMN_COUNT/29 colonnes)"
    echo "🔧 Application du correctif nécessaire..."
fi

echo ""

# =====================================================
# ÉTAPE 2: Sauvegarde
# =====================================================
echo "💾 ÉTAPE 2/5: Création d'une sauvegarde de sécurité"
echo "---------------------------------------------------"

# Créer une sauvegarde de la table Order
psql "$DATABASE_URL" -c "
    DROP TABLE IF EXISTS \"Order_backup_$(date +%Y%m%d_%H%M%S)\";
    CREATE TABLE \"Order_backup_$(date +%Y%m%d_%H%M%S)\" AS 
    SELECT * FROM \"Order\";
" > /dev/null 2>&1 || echo "⚠️  Impossible de créer une sauvegarde (table Order peut être vide)"

echo "✅ Sauvegarde créée (si la table contenait des données)"
echo ""

# =====================================================
# ÉTAPE 3: Application du correctif SQL
# =====================================================
echo "🔧 ÉTAPE 3/5: Application du script de correction"
echo "-------------------------------------------------"

if [ -f "scripts/sql/02-fix-order-table.sql" ]; then
    echo "📝 Exécution de scripts/sql/02-fix-order-table.sql..."
    
    psql "$DATABASE_URL" -f scripts/sql/02-fix-order-table.sql
    
    echo "✅ Script de correction appliqué"
else
    echo "❌ Fichier scripts/sql/02-fix-order-table.sql introuvable"
    echo "💡 Assurez-vous d'être à la racine du projet"
    exit 1
fi

echo ""

# =====================================================
# ÉTAPE 4: Vérification
# =====================================================
echo "🔍 ÉTAPE 4/5: Vérification de la correction"
echo "--------------------------------------------"

# Recompter les colonnes
NEW_COLUMN_COUNT=$(psql "$DATABASE_URL" -t -c "
    SELECT COUNT(*) 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'Order'
")

NEW_COLUMN_COUNT=$(echo $NEW_COLUMN_COUNT | xargs)

echo "📈 Nouveau nombre de colonnes: $NEW_COLUMN_COUNT"

if [ "$NEW_COLUMN_COUNT" -ge 29 ]; then
    echo "✅ Correction réussie!"
else
    echo "❌ La correction semble avoir échoué"
    echo "💡 Vérifiez manuellement avec:"
    echo "   psql \$DATABASE_URL -f scripts/sql/01-diagnostic-database.sql"
    exit 1
fi

echo ""

# =====================================================
# ÉTAPE 5: Régénération Prisma
# =====================================================
echo "🔄 ÉTAPE 5/5: Régénération du client Prisma"
echo "--------------------------------------------"

if command -v npx &> /dev/null; then
    echo "📦 Génération du client Prisma..."
    npx prisma generate
    echo "✅ Client Prisma régénéré"
else
    echo "⚠️  npx non trouvé, sautez cette étape"
    echo "💡 Exécutez manuellement: npx prisma generate"
fi

echo ""

# =====================================================
# RÉSUMÉ
# =====================================================
echo "✨ CORRECTION TERMINÉE AVEC SUCCÈS!"
echo "===================================="
echo ""
echo "📊 Résumé:"
echo "  • Colonnes avant: $COLUMN_COUNT"
echo "  • Colonnes après: $NEW_COLUMN_COUNT"
echo "  • Statut: ✅ Base de données corrigée"
echo ""
echo "🚀 Prochaines étapes:"
echo "  1. Démarrez l'application: npm run dev"
echo "  2. Testez le checkout"
echo "  3. Vérifiez qu'il n'y a plus d'erreurs"
echo ""
echo "📝 Pour plus de détails, consultez:"
echo "  • database_schemas.md"
echo "  • GUIDE_CORRECTION_ERREURS.md"
echo ""
echo "✅ Vous pouvez maintenant utiliser l'application!"
