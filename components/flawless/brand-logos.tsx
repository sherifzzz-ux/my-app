import { prisma } from '@/lib/prisma'
import { fallbackBrands } from '@/lib/fallback-data'
import Link from 'next/link'
import Image from 'next/image'

export async function BrandLogos() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    take: 50, // Augmenté pour afficher plus de marques
    select: { id: true, name: true, slug: true, imageUrl: true },
  })
  // Force l'utilisation des données de fallback pour tester
  const items = fallbackBrands
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Top marques</h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {items.map((brand, index) => (
              <Link
                key={`first-${index}`}
                href={`/brand/${brand.slug}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={brand.imageUrl || '/placeholder.svg'}
                  alt={brand.name}
                  width={200}
                  height={80}
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </Link>
            ))}
            {items.map((brand, index) => (
              <Link
                key={`second-${index}`}
                href={`/brand/${brand.slug}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={brand.imageUrl || '/placeholder.svg'}
                  alt={brand.name}
                  width={200}
                  height={80}
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandLogos
