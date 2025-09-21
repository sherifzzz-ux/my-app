// Données spécifiques pour chaque sous-catégorie

export interface SubcategoryProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isNew: boolean
  isOnSale: boolean
  tags: string[]
  category: string
  subcategory: string
}

export interface SubcategoryGuide {
  id: string
  title: string
  description: string
  content: string
  image: string
  readTime: number
  category: string
  subcategory: string
  featured: boolean
}

// Données pour la sous-catégorie "Nettoyage" (Soin du visage)
export const nettoyageProducts: SubcategoryProduct[] = [
  {
    id: 'nettoyage-1',
    name: 'Gel Nettoyant Purifiant CeraVe',
    description: 'Gel nettoyant avec acide salicylique pour peaux mixtes à grasses',
    price: 12.50,
    originalPrice: 15.00,
    image: '/images/products/cerave-gel-nettoyant.jpg',
    brand: 'CeraVe',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    isNew: false,
    isOnSale: true,
    tags: ['acide salicylique', 'purifiant', 'peaux mixtes'],
    category: 'soin-du-visage',
    subcategory: 'nettoyage'
  },
  {
    id: 'nettoyage-2',
    name: 'Eau Micellaire La Roche-Posay',
    description: 'Eau micellaire ultra-douce pour peaux sensibles',
    price: 8.90,
    image: '/images/products/lrp-eau-micellaire.jpg',
    brand: 'La Roche-Posay',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    isNew: true,
    isOnSale: false,
    tags: ['eau micellaire', 'peaux sensibles', 'doux'],
    category: 'soin-du-visage',
    subcategory: 'nettoyage'
  },
  {
    id: 'nettoyage-3',
    name: 'Mousse Nettoyante Avène',
    description: 'Mousse nettoyante avec eau thermale d\'Avène',
    price: 11.20,
    image: '/images/products/avene-mousse-nettoyante.jpg',
    brand: 'Avène',
    rating: 4.3,
    reviews: 156,
    inStock: true,
    isNew: false,
    isOnSale: false,
    tags: ['eau thermale', 'mousse', 'apaisant'],
    category: 'soin-du-visage',
    subcategory: 'nettoyage'
  }
]

export const nettoyageGuides: SubcategoryGuide[] = [
  {
    id: 'guide-nettoyage-1',
    title: 'Comment bien nettoyer sa peau selon son type',
    description: 'Découvrez les meilleures techniques de nettoyage pour chaque type de peau',
    content: 'Le nettoyage est l\'étape la plus importante de votre routine beauté...',
    image: '/images/guides/nettoyage-peau.jpg',
    readTime: 5,
    category: 'soin-du-visage',
    subcategory: 'nettoyage',
    featured: true
  },
  {
    id: 'guide-nettoyage-2',
    title: 'Eau micellaire vs Gel nettoyant : lequel choisir ?',
    description: 'Comparaison des différents types de nettoyants pour votre peau',
    content: 'Chaque type de nettoyant a ses avantages selon votre type de peau...',
    image: '/images/guides/eau-micellaire-vs-gel.jpg',
    readTime: 4,
    category: 'soin-du-visage',
    subcategory: 'nettoyage',
    featured: false
  }
]

// Données pour la sous-catégorie "Hydratation" (Soin du visage)
export const hydratationProducts: SubcategoryProduct[] = [
  {
    id: 'hydratation-1',
    name: 'Sérum Acide Hyaluronique The Ordinary',
    description: 'Sérum hydratant avec acide hyaluronique pur',
    price: 6.80,
    image: '/images/products/to-acide-hyaluronique.jpg',
    brand: 'The Ordinary',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    isNew: false,
    isOnSale: false,
    tags: ['acide hyaluronique', 'hydratant', 'sérum'],
    category: 'soin-du-visage',
    subcategory: 'hydratation'
  },
  {
    id: 'hydratation-2',
    name: 'Crème Hydratante Laneige',
    description: 'Crème hydratante 24h avec technologie Water Bank',
    price: 28.50,
    originalPrice: 32.00,
    image: '/images/products/laneige-creme-hydratante.jpg',
    brand: 'Laneige',
    rating: 4.8,
    reviews: 298,
    inStock: true,
    isNew: false,
    isOnSale: true,
    tags: ['hydratant 24h', 'water bank', 'k-beauty'],
    category: 'soin-du-visage',
    subcategory: 'hydratation'
  }
]

export const hydratationGuides: SubcategoryGuide[] = [
  {
    id: 'guide-hydratation-1',
    title: 'L\'importance de l\'hydratation pour une peau saine',
    description: 'Pourquoi l\'hydratation est essentielle dans votre routine beauté',
    content: 'Une peau bien hydratée est une peau en bonne santé...',
    image: '/images/guides/importance-hydratation.jpg',
    readTime: 6,
    category: 'soin-du-visage',
    subcategory: 'hydratation',
    featured: true
  }
]

