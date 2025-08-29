import { prisma } from '@/lib/prisma'
import { getNewestFallback } from '@/lib/fallback-data'
import { ProductCard } from '@/components/ui/product-card'

export async function NouveautesSection() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      rating: true,
      brand: { select: { name: true } },
    },
  })
  const visibleProducts = (products.length > 0 ? products : getNewestFallback()).slice(0, 4)

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Nouveautés</h2>
          <p className="text-gray-600">Découvrez nos derniers produits innovants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                priceCents: product.priceCents,
                brand: product.brand,
                rating: product.rating,
              }}
              showNewBadge={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NouveautesSection
