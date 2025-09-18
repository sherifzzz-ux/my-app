// Données de test pour la page Offres Spéciales

export interface OffreSpeciale {
  id: string
  title: string
  description: string
  image: string
  discountPercentage: number
  originalPrice: number
  salePrice: number
  category: string
  subcategory: string
  brand: string
  startDate: string
  endDate: string
  isActive: boolean
  isLimited: boolean
  remainingQuantity?: number
  totalQuantity?: number
  tags: string[]
  conditions: string[]
  products: OffreSpecialeProduct[]
}

export interface OffreSpecialeProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isOnSale: boolean
  category: string
  subcategory: string
  discountPercentage: number
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

export const offresSpeciales: OffreSpeciale[] = [
  {
    id: '1',
    title: 'Pack Soin Visage Complet',
    description: 'Découvrez notre pack soin visage complet avec 3 produits essentiels pour une routine beauté parfaite.',
    image: '/offers/pack-soin-visage.jpg',
    discountPercentage: 30,
    originalPrice: 89.90,
    salePrice: 62.90,
    category: 'soin-visage',
    subcategory: 'packs',
    brand: 'La Roche-Posay',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    isActive: true,
    isLimited: true,
    remainingQuantity: 45,
    totalQuantity: 100,
    tags: ['pack', 'soin visage', 'routine', 'économies'],
    conditions: [
      'Pack non divisible',
      'Livraison gratuite',
      'Garantie satisfait ou remboursé'
    ],
    products: [
      {
        id: '1',
        name: 'Crème Hydratante Visage',
        price: 24.90,
        originalPrice: 35.90,
        image: '/products/creme-hydratante-visage.jpg',
        brand: 'La Roche-Posay',
        rating: 4.8,
        reviews: 2847,
        inStock: true,
        isOnSale: true,
        category: 'soin-visage',
        subcategory: 'hydratants',
        discountPercentage: 30,
        tags: ['hydratant', 'dermatologique', 'sensible'],
        description: 'Crème hydratante visage pour peaux sensibles.',
        volume: '50ml',
        skinType: ['sensible', 'normale'],
        hypoallergenic: true
      },
      {
        id: '2',
        name: 'Sérum Anti-Âge',
        price: 35.90,
        originalPrice: 49.90,
        image: '/products/serum-anti-age.jpg',
        brand: 'La Roche-Posay',
        rating: 4.7,
        reviews: 1923,
        inStock: true,
        isOnSale: true,
        category: 'soin-visage',
        subcategory: 'serums',
        discountPercentage: 28,
        tags: ['anti-âge', 'sérum', 'dermatologique'],
        description: 'Sérum anti-âge aux peptides.',
        volume: '30ml',
        skinType: ['mature', 'normale']
      },
      {
        id: '3',
        name: 'Masque Purifiant',
        price: 18.90,
        originalPrice: 24.90,
        image: '/products/masque-purifiant.jpg',
        brand: 'La Roche-Posay',
        rating: 4.6,
        reviews: 1456,
        inStock: true,
        isOnSale: true,
        category: 'soin-visage',
        subcategory: 'masques',
        discountPercentage: 24,
        tags: ['purifiant', 'argile', 'masque'],
        description: 'Masque purifiant à l\'argile.',
        volume: '75ml',
        skinType: ['mixte', 'grasse']
      }
    ]
  },
  {
    id: '2',
    title: 'Collection Maquillage Dior',
    description: 'La collection maquillage Dior avec des produits iconiques à prix réduit.',
    image: '/offers/collection-dior.jpg',
    discountPercentage: 25,
    originalPrice: 120.90,
    salePrice: 90.90,
    category: 'maquillage',
    subcategory: 'collections',
    brand: 'Dior',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    isActive: true,
    isLimited: false,
    tags: ['collection', 'maquillage', 'luxe', 'Dior'],
    conditions: [
      'Collection limitée',
      'Livraison express disponible',
      'Échange possible sous 14 jours'
    ],
    products: [
      {
        id: '4',
        name: 'Fond de Teint Teint Parfait',
        price: 45.90,
        originalPrice: 59.90,
        image: '/products/fond-teint-parfait.jpg',
        brand: 'Dior',
        rating: 4.7,
        reviews: 1923,
        inStock: true,
        isOnSale: true,
        category: 'maquillage',
        subcategory: 'fond-teint',
        discountPercentage: 23,
        tags: ['fond de teint', 'longue tenue', 'luxe'],
        description: 'Fond de teint longue tenue avec couverture parfaite.',
        volume: '30ml',
        skinType: ['normale', 'mixte']
      },
      {
        id: '5',
        name: 'Rouge à Lèvres Rouge Dior',
        price: 35.90,
        originalPrice: 45.90,
        image: '/products/rouge-levres-dior.jpg',
        brand: 'Dior',
        rating: 4.8,
        reviews: 1654,
        inStock: true,
        isOnSale: true,
        category: 'maquillage',
        subcategory: 'rouge-levres',
        discountPercentage: 22,
        tags: ['rouge à lèvres', 'luxe', 'couleurs'],
        description: 'Rouge à lèvres Dior aux couleurs iconiques.',
        volume: '3.5g'
      }
    ]
  },
  {
    id: '3',
    title: 'Parfums de Luxe -50%',
    description: 'Sélection de parfums de luxe avec une réduction exceptionnelle de 50%.',
    image: '/offers/parfums-luxe.jpg',
    discountPercentage: 50,
    originalPrice: 180.90,
    salePrice: 90.90,
    category: 'parfumerie',
    subcategory: 'promotions',
    brand: 'Chanel',
    startDate: '2024-02-10',
    endDate: '2024-02-25',
    isActive: true,
    isLimited: true,
    remainingQuantity: 12,
    totalQuantity: 50,
    tags: ['parfum', 'luxe', 'réduction', 'exceptionnelle'],
    conditions: [
      'Quantité limitée',
      'Un parfum par client',
      'Livraison sous 48h'
    ],
    products: [
      {
        id: '6',
        name: 'Eau de Parfum Chanel No.5',
        price: 89.90,
        originalPrice: 179.90,
        image: '/products/chanel-no5.jpg',
        brand: 'Chanel',
        rating: 4.9,
        reviews: 2341,
        inStock: true,
        isOnSale: true,
        category: 'parfumerie',
        subcategory: 'femme',
        discountPercentage: 50,
        tags: ['parfum', 'iconique', 'luxe', 'Chanel'],
        description: 'Eau de parfum iconique Chanel No.5.',
        volume: '50ml',
        gender: ['femme'],
        fragranceFamily: ['floral', 'oriental']
      }
    ]
  },
  {
    id: '4',
    title: 'Soins Bébé Bio -30%',
    description: 'Collection complète de soins bio pour bébé avec une réduction de 30%.',
    image: '/offers/soins-bebe-bio.jpg',
    discountPercentage: 30,
    originalPrice: 45.90,
    salePrice: 32.90,
    category: 'bebe-enfant',
    subcategory: 'packs',
    brand: 'Weleda',
    startDate: '2024-02-05',
    endDate: '2024-03-05',
    isActive: true,
    isLimited: false,
    tags: ['bébé', 'bio', 'soins', 'naturel'],
    conditions: [
      'Produits bio certifiés',
      'Testés dermatologiquement',
      'Livraison gratuite dès 30€'
    ],
    products: [
      {
        id: '7',
        name: 'Shampooing Bébé Bio',
        price: 12.90,
        originalPrice: 18.90,
        image: '/products/shampooing-bebe-bio.jpg',
        brand: 'Weleda',
        rating: 4.6,
        reviews: 1876,
        inStock: true,
        isOnSale: true,
        category: 'bebe-enfant',
        subcategory: 'hygiene',
        discountPercentage: 32,
        tags: ['bio', 'bébé', 'naturel', 'sans larmes'],
        description: 'Shampooing bio doux pour bébé.',
        volume: '200ml',
        ageRange: ['0-3 ans'],
        organic: true,
        hypoallergenic: true
      },
      {
        id: '8',
        name: 'Lait de Toilette Bébé Bio',
        price: 14.90,
        originalPrice: 21.90,
        image: '/products/lait-toilette-bebe-bio.jpg',
        brand: 'Weleda',
        rating: 4.7,
        reviews: 1234,
        inStock: true,
        isOnSale: true,
        category: 'bebe-enfant',
        subcategory: 'hygiene',
        discountPercentage: 32,
        tags: ['bio', 'bébé', 'lait de toilette', 'naturel'],
        description: 'Lait de toilette bio pour bébé.',
        volume: '200ml',
        ageRange: ['0-3 ans'],
        organic: true,
        hypoallergenic: true
      }
    ]
  }
]

