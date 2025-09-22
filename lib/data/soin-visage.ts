// Données de test pour la catégorie Soin du visage

export interface SoinVisageSubcategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  productCount: number
  featured: boolean
}

export interface SoinVisageProduct {
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
  skinType: string[]
  tags: string[]
  description: string
}

export const soinVisageProducts: SoinVisageProduct[] = [
  {
    id: '1',
    name: 'Nettoyant Doux Hydratant',
    price: 24.90,
    originalPrice: 29.90,
    image: '/products/nettoyant-doux.jpg',
    brand: 'La Roche-Posay',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: false,
    isOnSale: true,
    category: 'soin-du-visage',
    subcategory: 'nettoyants',
    skinType: ['sensible', 'normale', 'mixte'],
    tags: ['hydratant', 'doux', 'sans-parfum'],
    description: 'Nettoyant doux pour tous types de peau, même sensibles.'
  },
  {
    id: '2',
    name: 'Crème Hydratante Anti-Âge',
    price: 45.90,
    image: '/products/creme-anti-age.jpg',
    brand: 'Vichy',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'hydratants',
    skinType: ['mature', 'normale'],
    tags: ['anti-âge', 'hydratant', 'vitamine-c'],
    description: 'Crème hydratante avec actifs anti-âge pour une peau plus ferme.'
  },
  {
    id: '3',
    name: 'Sérum Vitamine C',
    price: 32.50,
    image: '/products/serum-vitamine-c.jpg',
    brand: 'The Ordinary',
    rating: 4.3,
    reviews: 256,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'serums',
    skinType: ['normale', 'mixte', 'grasse'],
    tags: ['vitamine-c', 'éclaircissant', 'antioxydant'],
    description: 'Sérum à la vitamine C pour un teint éclatant et uniforme.'
  },
  {
    id: '4',
    name: 'Masque Purifiant Argile',
    price: 18.90,
    image: '/products/masque-argile.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.2,
    reviews: 167,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'masques',
    skinType: ['grasse', 'mixte'],
    tags: ['purifiant', 'argile', 'pores'],
    description: 'Masque purifiant à l\'argile pour nettoyer les pores en profondeur.'
  },
  {
    id: '5',
    name: 'Gommage Exfoliant Doux',
    price: 22.90,
    image: '/products/gommage-doux.jpg',
    brand: 'Nivea',
    rating: 4.4,
    reviews: 94,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'exfoliants',
    skinType: ['normale', 'mixte'],
    tags: ['exfoliant', 'doux', 'grain-fin'],
    description: 'Gommage doux aux micro-grains pour une peau lisse et radieuse.'
  },
  {
    id: '6',
    name: 'Crème de Jour SPF 30',
    price: 28.90,
    image: '/products/creme-spf.jpg',
    brand: 'Avène',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'hydratants',
    skinType: ['sensible', 'normale'],
    tags: ['spf', 'protection', 'hydratant'],
    description: 'Crème de jour hydratante avec protection solaire SPF 30.'
  },
  {
    id: '7',
    name: 'Sérum Acide Hyaluronique',
    price: 39.90,
    image: '/products/serum-hyaluronique.jpg',
    brand: 'The Ordinary',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'serums',
    skinType: ['normale', 'sèche', 'mature'],
    tags: ['acide-hyaluronique', 'hydratant', 'repulpant'],
    description: 'Sérum à l\'acide hyaluronique pour une hydratation intense.'
  },
  {
    id: '8',
    name: 'Nettoyant Moussant Purifiant',
    price: 19.90,
    image: '/products/nettoyant-moussant.jpg',
    brand: 'Garnier',
    rating: 4.1,
    reviews: 145,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'nettoyants',
    skinType: ['grasse', 'mixte'],
    tags: ['moussant', 'purifiant', 'dégraissant'],
    description: 'Nettoyant moussant purifiant pour les peaux grasses et mixtes.'
  },
  {
    id: '9',
    name: 'Kit Soins Complet Visage',
    price: 89.90,
    originalPrice: 120.00,
    image: '/products/kit-soins-complet.jpg',
    brand: 'La Roche-Posay',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    isNew: true,
    isOnSale: true,
    category: 'soin-du-visage',
    subcategory: 'soins-par-produit',
    skinType: ['normale', 'mixte', 'sensible'],
    tags: ['kit', 'complet', 'routine', 'débutant'],
    description: 'Kit complet pour une routine de soins du visage efficace.'
  },
  {
    id: '10',
    name: 'Sérum Multi-Actifs',
    price: 55.90,
    image: '/products/serum-multi-actifs.jpg',
    brand: 'Vichy',
    rating: 4.6,
    reviews: 134,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'soins-par-produit',
    skinType: ['mature', 'normale'],
    tags: ['multi-actifs', 'anti-âge', 'concentré'],
    description: 'Sérum multi-actifs pour des soins ciblés et efficaces.'
  },
  {
    id: '11',
    name: 'Crème Nuit Régénérante',
    price: 42.90,
    image: '/products/creme-nuit.jpg',
    brand: 'Nivea',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'soins-par-produit',
    skinType: ['normale', 'sèche', 'mature'],
    tags: ['nuit', 'régénérant', 'hydratant'],
    description: 'Crème de nuit pour une régénération optimale de la peau.'
  },
  // Protection solaire
  {
    id: '12',
    name: 'Crème Solaire Visage SPF 50+',
    price: 28.90,
    image: '/products/creme-solaire-spf50.jpg',
    brand: 'La Roche-Posay',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'protection-solaire',
    skinType: ['sensible', 'normale', 'mixte'],
    tags: ['spf50', 'protection', 'anti-uv', 'matifiant'],
    description: 'Protection solaire haute protection pour le visage, même pour les peaux sensibles.'
  },
  {
    id: '13',
    name: 'Fluide Solaire Invisible SPF 30',
    price: 24.90,
    image: '/products/fluide-solaire-invisible.jpg',
    brand: 'Avène',
    rating: 4.5,
    reviews: 98,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'protection-solaire',
    skinType: ['normale', 'mixte', 'grasse'],
    tags: ['invisible', 'spf30', 'légère', 'non-grasse'],
    description: 'Fluide solaire invisible et non-grasse pour une protection quotidienne.'
  },
  {
    id: '14',
    name: 'Stick Solaire Visage SPF 50',
    price: 19.90,
    image: '/products/stick-solaire.jpg',
    brand: 'Garnier',
    rating: 4.3,
    reviews: 67,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'protection-solaire',
    skinType: ['normale', 'mixte', 'grasse'],
    tags: ['stick', 'spf50', 'pratique', 'résistant-eau'],
    description: 'Stick solaire pratique et résistant à l\'eau pour une protection optimale.'
  },
  // Soins ciblés
  {
    id: '15',
    name: 'Sérum Anti-Taches',
    price: 45.90,
    image: '/products/serum-anti-taches.jpg',
    brand: 'Vichy',
    rating: 4.6,
    reviews: 123,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'soins-cibles',
    skinType: ['normale', 'mixte', 'mature'],
    tags: ['anti-taches', 'éclaircissant', 'ciblé', 'vitamine-c'],
    description: 'Sérum ciblé pour atténuer les taches et unifier le teint.'
  },
  {
    id: '16',
    name: 'Gel Anti-Boutons',
    price: 22.90,
    image: '/products/gel-anti-boutons.jpg',
    brand: 'La Roche-Posay',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'soins-cibles',
    skinType: ['grasse', 'mixte'],
    tags: ['anti-boutons', 'purifiant', 'ciblé', 'salicylique'],
    description: 'Gel ciblé pour traiter et prévenir les boutons d\'acné.'
  },
  {
    id: '17',
    name: 'Crème Contour des Yeux',
    price: 35.90,
    image: '/products/creme-contour-yeux.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.5,
    reviews: 145,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'soins-cibles',
    skinType: ['normale', 'sèche', 'mature'],
    tags: ['contour-yeux', 'anti-rides', 'hydratant', 'ciblé'],
    description: 'Crème spécialement formulée pour le contour des yeux délicat.'
  },
  // Baumes lèvres
  {
    id: '18',
    name: 'Baume à Lèvres Hydratant',
    price: 8.90,
    image: '/products/baume-levres-hydratant.jpg',
    brand: 'Nivea',
    rating: 4.2,
    reviews: 234,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'baumes-levres',
    skinType: ['normale', 'sèche'],
    tags: ['hydratant', 'baume', 'lèvres', 'réparateur'],
    description: 'Baume hydratant pour des lèvres douces et protégées.'
  },
  {
    id: '19',
    name: 'Stick Lèvres SPF 15',
    price: 12.90,
    image: '/products/stick-levres-spf.jpg',
    brand: 'Avène',
    rating: 4.4,
    reviews: 78,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'baumes-levres',
    skinType: ['normale', 'sèche', 'sensible'],
    tags: ['spf15', 'protection', 'stick', 'lèvres'],
    description: 'Stick à lèvres avec protection solaire pour une protection complète.'
  },
  {
    id: '20',
    name: 'Baume Lèvres Réparateur',
    price: 15.90,
    image: '/products/baume-levres-reparateur.jpg',
    brand: 'La Roche-Posay',
    rating: 4.6,
    reviews: 112,
    inStock: true,
    isNew: true,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'baumes-levres',
    skinType: ['sèche', 'sensible'],
    tags: ['réparateur', 'intensif', 'lèvres', 'apaisant'],
    description: 'Baume réparateur intensif pour les lèvres très sèches et abîmées.'
  },
  // Démaquillants & Nettoyants
  {
    id: '21',
    name: 'Eau Micellaire Démaquillante',
    price: 16.90,
    image: '/products/eau-micellaire.jpg',
    brand: 'Garnier',
    rating: 4.3,
    reviews: 189,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'demaquillants-nettoyants',
    skinType: ['normale', 'mixte', 'sensible'],
    tags: ['micellaire', 'démaquillant', 'doux', 'efficace'],
    description: 'Eau micellaire douce et efficace pour démaquiller en un geste.'
  },
  {
    id: '22',
    name: 'Huile Démaquillante',
    price: 24.90,
    image: '/products/huile-demaquillante.jpg',
    brand: 'L\'Oréal Paris',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'demaquillants-nettoyants',
    skinType: ['normale', 'sèche', 'mature'],
    tags: ['huile', 'démaquillant', 'nourrissant', 'intensif'],
    description: 'Huile démaquillante nourrissante pour un démaquillage en profondeur.'
  },
  {
    id: '23',
    name: 'Gel Nettoyant Purifiant',
    price: 18.90,
    image: '/products/gel-nettoyant-purifiant.jpg',
    brand: 'Vichy',
    rating: 4.4,
    reviews: 134,
    inStock: true,
    isNew: false,
    isOnSale: false,
    category: 'soin-du-visage',
    subcategory: 'demaquillants-nettoyants',
    skinType: ['grasse', 'mixte'],
    tags: ['gel', 'purifiant', 'nettoyant', 'dégraissant'],
    description: 'Gel nettoyant purifiant pour les peaux grasses et mixtes.'
  }
]

