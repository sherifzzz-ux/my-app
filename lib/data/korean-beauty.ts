// Données de test pour la page Korean Beauty

export interface KoreanBeautyProduct {
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
  skinType: string[]
  usage: string
  inStock: boolean
  isNew?: boolean
  isTrending?: boolean
  isLimited?: boolean
  rating: number
  reviews: number
  tags: string[]
  koreanName?: string
  step?: number // Pour la routine 10 étapes
  texture: 'Gel' | 'Crème' | 'Sérum' | 'Essence' | 'Toner' | 'Masque' | 'Huile' | 'Mousse'
  size: string
  madeInKorea: boolean
  crueltyFree: boolean
  vegan?: boolean
}

export interface KoreanBeautyCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  count: number
  subcategories: string[]
  step?: number
}

export interface KoreanIngredient {
  id: string
  name: string
  koreanName: string
  description: string
  benefits: string[]
  skinTypes: string[]
  icon: string
  color: string
  popularity: 'Très Populaire' | 'Populaire' | 'Émergent'
}

export interface KoreanRoutineStep {
  id: number
  name: string
  description: string
  products: string[]
  icon: string
  time: string
  tips: string[]
}

export const koreanBeautyCategories: KoreanBeautyCategory[] = [
  {
    id: 'nettoyage',
    name: 'Nettoyage',
    description: 'Première étape de la routine K-Beauty',
    icon: '🧼',
    color: 'text-blue-500',
    count: 15,
    subcategories: ['Démaquillant', 'Nettoyant mousse', 'Nettoyant huile', 'Gommage'],
    step: 1
  },
  {
    id: 'toner',
    name: 'Toner',
    description: 'Équilibre et prépare la peau',
    icon: '💧',
    color: 'text-cyan-500',
    count: 12,
    subcategories: ['Toner hydratant', 'Toner exfoliant', 'Toner apaisant'],
    step: 2
  },
  {
    id: 'essence',
    name: 'Essence',
    description: 'Hydratation profonde et nutrition',
    icon: '✨',
    color: 'text-purple-500',
    count: 18,
    subcategories: ['Essence hydratante', 'Essence anti-âge', 'Essence éclaircissante'],
    step: 3
  },
  {
    id: 'serum',
    name: 'Sérum',
    description: 'Concentré d\'actifs ciblés',
    icon: '💎',
    color: 'text-pink-500',
    count: 25,
    subcategories: ['Sérum hydratant', 'Sérum anti-âge', 'Sérum éclaircissant', 'Sérum apaisant'],
    step: 4
  },
  {
    id: 'masque',
    name: 'Masque',
    description: 'Traitement intensif',
    icon: '🎭',
    color: 'text-green-500',
    count: 20,
    subcategories: ['Masque en feuille', 'Masque en gel', 'Masque en poudre', 'Masque de nuit'],
    step: 5
  },
  {
    id: 'contour-yeux',
    name: 'Contour des Yeux',
    description: 'Soin spécialisé pour le contour des yeux',
    icon: '👁️',
    color: 'text-indigo-500',
    count: 8,
    subcategories: ['Crème contour yeux', 'Patchs yeux', 'Sérum contour yeux'],
    step: 6
  },
  {
    id: 'hydratant',
    name: 'Hydratant',
    description: 'Hydratation et protection',
    icon: '🌿',
    color: 'text-emerald-500',
    count: 22,
    subcategories: ['Crème hydratante', 'Gel hydratant', 'Lotion hydratante'],
    step: 7
  },
  {
    id: 'protection-solaire',
    name: 'Protection Solaire',
    description: 'Protection UV essentielle',
    icon: '☀️',
    color: 'text-yellow-500',
    count: 10,
    subcategories: ['SPF 30', 'SPF 50', 'Protection teintée'],
    step: 8
  }
]

