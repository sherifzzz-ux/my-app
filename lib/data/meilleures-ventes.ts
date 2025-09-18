// Données de test pour la page Meilleures Ventes

export interface MeilleureVenteProduct {
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
  salesCount: number
  rank: number
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

export const meilleuresVentesProducts: MeilleureVenteProduct[] = [
  {
    id: '1',
    name: 'Crème Hydratante Visage',
    price: 24.90,
    image: '/products/creme-hydratante-visage.jpg',
    brand: 'La Roche-Posay',
    rating: 4.8,
    reviews: 2847,
    inStock: true,
    category: 'soin-visage',
    subcategory: 'hydratants',
    salesCount: 15420,
    rank: 1,
    tags: ['bestseller', 'hydratant', 'dermatologique', 'sensible'],
    description: 'Crème hydratante visage pour peaux sensibles, testée dermatologiquement.',
    volume: '50ml',
    skinType: ['sensible', 'normale'],
    hypoallergenic: true
  },
  {
    id: '2',
    name: 'Fond de Teint Teint Parfait',
    price: 45.90,
    image: '/products/fond-teint-parfait.jpg',
    brand: 'Dior',
    rating: 4.7,
    reviews: 1923,
    inStock: true,
    category: 'maquillage',
    subcategory: 'fond-teint',
    salesCount: 12850,
    rank: 2,
    tags: ['bestseller', 'fond de teint', 'longue tenue', 'luxe'],
    description: 'Fond de teint longue tenue avec une couverture parfaite et un fini naturel.',
    volume: '30ml',
    skinType: ['normale', 'mixte']
  },
  {
    id: '3',
    name: 'Sérum Anti-Âge Révolutionnaire',
    price: 89.90,
    image: '/products/serum-anti-age.jpg',
    brand: 'Chanel',
    rating: 4.9,
    reviews: 1456,
    inStock: true,
    category: 'soin-visage',
    subcategory: 'serums',
    salesCount: 11200,
    rank: 3,
    tags: ['bestseller', 'anti-âge', 'luxe', 'révolutionnaire'],
    description: 'Sérum anti-âge révolutionnaire aux peptides et acide hyaluronique.',
    volume: '30ml',
    skinType: ['mature', 'normale', 'sèche']
  },
  {
    id: '4',
    name: 'Eau de Parfum Femme',
    price: 89.90,
    originalPrice: 109.90,
    image: '/products/parfum-femme.jpg',
    brand: 'Chanel',
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    isOnSale: true,
    category: 'parfumerie',
    subcategory: 'femme',
    salesCount: 9850,
    rank: 4,
    tags: ['bestseller', 'parfum', 'luxe', 'iconique'],
    description: 'Eau de parfum féminine aux notes florales et orientales.',
    volume: '50ml',
    gender: ['femme'],
    fragranceFamily: ['floral', 'oriental']
  },
  {
    id: '5',
    name: 'Shampooing Bio Réparateur',
    price: 18.90,
    image: '/products/shampooing-bio-reparateur.jpg',
    brand: 'Weleda',
    rating: 4.6,
    reviews: 1876,
    inStock: true,
    category: 'cheveux',
    subcategory: 'shampooings',
    salesCount: 9200,
    rank: 5,
    tags: ['bestseller', 'bio', 'réparateur', 'naturel'],
    description: 'Shampooing bio réparateur aux extraits de calendula.',
    volume: '200ml',
    organic: true
  },
  {
    id: '6',
    name: 'Rouge à Lèvres Matte Longue Tenue',
    price: 28.90,
    image: '/products/rouge-levres-matte.jpg',
    brand: 'Lancôme',
    rating: 4.7,
    reviews: 1654,
    inStock: true,
    category: 'maquillage',
    subcategory: 'rouge-levres',
    salesCount: 8750,
    rank: 6,
    tags: ['bestseller', 'matte', 'longue tenue', 'couleurs tendance'],
    description: 'Rouge à lèvres matte longue tenue dans les couleurs tendance.',
    volume: '3.4g'
  },
  {
    id: '7',
    name: 'Gel Douche Relaxant',
    price: 12.90,
    image: '/products/gel-douche-relaxant.jpg',
    brand: 'Avène',
    rating: 4.4,
    reviews: 1432,
    inStock: true,
    category: 'corps-bain',
    subcategory: 'gels-douche',
    salesCount: 8200,
    rank: 7,
    tags: ['bestseller', 'relaxant', 'eau thermale', 'apaisant'],
    description: 'Gel douche relaxant à l\'eau thermale d\'Avène.',
    volume: '400ml',
    skinType: ['sensible'],
    hypoallergenic: true
  },
  {
    id: '8',
    name: 'Lait de Toilette Bébé',
    price: 12.90,
    image: '/products/lait-toilette-bebe.jpg',
    brand: 'Mustela',
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'hygiene',
    salesCount: 7800,
    rank: 8,
    tags: ['bestseller', 'bébé', 'hypoallergénique', 'dermatologique'],
    description: 'Lait de toilette doux et hypoallergénique pour bébé.',
    volume: '500ml',
    ageRange: ['0-3 ans'],
    hypoallergenic: true,
    pediatricianApproved: true
  },
  {
    id: '9',
    name: 'Masque Purifiant Argile',
    price: 24.90,
    image: '/products/masque-purifiant-argile.jpg',
    brand: 'La Roche-Posay',
    rating: 4.6,
    reviews: 987,
    inStock: true,
    category: 'soin-visage',
    subcategory: 'masques',
    salesCount: 7200,
    rank: 9,
    tags: ['bestseller', 'purifiant', 'argile', 'peaux mixtes'],
    description: 'Masque purifiant à l\'argile pour les peaux mixtes et grasses.',
    volume: '75ml',
    skinType: ['mixte', 'grasse']
  },
  {
    id: '10',
    name: 'Eau de Toilette Homme',
    price: 65.90,
    image: '/products/parfum-homme.jpg',
    brand: 'Dior',
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    category: 'parfumerie',
    subcategory: 'homme',
    salesCount: 6800,
    rank: 10,
    tags: ['bestseller', 'parfum', 'masculin', 'sophistiqué'],
    description: 'Eau de toilette masculine aux notes boisées et épicées.',
    volume: '100ml',
    gender: ['homme'],
    fragranceFamily: ['boisé', 'épicé']
  },
  {
    id: '11',
    name: 'Crème Anti-Rougeurs',
    price: 15.90,
    image: '/products/creme-anti-rougeurs.jpg',
    brand: 'Bioderma',
    rating: 4.9,
    reviews: 1123,
    inStock: true,
    category: 'soin-visage',
    subcategory: 'apaisants',
    salesCount: 6500,
    rank: 11,
    tags: ['bestseller', 'apaisant', 'réparateur', 'dermatologique'],
    description: 'Crème apaisante pour réduire les rougeurs et irritations.',
    volume: '40ml',
    skinType: ['sensible', 'irritée'],
    hypoallergenic: true
  },
  {
    id: '12',
    name: 'Baume à Lèvres Enfant',
    price: 4.90,
    image: '/products/baume-levres-enfant.jpg',
    brand: 'La Roche-Posay',
    rating: 4.4,
    reviews: 876,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'soins-visage',
    salesCount: 5800,
    rank: 12,
    tags: ['bestseller', 'protecteur', 'hydratant', 'enfant'],
    description: 'Baume à lèvres protecteur pour les lèvres sensibles des enfants.',
    volume: '4g',
    ageRange: ['3-6 ans', '6-12 ans'],
    hypoallergenic: true,
    pediatricianApproved: true
  }
]

export const meilleuresVentesCategories = [
  {
    id: 'all',
    name: 'Toutes les catégories',
    count: meilleuresVentesProducts.length,
    icon: '🏆'
  },
  {
    id: 'soin-visage',
    name: 'Soin du Visage',
    count: meilleuresVentesProducts.filter(p => p.category === 'soin-visage').length,
    icon: '🧴'
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    count: meilleuresVentesProducts.filter(p => p.category === 'maquillage').length,
    icon: '💄'
  },
  {
    id: 'parfumerie',
    name: 'Parfumerie',
    count: meilleuresVentesProducts.filter(p => p.category === 'parfumerie').length,
    icon: '🌸'
  },
  {
    id: 'cheveux',
    name: 'Cheveux',
    count: meilleuresVentesProducts.filter(p => p.category === 'cheveux').length,
    icon: '💇'
  },
  {
    id: 'corps-bain',
    name: 'Corps & Bain',
    count: meilleuresVentesProducts.filter(p => p.category === 'corps-bain').length,
    icon: '🛁'
  },
  {
    id: 'bebe-enfant',
    name: 'Bébé & Enfant',
    count: meilleuresVentesProducts.filter(p => p.category === 'bebe-enfant').length,
    icon: '👶'
  }
]

export const topBrands = [
  { 
    id: 'la-roche-posay', 
    name: 'La Roche-Posay', 
    salesCount: 30220, 
    rank: 1,
    products: meilleuresVentesProducts.filter(p => p.brand === 'La Roche-Posay').length
  },
  { 
    id: 'chanel', 
    name: 'Chanel', 
    salesCount: 25250, 
    rank: 2,
    products: meilleuresVentesProducts.filter(p => p.brand === 'Chanel').length
  },
  { 
    id: 'dior', 
    name: 'Dior', 
    salesCount: 19650, 
    rank: 3,
    products: meilleuresVentesProducts.filter(p => p.brand === 'Dior').length
  },
  { 
    id: 'lancome', 
    name: 'Lancôme', 
    salesCount: 8750, 
    rank: 4,
    products: meilleuresVentesProducts.filter(p => p.brand === 'Lancôme').length
  },
  { 
    id: 'weleda', 
    name: 'Weleda', 
    salesCount: 9200, 
    rank: 5,
    products: meilleuresVentesProducts.filter(p => p.brand === 'Weleda').length
  }
]

export const salesPeriods = [
  { id: 'all', name: 'Toutes les périodes', count: meilleuresVentesProducts.length },
  { id: 'month', name: 'Ce mois-ci', count: meilleuresVentesProducts.filter(p => p.salesCount > 1000).length },
  { id: 'week', name: 'Cette semaine', count: meilleuresVentesProducts.filter(p => p.salesCount > 500).length },
  { id: 'day', name: 'Aujourd\'hui', count: meilleuresVentesProducts.filter(p => p.salesCount > 100).length }
]

export const popularTags = [
  { id: 'bestseller', name: 'Bestseller', count: meilleuresVentesProducts.filter(p => p.tags.includes('bestseller')).length },
  { id: 'luxe', name: 'Luxe', count: meilleuresVentesProducts.filter(p => p.tags.includes('luxe')).length },
  { id: 'bio', name: 'Bio', count: meilleuresVentesProducts.filter(p => p.tags.includes('bio')).length },
  { id: 'dermatologique', name: 'Dermatologique', count: meilleuresVentesProducts.filter(p => p.tags.includes('dermatologique')).length },
  { id: 'longue-tenue', name: 'Longue tenue', count: meilleuresVentesProducts.filter(p => p.tags.includes('longue tenue')).length },
  { id: 'naturel', name: 'Naturel', count: meilleuresVentesProducts.filter(p => p.tags.includes('naturel')).length }
]
