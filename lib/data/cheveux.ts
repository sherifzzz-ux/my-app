// Données de test pour la catégorie Cheveux

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
  isNew?: boolean
  isOnSale?: boolean
  category: string
  subcategory: string
  hairType: string[]
  problem: string[]
  tags: string[]
  description: string
  volume?: string
}

export const cheveuxProducts: CheveuxProduct[] = [
  {
    id: '1',
    name: 'Shampoing Hydratant',
    price: 24.90,
    originalPrice: 29.90,
    image: '/products/shampoing-hydratant.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.5,
    reviews: 189,
    inStock: true,
    isOnSale: true,
    category: 'cheveux',
    subcategory: 'shampoings',
    hairType: ['secs', 'abîmés', 'colorés'],
    problem: ['sécheresse', 'cassants'],
    tags: ['hydratant', 'sans-sulfate', 'colorés'],
    description: 'Shampoing hydratant pour cheveux secs et abîmés.',
    volume: '400ml'
  },
  {
    id: '2',
    name: 'Après-Shampoing Réparateur',
    price: 28.90,
    image: '/products/apres-shampoing.jpg',
    brand: 'Garnier',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    isNew: true,
    category: 'cheveux',
    subcategory: 'apres-shampoings',
    hairType: ['abîmés', 'cassants'],
    problem: ['cassants', 'fourchus'],
    tags: ['réparateur', 'masque', 'intense'],
    description: 'Après-shampoing réparateur pour cheveux très abîmés.',
    volume: '300ml'
  },
  {
    id: '3',
    name: 'Masque Capillaire Nourrissant',
    price: 32.50,
    image: '/products/masque-capillaire.jpg',
    brand: 'Kerastase',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    category: 'cheveux',
    subcategory: 'soins',
    hairType: ['secs', 'abîmés'],
    problem: ['sécheresse', 'manque-nutrition'],
    tags: ['nourrissant', 'intense', 'luxe'],
    description: 'Masque capillaire nourrissant pour une hydratation intense.',
    volume: '200ml'
  },
  {
    id: '4',
    name: 'Coloration Crème',
    price: 18.90,
    image: '/products/coloration-creme.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.3,
    reviews: 298,
    inStock: true,
    category: 'cheveux',
    subcategory: 'coloration',
    hairType: ['tous-types'],
    problem: ['gris', 'terne'],
    tags: ['coloration', 'crème', 'facile'],
    description: 'Coloration crème facile à appliquer pour un résultat naturel.',
    volume: '1 boîte'
  },
  {
    id: '5',
    name: 'Sérum Anti-Cassure',
    price: 22.90,
    image: '/products/serum-anti-cassure.jpg',
    brand: 'Schwarzkopf',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    category: 'cheveux',
    subcategory: 'soins',
    hairType: ['cassants', 'fins'],
    problem: ['cassants', 'fragiles'],
    tags: ['anti-cassure', 'renforçant', 'sérum'],
    description: 'Sérum anti-cassure pour renforcer les cheveux fragiles.',
    volume: '100ml'
  },
  {
    id: '6',
    name: 'Shampoing Volume',
    price: 26.90,
    image: '/products/shampoing-volume.jpg',
    brand: 'Redken',
    rating: 4.7,
    reviews: 123,
    inStock: true,
    category: 'cheveux',
    subcategory: 'shampoings',
    hairType: ['fins', 'plats'],
    problem: ['manque-volume', 'plats'],
    tags: ['volume', 'gonflant', 'texture'],
    description: 'Shampoing volume pour donner du corps aux cheveux fins.',
    volume: '300ml'
  },
  {
    id: '7',
    name: 'Huile Capillaire Argan',
    price: 19.90,
    image: '/products/huile-argan.jpg',
    brand: 'Moroccanoil',
    rating: 4.6,
    reviews: 145,
    inStock: true,
    category: 'cheveux',
    subcategory: 'soins',
    hairType: ['secs', 'bouclés', 'crépus'],
    problem: ['sécheresse', 'frisottis'],
    tags: ['huile', 'argan', 'nourrissant'],
    description: 'Huile capillaire à l\'argan pour nourrir et discipliner.',
    volume: '100ml'
  },
  {
    id: '8',
    name: 'Décolorant Poudre',
    price: 15.90,
    image: '/products/decolorant-poudre.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.2,
    reviews: 89,
    inStock: true,
    category: 'cheveux',
    subcategory: 'coloration',
    hairType: ['tous-types'],
    problem: ['couleur-sombre'],
    tags: ['décolorant', 'poudre', 'blond'],
    description: 'Décolorant poudre pour éclaircir les cheveux.',
    volume: '1 boîte'
  }
]