export const koreanIngredients: KoreanIngredient[] = [
  {
    id: 'snail-mucin',
    name: 'Mucus d\'Escargot',
    koreanName: '달팽이 점액',
    description: 'Ingrédient miracle de la K-Beauty pour la régénération cellulaire',
    benefits: ['Régénération cellulaire', 'Hydratation intense', 'Réparation de la peau', 'Anti-âge'],
    skinTypes: ['Peau sèche', 'Peau mature', 'Peau abîmée'],
    icon: '🐌',
    color: 'text-green-600',
    popularity: 'Très Populaire'
  },
  {
    id: 'centella-asiatica',
    name: 'Centella Asiatica',
    koreanName: '센텔라 아시아티카',
    description: 'Plante médicinale asiatique aux propriétés apaisantes',
    benefits: ['Apaisant', 'Anti-inflammatoire', 'Cicatrisant', 'Antioxydant'],
    skinTypes: ['Peau sensible', 'Peau irritée', 'Peau acnéique'],
    icon: '🌿',
    color: 'text-green-500',
    popularity: 'Très Populaire'
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    koreanName: '나이아신아마이드',
    description: 'Vitamine B3 pour unifier le teint et contrôler le sébum',
    benefits: ['Unifie le teint', 'Contrôle le sébum', 'Réduit les pores', 'Anti-inflammatoire'],
    skinTypes: ['Peau grasse', 'Peau mixte', 'Peau acnéique'],
    icon: '💊',
    color: 'text-blue-500',
    popularity: 'Très Populaire'
  },
  {
    id: 'hyaluronic-acid',
    name: 'Acide Hyaluronique',
    koreanName: '히알루론산',
    description: 'Molécule d\'hydratation ultra-puissante',
    benefits: ['Hydratation intense', 'Plénitude de la peau', 'Anti-âge', 'Rétention d\'eau'],
    skinTypes: ['Tous types de peau'],
    icon: '💧',
    color: 'text-cyan-500',
    popularity: 'Très Populaire'
  },
  {
    id: 'propolis',
    name: 'Propolis',
    koreanName: '프로폴리스',
    description: 'Résine naturelle des abeilles aux propriétés antibactériennes',
    benefits: ['Antibactérien', 'Apaisant', 'Cicatrisant', 'Antioxydant'],
    skinTypes: ['Peau sensible', 'Peau acnéique', 'Peau irritée'],
    icon: '🐝',
    color: 'text-yellow-600',
    popularity: 'Populaire'
  },
  {
    id: 'ginseng',
    name: 'Ginseng',
    koreanName: '인삼',
    description: 'Racine médicinale coréenne pour l\'énergie et la vitalité',
    benefits: ['Anti-âge', 'Énergisant', 'Améliore la circulation', 'Antioxydant'],
    skinTypes: ['Peau mature', 'Peau fatiguée'],
    icon: '🌱',
    color: 'text-red-500',
    popularity: 'Populaire'
  },
  {
    id: 'rice-water',
    name: 'Eau de Riz',
    koreanName: '쌀 물',
    description: 'Eau de trempage du riz riche en vitamines et minéraux',
    benefits: ['Éclaircissant', 'Hydratant', 'Apaisant', 'Nourrissant'],
    skinTypes: ['Tous types de peau'],
    icon: '🌾',
    color: 'text-amber-500',
    popularity: 'Émergent'
  },
  {
    id: 'fermented-ingredients',
    name: 'Ingrédients Fermentés',
    koreanName: '발효 성분',
    description: 'Ingrédients fermentés pour une meilleure absorption',
    benefits: ['Meilleure absorption', 'Actifs concentrés', 'Peau plus douce', 'Anti-âge'],
    skinTypes: ['Tous types de peau'],
    icon: '🍶',
    color: 'text-purple-500',
    popularity: 'Émergent'
  }
]