export const soinVisageSubcategories: SoinVisageSubcategory[] = [
  {
    id: 'nettoyants',
    name: 'Nettoyants',
    slug: 'nettoyants',
    description: 'Nettoyants doux et purifiants pour tous types de peau',
    icon: '🧼',
    productCount: 2,
    featured: true
  },
  {
    id: 'hydratants',
    name: 'Hydratants',
    slug: 'hydratants',
    description: 'Crèmes et lotions hydratantes pour une peau nourrie',
    icon: '💧',
    productCount: 2,
    featured: true
  },
  {
    id: 'serums',
    name: 'Sérums',
    slug: 'serums',
    description: 'Sérums concentrés pour des soins ciblés',
    icon: '✨',
    productCount: 2,
    featured: true
  },
  {
    id: 'masques',
    name: 'Masques',
    slug: 'masques',
    description: 'Masques de soin pour des traitements intensifs',
    icon: '🎭',
    productCount: 1,
    featured: false
  },
  {
    id: 'exfoliants',
    name: 'Exfoliants',
    slug: 'exfoliants',
    description: 'Gommages et exfoliants pour une peau lisse',
    icon: '🌊',
    productCount: 1,
    featured: false
  },
  {
    id: 'anti-age',
    name: 'Anti-Âge',
    slug: 'anti-age',
    description: 'Soins anti-âge pour préserver la jeunesse de votre peau',
    icon: '⏰',
    productCount: 0,
    featured: false
  },
  {
    id: 'soins-par-produit',
    name: 'Soins par produit',
    slug: 'soins-par-produit',
    description: 'Découvrez nos soins du visage organisés par type de produit',
    icon: '🧴',
    productCount: 3,
    featured: true
  },
  {
    id: 'protection-solaire',
    name: 'Protection solaire',
    slug: 'protection-solaire',
    description: 'Protection solaire pour tous types de peau',
    icon: '☀️',
    productCount: 3,
    featured: true
  },
  {
    id: 'soins-cibles',
    name: 'Soins ciblés',
    slug: 'soins-cibles',
    description: 'Soins spécialisés pour des problèmes spécifiques',
    icon: '🎯',
    productCount: 3,
    featured: true
  },
  {
    id: 'baumes-levres',
    name: 'Baumes lèvres',
    slug: 'baumes-levres',
    description: 'Baumes et soins pour des lèvres douces et hydratées',
    icon: '💋',
    productCount: 3,
    featured: false
  },
  {
    id: 'demaquillants-nettoyants',
    name: 'Démaquillants & Nettoyants',
    slug: 'demaquillants-nettoyants',
    description: 'Démaquillants et nettoyants pour une peau propre',
    icon: '🧽',
    productCount: 3,
    featured: false
  }
]

export const skinTypes = [
  { id: 'normale', name: 'Normale', description: 'Peau équilibrée' },
  { id: 'seche', name: 'Sèche', description: 'Peau qui tiraille' },
  { id: 'grasse', name: 'Grasse', description: 'Peau brillante' },
  { id: 'mixte', name: 'Mixte', description: 'Peau combinée' },
  { id: 'sensible', name: 'Sensible', description: 'Peau réactive' },
  { id: 'mature', name: 'Mature', description: 'Peau mature' }
]
