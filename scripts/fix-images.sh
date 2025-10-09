#!/bin/bash

# Script pour corriger les images manquantes dans la base de données
# Usage: ./scripts/fix-images.sh [URL_BASE]

# URL de base (production par défaut, ou localhost:3000 en dev)
BASE_URL="${1:-https://flawless-beauty-git-main-cherif4tine-7947s-projects.vercel.app}"

echo "🖼️  Correction des images manquantes..."
echo "URL: $BASE_URL"
echo ""

# Appeler l'API pour corriger les images
response=$(curl -s -X POST "$BASE_URL/api/admin/fix-images")

# Afficher le résultat
echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"

echo ""
echo "✅ Correction terminée!"
echo ""
echo "Les images suivantes ont été remplacées:"
echo "  - shampoing.jpg    → p31-1.jpg (Cheveux)"
echo "  - fond-teint.jpg   → p21-1.jpg (Maquillage)"
echo "  - vitamines.jpg    → p12-1.jpg (Parapharmacie)"
