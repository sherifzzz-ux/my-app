// Données de test pour la page Nouveautés

export interface NouveauteProduct {
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
  isOnSale?: boolean
  category: string
  subcategory: string
  releaseDate: string
  tags: string[]
  description: string
  volume?: string
  skinType?: string[]
  ageRange?: string[]
  gender?: string[]
  fragranceFamily?: string[]
  hypoallergenic?: boolean
  organic?: boolean
  pediatricianApproved?: boolean
}

export const nouveautesProducts: NouveauteProduct[] = [
  {
    id: '1',
    name: 'Sérum Anti-Âge Révolutionnaire',
    price: 89.90,
    image: '/products/serum-anti-age.jpg',
    brand: 'Chanel',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isNew: true,
    category: 'soin-visage',
    subcategory: 'serums',
    releaseDate: '2024-01-15',
    tags: ['nouveau', 'anti-âge', 'luxe', 'révolutionnaire'],
    description: 'Sérum anti-âge révolutionnaire aux peptides et acide hyaluronique pour une peau plus ferme et hydratée.',
    volume: '30ml',
    skinType: ['mature', 'normale', 'sèche']
  },
  {
    id: '2',
    name: 'Fond de Teint Teint Parfait',
    price: 45.90,
    image: '/products/fond-teint-parfait.jpg',
    brand: 'Dior',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    isNew: true,
    category: 'maquillage',
    subcategory: 'fond-teint',
    releaseDate: '2024-01-10',
    tags: ['nouveau', 'fond de teint', 'longue tenue', 'couverture'],
    description: 'Fond de teint longue tenue avec une couverture parfaite et un fini naturel.',
    volume: '30ml',
    skinType: ['normale', 'mixte', 'grasse']
  },
  {
    id: '3',
    name: 'Parfum Signature 2024',
    price: 95.90,
    image: '/products/parfum-signature-2024.jpg',
    brand: 'Tom Ford',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: true,
    category: 'parfumerie',
    subcategory: 'femme',
    releaseDate: '2024-01-05',
    tags: ['nouveau', 'signature', 'luxe', 'exclusif'],
    description: 'Parfum signature 2024 aux notes de rose et oud pour une fragrance unique et sophistiquée.',
    volume: '50ml',
    gender: ['femme'],
    fragranceFamily: ['oriental', 'boisé']
  },
  {
    id: '4',
    name: 'Shampooing Bio Réparateur',
    price: 18.90,
    image: '/products/shampooing-bio-reparateur.jpg',
    brand: 'Weleda',
    rating: 4.6,
    reviews: 98,
    inStock: true,
    isNew: true,
    category: 'cheveux',
    subcategory: 'shampooings',
    releaseDate: '2024-01-20',
    tags: ['nouveau', 'bio', 'réparateur', 'naturel'],
    description: 'Shampooing bio réparateur aux extraits de calendula pour des cheveux plus forts et brillants.',
    volume: '200ml',
    organic: true
  },
  {
    id: '5',
    name: 'Crème Hydratante 24h',
    price: 32.90,
    image: '/products/creme-hydratante-24h.jpg',
    brand: 'La Roche-Posay',
    rating: 4.5,
    reviews: 267,
    inStock: true,
    isNew: true,
    category: 'soin-visage',
    subcategory: 'hydratants',
    releaseDate: '2024-01-12',
    tags: ['nouveau', 'hydratant', '24h', 'dermatologique'],
    description: 'Crème hydratante 24h pour une hydratation intense et durable de la peau.',
    volume: '50ml',
    skinType: ['sensible', 'normale', 'sèche'],
    hypoallergenic: true
  },
  {
    id: '6',
    name: 'Rouge à Lèvres Matte Longue Tenue',
    price: 28.90,
    image: '/products/rouge-levres-matte.jpg',
    brand: 'Lancôme',
    rating: 4.7,
    reviews: 145,
    inStock: true,
    isNew: true,
    category: 'maquillage',
    subcategory: 'rouge-levres',
    releaseDate: '2024-01-18',
    tags: ['nouveau', 'matte', 'longue tenue', 'couleurs tendance'],
    description: 'Rouge à lèvres matte longue tenue dans les couleurs tendance de la saison.',
    volume: '3.4g'
  },
  {
    id: '7',
    name: 'Gel Douche Relaxant',
    price: 12.90,
    image: '/products/gel-douche-relaxant.jpg',
    brand: 'Avène',
    rating: 4.4,
    reviews: 178,
    inStock: true,
    isNew: true,
    category: 'corps-bain',
    subcategory: 'gels-douche',
    releaseDate: '2024-01-25',
    tags: ['nouveau', 'relaxant', 'eau thermale', 'apaisant'],
    description: 'Gel douche relaxant à l\'eau thermale d\'Avène pour un moment de détente.',
    volume: '400ml',
    skinType: ['sensible'],
    hypoallergenic: true
  },
  {
    id: '8',
    name: 'Lait de Toilette Bébé Bio',
    price: 14.90,
    image: '/products/lait-toilette-bebe-bio.jpg',
    brand: 'Mustela',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    isNew: true,
    category: 'bebe-enfant',
    subcategory: 'hygiene',
    releaseDate: '2024-01-30',
    tags: ['nouveau', 'bio', 'bébé', 'hypoallergénique'],
    description: 'Lait de toilette bio pour bébé, doux et hypoallergénique.',
    volume: '500ml',
    ageRange: ['0-3 ans'],
    hypoallergenic: true,
    organic: true,
    pediatricianApproved: true
  },
  {
    id: '9',
    name: 'Masque Purifiant Argile',
    price: 24.90,
    image: '/products/masque-purifiant-argile.jpg',
    brand: 'La Roche-Posay',
    rating: 4.6,
    reviews: 123,
    inStock: true,
    isNew: true,
    category: 'soin-visage',
    subcategory: 'masques',
    releaseDate: '2024-02-01',
    tags: ['nouveau', 'purifiant', 'argile', 'peaux mixtes'],
    description: 'Masque purifiant à l\'argile pour les peaux mixtes et grasses.',
    volume: '75ml',
    skinType: ['mixte', 'grasse']
  },
  {
    id: '10',
    name: 'Eau de Toilette Fraîche',
    price: 55.90,
    image: '/products/eau-toilette-fraiche.jpg',
    brand: 'Hugo Boss',
    rating: 4.3,
    reviews: 67,
    inStock: true,
    isNew: true,
    category: 'parfumerie',
    subcategory: 'homme',
    releaseDate: '2024-02-05',
    tags: ['nouveau', 'frais', 'masculin', 'sport'],
    description: 'Eau de toilette fraîche et dynamique pour homme.',
    volume: '100ml',
    gender: ['homme'],
    fragranceFamily: ['aquatique', 'frais']
  }
]

