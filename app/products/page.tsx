import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ProductCard } from '@/components/ui/ProductCard'

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
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Produits' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nos Produits
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez notre sélection complète de produits cosmétiques et de parapharmacie. 
          Plus de {totalProducts} produits de qualité premium pour votre beauté et votre bien-être.
        </p>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-pink-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-pink-600">{totalProducts}</div>
            <div className="text-sm text-gray-600">Produits disponibles</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600">{totalCategories}</div>
            <div className="text-sm text-gray-600">Catégories</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600">{totalBrands}</div>
            <div className="text-sm text-gray-600">Marques</div>
          </div>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Navigation rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/catalog" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-lg font-medium">Catalogue complet</div>
            <div className="text-sm text-gray-600">Avec filtres avancés</div>
          </Link>
          <Link 
            href="/categories" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-lg font-medium">Par catégorie</div>
            <div className="text-sm text-gray-600">Soins, maquillage, etc.</div>
          </Link>
          <Link 
            href="/brands" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-lg font-medium">Par marque</div>
            <div className="text-sm text-gray-600">Nos marques partenaires</div>
          </Link>
          <Link 
            href="/promotions" 
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-lg font-medium">Promotions</div>
            <div className="text-sm text-gray-600">Offres spéciales</div>
          </Link>
        </div>
      </div>

      {/* Produits récents */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Produits récents</h2>
          <Link 
            href="/catalog" 
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Voir tout →
          </Link>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="text-gray-500 text-lg">Aucun produit disponible pour le moment.</div>
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h3>
        <p className="text-gray-600 mb-6">
          Utilisez notre catalogue avancé avec filtres pour trouver exactement le produit qu&apos;il vous faut.
        </p>
        <Link 
          href="/catalog" 
          className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Explorer le catalogue complet
        </Link>
      </div>
    </div>
  )
}