export const offresSpecialesCategories = [
  {
    id: 'all',
    name: 'Toutes les offres',
    count: offresSpeciales.length,
    icon: '🎯'
  },
  {
    id: 'packs',
    name: 'Packs & Coffrets',
    count: offresSpeciales.filter(o => o.subcategory === 'packs').length,
    icon: '📦'
  },
  {
    id: 'collections',
    name: 'Collections',
    count: offresSpeciales.filter(o => o.subcategory === 'collections').length,
    icon: '🎨'
  },
  {
    id: 'promotions',
    name: 'Promotions Flash',
    count: offresSpeciales.filter(o => o.subcategory === 'promotions').length,
    icon: '⚡'
  },
  {
    id: 'soin-visage',
    name: 'Soin du Visage',
    count: offresSpeciales.filter(o => o.category === 'soin-visage').length,
    icon: '🧴'
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    count: offresSpeciales.filter(o => o.category === 'maquillage').length,
    icon: '💄'
  },
  {
    id: 'parfumerie',
    name: 'Parfumerie',
    count: offresSpeciales.filter(o => o.category === 'parfumerie').length,
    icon: '🌸'
  },
  {
    id: 'bebe-enfant',
    name: 'Bébé & Enfant',
    count: offresSpeciales.filter(o => o.category === 'bebe-enfant').length,
    icon: '👶'
  }
]

export const discountRanges = [
  { id: 'all', name: 'Toutes les réductions', count: offresSpeciales.length },
  { id: '50-plus', name: '50% et plus', count: offresSpeciales.filter(o => o.discountPercentage >= 50).length },
  { id: '30-49', name: '30% à 49%', count: offresSpeciales.filter(o => o.discountPercentage >= 30 && o.discountPercentage < 50).length },
  { id: '20-29', name: '20% à 29%', count: offresSpeciales.filter(o => o.discountPercentage >= 20 && o.discountPercentage < 30).length },
  { id: '10-19', name: '10% à 19%', count: offresSpeciales.filter(o => o.discountPercentage >= 10 && o.discountPercentage < 20).length }
]

export const offerTypes = [
  { id: 'limited', name: 'Offres limitées', count: offresSpeciales.filter(o => o.isLimited).length },
  { id: 'active', name: 'Offres actives', count: offresSpeciales.filter(o => o.isActive).length },
  { id: 'ending-soon', name: 'Bientôt terminées', count: offresSpeciales.filter(o => {
    const endDate = new Date(o.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }).length }
]
