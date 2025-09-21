// Données de test pour la catégorie Cheveux

export interface CheveuxSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface CheveuxProduct {
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

export const cheveuxProducts: CheveuxProduct[] = [
  {
    id: 'ch1',
    name: 'Vitamines Cheveux',
    price: 19.90,
    image: '/products/vitamines-cheveux.jpg',
    brand: 'Biotin',
    rating: 4.5,
    reviews: 167,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'cheveux',
    subcategory: 'complements-alimentaires',
    tags: ['vitamines', 'cheveux', 'biotine'],
    description: 'Complément alimentaire spécial cheveux avec biotine et zinc.'
  },
  {
    id: 'ch2',
    name: 'Collagène Marin',
    price: 24.90,
    image: '/products/collagene-marin.jpg',
    brand: 'Peptan',
    rating: 4.3,
    reviews: 134,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'cheveux',
    subcategory: 'complements-alimentaires',
    tags: ['collagène', 'cheveux', 'ongles'],
    description: 'Collagène marin pour renforcer cheveux et ongles.'
  },
  {
    id: 'ch3',
    name: 'Shampooing Nourrissant',
    price: 16.90,
    image: '/products/shampooing-nourrissant.jpg',
    brand: 'Kérastase',
    rating: 4.6,
    reviews: 289,
    inStock: true,
    isNew: false,
    isOnSale: true,
    category: 'cheveux',
    subcategory: 'routine-capillaire',
    tags: ['shampooing', 'nourrissant', 'cheveux'],
    description: 'Shampooing nourrissant pour tous types de cheveux.'
  },
  {
    id: 'ch4',
    name: 'Masque Capillaire',
    price: 22.90,
    image: '/products/masque-capillaire.jpg',
    brand: 'L\'Oréal Professionnel',
    rating: 4.4,
    reviews: 203,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'cheveux',
    subcategory: 'routine-capillaire',
    tags: ['masque', 'hydratant', 'cheveux'],
    description: 'Masque capillaire hydratant pour des cheveux soyeux.'
  },
  {
    id: 'ch5',
    name: 'Sérum Repousse',
    price: 28.90,
    image: '/products/serum-repousse.jpg',
    brand: 'The Ordinary',
    rating: 4.2,
    reviews: 156,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'cheveux',
    subcategory: 'soins-cheveux',
    tags: ['sérum', 'repousse', 'cheveux'],
    description: 'Sérum pour stimuler la repousse des cheveux.'
  },
  {
    id: 'ch6',
    name: 'Huile Capillaire',
    price: 18.90,
    image: '/products/huile-capillaire.jpg',
    brand: 'Moroccanoil',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'cheveux',
    subcategory: 'soins-cheveux',
    tags: ['huile', 'nourrissant', 'cheveux'],
    description: 'Huile capillaire nourrissante à l\'argan.'
  }
]

export const cheveuxSubcategories: CheveuxSubcategory[] = [
  {
    id: 'complements-alimentaires',
    name: 'Compléments alimentaires',
    slug: 'complements-alimentaires',
    description: 'Vitamines et compléments pour cheveux',
    icon: '💊',
    productCount: 2,
    featured: true
  },
  {
    id: 'routine-capillaire',
    name: 'Routine capillaire',
    slug: 'routine-capillaire',
    description: 'Shampooings et après-shampooings',
    icon: '🧴',
    productCount: 2,
    featured: true
  },
  {
    id: 'soins-cheveux',
    name: 'Soins cheveux',
    slug: 'soins-cheveux',
    description: 'Sérums et huiles capillaires',
    icon: '💆‍♀️',
    productCount: 2,
    featured: true
  }
]

export const hairTypes = [
  { id: 'normaux', name: 'Cheveux normaux', description: 'Cheveux équilibrés' },
  { id: 'secs', name: 'Cheveux secs', description: 'Cheveux qui manquent d\'hydratation' },
  { id: 'gras', name: 'Cheveux gras', description: 'Cheveux qui graissent vite' },
  { id: 'mixtes', name: 'Cheveux mixtes', description: 'Racines grasses, pointes sèches' },
  { id: 'abimes', name: 'Cheveux abîmés', description: 'Cheveux cassants et fourchus' }
]