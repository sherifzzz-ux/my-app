// Données de test pour la catégorie Parfumerie

export interface ParfumerieSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface ParfumerieProduct {
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

export const parfumerieProducts: ParfumerieProduct[] = [
  {
    id: 'pf1',
    name: 'Chanel N°5',
    price: 89.90,
    image: '/products/chanel-no5.jpg',
    brand: 'Chanel',
    rating: 4.8,
    reviews: 456,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'parfums-femme',
    tags: ['classique', 'floral', 'élégant'],
    description: 'Le parfum iconique de Chanel, un bouquet floral sophistiqué.'
  },
  {
    id: 'pf2',
    name: 'Dior Sauvage',
    price: 95.90,
    image: '/products/dior-sauvage.jpg',
    brand: 'Dior',
    rating: 4.6,
    reviews: 389,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'parfums-homme',
    tags: ['boisé', 'épicé', 'moderne'],
    description: 'Un parfum masculin audacieux et moderne.'
  },
  {
    id: 'pf3',
    name: 'Eau de Toilette Unisexe',
    price: 45.90,
    image: '/products/eau-toilette-unisexe.jpg',
    brand: 'CK One',
    rating: 4.3,
    reviews: 234,
    inStock: true,
    isNew: false,
    isOnSale: true,
    category: 'parfumerie',
    subcategory: 'eaux-de-toilette',
    tags: ['unisexe', 'citronné', 'frais'],
    description: 'Eau de toilette unisexe aux notes citronnées et fraîches.'
  },
  {
    id: 'pf4',
    name: 'Coffret Découverte',
    price: 29.90,
    image: '/products/coffret-decouverte.jpg',
    brand: 'Dior',
    rating: 4.5,
    reviews: 167,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'coffrets-parfums',
    tags: ['coffret', 'découverte', 'miniatures'],
    description: 'Coffret découverte avec 5 miniatures de parfums Dior.'
  },
  {
    id: 'pf5',
    name: 'Yves Saint Laurent Libre',
    price: 78.90,
    image: '/products/ysl-libre.jpg',
    brand: 'Yves Saint Laurent',
    rating: 4.7,
    reviews: 298,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'parfums-femme',
    tags: ['floral', 'vanillé', 'sensuel'],
    description: 'Un parfum floral vanillé pour la femme moderne et libre.'
  },
  {
    id: 'pf6',
    name: 'Hugo Boss Bottled',
    price: 65.90,
    image: '/products/hugo-boss-bottled.jpg',
    brand: 'Hugo Boss',
    rating: 4.4,
    reviews: 189,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'parfums-homme',
    tags: ['boisé', 'épicé', 'professionnel'],
    description: 'Parfum masculin boisé et épicé pour l\'homme d\'affaires.'
  },
  {
    id: 'pf7',
    name: 'Eau de Cologne Classique',
    price: 35.90,
    image: '/products/eau-cologne-classique.jpg',
    brand: '4711',
    rating: 4.2,
    reviews: 145,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'eaux-de-toilette',
    tags: ['classique', 'citronné', 'rafraîchissant'],
    description: 'Eau de cologne classique aux notes citronnées rafraîchissantes.'
  },
  {
    id: 'pf8',
    name: 'Coffret Voyage',
    price: 39.90,
    image: '/products/coffret-voyage.jpg',
    brand: 'Chanel',
    rating: 4.6,
    reviews: 123,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'parfumerie',
    subcategory: 'coffrets-parfums',
    tags: ['voyage', 'miniatures', 'luxe'],
    description: 'Coffret voyage avec 3 miniatures de parfums Chanel.'
  }
]

export const parfumerieSubcategories: ParfumerieSubcategory[] = [
  {
    id: 'parfums-femme',
    name: 'Parfums femme',
    slug: 'parfums-femme',
    description: 'Parfums et eaux de parfum pour femme',
    icon: '👩',
    productCount: 2,
    featured: true
  },
  {
    id: 'parfums-homme',
    name: 'Parfums homme',
    slug: 'parfums-homme',
    description: 'Parfums et eaux de toilette pour homme',
    icon: '👨',
    productCount: 2,
    featured: true
  },
  {
    id: 'eaux-de-toilette',
    name: 'Eaux de toilette',
    slug: 'eaux-de-toilette',
    description: 'Eaux de toilette unisexes',
    icon: '💧',
    productCount: 2,
    featured: true
  },
  {
    id: 'coffrets-parfums',
    name: 'Coffrets parfums',
    slug: 'coffrets-parfums',
    description: 'Coffrets et coffrets découverte',
    icon: '🎁',
    productCount: 2,
    featured: false
  }
]

export const fragranceFamilies = [
  { id: 'floral', name: 'Floral', description: 'Notes de fleurs' },
  { id: 'boise', name: 'Boisé', description: 'Notes de bois' },
  { id: 'citronne', name: 'Citronné', description: 'Notes d\'agrumes' },
  { id: 'epice', name: 'Épicé', description: 'Notes d\'épices' },
  { id: 'vanille', name: 'Vanillé', description: 'Notes de vanille' },
  { id: 'musc', name: 'Musqué', description: 'Notes de musc' }
]