// Données de test pour la catégorie Maquillage

export interface MaquillageProduct {
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
  skinTone: string[]
  finish: string[]
  tags: string[]
  description: string
  shade?: string
}

export const maquillageProducts: MaquillageProduct[] = [
  {
    id: '1',
    name: 'Fond de Teint Liquide',
    price: 29.90,
    originalPrice: 34.90,
    image: '/products/fond-teint-liquide.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    isOnSale: true,
    category: 'maquillage',
    subcategory: 'teint',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['mat', 'satiné'],
    tags: ['couverture', 'longue-tenue', 'spf'],
    description: 'Fond de teint liquide à couverture moyenne avec protection SPF.',
    shade: 'Beige Naturel'
  },
  {
    id: '2',
    name: 'Rouge à Lèvres Rouge Classique',
    price: 18.50,
    image: '/products/rouge-levres-rouge.jpg',
    brand: 'Maybelline',
    rating: 4.4,
    reviews: 189,
    inStock: true,
    isNew: true,
    category: 'maquillage',
    subcategory: 'levres',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['mat'],
    tags: ['longue-tenue', 'intense', 'classique'],
    description: 'Rouge à lèvres rouge classique à la tenue exceptionnelle.',
    shade: 'Rouge Passion'
  },
  {
    id: '3',
    name: 'Palette Fards à Paupières',
    price: 45.90,
    image: '/products/palette-fards.jpg',
    brand: 'Urban Decay',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    category: 'maquillage',
    subcategory: 'yeux',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['mat', 'satiné', 'métallique'],
    tags: ['palette', 'couleurs', 'pigmenté'],
    description: 'Palette de 12 fards à paupières aux couleurs tendance.',
    shade: 'Nude Obsession'
  },
  {
    id: '4',
    name: 'Mascara Volume Intense',
    price: 22.90,
    image: '/products/mascara-volume.jpg',
    brand: 'Lancôme',
    rating: 4.5,
    reviews: 298,
    inStock: true,
    category: 'maquillage',
    subcategory: 'yeux',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['mat'],
    tags: ['volume', 'courbe', 'résistant'],
    description: 'Mascara pour un volume et une courbe exceptionnels.',
    shade: 'Noir'
  },
  {
    id: '5',
    name: 'Correcteur Anti-Cernes',
    price: 16.90,
    image: '/products/correcteur-cernes.jpg',
    brand: 'NARS',
    rating: 4.7,
    reviews: 167,
    inStock: true,
    category: 'maquillage',
    subcategory: 'teint',
    skinTone: ['clair', 'moyen'],
    finish: ['mat'],
    tags: ['anti-cernes', 'couverture', 'longue-tenue'],
    description: 'Correcteur haute couverture pour masquer les cernes.',
    shade: 'Vanille'
  },
  {
    id: '6',
    name: 'Vernis à Ongles Rouge',
    price: 12.90,
    image: '/products/vernis-rouge.jpg',
    brand: 'OPI',
    rating: 4.3,
    reviews: 89,
    inStock: true,
    category: 'maquillage',
    subcategory: 'ongles',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['brillant'],
    tags: ['longue-tenue', 'brillant', 'facile'],
    description: 'Vernis à ongles rouge brillant à la tenue longue durée.',
    shade: 'Rouge Ferrari'
  },
  {
    id: '7',
    name: 'Crayon à Sourcils',
    price: 14.90,
    image: '/products/crayon-sourcils.jpg',
    brand: 'Benefit',
    rating: 4.6,
    reviews: 123,
    inStock: true,
    category: 'maquillage',
    subcategory: 'yeux',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['mat'],
    tags: ['précis', 'résistant', 'facile'],
    description: 'Crayon à sourcils précis pour des sourcils parfaitement dessinés.',
    shade: 'Brun Clair'
  },
  {
    id: '8',
    name: 'Gloss à Lèvres Transparent',
    price: 19.90,
    image: '/products/gloss-transparent.jpg',
    brand: 'Fenty Beauty',
    rating: 4.4,
    reviews: 145,
    inStock: true,
    category: 'maquillage',
    subcategory: 'levres',
    skinTone: ['clair', 'moyen', 'foncé'],
    finish: ['brillant'],
    tags: ['brillant', 'hydratant', 'non-collant'],
    description: 'Gloss transparent brillant et non-collant.',
    shade: 'Transparent'
  }
]

export const maquillageSubcategories = [
  {
    id: 'teint',
    name: 'Teint',
    description: 'Fonds de teint, correcteurs et poudres pour un teint parfait',
    icon: '✨',
    productCount: 2
  },
  {
    id: 'yeux',
    name: 'Yeux',
    description: 'Fards à paupières, mascaras et crayons pour des yeux sublimes',
    icon: '👁️',
    productCount: 3
  },
  {
    id: 'levres',
    name: 'Lèvres',
    description: 'Rouges à lèvres, gloss et crayons pour des lèvres parfaites',
    icon: '💋',
    productCount: 2
  },
  {
    id: 'ongles',
    name: 'Ongles',
    description: 'Vernis à ongles et soins pour des ongles impeccables',
    icon: '💅',
    productCount: 1
  },
  {
    id: 'accessoires',
    name: 'Accessoires',
    description: 'Pinceaux, éponges et outils de maquillage',
    icon: '🖌️',
    productCount: 0
  },
  {
    id: 'kits',
    name: 'Kits & Coffrets',
    description: 'Coffrets et kits de maquillage complets',
    icon: '🎁',
    productCount: 0
  }
]

export const skinTones = [
  { id: 'clair', name: 'Clair', description: 'Teint clair' },
  { id: 'moyen', name: 'Moyen', description: 'Teint moyen' },
  { id: 'fonce', name: 'Foncé', description: 'Teint foncé' }
]

export const finishes = [
  { id: 'mat', name: 'Mat', description: 'Fini mat' },
  { id: 'satiné', name: 'Satiné', description: 'Fini satiné' },
  { id: 'brillant', name: 'Brillant', description: 'Fini brillant' },
  { id: 'métallique', name: 'Métallique', description: 'Fini métallique' }
]
