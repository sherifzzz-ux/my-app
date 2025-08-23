import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatCFA } from '@/lib/utils'
import { getFeaturedFallback } from '@/lib/fallback-data'

export async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { updatedAt: 'desc' },
    take: 3,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
    },
  })
  const items = products.length > 0 ? products : getFeaturedFallback()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Découvrez notre sélection du moment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((p) => (
              <div key={p.id} className="bg-white rounded-lg overflow-hidden shadow-md hover-scale">
                <Link href={`/product/${p.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.imageUrl || '/placeholder.svg'}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{p.name}</h3>
                  <div className="mb-4 text-sm">
                    {p.oldPriceCents ? (
                      <>
                        <span className="text-gray-500 line-through mr-2">
                          {formatCFA(p.oldPriceCents)}
                        </span>
                        <span className="font-semibold">{formatCFA(p.priceCents)}</span>
                      </>
                    ) : (
                      <span className="font-semibold">{formatCFA(p.priceCents)}</span>
                    )}
                  </div>
                  <Button asChild className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    <Link href={`/product/${p.id}`}>Voir le produit</Link>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
