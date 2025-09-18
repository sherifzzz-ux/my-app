// Données de test pour la page Parapharmacie

export interface ParapharmacieProduct {
  id: string
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  image: string
  description: string
  benefits: string[]
  ingredients: string[]
  usage: string
  precautions: string[]
  inStock: boolean
  isNew?: boolean
  isPromo?: boolean
  rating: number
  reviews: number
  tags: string[]
  ageGroup?: 'Adulte' | 'Enfant' | 'Bébé' | 'Tous âges'
  prescription?: boolean
  dosage?: string
  volume?: string
  expiryDate?: string
}

export interface HealthCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  count: number
  subcategories: string[]
}

export interface HealthCondition {
  id: string
  name: string
  description: string
  symptoms: string[]
  recommendedProducts: string[]
  icon: string
  color: string
}

export const healthCategories: HealthCategory[] = [
  {
    id: 'digestion',
    name: 'Digestion',
    description: 'Produits pour améliorer la digestion et le confort digestif',
    icon: '🌿',
    color: 'text-green-500',
    count: 25,
    subcategories: ['Probiotiques', 'Enzymes digestives', 'Anti-acides', 'Laxatifs', 'Anti-nausées']
  },
  {
    id: 'sommeil',
    name: 'Sommeil',
    description: 'Solutions naturelles pour un sommeil réparateur',
    icon: '😴',
    color: 'text-blue-500',
    count: 18,
    subcategories: ['Mélatonine', 'Plantes relaxantes', 'Sprays d\'oreiller', 'Compléments', 'Huiles essentielles']
  },
  {
    id: 'immunite',
    name: 'Immunité',
    description: 'Renforcez vos défenses naturelles',
    icon: '🛡️',
    color: 'text-orange-500',
    count: 32,
    subcategories: ['Vitamine C', 'Zinc', 'Échinacée', 'Propolis', 'Ginseng']
  },
  {
    id: 'stress',
    name: 'Stress & Anxiété',
    description: 'Gestion naturelle du stress et de l\'anxiété',
    icon: '🧘',
    color: 'text-purple-500',
    count: 22,
    subcategories: ['Magnésium', 'Rhodiola', 'Mélisse', 'Lavande', 'Ashwagandha']
  },
  {
    id: 'articulations',
    name: 'Articulations',
    description: 'Soulagement des douleurs articulaires',
    icon: '🦴',
    color: 'text-red-500',
    count: 15,
    subcategories: ['Glucosamine', 'Chondroïtine', 'Curcuma', 'Gel anti-inflammatoire', 'Cataplasmes']
  },
  {
    id: 'circulation',
    name: 'Circulation',
    description: 'Amélioration de la circulation sanguine',
    icon: '❤️',
    color: 'text-pink-500',
    count: 20,
    subcategories: ['Ginkgo biloba', 'Vigne rouge', 'Basilic', 'Compression', 'Gels circulatoires']
  },
  {
    id: 'peau',
    name: 'Soins de la Peau',
    description: 'Traitements pour différents problèmes de peau',
    icon: '✨',
    color: 'text-yellow-500',
    count: 28,
    subcategories: ['Acné', 'Eczéma', 'Psoriasis', 'Cicatrisation', 'Hydratation']
  },
  {
    id: 'vitamines',
    name: 'Vitamines & Minéraux',
    description: 'Compléments vitaminiques essentiels',
    icon: '💊',
    color: 'text-indigo-500',
    count: 45,
    subcategories: ['Multivitamines', 'Vitamine D', 'Fer', 'Calcium', 'Oméga-3']
  }
]

