#!/bin/bash

# ===================================================
# Script d'export du thème Shopify FlawlessBeauty
# ===================================================

echo "🎨 Export du thème Shopify FlawlessBeauty"
echo "=========================================="
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -d "theme_shopify" ]; then
    echo "❌ Erreur: Le dossier theme_shopify n'existe pas"
    echo "Assurez-vous d'exécuter ce script depuis /workspace"
    exit 1
fi

# Nom du fichier ZIP
OUTPUT_FILE="flawless-beauty-shopify-theme.zip"

# Supprimer l'ancien ZIP s'il existe
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Suppression de l'ancien fichier ZIP..."
    rm "$OUTPUT_FILE"
fi

# Créer le ZIP
echo "📦 Création du fichier ZIP..."
cd theme_shopify
zip -r "../$OUTPUT_FILE" . \
    -x "*.DS_Store" \
    -x "__MACOSX/*" \
    -x "*.git/*" \
    -x "node_modules/*" \
    -x ".env*"

cd ..

# Vérifier que le ZIP a été créé
if [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo ""
    echo "✅ Thème exporté avec succès !"
    echo ""
    echo "📄 Fichier créé: $OUTPUT_FILE"
    echo "📊 Taille: $FILE_SIZE"
    echo ""
    echo "📍 Emplacement: $(pwd)/$OUTPUT_FILE"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "   1. Téléchargez le fichier $OUTPUT_FILE"
    echo "   2. Connectez-vous à votre admin Shopify"
    echo "   3. Allez dans Boutique en ligne > Thèmes"
    echo "   4. Cliquez sur 'Ajouter un thème' > 'Importer un fichier ZIP'"
    echo "   5. Uploadez $OUTPUT_FILE"
    echo ""
    echo "📚 Documentation complète: THEME_SHOPIFY_READY.md"
    echo ""
else
    echo "❌ Erreur: Le fichier ZIP n'a pas pu être créé"
    exit 1
fi