export const cheveuxSubcategories = [
  {
    id: 'shampoings',
    name: 'Shampoings',
    description: 'Shampoings pour tous types de cheveux et problèmes capillaires',
    icon: '🧴',
    productCount: 2
  },
  {
    id: 'apres-shampoings',
    name: 'Après-shampoings',
    description: 'Après-shampoings et démêlants pour des cheveux soyeux',
    icon: '💧',
    productCount: 1
  },
  {
    id: 'soins',
    name: 'Soins',
    description: 'Masques, sérums et huiles pour des cheveux en pleine santé',
    icon: '✨',
    productCount: 3
  },
  {
    id: 'coloration',
    name: 'Coloration',
    description: 'Colorations, décolorants et soins post-coloration',
    icon: '🎨',
    productCount: 2
  },
  {
    id: 'styling',
    name: 'Styling',
    description: 'Gels, laques et produits de coiffage',
    icon: '💇',
    productCount: 0
  },
  {
    id: 'accessoires',
    name: 'Accessoires',
    description: 'Brosses, peignes et accessoires de coiffage',
    icon: '🪥',
    productCount: 0
  }
]

export const hairTypes = [
  { id: 'secs', name: 'Secs', description: 'Cheveux secs et déshydratés' },
  { id: 'gras', name: 'Gras', description: 'Cheveux gras à la racine' },
  { id: 'normaux', name: 'Normaux', description: 'Cheveux équilibrés' },
  { id: 'mixtes', name: 'Mixtes', description: 'Cheveux gras aux racines, secs aux pointes' },
  { id: 'fins', name: 'Fins', description: 'Cheveux fins et manquant de volume' },
  { id: 'épais', name: 'Épais', description: 'Cheveux épais et volumineux' },
  { id: 'bouclés', name: 'Bouclés', description: 'Cheveux bouclés et ondulés' },
  { id: 'crépus', name: 'Crépus', description: 'Cheveux crépus et frisés' },
  { id: 'colorés', name: 'Colorés', description: 'Cheveux colorés ou décolorés' },
  { id: 'abîmés', name: 'Abîmés', description: 'Cheveux abîmés et cassants' }
]

export const hairProblems = [
  { id: 'sécheresse', name: 'Sécheresse', description: 'Cheveux secs et déshydratés' },
  { id: 'cassants', name: 'Cassants', description: 'Cheveux qui cassent facilement' },
  { id: 'fourchus', name: 'Fourchus', description: 'Pointes fourchues' },
  { id: 'chute', name: 'Chute', description: 'Chute de cheveux excessive' },
  { id: 'gris', name: 'Cheveux blancs', description: 'Apparition de cheveux blancs' },
  { id: 'terne', name: 'Terne', description: 'Cheveux sans éclat' },
  { id: 'frisottis', name: 'Frisottis', description: 'Cheveux frisottés et indisciplinés' },
  { id: 'manque-volume', name: 'Manque de volume', description: 'Cheveux plats et sans volume' },
  { id: 'pellicules', name: 'Pellicules', description: 'Pellicules et démangeaisons' }
]
