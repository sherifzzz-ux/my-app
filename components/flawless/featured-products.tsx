import { prisma } from '@/lib/prisma'
import { getFeaturedFallback } from '@/lib/fallback-data'
import { ProductCard } from '@/components/ui/product-card'
import { Heading } from '@/components/ui/heading'
import { Section } from '@/components/ui/section'

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
    <Section background="muted">
      <div className="text-center mb-8">
        <Heading level={2} className="mb-2">
          Découvrez notre sélection du moment
        </Heading>
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
      </Section>
  )
}

export default FeaturedProducts
