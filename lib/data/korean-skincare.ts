// Données de test pour la page Korean Skincare

export interface KoreanSkincareProduct {
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
  texture: 'Gel' | 'Crème' | 'Sérum' | 'Essence' | 'Toner' | 'Masque' | 'Huile' | 'Mousse' | 'Lotion'
  size: string
  madeInKorea: boolean
  crueltyFree: boolean
  vegan?: boolean
  pH?: string
  concentration?: string
  targetConcerns: string[]
}

export interface SkincareCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  count: number
  subcategories: string[]
  step?: number
  targetConcerns: string[]
}

export interface SkincareConcern {
  id: string
  name: string
  description: string
  symptoms: string[]
  recommendedIngredients: string[]
  icon: string
  color: string
  severity: 'Léger' | 'Modéré' | 'Sévère'
}

export interface SkincareRoutine {
  id: string
  name: string
  description: string
  skinType: string
  steps: {
    step: number
    product: string
    time: string
    tips: string[]
  }[]
  duration: string
  frequency: string
  results: string[]
}

export const skincareCategories: SkincareCategory[] = [
  {
    id: 'nettoyage-double',
    name: 'Nettoyage Double',
    description: 'Méthode de nettoyage en deux étapes pour une peau parfaitement propre',
    icon: '🧼',
    color: 'text-blue-500',
    count: 18,
    subcategories: ['Nettoyant huile', 'Nettoyant mousse', 'Nettoyant gel', 'Démaquillant'],
    step: 1,
    targetConcerns: ['Impuretés', 'Maquillage tenace', 'Sébum excessif']
  },
  {
    id: 'toner',
    name: 'Toner',
    description: 'Équilibre le pH et prépare la peau aux soins suivants',
    icon: '💧',
    color: 'text-cyan-500',
    count: 15,
    subcategories: ['Toner hydratant', 'Toner exfoliant', 'Toner apaisant', 'Toner équilibrant'],
    step: 2,
    targetConcerns: ['pH déséquilibré', 'Pores dilatés', 'Peau déshydratée']
  },
  {
    id: 'essence',
    name: 'Essence',
    description: 'Première étape d\'hydratation avec des actifs concentrés',
    icon: '✨',
    color: 'text-purple-500',
    count: 22,
    subcategories: ['First Treatment Essence', 'Essence hydratante', 'Essence anti-âge', 'Essence éclaircissante'],
    step: 3,
    targetConcerns: ['Déshydratation', 'Signes de l\'âge', 'Teint terne']
  },
  {
    id: 'serum',
    name: 'Sérum',
    description: 'Concentré d\'actifs ciblés pour des résultats visibles',
    icon: '💎',
    color: 'text-pink-500',
    count: 28,
    subcategories: ['Sérum hydratant', 'Sérum anti-âge', 'Sérum éclaircissant', 'Sérum apaisant', 'Sérum anti-acné'],
    step: 4,
    targetConcerns: ['Rides', 'Taches', 'Acné', 'Inflammation']
  },
  {
    id: 'masque',
    name: 'Masque',
    description: 'Traitement intensif pour des résultats immédiats',
    icon: '🎭',
    color: 'text-green-500',
    count: 25,
    subcategories: ['Masque en feuille', 'Masque en gel', 'Masque en poudre', 'Masque de nuit', 'Masque exfoliant'],
    step: 5,
    targetConcerns: ['Peau terne', 'Pores dilatés', 'Déshydratation', 'Signes de fatigue']
  },
  {
    id: 'contour-yeux',
    name: 'Contour des Yeux',
    description: 'Soin spécialisé pour la zone délicate du contour des yeux',
    icon: '👁️',
    color: 'text-indigo-500',
    count: 12,
    subcategories: ['Crème contour yeux', 'Patchs yeux', 'Sérum contour yeux', 'Gel contour yeux'],
    step: 6,
    targetConcerns: ['Cernes', 'Poches', 'Rides du contour des yeux', 'Fatigue']
  },
  {
    id: 'hydratant',
    name: 'Hydratant',
    description: 'Hydratation et protection de la barrière cutanée',
    icon: '🌿',
    color: 'text-emerald-500',
    count: 20,
    subcategories: ['Crème hydratante', 'Gel hydratant', 'Lotion hydratante', 'Emulsion'],
    step: 7,
    targetConcerns: ['Déshydratation', 'Barrière cutanée altérée', 'Peau sensible']
  },
  {
    id: 'protection-solaire',
    name: 'Protection Solaire',
    description: 'Protection UV essentielle pour prévenir le vieillissement',
    icon: '☀️',
    color: 'text-yellow-500',
    count: 15,
    subcategories: ['SPF 30', 'SPF 50', 'Protection teintée', 'Protection minérale'],
    step: 8,
    targetConcerns: ['UV', 'Taches solaires', 'Vieillissement prématuré']
  }
]

