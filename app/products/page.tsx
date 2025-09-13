import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
  title: 'Tous nos produits - Flawless Beauty',
  description: 'Découvrez notre sélection complète de produits cosmétiques et de parapharmacie. Qualité premium, livraison rapide à Dakar.',
}

export default async function ProductsPage() {
  // Récupérer tous les produits avec pagination simple
  const products = await prisma.product.findMany({
    take: 24, // Limiter à 24 produits pour la page d'accueil
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
      stock: true,
      category: { select: { name: true } },
    },
  })

  // Récupérer les statistiques
  const totalProducts = await prisma.product.count()
  const totalCategories = await prisma.category.count()
  const totalBrands = await prisma.brand.count()

  return (
    <div className="container-responsive">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Produits' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <Section spacing="lg" container={false} className="text-center">
        <Heading level={1} className="mb-6">
          Nos Produits
        </Heading>
        <Text variant="lead" className="max-w-3xl mx-auto">
          Découvrez notre sélection complète de produits cosmétiques et de parapharmacie. 
          Plus de {totalProducts} produits de qualité premium pour votre beauté et votre bien-être.
        </Text>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-pink-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-pink-600">{totalProducts}</div>
            <Text variant="caption">Produits disponibles</Text>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600">{totalCategories}</div>
            <Text variant="caption">Catégories</Text>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600">{totalBrands}</div>
            <Text variant="caption">Marques</Text>
          </div>
        </div>
      </Section>

      {/* Navigation rapide */}
      <Section spacing="sm" container={false}>
        <Heading level={2} className="mb-6">Navigation rapide</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/catalog" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors focus-ring-enhanced"
          >
            <Heading level={5}>Catalogue complet</Heading>
            <Text variant="caption">Avec filtres avancés</Text>
          </Link>
          <Link 
            href="/categories" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors focus-ring-enhanced"
          >
            <Heading level={5}>Par catégorie</Heading>
            <Text variant="caption">Soins, maquillage, etc.</Text>
          </Link>
          <Link 
            href="/brands" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors focus-ring-enhanced"
          >
            <Heading level={5}>Par marque</Heading>
            <Text variant="caption">Nos marques partenaires</Text>
          </Link>
          <Link 
            href="/promotions" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors focus-ring-enhanced"
          >
            <Heading level={5}>Promotions</Heading>
            <Text variant="caption">Offres spéciales</Text>
          </Link>
        </div>
      </Section>

      {/* Produits récents */}
      <Section spacing="sm" container={false}>
        <div className="flex items-center justify-between mb-6">
          <Heading level={2}>Produits récents</Heading>
          <Link 
            href="/catalog" 
            className="link-enhanced"
          >
            Voir tout →
          </Link>
        </div>
        
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                showWishlist={true}
                showRating={false}
                showDescription={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Text variant="lead" className="text-gray-500">Aucun produit disponible pour le moment.</Text>
          </div>
        )}
      </Section>

      {/* Call to action */}
      <Section background="primary" container={false} className="rounded-lg text-center">
        <Heading level={3} className="mb-4">Vous ne trouvez pas ce que vous cherchez ?</Heading>
        <Text variant="body" className="mb-6">
          Utilisez notre catalogue avancé avec filtres pour trouver exactement le produit qu&apos;il vous faut.
        </Text>
        <Button asChild size="lg">
          <Link href="/catalog">
            Explorer le catalogue complet
          </Link>
        </Button>
      </Section>
    </div>
  )
}