export const koreanRoutineSteps: KoreanRoutineStep[] = [
  {
    id: 1,
    name: 'Démaquillage',
    description: 'Retirez tout le maquillage et les impuretés',
    products: ['Démaquillant huile', 'Démaquillant biphase'],
    icon: '🧼',
    time: '2-3 minutes',
    tips: ['Masser doucement', 'Ne pas frotter', 'Rincer à l\'eau tiède']
  },
  {
    id: 2,
    name: 'Nettoyage',
    description: 'Nettoyez en profondeur avec un nettoyant doux',
    products: ['Nettoyant mousse', 'Nettoyant gel'],
    icon: '💧',
    time: '1-2 minutes',
    tips: ['Utiliser de l\'eau tiède', 'Massage circulaire', 'Rincer abondamment']
  },
  {
    id: 3,
    name: 'Exfoliation',
    description: 'Éliminez les cellules mortes (2-3 fois par semaine)',
    products: ['Gommage doux', 'AHA/BHA'],
    icon: '✨',
    time: '1 minute',
    tips: ['Maximum 3 fois par semaine', 'Éviter le contour des yeux', 'Hydrater après']
  },
  {
    id: 4,
    name: 'Toner',
    description: 'Équilibrez le pH et préparez la peau',
    products: ['Toner hydratant', 'Toner exfoliant'],
    icon: '🌊',
    time: '30 secondes',
    tips: ['Appliquer avec les mains', 'Tapoter doucement', 'Ne pas frotter']
  },
  {
    id: 5,
    name: 'Essence',
    description: 'Hydratation profonde et nutrition',
    products: ['Essence hydratante', 'First Treatment Essence'],
    icon: '💎',
    time: '1 minute',
    tips: ['Appliquer sur peau humide', 'Tapoter pour faire pénétrer', 'Attendre 2-3 minutes']
  },
  {
    id: 6,
    name: 'Sérum',
    description: 'Concentré d\'actifs ciblés',
    products: ['Sérum hydratant', 'Sérum anti-âge'],
    icon: '⚡',
    time: '1 minute',
    tips: ['Appliquer en petite quantité', 'Massage vers le haut', 'Laisser pénétrer']
  },
  {
    id: 7,
    name: 'Masque',
    description: 'Traitement intensif (2-3 fois par semaine)',
    products: ['Masque en feuille', 'Masque en gel'],
    icon: '🎭',
    time: '15-20 minutes',
    tips: ['Maximum 3 fois par semaine', 'Ne pas dépasser 20 minutes', 'Hydrater après']
  },
  {
    id: 8,
    name: 'Contour des Yeux',
    description: 'Soin spécialisé pour le contour des yeux',
    products: ['Crème contour yeux', 'Patchs yeux'],
    icon: '👁️',
    time: '1 minute',
    tips: ['Tapoter avec l\'annulaire', 'Mouvement vers l\'extérieur', 'Ne pas étirer la peau']
  },
  {
    id: 9,
    name: 'Hydratant',
    description: 'Hydratation et protection de la peau',
    products: ['Crème hydratante', 'Gel hydratant'],
    icon: '🌿',
    time: '1 minute',
    tips: ['Appliquer sur tout le visage', 'Massage circulaire', 'Ne pas oublier le cou']
  },
  {
    id: 10,
    name: 'Protection Solaire',
    description: 'Protection UV essentielle (matin uniquement)',
    products: ['SPF 30', 'SPF 50'],
    icon: '☀️',
    time: '1 minute',
    tips: ['Appliquer 15 minutes avant exposition', 'Renouveler toutes les 2 heures', 'Même par temps nuageux']
  }
]