export const skincareConcerns: SkincareConcern[] = [
  {
    id: 'acne',
    name: 'Acné',
    description: 'Traitement des imperfections et de l\'acné',
    symptoms: ['Boutons', 'Points noirs', 'Points blancs', 'Inflammation'],
    recommendedIngredients: ['Niacinamide', 'Acide salicylique', 'Centella asiatica', 'Tea tree'],
    icon: '🔴',
    color: 'text-red-500',
    severity: 'Modéré'
  },
  {
    id: 'aging',
    name: 'Anti-âge',
    description: 'Prévention et traitement des signes de l\'âge',
    symptoms: ['Rides', 'Ridules', 'Perte de fermeté', 'Taches'],
    recommendedIngredients: ['Rétinol', 'Acide hyaluronique', 'Peptides', 'Vitamine C'],
    icon: '⏰',
    color: 'text-purple-500',
    severity: 'Modéré'
  },
  {
    id: 'hydration',
    name: 'Hydratation',
    description: 'Amélioration de l\'hydratation de la peau',
    symptoms: ['Peau sèche', 'Tiraillements', 'Desquamation', 'Rugosité'],
    recommendedIngredients: ['Acide hyaluronique', 'Glycérine', 'Aloe vera', 'Ceramides'],
    icon: '💧',
    color: 'text-blue-500',
    severity: 'Léger'
  },
  {
    id: 'sensitivity',
    name: 'Sensibilité',
    description: 'Apaisement des peaux sensibles et irritées',
    symptoms: ['Rougeurs', 'Irritation', 'Picotements', 'Réactions'],
    recommendedIngredients: ['Centella asiatica', 'Aloe vera', 'Camomille', 'Allantoïne'],
    icon: '🌿',
    color: 'text-green-500',
    severity: 'Modéré'
  },
  {
    id: 'hyperpigmentation',
    name: 'Hyperpigmentation',
    description: 'Éclaircissement des taches et unification du teint',
    symptoms: ['Taches brunes', 'Teint irrégulier', 'Cicatrices', 'Mélanome'],
    recommendedIngredients: ['Vitamine C', 'Niacinamide', 'Arbutine', 'Acide kojique'],
    icon: '🌟',
    color: 'text-yellow-500',
    severity: 'Sévère'
  },
  {
    id: 'pores',
    name: 'Pores Dilatés',
    description: 'Réduction de l\'apparence des pores',
    symptoms: ['Pores visibles', 'Peau granuleuse', 'Points noirs', 'Sébum excessif'],
    recommendedIngredients: ['Niacinamide', 'Acide salicylique', 'Argile', 'Rétinol'],
    icon: '🔍',
    color: 'text-gray-500',
    severity: 'Modéré'
  }
]

