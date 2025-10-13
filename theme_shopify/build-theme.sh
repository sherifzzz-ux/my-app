#!/bin/bash

# FlawlessBeauty Theme Builder
# Ce script crée un fichier ZIP prêt pour Shopify

echo "🎨 FlawlessBeauty Theme Builder"
echo "================================"
echo ""

# Définir le nom du fichier de sortie
OUTPUT_FILE="../flawlessbeauty-theme.zip"
THEME_NAME="flawlessbeauty-theme"

# Supprimer l'ancien fichier s'il existe
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Suppression de l'ancien fichier..."
    rm "$OUTPUT_FILE"
fi

# Créer le fichier ZIP
echo "📦 Création du fichier ZIP..."
zip -r "$OUTPUT_FILE" . \
    -x "*.git*" \
    -x "*.DS_Store" \
    -x "node_modules/*" \
    -x "*.sh" \
    -x "*.md" \
    -x "build-theme.sh"

# Vérifier que le fichier a été créé
if [ -f "$OUTPUT_FILE" ]; then
    echo "✅ Thème créé avec succès !"
    echo ""
    echo "📁 Fichier: $OUTPUT_FILE"
    echo "📊 Taille: $(du -h "$OUTPUT_FILE" | cut -f1)"
    echo ""
    echo "📤 Prochaines étapes:"
    echo "   1. Connectez-vous à votre admin Shopify"
    echo "   2. Allez dans Boutique en ligne > Thèmes"
    echo "   3. Cliquez sur 'Ajouter un thème'"
    echo "   4. Sélectionnez 'Importer un fichier'"
    echo "   5. Uploadez $OUTPUT_FILE"
    echo ""
    echo "🎉 Bon e-commerce !"
else
    echo "❌ Erreur lors de la création du fichier ZIP"
    exit 1
fi
