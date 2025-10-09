#!/usr/bin/env node

/**
 * Script pour corriger les URLs d'images manquantes dans la base de données
 * Usage: node scripts/fix-images.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const IMAGE_MAPPING = {
  shampoing: '/images/p31-1.jpg', // Cheveux
  'fond-teint': '/images/p21-1.jpg', // Maquillage
  correcteur: '/images/p21-1.jpg', // Maquillage
  vitamine: '/images/p11-1.jpg', // Parapharmacie
  'gel-douche': '/images/p12-1.jpg', // Corps & Bain
  savon: '/images/p12-1.jpg', // Corps & Bain
  'creme-': '/images/p12-1.jpg', // Corps & Bain
  'parfum-': '/images/p32-1.jpg', // Parfumerie
}

async function fixMissingImages() {
  try {
    console.log('🔍 Recherche des produits avec images manquantes...\n')

    // Récupérer tous les produits
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    })

    let updatedCount = 0
    const updates = []

    for (const product of products) {
      if (!product.imageUrl) continue

      // Vérifier si l'image correspond à un pattern manquant
      for (const [pattern, replacementUrl] of Object.entries(IMAGE_MAPPING)) {
        if (product.imageUrl.includes(pattern)) {
          updates.push({
            id: product.id,
            name: product.name,
            oldUrl: product.imageUrl,
            newUrl: replacementUrl,
          })
          break
        }
      }
    }

    if (updates.length === 0) {
      console.log('✅ Aucune image manquante détectée !')
      return
    }

    console.log(`📦 Trouvé ${updates.length} produit(s) avec images manquantes:\n`)
    updates.forEach((u, i) => {
      console.log(`${i + 1}. ${u.name}`)
      console.log(`   ${u.oldUrl} → ${u.newUrl}\n`)
    })

    console.log('🔄 Mise à jour en cours...\n')

    // Mettre à jour les produits
    for (const update of updates) {
      await prisma.product.update({
        where: { id: update.id },
        data: { imageUrl: update.newUrl },
      })
      updatedCount++
    }

    console.log(`✅ ${updatedCount} produit(s) mis à jour avec succès !`)
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le script
fixMissingImages()