export const skincareRoutines: SkincareRoutine[] = [
  {
    id: 'routine-basique',
    name: 'Routine Basique',
    description: 'Routine essentielle pour débuter avec la K-Beauty',
    skinType: 'Tous types',
    steps: [
      {
        step: 1,
        product: 'Nettoyant doux',
        time: '2 minutes',
        tips: ['Masser en mouvements circulaires', 'Rincer à l\'eau tiède']
      },
      {
        step: 2,
        product: 'Toner hydratant',
        time: '30 secondes',
        tips: ['Appliquer avec les mains', 'Tapoter doucement']
      },
      {
        step: 3,
        product: 'Crème hydratante',
        time: '1 minute',
        tips: ['Appliquer sur tout le visage', 'Ne pas oublier le cou']
      },
      {
        step: 4,
        product: 'Protection solaire',
        time: '1 minute',
        tips: ['Appliquer 15 minutes avant exposition', 'Renouveler toutes les 2 heures']
      }
    ],
    duration: '5 minutes',
    frequency: 'Matin et soir',
    results: ['Peau propre', 'Hydratation de base', 'Protection UV']
  },
  {
    id: 'routine-complete',
    name: 'Routine Complète',
    description: 'Routine 10 étapes pour des résultats optimaux',
    skinType: 'Tous types',
    steps: [
      {
        step: 1,
        product: 'Nettoyant huile',
        time: '2 minutes',
        tips: ['Massage doux', 'Émulsionner avec de l\'eau']
      },
      {
        step: 2,
        product: 'Nettoyant mousse',
        time: '1 minute',
        tips: ['Rincer abondamment', 'Ne pas frotter']
      },
      {
        step: 3,
        product: 'Toner',
        time: '30 secondes',
        tips: ['Appliquer avec les mains', 'Tapoter pour faire pénétrer']
      },
      {
        step: 4,
        product: 'Essence',
        time: '1 minute',
        tips: ['Appliquer sur peau humide', 'Laisser pénétrer']
      },
      {
        step: 5,
        product: 'Sérum',
        time: '1 minute',
        tips: ['Appliquer en petite quantité', 'Massage vers le haut']
      },
      {
        step: 6,
        product: 'Masque',
        time: '15 minutes',
        tips: ['Maximum 3 fois par semaine', 'Ne pas dépasser 20 minutes']
      },
      {
        step: 7,
        product: 'Contour des yeux',
        time: '1 minute',
        tips: ['Tapoter avec l\'annulaire', 'Mouvement vers l\'extérieur']
      },
      {
        step: 8,
        product: 'Crème hydratante',
        time: '1 minute',
        tips: ['Appliquer sur tout le visage', 'Massage circulaire']
      },
      {
        step: 9,
        product: 'Huile visage',
        time: '30 secondes',
        tips: ['Appliquer en dernière étape', 'Massage doux']
      },
      {
        step: 10,
        product: 'Protection solaire',
        time: '1 minute',
        tips: ['Matin uniquement', 'Appliquer 15 minutes avant exposition']
      }
    ],
    duration: '25 minutes',
    frequency: 'Matin et soir',
    results: ['Peau parfaitement propre', 'Hydratation optimale', 'Résultats visibles']
  }
]

