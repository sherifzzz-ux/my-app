import { prisma } from '@/lib/prisma'
import { getRecommendedFallback } from '@/lib/fallback-data'
import { ProductCard } from '@/components/ui/product-card'

export async function RecommendationsSection() {
  const products = await prisma.product.findMany({
    orderBy: { rating: 'desc' },
    take: 8,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
      rating: true,
      brand: { select: { name: true } },
    },
  })
  const visibleProducts = (products.length > 0 ? products : getRecommendedFallback()).slice(0, 4)

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommandations</h2>
          <p className="text-gray-600">Nos produits les mieux notés</p>
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
                oldPriceCents: product.oldPriceCents,
                brand: product.brand,
                rating: product.rating,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendationsSection
