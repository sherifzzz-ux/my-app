import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Rechercher les produits avec images manquantes
    const productsToFix = await prisma.product.findMany({
      where: {
        OR: [
          { imageUrl: { contains: 'shampoing.jpg' } },
          { imageUrl: { contains: 'fond-teint.jpg' } },
          { imageUrl: { contains: 'vitamines.jpg' } },
        ],
      },
    })

    const results = []

    for (const product of productsToFix) {
      let newImageUrl = product.imageUrl

      // Remplacer les images manquantes par des images existantes
      if (product.imageUrl?.includes('shampoing.jpg')) {
        newImageUrl = '/images/p31-1.jpg'
      } else if (product.imageUrl?.includes('fond-teint.jpg')) {
        newImageUrl = '/images/p21-1.jpg'
      } else if (product.imageUrl?.includes('vitamines.jpg')) {
        newImageUrl = '/images/p12-1.jpg'
      }

      if (newImageUrl !== product.imageUrl) {
        await prisma.product.update({
          where: { id: product.id },
          data: { imageUrl: newImageUrl },
        })
        results.push({
          id: product.id,
          name: product.name,
          oldUrl: product.imageUrl,
          newUrl: newImageUrl,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Corrigé ${results.length} images`,
      results,
    })
  } catch (error) {
    console.error('Erreur fix-images:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
