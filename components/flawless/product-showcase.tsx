import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatCFA } from '@/lib/utils'
import { fallbackProducts } from '@/lib/fallback-data'

export async function ProductShowcase() {
  const [hero] = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
      brand: { select: { name: true } },
    },
  })
  const grid = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    skip: 1,
    take: 8,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
    },
  })

  const heroItem = hero || fallbackProducts[0]
  const gridItems = grid.length > 0 ? grid : fallbackProducts.slice(1, 9)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {heroItem ? (
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src={heroItem.imageUrl || '/placeholder.svg'}
                  alt={heroItem.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                {heroItem.brand?.name ? (
                  <div className="bg-black text-white px-4 py-2 inline-block rounded mb-4">
                    {heroItem.brand.name}
                  </div>
                ) : null}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{heroItem.name}</h2>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  {heroItem.oldPriceCents ? (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {formatCFA(heroItem.oldPriceCents)}
                      </span>
                      <span className="text-2xl font-bold text-pink-600">
                        {formatCFA(heroItem.priceCents)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-pink-600">
                      {formatCFA(heroItem.priceCents)}
                    </span>
                  )}
                </div>
                <Link href={`/product/${heroItem.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                  Voir le produit
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {gridItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover-scale"
            >
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl || '/placeholder.svg'}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex flex-col space-y-1">
                  {product.oldPriceCents ? (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        {formatCFA(product.oldPriceCents)}
                      </span>
                      <span className="text-lg font-bold text-pink-600">
                        {formatCFA(product.priceCents)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-pink-600">
                      {formatCFA(product.priceCents)}
                    </span>
                  )}
                </div>
                <Link
                  href={`/product/${product.id}`}
                  className="w-full mt-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Voir le produit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
