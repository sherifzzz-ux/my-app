#!/bin/bash

# ========================================
# Installation FlawlessBeauty
# Mise à jour du panier et checkout
# ========================================

echo "🚀 Installation des modifications FlawlessBeauty..."
echo ""

# Étape 1 : Vérifier la configuration
echo "📋 Étape 1/4 : Vérification de la configuration..."
if [ -f .env ]; then
    echo "✅ Fichier .env trouvé"
    if grep -q "DATABASE_URL" .env; then
        echo "✅ DATABASE_URL configurée"
    else
        echo "❌ DATABASE_URL manquante dans .env"
        echo "Ajoutez DATABASE_URL=\"votre_url_postgresql\" dans le fichier .env"
        exit 1
    fi
else
    echo "❌ Fichier .env non trouvé"
    echo "Créez un fichier .env et ajoutez DATABASE_URL=\"votre_url_postgresql\""
    exit 1
fi
echo ""

# Étape 2 : Appliquer les migrations
echo "📦 Étape 2/4 : Application des migrations Prisma..."
npx prisma migrate dev --name add_detailed_order_fields
if [ $? -eq 0 ]; then
    echo "✅ Migrations appliquées avec succès"
else
    echo "❌ Erreur lors de l'application des migrations"
    exit 1
fi
echo ""

# Étape 3 : Peupler les zones de livraison
echo "🗺️ Étape 3/4 : Peuplement des zones de livraison (150+ zones)..."
npm run db:seed-zones
if [ $? -eq 0 ]; then
    echo "✅ Zones de livraison peuplées avec succès"
else
    echo "❌ Erreur lors du peuplement des zones"
    exit 1
fi
echo ""

# Étape 4 : Générer le client Prisma
echo "🔧 Étape 4/4 : Génération du client Prisma..."
npx prisma generate
if [ $? -eq 0 ]; then
    echo "✅ Client Prisma généré avec succès"
else
    echo "❌ Erreur lors de la génération du client Prisma"
    exit 1
fi
echo ""

# Résumé
echo "=========================================="
echo "🎉 Installation terminée avec succès !"
echo "=========================================="
echo ""
echo "📊 Résumé des modifications :"
echo "  ✅ Branding : Univers cosmetix → FlawlessBeauty"
echo "  ✅ Formulaire checkout : 8 nouveaux champs"
echo "  ✅ Zones de livraison : 150+ zones disponibles"
echo "  ✅ Interface admin : Gestion complète des commandes"
echo "  ✅ Gestionnaire de zones : /admin/delivery-zones"
echo ""
echo "🚀 Pour démarrer l'application :"
echo "  npm run dev"
echo ""
echo "📚 Pour tester :"
echo "  1. Checkout : Ajoutez des produits → /cart → Passer au paiement"
echo "  2. Admin commandes : /admin/orders"
echo "  3. Admin zones : /admin/delivery-zones"
echo ""
echo "📖 Documentation complète :"
echo "  - README_MISE_A_JOUR.md (guide principal)"
echo "  - RESUME_MODIFICATIONS.md (résumé visuel)"
echo "  - INSTRUCTIONS_INSTALLATION.md (guide détaillé)"
echo ""
echo "Bon commerce ! 🛍️"
echo "=========================================="