export const healthConditions: HealthCondition[] = [
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Solutions naturelles contre la fatigue chronique',
    symptoms: ['Épuisement', 'Manque d\'énergie', 'Difficultés de concentration'],
    recommendedProducts: ['Vitamine B12', 'Fer', 'Ginseng', 'Magnésium'],
    icon: '😴',
    color: 'text-blue-500'
  },
  {
    id: 'digestif',
    name: 'Problèmes Digestifs',
    description: 'Soulagement des troubles digestifs courants',
    symptoms: ['Ballonnements', 'Brûlures d\'estomac', 'Constipation', 'Diarrhée'],
    recommendedProducts: ['Probiotiques', 'Enzymes digestives', 'Charbon actif'],
    icon: '🌿',
    color: 'text-green-500'
  },
  {
    id: 'stress-anxiete',
    name: 'Stress & Anxiété',
    description: 'Gestion naturelle du stress et de l\'anxiété',
    symptoms: ['Tension', 'Irritabilité', 'Troubles du sommeil', 'Palpitations'],
    recommendedProducts: ['Magnésium', 'Rhodiola', 'Mélisse', 'Lavande'],
    icon: '🧘',
    color: 'text-purple-500'
  },
  {
    id: 'immunite-faible',
    name: 'Immunité Affaiblie',
    description: 'Renforcement des défenses immunitaires',
    symptoms: ['Infections fréquentes', 'Guérison lente', 'Fatigue persistante'],
    recommendedProducts: ['Vitamine C', 'Zinc', 'Échinacée', 'Propolis'],
    icon: '🛡️',
    color: 'text-orange-500'
  }
]

