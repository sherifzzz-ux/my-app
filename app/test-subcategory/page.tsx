import { SubcategoryPage } from '@/components/category'
import { getCategoryById, getSubcategoryById, getSubcategoryProducts, getSubcategoryGuides } from '@/lib/data/subcategories'

// Données de test pour valider les composants
const testCategory = {
  id: 'soin-du-visage',
  name: 'Soin du visage',
  description: 'Découvrez notre sélection de produits de soin du visage',
  icon: '🧴',
  color: 'bg-blue-500',
  subcategories: [],
  totalProducts: 150,
  featured: true
}

const testSubcategory = {
  id: 'nettoyants',
  name: 'Nettoyants',
  description: 'Nettoyants doux et efficaces pour tous types de peau',
  slug: 'nettoyants',
  icon: '🧼',
  productCount: 25,
  featured: true,
  filters: {
    brands: ['La Roche-Posay', 'Vichy', 'Avène', 'Eucerin'],
    priceRanges: [
      { min: 0, max: 20, label: 'Moins de 20€' },
      { min: 20, max: 40, label: '20€ - 40€' },
      { min: 40, max: 60, label: '40€ - 60€' }
    ],
    skinTypes: ['Peau normale', 'Peau sèche', 'Peau grasse', 'Peau mixte'],
    textures: ['Gel', 'Mousse', 'Huile', 'Lait'],
    ingredients: ['Acide hyaluronique', 'Niacinamide', 'Rétinol', 'Vitamine C']
  }
}

const testProducts = [
  {
    id: '1',
    name: 'Nettoyant Gel Moussant La Roche-Posay',
    description: 'Nettoyant doux pour peaux sensibles',
    price: 15.90,
    originalPrice: 19.90,
    image: '/images/products/nettoyant-lrp.jpg',
    brand: 'La Roche-Posay',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: false,
    isOnSale: true,
    tags: ['Peau sensible', 'Gel', 'Sans parfum'],
    category: 'Soin du visage',
    subcategory: 'Nettoyants'
  },
  {
    id: '2',
    name: 'Mousse Nettoyante Vichy',
    description: 'Mousse nettoyante pour peaux normales à mixtes',
    price: 22.50,
    image: '/images/products/mousse-vichy.jpg',
    brand: 'Vichy',
    rating: 4.2,
    reviews: 89,
    inStock: true,
    isNew: true,
    isOnSale: false,
    tags: ['Peau mixte', 'Mousse', 'Acide hyaluronique'],
    category: 'Soin du visage',
    subcategory: 'Nettoyants'
  },
  {
    id: '3',
    name: 'Huile Nettoyante Avène',
    description: 'Huile nettoyante pour démaquillage en douceur',
    price: 18.90,
    image: '/images/products/huile-avene.jpg',
    brand: 'Avène',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isNew: false,
    isOnSale: false,
    tags: ['Peau sèche', 'Huile', 'Démaquillage'],
    category: 'Soin du visage',
    subcategory: 'Nettoyants'
  }
]

const testGuides = [
  {
    id: '1',
    title: 'Comment choisir son nettoyant visage',
    description: 'Guide complet pour choisir le nettoyant adapté à votre type de peau',
    content: 'Contenu du guide...',
    image: '/images/guides/nettoyant-guide.jpg',
    readTime: 5,
    category: 'soin-du-visage',
    subcategory: 'nettoyants',
    featured: true
  },
  {
    id: '2',
    title: 'Routine de nettoyage du matin',
    description: 'Les étapes essentielles pour un nettoyage efficace',
    content: 'Contenu du guide...',
    image: '/images/guides/routine-matin.jpg',
    readTime: 3,
    category: 'soin-du-visage',
    subcategory: 'nettoyants',
    featured: false
  }
]

export default function TestSubcategoryPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Page de test :</strong> Cette page permet de valider tous les composants de sous-catégories en isolation.
            </p>
          </div>
        </div>
      </div>
      
      <SubcategoryPage
        category={testCategory}
        subcategory={testSubcategory}
        products={testProducts}
        guides={testGuides}
        loading={false}
      />
    </div>
  )
}
