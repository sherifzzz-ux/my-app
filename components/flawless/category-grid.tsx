import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Section } from '@/components/ui/section'

export async function CategoryGrid() {
  // Données de fallback pour éviter l'erreur de base de données
  const categories = [
    {
      id: '1',
      name: 'Soins du Visage',
      slug: 'soin-du-visage',
      imageUrl: '/images/category-soins-visage.png'
    },
    {
      id: '2',
      name: 'Corps & Bain',
      slug: 'corps-bain',
      imageUrl: '/images/category-corps-bain.png'
    },
    {
      id: '3',
      name: 'Cheveux',
      slug: 'cheveux',
      imageUrl: '/images/category-cheveux.png'
    },
    {
      id: '4',
      name: 'Maquillage',
      slug: 'maquillage',
      imageUrl: '/images/category-maquillage.png'
    },
    {
      id: '5',
      name: 'Parfums',
      slug: 'parfums',
      imageUrl: '/images/category-parfums.png'
    },
    {
      id: '6',
      name: 'Parapharmacie',
      slug: 'parapharmacie',
      imageUrl: '/images/category-parapharmacie.png'
    }
  ]
  return (
    <Section background="default" className="bg-white">
      <div className="text-center mb-8">
        <Heading level={2} variant="primary" className="mb-2">Flawless Beauty</Heading>
        <Text variant="lead" className="text-primary">Parapharmacie en ligne & Cosmétiques</Text>
      </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} href={`/catalog?cat=${category.slug}`}>
                <div className="group relative overflow-hidden rounded-lg aspect-square hover-scale hover-glow cursor-pointer h-full">
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
                      <Heading level={5} className="text-white drop-shadow-lg">
                        {category.name}
                      </Heading>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </Section>
  )
}

export default CategoryGrid