export const nouveautesCategories = [
  {
    id: 'all',
    name: 'Toutes les nouveautés',
    count: nouveautesProducts.length,
    icon: '✨'
  },
  {
    id: 'soin-visage',
    name: 'Soin du Visage',
    count: nouveautesProducts.filter(p => p.category === 'soin-visage').length,
    icon: '🧴'
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    count: nouveautesProducts.filter(p => p.category === 'maquillage').length,
    icon: '💄'
  },
  {
    id: 'parfumerie',
    name: 'Parfumerie',
    count: nouveautesProducts.filter(p => p.category === 'parfumerie').length,
    icon: '🌸'
  },
  {
    id: 'cheveux',
    name: 'Cheveux',
    count: nouveautesProducts.filter(p => p.category === 'cheveux').length,
    icon: '💇'
  },
  {
    id: 'corps-bain',
    name: 'Corps & Bain',
    count: nouveautesProducts.filter(p => p.category === 'corps-bain').length,
    icon: '🛁'
  },
  {
    id: 'bebe-enfant',
    name: 'Bébé & Enfant',
    count: nouveautesProducts.filter(p => p.category === 'bebe-enfant').length,
    icon: '👶'
  }
]

export const nouveautesByMonth = [
  {
    month: 'Février 2024',
    products: nouveautesProducts.filter(p => p.releaseDate.startsWith('2024-02')),
    count: nouveautesProducts.filter(p => p.releaseDate.startsWith('2024-02')).length
  },
  {
    month: 'Janvier 2024',
    products: nouveautesProducts.filter(p => p.releaseDate.startsWith('2024-01')),
    count: nouveautesProducts.filter(p => p.releaseDate.startsWith('2024-01')).length
  }
]

export const trendingTags = [
  { id: 'anti-âge', name: 'Anti-âge', count: nouveautesProducts.filter(p => p.tags.includes('anti-âge')).length },
  { id: 'bio', name: 'Bio', count: nouveautesProducts.filter(p => p.tags.includes('bio')).length },
  { id: 'luxe', name: 'Luxe', count: nouveautesProducts.filter(p => p.tags.includes('luxe')).length },
  { id: 'longue-tenue', name: 'Longue tenue', count: nouveautesProducts.filter(p => p.tags.includes('longue tenue')).length },
  { id: 'dermatologique', name: 'Dermatologique', count: nouveautesProducts.filter(p => p.tags.includes('dermatologique')).length },
  { id: 'naturel', name: 'Naturel', count: nouveautesProducts.filter(p => p.tags.includes('naturel')).length }
]
