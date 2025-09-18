// Données de test pour la catégorie Bébé & Enfant

export interface BebeEnfantProduct {
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
  ageRange: string[]
  skinType: string[]
  tags: string[]
  description: string
  volume?: string
  hypoallergenic?: boolean
  organic?: boolean
  pediatricianApproved?: boolean
}

export const bebeEnfantProducts: BebeEnfantProduct[] = [
  {
    id: '1',
    name: 'Lait de Toilette Bébé',
    price: 12.90,
    image: '/products/lait-toilette-bebe.jpg',
    brand: 'Mustela',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isNew: true,
    category: 'bebe-enfant',
    subcategory: 'hygiene',
    ageRange: ['0-3 ans', '3-6 ans'],
    skinType: ['sensible', 'normale'],
    tags: ['hypoallergénique', 'dermatologiquement testé', 'sans paraben'],
    description: 'Lait de toilette doux et hypoallergénique pour la toilette quotidienne de bébé.',
    volume: '500ml',
    hypoallergenic: true,
    organic: false,
    pediatricianApproved: true
  },
  {
    id: '2',
    name: 'Crème Hydratante Visage Enfant',
    price: 8.90,
    originalPrice: 11.90,
    image: '/products/creme-hydratante-enfant.jpg',
    brand: 'A-Derma',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    isOnSale: true,
    category: 'bebe-enfant',
    subcategory: 'soins-visage',
    ageRange: ['3-6 ans', '6-12 ans'],
    skinType: ['sensible', 'normale'],
    tags: ['hydratant', 'apaisant', 'sans parfum'],
    description: 'Crème hydratante spécialement formulée pour la peau délicate des enfants.',
    volume: '50ml',
    hypoallergenic: true,
    organic: true,
    pediatricianApproved: true
  },
  {
    id: '3',
    name: 'Shampooing Bébé Bio',
    price: 9.90,
    image: '/products/shampooing-bebe-bio.jpg',
    brand: 'Weleda',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'cheveux',
    ageRange: ['0-3 ans', '3-6 ans'],
    skinType: ['sensible'],
    tags: ['bio', 'naturel', 'sans larmes'],
    description: 'Shampooing bio aux extraits de calendula, doux pour les cheveux et le cuir chevelu de bébé.',
    volume: '200ml',
    hypoallergenic: true,
    organic: true,
    pediatricianApproved: true
  },
  {
    id: '4',
    name: 'Crème Anti-Rougeurs',
    price: 15.90,
    image: '/products/creme-anti-rougeurs.jpg',
    brand: 'Bioderma',
    rating: 4.9,
    reviews: 278,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'soins-visage',
    ageRange: ['0-3 ans', '3-6 ans'],
    skinType: ['sensible', 'irritée'],
    tags: ['apaisant', 'réparateur', 'dermatologiquement testé'],
    description: 'Crème apaisante pour réduire les rougeurs et irritations de la peau sensible.',
    volume: '40ml',
    hypoallergenic: true,
    organic: false,
    pediatricianApproved: true
  },
  {
    id: '5',
    name: 'Gel Douche Enfant',
    price: 6.90,
    image: '/products/gel-douche-enfant.jpg',
    brand: 'Uriage',
    rating: 4.5,
    reviews: 142,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'hygiene',
    ageRange: ['3-6 ans', '6-12 ans'],
    skinType: ['normale', 'sensible'],
    tags: ['doux', 'parfumé', 'sans savon'],
    description: 'Gel douche doux et parfumé, spécialement formulé pour les enfants.',
    volume: '300ml',
    hypoallergenic: false,
    organic: false,
    pediatricianApproved: true
  },
  {
    id: '6',
    name: 'Baume à Lèvres Enfant',
    price: 4.90,
    image: '/products/baume-levres-enfant.jpg',
    brand: 'La Roche-Posay',
    rating: 4.4,
    reviews: 98,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'soins-visage',
    ageRange: ['3-6 ans', '6-12 ans'],
    skinType: ['sensible'],
    tags: ['protecteur', 'hydratant', 'sans parfum'],
    description: 'Baume à lèvres protecteur pour les lèvres sensibles des enfants.',
    volume: '4g',
    hypoallergenic: true,
    organic: false,
    pediatricianApproved: true
  },
  {
    id: '7',
    name: 'Crème Solaire Enfant SPF 50+',
    price: 18.90,
    image: '/products/creme-solaire-enfant.jpg',
    brand: 'Avène',
    rating: 4.8,
    reviews: 312,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'protection-solaire',
    ageRange: ['0-3 ans', '3-6 ans', '6-12 ans'],
    skinType: ['sensible', 'normale'],
    tags: ['SPF 50+', 'résistant à l\'eau', 'sans parfum'],
    description: 'Crème solaire haute protection spécialement formulée pour la peau sensible des enfants.',
    volume: '100ml',
    hypoallergenic: true,
    organic: false,
    pediatricianApproved: true
  },
  {
    id: '8',
    name: 'Lingettes Bébé Bio',
    price: 7.90,
    image: '/products/lingettes-bebe-bio.jpg',
    brand: 'Love & Green',
    rating: 4.6,
    reviews: 167,
    inStock: true,
    category: 'bebe-enfant',
    subcategory: 'hygiene',
    ageRange: ['0-3 ans'],
    skinType: ['sensible'],
    tags: ['bio', 'dégradables', 'sans alcool'],
    description: 'Lingettes bio dégradables pour la toilette de bébé.',
    volume: '64 lingettes',
    hypoallergenic: true,
    organic: true,
    pediatricianApproved: true
  }
]

