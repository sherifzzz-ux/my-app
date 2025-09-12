import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  Search, 
  Filter, 
  SortAsc, 
  Grid, 
  List,
  Star,
  Heart,
  ShoppingBag,
  TrendingUp,
  Clock,
  Tag
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Recherche avancée - Flawless Beauty',
  description: 'Trouvez facilement vos produits de beauté préférés avec notre moteur de recherche avancé. Filtres, tri et suggestions personnalisées.',
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' }, 
          { label: 'Recherche' }
        ]}
        className="mb-6"
      />

      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Search className="h-12 w-12 text-blue-500 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Recherche avancée
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trouvez facilement vos produits de beauté préférés avec notre moteur de recherche 
          intelligent et nos filtres avancés.
        </p>
      </div>

      {/* Barre de recherche principale */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit, une marque, une catégorie..."
              className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* Filtres et options */}
      <div className="mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtres et options
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Grid className="h-4 w-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="h-10 border border-gray-300 rounded-md px-3">
              <option value="">Toutes les catégories</option>
              <option value="soins-visage">Soins du visage</option>
              <option value="maquillage">Maquillage</option>
              <option value="cheveux">Cheveux</option>
              <option value="corps-bain">Corps & Bain</option>
              <option value="parfums">Parfums</option>
              <option value="parapharmacie">Parapharmacie</option>
            </select>

            <select className="h-10 border border-gray-300 rounded-md px-3">
              <option value="">Toutes les marques</option>
              <option value="cerave">CeraVe</option>
              <option value="avene">Avène</option>
              <option value="nivea">NIVEA</option>
              <option value="loreal">L&apos;Oréal</option>
              <option value="maybelline">Maybelline</option>
            </select>

            <select className="h-10 border border-gray-300 rounded-md px-3">
              <option value="">Tous les prix</option>
              <option value="0-5000">0 - 5,000 CFA</option>
              <option value="5000-15000">5,000 - 15,000 CFA</option>
              <option value="15000-30000">15,000 - 30,000 CFA</option>
              <option value="30000+">30,000+ CFA</option>
            </select>

            <select className="h-10 border border-gray-300 rounded-md px-3">
              <option value="recent">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
              <option value="rating">Meilleure note</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recherches populaires */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Recherches populaires
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Crème hydratante',
            'Sérum anti-âge',
            'Shampoing cheveux secs',
            'Rouge à lèvres',
            'Crème solaire',
            'Masque visage',
            'Parfum femme',
            'Déodorant'
          ].map((term) => (
            <button
              key={term}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Résultats de recherche */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Résultats de recherche
          </h2>
          <p className="text-sm text-gray-600">
            Aucun terme de recherche saisi
          </p>
        </div>

        {/* État vide */}
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-lg p-12">
            <Search className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Commencez votre recherche
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Utilisez la barre de recherche ci-dessus pour trouver vos produits préférés. 
              Vous pouvez aussi explorer nos catégories populaires.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Link 
                href="/catalog?cat=soins-visage" 
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium">Soins du visage</div>
              </Link>
              <Link 
                href="/catalog?cat=maquillage" 
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium">Maquillage</div>
              </Link>
              <Link 
                href="/catalog?cat=cheveux" 
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium">Cheveux</div>
              </Link>
              <Link 
                href="/catalog?cat=parfums" 
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium">Parfums</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Conseils de recherche */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Conseils pour une meilleure recherche
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Tag className="h-5 w-5 text-blue-500 mr-2" />
              Utilisez des mots-clés précis
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Nom de la marque : &quot;L&apos;Oréal&quot;</li>
              <li>• Type de produit : &quot;crème hydratante&quot;</li>
              <li>• Type de peau : &quot;peau sèche&quot;</li>
              <li>• Ingrédient : &quot;acide hyaluronique&quot;</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Filter className="h-5 w-5 text-green-500 mr-2" />
              Affinez avec les filtres
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Catégorie pour cibler votre recherche</li>
              <li>• Marque pour vos préférences</li>
              <li>• Prix pour votre budget</li>
              <li>• Tri pour organiser les résultats</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fonctionnalités avancées */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Fonctionnalités de recherche
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recherche par note</h3>
            <p className="text-gray-600 text-sm">
              Trouvez les produits les mieux notés par notre communauté.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Favoris populaires</h3>
            <p className="text-gray-600 text-sm">
              Découvrez les produits les plus ajoutés aux favoris.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recherche récente</h3>
            <p className="text-gray-600 text-sm">
              Retrouvez facilement vos recherches précédentes.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
        <Search className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Besoin d&apos;aide pour votre recherche ?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Notre équipe d&apos;experts en beauté est là pour vous conseiller et vous aider 
          à trouver les produits parfaits pour vos besoins.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Demander conseil
          </Link>
          <Link 
            href="/catalog" 
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Parcourir le catalogue
          </Link>
        </div>
      </div>
    </div>
  )
}
