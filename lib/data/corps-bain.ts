// Données de test pour la catégorie Corps & Bain

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
  isNew?: boolean
  isOnSale?: boolean
  category: string
  subcategory: string
  skinType: string[]
  scent: string[]
  tags: string[]
  description: string
  volume?: string
}

export const corpsBainProducts: CorpsBainProduct[] = [
  {
    id: '1',
    name: 'Gel Douche Hydratant',
    price: 12.90,
    originalPrice: 15.90,
    image: '/products/gel-douche-hydratant.jpg',
    brand: 'Dove',
    rating: 4.4,
    reviews: 234,
    inStock: true,
    isOnSale: true,
    category: 'corps-bain',
    subcategory: 'gels-douche',
    skinType: ['sèche', 'normale'],
    scent: ['vanille', 'doux'],
    tags: ['hydratant', 'doux', 'sans-savon'],
    description: 'Gel douche hydratant pour une peau douce et nourrie.',
    volume: '400ml'
  },
  {
    id: '2',
    name: 'Crème Corps Nourrissante',
    price: 18.50,
    image: '/products/creme-corps.jpg',
    brand: 'Nivea',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    isNew: true,
    category: 'corps-bain',
    subcategory: 'cremes-corps',
    skinType: ['sèche', 'normale'],
    scent: ['classique', 'doux'],
    tags: ['nourrissant', 'intense', '24h'],
    description: 'Crème corps nourrissante pour une hydratation 24h.',
    volume: '400ml'
  },
  {
    id: '3',
    name: 'Gommage Corps Exfoliant',
    price: 22.90,
    image: '/products/gommage-corps.jpg',
    brand: 'The Body Shop',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'exfoliants',
    skinType: ['normale', 'mixte'],
    scent: ['citron', 'rafraîchissant'],
    tags: ['exfoliant', 'grain-fin', 'purifiant'],
    description: 'Gommage corps aux grains fins pour une peau lisse.',
    volume: '250ml'
  },
  {
    id: '4',
    name: 'Huile de Douche Relaxante',
    price: 28.90,
    image: '/products/huile-douche.jpg',
    brand: 'L\'Occitane',
    rating: 4.7,
    reviews: 123,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'huiles',
    skinType: ['sèche', 'normale'],
    scent: ['lavande', 'relaxant'],
    tags: ['huile', 'relaxant', 'luxe'],
    description: 'Huile de douche à la lavande pour un moment de détente.',
    volume: '250ml'
  },
  {
    id: '5',
    name: 'Savon de Marseille',
    price: 8.90,
    image: '/products/savon-marseille.jpg',
    brand: 'Marius Fabre',
    rating: 4.3,
    reviews: 298,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'savons',
    skinType: ['tous-types'],
    scent: ['naturel', 'pur'],
    tags: ['naturel', 'pur', 'traditionnel'],
    description: 'Savon de Marseille traditionnel 72% d\'huile d\'olive.',
    volume: '100g'
  },
  {
    id: '6',
    name: 'Lait Corps Légère',
    price: 16.90,
    image: '/products/lait-corps.jpg',
    brand: 'Avene',
    rating: 4.5,
    reviews: 167,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'cremes-corps',
    skinType: ['normale', 'mixte'],
    scent: ['frais', 'léger'],
    tags: ['léger', 'rapide', 'absorbant'],
    description: 'Lait corps léger qui s\'absorbe rapidement.',
    volume: '300ml'
  },
  {
    id: '7',
    name: 'Bain Moussant Relaxant',
    price: 14.90,
    image: '/products/bain-moussant.jpg',
    brand: 'Johnson\'s',
    rating: 4.2,
    reviews: 145,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'bains',
    skinType: ['tous-types'],
    scent: ['camomille', 'doux'],
    tags: ['moussant', 'relaxant', 'doux'],
    description: 'Bain moussant à la camomille pour se détendre.',
    volume: '500ml'
  },
  {
    id: '8',
    name: 'Déodorant Corps Frais',
    price: 11.90,
    image: '/products/deodorant-corps.jpg',
    brand: 'Rexona',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'deodorants',
    skinType: ['tous-types'],
    scent: ['frais', 'sport'],
    tags: ['anti-transpirant', '48h', 'sport'],
    description: 'Déodorant anti-transpirant 48h protection.',
    volume: '150ml'
  }
]

export const corpsBainSubcategories = [
  {
    id: 'gels-douche',
    name: 'Gels douche',
    description: 'Gels douche pour tous types de peau',
    icon: '🧴',
    productCount: 1
  },
  {
    id: 'cremes-corps',
    name: 'Crèmes corps',
    description: 'Crèmes et laits hydratants pour le corps',
    icon: '🧴',
    productCount: 2
  },
  {
    id: 'exfoliants',
    name: 'Exfoliants',
    description: 'Gommages et exfoliants pour une peau lisse',
    icon: '🌊',
    productCount: 1
  },
  {
    id: 'huiles',
    name: 'Huiles',
    description: 'Huiles de douche et de massage',
    icon: '🫒',
    productCount: 1
  },
  {
    id: 'savons',
    name: 'Savons',
    description: 'Savons naturels et traditionnels',
    icon: '🧼',
    productCount: 1
  },
  {
    id: 'bains',
    name: 'Bains',
    description: 'Sels de bain et bains moussants',
    icon: '🛁',
    productCount: 1
  },
  {
    id: 'deodorants',
    name: 'Déodorants',
    description: 'Déodorants et anti-transpirants',
    icon: '🌸',
    productCount: 1
  }
]

export const skinTypes = [
  { id: 'sèche', name: 'Sèche', description: 'Peau sèche qui tiraille' },
  { id: 'normale', name: 'Normale', description: 'Peau équilibrée' },
  { id: 'mixte', name: 'Mixte', description: 'Peau combinée' },
  { id: 'grasse', name: 'Grasse', description: 'Peau grasse' },
  { id: 'sensible', name: 'Sensible', description: 'Peau réactive' },
  { id: 'tous-types', name: 'Tous types', description: 'Convient à tous' }
]

export const scents = [
  { id: 'vanille', name: 'Vanille', description: 'Senteur douce et gourmande' },
  { id: 'lavande', name: 'Lavande', description: 'Senteur relaxante' },
  { id: 'citron', name: 'Citron', description: 'Senteur fraîche et tonifiante' },
  { id: 'fleur', name: 'Fleur', description: 'Senteur florale délicate' },
  { id: 'naturel', name: 'Naturel', description: 'Sans parfum ajouté' },
  { id: 'classique', name: 'Classique', description: 'Senteur traditionnelle' }
]