// Données pour la sous-catégorie "Fond de teint" (Maquillage)
export const fondDeTeintProducts: SubcategoryProduct[] = [
  {
    id: 'fond-teint-1',
    name: 'Fond de Teint L\'Oréal True Match',
    description: 'Fond de teint longue tenue avec 50 teintes',
    price: 14.90,
    image: '/images/products/loreal-true-match.jpg',
    brand: 'L\'Oréal',
    rating: 4.4,
    reviews: 567,
    inStock: true,
    isNew: false,
    isOnSale: false,
    tags: ['longue tenue', '50 teintes', 'matifiant'],
    category: 'maquillage',
    subcategory: 'fond-de-teint'
  },
  {
    id: 'fond-teint-2',
    name: 'Fond de Teint Fenty Beauty Pro Filt\'r',
    description: 'Fond de teint matifiant avec 50 teintes inclusives',
    price: 35.00,
    image: '/images/products/fenty-pro-filtr.jpg',
    brand: 'Fenty Beauty',
    rating: 4.7,
    reviews: 892,
    inStock: true,
    isNew: true,
    isOnSale: false,
    tags: ['matifiant', 'inclusif', '50 teintes'],
    category: 'maquillage',
    subcategory: 'fond-de-teint'
  }
]

export const fondDeTeintGuides: SubcategoryGuide[] = [
  {
    id: 'guide-fond-teint-1',
    title: 'Comment choisir la bonne teinte de fond de teint',
    description: 'Guide complet pour trouver votre teinte parfaite',
    content: 'Choisir la bonne teinte de fond de teint peut être un défi...',
    image: '/images/guides/choisir-teinte-fond-teint.jpg',
    readTime: 7,
    category: 'maquillage',
    subcategory: 'fond-de-teint',
    featured: true
  }
]

// Données pour la sous-catégorie "Shampooings" (Cheveux)
export const shampooingsProducts: SubcategoryProduct[] = [
  {
    id: 'shampooing-1',
    name: 'Shampooing Klorane à l\'Ortie',
    description: 'Shampooing purifiant pour cheveux gras',
    price: 9.50,
    image: '/images/products/klorane-shampooing-ortie.jpg',
    brand: 'Klorane',
    rating: 4.2,
    reviews: 234,
    inStock: true,
    isNew: false,
    isOnSale: false,
    tags: ['ortie', 'purifiant', 'cheveux gras'],
    category: 'cheveux',
    subcategory: 'shampooings'
  },
  {
    id: 'shampooing-2',
    name: 'Shampooing L\'Oréal Elvive',
    description: 'Shampooing réparateur pour cheveux abîmés',
    price: 6.90,
    originalPrice: 8.50,
    image: '/images/products/loreal-elvive-shampooing.jpg',
    brand: 'L\'Oréal',
    rating: 4.3,
    reviews: 456,
    inStock: true,
    isNew: false,
    isOnSale: true,
    tags: ['réparateur', 'cheveux abîmés', 'nourrissant'],
    category: 'cheveux',
    subcategory: 'shampooings'
  }
]

export const shampooingsGuides: SubcategoryGuide[] = [
  {
    id: 'guide-shampooing-1',
    title: 'Comment choisir son shampooing selon son type de cheveux',
    description: 'Guide pour trouver le shampooing adapté à vos cheveux',
    content: 'Le choix du shampooing dépend de votre type de cheveux...',
    image: '/images/guides/choisir-shampooing.jpg',
    readTime: 5,
    category: 'cheveux',
    subcategory: 'shampooings',
    featured: true
  }
]

// Fonction pour récupérer les données d'une sous-catégorie
export function getSubcategoryData(categoryId: string, subcategoryId: string) {
  const dataMap: Record<string, Record<string, { products: SubcategoryProduct[], guides: SubcategoryGuide[] }>> = {
    'soin-du-visage': {
      'nettoyage': { products: nettoyageProducts, guides: nettoyageGuides },
      'hydratation': { products: hydratationProducts, guides: hydratationGuides }
    },
    'maquillage': {
      'fond-de-teint': { products: fondDeTeintProducts, guides: fondDeTeintGuides }
    },
    'cheveux': {
      'shampooings': { products: shampooingsProducts, guides: shampooingsGuides }
    }
  }

  return dataMap[categoryId]?.[subcategoryId] || { products: [], guides: [] }
}

// Fonction pour récupérer les produits d'une sous-catégorie
export function getSubcategoryProducts(categoryId: string, subcategoryId: string): SubcategoryProduct[] {
  const data = getSubcategoryData(categoryId, subcategoryId)
  return data.products
}

// Fonction pour récupérer les guides d'une sous-catégorie
export function getSubcategoryGuides(categoryId: string, subcategoryId: string): SubcategoryGuide[] {
  const data = getSubcategoryData(categoryId, subcategoryId)
  return data.guides
}

// Fonction pour récupérer les guides mis en avant
export function getFeaturedSubcategoryGuides(categoryId: string, subcategoryId: string): SubcategoryGuide[] {
  const guides = getSubcategoryGuides(categoryId, subcategoryId)
  return guides.filter(guide => guide.featured)
}
