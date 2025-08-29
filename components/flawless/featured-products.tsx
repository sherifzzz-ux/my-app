import { prisma } from '@/lib/prisma'
import { getFeaturedFallback } from '@/lib/fallback-data'
import { ProductCard } from '@/components/ui/product-card'

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
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                imageUrl: p.imageUrl,
                priceCents: p.priceCents,
                oldPriceCents: p.oldPriceCents,
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

export default FeaturedProducts
