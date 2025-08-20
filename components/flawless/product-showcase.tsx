import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatCFA } from '@/lib/utils'

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

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {hero ? (
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src={hero.imageUrl || '/placeholder.svg'}
                  alt={hero.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                {hero.brand?.name ? (
                  <div className="bg-black text-white px-4 py-2 inline-block rounded mb-4">
                    {hero.brand.name}
                  </div>
                ) : null}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{hero.name}</h2>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  {hero.oldPriceCents ? (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {formatCFA(hero.oldPriceCents)}
                      </span>
                      <span className="text-2xl font-bold text-pink-600">
                        {formatCFA(hero.priceCents)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-pink-600">
                      {formatCFA(hero.priceCents)}
                    </span>
                  )}
                </div>
                <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                  <Link href={`/product/${hero.id}`}>Voir le produit</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {grid.map((product) => (
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
                <Button
                  asChild
                  className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white text-sm"
                >
                  <Link href={`/product/${product.id}`}>Voir le produit</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