export const koreanBeautyProducts: KoreanBeautyProduct[] = [
  {
    id: '1',
    name: 'Snail Repair Intensive Ampoule',
    brand: 'COSRX',
    category: 'Sérum',
    subcategory: 'Sérum hydratant',
    price: 18.90,
    image: '/korean-beauty/cosrx-snail-ampoule.jpg',
    description: 'Ampoule intensive au mucus d\'escargot pour une régénération cellulaire exceptionnelle.',
    benefits: [
      'Régénération cellulaire',
      'Hydratation intense',
      'Réparation de la peau',
      'Anti-âge naturel'
    ],
    ingredients: ['Mucus d\'escargot 96%', 'Acide hyaluronique', 'Centella asiatica'],
    skinType: ['Peau sèche', 'Peau mature', 'Peau abîmée'],
    usage: 'Appliquer 2-3 gouttes sur peau propre, matin et soir',
    inStock: true,
    isTrending: true,
    rating: 4.8,
    reviews: 234,
    tags: ['Snail Mucin', 'Régénération', 'Hydratation'],
    koreanName: '달팽이 수리 집중 앰플',
    step: 6,
    texture: 'Sérum',
    size: '20ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: false
  },
  {
    id: '2',
    name: 'Centella Asiatica Ampoule',
    brand: 'SKIN1004',
    category: 'Sérum',
    subcategory: 'Sérum apaisant',
    price: 15.90,
    image: '/korean-beauty/skin1004-centella-ampoule.jpg',
    description: 'Ampoule apaisante à la Centella Asiatica pour calmer les peaux sensibles et irritées.',
    benefits: [
      'Apaisant intense',
      'Anti-inflammatoire',
      'Cicatrisant',
      'Réduit les rougeurs'
    ],
    ingredients: ['Centella Asiatica 100%', 'Acide hyaluronique', 'Aloe vera'],
    skinType: ['Peau sensible', 'Peau irritée', 'Peau acnéique'],
    usage: 'Appliquer 2-3 gouttes sur peau propre, matin et soir',
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviews: 189,
    tags: ['Centella', 'Apaisant', 'Sensible'],
    koreanName: '센텔라 아시아티카 앰플',
    step: 6,
    texture: 'Sérum',
    size: '30ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: true
  },
  {
    id: '3',
    name: 'Rice Water Bright Cleansing Foam',
    brand: 'THE FACE SHOP',
    category: 'Nettoyage',
    subcategory: 'Nettoyant mousse',
    price: 12.90,
    image: '/korean-beauty/faceshop-rice-cleansing.jpg',
    description: 'Mousse nettoyante à l\'eau de riz pour un teint éclatant et une peau douce.',
    benefits: [
      'Nettoyage en profondeur',
      'Teint éclatant',
      'Peau douce',
      'Hydratation légère'
    ],
    ingredients: ['Eau de riz', 'Extrait de riz', 'Acide hyaluronique'],
    skinType: ['Tous types de peau'],
    usage: 'Masser sur peau humide, rincer à l\'eau tiède',
    inStock: true,
    rating: 4.5,
    reviews: 156,
    tags: ['Eau de riz', 'Éclat', 'Nettoyage'],
    koreanName: '쌀 물 브라이트 클렌징 폼',
    step: 2,
    texture: 'Mousse',
    size: '150ml',
    madeInKorea: true,
    crueltyFree: false,
    vegan: false
  },
  {
    id: '4',
    name: 'Hyaluronic Acid Hydra Power Essence',
    brand: 'INNISFREE',
    category: 'Essence',
    subcategory: 'Essence hydratante',
    price: 22.90,
    image: '/korean-beauty/innisfree-hyaluronic-essence.jpg',
    description: 'Essence hydratante à l\'acide hyaluronique pour une hydratation intense et durable.',
    benefits: [
      'Hydratation intense',
      'Plénitude de la peau',
      'Anti-âge',
      'Rétention d\'eau'
    ],
    ingredients: ['Acide hyaluronique', 'Eau de source volcanique', 'Extrait de bambou'],
    skinType: ['Tous types de peau'],
    usage: 'Appliquer sur peau propre, tapoter pour faire pénétrer',
    inStock: true,
    isTrending: true,
    rating: 4.6,
    reviews: 278,
    tags: ['Acide hyaluronique', 'Hydratation', 'Essence'],
    koreanName: '히알루론산 하이드라 파워 에센스',
    step: 5,
    texture: 'Essence',
    size: '80ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: true
  },
  {
    id: '5',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'THE ORDINARY',
    category: 'Sérum',
    subcategory: 'Sérum éclaircissant',
    price: 8.90,
    image: '/korean-beauty/ordinary-niacinamide.jpg',
    description: 'Sérum concentré à la niacinamide pour unifier le teint et contrôler le sébum.',
    benefits: [
      'Unifie le teint',
      'Contrôle le sébum',
      'Réduit les pores',
      'Anti-inflammatoire'
    ],
    ingredients: ['Niacinamide 10%', 'Zinc PCA 1%', 'Acide hyaluronique'],
    skinType: ['Peau grasse', 'Peau mixte', 'Peau acnéique'],
    usage: 'Appliquer 2-3 gouttes sur peau propre, matin et soir',
    inStock: true,
    rating: 4.4,
    reviews: 445,
    tags: ['Niacinamide', 'Sébum', 'Pores'],
    koreanName: '나이아신아마이드 10% + 아연 1%',
    step: 6,
    texture: 'Sérum',
    size: '30ml',
    madeInKorea: false,
    crueltyFree: true,
    vegan: true
  },
  {
    id: '6',
    name: 'Honey Propolis Ampoule',
    brand: 'IUNIK',
    category: 'Sérum',
    subcategory: 'Sérum apaisant',
    price: 16.90,
    image: '/korean-beauty/iunik-propolis-ampoule.jpg',
    description: 'Ampoule à la propolis pour apaiser et nourrir les peaux sensibles.',
    benefits: [
      'Apaisant naturel',
      'Antibactérien',
      'Cicatrisant',
      'Antioxydant'
    ],
    ingredients: ['Propolis 80%', 'Miel', 'Extrait de camomille'],
    skinType: ['Peau sensible', 'Peau irritée', 'Peau acnéique'],
    usage: 'Appliquer 2-3 gouttes sur peau propre, matin et soir',
    inStock: true,
    isLimited: true,
    rating: 4.7,
    reviews: 167,
    tags: ['Propolis', 'Miel', 'Apaisant'],
    koreanName: '허니 프로폴리스 앰플',
    step: 6,
    texture: 'Sérum',
    size: '25ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: false
  }
]

export const koreanBeautyStats = {
  totalProducts: 85,
  totalBrands: 25,
  averageRating: 4.6,
  totalReviews: 3200,
  madeInKorea: 70,
  crueltyFree: 60,
  vegan: 35,
  trendingProducts: 12
}
