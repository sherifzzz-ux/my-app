// Données de test pour la catégorie Parfumerie

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
  isNew?: boolean
  isOnSale?: boolean
  category: string
  subcategory: string
  gender: string[]
  fragranceFamily: string[]
  tags: string[]
  description: string
  concentration?: string
  volume?: string
}

export const parfumerieProducts: ParfumerieProduct[] = [
  {
    id: '1',
    name: 'Eau de Parfum Femme',
    price: 89.90,
    originalPrice: 109.90,
    image: '/products/parfum-femme.jpg',
    brand: 'Chanel',
    rating: 4.8,
    reviews: 456,
    inStock: true,
    isOnSale: true,
    category: 'parfumerie',
    subcategory: 'femme',
    gender: ['femme'],
    fragranceFamily: ['floral', 'oriental'],
    tags: ['luxe', 'iconique', 'longue-tenue'],
    description: 'Eau de parfum féminine aux notes florales et orientales.',
    concentration: 'Eau de Parfum',
    volume: '50ml'
  },
  {
    id: '2',
    name: 'Eau de Toilette Homme',
    price: 65.90,
    image: '/products/parfum-homme.jpg',
    brand: 'Dior',
    rating: 4.7,
    reviews: 389,
    inStock: true,
    isNew: true,
    category: 'parfumerie',
    subcategory: 'homme',
    gender: ['homme'],
    fragranceFamily: ['boisé', 'épicé'],
    tags: ['masculin', 'sophistiqué', 'boisé'],
    description: 'Eau de toilette masculine aux notes boisées et épicées.',
    concentration: 'Eau de Toilette',
    volume: '100ml'
  },
  {
    id: '3',
    name: 'Parfum Unisexe',
    price: 75.90,
    image: '/products/parfum-unisexe.jpg',
    brand: 'Tom Ford',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'unisexe',
    gender: ['femme', 'homme'],
    fragranceFamily: ['boisé', 'oriental'],
    tags: ['unisexe', 'luxe', 'unique'],
    description: 'Parfum unisexe aux notes boisées et orientales.',
    concentration: 'Eau de Parfum',
    volume: '50ml'
  },
  {
    id: '4',
    name: 'Eau de Cologne Classique',
    price: 45.90,
    image: '/products/cologne-classique.jpg',
    brand: 'Acqua di Parma',
    rating: 4.6,
    reviews: 178,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'cologne',
    gender: ['homme'],
    fragranceFamily: ['citrus', 'frais'],
    tags: ['classique', 'italien', 'citrus'],
    description: 'Eau de cologne classique aux notes d\'agrumes.',
    concentration: 'Eau de Cologne',
    volume: '100ml'
  },
  {
    id: '5',
    name: 'Parfum Floral',
    price: 95.90,
    image: '/products/parfum-floral.jpg',
    brand: 'Lancôme',
    rating: 4.5,
    reviews: 267,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'femme',
    gender: ['femme'],
    fragranceFamily: ['floral', 'fruité'],
    tags: ['floral', 'romantique', 'délicat'],
    description: 'Parfum floral aux notes de rose et de fruits.',
    concentration: 'Eau de Parfum',
    volume: '75ml'
  },
  {
    id: '6',
    name: 'Eau de Toilette Sport',
    price: 55.90,
    image: '/products/parfum-sport.jpg',
    brand: 'Hugo Boss',
    rating: 4.4,
    reviews: 198,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'homme',
    gender: ['homme'],
    fragranceFamily: ['aquatique', 'frais'],
    tags: ['sport', 'dynamique', 'frais'],
    description: 'Eau de toilette sport aux notes aquatiques.',
    concentration: 'Eau de Toilette',
    volume: '100ml'
  },
  {
    id: '7',
    name: 'Parfum Oriental',
    price: 85.90,
    image: '/products/parfum-oriental.jpg',
    brand: 'Yves Saint Laurent',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'femme',
    gender: ['femme'],
    fragranceFamily: ['oriental', 'boisé'],
    tags: ['oriental', 'sensuel', 'mystérieux'],
    description: 'Parfum oriental aux notes sensuelles et mystérieuses.',
    concentration: 'Eau de Parfum',
    volume: '60ml'
  },
  {
    id: '8',
    name: 'Eau Fraîche',
    price: 35.90,
    image: '/products/eau-fraiche.jpg',
    brand: 'Kenzo',
    rating: 4.3,
    reviews: 145,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'unisexe',
    gender: ['femme', 'homme'],
    fragranceFamily: ['aquatique', 'frais'],
    tags: ['frais', 'léger', 'quotidien'],
    description: 'Eau fraîche légère pour un usage quotidien.',
    concentration: 'Eau Fraîche',
    volume: '100ml'
  }
]

export const parfumerieSubcategories = [
  {
    id: 'femme',
    name: 'Femme',
    description: 'Parfums et eaux de toilette pour femme',
    icon: '👩',
    productCount: 3
  },
  {
    id: 'homme',
    name: 'Homme',
    description: 'Parfums et eaux de toilette pour homme',
    icon: '👨',
    productCount: 3
  },
  {
    id: 'unisexe',
    name: 'Unisexe',
    description: 'Parfums unisexes pour tous',
    icon: '👥',
    productCount: 2
  },
  {
    id: 'cologne',
    name: 'Eau de Cologne',
    description: 'Eaux de cologne classiques et rafraîchissantes',
    icon: '🍋',
    productCount: 1
  },
  {
    id: 'miniatures',
    name: 'Miniatures',
    description: 'Parfums en format voyage et miniatures',
    icon: '✈️',
    productCount: 0
  },
  {
    id: 'coffrets',
    name: 'Coffrets',
    description: 'Coffrets de parfums et coffrets découverte',
    icon: '🎁',
    productCount: 0
  }
]

export const fragranceFamilies = [
  { id: 'floral', name: 'Floral', description: 'Notes de fleurs délicates' },
  { id: 'oriental', name: 'Oriental', description: 'Notes épicées et sensuelles' },
  { id: 'boisé', name: 'Boisé', description: 'Notes de bois chaudes' },
  { id: 'citrus', name: 'Citrus', description: 'Notes d\'agrumes fraîches' },
  { id: 'aquatique', name: 'Aquatique', description: 'Notes marines et fraîches' },
  { id: 'fruité', name: 'Fruité', description: 'Notes de fruits sucrées' },
  { id: 'épicé', name: 'Épicé', description: 'Notes d\'épices chaudes' },
  { id: 'frais', name: 'Frais', description: 'Notes fraîches et légères' }
]

export const concentrations = [
  { id: 'parfum', name: 'Parfum', description: 'Concentration la plus élevée (20-30%)' },
  { id: 'eau-de-parfum', name: 'Eau de Parfum', description: 'Concentration élevée (15-20%)' },
  { id: 'eau-de-toilette', name: 'Eau de Toilette', description: 'Concentration moyenne (8-15%)' },
  { id: 'eau-de-cologne', name: 'Eau de Cologne', description: 'Concentration légère (3-8%)' },
  { id: 'eau-fraiche', name: 'Eau Fraîche', description: 'Concentration très légère (1-3%)' }
]

export const genders = [
  { id: 'femme', name: 'Femme', description: 'Parfums féminins' },
  { id: 'homme', name: 'Homme', description: 'Parfums masculins' },
  { id: 'unisexe', name: 'Unisexe', description: 'Parfums pour tous' }
]