export const bebeEnfantSubcategories = [
  {
    id: 'hygiene',
    name: 'Hygiène',
    description: 'Produits d\'hygiène pour bébé et enfant',
    icon: '🧴',
    productCount: 3
  },
  {
    id: 'soins-visage',
    name: 'Soins du Visage',
    description: 'Crèmes et soins pour le visage des enfants',
    icon: '👶',
    productCount: 3
  },
  {
    id: 'cheveux',
    name: 'Cheveux',
    description: 'Shampooings et soins capillaires pour enfants',
    icon: '💇',
    productCount: 1
  },
  {
    id: 'protection-solaire',
    name: 'Protection Solaire',
    description: 'Crèmes solaires et protection UV pour enfants',
    icon: '☀️',
    productCount: 1
  },
  {
    id: 'bain',
    name: 'Bain',
    description: 'Produits pour le bain et la toilette',
    icon: '🛁',
    productCount: 0
  },
  {
    id: 'change',
    name: 'Change',
    description: 'Produits pour le change et l\'hygiène intime',
    icon: '👶',
    productCount: 0
  }
]

export const ageRanges = [
  { id: '0-3-ans', name: '0-3 ans', description: 'Nouveau-nés et tout-petits' },
  { id: '3-6-ans', name: '3-6 ans', description: 'Enfants en bas âge' },
  { id: '6-12-ans', name: '6-12 ans', description: 'Enfants d\'âge scolaire' },
  { id: '12-ans-plus', name: '12 ans et plus', description: 'Préadolescents' }
]

export const skinTypes = [
  { id: 'normale', name: 'Normale', description: 'Peau équilibrée' },
  { id: 'sensible', name: 'Sensible', description: 'Peau réactive et délicate' },
  { id: 'seche', name: 'Sèche', description: 'Peau qui a besoin d\'hydratation' },
  { id: 'irritee', name: 'Irritée', description: 'Peau avec rougeurs et irritations' }
]

export const certifications = [
  { id: 'hypoallergenic', name: 'Hypoallergénique', description: 'Testé pour minimiser les réactions allergiques' },
  { id: 'organic', name: 'Bio', description: 'Produits biologiques certifiés' },
  { id: 'pediatrician-approved', name: 'Approuvé Pédiatre', description: 'Recommandé par les pédiatres' },
  { id: 'dermatologically-tested', name: 'Testé Dermatologiquement', description: 'Testé sous contrôle dermatologique' }
]
