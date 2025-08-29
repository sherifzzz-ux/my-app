import { prisma } from '@/lib/prisma'
import { fallbackProducts } from '@/lib/fallback-data'
import { ProductCard } from '@/components/ui/product-card'
import { HeroProductCard } from '@/components/ui/hero-product-card'

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
          <HeroProductCard
            product={{
              id: heroItem.id,
              name: heroItem.name,
              imageUrl: heroItem.imageUrl,
              priceCents: heroItem.priceCents,
              oldPriceCents: heroItem.oldPriceCents,
              brand: heroItem.brand,
            }}
            className="mb-12"
          />
        ) : null}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {gridItems.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                priceCents: product.priceCents,
                oldPriceCents: product.oldPriceCents,
              }}
              showBrand={false}
              showRating={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
