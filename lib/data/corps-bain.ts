// Données de test pour la catégorie Corps & Bain

export interface CorpsBainSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface CorpsBainProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isNew: boolean
  isOnSale: boolean
  category: string
  subcategory: string
  tags: string[]
  description: string
}

export const corpsBainProducts: CorpsBainProduct[] = [
  {
    id: 'cb1',
    name: 'Gel Douche Hydratant',
    price: 12.90,
    image: '/products/gel-douche-hydratant.jpg',
    brand: 'Dove',
    rating: 4.3,
    reviews: 156,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'corps-bain',
    subcategory: 'soins-corps',
    tags: ['hydratant', 'doux', 'parfumé'],
    description: 'Gel douche hydratant pour une peau douce et nourrie.'
  },
  {
    id: 'cb2',
    name: 'Savon de Marseille',
    price: 8.50,
    image: '/products/savon-marseille.jpg',
    brand: 'Marius Fabre',
    rating: 4.5,
    reviews: 89,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'corps-bain',
    subcategory: 'bain-douche',
    tags: ['naturel', 'traditionnel', 'purifiant'],
    description: 'Savon de Marseille traditionnel 72% d\'huile d\'olive.'
  },
  {
    id: 'cb3',
    name: 'Crème Corps Nourrissante',
    price: 18.90,
    image: '/products/creme-corps-nourrissante.jpg',
    brand: 'Nivea',
    rating: 4.4,
    reviews: 203,
    inStock: true,
    isNew: false,
    isOnSale: true,
    category: 'corps-bain',
    subcategory: 'soins-corps',
    tags: ['nourrissant', 'hydratant', 'parfumé'],
    description: 'Crème corps ultra-nourrissante pour une peau soyeuse.'
  },
  {
    id: 'cb4',
    name: 'Cire Épilation Chaude',
    price: 24.90,
    image: '/products/cire-epilation-chaude.jpg',
    brand: 'Veet',
    rating: 4.2,
    reviews: 127,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'corps-bain',
    subcategory: 'epilation',
    tags: ['épilation', 'chaude', 'efficace'],
    description: 'Cire épilation chaude pour une épilation efficace et durable.'
  },
  {
    id: 'cb5',
    name: 'Gel Intime Doux',
    price: 9.90,
    image: '/products/gel-intime-doux.jpg',
    brand: 'Saforelle',
    rating: 4.6,
    reviews: 94,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'corps-bain',
    subcategory: 'hygiene-intime',
    tags: ['intime', 'doux', 'pH neutre'],
    description: 'Gel intime doux au pH physiologique pour une hygiène respectueuse.'
  },
  {
    id: 'cb6',
    name: 'Crème Mains Réparatrice',
    price: 14.90,
    image: '/products/creme-mains-reparatrice.jpg',
    brand: 'Eucerin',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'corps-bain',
    subcategory: 'mains-pieds',
    tags: ['réparateur', 'hydratant', 'mains'],
    description: 'Crème mains réparatrice pour des mains douces et protégées.'
  }
]

export const corpsBainSubcategories: CorpsBainSubcategory[] = [
  {
    id: 'soins-corps',
    name: 'Soins Corps',
    slug: 'soins-corps',
    description: 'Crèmes et laits pour le corps',
    icon: '🧴',
    productCount: 2,
    featured: true
  },
  {
    id: 'bain-douche',
    name: 'Bain & Douche',
    slug: 'bain-douche',
    description: 'Gels douche et savons',
    icon: '🛁',
    productCount: 1,
    featured: true
  },
  {
    id: 'epilation',
    name: 'Épilation',
    slug: 'epilation',
    description: 'Produits d\'épilation',
    icon: '🪒',
    productCount: 1,
    featured: true
  },
  {
    id: 'hygiene-intime',
    name: 'Hygiène intime',
    slug: 'hygiene-intime',
    description: 'Soins intimes',
    icon: '🌸',
    productCount: 1,
    featured: false
  },
  {
    id: 'mains-pieds',
    name: 'Mains & Pieds',
    slug: 'mains-pieds',
    description: 'Soins des mains et pieds',
    icon: '✋',
    productCount: 1,
    featured: false
  }
]

export const skinTypes = [
  { id: 'normale', name: 'Normale', description: 'Peau équilibrée' },
  { id: 'seche', name: 'Sèche', description: 'Peau qui tiraille' },
  { id: 'grasse', name: 'Grasse', description: 'Peau brillante' },
  { id: 'mixte', name: 'Mixte', description: 'Peau combinée' },
  { id: 'sensible', name: 'Sensible', description: 'Peau réactive' }
]