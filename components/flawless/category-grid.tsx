import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export async function CategoryGrid() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    take: 6,
    select: { id: true, name: true, slug: true, imageUrl: true },
  })
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-pink-600 mb-2">Flawless Beauty</h2>
          <p className="text-pink-600 font-medium">Parapharmacie en ligne & Cosmétiques</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/catalog?cat=${category.slug}`}>
              <div className="group relative overflow-hidden rounded-lg aspect-square hover-scale cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 opacity-80`}
                />
                <Image
                  src={category.imageUrl || '/placeholder.svg'}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <div className="w-6 h-6 bg-white rounded-full" />
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold text-white drop-shadow-lg`}>
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