export const parapharmacieProducts: ParapharmacieProduct[] = [
  {
    id: '1',
    name: 'Probiotiques Ultra 50 Milliards',
    brand: 'Physiomance',
    category: 'Digestion',
    subcategory: 'Probiotiques',
    price: 25.90,
    originalPrice: 32.90,
    image: '/parapharmacie/probiotiques-ultra.jpg',
    description: 'Complément alimentaire à base de probiotiques pour restaurer l\'équilibre de la flore intestinale.',
    benefits: [
      'Restaure la flore intestinale',
      'Améliore la digestion',
      'Renforce l\'immunité',
      'Réduit les ballonnements'
    ],
    ingredients: ['Lactobacillus acidophilus', 'Bifidobacterium bifidum', 'Fructo-oligosaccharides'],
    usage: '1 gélule par jour le matin à jeun avec un verre d\'eau',
    precautions: ['Ne pas dépasser la dose recommandée', 'Conserver au réfrigérateur'],
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviews: 156,
    tags: ['Digestion', 'Probiotiques', 'Flore intestinale'],
    ageGroup: 'Adulte',
    prescription: false,
    dosage: '50 milliards UFC',
    volume: '30 gélules'
  },
  {
    id: '2',
    name: 'Mélatonine 1.9mg',
    brand: 'Arkopharma',
    category: 'Sommeil',
    subcategory: 'Mélatonine',
    price: 18.50,
    image: '/parapharmacie/melatonine-arkopharma.jpg',
    description: 'Complément alimentaire à base de mélatonine pour favoriser l\'endormissement et améliorer la qualité du sommeil.',
    benefits: [
      'Favorise l\'endormissement',
      'Améliore la qualité du sommeil',
      'Régule le rythme circadien',
      'Réduit le temps d\'endormissement'
    ],
    ingredients: ['Mélatonine', 'Extrait de mélisse', 'Extrait de passiflore'],
    usage: '1 comprimé 30 minutes avant le coucher',
    precautions: ['Ne pas conduire après prise', 'Réservé aux adultes'],
    inStock: true,
    rating: 4.5,
    reviews: 89,
    tags: ['Sommeil', 'Mélatonine', 'Endormissement'],
    ageGroup: 'Adulte',
    prescription: false,
    dosage: '1.9mg',
    volume: '60 comprimés'
  },
  {
    id: '3',
    name: 'Vitamine C 1000mg',
    brand: 'Solgar',
    category: 'Immunité',
    subcategory: 'Vitamine C',
    price: 22.90,
    image: '/parapharmacie/vitamine-c-solgar.jpg',
    description: 'Complément alimentaire à base de vitamine C naturelle pour renforcer les défenses immunitaires.',
    benefits: [
      'Renforce l\'immunité',
      'Antioxydant puissant',
      'Favorise l\'absorption du fer',
      'Contribue à la formation du collagène'
    ],
    ingredients: ['Vitamine C (acide L-ascorbique)', 'Bioflavonoïdes d\'agrumes'],
    usage: '1 comprimé par jour avec un verre d\'eau',
    precautions: ['Ne pas dépasser la dose recommandée'],
    inStock: true,
    isPromo: true,
    rating: 4.8,
    reviews: 234,
    tags: ['Immunité', 'Vitamine C', 'Antioxydant'],
    ageGroup: 'Adulte',
    prescription: false,
    dosage: '1000mg',
    volume: '100 comprimés'
  },
  {
    id: '4',
    name: 'Magnésium Marin 300mg',
    brand: 'Pileje',
    category: 'Stress & Anxiété',
    subcategory: 'Magnésium',
    price: 19.90,
    image: '/parapharmacie/magnesium-pileje.jpg',
    description: 'Complément alimentaire à base de magnésium marin pour lutter contre le stress et la fatigue.',
    benefits: [
      'Réduit le stress et l\'anxiété',
      'Lutte contre la fatigue',
      'Améliore la qualité du sommeil',
      'Contribue au bon fonctionnement musculaire'
    ],
    ingredients: ['Magnésium marin', 'Vitamine B6', 'Taurine'],
    usage: '2 gélules par jour avec un verre d\'eau',
    precautions: ['Ne pas dépasser la dose recommandée'],
    inStock: true,
    rating: 4.6,
    reviews: 178,
    tags: ['Stress', 'Magnésium', 'Fatigue'],
    ageGroup: 'Adulte',
    prescription: false,
    dosage: '300mg',
    volume: '60 gélules'
  },
  {
    id: '5',
    name: 'Gel Anti-Inflammatoire Arnica',
    brand: 'Boiron',
    category: 'Articulations',
    subcategory: 'Gel anti-inflammatoire',
    price: 12.90,
    image: '/parapharmacie/gel-arnica-boiron.jpg',
    description: 'Gel à base d\'arnica pour soulager les douleurs articulaires et musculaires.',
    benefits: [
      'Soulage les douleurs articulaires',
      'Réduit l\'inflammation',
      'Effet rafraîchissant',
      'Application locale facile'
    ],
    ingredients: ['Arnica montana', 'Menthol', 'Camphre'],
    usage: 'Appliquer 2-3 fois par jour sur la zone douloureuse',
    precautions: ['Usage externe uniquement', 'Éviter le contact avec les yeux'],
    inStock: true,
    rating: 4.4,
    reviews: 95,
    tags: ['Articulations', 'Arnica', 'Anti-inflammatoire'],
    ageGroup: 'Adulte',
    prescription: false,
    volume: '100g'
  },
  {
    id: '6',
    name: 'Oméga-3 EPA/DHA',
    brand: 'Nutergia',
    category: 'Vitamines & Minéraux',
    subcategory: 'Oméga-3',
    price: 28.90,
    image: '/parapharmacie/omega3-nutergia.jpg',
    description: 'Complément alimentaire riche en oméga-3 EPA et DHA pour la santé cardiovasculaire.',
    benefits: [
      'Soutient la santé cardiovasculaire',
      'Contribue au bon fonctionnement cérébral',
      'Anti-inflammatoire naturel',
      'Améliore la santé des articulations'
    ],
    ingredients: ['Huile de poisson', 'EPA', 'DHA', 'Vitamine E'],
    usage: '2 gélules par jour avec un repas',
    precautions: ['Conserver au réfrigérateur après ouverture'],
    inStock: true,
    rating: 4.7,
    reviews: 142,
    tags: ['Oméga-3', 'Cardiovasculaire', 'Cérébral'],
    ageGroup: 'Adulte',
    prescription: false,
    dosage: 'EPA 400mg / DHA 300mg',
    volume: '60 gélules'
  }
]

export const parapharmacieStats = {
  totalProducts: 185,
  totalCategories: 8,
  averageRating: 4.6,
  totalReviews: 3200,
  prescriptionProducts: 45,
  naturalProducts: 120
}