export const koreanSkincareProducts: KoreanSkincareProduct[] = [
  {
    id: '1',
    name: 'Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Essence',
    subcategory: 'Essence hydratante',
    price: 22.90,
    image: '/korean-skincare/cosrx-snail-essence.jpg',
    description: 'Essence hydratante au mucus d\'escargot pour une peau repulpée et régénérée.',
    benefits: [
      'Hydratation intense',
      'Régénération cellulaire',
      'Réparation de la peau',
      'Anti-âge naturel'
    ],
    ingredients: ['Mucus d\'escargot 96%', 'Acide hyaluronique', 'Centella asiatica'],
    skinType: ['Peau sèche', 'Peau mature', 'Peau abîmée'],
    usage: 'Appliquer 2-3 gouttes sur peau propre, matin et soir',
    inStock: true,
    isTrending: true,
    rating: 4.8,
    reviews: 456,
    tags: ['Snail Mucin', 'Hydratation', 'Régénération'],
    koreanName: '달팽이 96 뮤신 파워 에센스',
    step: 3,
    texture: 'Essence',
    size: '100ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: false,
    pH: '5.5',
    targetConcerns: ['Déshydratation', 'Signes de l\'âge', 'Peau abîmée']
  },
  {
    id: '2',
    name: 'Centella Asiatica Ampoule',
    brand: 'SKIN1004',
    category: 'Sérum',
    subcategory: 'Sérum apaisant',
    price: 18.90,
    image: '/korean-skincare/skin1004-centella-ampoule.jpg',
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
    reviews: 234,
    tags: ['Centella', 'Apaisant', 'Sensible'],
    koreanName: '센텔라 아시아티카 앰플',
    step: 4,
    texture: 'Sérum',
    size: '30ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: true,
    targetConcerns: ['Sensibilité', 'Inflammation', 'Rougeurs']
  },
  {
    id: '3',
    name: 'Rice Water Bright Cleansing Foam',
    brand: 'THE FACE SHOP',
    category: 'Nettoyage Double',
    subcategory: 'Nettoyant mousse',
    price: 12.90,
    image: '/korean-skincare/faceshop-rice-cleansing.jpg',
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
    reviews: 189,
    tags: ['Eau de riz', 'Éclat', 'Nettoyage'],
    koreanName: '쌀 물 브라이트 클렌징 폼',
    step: 2,
    texture: 'Mousse',
    size: '150ml',
    madeInKorea: true,
    crueltyFree: false,
    vegan: false,
    pH: '5.5',
    targetConcerns: ['Impuretés', 'Teint terne', 'Pores dilatés']
  },
  {
    id: '4',
    name: 'Hyaluronic Acid Hydra Power Essence',
    brand: 'INNISFREE',
    category: 'Essence',
    subcategory: 'Essence hydratante',
    price: 24.90,
    image: '/korean-skincare/innisfree-hyaluronic-essence.jpg',
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
    reviews: 312,
    tags: ['Acide hyaluronique', 'Hydratation', 'Essence'],
    koreanName: '히알루론산 하이드라 파워 에센스',
    step: 3,
    texture: 'Essence',
    size: '80ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: true,
    targetConcerns: ['Déshydratation', 'Signes de l\'âge', 'Peau terne']
  },
  {
    id: '5',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'THE ORDINARY',
    category: 'Sérum',
    subcategory: 'Sérum anti-acné',
    price: 8.90,
    image: '/korean-skincare/ordinary-niacinamide.jpg',
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
    reviews: 567,
    tags: ['Niacinamide', 'Sébum', 'Pores'],
    koreanName: '나이아신아마이드 10% + 아연 1%',
    step: 4,
    texture: 'Sérum',
    size: '30ml',
    madeInKorea: false,
    crueltyFree: true,
    vegan: true,
    concentration: '10%',
    targetConcerns: ['Acné', 'Pores dilatés', 'Sébum excessif']
  },
  {
    id: '6',
    name: 'Honey Propolis Ampoule',
    brand: 'IUNIK',
    category: 'Sérum',
    subcategory: 'Sérum apaisant',
    price: 16.90,
    image: '/korean-skincare/iunik-propolis-ampoule.jpg',
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
    reviews: 198,
    tags: ['Propolis', 'Miel', 'Apaisant'],
    koreanName: '허니 프로폴리스 앰플',
    step: 4,
    texture: 'Sérum',
    size: '25ml',
    madeInKorea: true,
    crueltyFree: true,
    vegan: false,
    targetConcerns: ['Sensibilité', 'Acné', 'Inflammation']
  }
]

export const koreanSkincareStats = {
  totalProducts: 95,
  totalBrands: 28,
  averageRating: 4.6,
  totalReviews: 4200,
  madeInKorea: 78,
  crueltyFree: 65,
  vegan: 42,
  trendingProducts: 15,
  routineSteps: 10
}
