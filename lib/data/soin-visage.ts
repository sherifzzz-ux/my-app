// Données de test pour la catégorie Soin du visage

export interface SoinVisageSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface SoinVisageProduct {
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
  skinType: string[]
  tags: string[]
  description: string
}

export const soinVisageProducts: SoinVisageProduct[] = [
  {
    id: '1',
    name: 'Nettoyant Doux Hydratant',
    price: 24.90,
    originalPrice: 29.90,
    image: '/products/nettoyant-doux.jpg',
    brand: 'La Roche-Posay',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: false,
    isOnSale: true,
    category: 'soin-du-visage',
    subcategory: 'nettoyants',
    skinType: ['sensible', 'normale', 'mixte'],
    tags: ['hydratant', 'doux', 'sans-parfum'],
    description: 'Nettoyant doux pour tous types de peau, même sensibles.'
  },
  {
    id: '2',
    name: 'Crème Hydratante Anti-Âge',
    price: 45.90,
    image: '/products/creme-anti-age.jpg',
    brand: 'Vichy',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'hydratants',
    skinType: ['mature', 'normale'],
    tags: ['anti-âge', 'hydratant', 'vitamine-c'],
    description: 'Crème hydratante avec actifs anti-âge pour une peau plus ferme.'
  },
  {
    id: '3',
    name: 'Sérum Vitamine C',
    price: 32.50,
    image: '/products/serum-vitamine-c.jpg',
    brand: 'The Ordinary',
    rating: 4.3,
    reviews: 256,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'serums',
    skinType: ['normale', 'mixte', 'grasse'],
    tags: ['vitamine-c', 'éclaircissant', 'antioxydant'],
    description: 'Sérum à la vitamine C pour un teint éclatant et uniforme.'
  },
  {
    id: '4',
    name: 'Masque Purifiant Argile',
    price: 18.90,
    image: '/products/masque-argile.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.2,
    reviews: 167,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'masques',
    skinType: ['grasse', 'mixte'],
    tags: ['purifiant', 'argile', 'pores'],
    description: 'Masque purifiant à l\'argile pour nettoyer les pores en profondeur.'
  },
  {
    id: '5',
    name: 'Gommage Exfoliant Doux',
    price: 22.90,
    image: '/products/gommage-doux.jpg',
    brand: 'Nivea',
    rating: 4.4,
    reviews: 94,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'exfoliants',
    skinType: ['normale', 'mixte'],
    tags: ['exfoliant', 'doux', 'grain-fin'],
    description: 'Gommage doux aux micro-grains pour une peau lisse et radieuse.'
  },
  {
    id: '6',
    name: 'Crème de Jour SPF 30',
    price: 28.90,
    image: '/products/creme-spf.jpg',
    brand: 'Avène',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'hydratants',
    skinType: ['sensible', 'normale'],
    tags: ['spf', 'protection', 'hydratant'],
    description: 'Crème de jour hydratante avec protection solaire SPF 30.'
  },
  {
    id: '7',
    name: 'Sérum Acide Hyaluronique',
    price: 39.90,
    image: '/products/serum-hyaluronique.jpg',
    brand: 'The Ordinary',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'serums',
    skinType: ['normale', 'sèche', 'mature'],
    tags: ['acide-hyaluronique', 'hydratant', 'repulpant'],
    description: 'Sérum à l\'acide hyaluronique pour une hydratation intense.'
  },
  {
    id: '8',
    name: 'Nettoyant Moussant Purifiant',
    price: 19.90,
    image: '/products/nettoyant-moussant.jpg',
    brand: 'Garnier',
    rating: 4.1,
    reviews: 145,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'nettoyants',
    skinType: ['grasse', 'mixte'],
    tags: ['moussant', 'purifiant', 'dégraissant'],
    description: 'Nettoyant moussant purifiant pour les peaux grasses et mixtes.'
  }
]

export const soinVisageSubcategories: SoinVisageSubcategory[] = [
  {
    id: 'nettoyants',
    name: 'Nettoyants',
    slug: 'nettoyants',
    description: 'Nettoyants doux et purifiants pour tous types de peau',
    icon: '🧼',
    productCount: 2,
    featured: true
  },
  {
    id: 'hydratants',
    name: 'Hydratants',
    slug: 'hydratants',
    description: 'Crèmes et lotions hydratantes pour une peau nourrie',
    icon: '💧',
    productCount: 2,
    featured: true
  },
  {
    id: 'serums',
    name: 'Sérums',
    slug: 'serums',
    description: 'Sérums concentrés pour des soins ciblés',
    icon: '✨',
    productCount: 2,
    featured: true
  },
  {
    id: 'masques',
    name: 'Masques',
    slug: 'masques',
    description: 'Masques de soin pour des traitements intensifs',
    icon: '🎭',
    productCount: 1,
    featured: false
  },
  {
    id: 'exfoliants',
    name: 'Exfoliants',
    slug: 'exfoliants',
    description: 'Gommages et exfoliants pour une peau lisse',
    icon: '🌊',
    productCount: 1,
    featured: false
  },
  {
    id: 'anti-age',
    name: 'Anti-Âge',
    slug: 'anti-age',
    description: 'Soins anti-âge pour préserver la jeunesse de votre peau',
    icon: '⏰',
    productCount: 0,
    featured: false
  }
]

export const skinTypes = [
  { id: 'normale', name: 'Normale', description: 'Peau équilibrée' },
  { id: 'seche', name: 'Sèche', description: 'Peau qui tiraille' },
  { id: 'grasse', name: 'Grasse', description: 'Peau brillante' },
  { id: 'mixte', name: 'Mixte', description: 'Peau combinée' },
  { id: 'sensible', name: 'Sensible', description: 'Peau réactive' },
  { id: 'mature', name: 'Mature', description: 'Peau mature' }
]
