// Données de test pour la catégorie Parapharmacie

export interface ParapharmacieSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface ParapharmacieProduct {
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

export const parapharmacieProducts: ParapharmacieProduct[] = [
  {
    id: 'pp1',
    name: 'Vitamine D3 1000 UI',
    price: 15.90,
    image: '/products/vitamine-d3.jpg',
    brand: 'Arkopharma',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parapharmacie',
    subcategory: 'complements',
    tags: ['vitamine', 'd3', 'immunité'],
    description: 'Complément alimentaire à base de vitamine D3 pour renforcer les défenses immunitaires.'
  },
  {
    id: 'pp2',
    name: 'Magnésium Marin 300mg',
    price: 12.50,
    image: '/products/magnesium-marin.jpg',
    brand: 'Biocyte',
    rating: 4.4,
    reviews: 189,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'parapharmacie',
    subcategory: 'complements',
    tags: ['magnésium', 'stress', 'fatigue'],
    description: 'Magnésium marin pour lutter contre la fatigue et le stress.'
  },
  {
    id: 'pp3',
    name: 'Crème Hydratante Visage',
    price: 22.90,
    image: '/products/creme-hydratante-visage.jpg',
    brand: 'La Roche-Posay',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    isNew: false,
    isOnSale: true,
    category: 'parapharmacie',
    subcategory: 'soins-visage',
    tags: ['hydratant', 'visage', 'dermatologique'],
    description: 'Crème hydratante visage testée dermatologiquement.'
  },
  {
    id: 'pp4',
    name: 'Sérum Anti-Âge',
    price: 35.90,
    image: '/products/serum-anti-age.jpg',
    brand: 'Vichy',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parapharmacie',
    subcategory: 'soins-visage',
    tags: ['anti-âge', 'sérum', 'fermeté'],
    description: 'Sérum anti-âge à l\'acide hyaluronique pour une peau plus ferme.'
  },
  {
    id: 'pp5',
    name: 'Crème Corps Hydratante',
    price: 18.90,
    image: '/products/creme-corps-hydratante.jpg',
    brand: 'Eucerin',
    rating: 4.3,
    reviews: 127,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'parapharmacie',
    subcategory: 'soins-corps',
    tags: ['corps', 'hydratant', 'dermatologique'],
    description: 'Crème corps hydratante pour tous types de peau.'
  },
  {
    id: 'pp6',
    name: 'Gel Douche Surgras',
    price: 14.90,
    image: '/products/gel-douche-surgras.jpg',
    brand: 'Ducray',
    rating: 4.4,
    reviews: 98,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'parapharmacie',
    subcategory: 'soins-corps',
    tags: ['surgras', 'doux', 'corps'],
    description: 'Gel douche surgras pour les peaux sensibles et sèches.'
  }
]

export const parapharmacieSubcategories: ParapharmacieSubcategory[] = [
  {
    id: 'complements',
    name: 'Complément Alimentaire',
    slug: 'complements',
    description: 'Vitamines et compléments alimentaires',
    icon: '💊',
    productCount: 2,
    featured: true
  },
  {
    id: 'soins-visage',
    name: 'Soins du visage',
    slug: 'soins-visage',
    description: 'Soins dermatologiques pour le visage',
    icon: '🧴',
    productCount: 2,
    featured: true
  },
  {
    id: 'soins-corps',
    name: 'Soins du corps',
    slug: 'soins-corps',
    description: 'Soins dermatologiques pour le corps',
    icon: '🛁',
    productCount: 2,
    featured: true
  }
]

export interface HealthCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
  subcategories: string[]
}

export const healthCategories: HealthCategory[] = [
  {
    id: 'complements',
    name: 'Compléments alimentaires',
    description: 'Vitamines, minéraux et suppléments',
    icon: '💊',
    count: 45,
    subcategories: ['Vitamines', 'Minéraux', 'Probiotiques', 'Oméga-3']
  },
  {
    id: 'soins-visage',
    name: 'Soins du visage',
    description: 'Crèmes, sérums et soins spécialisés',
    icon: '🧴',
    count: 32,
    subcategories: ['Anti-âge', 'Hydratation', 'Nettoyage', 'Protection solaire']
  },
  {
    id: 'soins-corps',
    name: 'Soins du corps',
    description: 'Produits de soin corporel',
    icon: '🛁',
    count: 28,
    subcategories: ['Hydratation', 'Exfoliation', 'Anti-cellulite', 'Relaxation']
  }
]